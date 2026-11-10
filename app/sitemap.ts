import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localeInfo, locales } from "@/lib/i18n";

const abs = (path: string) => (path === "/" ? `${site.url}/` : `${site.url}${path}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [localeInfo[l].htmlLang, abs(localeInfo[l].path)]));
  return locales.map((l) => ({
    url: abs(localeInfo[l].path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: l === "de" ? 1 : 0.8,
    alternates: { languages },
    images: [`${site.url}/og-image.jpg`, `${site.url}/images/ort/vogelperspektive.jpg`],
  }));
}
