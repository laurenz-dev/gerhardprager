# 7-Stufen-Analyse: Trackbares Kontaktformular + Conversion-Dashboard
## Website: gerhardprager.eu (Cloudflare Pages) · internes Admin-Dashboard

> **Ziel:** Ein diskretes Kontaktformular für Patienten, die sich nicht trauen anzurufen —
> UND ein internes Dashboard, das den **kompletten Funnel** zeigt: Besucher → Formular gestartet
> → wo abgesprungen → abgeschickt, plus **Conversion-Rate** und **Herkunft** der Anfragen.
> Alles Cloudflare-nativ, DSGVO-konform (Gesundheits-Bezug!), Tracking **anonym & cookieless**.
>
> **Goldene Regel durchgehend:** Funnel-Tracking = anonyme Zählung (keine Personendaten).
> Die echten Patientendaten (Name/Kontakt) liegen getrennt davon, einwilligungsbasiert, in der EU-DB.

═══════════════════════════════════
## STUFE 1 — ZIEL & KPIs  *(was wollen wir überhaupt messen?)*
═══════════════════════════════════
Bevor wir bauen: klar definieren, was „Erfolg" heißt und welche Zahlen das Dashboard zeigt.

**Kern-KPI — Conversion-Rate:**
`abgeschickte Anfragen ÷ Besucher der Kontaktseite × 100`. Das ist die wichtigste Zahl.

