# Technische Spezifikation: Tracking & Analytics Setup (GRATIS & COOKIELOS)
## Für Claude Code — Website gerhardprager.eu

> **Auftraggeber-Kontext:** Website von Univ.-Prof. Dr. Gerhard Prager (Bariatrische Chirurgie Wien).
> **Wichtigste Conversion:** Klick auf die Telefonnummer (`tel:`-Link). Termine werden telefonisch vereinbart.
> **Entscheidung des Inhabers:** Lösung muss **gratis** UND **clean (cookielos, ohne Cookie-Banner)** sein.
> **Konsequenz:** KEIN Google Analytics. KEIN Cookie-Banner. Stattdessen cookielose Tools.

---

## ARCHITEKTUR-ENTSCHEIDUNG (final)

Wir verwenden ausschließlich **cookielose, DSGVO-konforme Analytics ohne Consent-Banner**:

```
gerhardprager.eu
   ├─→ Umami (gratis, cookielos)  ← HAUPT-TOOL
   │     ├─ Seitenaufrufe, Quellen (Referrer), Top-Seiten, Länder
   │     └─ ANRUF-KLICK als Custom-Event "anruf_klick"  ← WICHTIGSTE METRIK
   │
   └─→ Cloudflare Web Analytics (gratis, cookielos)  ← BONUS
         └─ Core Web Vitals / Speed (SEO-relevant)
```

**Warum so:** Umami ist cookielos (kein Banner nötig), DSGVO-konform und kann — anders als Cloudflare Web Analytics — einzelne Klicks (`tel:`-Links) als Conversion-Event erfassen. Damit werden **100 %** der Anruf-Klicks gezählt, nicht nur die von zustimmenden Besuchern.

**Tool-Wahl:** Empfohlen **Umami** (Cloud Free-Tier zum Start, später optional self-hosted für unbegrenzt). Alternative **GoatCounter** (noch simpler, ebenfalls gratis/cookielos) — falls gewünscht, ist der Tausch trivial: nur ein anderes Script-Snippet + andere Event-Funktion.

---

## WAS SICH GEGENÜBER DER ALTEN SPEC ÄNDERT

Aufgrund der Bewertung durch Claude Code (Stand bereits sehr weit) + neuer Gratis/Cookielos-Entscheidung:

- **GA4 entfällt komplett.** `GA_ID`-Platzhalter und der GA4-Lade-Code in `cookie-consent.js` werden nicht mehr gebraucht.
- **Cookie-Banner wird ENTFERNT.** Da keine Cookies/kein personenbezogenes Tracking mehr → kein Consent-Banner nötig.
  - Banner-HTML aus allen Seiten entfernen (Haupt-, Blog-, en/, ar/, ru/).
  - `cookie-consent.js` Einbindung entfernen (oder Datei auf reine "no-op" reduzieren).
- **Datenschutzerklärung** (`datenschutz.html`) bekommt einen kurzen Absatz zu cookieloser Reichweitenmessung (Umami + Cloudflare).

---

## TEIL 1 — CLOUDFLARE (manuell durch Inhaber, keine Code-Änderung)

Status laut Claude Code: Seite läuft bereits auf **Cloudflare Pages**, Clean URLs funktionieren live. Daher nur noch:

1. **Cloudflare Web Analytics** aktivieren: Dashboard → Analytics & Logs → Web Analytics → Site hinzufügen → Snippet/Token kopieren.
2. SSL bereits aktiv (Cloudflare Pages). Verifizieren: "Always Use HTTPS" an.
3. Die 5 Nebendomains per **Redirect Rules (301)** auf gerhardprager.eu leiten (siehe Tabelle unten).

| Domain | Ziel-URL |
|--------|----------|
| adipositaschirurgie.eu | https://www.gerhardprager.eu/eingriffe |
| obesity-surgery.eu | https://www.gerhardprager.eu/blog/bariatric-surgery-vienna |
| fettsuchtchirurgie.eu | https://www.gerhardprager.eu/eingriffe |
| laparoscopy-vienna.at | https://www.gerhardprager.eu/blog/bariatric-surgery-vienna |
| prager-chirurgie.at | https://www.gerhardprager.eu/ |

---

## TEIL 2 — UMAMI EINRICHTEN (durch Inhaber)

1. Account auf **cloud.umami.is** (Free-Tier) erstellen — ODER später Umami self-hosten.
2. Website `gerhardprager.eu` hinzufügen → Umami generiert ein Tracking-Snippet:
   ```html
   <script defer src="https://cloud.umami.is/script.js" data-website-id="DEINE-WEBSITE-ID"></script>
   ```
3. Diese **Website-ID** an Claude Code geben (ersetzt Platzhalter).

> DSGVO-Hinweis: Umami setzt keine Cookies und speichert keine personenbezogenen Daten → kein Consent-Banner nötig. In Österreich/EU rechtlich als reine Reichweitenmessung einzuordnen. (Trotzdem in der Datenschutzerklärung erwähnen.)

---

## TEIL 3 — TRACKING-CODE EINBAUEN (Aufgaben für Claude Code)

### 3.1 Umami-Script auf allen Seiten einbinden (consent-frei, in `<head>` oder vor `</body>`)
Auf **jeder** Seite (Haupt-, Blog-, en/, ar/, ru/) einfügen:
```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="DEINE-WEBSITE-ID"></script>
```
> Da cookielos, KEINE consent-Abhängigkeit. Direkt einbinden.

