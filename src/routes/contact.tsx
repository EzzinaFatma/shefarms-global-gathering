import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact SheFarms — Partnerships & Support" },
      { name: "description", content: "Contact the SheFarms team for agricultural cooperative partnerships, demos, and technical inquiries." },
      { property: "og:title", content: "Contact SheFarms" },
      { property: "og:description", content: "Get in touch with SheFarms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || message.trim().length < 10) {
      setError(
        t(
          "Please enter your name, a valid email address, and a message of at least 10 characters.",
          "Veuillez saisir votre nom, un e-mail valide et un message d'au moins 10 caractères.",
          "يرجى إدخال الاسم، بريد إلكتروني صحيح، ورسالة لا تقل عن 10 أحرف."
        )
      );
      return;
    }
    setError("");
    setSubmitted(true);
    toast.success(
      t(
        "Message recorded (demonstration form — no external email server connected).",
        "Message enregistré (formulaire de démonstration).",
        "تم تسجيل رسالتك بنجاح (نموذج تجريبي)."
      )
    );
  };

  return (
    <PublicLayout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              {t("Get in Touch", "Contactez-nous", "تواصل معنا")}
            </p>
            <h1 className="mt-3 font-editorial text-5xl font-bold text-forest">
              {t("Connect With SheFarms", "Échangeons Ensemble", "تواصل مع شي فارمز")}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t(
                "Interested in piloting SheFarms with a women's agricultural cooperative or evaluating our Smart SDGs architecture? Reach out below.",
                "Vous souhaitez déployer SheFarms avec une coopérative féminine ou évaluer notre architecture Smart SDGs ? Écrivez-nous.",
                "هل ترغب في تجربة شي فارمز مع تعاونية فلاحية نسائية أو مناقشة البنية التقنية؟ راسلنا أدناه."
              )}
            </p>
            <div className="mt-8 space-y-4 text-sm text-foreground">
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /><span>Tunis & Béja, Tunisia</span></div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /><span>contact@shefarms.tn</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /><span>+216 71 000 420</span></div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8 lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h2 className="mt-4 font-editorial text-3xl font-bold text-forest">
                  {t("Thank You for Reaching Out", "Merci pour Votre Message", "شكراً لتواصلك معنا")}
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {t(
                    "Your inquiry has been captured in this frontend demonstration.",
                    "Votre demande a bien été enregistrée dans cette démonstration.",
                    "تم استلام استفسارك بنجاح في هذه النسخة التجريبية."
                  )}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  {t("Send Another Message", "Envoyer un autre message", "إرسال رسالة أخرى")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">{t("Full Name", "Nom complet", "الاسم الكامل")}</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder="Fatma Ezzina" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">{t("Email", "E-mail", "البريد الإلكتروني")}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder="name@example.tn" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">{t("Subject", "Sujet", "الموضوع")}</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder={t("Cooperative Partnership", "Partenariat coopératif", "شراكة تعاونية")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">{t("Message", "Message", "الرسالة")}</label>
                  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm" placeholder={t("Tell us how we can collaborate...", "Expliquez comment nous pouvons collaborer...", "أخبرنا كيف يمكننا التعاون...")} />
                </div>
                {error && <p className="text-xs font-medium text-destructive">{error}</p>}
                <button type="submit" className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-forest">
                  {t("Send Message", "Envoyer le message", "إرسال الرسالة")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}