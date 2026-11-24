import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AppRole = "farmer" | "engineer";

export interface UserAuthContext {
  userId: string;
  email: string;
  role: AppRole;
  profile: {
    full_name: string;
    region: string;
    preferred_language: string;
  } | null;
}

export const getAuthContext = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<UserAuthContext> => {
    const { supabase, userId, claims } = context;

    const [{ data: roleRow }, { data: profileRow }] = await Promise.all([
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("profiles")
        .select("full_name, region, preferred_language")
        .eq("id", userId)
        .maybeSingle(),
    ]);

    const role: AppRole = roleRow?.role === "engineer" ? "engineer" : "farmer";
    const email = typeof claims["email"] === "string" ? claims["email"] : "";

    return {
      userId,
      email,
      role,
      profile: profileRow ?? null,
    };
  });

export const getEngineerDashboardData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: isEngineer } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "engineer",
    });

    if (!isEngineer) {
      throw new Error("Forbidden: Engineer role required");
    }

    const [{ data: telemetry }, { data: invitations }, { data: roles }] =
      await Promise.all([
        supabase
          .from("system_telemetry")
          .select("id, service_name, category, status, details, updated_at")
          .order("category", { ascending: true }),
        supabase
          .from("engineer_invitations")
          .select("id, email, accepted_at, created_at")
          .order("created_at", { ascending: false }),
        supabase.from("user_roles").select("role"),
      ]);

    const farmerCount = (roles ?? []).filter((r) => r.role === "farmer").length;
    const engineerCount = (roles ?? []).filter((r) => r.role === "engineer").length;

    return {
      telemetry: telemetry ?? [],
      invitations: invitations ?? [],
      counts: { farmers: farmerCount, engineers: engineerCount },
    };
  });

export const inviteEngineer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { email: string }) => {
    const email = input.email.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    return { email };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isEngineer } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "engineer",
    });
    if (!isEngineer) throw new Error("Forbidden: Engineer role required");

    const { error } = await supabase.from("engineer_invitations").insert({
      email: data.email,
      invited_by: userId,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const revokeEngineerInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isEngineer } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "engineer",
    });
    if (!isEngineer) throw new Error("Forbidden: Engineer role required");

    const { error } = await supabase
      .from("engineer_invitations")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateTelemetryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string }) => input)
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: isEngineer } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "engineer",
    });
    if (!isEngineer) throw new Error("Forbidden: Engineer role required");

    const { error } = await supabase
      .from("system_telemetry")
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });