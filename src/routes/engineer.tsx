import { useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Activity,
  AlertTriangle,
  Cpu,
  Globe,
  Home,
  LogOut,
  Radio,
  Server,
  Settings,
  ShieldCheck,
  Trash2,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  getAuthContext,
  getEngineerDashboardData,
  inviteEngineer,
  revokeEngineerInvite,
  updateTelemetryStatus,
} from "@/lib/auth.functions";
import { useAuthSession } from "@/lib/use-auth-session";
import { useI18n, type Language } from "@/lib/i18n";

export const Route = createFileRoute("/engineer")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({ to: "/login" });
    }
    const authCtx = await getAuthContext();
    if (authCtx.role !== "engineer") {
      throw redirect({ to: "/unauthorized" });
    }
  },
  head: () => ({
    meta: [
      { title: "Engineer Technical Console — SheFarms" },
      { name: "description", content: "Platform health, IoT device status, AI service monitoring, API availability, and secure engineer invitations." },
      { property: "og:title", content: "Engineer Technical Console — SheFarms" },
      { property: "og:description", content: "Dedicated technical operations dashboard for SheFarms Engineers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EngineerDashboardPage,
});

function EngineerDashboardPage() {
  const { lang, setLang, t } = useI18n();
  const { auth, signOut } = useAuthSession();
  const queryClient = useQueryClient();
  const [inviteEmail, setInviteEmail] = useState("");

  const fetchEngineerData = useServerFn(getEngineerDashboardData);
  const sendInviteFn = useServerFn(inviteEngineer);
  const revokeInviteFn = useServerFn(revokeEngineerInvite);
  const updateStatusFn = useServerFn(updateTelemetryStatus);

  const { data, isLoading } = useQuery({
    queryKey: ["engineer-dashboard"],
    queryFn: () => fetchEngineerData(),
  });

  const inviteMutation = useMutation({
    mutationFn: (email: string) => sendInviteFn({ data: { email } }),
    onSuccess: () => {
      toast.success(t("Engineer invitation saved", "Invitation ingénieur enregistrée", "تم حفظ دعوة المهندس"));
      setInviteEmail("");
      queryClient.invalidateQueries({ queryKey: ["engineer-dashboard"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const revokeMutation = useMutation({
    mutationFn: (id: string) => revokeInviteFn({ data: { id } }),
    onSuccess: () => {
      toast.success(t("Invitation removed", "Invitation supprimée", "تم حذف الدعوة"));
      queryClient.invalidateQueries({ queryKey: ["engineer-dashboard"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const statusMutation = useMutation({
    mutationFn: (payload: { id: string; status: string }) => updateStatusFn({ data: payload }),
    onSuccess: () => {
      toast.success(t("Service status updated", "Statut mis à jour", "تم تحديث الحالة"));
      queryClient.invalidateQueries({ queryKey: ["engineer-dashboard"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const telemetry = data?.telemetry ?? [];
  const invitations = data?.invitations ?? [];
  const counts = data?.counts ?? { farmers: 0, engineers: 0 };

  const categoryIcon = (cat: string) => {
    if (cat === "iot") return Radio;
    if (cat === "ai") return Cpu;
    if (cat === "api") return Server;
    if (cat === "error") return AlertTriangle;
    return Settings;
  };

  return (
    <div className="ragouj-plaster min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-forest text-sidebar-foreground">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-gold" />
            <div>
              <h1 className="font-editorial text-xl font-bold sm:text-2xl">
                {t("SheFarms · Engineer Technical Console", "SheFarms · Console Technique Ingénieur", "شي فارمز · لوحة المهندس التقنية")}
              </h1>
              <p className="text-[11px] text-sidebar-foreground/75">{auth?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-full border border-sidebar-border bg-sidebar p-0.5 sm:flex">
              <Globe className="mx-1.5 h-3.5 w-3.5 text-gold" />
              {(["en", "fr", "ar"] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    lang === code ? "bg-gold text-forest" : "text-sidebar-foreground/80"
                  }`}
                >
                  {code === "ar" ? "عربي" : code.toUpperCase()}
                </button>
              ))}
            </div>
            <Link to="/" className="rounded-full border border-sidebar-border p-2 text-sidebar-foreground/85 hover:text-gold" aria-label="Home">
              <Home className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-3.5 py-1.5 text-xs font-semibold text-terracotta-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              {t("Sign Out", "Déconnexion", "خروج")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Platform Overview Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>{t("Platform Health", "Santé Plateforme", "صحة المنصة")}</span>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 font-editorial text-3xl font-bold text-forest">
              {telemetry.filter((i) => i.status === "healthy").length}/{telemetry.length || 0}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t("Services operational", "Services opérationnels", "خدمات تعمل بنجاح")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
              <span>{t("Open Technical Alerts", "Alertes Techniques", "التنبيهات التقنية")}</span>
              <AlertTriangle className="h-4 w-4 text-terracotta" />
            </div>
            <p className="mt-2 font-editorial text-3xl font-bold text-forest">
              {telemetry.filter((i) => i.status === "degraded" || i.status === "open").length}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{t("Requires inspection", "À inspecter", "تتطلب مراجعة")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-medium text-muted-foreground">{t("Registered Women Farmers", "Agricultrices Inscrites", "الفلاحات المسجلات")}</p>
            <p className="mt-2 font-editorial text-3xl font-bold text-forest">{counts.farmers}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("Private farm records isolated by RLS", "Données privées isolées par RLS", "البيانات الخاصة محمية")}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-medium text-muted-foreground">{t("Authorized Engineers", "Ingénieurs Autorisés", "المهندسون المصرح لهم")}</p>
            <p className="mt-2 font-editorial text-3xl font-bold text-forest">{counts.engineers}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t("Invite-only access control", "Accès sur invitation uniquement", "الدخول بدعوة فقط")}</p>
          </div>
        </div>

        {/* IoT, AI, API & Error Telemetry */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-editorial text-2xl font-bold text-forest">
            {t("IoT Nodes, AI Vision, API & Technical Errors", "Nœuds IoT, IA Vision, API & Erreurs Techniques", "مراقبة IoT والذكاء الاصطناعي و API والأخطاء")}
          </h2>
          {isLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">{t("Loading telemetry...", "Chargement...", "جاري التحميل...")}</p>
          ) : (
            <div className="mt-4 divide-y divide-border">
              {telemetry.map((item) => {
                const Icon = categoryIcon(item.category);
                const isHealthy = item.status === "healthy" || item.status === "resolved";
                return (
                  <div key={item.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-lg bg-secondary p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-forest">{item.service_name}</p>
                        <p className="text-xs text-muted-foreground">{item.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                          isHealthy ? "bg-accent/25 text-forest" : "bg-terracotta/20 text-terracotta"
                        }`}
                      >
                        {item.status}
                      </span>
                      {!isHealthy && (
                        <button
                          type="button"
                          onClick={() => statusMutation.mutate({ id: item.id, status: "resolved" })}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium hover:bg-secondary"
                        >
                          {t("Mark Resolved", "Résoudre", "تم الحل")}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Secure Engineer Invitations */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <h2 className="font-editorial text-2xl font-bold text-forest">
              {t("Invite Authorized Engineer", "Inviter un Ingénieur Autorisé", "دعوة مهندس مصرح له")}
            </h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {t(
              "Public registration always assigns the Woman Farmer role. Only emails pre-authorized here receive the Engineer role upon signup.",
              "L'inscription publique attribue toujours le rôle Agricultrice. Seuls les e-mails pré-autorisés ici reçoivent le rôle Ingénieur.",
              "التسجيل العام يمنح دائماً دور الفلاحة. فقط البريد الإلكتروني المضاف هنا يحصل على دور المهندس عند التسجيل."
            )}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              inviteMutation.mutate(inviteEmail);
            }}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="engineer@shefarms.tn"
              className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm"
            />
            <button
              type="submit"
              disabled={inviteMutation.isPending}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-forest disabled:opacity-50"
            >
              {t("Authorize Email", "Autoriser l'e-mail", "تخويل البريد")}
            </button>
          </form>

          {invitations.length > 0 && (
            <div className="mt-5 divide-y divide-border rounded-xl border border-border">
              {invitations.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between px-4 py-3 text-sm">
                  <div>
                    <span className="font-medium text-forest">{inv.email}</span>
                    <span className="ms-2 text-xs text-muted-foreground">
                      {inv.accepted_at ? t("Accepted", "Acceptée", "مقبولة") : t("Pending signup", "En attente", "قيد الانتظار")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => revokeMutation.mutate(inv.id)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-destructive"
                    aria-label="Remove invitation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}