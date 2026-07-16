# SEO-AUDIT „ZERLEGUNG" — gerhardprager.eu
**Datum:** 7. Juli 2026 · **Auftrag:** Maximal strenger Audit. Warum kommen 0 Patienten über Google?
**Gesamtnote: 2,5 / 10 — Nicht genügend.**

---

## Executive Summary (die unbequeme Wahrheit)

Ihr habt den **besten bariatrischen Chirurgen Europas** — IFSO-Weltpräsident, 435+ Publikationen, 9.900+ Eingriffe — und Google behandelt die Seite wie eine Karteileiche. Das ist kein Content-Problem. Ihr habt mehr Strategie-Dokumente als manche Agentur (Backlink-Plan, Podcast-Strategie, Keyword-Map, GBP-Anleitung, Wikipedia-Entwurf). **Geschrieben wurde viel. Umgesetzt und technisch sauber ausgeliefert wurde fast nichts.**

Die drei Todesursachen:

1. **Der Google-Index ist eine Ruine.** `site:gerhardprager.eu` zeigt bis heute alte Joomla-URLs (`http://www.gerhardprager.eu/index.php/de/…`) und Phantom-Seiten wie `/person.html`. Die neuen Money-Pages sind im Index praktisch unsichtbar.
2. **Jede Seite existiert in bis zu 4 Varianten** (www / non-www × mit / ohne `.html`) — ohne Host-Redirect. Google muss bei jeder einzelnen URL raten, welche zählt. Rankingsignale werden vierfach verdünnt.
3. **Keine einzige Money-Page zielt auf ein lokales Keyword.** Alle 9 geprüften Eingriffsseiten: 0× „Wien" im Title. Der Homepage-H1 ist ein Name, kein Suchbegriff. Ihr rankt für nichts, weil ihr auf nichts zielt.

Bei Tests für „Magenbypass Wien Chirurg" und „Schlauchmagen Wien Kosten" erscheinen **Kisser, Tentschert, Sperker, Langer und diverse Kliniken — gerhardprager.eu erscheint nicht.** Chirurgen mit einem Bruchteil der Reputation kassieren die Patienten, die eigentlich zu Prof. Prager gehören.

> Caveat: SERP-Checks liefen über US-Infrastruktur; österreichische Ergebnisse weichen ab — aber nicht so stark, dass aus „unsichtbar" plötzlich „Platz 1" wird. Ohne Ahrefs/Search-Console-Zugang sind Backlink- und Klickdaten Schätzungen (Ahrefs-Connector ist installiert, aber nicht authentifiziert).

---

## Kapitel 0 — Was ihr alles HABT (und verrotten lasst)

| Asset im Projektordner | Zustand |
|---|---|
| 25 Hauptseiten + 26 Blog-Artikel (DE) + EN-Version (21 Seiten) + RU/AR-Teilversionen | Live, aber technisch sabotiert (siehe unten) |
| Ozempic-Content-Cluster (4 Artikel, quellengeprüft, ärztlich freigegeben) | Inhaltlich stark — **fehlt in der Sitemap** |
| `SEO-BACKLINK-AKTIONSPLAN.md`, `Mega-Backlink-Strategie.docx` | Papier. Kein messbarer Linkaufbau erkennbar |
| `GOOGLE-BUSINESS-PROFIL.md` | Anleitung existiert — Umsetzungsstatus unbelegt |
| `Podcast-Strategie` + `Podcast-Outreach` (2 docx) | Papier |
| `wikipedia-entwurf-gerhard-prager.txt` | Papier |
| `Keyword-Content-Map`, `BRAND-Content-Regelwerk`, `Content-System-7-Stufen` | Gut — wird von der Technik nicht getragen |
| 5 Satelliten-Domains im Repo (adipositaschirurgie.eu, fettsuchtchirurgie.eu, obesity-surgery.eu, laparoscopy-vienna.at, prager-chirurgie.at) | **Aktives Risiko** (Doorway-Pages, siehe K13) |
| `llms.txt`, `_redirects` (Joomla-Altlasten sauber gemappt), Cookie-Consent mit GA4 (G-DBFZ01602M) | Solide gedacht, teils in sich widersprüchlich |
| Fremd-Repos im Website-Ordner (claude-mem, awesome-claude-code, superpowers, node_modules — ~150 MB) | Gehören nicht in ein Deploy-Repo |

