import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sprout,
  Cpu,
  Radio,
  Car,
  BarChart3,
  Wallet,
  BookOpen,
  Users,
  ShieldCheck,
  Layers,
} from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { SceneFilmstrip } from "@/components/SceneFilmstrip";
import { useI18n } from "@/lib/i18n";
import ragoujHero from "@/assets/ragouj-hero.jpg";
import ragoujHeroVideo from "@/assets/ragouj-hero.mp4.asset.json";
import ragoujCourtyard from "@/assets/ragouj-courtyard.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SheFarms — Growing Together. Empowering Women. Transforming Agriculture." },
      {
        name: "description",
        content:
          "SheFarms connects women farmers with intelligent agricultural tools, soil analytics, drone & IoT monitoring, and community mobility across Tunisia and North Africa.",
      },
      { property: "og:title", content: "SheFarms — Agricultural Intelligence for Women Farmers" },
      {
        property: "og:description",
        content:
          "Precision agriculture, soil intelligence, drone AI analysis, financial tracking in TND, and rural community mobility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const SDGS = [
  { num: "SDG 2", title: "Zero Hunger", link: "Precision soil diagnostics and crop planning support resilient harvests." },
  { num: "SDG 5", title: "Gender Equality", link: "Designed around women farmers' leadership, financial autonomy, and safe rural mobility." },
  { num: "SDG 8", title: "Decent Work & Growth", link: "Cooperative financial tracking in TND and shared logistics strengthen rural livelihoods." },
  { num: "SDG 9", title: "Industry & Innovation", link: "Accessible IoT telemetry, drone imagery, and AI vision bring modern engineering to rural plots." },
  { num: "SDG 12", title: "Responsible Production", link: "Targeted fertilization and drip irrigation reduce water and input waste." },
  { num: "SDG 13", title: "Climate Action", link: "Weather-aware scheduling and soil moisture tracking aid climate adaptation." },
  { num: "SDG 15", title: "Life on Land", link: "Organic matter monitoring and balanced NPK guidance protect Mediterranean soils." },
];

