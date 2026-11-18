// ---------------------------------------------------------------------------
// Speise- und Getränkekarte mit Preisen (Quelle: Karten des Kunden, Nov. 2026).
// Preis ändern = Zahl hier anpassen. Texte, die übersetzt werden müssen,
// stehen als { de, fr, it, en }, Markennamen als einfacher Text.
// ---------------------------------------------------------------------------
import type { Locale } from "./i18n";

type Localized = { de: string; fr: string; it: string; en: string };
export type Text = string | Localized;

export type MenuItem = {
  name: Text;
  detail?: Text; // Beschreibung (Speisen) oder Zusatz (Getränke)
  size?: string; // z. B. "3 dl"
  price: string; // ohne "CHF"
  veg?: boolean;
};

export type MenuGroup = { title: Localized; items: MenuItem[] };

export function tx(text: Text, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}

export const food: MenuItem[] = [
  {
    name: "Bratwurst",
    detail: {
      de: "Kalbsfleisch, mit Brot & Senf",
      fr: "Veau, avec pain & moutarde",
      it: "Di vitello, con pane e senape",
      en: "Veal, with bread & mustard",
    },
    price: "8.50",
  },
  {
    name: { de: "Wildschweinwurst", fr: "Saucisse de sanglier", it: "Salsiccia di cinghiale", en: "Wild boar sausage" },
    detail: { de: "mit Brot & Senf", fr: "avec pain & moutarde", it: "con pane e senape", en: "with bread & mustard" },
    price: "8.50",
  },
  {
    name: { de: "Gemüse-Gulasch", fr: "Goulash de légumes", it: "Gulasch di verdure", en: "Vegetable goulash" },
    detail: { de: "mit Brot", fr: "avec pain", it: "con pane", en: "with bread" },
    price: "12.50",
    veg: true,
  },
  {
    name: "Raclette-Sandwich",
    detail: {
      de: "mit Gurke & Silberzwiebeln",
      fr: "avec cornichons & petits oignons",
      it: "con cetriolini e cipolline",
      en: "with gherkins & silverskin onions",
    },
    price: "9.50",
  },
  {
    name: "Cervelat",
    detail: { de: "zum Selbergrillieren", fr: "à griller soi-même", it: "da grigliare da te", en: "grill it yourself" },
    price: "3.50",
  },
];

export const drinks: MenuGroup[] = [
  {
    title: { de: "Heiss", fr: "Boissons chaudes", it: "Bevande calde", en: "Hot drinks" },
    items: [
      { name: { de: "Glühwein", fr: "Vin chaud", it: "Vin brulé", en: "Mulled wine" }, size: "2,5 dl", price: "5" },
      { name: { de: "Kaffee Crème", fr: "Café crème", it: "Caffè crema", en: "Coffee" }, price: "5" },
      {
        name: "Kaffee Luz",
        detail: {
          de: "mit Willisauer Zwetschgen-Obstbrand",
          fr: "à l’eau-de-vie de pruneaux de Willisau",
          it: "con acquavite di prugne di Willisau",
          en: "with Willisau plum brandy",
        },
        price: "7",
      },
      { name: "Espresso", price: "4" },
      {
        name: { de: "Heisse Schokolade ohne Rahm", fr: "Chocolat chaud sans chantilly", it: "Cioccolata calda senza panna", en: "Hot chocolate without cream" },
        size: "3 dl",
        price: "5",
      },
      {
        name: { de: "Heisse Schokolade mit Rahm", fr: "Chocolat chaud avec chantilly", it: "Cioccolata calda con panna", en: "Hot chocolate with whipped cream" },
        size: "3 dl",
        price: "6",
      },
      {
        name: { de: "Tee", fr: "Thé", it: "Tè", en: "Tea" },
        detail: { de: "Minze, Kamille, Früchte", fr: "menthe, camomille, fruits", it: "menta, camomilla, frutti", en: "mint, camomile, fruit" },
        size: "3 dl",
        price: "4",
      },
    ],
  },
  {
    title: { de: "Wein & Shots", fr: "Vin & shots", it: "Vino & shot", en: "Wine & shots" },
    items: [
      { name: "NOX Assemblage Blanc", detail: "VdP Suisse", size: "1 dl", price: "7" },
      { name: "NOX Assemblage Rouge", detail: "VdP Suisse", size: "1 dl", price: "7" },
      { name: { de: "Jägermeister Shot", fr: "Shot de Jägermeister", it: "Shot di Jägermeister", en: "Jägermeister shot" }, size: "2 cl", price: "6" },
    ],
  },
  {
    title: { de: "Bier", fr: "Bière", it: "Birra", en: "Beer" },
    items: [
      { name: { de: "Valaisanne Alkoholfrei", fr: "Valaisanne sans alcool", it: "Valaisanne analcolica", en: "Valaisanne alcohol-free" }, size: "33 cl", price: "5" },
      { name: "Valaisanne Lager", size: "3 dl", price: "6" },
      { name: { de: "Feldschlösschen Weihnachtsbier", fr: "Feldschlösschen bière de Noël", it: "Feldschlösschen birra di Natale", en: "Feldschlösschen Christmas beer" }, size: "3 dl", price: "7" },
    ],
  },
  {
    title: { de: "Alkoholfrei", fr: "Sans alcool", it: "Analcolici", en: "Soft drinks" },
    items: [
      { name: "Pepsi", detail: "PET", size: "5 dl", price: "5" },
      { name: "Pepsi Zero «Max»", detail: "PET", size: "5 dl", price: "5" },
      { name: "Queen’s Ice Tea Lemon", detail: "PET", size: "5 dl", price: "5" },
      {
        name: { de: "Rhäzünser Mineralwasser mit CO₂", fr: "Rhäzünser eau minérale gazeuse", it: "Rhäzünser acqua minerale frizzante", en: "Rhäzünser sparkling mineral water" },
        detail: "PET",
        size: "5 dl",
        price: "5",
      },
      {
        name: { de: "Arkina blau ohne CO₂", fr: "Arkina bleu plate", it: "Arkina blu naturale", en: "Arkina blue still water" },
        detail: "PET",
        size: "5 dl",
        price: "5",
      },
      { name: "El Tony Mate", size: "33 cl", price: "6" },
    ],
  },
  {
    title: { de: "Longdrinks", fr: "Long drinks", it: "Long drink", en: "Long drinks" },
    items: [
      { name: { de: "Trojka Pure mit Zusatz", fr: "Trojka Pure avec mélange", it: "Trojka Pure con mixer", en: "Trojka Pure with mixer" }, size: "3 dl", price: "14" },
      { name: { de: "Bombay Gin mit Zusatz", fr: "Bombay Gin avec mélange", it: "Bombay Gin con mixer", en: "Bombay Gin with mixer" }, size: "3 dl", price: "14" },
    ],
  },
];
