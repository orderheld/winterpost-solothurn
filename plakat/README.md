# Übersetzte Plakate (FR, IT, EN)

Das deutsche Original `public/images/poster.jpg` bleibt unverändert.
Die Sprachversionen entstehen so:

1. `python3 clean.py` entfernt die deutsche Schrift aus dem Original (OpenCV-Inpainting) und schreibt `/tmp/winterpost-plakat-clean.png`.
2. `node render.cjs` (Playwright) setzt die Texte aus `render.cjs` in `poster.html` und speichert `public/images/poster-{fr,it,en}.jpg`.

Texte ändern: in `render.cjs`, Objekt `T`.
