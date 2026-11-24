CREATE TYPE public.app_role AS ENUM ('farmer', 'engineer');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  region text NOT NULL DEFAULT 'Ragouj, Tunisia',
  preferred_language text NOT NULL DEFAULT 'en',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  assigned_by uuid NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;

CREATE POLICY "Users can read their own role"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Engineers can view all role assignments"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'engineer'));

CREATE TABLE public.engineer_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  invited_by uuid NULL,
  accepted_at timestamptz NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, DELETE ON public.engineer_invitations TO authenticated;
GRANT ALL ON public.engineer_invitations TO service_role;

ALTER TABLE public.engineer_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Engineers can view invitations"
ON public.engineer_invitations FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'engineer'));

CREATE POLICY "Engineers can create invitations"
ON public.engineer_invitations FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'engineer'));

CREATE POLICY "Engineers can delete invitations"
ON public.engineer_invitations FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'engineer'));

CREATE TABLE public.system_telemetry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name text NOT NULL,
  category text NOT NULL,
  status text NOT NULL,
  details text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.system_telemetry TO authenticated;
GRANT ALL ON public.system_telemetry TO service_role;

ALTER TABLE public.system_telemetry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Engineers can read system telemetry"
ON public.system_telemetry FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'engineer'));

CREATE POLICY "Engineers can update system telemetry"
ON public.system_telemetry FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'engineer'))
WITH CHECK (public.has_role(auth.uid(), 'engineer'));

CREATE POLICY "Engineers can insert system telemetry"
ON public.system_telemetry FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'engineer'));

INSERT INTO public.system_telemetry (service_name, category, status, details) VALUES
  ('IoT Soil Gateway — Ragouj North', 'iot', 'healthy', '14/14 LoRaWAN moisture & pH nodes reporting every 15 min (battery 88%).'),
  ('IoT Drip Controller — Olive Plot B', 'iot', 'degraded', 'Intermittent signal strength (-112 dBm); solar panel voltage normal.'),
  ('FastAPI Crop Vision AI (/predict)', 'ai', 'healthy', 'YOLOv8-Agri model loaded · avg inference 142 ms · 99.4% uptime.'),
  ('Core REST & Auth API', 'api', 'healthy', 'p95 latency 64 ms · 0.02% 5xx rate over last 24h.'),
  ('Drone Imagery Sync Queue', 'error', 'open', '2 retryable timeout warnings from rural 4G uplink at 06:14 UTC.'),
  ('Soil Alert Threshold Config', 'config', 'healthy', 'Low moisture trigger: <32% · Critical pH bounds: 5.8 – 7.8.');

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_invite_id uuid;
  v_full_name text;
  v_region text;
BEGIN
  v_full_name := COALESCE(NEW.raw_user_meta_data ->> 'full_name', '');
  v_region := COALESCE(NEW.raw_user_meta_data ->> 'region', 'Ragouj, Tunisia');

  INSERT INTO public.profiles (id, full_name, region)
  VALUES (NEW.id, v_full_name, v_region)
  ON CONFLICT (id) DO NOTHING;

  SELECT id INTO v_invite_id
  FROM public.engineer_invitations
  WHERE lower(email) = lower(NEW.email)
    AND accepted_at IS NULL
  LIMIT 1;

  IF v_invite_id IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'engineer')
    ON CONFLICT (user_id, role) DO NOTHING;

    UPDATE public.engineer_invitations
    SET accepted_at = now()
    WHERE id = v_invite_id;
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'farmer')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();