function HomePage() {
  const { t } = useI18n();

  const capabilities = [
    { icon: Sprout, title: t("Soil Intelligence", "Intelligence des sols", "تحليل التربة الذكي"), desc: t("Track pH, NPK, humidity, and organic matter with measurement-linked guidance.", "Suivez pH, NPK, humidité et matière organique avec des recommandations ciblées.", "تتبع الحموضة والرطوبة والعناصر الغذائية مع توصيات مرتبطة بالقياسات.") },
    { icon: Radio, title: t("Drone & IoT Vision", "Drones & IoT", "المراقبة بالدرون وإنترنت الأشياء"), desc: t("Monitor field telemetry and run AI crop image analysis via FastAPI.", "Suivez la télémétrie terrain et analysez les images agricoles par IA.", "مراقبة المستشعرات وتحليل صور المحاصيل بالذكاء الاصطناعي.") },
    { icon: Car, title: t("Community Mobility", "Mobilité Solidaire", "التنقل التضامني"), desc: t("Coordinate safe, shared rural transport between women farmers and trusted local drivers.", "Coordonnez un transport rural sûr et partagé entre agricultrices et chauffeurs locaux.", "تنسيق النقل الريفي الآمن والمشترك بين الفلاحات والسائقين المحليين.") },
    { icon: Wallet, title: t("Financial Management (TND)", "Gestion Financière (TND)", "الإدارة المالية بالدينار التونسي"), desc: t("Track cooperative revenue, expenses, net profit, and savings goals in Tunisian dinars.", "Suivez revenus, dépenses, bénéfice net et objectifs d'épargne en dinars tunisiens.", "تتبع الإيرادات والمصاريف وصافي الربح وأهداف الادخار بالدينار التونسي.") },
    { icon: BarChart3, title: t("Task & Calendar Ops", "Tâches & Calendrier", "المهام والروزنامة الفلاحية"), desc: t("Plan planting, irrigation, fertilization, and harvests with team coordination.", "Planifiez semis, irrigation, fertilisation et récoltes en équipe.", "تخطيط الزراعة والري والتسميد والحصاد بالتنسيق الجماعي.") },
    { icon: BookOpen, title: t("Learning & Community", "Formation & Communauté", "التعلم والمجتمع"), desc: t("Practical agronomic courses, digital literacy, mentorship, and shared resources.", "Cours agronomiques pratiques, compétences numériques et mentorat.", "دورات زراعية عملية ومهارات رقمية وتبادل الخبرات والموارد.") },
  ];

  const architectureSteps = [
    t("User Interface (EN / FR / AR RTL)", "Interface Utilisateur (EN / FR / AR RTL)", "واجهة المستخدم (ثلاث لغات)"),
    t("Agricultural Management System", "Système de Gestion Agricole", "نظام الإدارة الفلاحية"),
    t("Data Collection & Processing", "Collecte & Traitement des Données", "جمع ومعالجة البيانات"),
    t("IoT / Drone / AI Analysis", "Analyse IoT / Drone / IA", "تحليل المستشعرات والدرون والذكاء الاصطناعي"),
    t("Agricultural Insights & Decision Support", "Aide à la Décision Agronomique", "الرؤى الزراعية ودعم القرار"),
  ];

  return (
    <PublicLayout>
      {/* Editorial Hero */}
      <section className="relative overflow-hidden bg-forest text-primary-foreground">
        <video
          src={ragoujHeroVideo.url}
          poster={ragoujHero}
          autoPlay
          loop
          muted
          playsInline
          aria-label={t("Golden-hour rural Tunisian village scene", "Scène cinématographique d'un village rural tunisien", "مشهد سينمائي لقرية ريفية تونسية")}
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/55 to-forest/20" />
        <div className="ragouj-film-grain pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-forest/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {t("Tunisian & North African AgriTech", "AgriTech Tunisie & Afrique du Nord", "التكنولوجيا الزراعية في تونس وشمال أفريقيا")}
          </p>
          <h1 className="mt-6 max-w-3xl font-editorial text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {t(
              "Growing Together. Empowering Women. Transforming Agriculture.",
              "Grandir Ensemble. Autonomiser les Femmes. Transformer l'Agriculture.",
              "ننمو معاً. نمكّن المرأة. نطوّر الفلاحة."
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            {t(
              "SheFarms connects women farmers with intelligent agricultural tools, shared resources, and community-driven opportunities to build more productive and sustainable rural communities.",
              "SheFarms connecte les agricultrices à des outils agricoles intelligents, des ressources partagées et des opportunités communautaires pour bâtir des territoires ruraux durables.",
              "تربط شي فارمز النساء الفلاحات بأدوات زراعية ذكية وموارد مشتركة وفرص تعاونية لبناء مجتمعات ريفية أكثر إنتاجية واستدامة."
            )}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-terracotta-foreground shadow-lg transition-transform hover:scale-[1.02]"
            >
              {t("Explore the Platform", "Explorer la Plateforme", "استكشف المنصة")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-forest/50 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-forest/80"
            >
              {t("Discover Our Mission", "Découvrir Notre Mission", "اكتشف رسالتنا")}
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="font-editorial text-4xl font-bold text-forest sm:text-5xl">
              {t(
                "Bridging Rural Reality and Precision Engineering",
                "Relier la Réalité Rurale à l'Ingénierie de Précision",
                "جسر بين الواقع الريفي والهندسة الدقيقة"
              )}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                <strong className="text-foreground">{t("The Challenge:", "Le Défi :", "التحدي:")}</strong>{" "}
                {t(
                  "Women form the backbone of rural agriculture across Tunisia and North Africa, yet face fragmented access to soil diagnostics, climate data, financial tools, and safe daily transportation to agricultural fields.",
                  "Les femmes sont le pilier de l'agriculture rurale en Tunisie et en Afrique du Nord, mais font face à un accès limité aux diagnostics des sols, aux outils financiers et au transport sûr vers les champs.",
                  "تشكّل النساء ركيزة أساسية في الفلاحة الريفية بتونس وشمال أفريقيا، لكنهن يواجهن صعوبة في الوصول إلى تحليل التربة، الأدوات المالية، والنقل الآمن اليومي إلى الحقول."
                )}
              </p>
              <p>
                <strong className="text-foreground">{t("The SheFarms Solution:", "La Solution SheFarms :", "حل شي فارمز:")}</strong>{" "}
                {t(
                  "One unified agricultural workspace combining soil analytics, IoT & drone AI vision, task and calendar coordination, TND financial tracking, practical learning, and Community Mobility.",
                  "Un espace agricole unifié combinant analyse des sols, drones & IA, planification des tâches, suivi financier en TND, formation pratique et Mobilité Solidaire.",
                  "مساحة عمل زراعية موحّدة تجمع تحليل التربة، الدرون والذكاء الاصطناعي، إدارة المهام والروزنامة، المالية بالدينار التونسي، التعلم، والتنقل التضامني."
                )}
              </p>
            </div>
          </div>
          <div className="ragouj-arch-frame relative overflow-hidden border-2 border-gold/55 bg-card p-3">
            <img
              src={ragoujCourtyard}
              loading="lazy"
              width={1280}
              height={896}
              alt={t("Agricultural drone monitoring fields", "Drone agricole surveillant les parcelles", "طائرة مسيّرة تراقب الحقول الفلاحية")}
              className="ragouj-arch-frame h-96 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <SceneFilmstrip />

      <div className="shefarms-divider mx-auto max-w-5xl" />

      {/* Platform Capabilities */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-editorial text-4xl font-bold text-forest sm:text-5xl">
            {t("Integrated Platform Modules", "Modules Intégrés de la Plateforme", "وحدات المنصة المتكاملة")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t(
              "Every module is interactive and engineered to work together in one cohesive workspace.",
              "Chaque module est interactif et conçu pour fonctionner ensemble dans un espace unifié.",
              "كل وحدة تفاعلية ومصممة للعمل بانسجام ضمن فضاء واحد."
            )}
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-editorial text-2xl font-bold text-forest">{cap.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Engineering Architecture */}
      <section className="tunisian-pattern border-y border-border bg-secondary/45 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-editorial text-4xl font-bold text-forest">
              {t("Technical Architecture Flow", "Architecture Technique", "البنية التقنية للمنصة")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "From field telemetry and aerial imagery to actionable decision support.",
                "De la télémétrie terrain et l'imagerie aérienne à l'aide à la décision.",
                "من مستشعرات الحقل والصور الجوية إلى دعم القرار الزراعي."
              )}
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3">
            {architectureSteps.map((step, idx) => (
              <div key={step} className="flex w-full max-w-xl flex-col items-center">
                <div className="flex w-full items-center justify-between rounded-xl border border-gold/40 bg-card px-5 py-3.5 shadow-xs">
                  <span className="flex items-center gap-3 text-sm font-semibold text-forest">
                    <Layers className="h-4 w-4 text-terracotta" />
                    {step}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">0{idx + 1}</span>
                </div>
                {idx < architectureSteps.length - 1 && (
                  <div className="h-5 w-px bg-gold/70" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="font-editorial text-4xl font-bold text-forest sm:text-5xl">
              {t("Sustainable Development Goals Alignment", "Alignement avec les ODD", "التوافق مع أهداف التنمية المستدامة")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "How SheFarms capabilities directly support seven UN Sustainable Development Goals.",
                "Comment les capacités de SheFarms soutiennent directement sept Objectifs de Développement Durable.",
                "كيف تساهم قدرات المنصة مباشرة في سبعة من أهداف التنمية المستدامة."
              )}
            </p>
          </div>
          <ShieldCheck className="h-9 w-9 text-gold" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SDGS.map((sdg) => (
            <div key={sdg.num} className="rounded-2xl border border-border bg-card p-5">
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {sdg.num}
              </span>
              <h3 className="mt-3 font-editorial text-xl font-bold text-forest">{sdg.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{sdg.link}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
          <Users className="h-8 w-8 text-gold" />
          <h2 className="mt-4 font-editorial text-4xl font-bold sm:text-5xl">
            {t("Experience the Complete Agricultural Workspace", "Découvrez l'Espace Agricole Complet", "جرّب مساحة العمل الزراعية الكاملة")}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/80">
            {t(
              "Explore soil analytics, drone AI detection, task planning, TND finances, learning, and Community Mobility.",
              "Explorez l'analyse des sols, la détection IA, les tâches, les finances en TND, la formation et la Mobilité Solidaire.",
              "استكشف تحليل التربة، كشف الدرون بالذكاء الاصطناعي، المهام، المالية بالدينار، التعلم، والتنقل التضامني."
            )}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-full bg-terracotta px-7 py-3 text-sm font-semibold text-terracotta-foreground hover:opacity-95"
            >
              {t("Launch Dashboard", "Ouvrir le Tableau de Bord", "فتح لوحة التحكم")}
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-gold/60 px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary"
            >
              {t("Partner With Us", "Devenir Partenaire", "تواصل معنا")}
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
