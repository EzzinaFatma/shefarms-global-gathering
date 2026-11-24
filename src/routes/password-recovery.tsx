import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
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
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error(t("Please enter a valid email address.", "Veuillez saisir un e-mail valide.", "يرجى إدخال بريد إلكتروني صحيح."));
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setSent(true);
    toast.success(t("Password reset email sent.", "E-mail de réinitialisation envoyé.", "تم إرسال رابط استعادة كلمة المرور."));
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <h1 className="font-editorial text-4xl font-bold text-forest">{t("Password Recovery", "Mot de passe oublié", "استعادة كلمة المرور")}</h1>
          {sent ? (
            <div className="mt-5 space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("Check your inbox for the password recovery link. Opening it will bring you back to set a new password.", "Vérifiez votre boîte de réception pour le lien de récupération.", "تحقق من بريدك الإلكتروني لفتح رابط استعادة كلمة المرور.")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold">{t("Account Email", "E-mail du compte", "البريد الإلكتروني")}</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder="amina@shefarms.tn" />
              </div>
              <button type="submit" disabled={submitting} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                {submitting ? t("Sending...", "Envoi...", "جاري الإرسال...") : t("Send Recovery Link", "Envoyer le lien", "إرسال رابط الاستعادة")}
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