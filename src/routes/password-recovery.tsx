import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/password-recovery")({
  head: () => ({
    meta: [
      { title: "Password Recovery — SheFarms" },
      { name: "description", content: "Recover access to your SheFarms account." },
      { property: "og:title", content: "Password Recovery — SheFarms" },
      { property: "og:description", content: "Request a password reset link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PasswordRecoveryPage,
});

function PasswordRecoveryPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error(t("Please enter a valid email address.", "Veuillez saisir un e-mail valide.", "يرجى إدخال بريد إلكتروني صحيح."));
      return;
    }
    setSent(true);
    toast.success(t("Reset link prepared (demo flow).", "Lien de réinitialisation prêt (démonstration).", "تم تجهيز رابط الاستعادة (تجريبي)."));
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <h1 className="font-editorial text-4xl font-bold text-forest">{t("Password Recovery", "Mot de passe oublié", "استعادة كلمة المرور")}</h1>
          {sent ? (
            <div className="mt-5 space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("In this frontend demonstration, you can proceed directly to the password reset page.", "Dans cette démonstration, vous pouvez accéder directement à la page de réinitialisation.", "في هذه النسخة التجريبية يمكنك الانتقال مباشرة إلى صفحة تعيين كلمة المرور.")}
              </p>
              <Link to="/reset-password" className="block w-full rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground">
                {t("Continue to Reset Password", "Réinitialiser le mot de passe", "متابعة تعيين كلمة المرور")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold">{t("Account Email", "E-mail du compte", "البريد الإلكتروني")}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder="amina@shefarms.tn" />
              </div>
              <button type="submit" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
                {t("Send Recovery Link", "Envoyer le lien", "إرسال رابط الاستعادة")}
              </button>
            </form>
          )}
          <p className="mt-5 text-center text-xs">
            <Link to="/login" className="text-primary hover:underline">{t("Back to Sign In", "Retour à la connexion", "العودة لتسجيل الدخول")}</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}