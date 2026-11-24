import { Users, Share2, MessageSquareHeart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

const MEMBERS = [
  { name: "Amina Ben Salem", region: "Béja", specialty: "Organic Olive Oil & Drip Irrigation", mentor: true },
  { name: "Sonia Trabelsi", region: "Siliana", specialty: "Durum Wheat & Seed Conservation", mentor: true },
  { name: "Mbarka Khelifi", region: "Testour", specialty: "Cooperative Harvest Coordination", mentor: false },
];

const SHARED_RESOURCES = [
  { title: "Mobile Cold-Press Olive Mill Access", owner: "Béja Women Collective", availability: "Available Tue & Thu" },
  { title: "Solar-Powered Soil pH & Moisture Kit", owner: "Nabeul Agri-Hub", availability: "Reserve 48h ahead" },
  { title: "Organic Compost Shredder", owner: "Siliana Cooperative", availability: "Shared weekly rotation" },
];

export function CommunityModule() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 font-editorial text-2xl font-bold text-forest">
            <Users className="h-5 w-5 text-primary" />
            {t("Women Farmers & Mentors", "Agricultrices & Mentores", "الفلاحات والمرشدات")}
          </h2>
          <div className="mt-4 space-y-3">
            {MEMBERS.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.region} · {m.specialty}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success(t(`Connection request sent to ${m.name} (demo).`, `Demande envoyée à ${m.name}.`, `تم إرسال طلب تواصل إلى ${m.name}.`))}
                  className="rounded-full border border-primary px-3 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {m.mentor ? t("Request Mentorship", "Mentorat", "طلب إرشاد") : t("Connect", "Connecter", "تواصل")}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="flex items-center gap-2 font-editorial text-2xl font-bold text-forest">
            <Share2 className="h-5 w-5 text-terracotta" />
            {t("Shared Equipment & Resources", "Ressources & Équipements Partagés", "الموارد والمعدات المشتركة")}
          </h2>
          <div className="mt-4 space-y-3">
            {SHARED_RESOURCES.map((r) => (
              <div key={r.title} className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.owner} · {r.availability}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success(t(`Reservation requested for ${r.title} (demo).`, `Réservation demandée pour ${r.title}.`, `تم طلب حجز ${r.title}.`))}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-forest hover:bg-primary hover:text-primary-foreground"
                >
                  {t("Reserve", "Réserver", "حجز")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gold/40 bg-secondary/40 p-5">
        <div className="flex items-center gap-2 text-forest">
          <Sparkles className="h-5 w-5 text-terracotta" />
          <h3 className="font-editorial text-2xl font-bold">{t("Cooperative Success Story", "Histoire de Réussite", "قصة نجاح تعاونية")}</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          <MessageSquareHeart className="me-1.5 inline h-4 w-4 text-primary" />
          {t(
            "In Testour, 14 women farmers coordinated shared drip-irrigation maintenance and joint transport during the olive harvest, reducing travel delays and strengthening cooperative sales.",
            "À Testour, 14 agricultrices ont coordonné l'entretien du goutte-à-goutte et le transport partagé pendant la récolte des olives.",
            "في تستور، نسّقت 14 فلاحة صيانة الري بالتنقيط والنقل المشترك خلال موسم جني الزيتون، مما عزّز الإنتاج والتعاون."
          )}
        </p>
      </div>
    </div>
  );
}