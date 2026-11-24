import { useState, type FormEvent } from "react";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import type { CalendarActivity } from "@/lib/demo-store";

interface CalendarModuleProps {
  activities: CalendarActivity[];
  onChange: (next: CalendarActivity[]) => void;
}

export function CalendarModule({ activities, onChange }: CalendarModuleProps) {
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CalendarActivity["type"]>("planting");
  const [date, setDate] = useState("2026-11-27");
  const [team, setTeam] = useState("Cooperative Group 1");
  const [plot, setPlot] = useState("Plot A");

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(t("Activity title is required.", "Le titre est requis.", "عنوان النشاط مطلوب."));
      return;
    }
    onChange([...activities, { id: `c-${Date.now()}`, title: title.trim(), type, date, team, plot }]);
    setTitle("");
    toast.success(t("Activity scheduled.", "Activité planifiée.", "تمت جدولة النشاط."));
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-editorial text-2xl font-bold text-forest">{t("Schedule Agricultural Activity", "Planifier une Activité", "جدولة نشاط فلاحي")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("Activity name...", "Nom de l'activité...", "اسم النشاط...")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          <select value={type} onChange={(e) => setType(e.target.value as CalendarActivity["type"])} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option value="planting">{t("Planting", "Semis", "زراعة")}</option>
            <option value="irrigation">{t("Irrigation", "Irrigation", "ري")}</option>
            <option value="harvest">{t("Harvest", "Récolte", "حصاد")}</option>
            <option value="fertilization">{t("Fertilization", "Fertilisation", "تسميد")}</option>
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          <input value={team} onChange={(e) => setTeam(e.target.value)} placeholder={t("Team", "Équipe", "الفريق")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          <button type="submit" className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest">
            <Plus className="h-4 w-4" /> {t("Add to Calendar", "Planifier", "إضافة للروزنامة")}
          </button>
        </div>
      </form>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-bold text-forest">November 2026</h3>
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-semibold text-muted-foreground">{d}</div>
            ))}
            {days.map((day) => {
              const dateStr = `2026-11-${String(day).padStart(2, "0")}`;
              const dayEvents = activities.filter((a) => a.date === dateStr);
              return (
                <div key={day} className={`min-h-16 rounded-xl border p-1.5 text-start ${dayEvents.length > 0 ? "border-primary bg-secondary/50" : "border-border bg-background"}`}>
                  <span className="text-[11px] font-semibold text-muted-foreground">{day}</span>
                  {dayEvents.map((ev) => (
                    <div key={ev.id} className="mt-1 truncate rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                      {ev.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-editorial text-2xl font-bold text-forest">{t("Scheduled Activities", "Activités Planifiées", "الأنشطة المجدولة")}</h3>
          <div className="mt-4 space-y-3">
            {activities.map((ev) => (
              <div key={ev.id} className="flex items-start justify-between rounded-xl border border-border bg-background p-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{ev.title}</p>
                  <p className="text-xs text-muted-foreground">{ev.date} · {ev.team} · {ev.plot}</p>
                  <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-forest">{ev.type}</span>
                </div>
                <button type="button" onClick={() => onChange(activities.filter((x) => x.id !== ev.id))} className="p-1 text-muted-foreground hover:text-destructive" aria-label="Remove activity">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}