**Diagnose:** Ihr seid strategisch übergewichtig und operativ untergewichtig. Ironie beabsichtigt.

---

## Kapitel 1 — KRITISCHE Befunde (jeder einzelne kostet Patienten)

### K1: Der Index ist voller Leichen — und niemand räumt auf
`site:gerhardprager.eu` liefert: `index.php/de/`, `index.php/en/person-gb`, `index.php/de/leistungen`, `index.php/en/patient-login`, `person.html` … Die 301-Redirects funktionieren zwar (geprüft: `/index.php/de/leistungen` → `/eingriffe` ✓), aber Google hat die neuen URLs nie sauber übernommen. Das heißt: **Entweder wurde nie eine Search Console gepflegt, nie eine Neuindexierung angestoßen, oder beides.** Ein Relaunch ohne Index-Management ist wie eine OP ohne Nachsorge.

### K2: Soft-404-Katastrophe — jede Fantasie-URL liefert die Startseite
`https://gerhardprager.eu/person.html` existiert im Repo nicht — liefert aber **HTTP 200 mit einer Kopie der Startseite** (kein Redirect, keine 404). Damit produziert der Server auf Wunsch unendlich viele Duplikate der Homepage. Genau so eine ist bereits indexiert. Google stuft solche Seiten als Soft-404 ein und senkt das Crawl-Vertrauen für die gesamte Domain.

### K3: Host-Chaos — www und non-www leben beide
`https://gerhardprager.eu/` und `https://www.gerhardprager.eu/` liefern beide 200 (geprüft). Kein Redirect. Canonical zeigt auf www, ausgelieferte Links folgen dem jeweils aufgerufenen Host. **Basisfehler aus dem Jahr 2005.**

### K4: URL-Schizophrenie — .html gegen Clean URLs
Interne Links: `schlauchmagen.html`. Canonical + Sitemap: `/schlauchmagen`. Beide Varianten liefern 200. Ergebnis: **Jede Seite existiert 4×** (K3 × K4). Interne Links zeigen flächendeckend auf die NICHT-kanonische Variante — ihr verlinkt eure eigenen Seiten falsch, auf jeder einzelnen Seite, im gesamten Footer, in der gesamten Navigation.

### K5: Sitemap ist 3 Monate alt und lückenhaft
`sitemap.xml` (Stand 7. April) fehlen: **alle 5 neuen Ozempic-/Juni-Artikel** (euer strategisch wichtigster Content!), die komplette EN-Version (21 Seiten), RU, AR und `datenschutz`. Dazu Widerspruch: Sitemap sagt `/blog/`, Canonical der Blog-Startseite sagt `/blog/index`. Ihr habt Content produziert und Google den Wegweiser dazu verweigert.

### K6: Money-Pages zielen auf NICHTS
Alle Eingriffsseiten-Titles geprüft — **0 von 9 enthalten „Wien"**:
- `Schlauchmagen (Sleeve Gastrectomy) - Univ.-Prof. Dr. Gerhard Prager` → niemand sucht das
- `SADI-S - Univ.-Prof. Dr. Gerhard Prager` (39 Zeichen — die Hälfte des Platzes verschenkt)
- Homepage-H1: `Univ.-Prof. Dr. Gerhard Prager` — ein Name rankt nur für Leute, die den Namen schon kennen. Die kommen sowieso.

Gleichzeitig targetet der **Blog** „Schlauchmagen Wien" und „Magenbypass Wien" — d. h. wenn überhaupt etwas rankt, dann der Ratgeber-Artikel statt der Conversion-Seite. Selbstkannibalisierung mit Ansage.

### K7: Die Startseite erzählt Google „0 Eingriffe"
Die animierten Zähler stehen im ausgelieferten HTML wörtlich auf: **„0 + Eingriffe · 0 + Publikationen · 0 + Ausbildungsländer"**. Euer stärkstes Vertrauensargument ist im Quelltext eine Null. Snippets, Crawler ohne JS-Rendering und AI-Bots lesen: null Erfahrung.

