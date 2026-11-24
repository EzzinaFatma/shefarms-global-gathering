import { CloudSun, Droplets, AlertTriangle, CheckCircle2, Sprout, ArrowUpRight, Bell } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { FarmTask, SoilReading } from "@/lib/demo-store";

interface OverviewModuleProps {
  tasks: FarmTask[];
  soilReadings: SoilReading[];
  netProfitTnd: number;
  onNavigate: (tab: string) => void;
}

export function OverviewModule({ tasks, soilReadings, netProfitTnd, onNavigate }: OverviewModuleProps) {
  const { t } = useI18n();
  const latestSoil = soilReadings[soilReadings.length - 1];
  const openTasks = tasks.filter((x) => x.status !== "completed");

  const kpis = [
    { label: t("Active Plots", "Parcelles Actives", "القطع النشطة"), value: "4 Plots · 18.5 ha", sub: t("Béja, Siliana & Nabeul", "Béja, Siliana & Nabeul", "باجة، سليانة ونابل") },
    { label: t("Soil Moisture (Latest)", "Humidité du Sol", "رطوبة التربة"), value: latestSoil ? `${latestSoil.humidity}%` : "—", sub: latestSoil ? `pH ${latestSoil.ph}` : "" },
    { label: t("Pending Tasks", "Tâches en Cours", "المهام القادمة"), value: String(openTasks.length), sub: t("Planting, Irrigation & Ops", "Semis, Irrigation & Ops", "الزراعة والري والصيانة") },
    { label: t("Net Profit (Demo)", "Bénéfice Net (Démo)", "صافي الربح (تجريبي)"), value: `${netProfitTnd.toLocaleString()} TND`, sub: t("Current cooperative cycle", "Cycle coopératif actuel", "الدورة التعاونية الحالية") },
  ];

  const alerts = [
    { level: "warning", text: t("Plot B soil probe S-03 battery below 25% — schedule maintenance.", "Capteur S-03 Parcelle B sous 25% de batterie.", "بطارية مستشعر القطعة B أقل من 25% — يرجى الصيانة.") },
    { level: "info", text: t("Community Mobility: 3 seats available tomorrow 06:15 Béja → Testour.", "Mobilité Solidaire : 3 places demain 06h15 Béja → Testour.", "التنقل التضامني: 3 مقاعد متاحة غداً 06:15 باجة ← تستور.") },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gold/40 bg-secondary/45 px-4 py-3 text-xs text-foreground">
        <span>
          <strong>{t("Demonstration Data Notice:", "Données de démonstration :", "ملاحظة تجريبية:")}</strong>{" "}
          {t("Telemetry, weather, and cooperative metrics shown here are realistic demonstration data for jury evaluation.", "La télémétrie, la météo et les indicateurs affichés sont des données de démonstration.", "بيانات الطقس والمستشعرات المعروضة هي بيانات تجريبية واقعية للعرض.")}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border bg-card p-5 shadow-xs">
            <p className="text-xs font-medium text-muted-foreground">{kpi.label}</p>
            <p className="mt-2 font-editorial text-3xl font-bold text-forest">{kpi.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Access */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-editorial text-2xl font-bold text-forest">{t("Quick Module Access", "Accès Rapide aux Modules", "الوصول السريع للوحدات")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { id: "soil", label: t("Soil Analysis", "Analyse des Sols", "تحليل التربة") },
                { id: "drone", label: t("Drone & AI Vision", "Drone & Vision IA", "الدرون والذكاء الاصطناعي") },
                { id: "mobility", label: t("Community Mobility", "Mobilité Solidaire", "التنقل التضامني") },
                { id: "tasks", label: t("Manage Tasks", "Gérer les Tâches", "إدارة المهام") },
                { id: "financial", label: t("Finances (TND)", "Finances (TND)", "المالية بالدينار") },
                { id: "learning", label: t("Learning Hub", "Formation", "التعلم والتطوير") },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-secondary/50"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-editorial text-2xl font-bold text-forest">{t("Upcoming Agricultural Tasks", "Prochaines Tâches Agricoles", "المهام الفلاحية القادمة")}</h2>
              <button type="button" onClick={() => onNavigate("tasks")} className="text-xs font-semibold text-terracotta hover:underline">
                {t("View all", "Tout voir", "عرض الكل")}
              </button>
            </div>
            <div className="mt-4 divide-y divide-border">
              {openTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.assignee} · {task.field} · {task.dueDate}</p>
                  </div>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold capitalize text-forest">{task.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Column: Weather + Alerts */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-forest p-5 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-gold">{t("Field Weather (Demo)", "Météo Terrain (Démo)", "طقس الحقل (تجريبي)")}</p>
                <p className="mt-1 text-sm text-primary-foreground/80">Béja, Tunisia</p>
              </div>
              <CloudSun className="h-9 w-9 text-gold" />
            </div>
            <p className="mt-4 font-editorial text-5xl font-bold">21°C</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-primary-foreground/80">
              <span className="flex items-center gap-1"><Droplets className="h-3.5 w-3.5" /> 58% Humidity</span>
              <span className="flex items-center gap-1"><Sprout className="h-3.5 w-3.5" /> Low Wind 11 km/h</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-terracotta" />
              <h2 className="font-editorial text-xl font-bold text-forest">{t("Alerts & Notifications", "Alertes & Notifications", "التنبيهات والإشعارات")}</h2>
            </div>
            <div className="mt-3 space-y-3">
              {alerts.map((a, idx) => (
                <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-background p-3 text-xs">
                  {a.level === "warning" ? (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                  ) : (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  )}
                  <span className="text-foreground">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}