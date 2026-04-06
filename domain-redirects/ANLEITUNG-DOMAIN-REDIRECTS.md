# Domain Redirect Anleitung - DomainFactory

## Ziel
Alle 5 Nebendomains per 301-Redirect auf gerhardprager.eu weiterleiten.

## Domains und ihre Weiterleitungsziele

| Domain | Leitet weiter auf | Grund |
|--------|------------------|-------|
| adipositaschirurgie.eu | gerhardprager.eu/eingriffe | Keyword-Match |
| obesity-surgery.eu | gerhardprager.eu/blog/bariatric-surgery-vienna | EN Keyword |
| fettsuchtchirurgie.eu | gerhardprager.eu/eingriffe | Keyword-Match |
| laparoscopy-vienna.at | gerhardprager.eu/blog/bariatric-surgery-vienna | Medical Tourism |
| prager-chirurgie.at | gerhardprager.eu/ | Brand Domain |

## Einrichtung bei DomainFactory

### Option 1: Weiterleitung im Kundenmenü (einfachste Methode)

1. Einloggen auf admin.df.eu
2. Links auf "Domain-Einstellungen" klicken
3. Domain auswählen (z.B. adipositaschirurgie.eu)
4. "Weiterleitung" oder "Redirect" auswählen
5. Ziel-URL eingeben (z.B. https://www.gerhardprager.eu/eingriffe)
6. Typ: "301 - Permanent" auswählen
7. Speichern
8. Für jede Domain wiederholen

### Option 2: .htaccess hochladen (mehr Kontrolle)

1. Im DomainFactory Kundenmenü: Domain -> Webspace zuweisen
2. Per FTP/SFTP verbinden
3. Die jeweilige .htaccess-Datei in das Root-Verzeichnis der Domain hochladen
4. Fertig - die Redirects sind sofort aktiv

### Option 3: DNS-Weiterleitung

1. Domain-Einstellungen -> DNS
2. A-Record auf den gleichen Server wie gerhardprager.eu setzen (92.205.174.100)
3. .htaccess mit Redirect hochladen

## Wichtig: SSL-Zertifikate

Damit die Redirects auch mit HTTPS funktionieren, braucht jede Domain ein SSL-Zertifikat.
Bei DomainFactory gibt es SSL ab 1,50 EUR/mtl. oder kostenlos via Let's Encrypt.

## SEO-Effekt

301-Redirects vererben ca. 90-99% der Link-Equity (Backlink-Power) an die Ziel-URL.
Das bedeutet: Jeder Backlink auf adipositaschirurgie.eu stärkt automatisch gerhardprager.eu.

## Reihenfolge der Einrichtung

1. Zuerst gerhardprager.eu fertig deployen und testen
2. Dann die 5 Redirects nacheinander einrichten
3. Nach 24h mit Google Search Console prüfen, ob die Redirects korrekt funktionieren
4. Alte Indexierungen in Google Search Console per "URL entfernen" bereinigen