**Funnel-Kennzahlen (das eigentliche „wo springen Leute ab"):**
- **Besucher** der `/kontakt`-Seite (Seitenaufrufe)
- **Formular gestartet** (jemand fängt an zu tippen/wählt etwas) → *Start-Rate*
- **Pro Schritt erreicht** (bei mehrstufigem Formular: wer kommt bis Schritt 2, 3 …)
- **Abgeschickt & erfolgreich** → *Abschluss-Rate*
- **Abbrüche** (gestartet, aber nie abgeschickt) + **wo** abgebrochen wurde

**Zusatz-Kennzahlen:**
- **Herkunft** der Anfragen (Google / Empfehlung / ChatGPT / Social / direkt)
- **Anliegen-Verteilung** (Adipositas-OP / Schilddrüse / Reflux / allgemein)
- **Zeitverlauf** (Anfragen pro Tag/Woche)
- **Reaktionszeit** (wie schnell wird „neu" → „erledigt")

**Nicht-Ziel:** kein Tracking einzelner Personen, kein Profiling, keine sensiblen Gesundheitsdaten in der Statistik.

═══════════════════════════════════
## STUFE 2 — FUNNEL- & EVENT-MODELL  *(welche Schritte, welche Events)*
═══════════════════════════════════
Damit das Dashboard den Funnel zeigen kann, müssen wir an den richtigen Stellen ein **anonymes Event** loggen.

**Die Funnel-Stufen:**
1. `view` — Kontaktseite geladen
2. `start` — erste Interaktion mit dem Formular (erstes Feld/erste Auswahl)
3. `step` — Schritt abgeschlossen (bei mehrstufigem Formular: Schritt 1 → 2 → 3)
4. `submit` — „Absenden" geklickt
5. `success` — Anfrage erfolgreich gespeichert  *(= Conversion)*
6. `error` — Fehler/abgebrochen (z. B. Validierung, Server)

**Event-Datensatz (bewusst anonym — KEINE Personendaten):**
```
ts        Zeitstempel
session   zufälliger Zufalls-Token pro Besuch (NICHT dauerhaft, keine Identität, kein Cookie)
type      'view' | 'start' | 'step' | 'submit' | 'success' | 'error'
step      welcher Schritt erreicht (1/2/3), nullable
quelle    Herkunft (utm/referrer, anonym) — z. B. 'google', 'chatgpt', 'direct'
```
> Wichtig: In der Event-Tabelle steht **nie** Name, E-Mail, Telefon oder Nachricht. Nur Zählbares.

═══════════════════════════════════
## STUFE 3 — FORMULAR-DESIGN  *(Felder + UX, die Tracking erst ermöglicht)*
═══════════════════════════════════
**Empfehlung: kurzes, mehrstufiges Formular (3 Mini-Schritte) statt einer langen Seite.**
Doppelter Vorteil: (a) wirkt für scheue/schambehaftete Menschen leichter — eine Frage nach der anderen statt einer Wand aus Feldern; (b) wir sehen **sauber, in welchem Schritt** abgesprungen wird.

**Schritt 1 — Anliegen (leichtester Einstieg, niedrige Hemmschwelle):**
- **Worum geht es?** (Auswahl): Adipositas-OP / Abnehmen · Schilddrüse / endokrin · Reflux / Sodbrennen · Allgemeine Frage
- *(harmlos, keine Gesundheitsdaten — nur eine Kategorie)*

**Schritt 2 — Anliegen konkretisieren (alles freiwillig):**
- **Kurze Nachricht** (optional) — Hinweis darunter: *„Ein Stichwort genügt. Bitte keine sensiblen Gesundheitsdaten eintragen."*
- **Wie haben Sie von uns erfahren?** (optional): Google · Empfehlung · ChatGPT/KI · Social Media · Sonstiges
- **Beste Erreichbarkeit** (optional): vormittags · nachmittags · abends

**Schritt 3 — Kontakt & Absenden (das „Commitment" zuletzt):**
- **Name** (Pflicht — Vorname genügt)
- **E-Mail ODER Telefon** (eines Pflicht)
- **Bevorzugte Kontaktart:** Anruf · E-Mail · Nachricht
- **Bereits Patient?** ja/nein (optional)
- **DSGVO-Einwilligung** (Pflicht-Häkchen, Link zu /datenschutz)
- versteckter **Honeypot** + **Absenden**

**Warum Kontaktdaten zuletzt?** Wer schon Anliegen + Nachricht ausgefüllt hat, ist „investiert" und gibt eher die Nummer her. Gleichzeitig sieht man am Drop-off, ob genau dieser letzte Schritt abschreckt. (Reihenfolge ist später per A/B-Test testbar.)

**Felder, die bewusst NICHT vorkommen:** Gewicht, BMI, Vorerkrankungen, Medikamente, Geburtsdatum, Versicherungsnr., Adresse → das sind sensible Gesundheitsdaten (Art. 9) und werden erst im Erstgespräch ärztlich erhoben.

═══════════════════════════════════
## STUFE 4 — TRACKING-TECHNIK  *(wie loggen wir — DSGVO-konform)*
═══════════════════════════════════
**Empfehlung: eigenes, leichtgewichtiges Event-Logging in Cloudflare D1 + Cloudflare Web Analytics für die Besucherzahlen.**

**Optionsvergleich:**
- **Cloudflare Web Analytics** (cookieless, gratis): liefert Seitenaufrufe/Quellen ohne Consent-Banner. → für **Besucher** der Kontaktseite ideal, deckt aber keine Feld-/Schritt-Abbrüche ab.
- **Eigenes Event-Logging in D1** (empfohlen): ein winziges Script schickt bei `start`/`step`/`submit`/`success`/`error` einen anonymen „Beacon" an `POST /api/track`. → liefert den **detaillierten Funnel** (wo abgesprungen). Volle Kontrolle, EU-Speicherung, keine Drittanbieter.
- **Plausible / PostHog (extern):** mächtig, aber zusätzlicher Auftragsverarbeiter + ggf. Consent. → für den Start unnötig, später optional.

**DSGVO-sauber heißt hier konkret:**
- **Kein Cookie, kein localStorage-Identifier** → bleibt ohne Einwilligungspflicht (ePrivacy), solange nichts auf dem Gerät gespeichert wird.
- `session`-Token ist ein **Zufallswert nur für die Dauer des Besuchs** (im Speicher, nicht persistent) — dient nur dazu, die Schritte *eines* Besuchs zusammenzuhängen, ist **keine** Identität.
- **Keine personenbezogenen Daten** in der Event-Tabelle.
- Beacon per `navigator.sendBeacon()` (geht auch beim Verlassen der Seite zuverlässig durch → Abbrüche werden erfasst).

═══════════════════════════════════
## STUFE 5 — DATENBANK & BACKEND  *(Tabellen + Endpoints für Claude Code)*
═══════════════════════════════════
**Zwei getrennte Tabellen — bewusst getrennt (Datenschutz!):**

```sql
-- 1) Echte Anfragen (personenbezogen, einwilligungsbasiert)
CREATE TABLE anfragen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT,
  telefon TEXT,
  kontaktart TEXT,          -- Anruf | E-Mail | Nachricht
  anliegen TEXT,            -- Adipositas | Schilddruese | Reflux | Allgemein
  erreichbarkeit TEXT,      -- vormittags | nachmittags | abends
  quelle TEXT,              -- Google | Empfehlung | ChatGPT | Social | Sonstiges
  bestandspatient INTEGER,  -- 0/1
  nachricht TEXT,
  einwilligung INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'neu'   -- neu | erledigt
);

-- 2) Anonyme Funnel-Events (KEINE Personendaten!)
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL DEFAULT (datetime('now')),
  session TEXT,             -- Zufalls-Token pro Besuch, keine Identität
  type TEXT NOT NULL,       -- view | start | step | submit | success | error
  step INTEGER,             -- 1/2/3, nullable
  quelle TEXT               -- anonym
);
```
- **D1-Region: EU.**

**Pages Functions (Endpoints):**
- `POST /api/kontakt` — Anfrage validieren (Name Pflicht; E-Mail ODER Telefon; Honeypot; optional Turnstile) → `INSERT` in `anfragen` → loggt `success`-Event.
- `POST /api/track` — nimmt anonymes Event entgegen → `INSERT` in `events`. Rate-Limit gegen Spam.
- `GET /api/stats` — liefert aggregierte Funnel-Zahlen fürs Dashboard. **Nur mit Access-JWT.**
- `GET/PATCH /api/anfragen` — Liste + Status umschalten. **Nur mit Access-JWT.**

═══════════════════════════════════
## STUFE 6 — DASHBOARD  *(was du als Admin siehst, unter /admin bzw. /intern)*
═══════════════════════════════════
Geschützt per **Cloudflare Access** (nur du + Assistentin). Zwei Bereiche:

**A) Funnel & Conversion (die Statistik):**
- **Kennzahlen-Kacheln:** Besucher · Formular gestartet · Abgeschlossen · **Conversion-Rate %**
- **Funnel-Balken** (Chart.js): view → start → Schritt 1 → 2 → 3 → success, mit Absprung-% zwischen den Stufen → *„wo verlieren wir Leute"*
- **Herkunft** (Tortendiagramm): Google / Empfehlung / ChatGPT / Social / direkt
- **Anliegen-Verteilung** (Balken)
- **Zeitverlauf** (Linie, letzte 30 Tage)

**B) Anfragen-Liste (die echten Leads):**
- Tabelle, neueste zuerst: Datum · Name · Kontakt · Anliegen · Erreichbarkeit · Quelle · Status
- **Status umschalten** „neu ↔ erledigt"
- Filter „nur neue", optional CSV-Export
- **Wichtig:** Die personenbezogene Liste und die anonyme Statistik sind technisch getrennt — die Statistik funktioniert auch ganz ohne Klarnamen.

