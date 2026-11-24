import { useState, type FormEvent } from "react";
import { FlaskConical, Cpu, Sparkles } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import type { SoilReading } from "@/lib/demo-store";

interface SoilModuleProps {
  readings: SoilReading[];
  onAdd: (reading: SoilReading) => void;
}

export function SoilModule({ readings, onAdd }: SoilModuleProps) {
  const { t } = useI18n();
  const [plot, setPlot] = useState("Plot A — Olive Grove");
  const [source, setSource] = useState<"manual" | "sensor">("manual");
  const [ph, setPh] = useState("6.9");
  const [humidity, setHumidity] = useState("58");
  const [temperature, setTemperature] = useState("21");
  const [nitrogen, setNitrogen] = useState("45");
  const [phosphorus, setPhosphorus] = useState("29");
  const [potassium, setPotassium] = useState("175");
  const [organicMatter, setOrganicMatter] = useState("2.9");

  const latest = readings[readings.length - 1];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const vals = [ph, humidity, temperature, nitrogen, phosphorus, potassium, organicMatter].map(Number);
    if (vals.some((v) => Number.isNaN(v) || v < 0)) {
      toast.error(t("All soil measurements must be valid non-negative numbers.", "Toutes les mesures doivent être des nombres valides.", "يجب أن تكون جميع القياسات أرقاماً صحيحة غير سالبة."));
      return;
    }
    const entry: SoilReading = {
      id: `s-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      plot,
      source,
      ph: Number(ph),
      humidity: Number(humidity),
      temperature: Number(temperature),
      nitrogen: Number(nitrogen),
      phosphorus: Number(phosphorus),
      potassium: Number(potassium),
      organicMatter: Number(organicMatter),
    };
    onAdd(entry);
    toast.success(t("Soil measurement recorded.", "Mesure du sol enregistrée.", "تم تسجيل قياس التربة."));
  };

  const simulateSensor = () => {
    setSource("sensor");
    setPh((6.4 + Math.random() * 1.1).toFixed(1));
    setHumidity(String(Math.round(45 + Math.random() * 25)));
    setTemperature(String(Math.round(18 + Math.random() * 8)));
    setNitrogen(String(Math.round(32 + Math.random() * 25)));
    setPhosphorus(String(Math.round(20 + Math.random() * 15)));
    setPotassium(String(Math.round(140 + Math.random() * 55)));
    setOrganicMatter((2.0 + Math.random() * 1.5).toFixed(1));
    toast.info(t("Simulated sensor values loaded into form.", "Valeurs capteur simulées chargées.", "تم تحميل قيم مستشعر تجريبية."));
  };

  const recommendations: string[] = [];
  if (latest) {
    if (latest.ph < 6.5) recommendations.push(t(`pH is ${latest.ph} (slightly acidic): consider agricultural lime evaluation before next sowing.`, `pH à ${latest.ph} (acide) : envisager un amendement calcaire.`, `الحموضة ${latest.ph} (منخفضة): يُنصح بتقييم إضافة الجير الزراعي.`));
    else if (latest.ph > 7.5) recommendations.push(t(`pH is ${latest.ph} (alkaline): organic compost or elemental sulfur may help balance availability.`, `pH à ${latest.ph} (alcalin) : le compost organique aide à équilibrer.`, `الحموضة ${latest.ph} (مرتفعة): السماد العضوي يساعد على التوازن.`));
    else recommendations.push(t(`pH is ${latest.ph} (balanced 6.5–7.5 range for Mediterranean olives and cereals).`, `pH à ${latest.ph} (plage optimale 6.5–7.5).`, `الحموضة ${latest.ph} متوازنة للزيتون والحبوب.`));

    if (latest.humidity < 45) recommendations.push(t(`Humidity is ${latest.humidity}%: schedule early-morning drip irrigation to minimize evaporation.`, `Humidité à ${latest.humidity}% : planifier un arrosage goutte-à-goutte matinal.`, `الرطوبة ${latest.humidity}%: يُنصح بالري بالتنقيط صباحاً.`));
    if (latest.nitrogen < 40) recommendations.push(t(`Nitrogen is ${latest.nitrogen} mg/kg: consider legume cover-cropping or organic nitrogen top-dressing.`, `Azote à ${latest.nitrogen} mg/kg : envisager un apport organique azoté.`, `النيتروجين ${latest.nitrogen} ملغ/كغ: يُنصح بتعزيز التسميد العضوي.`));
    if (latest.organicMatter < 2.5) recommendations.push(t(`Organic matter is ${latest.organicMatter}%: incorporate olive-pomace compost to improve water retention.`, `Matière organique à ${latest.organicMatter}% : incorporer du compost.`, `المادة العضوية ${latest.organicMatter}%: أضف السماد العضوي لتحسين احتباس الماء.`));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 font-editorial text-2xl font-bold text-forest">
              <FlaskConical className="h-5 w-5 text-primary" />
              {t("Soil Data Entry", "Saisie des Données du Sol", "إدخال قياسات التربة")}
            </h2>
            <button type="button" onClick={simulateSensor} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:bg-secondary">
              <Cpu className="h-3.5 w-3.5 text-terracotta" />
              {t("Pull Sensor Demo", "Lire Capteur (Démo)", "قراءة مستشعر (تجريبي)")}
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input value={plot} onChange={(e) => setPlot(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" placeholder="Plot name" />
            <select value={source} onChange={(e) => setSource(e.target.value as "manual" | "sensor")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
              <option value="manual">{t("Manual Entry", "Saisie Manuelle", "إدخال يدوي")}</option>
              <option value="sensor">{t("IoT Sensor", "Capteur IoT", "مستشعر IoT")}</option>
            </select>
            <label className="text-xs">pH<input type="number" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
            <label className="text-xs">{t("Humidity (%)", "Humidité (%)", "الرطوبة (%)")}<input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
            <label className="text-xs">{t("Temperature (°C)", "Température (°C)", "الحرارة (°C)")}<input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
            <label className="text-xs">Nitrogen (mg/kg)<input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
            <label className="text-xs">Phosphorus (mg/kg)<input type="number" value={phosphorus} onChange={(e) => setPhosphorus(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
            <label className="text-xs">Potassium (mg/kg)<input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
            <label className="text-xs sm:col-span-2">{t("Organic Matter (%)", "Matière Organique (%)", "المادة العضوية (%)")}<input type="number" step="0.1" value={organicMatter} onChange={(e) => setOrganicMatter(e.target.value)} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-1.5 text-sm" /></label>
          </div>
          <button type="submit" className="mt-4 w-full rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:bg-forest">
            {t("Save Soil Reading & Update Recommendations", "Enregistrer & Actualiser les Conseils", "حفظ القياس وتحديث التوصيات")}
          </button>
        </form>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-terracotta" />
            <h2 className="font-editorial text-2xl font-bold text-forest">{t("Smart Recommendations", "Recommandations Intelligentes", "التوصيات الذكية")}</h2>
          </div>
          <p className="rounded-xl bg-secondary/60 px-3 py-2 text-[11px] text-muted-foreground">
            {t("Demonstration decision-support rules linked to your latest entered measurements — not a substitute for certified laboratory agronomy.", "Règles de démonstration liées à vos dernières mesures — ne remplace pas un laboratoire agronomique certifié.", "قواعد تجريبية مرتبطة بآخر قياساتك — لا تغني عن التحليل المخبري المعتمد.")}
          </p>
          <ul className="space-y-2.5">
            {recommendations.map((rec, i) => (
              <li key={i} className="rounded-xl border border-border bg-background p-3 text-xs leading-relaxed text-foreground">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h3 className="font-editorial text-2xl font-bold text-forest">{t("Historical Soil Measurements", "Historique des Mesures", "تاريخ قياسات التربة")}</h3>
        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={readings}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="var(--chart-1)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="nitrogen" name="Nitrogen (mg/kg)" stroke="var(--chart-2)" strokeWidth={2.5} />
              <Line type="monotone" dataKey="phosphorus" name="Phosphorus (mg/kg)" stroke="var(--chart-3)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}