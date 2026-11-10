# Winter Post Solothurn – Onepager

Next.js (App Router) Onepager für **Winter Post Solothurn**, umgesetzt von Webnova.

## Lokal starten

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Produktions-Build prüfen
```

## Deployment auf Vercel

1. Repository auf GitHub pushen.
2. In Vercel „Add New Project“ → Repository wählen. Framework wird automatisch als Next.js erkannt, keine Umgebungsvariablen nötig.
3. Domain `winterpost.ch` (und `www.winterpost.ch`) unter *Settings → Domains* hinzufügen.

Die Seite ist komplett statisch: keine Datenbank, kein Kontaktformular, keine Cookies, kein Tracking.
Schriften werden über `next/font` selbst gehostet (keine Anfragen an Google beim Besuch).

## Inhalte anpassen

- **Alle Stammdaten** (E-Mail, Telefon, Adresse, Öffnungszeiten, Eröffnungsdatum, Instagram): `lib/site.ts`
- **Angebot / Speisekarte**: Array `menu` in `lib/site.ts`
- **Bilder**: `public/images/` (aktuell Platzhalter aus dem Instagram-Profil; durch echte Fotos ersetzen, gleiche Dateinamen genügen)
- **Texte der Sektionen, Impressum, Datenschutz**: `app/page.tsx`
- **Design (Farben, Schriften, Abstände)**: `app/globals.css` (CSS-Variablen oben)

Der Countdown im Hero zählt bis zur Eröffnung (`openingIso` in `lib/site.ts`) und zeigt danach automatisch „Jetzt geöffnet“ bzw. die nächste Öffnungszeit (Zeitzone Europe/Zurich).