### K8: Core Web Vitals — ein Massaker in Zeitlupe
`SLeeve.png` **1,6 MB**, `schilddruese-nach-op.png` **2,8 MB**, `ESG.png` 2,5 MB, `magenballon-illustration.png` 2,5 MB — unkomprimierte PNGs auf Money-Pages. Kein WebP/AVIF, keine `width`/`height`-Attribute (Layout-Shift), `style.css` als 130-KB-Monolith. Eure Zielgruppe googelt mobil im Wartezimmer — und wartet 8 Sekunden auf ein Magen-PNG.

### K9: robots.txt sabotiert eure eigene AI-Strategie
Der Cloudflare-Managed-Block verbietet GPTBot, ClaudeBot, CCBot, Google-Extended (`ai-train=no`) — direkt darunter erlaubt euer eigener Block dieselben Bots wieder. Zwei `User-agent: *`-Gruppen, direkte Widersprüche. Ihr habt eine `llms.txt` und einen AEO-Aktionsplan geschrieben und lasst gleichzeitig Cloudflare die AI-Crawler an der Tür abweisen. **Linke Hand, rechte Hand, nie ein Meeting gehabt.**

### K10: hreflang ist Stückwerk
Startseite: nur `de`, `en`, `x-default`. **RU und AR existieren, werden verlinkt — und fehlen im hreflang.** Unterseiten haben teils nur 2 Einträge, Blog-Seiten teils gar keine. Sprachumschalter verlinkt auf `/index.html` statt auf die Canonical. Halb implementiertes hreflang ist schlechter als keines.

### K11: Falsches Schema — ihr seid kein Kosmetikstudio
Startseiten-Schema enthält `HealthAndBeautyBusiness` — die Kategorie für Beauty-Salons. Für einen Universitätschirurgen. `Physician`/`FAQPage` existieren löblicherweise auf Unterseiten, aber die wichtigste Seite der Domain führt Google in die falsche Kategorie. Dazu NAP-Inkonsistenz: Footer „Kaiserstraße, 1070 Wien" (ohne Hausnummer) vs. Kontakt „Kaiserstraße 43/4a".

### K12: Messblindflug
GA4 lädt nur nach Consent (DSGVO-korrekt, gut) — aber in 5 Blog-Artikeln steckt ein **auskommentierter Platzhalter `G-XXXXXXXXXX`**. Ob eine Search Console verifiziert und gepflegt wird, ist am Zustand des Index ablesbar: offenbar nein. Die Aussage „0 Kunden über SEO" kann derzeit niemand seriös belegen — es gibt keine belastbare Messkette von Ranking → Klick → Anruf.

### K13: Fünf Satelliten-Domains = Doorway-Risiko
adipositaschirurgie.eu, fettsuchtchirurgie.eu, obesity-surgery.eu, laparoscopy-vienna.at, prager-chirurgie.at — fünf Mini-Sites für denselben Arzt mit denselben Leistungen. Das ist exakt das Muster, das Googles Spam-Policy als **Doorway Pages** definiert. Best case: Sie verdünnen Autorität, die die Hauptdomain bräuchte. Worst case: manuelle Maßnahme gegen das gesamte Netzwerk. (Nichts löschen — aber per 301 auf die Hauptdomain konsolidieren.)

---

## Kapitel 2 — HOHE Schwere

