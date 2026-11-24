import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — SheFarms" },
      { name: "description", content: "Sign in to your SheFarms agricultural management dashboard." },
      { property: "og:title", content: "Sign In — SheFarms" },
      { property: "og:description", content: "Access your SheFarms dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [email, setEmail] = useState("amina@shefarms.tn");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 6) {
      setError(t("Enter a valid email and a password of at least 6 characters.", "Saisissez un e-mail valide et un mot de passe d'au moins 6 caractères.", "أدخل بريداً إلكترونياً صحيحاً وكلمة مرور من 6 أحرف على الأقل."));
      return;
    }
    setError("");
    toast.success(t("Signed in (demo session)", "Connecté (session de démonstration)", "تم تسجيل الدخول (جلسة تجريبية)"));
    void navigate({ to: "/dashboard" });
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">SheFarms</p>
          <h1 className="mt-2 font-editorial text-4xl font-bold text-forest">{t("Welcome Back", "Bon Retour", "مرحباً بعودتك")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("Sign in to access your farm workspace.", "Connectez-vous à votre espace agricole.", "سجّل الدخول للوصول إلى مساحتك الفلاحية.")}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Email", "E-mail", "البريد الإلكتروني")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Password", "Mot de passe", "كلمة المرور")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-forest">
              {t("Sign In", "Se connecter", "تسجيل الدخول")}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <Link to="/password-recovery" className="hover:text-primary">{t("Forgot password?", "Mot de passe oublié ?", "نسيت كلمة المرور؟")}</Link>
            <Link to="/register" className="font-semibold text-primary hover:underline">{t("Create account", "Créer un compte", "إنشاء حساب")}</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}