Du baust für die bestehende Website **gerhardprager.eu** (Cloudflare Pages) ein vollständiges, DSGVO-konformes Kontakt-System mit anonymem Funnel-Tracking und einem passwortgeschützten Admin-Dashboard. Alles Cloudflare-nativ (Pages Functions + D1), keine externen Abhängigkeiten außer Chart.js (per CDN nur im Dashboard). Datenschutz hat oberste Priorität: Es geht um eine Arztpraxis, Anfragen haben Gesundheits-Bezug (Art. 9 DSGVO).

## Grundprinzip (wichtig)
Trenne strikt zwei Datenarten:
1. **Echte Anfragen** (Name/Kontakt = personenbezogen, einwilligungsbasiert).
2. **Anonyme Funnel-Events** (nur Zählbares, KEINE Personendaten, kein Cookie).
Die Conversion-Statistik muss komplett ohne Personendaten funktionieren.

## 1. Cloudflare D1 (Region EU)
Lege eine D1-Datenbank in der **EU** an und binde sie an das Pages-Projekt. Tabellen:

```sql
CREATE TABLE anfragen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT,
  telefon TEXT,
  kontaktart TEXT,          -- Anruf | E-Mail | Nachricht
  anliegen TEXT,            -- Adipositas | Schilddruese | Reflux | Allgemein
  erreichbarkeit TEXT,      -- vormittags | nachmittags | abends
  quelle TEXT,              -- Google | Empfehlung | ChatGPT | Social | Sonstiges | direct
  bestandspatient INTEGER,  -- 0/1
  nachricht TEXT,
  einwilligung INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'neu'   -- neu | erledigt
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  session TEXT,             -- Zufalls-Token pro Besuch, KEINE Identität
  type TEXT NOT NULL,       -- view | start | step | submit | success | error
  step INTEGER,             -- 1/2/3, nullable
  quelle TEXT               -- anonym
);

CREATE TABLE login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT, ts TEXT NOT NULL DEFAULT (datetime('now')), ok INTEGER
);
```

## 2. Frontend: Kontaktformular auf /kontakt (3 Schritte + Tracking)
Baue (bzw. ersetze das bestehende Formular durch) ein schlankes **3-Schritt-Formular** (Wizard, eine Frage-Gruppe pro Schritt, Fortschrittsanzeige). Mobil-first, ruhiges/seriöses Design passend zur Seite.

**Schritt 1 – Anliegen:** Auswahl „Worum geht es?": Adipositas-OP / Abnehmen · Schilddrüse / endokrin · Reflux / Sodbrennen · Allgemeine Frage.
**Schritt 2 – Details (alles optional):** Kurze Nachricht (Textarea) mit Hinweis darunter *„Ein Stichwort genügt — bitte keine sensiblen Gesundheitsdaten eintragen."* · „Wie haben Sie von uns erfahren?" (Google/Empfehlung/ChatGPT/Social/Sonstiges) · „Beste Erreichbarkeit" (vormittags/nachmittags/abends).
**Schritt 3 – Kontakt & Absenden:** Vollständiger Name (Vor- **und** Nachname, Pflicht) · Telefon mit **Länder-Vorwahl** (Pflicht — Vorwahl-Auswahl mit Flaggen/Dial-Codes, Standard +43 Österreich; sehr wichtig wegen internationaler Patienten) · E-Mail (Pflicht) · bevorzugte Kontaktart (Anruf/E-Mail/Nachricht) · „Bereits Patient?" ja/nein · DSGVO-Einwilligungs-Häkchen (Pflicht, Link zu /datenschutz) · verstecktes Honeypot-Feld `website` (per CSS off-screen) · Absenden-Button.

**Validierung (clientseitig + serverseitig):** Vollständiger Name Pflicht; **Telefon inkl. Vorwahl Pflicht**; **E-Mail Pflicht**; Einwilligung Pflicht. Telefonnummer im internationalen Format speichern (z. B. `+43 660 4895851`). Für die Vorwahl-Auswahl ein internationales Telefon-Eingabefeld mit Ländercodes verwenden (gängige zuerst: AT/DE/CH, dann alphabetisch).
**Bei Erfolg:** Dankesmeldung anzeigen, Telefon als Fallback nennen (+43 660 489 58 51).