| # | Befund | Detail |
|---|---|---|
| H1 | Title-Wildwuchs | 36–101 Zeichen; drei verschiedene Brand-Suffixe („Univ.-Prof. Dr. Gerhard Prager", „Univ.-Prof. Dr. Prager", „Prager"); `magenverkleinerung-kosten-oesterreich` hat 36 Zeichen nackt ohne Klick-Anreiz |
| H2 | Template-Generationen gemischt live | Live-`/schlauchmagen` verlinkt endokrine Eingriffe auf `eingriffe.html#endokrine` (alte Navi), Startseite direkt auf die Einzelseiten (neue Navi) — es sind offenbar verschiedene Build-Stände deployed |
| H3 | Sichtbarer Textfehler auf der Startseite | „Als IFSO Weltpräsident 2023/2024 **2023/2024**, der internationalen…" — doppelt, auf der wichtigsten Seite, seit Wochen |
| H4 | Tippfehler in Meta-Description | blog/magenbypass-wien: „**Gasric**-Bypass-Operation" |
| H5 | Veraltete `meta keywords` in Blog-Posts | Seit 2009 totes Signal; markiert die Seite als SEO-Amateurarbeit |
| H6 | Ein einziges og:image für alles | `foto-1.jpeg` überall; Shares von Schilddrüsen-Artikeln zeigen den Anzugfoto-Standard |
| H7 | Keine Autoren-/E-E-A-T-Verstärkung im Blog | Kein `sameAs` zu ORCID/Google Scholar/PubMed/Wikipedia — bei 435 Publikationen ein Geschenk, das ungeöffnet bleibt |
| H8 | Conversion-Sackgasse | Primärer CTA ist ein `tel:`-Link; „Persönliches Erstgespräch vereinbaren" auf der Startseite verlinkt ebenfalls auf `tel:` statt aufs Formular. Keine Online-Terminbuchung. Wer um 23 Uhr recherchiert (die Mehrheit), ruft nicht an |
| H9 | RU/AR-Versionen sind Fragmente | Alte englische Dateinamen (`procedures.html`), nicht in Sitemap, nicht in hreflang — halbfertig ausgeliefert |
| H10 | Blog ohne Analytics-Konsistenz | 5 Posts mit totem gtag-Kommentar statt zentralem `cookie-consent.js`-Include |

---

## Kapitel 3 — Keyword-Chancen (Auswahl, Schätzwerte ohne Ahrefs)

| Keyword | Schwierigkeit | Chance | Aktuelles Ranking | Intent | Empfohlene Seite |
|---|---|---|---|---|---|
| magenverkleinerung wien | mittel | **hoch** | unsichtbar | transaktional | Money-Page (neu/Title-Fix) |
| magenbypass wien | mittel | **hoch** | unsichtbar | transaktional | magenbypass.html (Title+H1-Fix) |
| schlauchmagen wien | mittel | **hoch** | unsichtbar | transaktional | schlauchmagen.html statt Blog |
| adipositas operation wien | mittel | **hoch** | unsichtbar | transaktional | eingriffe.html |
| magenverkleinerung kosten | mittel | **hoch** | unsichtbar | kommerziell | Blog vorhanden → Technik-Fix |
| adipositas chirurgie krankenkasse | leicht | **hoch** | unsichtbar | kommerziell | Blog vorhanden → in Sitemap! |
| abnehmspritze oder operation | leicht | **hoch** | unsichtbar | kommerziell | Blog vorhanden → in Sitemap! |
| nach ozempic wieder zugenommen | leicht | **hoch** | nicht in Sitemap | informational | Blog vorhanden → in Sitemap! |
| ozempic wirkt nicht mehr | leicht | **hoch** | nicht in Sitemap | informational | Blog vorhanden → in Sitemap! |
| magenbypass kosten österreich | leicht | hoch | unsichtbar | kommerziell | Blog erweitern |
| bester adipositas chirurg wien | leicht | hoch | unsichtbar | transaktional | ueber-mich + GBP |
| schlauchmagen erfahrungen | mittel | mittel | unsichtbar | informational | Patientenstimmen-Seite (fehlt) |
| magenbypass oder schlauchmagen | mittel | mittel | unsichtbar | kommerziell | Blog vorhanden |
| reflux operation wien | leicht | mittel | unsichtbar | transaktional | Blog + hiatushernie.html |
| schilddrüsen op wien | mittel | mittel | unsichtbar | transaktional | schilddruese.html (Title-Fix) |
| wahlarzt chirurg wien 1070 | leicht | mittel | unsichtbar | transaktional | kontakt.html + GBP |
| bariatric surgery vienna (EN, Medizintourismus) | leicht | mittel | unsichtbar | transaktional | en/ + Blog vorhanden |
| sadi-s operation erfahrungen | leicht | mittel | unsichtbar | informational | sadi-s.html (weltweit dünner Wettbewerb — er ist DER Experte) |
| diabetes typ 2 operation | mittel | mittel | unsichtbar | informational | Blog vorhanden |
| magenballon wien kosten | leicht | mittel | unsichtbar | kommerziell | magenballon.html |

**Muster erkannt?** Für die Hälfte der Chancen existiert der Content bereits. Er ist nur technisch begraben.

---

## Kapitel 4 — Technik-Checkliste

| Check | Status | Detail |
|---|---|---|
| HTTPS | ✅ Pass | Cloudflare |
| Host-Kanonisierung (www/non-www) | ❌ **Fail** | beide 200, kein Redirect |
| URL-Kanonisierung (.html/clean) | ❌ **Fail** | beide 200, interne Links auf falsche Variante |
| 404-Verhalten | ❌ **Fail** | Soft-404: Fantasie-URLs liefern Startseite mit 200 |
| Sitemap aktuell | ❌ **Fail** | 3 Monate alt, ≥26 Seiten fehlen |
| robots.txt konsistent | ❌ **Fail** | widersprüchliche Bot-Regeln, doppelte Gruppen |
| hreflang vollständig | ❌ **Fail** | RU/AR fehlen, x-default inkonsistent |
| Alte URLs 301 | ✅ Pass | Joomla-Redirects greifen (Index trotzdem ungeputzt) |
| Schema korrekt | ⚠️ Warning | Physician/FAQPage gut auf Unterseiten; HealthAndBeautyBusiness auf Startseite falsch |
| Bildoptimierung | ❌ **Fail** | bis 2,8 MB PNG, kein WebP, keine Dimensionen |
| Alt-Texte | ✅ Pass | flächendeckend vorhanden |
| Mobile Viewport | ✅ Pass | |
| Analytics/GSC-Messkette | ❌ **Fail** | GA4 consent-gated ok, aber Platzhalter-Reste; Indexzustand ⇒ GSC ungenutzt |
| Crawl-Hygiene Repo | ⚠️ Warning | ~150 MB Fremd-Repos/node_modules im Website-Ordner |

---

## Kapitel 5 — Konkurrenzvergleich (Wien, bariatrisch)

| Dimension | gerhardprager.eu | Langer (übergewichtschirurgie.at) | Tentschert / Kisser / Sperker | Sieger |
|---|---|---|---|---|
| Reputation/E-E-A-T-Substanz | 🥇 Weltklasse | hoch | mittel | **Prager (ungenutzt!)** |
| Sichtbarkeit für „Magenbypass Wien" | unsichtbar | Top 10 | Top 10 | Konkurrenz |
| Lokale Keyword-Ausrichtung | 0/9 Money-Pages | konsequent | konsequent | Konkurrenz |
| Technische Basis (Kanonisierung, Index) | Ruine | solide | solide | Konkurrenz |
| Content-Tiefe/Qualität | überdurchschnittlich | mittel | mittel | Prager |
| Google Business Profile / Local Pack | unbelegt | präsent | präsent | Konkurrenz |

**Das Absurde:** Der einzige Punkt, in dem ihr gewinnt, ist der, der am schwersten zu kopieren ist. Alles, was die Konkurrenz besser macht, ist in 2–6 Wochen reparierbar.

---

## Kapitel 6 — Aktionsplan

### Quick Wins (diese Woche, jeweils < 2 h)

1. **Sitemap regenerieren** — alle 26 Blog-Posts, EN/RU/AR rein, in GSC einreichen. *Impact: hoch. Der billigste Fix des Jahres.*
2. **Host-Redirect setzen**: non-www → www (301, Cloudflare-Regel, 10 Minuten). *Impact: hoch.*
3. **.html → clean URL Redirects** in `_redirects` ergänzen + interne Links auf Canonical umstellen. *Impact: hoch.*
4. **Google Search Console verifizieren**, alte `index.php`-URLs prüfen, Neuindexierung der Money-Pages anstoßen. *Impact: hoch.*
5. **Titles der 9 Eingriffsseiten**: „Schlauchmagen Wien – OP beim IFSO-Weltpräsidenten | Prof. Prager"-Muster. *Impact: hoch.*
6. **Zähler-Fallback**: echte Zahlen ins HTML („9.900+"), JS animiert nur noch. *Impact: mittel, peinlichkeitskritisch.*
7. **„2023/2024 2023/2024"** und **„Gasric"** fixen. *Impact: klein, Hygiene.*
8. **robots.txt entwirren**: Cloudflare-Managed-Content deaktivieren oder eigene Regeln danach ausrichten — eine Wahrheit, nicht zwei. *Impact: mittel (AEO).*
9. **Schema-Fix Startseite**: `HealthAndBeautyBusiness` → `Physician`/`MedicalClinic`, NAP vereinheitlichen (Kaiserstraße 43/4a). *Impact: mittel.*
10. **Bilder-Batch**: PNGs → WebP (≤ 150 KB), `width`/`height` setzen. *Impact: hoch (CWV).*

### Strategische Investitionen (dieses Quartal)

1. **404-Verhalten reparieren** — unbekannte Pfade müssen 404 liefern, nicht die Startseite (Hosting-/Routing-Konfiguration). Danach Index-Bereinigung. *Abhängigkeit: vor GSC-Aufräumen sinnlos.*
2. **Satelliten-Domains konsolidieren**: alle 5 per 301 auf thematisch passende Seiten der Hauptdomain. Nichts löschen — umleiten. *Impact: hoch, Risikoabbau + Linkkonsolidierung.*
3. **hreflang komplett**: Matrix DE/EN/RU/AR + x-default über alle Seiten, oder RU/AR ehrlich auf noindex bis fertig.
4. **Money-Page-Lokalisierung**: je Eingriffsseite ein Wien-Block (Ablauf in Wien, Wahlarzt, Kassenrückerstattung, Anfahrt 1070) — löst zugleich die Blog-Kannibalisierung: Blog informiert, Money-Page konvertiert, Blog verlinkt aufs Verfahren.
5. **Google Business Profile live und gepflegt** (Anleitung liegt fertig im Ordner!) + 10–15 echte Bewertungen. Für „Chirurg Wien"-Suchen ist das Local Pack die halbe Miete.
6. **Backlink-Plan endlich exekutieren**: MedUni-/AKH-Profile, IFSO, ÖGCH, Docfinder/Herold-Profile mit Website-Link, die 3 fertigen Podcast-Pitches versenden, Wikipedia-Entwurf einreichen. Ziel: 20 saubere Links in 90 Tagen — bei dieser Vita fast Selbstläufer.
7. **Online-Terminanfrage prominent** (Formular als Erst-CTA, Telefon als Zweit-CTA) + GA4-Conversion-Events gemäß eurer eigenen TRACKING-SPEC.
8. **E-E-A-T-Ausbau**: Autorenbox mit `sameAs` (ORCID, Scholar, PubMed, MedUni, IFSO) unter jedem Blog-Artikel; Patientenstimmen-Seite mit Review-Schema.
9. **Repo-Hygiene**: Fremd-Repos/node_modules aus dem Deploy-Ordner verschieben (nicht löschen — nur raus aus dem Website-Root).

### Erwartung bei Umsetzung
Quick Wins + Index-Bereinigung: erste lokale Rankings in 4–8 Wochen. Mit GBP + 20 Backlinks + lokalisierten Money-Pages: Top-3-Kandidat für „Magenbypass Wien" & Co. innerhalb von 4–6 Monaten — die Autorität dafür ist längst da, sie ist nur nicht angeschlossen.

---

## Schlusswort

Die Seite scheitert nicht an Qualität, sondern an **Grundlagen, die jede 500-€-Handwerker-Website richtig macht**: ein Host, eine URL pro Seite, eine aktuelle Sitemap, ein sauberer Index, Titles mit Suchbegriffen. Ihr habt einen Ferrari gebaut und vergessen, ihn anzumelden. 0 Patienten über SEO ist bei diesem technischen Zustand kein Pech — es ist das erwartbare Ergebnis.

*Erstellt automatisiert am 7.7.2026. Alle kritischen Befunde live verifiziert (Redirect-Tests, Soft-404-Test, Index-Abfragen, Quelltext-Analysen). Keine Dateien wurden verändert oder gelöscht.*