**Technik-Hinweis:** Chart.js darf im Dashboard von CDN geladen werden. Statistik-Daten kommen aus `GET /api/stats` (nur mit Access-JWT).

═══════════════════════════════════
## STUFE 7 — DSGVO, TEST & GO-LIVE  *(Compliance + Abnahme)*
═══════════════════════════════════
**Datenschutz-Checkliste (das macht es „safe"):**
- [ ] Funnel-Tracking **anonym & cookieless** (kein Cookie, kein localStorage-Identifier) → kein Consent-Banner nötig
- [ ] Event-Tabelle enthält **keine** Personendaten
- [ ] Anfragen-Tabelle: Einwilligung gespeichert, **EU-Speicherung (D1 EU)**
- [ ] **Benachrichtigungs-Mail (falls genutzt) ohne Inhalt** — nur „Neue Anfrage, bitte einloggen"
- [ ] **AVV mit Cloudflare** akzeptiert (+ ggf. Mail-Dienst)
- [ ] **Datenschutzerklärung** ergänzt: Kontaktformular (Zweck, Art. 9 Abs. 2 a, EU, Löschfrist) + anonyme Statistik
- [ ] **Aufbewahrung/Löschung:** Anfragen nach 6–12 Monaten, Roh-Events nach ~90 Tagen automatisch löschen (Scheduled Function)
- [ ] **Assistentin** zur Verschwiegenheit verpflichtet
- [ ] Eintrag ins **Verarbeitungsverzeichnis** der Praxis
- [ ] einmal von **Datenschutz-/Medizinrechtler** abgenommen

**Test / Definition of Done:**
- [ ] Testanfrage erscheint in der Anfragen-Liste; ohne Access kein Zugriff
- [ ] Funnel zählt korrekt: view → start → step → success
- [ ] Absprung wird erfasst (Formular auf halbem Weg verlassen → Drop-off sichtbar)
- [ ] Conversion-Rate rechnet richtig (success ÷ view)
- [ ] Herkunft/Anliegen werden korrekt zugeordnet
- [ ] Honeypot/Turnstile blockt Bots
- [ ] Mobil getestet (die meisten Patienten kommen über Handy)

---

## REIHENFOLGE FÜR DIE UMSETZUNG
1. **Jetzt:** Formular auf `/kontakt` auf 3 Schritte + neue Felder umbauen (Anliegen, Quelle, Erreichbarkeit, bereits Patient) + Tracking-Beacons einbauen.
2. **Claude Code:** D1 (beide Tabellen, EU), die 4 Endpoints, Dashboard `/intern` mit Funnel-Charts + Anfragen-Liste, Cloudflare Access.
3. **Vor Go-Live:** AVV + Datenschutz-Absatz + Löschregeln + Anwalts-Check.