**Tracking-Beacons (anonym, cookieless):** Erzeuge beim Laden einen Zufalls-`session`-Token nur im Speicher (NICHT in Cookie/localStorage). Sende per `navigator.sendBeacon()` an `POST /api/track`:
- `view` beim Laden der Kontaktseite
- `start` bei erster Interaktion
- `step` beim Abschluss von Schritt 1 bzw. 2 (mit `step`-Nummer)
- `submit` beim Klick auf Absenden
- `success` / `error` je nach Ergebnis
Kein Cookie, kein persistenter Identifier, keine Personendaten im Beacon.

## 2b. Kontakt-Möglichkeit auf JEDER Seite (Anrufen + Schriftlich)
Auf **allen Seiten** der Website (alle Sprachen DE/EN/AR) muss es eine dezente, immer erreichbare Kontaktmöglichkeit geben — **mit zwei gleichwertigen Wegen**, damit auch schüchterne/telefonscheue Menschen jederzeit Kontakt aufnehmen können:
1. **Anrufen** → `tel:+436604895851`
2. **Schriftlich anfragen** → Link zum Formular auf `/kontakt#anfrage` (bzw. der jeweiligen Sprachversion).

Umsetzung als **kleiner, dezenter Floating-Button unten rechts** (auf jeder Seite, mobil + Desktop), der die beiden Optionen anbietet („Anrufen" / „Schreiben"). Ruhig und seriös gestaltet, passend zum medizinischen Ton — **nicht** aufdringlich, kein blinkendes Pop-up. Zusätzlich: Wo es auf Seiten bereits einen „Jetzt anrufen"-CTA gibt, **immer auch die schriftliche Option daneben** anbieten (nicht nur Telefon).
Klicks auf „Schreiben" bzw. „Anrufen" als anonyme Events loggen (`POST /api/track`), damit im Dashboard sichtbar ist, welcher Weg genutzt wird.

## 3. Pages Functions (Endpoints)
- `POST /api/kontakt`: JSON entgegennehmen, validieren, Honeypot prüfen (befüllt → still mit 200 abbrechen), in `anfragen` INSERT, `success`-Event loggen, 200/500 zurück. **Optional**: kurze Benachrichtigungs-Mail an dr.prager_ordination@icloud.com — **OHNE Inhalt**, nur „Neue Anfrage über die Website – bitte im Dashboard einloggen." (Anfrage-Inhalt NIE per Mail versenden.)
- `POST /api/track`: anonymes Event in `events` INSERT. Einfaches Rate-Limit.
- `POST /api/login`, `POST /api/logout`: siehe Auth.
- `GET /api/stats`: aggregierte Funnel-/Conversion-Daten fürs Dashboard. **Nur mit gültiger Session.**
- `GET /api/anfragen` (Liste) + `PATCH /api/anfragen/:id` (Status neu↔erledigt). **Nur mit gültiger Session.**

## 4. Auth — Admin-Login auf /login (passwortgeschützt)
- `/login`: schlichte Login-Seite (Benutzername + Passwort).
- **Zugangsdaten als Cloudflare-Environment-Secrets** speichern (NIEMALS im Code committen):
  - `ADMIN_USER` = `Ordination`
  - `ADMIN_PASS` = `GPOrdi43A!`  (bevorzugt als Hash ablegen, z. B. SHA-256, und serverseitig vergleichen)
  - `SESSION_SECRET` = zufälliger langer Wert (für Cookie-Signatur)
