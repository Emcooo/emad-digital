# emad.digital — Status für die nächste Session

**Stand**: 2026-04-24. Seite live unter **https://emad.digital**.

Für den umfassenden Master-Status siehe im Dreistein/Claude-Memory: `project_emad_digital.md`.

## Was live ist

- `index.html` — Startseite mit Logo, Stammdaten, nur Anschrift (kein Kontakt)
- `impressum.html`, `datenschutz.html` — rechtskonform, Kontakt als PNG (OCR-Schutz)
- `obf.js` — Click-to-Copy-Handler für Kontakt-PNGs
- `BingSiteAuth.xml` + IndexNow-Key-Datei — Verifizierungen liegen fest
- `robots.txt`, `sitemap.xml`, `llms.txt` — Crawler-Einladungen, inkl. AI
- JSON-LD Schema.org Organization in `index.html`

## Hosting & DNS

- GitHub Pages von `main`-Branch (Owner `Emcooo/emad-digital`, public)
- Cloudflare-Zone `emad.digital`, alle DNS-Records proxied → Edge-HTTPS via Cloudflare
- Ein Git-Push auf `main` = automatischer Deploy (~30s + CF-Cache-Expire)

## Secrets (in `~/.openclaw/workspace/secrets/`)

- `gsc-emad.env` — Google Search Console OAuth-Refresh-Token (emir@islamify.ai)
- `bing-webmaster-emad.env` — Bing Webmaster API-Key
- `indexnow-emad.env` — IndexNow-Key (matched `<key>.txt` im Repo-Root)
- `cloudflare.env` — CF-Token (aktuell nur Zone-Level DNS+Zone-Read; keine Pages/Analytics-Permissions)

## Häufige Ops

```bash
# Nach Content-Change: IndexNow-Ping
~/Projects/emad-digital/scripts/indexnow-ping.sh

# GSC URL-Inspection
set -a && source ~/.openclaw/workspace/secrets/gsc-emad.env && set +a
TOKEN=$(curl -s -X POST "https://oauth2.googleapis.com/token" \
  -d "client_id=$GSC_CLIENT_ID" -d "client_secret=$GSC_CLIENT_SECRET" \
  -d "refresh_token=$GSC_REFRESH_TOKEN" -d "grant_type=refresh_token" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")
curl -s -X POST "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"inspectionUrl":"https://emad.digital/","siteUrl":"sc-domain:emad.digital"}'

# Bing Sitemap + Quota
set -a && source ~/.openclaw/workspace/secrets/bing-webmaster-emad.env && set +a
curl -s "https://ssl.bing.com/webmaster/api.svc/json/GetFeeds?siteUrl=https://emad.digital/&apikey=$BING_API_KEY"
curl -s "https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl=https://emad.digital/&apikey=$BING_API_KEY"
```

## Firmendaten ändern

Bei GF-Wechsel, Adresse oder neuer USt-IdNr in ALLEN dieser Stellen gleichzeitig:
1. `index.html` — Contact-Block + JSON-LD
2. `impressum.html` — Vertreten-durch + Adresse + Registereintrag
3. `datenschutz.html` — Verantwortlicher-Block + Stand-Datum
4. `llms.txt` — Stammdaten + Geschäftsführung

Danach: committen, pushen, IndexNow-Ping.
