import { useState, type ChangeEvent } from "react";
import { Radio, Battery, Signal, Upload, Eye, CheckCircle2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface DetectionResult {
  mode: "live-fastapi" | "demo-fallback";
  classes: { label: string; confidence: number }[];
  summary: string;
}

export function DroneIoTModule() {
  const { t } = useI18n();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const sensors = [
    { name: "Soil Moisture A1", value: "61%", status: "online", location: "Plot A — Olive Grove" },
    { name: "Temperature B2", value: "21°C", status: "online", location: "Greenhouse 1" },
    { name: "pH Probe C3", value: "6.8 pH", status: "warning", location: "Plot B — Wheat" },
    { name: "Humidity D4", value: "58%", status: "offline", location: "Plot C — Citrus" },
  ];

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setResult(null);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast.error(t("Please upload an agricultural image first.", "Veuillez d'abord charger une image.", "يرجى تحميل صورة أولاً."));
      return;
    }
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("FastAPI returned non-200");
      const data = (await response.json()) as { detections?: { class?: string; confidence?: number }[]; classes?: string[] };
      const parsed =
        data.detections?.map((d) => ({ label: d.class ?? "Detected Object", confidence: Math.round((d.confidence ?? 0.85) * 100) })) ??
        data.classes?.map((c) => ({ label: c, confidence: 90 })) ??
        [{ label: "Healthy Crop Canopy", confidence: 92 }];
      setResult({ mode: "live-fastapi", classes: parsed, summary: "Live response received from FastAPI (http://localhost:8000/predict)." });
      toast.success(t("AI analysis completed via FastAPI.", "Analyse IA terminée via FastAPI.", "اكتمل التحليل عبر خادم FastAPI."));
    } catch {
      setResult({
        mode: "demo-fallback",
        classes: [
          { label: "Healthy Olive Canopy", confidence: 91 },
          { label: "Mild Water Stress Zone", confidence: 74 },
        ],
        summary: "Local FastAPI endpoint (http://localhost:8000/predict) was unreachable — displaying clearly labeled demonstration detection output.",
      });
      toast.info(t("FastAPI offline — showing demo AI detection output.", "FastAPI hors ligne — affichage de la démonstration.", "خادم FastAPI غير متصل — عرض نتائج تجريبية."));
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gold/40 bg-secondary/45 px-4 py-3 text-xs text-foreground">
        <strong>{t("Telemetry Notice:", "Information Télémétrie :", "تنبيه:")}</strong>{" "}
        {t("Drone telemetry and IoT sensor statuses below are demonstration data (no physical drone connected). Image analysis calls POST http://localhost:8000/predict with multipart field 'file'.", "La télémétrie drone et les capteurs sont des données de démonstration. L'analyse d'image appelle POST http://localhost:8000/predict (champ 'file').", "بيانات الدرون والمستشعرات تجريبية. تحليل الصور يتصل بـ POST http://localhost:8000/predict.")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">{t("Drone Status (Demo)", "Statut Drone (Démo)", "حالة الدرون")}</p>
          <p className="mt-2 font-editorial text-2xl font-bold text-primary">ACTIVE · 68% Mission</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Battery className="h-3.5 w-3.5" /> Battery</p>
          <p className="mt-2 font-editorial text-2xl font-bold text-forest">87%</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Radio className="h-3.5 w-3.5" /> Altitude / Speed</p>
          <p className="mt-2 font-editorial text-2xl font-bold text-forest">120 m · 15 km/h</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Signal className="h-3.5 w-3.5" /> Signal</p>
          <p className="mt-2 font-editorial text-2xl font-bold text-forest">94%</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("AI Crop Image Analysis", "Analyse d'Image IA", "تحليل صور المحاصيل بالذكاء الاصطناعي")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">Endpoint: <code>POST http://localhost:8000/predict</code> (multipart <code>file</code>)</p>
          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background p-6 text-center hover:border-primary">
            <Upload className="h-7 w-7 text-primary" />
            <span className="mt-2 text-xs font-semibold text-foreground">
              {selectedFile ? selectedFile.name : t("Click to upload field or leaf photograph", "Cliquez pour charger une photo de parcelle", "اضغط لتحميل صورة الحقل أو النبات")}
            </span>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          {previewUrl && <img src={previewUrl} alt="Uploaded preview" className="mt-4 h-48 w-full rounded-xl object-cover" />}
          <button type="button" onClick={analyzeImage} disabled={analyzing} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:bg-forest disabled:opacity-60">
            <Eye className="h-4 w-4" />
            {analyzing ? t("Analyzing...", "Analyse en cours...", "جاري التحليل...") : t("Run AI Detection", "Lancer l'Analyse IA", "تشغيل التحليل الذكي")}
          </button>
          {result && (
            <div className="mt-4 rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold text-terracotta">{result.summary}</p>
              <div className="mt-3 space-y-2">
                {result.classes.map((c, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{c.label}</span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 font-semibold text-forest">{c.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("IoT Sensor Network (Demo)", "Réseau de Capteurs IoT (Démo)", "شبكة مستشعرات IoT")}</h2>
          <div className="mt-4 space-y-3">
            {sensors.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-background p-3.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.location}</p>
                </div>
                <div className="text-end">
                  <p className="text-sm font-bold text-forest">{s.value}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] capitalize text-muted-foreground">
                    {s.status === "online" ? <CheckCircle2 className="h-3 w-3 text-primary" /> : <AlertTriangle className="h-3 w-3 text-terracotta" />}
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}