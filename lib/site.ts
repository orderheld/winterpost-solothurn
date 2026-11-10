export const site = {
  name: "Winter Post Solothurn",
  shortName: "Winter Post",
  claim: "Dein Winter. Dein Treffpunkt.",
  tagline: "Glühwein, Genuss & Weihnachtszauber",
  description:
    "Winter Post Solothurn: dein neuer Wintertreffpunkt auf dem Alter Postplatz. Glühwein, heisse Schokolade, Raclettebrot, Grillwurst und Risotto. Ab 27. November 2026, täglich von 11 bis 22 Uhr.",
  url: "https://www.winterpost.ch",
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
