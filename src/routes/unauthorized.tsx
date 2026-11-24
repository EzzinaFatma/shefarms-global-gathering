import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";
import { useAuthSession } from "@/lib/use-auth-session";

export const Route = createFileRoute("/unauthorized")({
  head: () => ({
    meta: [
      { title: "Access Restricted — SheFarms" },
      { name: "description", content: "You do not have permission to access this SheFarms workspace." },
      { property: "og:title", content: "Access Restricted — SheFarms" },
      { property: "og:description", content: "Role-based access control restriction notice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  const { t } = useI18n();
  const { auth } = useAuthSession();
  const targetRoute = auth?.role === "engineer" ? "/engineer" : auth ? "/dashboard" : "/login";

  return (
    <PublicLayout>
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/15 text-destructive">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-editorial text-4xl font-bold text-forest">
          {t("Access Restricted", "Accès Restreint", "وصول مقيّد")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t(
            "Your current SheFarms account role does not have permission to open this workspace. Permissions are enforced on the server.",
            "Le rôle de votre compte SheFarms ne dispose pas des autorisations requises pour cet espace. Les permissions sont vérifiées côté serveur.",
            "دور حسابك الحالي في شي فارمز لا يملك صلاحية الدخول إلى هذا الفضاء. الصلاحيات محمية على مستوى الخادم."
          )}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to={targetRoute}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-forest"
          >
            <ArrowLeft className="h-4 w-4" />
            {auth?.role === "engineer"
              ? t("Go to Engineer Console", "Aller à la Console Ingénieur", "الذهاب إلى لوحة المهندس")
              : auth
                ? t("Go to Farmer Dashboard", "Aller au Tableau de Bord", "الذهاب إلى لوحة الفلاحة")
                : t("Sign In", "Se connecter", "تسجيل الدخول")}
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            {t("Home", "Accueil", "الرئيسية")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}