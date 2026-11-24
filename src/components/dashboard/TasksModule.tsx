import { useState, type FormEvent } from "react";
import { Plus, Trash2, CheckCircle2, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import type { FarmTask } from "@/lib/demo-store";

interface TasksModuleProps {
  tasks: FarmTask[];
  onChange: (next: FarmTask[]) => void;
}

export function TasksModule({ tasks, onChange }: TasksModuleProps) {
  const { t } = useI18n();
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<FarmTask["category"]>("irrigation");
  const [priority, setPriority] = useState<FarmTask["priority"]>("medium");
  const [assignee, setAssignee] = useState("Amina Ben Salem");
  const [dueDate, setDueDate] = useState("2026-11-29");
  const [field, setField] = useState("Plot A — Béja");

  const filtered = tasks.filter(
    (task) =>
      (filterCat === "all" || task.category === filterCat) &&
      (filterStatus === "all" || task.status === filterStatus)
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error(t("Task title is required.", "Le titre de la tâche est requis.", "عنوان المهمة مطلوب."));
      return;
    }
    if (editingId) {
      onChange(
        tasks.map((item) =>
          item.id === editingId ? { ...item, title: title.trim(), category, priority, assignee, dueDate, field } : item
        )
      );
      setEditingId(null);
      toast.success(t("Task updated.", "Tâche mise à jour.", "تم تحديث المهمة."));
    } else {
      const newTask: FarmTask = {
        id: `t-${Date.now()}`,
        title: title.trim(),
        category,
        priority,
        status: "pending",
        assignee: assignee.trim() || "Cooperative Member",
        dueDate,
        field,
        notes: "",
      };
      onChange([newTask, ...tasks]);
      toast.success(t("Task created.", "Tâche créée.", "تمت إضافة المهمة."));
    }
    setTitle("");
  };

  const startEdit = (task: FarmTask) => {
    setEditingId(task.id);
    setTitle(task.title);
    setCategory(task.category);
    setPriority(task.priority);
    setAssignee(task.assignee);
    setDueDate(task.dueDate);
    setField(task.field);
  };

  const cycleStatus = (id: string) => {
    const order: FarmTask["status"][] = ["pending", "in-progress", "completed"];
    onChange(
      tasks.map((item) => {
        if (item.id !== id) return item;
        const nextStatus = order[(order.indexOf(item.status) + 1) % order.length] ?? "pending";
        return { ...item, status: nextStatus };
      })
    );
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-editorial text-2xl font-bold text-forest">
          {editingId ? t("Edit Agricultural Task", "Modifier la Tâche", "تعديل المهمة الفلاحية") : t("Create Agricultural Task", "Nouvelle Tâche Agricole", "إضافة مهمة فلاحية جديدة")}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("Task description...", "Description de la tâche...", "وصف المهمة...")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm lg:col-span-2" />
          <select value={category} onChange={(e) => setCategory(e.target.value as FarmTask["category"])} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option value="planting">{t("Planting", "Semis", "زراعة")}</option>
            <option value="irrigation">{t("Irrigation", "Irrigation", "ري")}</option>
            <option value="harvesting">{t("Harvesting", "Récolte", "حصاد")}</option>
            <option value="maintenance">{t("Maintenance", "Maintenance", "صيانة")}</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value as FarmTask["priority"])} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option value="high">{t("High", "Haute", "عالية")}</option>
            <option value="medium">{t("Medium", "Moyenne", "متوسطة")}</option>
            <option value="low">{t("Low", "Basse", "منخفضة")}</option>
          </select>
          <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder={t("Assignee", "Responsable", "المسؤولة")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <input value={field} onChange={(e) => setField(e.target.value)} placeholder={t("Plot / Field", "Parcelle", "القطعة")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
          <div className="flex gap-2">
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setTitle(""); }} className="rounded-full border border-border px-4 py-2 text-xs font-semibold">
                {t("Cancel", "Annuler", "إلغاء")}
              </button>
            )}
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest">
              <Plus className="h-4 w-4" />
              {editingId ? t("Save Changes", "Enregistrer", "حفظ التعديلات") : t("Add Task", "Ajouter", "إضافة المهمة")}
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-3">
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium">
          <option value="all">{t("All Categories", "Toutes Catégories", "كل الفئات")}</option>
          <option value="planting">{t("Planting", "Semis", "زراعة")}</option>
          <option value="irrigation">{t("Irrigation", "Irrigation", "ري")}</option>
          <option value="harvesting">{t("Harvesting", "Récolte", "حصاد")}</option>
          <option value="maintenance">{t("Maintenance", "Maintenance", "صيانة")}</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium">
          <option value="all">{t("All Statuses", "Tous Statuts", "كل الحالات")}</option>
          <option value="pending">{t("Pending", "En attente", "قيد الانتظار")}</option>
          <option value="in-progress">{t("In Progress", "En cours", "قيد التنفيذ")}</option>
          <option value="completed">{t("Completed", "Terminée", "مكتملة")}</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((task) => (
          <div key={task.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold uppercase text-forest">{task.category}</span>
                <h3 className="mt-2 font-semibold text-foreground">{task.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{task.assignee} · {task.field} · {task.dueDate}</p>
              </div>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs capitalize">{task.priority}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <button type="button" onClick={() => cycleStatus(task.id)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                <CheckCircle2 className="h-4 w-4" />
                <span className="capitalize">{task.status}</span>
              </button>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => startEdit(task)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Edit task">
                  <Edit3 className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => { onChange(tasks.filter((x) => x.id !== task.id)); toast.success(t("Task deleted.", "Tâche supprimée.", "تم حذف المهمة.")); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Delete task">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            {t("No tasks match the current filters.", "Aucune tâche ne correspond aux filtres.", "لا توجد مهام مطابقة للتصفية.")}
          </p>
        )}
      </div>
    </div>
  );
}