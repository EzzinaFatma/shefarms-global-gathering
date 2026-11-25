import transportScene from "@/assets/ragouj-episode-transport.jpeg.asset.json";
import fieldworkScene from "@/assets/ragouj-episode-fieldwork.jpeg.asset.json";

export type RagoujScene = {
  src: string;
  key: string;
  caption: { en: string; fr: string; ar: string };
};

export const RAGOUJ_SCENES: RagoujScene[] = [
  {
    src: transportScene.url,
    key: "ragouj-episode-transport",
    caption: {
      en: "Ragouj · Women gathering beside rural transport",
      fr: "Ragouj · Les femmes près du transport rural",
      ar: "رقوج · النساء بجانب وسيلة النقل الريفي",
    },
  },
  {
    src: fieldworkScene.url,
    key: "ragouj-episode-fieldwork",
    caption: {
      en: "Ragouj · Women working together in the field",
      fr: "Ragouj · Les femmes au travail dans le champ",
      ar: "رقوج · النساء يعملن معاً في الحقل",
    },
  },
];
