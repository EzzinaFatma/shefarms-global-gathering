import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAuthContext, type UserAuthContext } from "@/lib/auth.functions";

export function useAuthSession() {
  const fetchAuth = useServerFn(getAuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = useQuery<UserAuthContext | null>({
    queryKey: ["auth-context"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;
      return await fetchAuth();
    },
    staleTime: 60_000,
    retry: false,
  });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  return {
    auth: query.data ?? null,
    isLoading: query.isLoading,
    signOut,
  };
}