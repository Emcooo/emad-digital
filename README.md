# emad.digital

Offizielle Landingpage der **EMAD gUG (haftungsbeschränkt)**.

## Struktur

- `index.html` — Startseite (3 Sätze über das Unternehmen + Kontakt)
- `impressum.html` — Impressum nach §5 TMG, §18 MStV
- `datenschutz.html` — Datenschutzerklärung nach Art. 13 DSGVO
- `style.css` — Design (Serif, neutral)
- `favicon.svg`

## Hosting

Static Site, deployed via **Cloudflare Pages** auf `emad.digital`.

Auto-Deploy bei jedem Push auf `main`.

## Analytics

**Cloudflare Web Analytics** — cookie-frei, keine DSGVO-Einwilligung nötig.
Beacon-Token in allen drei HTML-Files.

## Lokal ansehen

```bash
python3 -m http.server 8000
# → http://127.0.0.1:8000
```

## Updates

Alle Firmendaten aus HRB 311335 München. Bei Änderungen (neuer Geschäftsführer,
neue Adresse, USt-IdNr) in **allen drei HTML-Dateien** aktualisieren und den
Stand-Hinweis in `datenschutz.html` mit-updaten.
