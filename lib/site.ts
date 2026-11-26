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
  // Koordinaten Alter Postplatz (aus dem Google-Maps-Link), für Google/Schema.org
  geo: { lat: 47.2057849, lng: 7.5344938 },
  // Saison: Freitag, 27. November 2026 bis und mit Sonntag, 3. Januar 2027 (Europe/Zurich).
  // Bewusst ohne tägliche Öffnungszeiten (gibt es nicht fix). Abweichungen: specialHours.
  openingDate: "2026-11-27",
  closingDate: "2027-01-03",
  // Countdown/Status: Saisonbeginn und Tag nach dem letzten Betriebstag, jeweils 00:00
  openingIso: "2026-11-27T00:00:00+01:00",
  closingIso: "2027-01-04T00:00:00+01:00",
} as const;

// Bilder des Angebots, Reihenfolge wie die Texte in lib/i18n (menu.items)
// und wie die Speise-/Getränkekarte (lib/menu.ts). Preis in CHF, from = "ab".
export const menuImages: { src: string; price: string; from?: boolean }[] = [
  { src: "/images/grillwurst.jpg", price: "8.50" },
  { src: "/images/gemuesegulasch.jpg", price: "12.50" },
  { src: "/images/raclettebrot.jpg", price: "9.50" },
  { src: "/images/gluehwein.jpg", price: "5" },
  { src: "/images/heisse-schokolade.jpg", price: "5", from: true },
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
//   image: "/images/events/flyer.jpg",  // optional, Flyer/Plakat (Hochformat)
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
  image?: string;
};

export const events: SiteEvent[] = [
  {
    date: "2026-12-06",
    start: "12:00",
    end: "15:00",
    title: {
      de: "Dr Samichlaus isch da!",
      fr: "Saint-Nicolas est là\u00a0!",
      it: "Arriva San Nicolao!",
      en: "St. Nicholas is here!",
    },
    text: {
      de: "Am Samichlaustag besucht uns der Samichlaus auf dem Alten Postplatz. Komm mit der ganzen Familie vorbei und sag ihm Hallo.",
      fr: "Le jour de la Saint-Nicolas, le Samichlaus nous rend visite sur l’Alter Postplatz. Viens en famille lui dire bonjour.",
      it: "Il giorno di San Nicolao, il Samichlaus ci fa visita sull’Alter Postplatz. Vieni con tutta la famiglia a salutarlo.",
      en: "On St. Nicholas Day, the Samichlaus pays us a visit on the Alter Postplatz. Bring the whole family and come say hello.",
    },
    image: "/images/events/samichlaus.jpg",
  },
];

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

// ---------------------------------------------------------------------------
// Medienberichte (Abschnitt "Presse"). Nur echte, geprüfte Berichte eintragen!
// Neuer Bericht = ein Eintrag hier, neuester zuoberst.
// type: "print" (Zeitung), "online", "radio" oder "tv".
// title = Originaltitel des Mediums, teaser = eigene Kurzbeschreibung (4 Sprachen).
// paywall: true, wenn der Artikel nur für Abonnenten ganz lesbar ist.
// Solange die Liste leer ist, wird der Abschnitt nicht angezeigt.
// ---------------------------------------------------------------------------
export type PressItem = {
  date: string;
  outlet: string;
  type: "print" | "online" | "radio" | "tv";
  title: string;
  author?: string;
  url: string;
  paywall?: boolean;
  teaser: Localized;
};

export const press: PressItem[] = [
  {
    date: "2026-11-19",
    outlet: "Solothurner Zeitung",
    type: "print",
    title: "Alpenland fällt in Solothurn aus – die Stadt schreibt Adventsangebote neu aus",
    author: "Fabio Vonarburg",
    url: "https://www.solothurnerzeitung.ch/solothurn/stadt-solothurn/solothurn-neues-adventsangebot-ersetzt-das-alpenland-ld.4268844",
    paywall: true,
    teaser: {
      de: "Statt des Alpenlands auf dem Dornacherplatz gibt es diesen Winter die Winter Post auf dem Postplatz als neues Adventsangebot.",
      fr: "Au lieu de l’Alpenland sur la Dornacherplatz, la Winter Post sur la Postplatz est cet hiver la nouvelle offre de l’Avent.",
      it: "Al posto dell’Alpenland sulla Dornacherplatz, quest’inverno la Winter Post sulla Postplatz è la nuova offerta dell’Avvento.",
      en: "Instead of the Alpenland on Dornacherplatz, this winter Winter Post on Postplatz is the new Advent offering.",
    },
  },
  {
    date: "2026-11-11",
    outlet: "Solothurner Zeitung",
    type: "print",
    title: "Glühwein, Würste, Raclette-Sandwich: Das bietet die neue ‹Winter Post› in Solothurn",
    author: "Christoph Reichmuth",
    url: "https://www.solothurnerzeitung.ch/solothurn/stadt-solothurn/solothurn-erhaelt-winter-bar-auf-dem-postplatz-ld.4265539",
    paywall: true,
    teaser: {
      de: "Die Solothurner Zeitung stellt die Winter Post vor: Holzhütten, Glühwein und Raclette-Sandwich als neuer Wintertreffpunkt in der Innenstadt.",
      fr: "La Solothurner Zeitung présente la Winter Post : cabanes en bois, vin chaud et sandwich raclette, nouveau rendez-vous d’hiver au centre-ville.",
      it: "La Solothurner Zeitung presenta la Winter Post: casette di legno, vin brulé e sandwich alla raclette, nuovo ritrovo invernale in centro.",
      en: "The Solothurner Zeitung introduces Winter Post: wooden huts, mulled wine and raclette sandwiches as a new winter meeting place in the city centre.",
    },
  },
];
