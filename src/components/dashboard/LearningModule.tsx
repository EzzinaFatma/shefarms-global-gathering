import { useState } from "react";
import { BookOpen, PlayCircle, Award, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

interface Course {
  id: string;
  title: string;
  format: string;
  duration: string;
  progress: number;
  certificate: boolean;
}

const INITIAL_COURSES: Course[] = [
  { id: "l-1", title: "Drip Irrigation Efficiency in Semi-Arid Olive Groves", format: "Video + Guide", duration: "45 min", progress: 100, certificate: true },
  { id: "l-2", title: "Reading Soil pH & NPK Diagnostics for Better Harvests", format: "Interactive Module", duration: "35 min", progress: 65, certificate: false },
  { id: "l-3", title: "Cooperative Financial Literacy & TND Cashflow Planning", format: "Workshop Video", duration: "50 min", progress: 30, certificate: false },
  { id: "l-4", title: "Digital Tools & Mobile Safety for Rural Women Farmers", format: "Reading + Quiz", duration: "25 min", progress: 0, certificate: false },
];

export function LearningModule() {
  const { t } = useI18n();
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  const advanceCourse = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = Math.min(100, c.progress + 35);
        return { ...c, progress: next, certificate: next === 100 };
      })
    );
    toast.success(t("Course progress updated.", "Progression mise à jour.", "تم تحديث تقدم الدورة."));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5 text-primary" /> {course.format}</span>
                <span>{course.duration}</span>
              </div>
              <h3 className="mt-2 font-editorial text-2xl font-bold text-forest">{course.title}</h3>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{t("Progress", "Progression", "التقدم")}</span>
                  <span className="font-semibold text-foreground">{course.progress}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-3">
              {course.certificate ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Award className="h-4 w-4 text-gold" /> {t("Certificate Earned", "Certificat Obtenu", "تم الحصول على الشهادة")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" /> {t("In Progress", "En cours", "قيد التعلم")}
                </span>
              )}
              <button
                type="button"
                onClick={() => advanceCourse(course.id)}
                disabled={course.progress >= 100}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-50"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {course.progress >= 100 ? t("Completed", "Terminé", "مكتمل") : t("Continue Lesson", "Continuer", "متابعة الدرس")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}