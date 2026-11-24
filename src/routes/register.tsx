import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — SheFarms" },
      { name: "description", content: "Join SheFarms to access agricultural management tools and community mobility." },
      { property: "og:title", content: "Register — SheFarms" },
      { property: "og:description", content: "Create your SheFarms account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [region, setRegion] = useState("Béja");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.includes("@") || password.length < 6) {
      setError(t("Please fill in your name, valid email, and a 6+ character password.", "Veuillez remplir votre nom, e-mail valide et un mot de passe de 6+ caractères.", "يرجى إدخال الاسم وبريد صحيح وكلمة مرور من 6 أحرف على الأقل."));
      return;
    }
    setError("");
    toast.success(t("Account created (demo registration)", "Compte créé (démonstration)", "تم إنشاء الحساب بنجاح (تجريبي)"));
    void navigate({ to: "/dashboard" });
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">SheFarms</p>
          <h1 className="mt-2 font-editorial text-4xl font-bold text-forest">{t("Join SheFarms", "Rejoindre SheFarms", "انضم إلى شي فارمز")}</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Full Name", "Nom complet", "الاسم الكامل")}</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder="Amina Ben Salem" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Email", "E-mail", "البريد الإلكتروني")}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder="amina@cooperative.tn" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Governorate / Region", "Gouvernorat / Région", "الولاية / المنطقة")}</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm">
                <option>Béja</option>
                <option>Nabeul</option>
                <option>Siliana</option>
                <option>Kairouan</option>
                <option>Jendouba</option>
                <option>Sfax</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Password", "Mot de passe", "كلمة المرور")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-forest">
              {t("Create Account", "Créer mon compte", "إنشاء حساب")}
            </button>
          </form>
          <p className="mt-5 text-center text-xs text-muted-foreground">
            {t("Already have an account?", "Déjà inscrit ?", "لديك حساب بالفعل؟")}{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">{t("Sign In", "Connexion", "تسجيل الدخول")}</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}