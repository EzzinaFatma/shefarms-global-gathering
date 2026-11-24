import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, X, Sprout, ArrowUpRight } from "lucide-react";
import { useI18n, type Language } from "@/lib/i18n";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "عربي" },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { to: "/" as const, label: t("Home", "Accueil", "الرئيسية") },
    { to: "/about" as const, label: t("About", "À propos", "من نحن") },
    { to: "/features" as const, label: t("Features", "Fonctionnalités", "الميزات") },
    { to: "/contact" as const, label: t("Contact", "Contact", "اتصل بنا") },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/images/shefarms-logo.jpg"
              alt="SheFarms"
              className="h-9 w-9 rounded-full border border-gold/50 object-cover"
            />
            <span className="font-editorial text-2xl font-bold tracking-tight text-forest">
              SheFarms
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.to
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center rounded-full border border-border bg-card p-0.5">
              <Globe className="mx-2 h-3.5 w-3.5 text-muted-foreground" />
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    lang === item.code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link
              to="/login"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t("Sign In", "Connexion", "تسجيل الدخول")}
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-forest"
            >
              {t("Dashboard", "Tableau de bord", "لوحة التحكم")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-border p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-border bg-card px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLang(item.code)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      lang === item.code
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg border border-border px-3 py-2 text-center text-sm font-medium"
                >
                  {t("Sign In", "Connexion", "دخول")}
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  {t("Dashboard", "Plateforme", "لوحة التحكم")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-forest text-sidebar-foreground">
        <div className="shefarms-divider" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Sprout className="h-6 w-6 text-gold" />
              <span className="font-editorial text-2xl font-bold">SheFarms</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-sidebar-foreground/80">
              {t(
                "Empowering women farmers across Tunisia and North Africa with precision agriculture, soil intelligence, shared mobility, and cooperative resilience.",
                "Autonomiser les agricultrices en Tunisie et en Afrique du Nord grâce à l'agriculture de précision, l'analyse des sols et la mobilité solidaire.",
                "تمكين النساء الفلاحات في تونس وشمال أفريقيا عبر الزراعة الذكية، تحليل التربة، التنقل التضامني، وتبادل الموارد."
              )}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("Platform", "Plateforme", "المنصة")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-sidebar-foreground/80">
              <li><Link to="/about" className="hover:text-gold">{t("Our Mission", "Notre mission", "رسالتنا")}</Link></li>
              <li><Link to="/features" className="hover:text-gold">{t("Modules", "Modules", "الوحدات")}</Link></li>
              <li><Link to="/dashboard" className="hover:text-gold">{t("Agricultural Dashboard", "Tableau de bord", "لوحة التحكم")}</Link></li>
              <li><Link to="/contact" className="hover:text-gold">{t("Contact", "Contact", "اتصل بنا")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("Access", "Accès", "الحساب")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-sidebar-foreground/80">
              <li><Link to="/login" className="hover:text-gold">{t("Sign In", "Connexion", "تسجيل الدخول")}</Link></li>
              <li><Link to="/register" className="hover:text-gold">{t("Create Account", "Créer un compte", "إنشاء حساب")}</Link></li>
              <li><Link to="/password-recovery" className="hover:text-gold">{t("Password Recovery", "Mot de passe oublié", "استعادة كلمة المرور")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sidebar-border px-4 py-4 text-center text-xs text-sidebar-foreground/65">
          © 2026 SheFarms · {t("Tunisia & North Africa Smart SDGs AgriTech Platform", "Plateforme AgriTech Smart SDGs Tunisie & Afrique du Nord", "منصة التكنولوجيا الزراعية الذكية لتونس وشمال أفريقيا")}
        </div>
      </footer>
    </div>
  );
}