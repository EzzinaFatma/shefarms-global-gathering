import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "fr" | "ar";

interface I18nContextValue {
  lang: Language;
  dir: "ltr" | "rtl";
  setLang: (lang: Language) => void;
  t: (en: string, fr: string, ar: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (en) => en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("shefarms_lang") as Language | null;
    if (saved === "en" || saved === "fr" || saved === "ar") {
      setLangState(saved);
    }
  }, []);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (next: Language) => {
    setLangState(next);
    window.localStorage.setItem("shefarms_lang", next);
  };

  const t = (en: string, fr: string, ar: string) => {
    if (lang === "fr") return fr;
    if (lang === "ar") return ar;
    return en;
  };

  return (
    <I18nContext.Provider value={{ lang, dir, setLang, t }}>
      <div dir={dir} className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}