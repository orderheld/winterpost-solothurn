export const site = {
  name: "Winter Post Solothurn",
  shortName: "Winter Post",
  // Produktions-Domain. Auf Vercel wird automatisch die Produktions-Domain verwendet,
  // falls NEXT_PUBLIC_SITE_URL nicht gesetzt ist.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://winterpost.ch")
  ).replace(/\/$/, ""),
  email: "kontakt@winterpost.ch",
  instagram: "https://www.instagram.com/winterpostsolothurn/",
  instagramHandle: "@winterpostsolothurn",
  address: {
    street: "Alter Postplatz",
    zip: "4500",
    city: "Solothurn",
    country: "CH",
  },
  mapsUrl:
    "https://maps.app.goo.gl/mMQRU4ai3iYrMD6s6",
  // Eröffnung: Freitag, 27. November 2026, 11:00 Uhr (Europe/Zurich, UTC+1)
  openingIso: "2026-11-27T11:00:00+01:00",
  // Letzter Betriebstag: Sonntag, 3. Januar 2027, Schluss 22:00 Uhr
  closingIso: "2027-01-03T22:00:00+01:00",
  hours: { open: 11, close: 22 },
} as const;

// Bilder des Angebots, Reihenfolge wie die Texte in lib/i18n (menu.items)
export const menuImages = [
  "/images/gluehwein.jpg",
  "/images/heisse-schokolade.jpg",
  "/images/raclettebrot.jpg",
  "/images/grillwurst.jpg",
  "/images/gemuesegulasch.jpg",
];

// Bilder der Ort-Galerie, Reihenfolge wie place.gallery in lib/i18n
export const galleryImages = [
  "/images/ort/vogelperspektive.jpg",
  "/images/ort/bar.jpg",
  "/images/ort/lounge.jpg",
];

// ---------------------------------------------------------------------------
// Events & Specials. Neues Event = ein Eintrag hier (Texte in allen 4 Sprachen).
// Beispiel:
// {
//   date: "2026-12-05",          // Datum (JJJJ-MM-TT)
//   start: "18:00", end: "21:00", // optional
//   title: { de: "Live-Musik", fr: "Musique live", it: "Musica dal vivo", en: "Live music" },
//   text: { de: "…", fr: "…", it: "…", en: "…" },
// },
// Solange die Liste leer ist, zeigt die Seite "Das Programm folgt".
// ---------------------------------------------------------------------------
type Localized = { de: string; fr: string; it: string; en: string };

export type SiteEvent = {
  date: string;
  start?: string;
  end?: string;
  title: Localized;
  text: Localized;
};

export const events: SiteEvent[] = [];

// ---------------------------------------------------------------------------
// Besondere Öffnungszeiten (Feiertage usw.). Beispiel:
// { date: "2026-12-24", hours: { de: "11:00 – 17:00 Uhr", fr: "11h00 – 17h00", it: "11:00 – 17:00", en: "11 am – 5 pm" },
//   opens: "11:00", closes: "17:00" },
// Geschlossen: opens/closes weglassen und hours z. B. { de: "Geschlossen", … }.
// Solange die Liste leer ist, steht dort "Zurzeit gibt es keine Abweichungen".
// ---------------------------------------------------------------------------
export type SpecialHours = {
  date: string;
  hours: Localized;
  opens?: string;
  closes?: string;
};

export const specialHours: SpecialHours[] = [];
