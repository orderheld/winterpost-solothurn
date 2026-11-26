# Plakate (DE, FR, IT, EN)

Das unveränderte Original des Kunden liegt in `plakat/poster-original.jpg`.
Seit 26.11.2026 steht auf allen Plakaten statt „Täglich ab 11:00 bis 22:00“ das Saisonende
(„Täglich bis 3. Januar 2027“), weil es keine fixen täglichen Öffnungszeiten gibt.

1. `python3 clean.py all` entfernt alle Texte aus dem Original (OpenCV-Inpainting) → `/tmp/winterpost-plakat-clean.png` (für FR/IT/EN).
   `python3 clean.py band` entfernt nur das Band → `/tmp/winterpost-plakat-clean-de.png` (für DE).
2. `node render.cjs` (Playwright) setzt die Texte aus `render.cjs` in `poster.html` und speichert
   `public/images/poster.jpg` (DE) und `public/images/poster-{fr,it,en}.jpg`.

Texte ändern: in `render.cjs`, Objekt `T` (beide Schritte im Ordner `plakat/` ausführen).
