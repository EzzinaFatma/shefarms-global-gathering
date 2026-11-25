/**
 * Field stills shown in the home-page filmstrip.
 *
 * Any image dropped into src/assets/ragouj-scenes/ is picked up automatically —
 * no code edit needed. Files are ordered by filename, so prefix them with a
 * number when the order matters (e.g. "01-olives.jpg").
 *
 * CAPTIONS is keyed by filename without its extension. Unknown files fall back
 * to a prettified version of their filename.
 */

export type RagoujScene = {
  src: string;
  key: string;
  caption: { en: string; fr: string; ar: string };
};

const CAPTIONS: Record<string, { en: string; fr: string; ar: string }> = {
  "ragouj-farmers-olives": {
    en: "Sorting the olive harvest in the courtyard",
    fr: "Tri de la récolte d'olives dans la cour",
    ar: "فرز محصول الزيتون في الدار",
  },
  "ragouj-farmers-grove": {
    en: "Carrying the baskets out of the grove",
    fr: "Porter les paniers hors de l'oliveraie",
    ar: "إخراج القفاف من الزيتون",
  },
  "ragouj-farmers-hands": {
    en: "Reading the soil by hand",
    fr: "Lire la terre à la main",
    ar: "قراءة التربة باليد",
  },
  "ragouj-farmers-water": {
    en: "Water carried back to the house",
    fr: "L'eau rapportée à la maison",
    ar: "الماء المجلوب إلى الدار",
  },
  "ragouj-farmers-circle": {
    en: "The women's council under the pergola",
    fr: "Le conseil des femmes sous la treille",
    ar: "مجلس النساء تحت العريشة",
  },
};

const modules = import.meta.glob("../assets/ragouj-scenes/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function prettyName(base: string): { en: string; fr: string; ar: string } {
  const words = base
    .replace(/^\d+[-_]?/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  const label = words.length > 0 ? words : base;
  const title = label.charAt(0).toUpperCase() + label.slice(1);
  return { en: title, fr: title, ar: title };
}

export const RAGOUJ_SCENES: RagoujScene[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const base = path.split("/").pop() ?? path;
    const key = base.replace(/\.[^.]+$/, "");
    const known = CAPTIONS[key];
    return {
      src,
      key,
      caption: known ? { en: known.en, fr: known.fr, ar: known.ar } : prettyName(key),
    };
  });