- `POST /api/login`: Benutzername/Passwort **konstantzeit-vergleichen**. Bei Erfolg ein **HMAC-signiertes Session-Cookie** setzen: `httpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, Ablauf z. B. 8 Stunden. Danach Redirect auf `/admin`.
- **Brute-Force-Schutz:** Login-Versuche in `login_attempts` zählen; nach z. B. 5 Fehlversuchen pro IP/15 min temporär sperren.
- **Middleware/Guard:** `/admin` und die geschützten API-Routen (`/api/stats`, `/api/anfragen`) prüfen das signierte Cookie. Ohne gültige Session → `/admin` leitet auf `/login` um, geschützte APIs antworten mit `401`. Niemals öffentlich lesbar.
- `POST /api/logout`: Cookie löschen.

## 5. Admin-Dashboard auf /admin (hinter Login)
Zwei Bereiche, sauberes/ruhiges UI (Chart.js per CDN erlaubt):

**A) Funnel & Conversion (aus `GET /api/stats`):**
- Kennzahlen-Kacheln: Besucher · Formular gestartet · Abgeschlossen · **Conversion-Rate %** (success ÷ view).
- **Funnel-Balkendiagramm:** view → start → Schritt 1 → Schritt 2 → success, inkl. Absprung-% zwischen den Stufen.
- **Herkunft** als Tortendiagramm (quelle).
- **Anliegen-Verteilung** als Balken.
- **Zeitverlauf** als Linie (letzte 30 Tage).
- Zeitraum-Filter (7/30/90 Tage).

**B) Anfragen-Liste (aus `GET /api/anfragen`):**
- Tabelle, neueste zuerst: Datum · Name · E-Mail/Telefon · Anliegen · Erreichbarkeit · Quelle · bevorzugte Kontaktart · bereits Patient · Nachricht · Status.
- Status umschalten „neu ↔ erledigt" (`PATCH`).
- Filter „nur neue" + CSV-Export.

## 6. DSGVO & Aufbewahrung
- D1 in der **EU**. Events strikt anonym (keine Personendaten, kein Cookie).
- Einwilligung in `anfragen.einwilligung` mitspeichern.
- **Automatische Löschung** via Scheduled (Cron) Function: `events` älter als **90 Tage** löschen; `anfragen` älter als **12 Monate** löschen.
- **Datenschutzerklärung** (`/datenschutz`) um zwei Absätze ergänzen: (1) Kontaktformular — Zweck, Rechtsgrundlage Art. 9 Abs. 2 a DSGVO (Einwilligung), Speicherort Cloudflare D1 (EU), Löschfrist 12 Monate; (2) anonyme, cookielose Reichweiten-/Funnel-Statistik ohne Personenbezug.
- Keine zusätzlichen/sensiblen Felder ergänzen (Datensparsamkeit).

## 7. Definition of Done (bitte testen)
- [ ] D1 (EU) mit allen Tabellen, ans Projekt gebunden.
- [ ] 3-Schritt-Formular auf /kontakt live, mobil getestet, Honeypot aktiv (Pflicht: voller Name, Telefon inkl. Vorwahl, E-Mail, Einwilligung).
- [ ] Telefon-Eingabe mit internationaler Länder-Vorwahl funktioniert (Standard +43).
- [ ] Dezenter Kontakt-Floating-Button („Anrufen" + „Schreiben") auf JEDER Seite (DE/EN/AR), mobil + Desktop.
- [ ] Tracking-Events (view/start/step/submit/success/error) werden anonym geloggt; Abbruch auf halbem Weg erzeugt sichtbaren Drop-off.
- [ ] `/login` schützt `/admin`; falsche Daten + Brute-Force werden geblockt; Secrets nicht im Code.
- [ ] Dashboard zeigt korrekte KPIs, Funnel, Herkunft, Anliegen, Zeitverlauf; Conversion-Rate rechnet richtig.
- [ ] Anfragen-Liste zeigt Testanfrage, Status umschaltbar, CSV-Export funktioniert.
- [ ] `/api/stats` und `/api/anfragen` ohne Session → 401.
- [ ] Cron löscht alte Events/Anfragen.
- [ ] Datenschutzerklärung ergänzt.

Wichtig: Secrets (`ADMIN_USER`, `ADMIN_PASS`, `SESSION_SECRET`) ausschließlich als Cloudflare-Environment-Variablen setzen, nicht ins Repository schreiben.
