import { useCallback, useEffect, useState } from "react";
import { X, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { RAGOUJ_SCENES, type RagoujScene } from "@/lib/ragouj-scenes";

export function SceneFilmstrip() {
  const { t } = useI18n();
  const [active, setActive] = useState<RagoujScene | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  if (RAGOUJ_SCENES.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-forest py-16 text-primary-foreground sm:py-20">
      <div className="ragouj-film-grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              <Film className="h-3.5 w-3.5" />
              {t("Ragouj · Episode Stills", "Ragouj · Captures des épisodes", "رقوج · لقطات من الحلقات")}
            </p>
            <h2 className="mt-3 font-editorial text-4xl font-bold sm:text-5xl">
              {t(
                "A Day in the Life of the Women Who Farm",
                "Une journée de celles qui cultivent",
                "يوم في حياة النساء الفلاحات"
              )}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {RAGOUJ_SCENES.map((scene, idx) => (
            <Button
              variant="ghost"
              key={scene.key}
              type="button"
              onClick={() => setActive(scene)}
              className="group relative block h-auto overflow-hidden whitespace-normal rounded-lg border border-gold/35 bg-forest/60 p-0 text-start transition-all hover:border-gold/80 hover:bg-forest/60 focus-visible:ring-gold"
            >
              <img
                src={scene.src}
                loading="lazy"
                alt={t(scene.caption.en, scene.caption.fr, scene.caption.ar)}
                className="aspect-video w-full object-contain"
              />
              <div className="px-4 py-4">
                <span dir="ltr" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  {String(idx + 1).padStart(2, "0")} · {String(RAGOUJ_SCENES.length).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-medium leading-snug text-primary-foreground/95">
                  {t(scene.caption.en, scene.caption.fr, scene.caption.ar)}
                </p>
              </div>
            </Button>
          ))}

        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(active.caption.en, active.caption.fr, active.caption.ar)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/50"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={t(active.caption.en, active.caption.fr, active.caption.ar)}
              className="max-h-[88vh] w-full object-contain"
            />
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest to-transparent px-5 pb-4 pt-8 text-sm text-primary-foreground/90">
              {t(active.caption.en, active.caption.fr, active.caption.ar)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={close}
              aria-label={t("Close", "Fermer", "إغلاق")}
              className="absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest/80 text-primary-foreground hover:bg-forest"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
