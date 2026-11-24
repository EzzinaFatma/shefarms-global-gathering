import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — SheFarms" },
      { name: "description", content: "Choose a new password for your SheFarms account." },
      { property: "og:title", content: "Reset Password — SheFarms" },
      { property: "og:description", content: "Set a new password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6 || password !== confirm) {
      setError(t("Passwords must match and be at least 6 characters.", "Les mots de passe doivent correspondre (6+ caractères).", "يجب أن تتطابق كلمتا المرور (6 أحرف على الأقل)."));
      return;
    }
    setError("");
    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    toast.success(t("Password updated successfully.", "Mot de passe mis à jour.", "تم تحديث كلمة المرور بنجاح."));
    await navigate({ to: "/login", replace: true });
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-xs">
          <h1 className="font-editorial text-4xl font-bold text-forest">{t("Set New Password", "Nouveau mot de passe", "تعيين كلمة مرور جديدة")}</h1>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("New Password", "Nouveau mot de passe", "كلمة المرور الجديدة")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold">{t("Confirm Password", "Confirmer", "تأكيد كلمة المرور")}</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button type="submit" disabled={submitting} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
              {submitting ? t("Updating...", "Mise à jour...", "جاري التحديث...") : t("Update Password", "Mettre à jour", "تحديث كلمة المرور")}
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}