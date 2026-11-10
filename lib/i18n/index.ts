import de, { type Dict } from "./de";
import fr from "./fr";
import it from "./it";
import en from "./en";

export const locales = ["de", "fr", "it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const dictionaries: Record<Locale, Dict> = { de, fr, it, en };

export const localeInfo: Record<Locale, { label: string; name: string; htmlLang: string; path: string }> = {
  de: { label: "DE", name: "Deutsch", htmlLang: "de-CH", path: "/" },
  fr: { label: "FR", name: "Français", htmlLang: "fr-CH", path: "/fr" },
  it: { label: "IT", name: "Italiano", htmlLang: "it-CH", path: "/it" },
  en: { label: "EN", name: "English", htmlLang: "en", path: "/en" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}

export type { Dict };
