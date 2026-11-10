export const site = {
  name: "Winter Post Solothurn",
  shortName: "Winter Post",
  claim: "Dein Winter. Dein Treffpunkt.",
  tagline: "Glühwein, Genuss & Weihnachtszauber",
  title: "Winter Post Solothurn | Glühwein, Genuss & Weihnachtszauber",
  // Für Google & Social Media (max. ca. 155 Zeichen)
  description:
    "Dein Winter-Treffpunkt auf dem Alten Postplatz in Solothurn: Glühwein, Raclette & Winterküche. 27.11.2026 – 3.1.2027, täglich 11–22 Uhr.",
  shareDescription:
    "Glühwein, Raclette & Weihnachtszauber auf dem Alten Postplatz. 27.11.2026 – 3.1.2027, täglich 11–22 Uhr. Wir sehen uns!",
  // Produktions-Domain. Auf Vercel wird automatisch die Produktions-Domain verwendet,
  // falls NEXT_PUBLIC_SITE_URL nicht gesetzt ist.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://winterpost.ch")
  ).replace(/\/$/, ""),
  email: "kontakt@winterpost.ch",
  phone: "+41 76 747 44 10",
  phoneHref: "tel:+41767474410",
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
  openingLabel: "27. November 2026",
  // Letzter Betriebstag: Sonntag, 3. Januar 2027, Schluss 22:00 Uhr
  closingIso: "2027-01-03T22:00:00+01:00",
  closingLabel: "3. Januar 2027",
  seasonLabel: "27. November 2026 bis 3. Januar 2027",
  hours: { open: 11, close: 22, label: "Täglich 11:00 – 22:00 Uhr" },
} as const;

export type MenuItem = {
  name: string;
  category: string;
  text: string;
  image: string;
  alt: string;
};

export const menu: MenuItem[] = [
  {
    name: "Glühwein",
    category: "Aus dem Kessel",
    text: "Heiss, würzig und mit ganz viel Wintergefühl. Mit Orange, Zimt und Sternanis.",
    image: "/images/gluehwein.jpg",
    alt: "Dampfender Glühwein mit Orangenscheiben und Zimtstangen im Kessel über dem Feuer",
  },
  {
    name: "Heisse Schokolade",
    category: "Für Naschkatzen",
    text: "Heiss, cremig und einfach unwiderstehlich. Mit Rahmhaube und Schokospänen.",
    image: "/images/heisse-schokolade.jpg",
    alt: "Heisse Schokolade im Kupferbecher mit Schlagrahm und Schokoladenspänen",
  },
  {
    name: "Raclettebrot",
    category: "Schweizer Klassiker",
    text: "Knuspriges Brot, geschmolzener Raclettekäse und ein paar Cornichons dazu.",
    image: "/images/raclettebrot.jpg",
    alt: "Knuspriges Brot mit geschmolzenem Raclettekäse und Cornichons",
  },
  {
    name: "Grillwurst",
    category: "Vom Grill",
    text: "Frisch vom Grill, goldbraun und richtig lecker. Der Klassiker für zwischendurch.",
    image: "/images/grillwurst.jpg",
    alt: "Goldbraune Bratwürste auf dem Grillrost",
  },
  {
    name: "Pilzrisotto",
    category: "Warm & cremig",
    text: "Cremig, frisch zubereitet und voller Geschmack. Mit gebratenen Pilzen und Parmesan.",
    image: "/images/risotto.jpg",
    alt: "Cremiges Risotto mit gebratenen Pilzen, Parmesan und Petersilie",
  },
];
