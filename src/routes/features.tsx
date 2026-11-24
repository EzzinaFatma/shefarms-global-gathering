import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  FlaskConical,
  Radio,
  LineChart,
  Wallet,
  GraduationCap,
  Users,
  Car,
} from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Platform Features — SheFarms Agricultural Suite" },
      { name: "description", content: "Explore all ten interactive SheFarms modules: Overview, Tasks, Calendar, Soil Analysis, Drone & IoT, Analytics, Finances, Learning, Community, and Community Mobility." },
      { property: "og:title", content: "SheFarms Features" },
      { property: "og:description", content: "Complete suite of agricultural technology modules for women farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const { t } = useI18n();

  const modules = [
    { icon: LayoutDashboard, title: t("Overview Dashboard", "Vue d'Ensemble", "لوحة الملخص"), desc: t("Unified farm KPIs, soil health, weather, alerts, and quick module access.", "Indicateurs clés, santé des sols, météo, alertes et accès rapide.", "مؤشرات الأداء، حالة التربة، الطقس، التنبيهات، والوصول السريع.") },
    { icon: CheckSquare, title: t("Task Management", "Gestion des Tâches", "إدارة المهام"), desc: t("Create, edit, filter, and assign planting, irrigation, harvesting, and maintenance tasks.", "Créez, filtrez et assignez les tâches de semis, irrigation, récolte et maintenance.", "إنشاء وتعديل وتصفية مهام الزراعة والري والحصاد والصيانة.") },
    { icon: CalendarDays, title: t("Agricultural Calendar", "Calendrier Agricole", "الروزنامة الفلاحية"), desc: t("Monthly activity schedule for planting, irrigation, fertilization, and harvest teams.", "Planning mensuel pour les semis, l'irrigation, la fertilisation et la récolte.", "جدول شهري للأنشطة الفلاحية وتنسيق الفرق.") },
    { icon: FlaskConical, title: t("Soil Analysis & Smart Recommendations", "Analyse des Sols & Conseils", "تحليل التربة والتوصيات"), desc: t("Manual and sensor entry for pH, humidity, temperature, NPK, and organic matter.", "Saisie manuelle ou capteur du pH, humidité, température, NPK et matière organique.", "إدخال يدوي أو عبر المستشعرات مع توصيات مرتبطة بالقياسات.") },
    { icon: Radio, title: t("Drone & IoT Monitoring", "Drones & Capteurs IoT", "الدرون وإنترنت الأشياء"), desc: t("Telemetry dashboard, sensor network status, and FastAPI AI image detection.", "Télémétrie drone, réseau de capteurs et détection d'images IA via FastAPI.", "متابعة الدرون والمستشعرات وتحليل الصور عبر الذكاء الاصطناعي.") },
    { icon: LineChart, title: t("Agricultural Analytics", "Analytique Agricole", "التحليلات الزراعية"), desc: t("Historical soil trends, crop yield comparisons, and performance insights.", "Tendances historiques des sols, comparaisons de rendement et indicateurs.", "اتجاهات التربة التاريخية وأداء المحاصيل.") },
    { icon: Wallet, title: t("Financial Management (TND)", "Gestion Financière (TND)", "الإدارة المالية"), desc: t("Revenue, expenses, net profit, savings goals, and categorized transactions in TND.", "Revenus, dépenses, bénéfice net, épargne et transactions en dinars tunisiens.", "الإيرادات والمصاريف وصافي الربح وأهداف الادخار بالدينار التونسي.") },
    { icon: GraduationCap, title: t("Learning & Development", "Formation & Développement", "التعلم والتطوير"), desc: t("Practical agricultural courses, videos, guides, progress tracking, and certificates.", "Cours agricoles pratiques, vidéos, guides, progression et certificats.", "دورات زراعية عملية، فيديوهات، تقدم التعلم، وشهادات.") },
    { icon: Users, title: t("Community & Resource Sharing", "Communauté & Ressources", "المجتمع وتبادل الموارد"), desc: t("Women farmers' profiles, shared equipment, mentorship, and cooperative stories.", "Profils d'agricultrices, partage d'équipements, mentorat et réussites.", "ملفات الفلاحات، تبادل المعدات، الإرشاد، وقصص النجاح.") },
    { icon: Car, title: t("Community Mobility", "Mobilité Solidaire", "التنقل التضامني"), desc: t("Connect women farmers with trusted local drivers for safe shared transport to fields.", "Connecter les agricultrices avec des chauffeurs locaux pour un transport sûr.", "ربط النساء الفلاحات بسائقين محليين موثوقين للنقل الآمن إلى الحقول.") },
  ];

  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {t("Complete Suite", "Suite Complète", "المجموعة الكاملة")}
          </p>
          <h1 className="mt-3 font-editorial text-5xl font-bold text-forest sm:text-6xl">
            {t("Ten Modules Engineered for Rural Impact", "Dix Modules Conçus pour l'Impact Rural", "عشر وحدات مصممة للأثر الريفي")}
          </h1>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div key={mod.title} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6">
                <div>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 font-editorial text-2xl font-bold text-forest">{mod.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.desc}</p>
                </div>
                <Link
                  to="/dashboard"
                  className="mt-5 inline-flex text-xs font-semibold uppercase tracking-wider text-terracotta hover:underline"
                >
                  {t("Open in Dashboard →", "Ouvrir dans le tableau de bord →", "فتح في لوحة التحكم ←")}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}