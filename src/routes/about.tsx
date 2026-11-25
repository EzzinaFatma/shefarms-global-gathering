import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Eye, HeartHandshake, Sprout, Globe2 } from "lucide-react";
import { PublicLayout } from "@/components/PublicLayout";
import { useI18n } from "@/lib/i18n";
import circleScene from "@/assets/ragouj-scenes/ragouj-farmers-circle.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SheFarms — Mission, Vision & North African Heritage" },
      { name: "description", content: "Learn about SheFarms' mission to empower women farmers in Tunisia and North Africa through digital agriculture." },
      { property: "og:title", content: "About SheFarms" },
      { property: "og:description", content: "Mission, vision, and values driving rural women's agricultural innovation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();

  const pillars = [
    { icon: Compass, title: t("Mission", "Mission", "الرسالة"), text: t("Equip women farmers with accessible precision-agriculture tools, financial clarity, and safe community transport.", "Doter les agricultrices d'outils d'agriculture de précision, de clarté financière et de transport communautaire sûr.", "تزويد النساء الفلاحات بأدوات الزراعة الدقيقة والوضوح المالي والنقل المجتمعي الآمن.") },
    { icon: Eye, title: t("Vision", "Vision", "الرؤية"), text: t("A resilient North African rural economy led by connected, digitally empowered women cooperatives.", "Une économie rurale nord-africaine résiliente portée par des coopératives féminines connectées.", "اقتصاد ريفي مرن في شمال أفريقيا تقوده تعاونيات نسائية متصلة رقمياً.") },
    { icon: HeartHandshake, title: t("Core Values", "Valeurs Clés", "القيم الأساسية"), text: t("Solidarity, scientific honesty, cultural dignity, environmental stewardship, and rural inclusion.", "Solidarité, rigueur scientifique, dignité culturelle, préservation des sols et inclusion rurale.", "التضامن، الأمانة العلمية، الهوية الثقافية، حماية البيئة، والإدماج الريفي.") },
  ];

  return (
    <PublicLayout>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            {t("Our Story", "Notre Histoire", "قصتنا")}
          </p>
          <h1 className="mt-3 font-editorial text-5xl font-bold text-forest sm:text-6xl">
            {t("Rooted in Tunisian Soil, Built for Tomorrow", "Ancré en Terre Tunisienne, Conçu pour Demain", "متجذرة في الأرض التونسية، ومصممة للمستقبل")}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t(
              "Across Béja, Siliana, Nabeul, Kairouan, and rural communities throughout North Africa, women sustain olive groves, cereal fields, and family orchards. SheFarms brings engineering precision to their daily workflows without losing sight of local cooperative culture.",
              "De Béja à Siliana, Nabeul et Kairouan, les femmes font vivre les oliveraies, les céréales et les vergers. SheFarms apporte la précision technologique à leur quotidien tout en respectant la culture coopérative locale.",
              "في باجة وسليانة ونابل والقيروان ومختلف مناطق شمال أفريقيا، تقود النساء العمل الفلاحي اليومي. تجلب شي فارمز الهندسة الدقيقة إلى عملهن مع الحفاظ على روح التعاون المحلي."
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h2 className="mt-4 font-editorial text-2xl font-bold text-forest">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="ragouj-arch-frame relative overflow-hidden border-2 border-gold/55 bg-card p-3">
            <img
              src={circleScene}
              loading="lazy"
              width={1536}
              height={1024}
              alt={t(
                "Women farmers meeting in a shaded courtyard",
                "Réunion d'agricultrices dans une cour ombragée",
                "لقاء الفلاحات في دار مظللة"
              )}
              className="ragouj-arch-frame h-80 w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              {t("From the Field", "Du Terrain", "من الحقل")}
            </p>
            <h2 className="mt-3 font-editorial text-3xl font-bold text-forest sm:text-4xl">
              {t(
                "Decisions Made Together, Under the Same Pergola",
                "Des décisions prises ensemble, sous la treille",
                "قرارات تُتخذ معاََ تحت العريشة"
              )}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(
                "Every SheFarms feature starts from a real rural scene like this one: women gathering, sharing tools, comparing notes, and agreeing on what the season needs next.",
                "Chaque fonctionnalité SheFarms part d'une scène rurelle réelle : des femmes réunies, partageant l'outillage et décidant ensemble de la suite de la saison.",
                "كل ميزة في شي فارمز تنطلق من مشهد ريفي حقيقي: نساء يجتمعن ويتبادلن المعدات ويقررن معاً ما يحتاجه الموسم."
              )}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 rounded-3xl border border-gold/35 bg-secondary/40 p-8 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Sprout className="h-5 w-5" />
              <h3 className="font-editorial text-2xl font-bold text-forest">
                {t("Digital Transformation of Rural Agriculture", "Transformation Numérique Rurale", "التحول الرقمي للفلاحة الريفية")}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(
                "By unifying soil sensor data, aerial AI detection, crop calendars, and financial records in Tunisian dinars, SheFarms turns scattered notebooks into clear, actionable farm intelligence.",
                "En unifiant capteurs de sol, imagerie IA, calendrier cultural et suivi financier en dinars tunisiens, SheFarms transforme les notes dispersées en pilotage agricole clair.",
                "من خلال توحيد بيانات التربة والصور الذكية والروزنامة الفلاحية والمالية بالدينار التونسي، تحوّل المنصة العمل اليومي إلى قرارات واضحة."
              )}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-terracotta">
              <Globe2 className="h-5 w-5" />
              <h3 className="font-editorial text-2xl font-bold text-forest">
                {t("Tunisian & North African Relevance", "Pertinence Tunisie & Afrique du Nord", "ملاءمة لتونس وشمال أفريقيا")}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(
                "Full English, French, and Arabic RTL support, water-conscious Mediterranean agronomy, and a dedicated Community Mobility module address real everyday barriers faced by rural women.",
                "Support complet anglais, français et arabe RTL, agronomie méditerranéenne économe en eau et module Mobilité Solidaire répondent aux défis concrets des femmes rurales.",
                "دعم كامل للعربية والفرنسية والإنجليزية، زراعة متوسطية مقتصدة للمياه، ووحدة التنقل التضامني لمعالجة تحديات التنقل اليومي إلى الحقول."
              )}
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/dashboard"
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-forest"
          >
            {t("Explore the Live Dashboard", "Explorer le Tableau de Bord", "استكشف لوحة التحكم")}
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}