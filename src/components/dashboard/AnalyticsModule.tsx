import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from "recharts";
import { useI18n } from "@/lib/i18n";
import type { SoilReading } from "@/lib/demo-store";

const CROP_PERFORMANCE = [
  { crop: "Chetoui Olives", yieldKgHa: 2850, targetKgHa: 3000 },
  { crop: "Durum Wheat", yieldKgHa: 3420, targetKgHa: 3500 },
  { crop: "Cap Bon Tomatoes", yieldKgHa: 4900, targetKgHa: 4600 },
  { crop: "Citrus Orchards", yieldKgHa: 4120, targetKgHa: 4200 },
];

export function AnalyticsModule({ readings }: { readings: SoilReading[] }) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("Crop Yield vs Target (kg/ha · Demo)", "Rendement vs Objectif (kg/ha)", "الإنتاجية مقابل الهدف (كغ/هكتار)")}</h2>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CROP_PERFORMANCE}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="crop" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="yieldKgHa" name="Observed (kg/ha)" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="targetKgHa" name="Target (kg/ha)" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("Soil Organic Matter & pH Trend", "Tendance Matière Organique & pH", "اتجاه المادة العضوية والحموضة")}</h2>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="organicMatter" name="Organic Matter (%)" stroke="var(--chart-1)" fill="var(--chart-5)" fillOpacity={0.35} />
                <Area type="monotone" dataKey="ph" name="Soil pH" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.18} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}