### 3.2 Anruf-Klick als Conversion tracken (WICHTIGSTE AUFGABE)
Alle Telefonnummern sind `tel:`-Links (z.B. `<a href="tel:+436604895851">`).
Ein kleines, eigenständiges Script (z.B. `analytics-events.js`) erstellen und auf allen Seiten einbinden:

```javascript
// analytics-events.js — cookieloses Conversion-Tracking für Anruf-Klicks
(function () {
  function trackPhoneClicks() {
    var phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        // Umami Custom Event
        if (window.umami && typeof window.umami.track === 'function') {
          window.umami.track('anruf_klick', {
            ziel: link.getAttribute('href'),
            seite: window.location.pathname
          });
        }
      });
    });
  }
  if (document.readyState !== 'loading') {
    trackPhoneClicks();
  } else {
    document.addEventListener('DOMContentLoaded', trackPhoneClicks);
  }
})();
```
Einbindung pro Seite vor `</body>`:
- Hauptebene: `<script src="analytics-events.js"></script>`
- Unterordner (blog/, en/ …): `<script src="../analytics-events.js"></script>`

> Falls stattdessen GoatCounter gewählt wird: Event-Call ersetzen durch
> `window.goatcounter.count({ path: 'anruf_klick', title: 'Anruf-Klick', event: true });`

### 3.3 Cloudflare Web Analytics einbinden (Bonus, consent-frei)
Das von Cloudflare gelieferte Snippet (Teil 1) vor `</body>` auf allen Seiten einbauen.

### 3.4 Cookie-Banner & GA4-Reste entfernen
- Banner-HTML aus allen Seiten löschen.
- `cookie-consent.js` Einbindung entfernen (Datei kann gelöscht oder geleert werden).
- Sicherstellen: keine `googletagmanager.com`-Requests mehr.

---

## TEIL 4 — SEO / SEARCH CONSOLE

### 4.1 Durch Inhaber
- search.google.com/search-console → Property `https://www.gerhardprager.eu` anlegen.
- Verifizierung über Cloudflare-DNS (TXT) — am einfachsten, da GA4 entfällt.
- **sitemap.xml einreichen:** `https://www.gerhardprager.eu/sitemap.xml`

### 4.2 Aufgaben für Claude Code (aus eigener Review bestätigt)
- **Canonicals vereinheitlichen auf Clean URLs.** 17 Eingriffs-/Themenseiten zeigen noch auf `.html` (z.B. `hernienchirurgie.html`), während about/procedures schon clean sind. Alle Canonicals + interne Links auf Clean-URL-Form bringen (`/hernienchirurgie` statt `/hernienchirurgie.html`).
- **Datenschutz-Link im (zu entfernenden) Banner** ist hier obsolet — aber generell prüfen: Verlinkt die Seite korrekt auf `datenschutz.html` statt `impressum.html`, wo Datenschutz gemeint ist?
- Sitemap auf Vollständigkeit + Status 200 aller URLs prüfen (Claude Code nennt ~40 URLs live).
- Ein `<h1>` pro Seite, hreflang konsistent.

---

## TEIL 5 — TEST & ABNAHME

1. **Umami Realtime:** Seite öffnen → in Umami unter "Realtime" muss man sich sehen.
2. **Anruf-Conversion:** Auf Telefonnummer klicken → Event `anruf_klick` erscheint in Umami unter "Events".
3. **Kein Cookie-Banner** mehr sichtbar; im Netzwerk-Tab: keine Cookies gesetzt, kein `googletagmanager`.
4. **Cloudflare Analytics:** zeigt Besucher + Web Vitals.
5. **Search Console:** Sitemap "Erfolgreich", keine Crawling-Fehler.
6. **Redirects:** alle 5 Nebendomains → 301 auf richtige Zielseite (httpstatus.io).

---

## CLAUDE-CODE-AUFGABEN (Checkliste)

- [ ] Umami-Script auf allen Seiten einbinden (Website-ID einsetzen)
- [ ] `analytics-events.js` erstellen + Anruf-Klick-Event einbauen + auf allen Seiten einbinden
- [ ] Cloudflare-Web-Analytics-Snippet auf allen Seiten einbauen
- [ ] Cookie-Banner-HTML + `cookie-consent.js`-Einbindung entfernen (GA4-Reste raus)
- [ ] Canonicals der 17 `.html`-Seiten auf Clean URLs vereinheitlichen
- [ ] Interne Links auf Clean-URL-Form prüfen/anpassen
- [ ] `datenschutz.html` um cookielosen-Analytics-Absatz ergänzen
- [ ] Sitemap: alle URLs Status 200, vollständig

---

## WAS DER INHABER BESORGEN MUSS (an Claude Code geben)

1. **Umami Website-ID** (von cloud.umami.is) — bzw. Entscheidung Umami vs. GoatCounter
2. **Cloudflare Web Analytics Token/Snippet**
3. (Search-Console-Verifizierung macht der Inhaber selbst über Cloudflare-DNS)

> Hinweis: GA4 wird NICHT mehr benötigt. Falls später detaillierte Kampagnen-Auswertung (z.B. bezahlte Instagram-Ads) gewünscht ist, kann GA4 mit Consent-Banner nachgerüstet werden — bewusst als spätere Option offen gelassen.
