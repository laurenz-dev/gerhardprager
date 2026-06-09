# Spec für Claude Code: Kontakt-Backend + internes Anfragen-Dashboard
## Website: gerhardprager.eu (Cloudflare Pages)

> Ziel: Das neue Kontaktformular auf `/kontakt` (postet JSON an **`/api/kontakt`**) soll Anfragen
> **in einer Datenbank speichern** und in einem **internen, zugriffsgeschützten Dashboard** anzeigen
> (nur für Prof. Prager + Assistentin). Alles Cloudflare-nativ, DSGVO-konform (Gesundheits-Bezug!).

---

## 1. Architektur
Formular (`/kontakt`) → **Pages Function** `POST /api/kontakt` → **Cloudflare D1** (DB, Region EU)
→ internes Dashboard `/intern`, abgesichert per **Cloudflare Access** → liest via `GET /api/anfragen`.

---

## 2. Cloudflare D1 — Datenbank
Tabelle `anfragen`:
```sql
CREATE TABLE anfragen (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT,
  telefon TEXT,
  kontaktart TEXT,
  nachricht TEXT,
  einwilligung INTEGER NOT NULL DEFAULT 1,   -- Consent zum Zeitpunkt des Absendens
  status TEXT NOT NULL DEFAULT 'neu'         -- 'neu' | 'erledigt'
);
```
- D1-**Standort auf EU** setzen (DSGVO).

## 3. Pages Function `POST /api/kontakt`
- JSON entgegennehmen: `{name,email,telefon,kontaktart,nachricht}`.
- **Validierung:** `name` Pflicht; `email` ODER `telefon` Pflicht.
- **Honeypot:** Das Formular sendet ein verstecktes Feld `website` mit – falls befüllt, still mit 200 abbrechen (Bot). (Frontend sendet es bei Bots; serverseitig zusätzlich prüfen.)
- **(Empfohlen) Spam-Schutz:** Cloudflare **Turnstile** (gratis) einbauen – Widget ins Formular + Token serverseitig prüfen.
- In D1 `INSERT`. Bei Erfolg `200` zurück, sonst `500`.
- **(Empfohlen) Benachrichtigung:** bei neuer Anfrage eine kurze E-Mail an **dr.prager_ordination@icloud.com** („Neue Anfrage über die Website") – z. B. via Resend/Brevo-API (MailChannels-Gratis-Sending über Cloudflare ist 2024 entfallen). So muss niemand das Dashboard ständig prüfen.

## 4. Internes Dashboard `/intern`
- **Cloudflare Access (Zero Trust)** vor die Route legen → Policy: nur erlaubte E-Mails (Prof. Prager + Assistentin). Login per E-Mail-Code, keine eigene Passwortverwaltung nötig.
- Seite zeigt die Anfragen aus D1 (neueste zuerst): Datum, Name, E-Mail/Telefon, bevorzugte Kontaktart, Nachricht, Status.
- **Status umschalten** „neu ↔ erledigt" → `PATCH /api/anfragen/:id`.
- Datenquelle: `GET /api/anfragen` (Function) – darf **nur** mit gültigem Access-JWT antworten (serverseitig prüfen), niemals öffentlich.
- Schlicht halten (Tabelle/Liste, Filter „nur neue"). Optional CSV-Export.

## 5. DSGVO-Pflichten (wichtig, Gesundheits-Bezug)
- D1 in der **EU**; Dashboard **nur** über Cloudflare Access erreichbar (keine öffentliche Lese-Route).
- **Einwilligung** wird mitgespeichert (Feld `einwilligung`), Datenschutz-Link ist im Formular vorhanden.
- **Aufbewahrung/Löschung:** Aufbewahrungsfrist definieren (z. B. Anfragen nach 6–12 Monaten automatisch löschen – Cron/Scheduled Function) + Möglichkeit, einzelne Einträge im Dashboard zu löschen.
- **Datenschutzerklärung** (`/datenschutz`) um einen Absatz ergänzen: „Über das Kontaktformular übermittelte Daten werden zur Bearbeitung Ihrer Anfrage gespeichert (Cloudflare D1, EU) und nach X Monaten gelöscht."
- Datensparsamkeit: keine zusätzlichen/sensiblen Felder ergänzen.

## 6. Definition of Done
- [ ] D1-Tabelle `anfragen` (EU) angelegt
- [ ] `POST /api/kontakt` speichert + Honeypot/Turnstile + (E-Mail-Benachrichtigung)
- [ ] `/intern` per Cloudflare Access geschützt, listet Anfragen, Status umschaltbar
- [ ] `GET/PATCH /api/anfragen` nur mit Access-JWT
- [ ] Datenschutzerklärung ergänzt + Aufbewahrungsregel
- [ ] Live getestet: Testanfrage erscheint im Dashboard; ohne Access kein Zugriff

> Frontend (Formular auf `/kontakt`) ist bereits gebaut und postet an `/api/kontakt`.
