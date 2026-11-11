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
    "https://www.google.com/maps/search/?api=1&query=Alter+Postplatz+4500+Solothurn",
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
