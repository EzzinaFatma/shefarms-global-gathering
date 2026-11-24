import { useEffect, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
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
  Menu,
  X,
  Globe,
  Home,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getAuthContext } from "@/lib/auth.functions";
import { useAuthSession } from "@/lib/use-auth-session";
import { useI18n, type Language } from "@/lib/i18n";
import {
  INITIAL_CALENDAR,
  INITIAL_JOURNEYS,
  INITIAL_REQUESTS,
  INITIAL_SOIL_READINGS,
  INITIAL_TASKS,
  INITIAL_TRANSACTIONS,
  loadStored,
  saveStored,
  type CalendarActivity,
  type FarmTask,
  type FinancialTransaction,
  type MobilityJourney,
  type MobilityRequest,
  type SoilReading,
} from "@/lib/demo-store";
import { OverviewModule } from "@/components/dashboard/OverviewModule";
import { TasksModule } from "@/components/dashboard/TasksModule";
import { CalendarModule } from "@/components/dashboard/CalendarModule";
import { SoilModule } from "@/components/dashboard/SoilModule";
import { DroneIoTModule } from "@/components/dashboard/DroneIoTModule";
import { AnalyticsModule } from "@/components/dashboard/AnalyticsModule";
import { FinancialModule } from "@/components/dashboard/FinancialModule";
import { LearningModule } from "@/components/dashboard/LearningModule";
import { CommunityModule } from "@/components/dashboard/CommunityModule";
import { MobilityModule } from "@/components/dashboard/MobilityModule";
import ragoujHero from "@/assets/ragouj-hero.jpg";
import ragoujHeroVideo from "@/assets/ragouj-hero.mp4.asset.json";

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({ to: "/login" });
    }
    const authCtx = await getAuthContext();
    if (authCtx.role === "engineer") {
      throw redirect({ to: "/engineer" });
    }
  },
  head: () => ({
    meta: [
      { title: "Agricultural Management Dashboard — SheFarms" },
      { name: "description", content: "Manage farm tasks, calendar, soil diagnostics, drone & IoT vision, TND finances, learning, community, and Community Mobility." },
      { property: "og:title", content: "SheFarms Dashboard" },
      { property: "og:description", content: "Complete agricultural intelligence workspace for women farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { lang, setLang, t } = useI18n();
  const { auth, signOut } = useAuthSession();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [tasks, setTasks] = useState<FarmTask[]>(INITIAL_TASKS);
  const [calendar, setCalendar] = useState<CalendarActivity[]>(INITIAL_CALENDAR);
  const [soilReadings, setSoilReadings] = useState<SoilReading[]>(INITIAL_SOIL_READINGS);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [journeys, setJourneys] = useState<MobilityJourney[]>(INITIAL_JOURNEYS);
  const [requests, setRequests] = useState<MobilityRequest[]>(INITIAL_REQUESTS);

  useEffect(() => {
    setTasks(loadStored("shefarms_tasks", INITIAL_TASKS));
    setCalendar(loadStored("shefarms_calendar", INITIAL_CALENDAR));
    setSoilReadings(loadStored("shefarms_soil", INITIAL_SOIL_READINGS));
    setTransactions(loadStored("shefarms_tx", INITIAL_TRANSACTIONS));
    setJourneys(loadStored("shefarms_journeys", INITIAL_JOURNEYS));
    setRequests(loadStored("shefarms_requests", INITIAL_REQUESTS));
  }, []);

  const updateTasks = (next: FarmTask[]) => { setTasks(next); saveStored("shefarms_tasks", next); };
  const updateCalendar = (next: CalendarActivity[]) => { setCalendar(next); saveStored("shefarms_calendar", next); };
  const addSoil = (entry: SoilReading) => { const next = [...soilReadings, entry]; setSoilReadings(next); saveStored("shefarms_soil", next); };
  const addTx = (tx: FinancialTransaction) => { const next = [tx, ...transactions]; setTransactions(next); saveStored("shefarms_tx", next); };
  const updateJourneys = (next: MobilityJourney[]) => { setJourneys(next); saveStored("shefarms_journeys", next); };
  const updateRequests = (next: MobilityRequest[]) => { setRequests(next); saveStored("shefarms_requests", next); };

  const netProfitTnd = transactions.reduce((sum, tx) => sum + (tx.type === "revenue" ? tx.amountTnd : -tx.amountTnd), 0);

  const navItems = [
    { id: "overview", icon: LayoutDashboard, label: t("Overview", "Vue d'Ensemble", "الملخص") },
    { id: "tasks", icon: CheckSquare, label: t("Tasks", "Tâches", "المهام") },
    { id: "calendar", icon: CalendarDays, label: t("Calendar", "Calendrier", "الروزنامة") },
    { id: "soil", icon: FlaskConical, label: t("Soil Analysis", "Analyse des Sols", "تحليل التربة") },
    { id: "drone", icon: Radio, label: t("Drone & IoT", "Drone & IoT", "الدرون و IoT") },
    { id: "analytics", icon: LineChart, label: t("Analytics", "Analytique", "التحليلات") },
    { id: "financial", icon: Wallet, label: t("Financial (TND)", "Finances (TND)", "المالية (د.ت)") },
    { id: "learning", icon: GraduationCap, label: t("Learning", "Formation", "التعلم") },
    { id: "community", icon: Users, label: t("Community", "Communauté", "المجتمع") },
    { id: "mobility", icon: Car, label: t("Community Mobility", "Mobilité Solidaire", "التنقل التضامني") },
  ];

  const currentItem = navItems.find((n) => n.id === activeTab) ?? navItems[0];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-e border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
          <img src="/images/shefarms-logo.jpg" alt="SheFarms" className="h-8 w-8 rounded-full border border-gold/50 object-cover" />
          <span className="font-editorial text-2xl font-bold">SheFarms</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0 text-gold" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-sidebar-border p-4">
          {auth?.email && (
            <p className="truncate text-[11px] text-sidebar-foreground/65">{auth.email}</p>
          )}
          <Link to="/" className="flex items-center gap-2 text-xs text-sidebar-foreground/80 hover:text-gold">
            <Home className="h-4 w-4" />
            {t("Back to Public Site", "Retour au site public", "العودة للموقع الرئيسي")}
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex w-full items-center gap-2 text-xs text-terracotta hover:underline"
          >
            <LogOut className="h-4 w-4" />
            {t("Sign Out", "Déconnexion", "تسجيل الخروج")}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 bg-sidebar p-4 text-sidebar-foreground shadow-xl">
            <div className="flex items-center justify-between border-b border-sidebar-border pb-3">
              <span className="font-editorial text-xl font-bold">SheFarms</span>
              <button type="button" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setActiveTab(item.id); setMobileNavOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                      activeTab === item.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          <button type="button" className="flex-1 bg-foreground/40" onClick={() => setMobileNavOpen(false)} aria-label="Close backdrop" />
        </div>
      )}

      {/* Main Workspace */}
      <div className="ragouj-plaster flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileNavOpen(true)} className="rounded-lg border border-border p-2 lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-editorial text-2xl font-bold text-forest sm:text-3xl">{currentItem?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-border bg-background p-0.5">
              <Globe className="mx-1.5 h-3.5 w-3.5 text-muted-foreground" />
              {(["en", "fr", "ar"] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    lang === code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {code === "ar" ? "عربي" : code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-gold/45 bg-forest text-primary-foreground shadow-md">
                <video
                  src={ragoujHeroVideo.url}
                  poster={ragoujHero}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-44 w-full object-cover opacity-65 sm:h-52"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/50 to-transparent" />
                <div className="ragouj-film-grain pointer-events-none absolute inset-0" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {t("Ragouj Rural Cooperative · Live Field Scene", "Coopérative Rurale de Ragouj · Scène en Direct", "تعاونية رقوج الفلاحية · مشهد مباشر من القرية")}
                  </p>
                  <h2 className="mt-1 font-editorial text-2xl font-bold sm:text-4xl">
                    {t("Welcome Inside the Village Fields", "Bienvenue au Cœur des Terres de Ragouj", "مرحباً بكم في قلب أراضي رقوج")}
                  </h2>
                </div>
              </div>
              <OverviewModule tasks={tasks} soilReadings={soilReadings} netProfitTnd={netProfitTnd} onNavigate={setActiveTab} />
            </div>
          )}
          {activeTab === "tasks" && <TasksModule tasks={tasks} onChange={updateTasks} />}
          {activeTab === "calendar" && <CalendarModule activities={calendar} onChange={updateCalendar} />}
          {activeTab === "soil" && <SoilModule readings={soilReadings} onAdd={addSoil} />}
          {activeTab === "drone" && <DroneIoTModule />}
          {activeTab === "analytics" && <AnalyticsModule readings={soilReadings} />}
          {activeTab === "financial" && <FinancialModule transactions={transactions} onAdd={addTx} />}
          {activeTab === "learning" && <LearningModule />}
          {activeTab === "community" && <CommunityModule />}
          {activeTab === "mobility" && (
            <MobilityModule journeys={journeys} requests={requests} onJourneysChange={updateJourneys} onRequestsChange={updateRequests} />
          )}
        </main>
      </div>
    </div>
  );
}