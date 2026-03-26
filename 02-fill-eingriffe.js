require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const collectionId = '69bbff2e3b57a9dcd0fb8880'; // Eingriffe

async function getFieldMap() {
  const col = await client.collections.get(collectionId);
  const map = {};
  for (const f of col.fields || []) {
    map[f.displayName] = f.slug;
  }
  console.log('Field map:', JSON.stringify(map, null, 2));
  return map;
}

async function fillEingriffe() {
  const fm = await getFieldMap();

  const eingriffe = [
    {
      name: 'Magenbypass (Roux-en-Y)',
      slug: 'magenbypass-roux-en-y',
      kategorie: 'Bariatrische Chirurgie',
      kurzbeschreibung: 'Der Roux-en-Y Magenbypass ist der Goldstandard der bariatrischen Chirurgie. Durch die Verkleinerung des Magens und Umgehung eines Teils des Dünndarms wird sowohl die Nahrungsaufnahme als auch die Kalorienaufnahme reduziert.',
      beschreibung: '<h2>Was ist ein Magenbypass?</h2><p>Der Roux-en-Y Magenbypass ist einer der am häufigsten durchgeführten und wissenschaftlich am besten untersuchten bariatrischen Eingriffe weltweit. Bei diesem Verfahren wird ein kleiner Magenpouch (ca. 15–30 ml) vom restlichen Magen abgetrennt und direkt mit dem Dünndarm verbunden. Dadurch wird ein großer Teil des Magens und der obere Dünndarm umgangen.</p><p>Der Eingriff wirkt über zwei Mechanismen: Die deutliche Verkleinerung des Magenvolumens (Restriktion) und die veränderte Nährstoffaufnahme (Malabsorption). Zusätzlich verändern sich hormonelle Signalwege, die den Appetit und den Zuckerstoffwechsel positiv beeinflussen.</p><p>Univ.-Prof. Dr. Gerhard Prager führt diesen Eingriff seit über 20 Jahren laparoskopisch (minimal-invasiv) durch — mit über 9.900 abgeschlossenen bariatrischen Operationen insgesamt.</p>',
      indikation: '<h3>Wer kommt für einen Magenbypass in Frage?</h3><ul><li>BMI ≥ 40 kg/m² (Adipositas Grad III)</li><li>BMI ≥ 35 kg/m² mit mindestens einer Begleiterkrankung (Typ-2-Diabetes, Bluthochdruck, Schlafapnoe, Gelenkprobleme)</li><li>Gescheiterte konservative Therapieversuche über mindestens 6–12 Monate</li><li>Alter zwischen 18 und 65 Jahren (individuelle Beurteilung bei Jugendlichen möglich)</li><li>Ausschluss von unbehandelten psychischen Erkrankungen oder Suchterkrankungen</li></ul><p>Die Indikationsstellung erfolgt immer individuell im Rahmen eines ausführlichen Erstgesprächs in der Privatordination oder der Adipositasambulanz am AKH Wien.</p>',
      ablauf: '<h3>Operationsablauf</h3><ol><li><strong>Vorbereitung:</strong> Umfassende Voruntersuchungen (Gastroskopie, Blutbild, psychologisches Gutachten, Ernährungsberatung). Flüssigdiät 2 Wochen vor der OP zur Leberverkleinerung.</li><li><strong>Narkose:</strong> Der Eingriff erfolgt unter Vollnarkose.</li><li><strong>Laparoskopischer Zugang:</strong> Über 4–5 kleine Schnitte (5–12 mm) wird die Kamera und das Instrumentarium eingeführt.</li><li><strong>Magenpouch:</strong> Ein kleiner Magenpouch (ca. 15–30 ml) wird vom restlichen Magen abgetrennt.</li><li><strong>Dünndarm-Umleitung:</strong> Der Dünndarm wird durchtrennt und eine Y-förmige Verbindung (Roux-en-Y) hergestellt.</li><li><strong>Dichtheitsprüfung:</strong> Intraoperative Kontrolle der Nahtstellen.</li></ol><p>Dauer: ca. 90–120 Minuten. Stationärer Aufenthalt: 3–5 Tage.</p>',
      vorteile: '<h3>Vorteile</h3><ul><li>60–80% Verlust des Übergewichts innerhalb von 12–18 Monaten</li><li>Bis zu 80% Remissionsrate bei Typ-2-Diabetes</li><li>Signifikante Verbesserung von Bluthochdruck, Schlafapnoe und Gelenkbeschwerden</li><li>Langfristig stabile Ergebnisse (>10 Jahre belegt)</li><li>Minimal-invasiv — schnelle Erholung</li></ul><h3>Mögliche Risiken</h3><ul><li>Dumping-Syndrom bei zuckerhaltiger Nahrung (meist erwünscht als Verhaltensregulierung)</li><li>Vitamin- und Mineralstoffmangel (lebenslange Supplementierung erforderlich)</li><li>Innere Hernie (selten, <3%)</li><li>Anastomoseninsuffizienz (<1%)</li></ul>',
      nachsorge: '<h3>Nachsorge & Langzeitergebnisse</h3><p>Die lebenslange Nachsorge ist ein wesentlicher Bestandteil des Behandlungskonzepts. In der Adipositasambulanz am AKH Wien und der Privatordination werden regelmäßige Kontrollen durchgeführt:</p><ul><li>Monat 1–3: Kostaufbau, wöchentliche Kontrollen</li><li>Monat 3–12: Vierteljährliche Kontrollen, Blutbildkontrolle</li><li>Ab Jahr 2: Halbjährliche bis jährliche Nachsorge</li><li>Lebenslang: Vitamin B12, Eisen, Calcium, Vitamin D Supplementierung</li></ul><p>Langzeitstudien zeigen, dass der Magenbypass auch nach 10–15 Jahren stabile Gewichtsreduktionsergebnisse liefert und die Lebenserwartung signifikant verbessert.</p>',
      metaTitle: 'Magenbypass Wien | Univ.-Prof. Dr. Gerhard Prager',
      metaDesc: 'Magenbypass (Roux-en-Y) in Wien von IFSO-Präsident Prof. Gerhard Prager. 9.900+ Eingriffe, 265+ Publikationen. Termin: +43 660 489 58 51.',
      sort: 1,
    },
    {
      name: 'Schlauchmagen (Sleeve Gastrectomy)',
      slug: 'schlauchmagen',
      kategorie: 'Bariatrische Chirurgie',
      kurzbeschreibung: 'Bei der Schlauchmagen-Operation wird der Magen auf etwa 15–20% seiner ursprünglichen Größe verkleinert. Der Eingriff ist minimal-invasiv und zählt weltweit zu den häufigsten bariatrischen Verfahren.',
      beschreibung: '<h2>Was ist ein Schlauchmagen?</h2><p>Die Sleeve Gastrectomy (Schlauchmagen-OP) ist ein restriktives bariatrisches Verfahren, bei dem ca. 80–85% des Magens entfernt werden. Der verbleibende Magen hat die Form eines schmalen Schlauchs. Neben der mechanischen Verkleinerung wird auch der Bereich des Magens entfernt, der das Hungerhormon Ghrelin produziert — was zu einer deutlichen Reduktion des Appetits führt.</p><p>Der Eingriff wird laparoskopisch durchgeführt und dauert ca. 60–90 Minuten. Er ist technisch weniger komplex als der Magenbypass, zeigt aber vergleichbar gute Langzeitergebnisse.</p>',
      indikation: '<h3>Wer kommt in Frage?</h3><ul><li>BMI ≥ 40 kg/m²</li><li>BMI ≥ 35 kg/m² mit Begleiterkrankungen</li><li>Besonders geeignet für Patienten mit hohem BMI (>50) als erster Schritt</li><li>Patienten, die keine Malabsorption wünschen</li></ul>',
      ablauf: '<h3>Operationsablauf</h3><ol><li><strong>Vorbereitung:</strong> Voruntersuchungen und 2-wöchige Eiweißdiät</li><li><strong>Laparoskopischer Zugang:</strong> 4–5 kleine Schnitte</li><li><strong>Magenresektion:</strong> Ca. 80% des Magens werden entlang eines Kalibrierungsschlauchs entfernt</li><li><strong>Klammernahtreihe:</strong> Sicherung mit Klammernaht und Übernähung</li><li><strong>Dichtheitsprüfung:</strong> Intraoperative Kontrolle</li></ol><p>Dauer: ca. 60–90 Minuten. Stationär: 3–4 Tage.</p>',
      vorteile: '<h3>Vorteile</h3><ul><li>50–70% Verlust des Übergewichts</li><li>Kein Dumping-Syndrom</li><li>Geringeres Risiko für Vitaminmangelzustände als beim Bypass</li><li>Technisch einfacher, kürzere OP-Dauer</li><li>Kann bei Bedarf zum Bypass konvertiert werden</li></ul>',
      nachsorge: '<h3>Nachsorge</h3><p>Regelmäßige Kontrollen in der Adipositasambulanz. Langzeitstudien unter Beteiligung von Prof. Prager belegen stabile Ergebnisse über 10+ Jahre.</p>',
      metaTitle: 'Schlauchmagen Wien | Univ.-Prof. Dr. Gerhard Prager',
      metaDesc: 'Schlauchmagen (Sleeve Gastrectomy) in Wien — minimal-invasiv von IFSO-Präsident Prof. Gerhard Prager, MedUni Wien. Jetzt Termin vereinbaren.',
      sort: 2,
    },
    {
      name: 'Omega-Loop Magenbypass',
      slug: 'omega-loop-bypass',
      kategorie: 'Bariatrische Chirurgie',
      kurzbeschreibung: 'Der Omega-Loop (Mini-Gastric Bypass) ist eine vereinfachte Bypass-Variante mit nur einer Darmverbindung. Er bietet exzellente Gewichtsreduktion bei kürzerer Operationsdauer.',
      beschreibung: '<h2>Was ist der Omega-Loop Magenbypass?</h2><p>Der Omega-Loop Bypass (auch Mini-Gastric Bypass oder One-Anastomosis Gastric Bypass/OAGB genannt) ist eine moderne Variante des klassischen Magenbypasses. Im Unterschied zum Roux-en-Y wird nur eine einzige Verbindung (Anastomose) zwischen Magenpouch und Dünndarm hergestellt.</p><p>Der längere Magenpouch und die einfachere Anatomie führen zu einer kürzeren OP-Dauer bei vergleichbaren Ergebnissen. Der Eingriff gewinnt international zunehmend an Bedeutung.</p>',
      indikation: '<h3>Indikation</h3><ul><li>BMI ≥ 40 oder ≥ 35 mit Begleiterkrankungen</li><li>Alternative zum Roux-en-Y bei bestimmten anatomischen Gegebenheiten</li><li>Revisionseingriff nach gescheiterter Sleeve Gastrectomy</li></ul>',
      ablauf: '<h3>Ablauf</h3><ol><li>Laparoskopischer Zugang</li><li>Bildung eines langen Magenpouch</li><li>Eine Verbindung (Omega-Loop) zum Dünndarm</li></ol><p>Dauer: ca. 60–90 Minuten.</p>',
      vorteile: '<h3>Vorteile</h3><ul><li>Kürzere OP-Dauer als Roux-en-Y</li><li>Nur eine Darmnaht (geringeres Komplikationsrisiko)</li><li>Exzellente Diabetes-Remissionsraten</li><li>Reversibel</li></ul>',
      metaTitle: 'Omega-Loop Magenbypass Wien | Prof. Dr. Gerhard Prager',
      metaDesc: 'Omega-Loop Bypass (Mini-Gastric Bypass) in Wien von Prof. Gerhard Prager — IFSO-Präsident, 9.900+ Eingriffe. Termin vereinbaren.',
      sort: 3,
    },
    {
      name: 'Magenballon Orbera®',
      slug: 'magenballon-orbera',
      kategorie: 'Bariatrische Chirurgie',
      kurzbeschreibung: 'Der Magenballon ist ein nicht-chirurgisches Verfahren zur Gewichtsreduktion. Ein Silikonballon wird endoskopisch in den Magen eingesetzt und verbleibt dort 6–12 Monate.',
      beschreibung: '<h2>Was ist der Magenballon Orbera®?</h2><p>Der intragastrische Magenballon ist ein nicht-chirurgisches, reversibles Verfahren zur Unterstützung der Gewichtsabnahme. Ein weicher Silikonballon wird endoskopisch (ohne Schnitte) in den Magen eingeführt und mit Kochsalzlösung gefüllt. Er nimmt einen Teil des Magenvolumens ein und führt so zu einem früheren Sättigungsgefühl.</p><p>Das Verfahren eignet sich besonders für Patienten, die noch nicht die Kriterien für einen chirurgischen Eingriff erfüllen oder als Vorbereitung auf eine spätere Operation.</p>',
      indikation: '<h3>Indikation</h3><ul><li>BMI 27–35 kg/m² (Übergewicht bis Adipositas Grad I)</li><li>Vorbereitung auf bariatrische Chirurgie bei sehr hohem BMI</li><li>Patienten, die keinen chirurgischen Eingriff wünschen</li></ul>',
      ablauf: '<h3>Ablauf</h3><ol><li>Gastroskopische Einlage unter Sedierung (ca. 20 Minuten)</li><li>Füllung mit 400–700 ml Kochsalzlösung</li><li>Verweildauer: 6–12 Monate</li><li>Endoskopische Entfernung</li></ol>',
      vorteile: '<h3>Vorteile</h3><ul><li>Nicht-chirurgisch, keine Schnitte</li><li>Ambulant durchführbar</li><li>Vollständig reversibel</li><li>10–15% Gewichtsverlust möglich</li></ul>',
      metaTitle: 'Magenballon Orbera Wien | Prof. Dr. Gerhard Prager',
      metaDesc: 'Magenballon Orbera® in Wien — nicht-chirurgische Gewichtsreduktion bei Prof. Gerhard Prager, IFSO-Präsident. Beratung: +43 660 489 58 51.',
      sort: 4,
    },
    {
      name: 'Revisionseingriffe',
      slug: 'revisionseingriffe',
      kategorie: 'Bariatrische Chirurgie',
      kurzbeschreibung: 'Revisionsoperationen werden durchgeführt, wenn ein früherer bariatrischer Eingriff nicht den gewünschten Erfolg gebracht hat oder Komplikationen aufgetreten sind.',
      beschreibung: '<h2>Was sind Revisionseingriffe?</h2><p>Revisionsoperationen in der bariatrischen Chirurgie umfassen alle Eingriffe, die nach einer vorherigen Adipositas-Operation notwendig werden. Gründe können unzureichender Gewichtsverlust, erneute Gewichtszunahme (Weight Regain) oder Komplikationen des Ersteingriffs sein.</p><p>Diese Eingriffe gehören zu den technisch anspruchsvollsten Operationen der bariatrischen Chirurgie und erfordern umfangreiche Erfahrung. Univ.-Prof. Dr. Gerhard Prager ist international als Experte für Revisionschirurgie anerkannt und wird regelmäßig von Kollegen für komplexe Fälle konsultiert.</p>',
      indikation: '<h3>Indikation</h3><ul><li>Unzureichender Gewichtsverlust nach Erstoperation</li><li>Erneute Gewichtszunahme (Weight Regain)</li><li>Komplikationen wie Reflux, Strikturen, Fisteln</li><li>Bandmigration oder -erosion (nach Magenband)</li><li>Konversion von einem Verfahren zum anderen</li></ul>',
      ablauf: '<h3>Typische Revisionsoptionen</h3><ul><li>Sleeve zu Roux-en-Y Bypass Konversion</li><li>Sleeve zu Omega-Loop Konversion</li><li>Magenband-Entfernung mit Konversion zu Sleeve oder Bypass</li><li>Pouch-Revision nach Bypass</li></ul><p>Jeder Revisionseingriff wird individuell geplant und erfordert eine ausführliche Voruntersuchung.</p>',
      metaTitle: 'Revisionsoperation Wien | Prof. Dr. Gerhard Prager',
      metaDesc: 'Revisionseingriffe nach bariatrischer OP in Wien — Prof. Gerhard Prager, IFSO-Präsident. Spezialist für komplexe Revisionschirurgie.',
      sort: 5,
    },
    {
      name: 'Schilddrüsenchirurgie',
      slug: 'schilddruesenchirurgie',
      kategorie: 'Endokrine Chirurgie',
      kurzbeschreibung: 'Operative Behandlung von Schilddrüsenerkrankungen wie Struma, Knoten, Karzinomen und Morbus Basedow — minimal-invasiv mit Neuromonitoring.',
      beschreibung: '<h2>Schilddrüsenchirurgie am AKH Wien</h2><p>Die Schilddrüse ist ein schmetterlingsförmiges Organ am Hals, das lebenswichtige Hormone produziert. Erkrankungen der Schilddrüse sind häufig — insbesondere in Österreich, das historisch als Jodmangelgebiet gilt.</p><p>Univ.-Prof. Dr. Gerhard Prager hat seine endokrinchirurgische Ausbildung unter Prof. Bruno Niederle an der MedUni Wien absolviert — einem weltweit anerkannten Zentrum für Schilddrüsenchirurgie. Alle Eingriffe werden mit intraoperativem Neuromonitoring durchgeführt, um den Stimmbandnerv (Nervus recurrens) sicher zu schützen.</p>',
      indikation: '<h3>Indikationen</h3><ul><li><strong>Struma (Kropf):</strong> Vergrößerte Schilddrüse mit mechanischen Beschwerden</li><li><strong>Schilddrüsenknoten:</strong> Verdächtige oder wachsende Knoten</li><li><strong>Schilddrüsenkarzinom:</strong> Bösartige Tumoren der Schilddrüse</li><li><strong>Morbus Basedow:</strong> Autoimmune Schilddrüsenüberfunktion</li><li><strong>Autonomes Adenom:</strong> Überaktive Schilddrüsenknoten</li></ul>',
      ablauf: '<h3>Operationsablauf</h3><ol><li>Kleiner Hautschnitt am Hals (ca. 3–4 cm)</li><li>Darstellung der Schilddrüse unter Neuromonitoring</li><li>Teilentfernung (Hemithyreoidektomie) oder vollständige Entfernung (Thyreoidektomie)</li><li>Schonung der Nebenschilddrüsen und des Stimmbandnervs</li><li>Kosmetischer Hautverschluss</li></ol><p>Stationärer Aufenthalt: 1–3 Tage.</p>',
      vorteile: '<h3>Vorteile am AKH Wien</h3><ul><li>Intraoperatives Neuromonitoring (Nervenschutz)</li><li>Minimal-invasive Technik — kleine Narbe</li><li>Höchste Sicherheitsstandards</li><li>Interdisziplinäre Betreuung (Endokrinologie, Pathologie, Nuklearmedizin)</li></ul>',
      metaTitle: 'Schilddrüsenoperation Wien | Univ.-Prof. Dr. Gerhard Prager',
      metaDesc: 'Schilddrüsenoperation in Wien — Prof. Gerhard Prager, MedUni Wien. Struma, Knoten, Karzinom. Neuromonitoring. Termin: +43 660 489 58 51.',
      sort: 6,
    },
    {
      name: 'Nebenschilddrüsenchirurgie',
      slug: 'nebenschilddruesenchirurgie',
      kategorie: 'Endokrine Chirurgie',
      kurzbeschreibung: 'Chirurgische Behandlung des primären Hyperparathyreoidismus — gezielte Entfernung erkrankter Nebenschilddrüsen mit intraoperativer Hormonbestimmung.',
      beschreibung: '<h2>Nebenschilddrüsenchirurgie</h2><p>Die vier Nebenschilddrüsen sind kleine, linsengroße Organe hinter der Schilddrüse, die den Kalziumstoffwechsel regulieren. Beim primären Hyperparathyreoidismus (pHPT) produziert eine oder mehrere Nebenschilddrüsen unkontrolliert Parathormon, was zu erhöhten Kalziumwerten im Blut führt.</p><p>Unbehandelt kann dies zu Nierensteinen, Osteoporose, Muskelschwäche und psychischen Symptomen führen. Die Operation ist die einzige kausale Therapie.</p>',
      indikation: '<h3>Indikationen</h3><ul><li>Primärer Hyperparathyreoidismus (erhöhtes Kalzium + Parathormon)</li><li>Symptomatischer Hyperparathyreoidismus (Nierensteine, Osteoporose)</li><li>Nebenschilddrüsenadenom</li><li>Nebenschilddrüsenhyperplasie</li></ul>',
      ablauf: '<h3>Operationsablauf</h3><ol><li>Präoperative Lokalisationsdiagnostik (Ultraschall, Sestamibi-Szintigraphie)</li><li>Gezielter minimal-invasiver Zugang</li><li>Entfernung des erkrankten Nebenschilddrüsenkörperchens</li><li>Intraoperative Parathormon-Schnellbestimmung (Bestätigung des Erfolgs)</li></ol><p>Dauer: ca. 30–60 Minuten. Oft ambulant möglich.</p>',
      metaTitle: 'Nebenschilddrüse Wien | Univ.-Prof. Dr. Gerhard Prager',
      metaDesc: 'Nebenschilddrüsenoperation in Wien — Prof. Gerhard Prager. Hyperparathyreoidismus, minimal-invasiv. MedUni Wien / AKH Wien.',
      sort: 7,
    },
    {
      name: 'Nebennierenchirurgie',
      slug: 'nebennierenchirurgie',
      kategorie: 'Endokrine Chirurgie',
      kurzbeschreibung: 'Laparoskopische Entfernung von Nebennierentumoren wie Adenomen und Phäochromozytomen — schonend und mit kurzer Erholungszeit.',
      beschreibung: '<h2>Nebennierenchirurgie</h2><p>Die Nebennieren sitzen oberhalb der Nieren und produzieren lebenswichtige Hormone wie Cortisol, Aldosteron und Adrenalin. Tumoren der Nebenniere können zu einer Überproduktion dieser Hormone führen und schwere Erkrankungen verursachen.</p><p>Die laparoskopische Adrenalektomie (Entfernung der Nebenniere) ist heute der Goldstandard bei den meisten Nebennierentumoren. Der Eingriff wird über 3–4 kleine Schnitte durchgeführt und ermöglicht eine schnelle Erholung.</p>',
      indikation: '<h3>Indikationen</h3><ul><li><strong>Phäochromozytom:</strong> Adrenalin-produzierender Tumor</li><li><strong>Conn-Syndrom:</strong> Aldosteron-produzierendes Adenom</li><li><strong>Cushing-Syndrom:</strong> Cortisol-produzierender Tumor</li><li><strong>Inzidentalom:</strong> Zufällig entdeckte Nebennierenraumforderung >4 cm</li><li><strong>Nebennierenmetastasen:</strong> In ausgewählten Fällen</li></ul>',
      ablauf: '<h3>Operationsablauf</h3><ol><li>Laparoskopischer (Schlüsselloch-)Zugang</li><li>Freilegung der Nebenniere</li><li>Clippen der Nebennierenvene</li><li>Vollständige Entfernung der betroffenen Nebenniere</li><li>Bergung im Bergebeutel</li></ol><p>Dauer: ca. 60–120 Minuten. Stationär: 2–4 Tage.</p>',
      metaTitle: 'Nebenniere Wien | Univ.-Prof. Dr. Gerhard Prager',
      metaDesc: 'Nebennierenchirurgie in Wien — laparoskopisch bei Prof. Gerhard Prager. Phäochromozytom, Conn-Syndrom. MedUni Wien / AKH.',
      sort: 8,
    },
  ];

  console.log('=== FILLING EINGRIFFE ===\n');

  for (const e of eingriffe) {
    console.log(`Creating: ${e.name}...`);
    try {
      const fieldData = {
        name: e.name,
        slug: e.slug,
        [fm['Kategorie']]: e.kategorie,
        [fm['Kurzbeschreibung']]: e.kurzbeschreibung,
        [fm['Beschreibung']]: e.beschreibung,
        [fm['Meta Title']]: e.metaTitle,
        [fm['Meta Description']]: e.metaDesc,
        [fm['Sortierung']]: e.sort,
      };
      if (e.indikation) fieldData[fm['Indikation']] = e.indikation;
      if (e.ablauf) fieldData[fm['Ablauf']] = e.ablauf;
      if (e.vorteile) fieldData[fm['Vorteile']] = e.vorteile;
      if (e.nachsorge) fieldData[fm['Nachsorge']] = e.nachsorge;

      const item = await client.collections.items.createItem(collectionId, {
        fieldData,
        isArchived: false,
        isDraft: false,
      });
      console.log(`  ✅ Created — ID: ${item.id}`);
    } catch (err) {
      console.log(`  ❌ Error:`, err.message?.substring(0, 150));
    }
  }

  console.log('\n=== DONE ===');
}

fillEingriffe().catch(console.error);
