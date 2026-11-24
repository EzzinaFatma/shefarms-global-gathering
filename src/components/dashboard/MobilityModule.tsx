import { useState, type FormEvent } from "react";
import { Car, MapPin, Calendar, Users, Phone, ShieldCheck, Plus, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import type { MobilityJourney, MobilityRequest } from "@/lib/demo-store";

interface MobilityModuleProps {
  journeys: MobilityJourney[];
  requests: MobilityRequest[];
  onJourneysChange: (next: MobilityJourney[]) => void;
  onRequestsChange: (next: MobilityRequest[]) => void;
}

export function MobilityModule({ journeys, requests, onJourneysChange, onRequestsChange }: MobilityModuleProps) {
  const { t } = useI18n();
  const [view, setView] = useState<"find" | "publish" | "farmer" | "driver">("find");
  const [searchDest, setSearchDest] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Publish journey form state
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("+216 ");
  const [vehicle, setVehicle] = useState("Covered Pickup (6 seats)");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("2026-11-28");
  const [time, setTime] = useState("06:30");
  const [seats, setSeats] = useState("5");
  const [price, setPrice] = useState("4");

  const filteredJourneys = journeys.filter((j) => {
    const q = searchDest.trim().toLowerCase();
    const matchText = !q || j.destination.toLowerCase().includes(q) || j.departure.toLowerCase().includes(q);
    const matchDate = !filterDate || j.date === filterDate;
    return matchText && matchDate;
  });

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    const seatNum = Number(seats);
    const priceNum = Number(price);
    if (!driverName.trim() || !departure.trim() || !destination.trim() || Number.isNaN(seatNum) || seatNum < 1 || Number.isNaN(priceNum) || priceNum < 0) {
      toast.error(t("Please complete all required journey fields with valid numbers.", "Veuillez remplir tous les champs requis.", "يرجى إكمال جميع الحقول المطلوبة بأرقام صحيحة."));
      return;
    }
    const created: MobilityJourney = {
      id: `j-${Date.now()}`,
      driverName: driverName.trim(),
      driverPhone: driverPhone.trim() || "+216 20 000 000",
      driverRating: 5.0,
      vehicle,
      departure: departure.trim(),
      destination: destination.trim(),
      date,
      time,
      seatsTotal: seatNum,
      seatsAvailable: seatNum,
      priceTnd: priceNum,
      status: "upcoming",
    };
    onJourneysChange([created, ...journeys]);
    setDriverName("");
    setDeparture("");
    setDestination("");
    setView("find");
    toast.success(t("Community journey published.", "Trajet communautaire publié.", "تم نشر الرحلة التضامنية بنجاح."));
  };

  const requestSeat = (journey: MobilityJourney) => {
    if (journey.seatsAvailable <= 0) {
      toast.error(t("No seats remaining on this journey.", "Plus de places disponibles.", "لا توجد مقاعد متاحة في هذه الرحلة."));
      return;
    }
    const req: MobilityRequest = {
      id: `r-${Date.now()}`,
      journeyId: journey.id,
      farmerName: "Amina Ben Salem (You)",
      farmerPhone: "+216 22 900 112",
      seatsRequested: 1,
      status: "pending",
      createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    onRequestsChange([req, ...requests]);
    onJourneysChange(
      journeys.map((j) => (j.id === journey.id ? { ...j, seatsAvailable: Math.max(0, j.seatsAvailable - 1) } : j))
    );
    toast.success(t("Seat request submitted. View status in Farmer Dashboard.", "Demande envoyée. Consultez votre tableau agricultrice.", "تم إرسال طلب المقعد بنجاح."));
  };

  const updateRequestStatus = (reqId: string, nextStatus: MobilityRequest["status"]) => {
    const target = requests.find((r) => r.id === reqId);
    onRequestsChange(requests.map((r) => (r.id === reqId ? { ...r, status: nextStatus } : r)));
    if (target && nextStatus === "cancelled" && target.status !== "cancelled") {
      onJourneysChange(
        journeys.map((j) =>
          j.id === target.journeyId ? { ...j, seatsAvailable: Math.min(j.seatsTotal, j.seatsAvailable + target.seatsRequested) } : j
        )
      );
    }
    toast.info(t(`Request marked as ${nextStatus}.`, `Statut mis à jour : ${nextStatus}.`, `تم تحديث حالة الطلب.`));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gold/45 bg-secondary/50 p-4 text-xs text-foreground">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>
            <strong>{t("Community Mobility — Proposed Rural Coordination Feature:", "Mobilité Solidaire — Service Communautaire Proposé :", "التنقل التضامني — خدمة تنسيق ريفية مقترحة:")}</strong>{" "}
            {t("Designed to connect women farmers with trusted local drivers for safe daily field transport. Data shown is demonstration data (not a live transport network).", "Conçu pour connecter les agricultrices aux chauffeurs locaux de confiance pour un transport quotidien sûr. Données de démonstration.", "مصممة لربط الفلاحات بسائقين محليين موثوقين للنقل اليومي الآمن إلى الحقول (بيانات تجريبية).")}
          </p>
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "find", label: t("Find Transport", "Trouver un Trajet", "البحث عن رحلة") },
          { id: "publish", label: t("Publish Journey", "Publier un Trajet", "نشر رحلة") },
          { id: "farmer", label: t("Farmer Dashboard", "Espace Agricultrice", "لوحة الفلاحة") },
          { id: "driver", label: t("Driver Dashboard", "Espace Chauffeur", "لوحة السائق") },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setView(tab.id as typeof view)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              view === tab.id ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === "find" && (
        <div className="space-y-4">
          <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
            <input value={searchDest} onChange={(e) => setSearchDest(e.target.value)} placeholder={t("Search departure or destination...", "Rechercher départ ou destination...", "ابحث بالانطلاق أو الوجهة...")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
            <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJourneys.map((j) => (
              <div key={j.id} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                      <Car className="h-4 w-4" /> {j.driverName}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-forest">{j.priceTnd} TND</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{j.vehicle} · ★ {j.driverRating}</p>
                  <div className="mt-3 space-y-1.5 text-xs text-foreground">
                    <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-terracotta" /> {j.departure} → {j.destination}</p>
                    <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {j.date} · {j.time}</p>
                    <p className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> {j.seatsAvailable} / {j.seatsTotal} {t("seats available", "places disponibles", "مقاعد متاحة")}</p>
                    <p className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {j.driverPhone}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => requestSeat(j)}
                  disabled={j.seatsAvailable === 0}
                  className="mt-4 w-full rounded-full bg-primary py-2 text-xs font-semibold text-primary-foreground hover:bg-forest disabled:opacity-50"
                >
                  {j.seatsAvailable > 0 ? t("Request a Seat", "Réserver une Place", "طلب مقعد") : t("Full", "Complet", "ممتلئ")}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "publish" && (
        <form onSubmit={handlePublish} className="max-w-2xl rounded-2xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("Publish a Rural Transport Journey", "Publier un Trajet Rural", "نشر رحلة نقل ريفي")}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={driverName} onChange={(e) => setDriverName(e.target.value)} placeholder={t("Driver Name", "Nom du chauffeur", "اسم السائق")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input value={driverPhone} onChange={(e) => setDriverPhone(e.target.value)} placeholder={t("Phone Number", "Téléphone", "رقم الهاتف")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder={t("Departure Location", "Lieu de départ", "نقطة الانطلاق")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder={t("Destination Field / Village", "Destination", "الوجهة / الحقل")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" min={1} max={15} value={seats} onChange={(e) => setSeats(e.target.value)} placeholder="Available seats" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input type="number" min={0} step="0.5" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price per passenger (TND)" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
            <input value={vehicle} onChange={(e) => setVehicle(e.target.value)} placeholder="Vehicle" className="rounded-xl border border-input bg-background px-3 py-2 text-sm sm:col-span-2" />
          </div>
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-forest">
            <Plus className="h-4 w-4" /> {t("Publish Journey", "Publier le Trajet", "نشر الرحلة")}
          </button>
        </form>
      )}

      {view === "farmer" && (
        <div className="space-y-3">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("My Transport Requests & Trips", "Mes Demandes de Transport", "طلباتي ورحلاتي")}</h2>
          {requests.map((r) => {
            const j = journeys.find((item) => item.id === r.journeyId);
            return (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{j ? `${j.departure} → ${j.destination}` : r.journeyId}</p>
                  <p className="text-xs text-muted-foreground">{j ? `${j.date} · ${j.time} · Driver: ${j.driverName} (${j.driverPhone})` : ""} · {r.seatsRequested} seat(s)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize text-forest">{r.status}</span>
                  {r.status !== "cancelled" && (
                    <button type="button" onClick={() => updateRequestStatus(r.id, "cancelled")} className="rounded-full border border-destructive/40 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10">
                      {t("Cancel", "Annuler", "إلغاء")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {view === "driver" && (
        <div className="space-y-4">
          <h2 className="font-editorial text-2xl font-bold text-forest">{t("Driver Dashboard — Passenger Requests", "Tableau Chauffeur — Demandes", "لوحة السائق — طلبات الركاب")}</h2>
          {requests.map((r) => {
            const j = journeys.find((item) => item.id === r.journeyId);
            return (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.farmerName} ({r.farmerPhone})</p>
                  <p className="text-xs text-muted-foreground">{j ? `${j.departure} → ${j.destination} (${j.date})` : ""} · {r.seatsRequested} seat(s) · Status: {r.status}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => updateRequestStatus(r.id, "confirmed")} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5" /> {t("Confirm", "Confirmer", "تأكيد")}
                  </button>
                  <button type="button" onClick={() => updateRequestStatus(r.id, "cancelled")} className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive">
                    <XCircle className="h-3.5 w-3.5" /> {t("Decline", "Refuser", "رفض")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}