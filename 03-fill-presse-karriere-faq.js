require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });

const COLLECTIONS = {
  presse: '69bbff34026b454fc0d1ff00',
  faq: '69bbff353890b07e38a7caea',
  karriere: '69bbff39ed8b069464964ede',
};

async function getFieldMap(colId) {
  const col = await client.collections.get(colId);
  const map = {};
  for (const f of col.fields || []) map[f.displayName] = f.slug;
  return map;
}

async function fillPresse() {
  const fm = await getFieldMap(COLLECTIONS.presse);
  console.log('Presse fields:', JSON.stringify(fm));

  const articles = [
    {
      name: 'Gerhard Prager übernimmt Präsidentschaft der IFSO',
      slug: 'ifso-praesidentschaft-2023',
      quelle: 'MedUni Wien',
      datum: 'September 2023',
      zusammenfassung: 'Univ.-Prof. Dr. Gerhard Prager wurde beim Weltkongress in Neapel vor 3.300 Teilnehmern aus 150 Ländern zum Präsidenten der IFSO gewählt — der weltgrößten Fachgesellschaft für metabolische und bariatrische Chirurgie.',
      kategorie: 'Auszeichnungen',
    },
    {
      name: 'Professur für Bariatrische Chirurgie an der MedUni Wien',
      slug: 'professur-bariatrische-chirurgie-2021',
      quelle: 'MedUni Wien',
      datum: 'September 2021',
      zusammenfassung: 'Gerhard Prager erhält die §98-Professur für Bariatrische Chirurgie an der Medizinischen Universität Wien — eine Anerkennung seiner jahrzehntelangen klinischen und wissenschaftlichen Arbeit.',
      kategorie: 'Karriere',
    },
    {
      name: 'President Elect der IFSO',
      slug: 'ifso-president-elect-2021',
      quelle: 'MedUni Wien',
      datum: 'November 2021',
      zusammenfassung: 'Prof. Prager wird zum President Elect der IFSO gewählt und tritt damit die Nachfolge von Prof. Scott Shikora von der Harvard Medical School an.',
      kategorie: 'Auszeichnungen',
    },
    {
      name: 'Übergewicht im Jugendalter — Wann ist eine OP sinnvoll?',
      slug: 'uebergewicht-jugendalter-profil',
      quelle: 'Profil',
      datum: '2023',
      zusammenfassung: 'Prof. Prager erläutert im Profil-Interview die medizinischen Kriterien für bariatrische Eingriffe bei Jugendlichen und die Bedeutung eines interdisziplinären Behandlungsteams.',
      kategorie: 'Interview',
    },
    {
      name: 'Wann gilt ein Kind als übergewichtig?',
      slug: 'kind-uebergewichtig-profil',
      quelle: 'Profil',
      datum: '2023',
      zusammenfassung: 'In einem weiteren Profil-Beitrag beleuchtet Prof. Prager die Diagnostik und Behandlungsoptionen bei Übergewicht im Kindes- und Jugendalter.',
      kategorie: 'Interview',
    },
    {
      name: 'Adipositas bei jungen Männern — aktuelle Studienlage',
      slug: 'adipositas-junge-maenner-meduni',
      quelle: 'MedUni Wien',
      datum: '2022',
      zusammenfassung: 'Eine MedUni Wien Studie unter Beteiligung von Prof. Prager untersucht die alarmierend steigende Adipositas-Prävalenz bei jungen Männern in Österreich.',
      kategorie: 'Forschung',
    },
  ];

  console.log('\n=== FILLING PRESSE ===');
  for (const a of articles) {
    try {
      await client.collections.items.createItem(COLLECTIONS.presse, {
        fieldData: {
          name: a.name,
          slug: a.slug,
          [fm['Quelle']]: a.quelle,
          [fm['Datum']]: a.datum,
          [fm['Zusammenfassung']]: a.zusammenfassung,
          [fm['Kategorie']]: a.kategorie,
        },
        isArchived: false,
        isDraft: false,
      });
      console.log(`  ✅ ${a.name}`);
    } catch (e) {
      console.log(`  ❌ ${a.name}:`, e.message?.substring(0, 100));
    }
  }
}

async function fillKarriere() {
  const fm = await getFieldMap(COLLECTIONS.karriere);
  console.log('\nKarriere fields:', JSON.stringify(fm));

  const milestones = [
    { jahr: '1992', name: 'Promotion zum Dr. med. univ.', beschreibung: 'Promotion zum Dr. med. univ. an der Medizinischen Universität Wien', sort: 1 },
    { jahr: '1993', name: 'Heeresanästhesist', beschreibung: 'Präsenzdienst als Heeresanästhesist', sort: 2 },
    { jahr: '1993–1997', name: 'Assistenzarzt KH Mistelbach', beschreibung: 'Assistenzarzt an der Chirurgischen Abteilung, Krankenhaus Mistelbach', sort: 3 },
    { jahr: '1997', name: 'Endokrine Chirurgie bei Prof. Niederle', beschreibung: 'Gastsemester chirurgische Endokrinologie bei Prof. Bruno Niederle, MedUni Wien', sort: 4 },
    { jahr: '1998', name: 'Universitätsklinik für Chirurgie Wien', beschreibung: 'Assistenzarzt an der Universitätsklinik für Chirurgie, MedUni Wien', sort: 5 },
    { jahr: '1999', name: 'Facharztdiplom Chirurgie', beschreibung: 'Facharztdiplom für Chirurgie, Österreichische Ärztekammer', sort: 6 },
    { jahr: '2003', name: 'Oberarzt & Habilitation', beschreibung: 'Ernennung zum Oberarzt und Habilitation (Lehrbefugnis für Chirurgie) an der MedUni Wien', sort: 7, highlight: true },
    { jahr: '2004', name: 'Leiter Adipositasambulanz AKH Wien', beschreibung: 'Übernahme der Leitung der Arbeitsgruppe Adipositaschirurgie am AKH Wien', sort: 8, highlight: true },
    { jahr: '2005', name: 'Leiter Minimal Invasive Chirurgie', beschreibung: 'Leitung der Arbeitsgruppe Minimal Invasive Chirurgie am AKH Wien', sort: 9 },
    { jahr: '2006', name: 'Vorstand Adipositaschirurgie Österreich', beschreibung: 'Vorstandsmitglied der Österreichischen Gesellschaft für Adipositaschirurgie', sort: 10 },
    { jahr: '2008', name: 'Vorstand Adipositasgesellschaft', beschreibung: 'Vorstandsmitglied der Österreichischen Adipositasgesellschaft', sort: 11 },
    { jahr: '2011–2015', name: 'Vorsitz IFSO Scientific Committee', beschreibung: 'Vorsitzender des Wissenschaftlichen Beirats der IFSO weltweit', sort: 12, highlight: true },
    { jahr: '2012', name: 'AG Minimal Invasive Chirurgie ÖGCH', beschreibung: 'Vorstandsmitglied der AG Minimal Invasive Chirurgie der Österreichischen Gesellschaft für Chirurgie', sort: 13 },
    { jahr: '2018–2020', name: 'Präsident IFSO-European Chapter', beschreibung: 'Präsident des European Chapter der IFSO — der führenden europäischen Fachgesellschaft für bariatrische Chirurgie', sort: 14, highlight: true },
    { jahr: '2021', name: 'Professur Bariatrische Chirurgie', beschreibung: 'Berufung auf die §98-Professur für Bariatrische Chirurgie an der Medizinischen Universität Wien', sort: 15, highlight: true },
    { jahr: '2021', name: 'President Elect IFSO weltweit', beschreibung: 'Wahl zum President Elect der IFSO — Nachfolge von Prof. Scott Shikora, Harvard Medical School', sort: 16, highlight: true },
    { jahr: '2023', name: 'Präsident IFSO weltweit', beschreibung: 'Wahl zum Präsidenten der IFSO beim Weltkongress in Neapel vor 3.300 Teilnehmern aus 150 Ländern. Vertritt über 10.000 Mitglieder aus 72 Ländern.', sort: 17, highlight: true },
  ];

  console.log('\n=== FILLING KARRIERE ===');
  for (const m of milestones) {
    try {
      await client.collections.items.createItem(COLLECTIONS.karriere, {
        fieldData: {
          name: m.name,
          slug: m.name.toLowerCase().replace(/[^a-z0-9äöü]+/g, '-').replace(/[äöü]/g, c => ({ä:'ae',ö:'oe',ü:'ue'})[c] || c).substring(0, 50),
          [fm['Jahr']]: m.jahr,
          [fm['Beschreibung']]: m.beschreibung,
          [fm['Highlight']]: m.highlight || false,
          [fm['Sortierung']]: m.sort,
        },
        isArchived: false,
        isDraft: false,
      });
      console.log(`  ✅ ${m.jahr} — ${m.name}`);
    } catch (e) {
      console.log(`  ❌ ${m.jahr} — ${m.name}:`, e.message?.substring(0, 100));
    }
  }
}

async function fillFAQ() {
  const fm = await getFieldMap(COLLECTIONS.faq);
  console.log('\nFAQ fields:', JSON.stringify(fm));

  const faqs = [
    {
      name: 'Ab welchem BMI kommt eine bariatrische Operation in Frage?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Grundsätzlich wird eine bariatrische Operation ab einem BMI von 40 kg/m² empfohlen. Bei einem BMI ab 35 kg/m² ist ein Eingriff indiziert, wenn gleichzeitig Begleiterkrankungen wie Typ-2-Diabetes, Bluthochdruck, Schlafapnoe oder schwere Gelenkprobleme vorliegen. Voraussetzung ist, dass konservative Therapieversuche über mindestens 6–12 Monate erfolglos geblieben sind.</p><p>Die endgültige Entscheidung wird immer individuell im Rahmen eines ausführlichen Erstgesprächs getroffen.</p>',
      sort: 1,
    },
    {
      name: 'Welche Krankenkasse übernimmt die Kosten?',
      kategorie: 'Allgemein',
      antwort: '<p>Bariatrische Eingriffe werden in Österreich von den gesetzlichen Krankenkassen übernommen, wenn die medizinische Indikation gegeben ist. Am AKH Wien als öffentliches Universitätsklinikum entstehen bei Kassenleistung keine zusätzlichen Kosten für den Patienten.</p><p>Für Privatpatienten in der Ordination oder den Privatkliniken erstellt Prof. Prager gerne einen individuellen Kostenvoranschlag. Viele Zusatzversicherungen übernehmen bariatrische Eingriffe teilweise oder vollständig.</p>',
      sort: 2,
    },
    {
      name: 'Wie lange dauert der Krankenhausaufenthalt?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Der stationäre Aufenthalt variiert je nach Eingriff:</p><ul><li>Magenballon: Ambulant (gleicher Tag)</li><li>Schlauchmagen: 3–4 Tage</li><li>Magenbypass: 3–5 Tage</li><li>Revisionseingriffe: 4–7 Tage</li><li>Schilddrüsen-OP: 1–3 Tage</li></ul><p>Die meisten Patienten können nach 2–3 Wochen wieder leichte Tätigkeiten aufnehmen.</p>',
      sort: 3,
    },
    {
      name: 'Ist der Eingriff reversibel?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Der Magenballon ist vollständig reversibel — er wird nach 6–12 Monaten endoskopisch entfernt. Der Omega-Loop Magenbypass ist prinzipiell reversibel, da die ursprüngliche Anatomie erhalten bleibt.</p><p>Der Schlauchmagen und der Roux-en-Y Magenbypass sind nicht reversibel, da Teile des Magens entfernt werden. Dies ist jedoch medizinisch gewollt, da die dauerhafte anatomische Veränderung den langfristigen Therapieerfolg sichert.</p>',
      sort: 4,
    },
    {
      name: 'Welche Risiken hat eine bariatrische Operation?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Wie jede Operation birgt auch ein bariatrischer Eingriff Risiken. Dank minimal-invasiver Technik und der Erfahrung aus über 9.900 Operationen sind die Komplikationsraten jedoch sehr niedrig:</p><ul><li>Allgemeine OP-Risiken: Nachblutung, Infektion, Thrombose (<1%)</li><li>Spezifische Risiken: Anastomoseninsuffizienz (<1%), innere Hernie (<3%)</li><li>Langfristig: Vitamin- und Mineralstoffmangel (durch konsequente Supplementierung vermeidbar)</li></ul><p>Im Erstgespräch werden alle Risiken ausführlich und individuell besprochen.</p>',
      sort: 5,
    },
    {
      name: 'Wie viel Gewicht werde ich verlieren?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Die zu erwartende Gewichtsreduktion hängt vom gewählten Verfahren ab:</p><ul><li>Magenballon: 10–15% des Körpergewichts</li><li>Schlauchmagen: 50–70% des Übergewichts</li><li>Magenbypass: 60–80% des Übergewichts</li></ul><p>Der maximale Gewichtsverlust wird typischerweise 12–18 Monate nach der Operation erreicht. Langzeitstudien zeigen stabile Ergebnisse über 10+ Jahre, vorausgesetzt die Ernährungs- und Bewegungsempfehlungen werden eingehalten.</p>',
      sort: 6,
    },
    {
      name: 'Wie läuft das Erstgespräch ab?',
      kategorie: 'Allgemein',
      antwort: '<p>Das Erstgespräch in der Privatordination oder der Adipositasambulanz am AKH Wien dauert ca. 30–45 Minuten und umfasst:</p><ul><li>Ausführliche Anamnese und Besprechung der Krankengeschichte</li><li>Körperliche Untersuchung und BMI-Berechnung</li><li>Besprechung der möglichen Behandlungsoptionen</li><li>Aufklärung über Ablauf, Risiken und Nachsorge</li><li>Festlegung der nächsten Schritte (Voruntersuchungen)</li></ul><p>Bitte bringen Sie aktuelle Befunde, eine Medikamentenliste und ggf. Überweisungen mit.</p>',
      sort: 7,
    },
    {
      name: 'Wo operiert Prof. Prager?',
      kategorie: 'Allgemein',
      antwort: '<p>Univ.-Prof. Dr. Gerhard Prager operiert an drei Standorten in Wien:</p><ul><li><strong>AKH Wien (Universitätsklinikum):</strong> Alle Kassenleistungen und komplexe Eingriffe</li><li><strong>Privatklinik Goldenes Kreuz:</strong> Privatpatienten und Zusatzversicherte</li><li><strong>Privatklinik Confraternität:</strong> Privatpatienten und Zusatzversicherte</li></ul><p>Die Erstberatung findet in der Privatordination in der Kaiserstraße 43/4a, 1070 Wien statt (Mittwoch 16–20 Uhr, telefonische Terminvereinbarung erforderlich).</p>',
      sort: 8,
    },
    {
      name: 'Muss ich vor der Operation eine Diät einhalten?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Ja, vor einem bariatrischen Eingriff ist eine 2-wöchige Eiweißdiät (Flüssigdiät) erforderlich. Diese dient dazu, die Leber zu verkleinern, was den laparoskopischen Zugang erleichtert und die Sicherheit des Eingriffs erhöht.</p><p>Das Ernährungsteam der Adipositasambulanz am AKH Wien begleitet Sie bei der Vorbereitung und stellt einen individuellen Ernährungsplan zusammen.</p>',
      sort: 9,
    },
    {
      name: 'Kann Adipositaschirurgie Diabetes heilen?',
      kategorie: 'Bariatrische Chirurgie',
      antwort: '<p>Zahlreiche internationale Studien — darunter auch Arbeiten von Prof. Prager — belegen, dass bis zu 80% der Patienten mit Typ-2-Diabetes nach einem bariatrischen Eingriff keine Diabetesmedikamente mehr benötigen. Man spricht von einer Diabetes-Remission.</p><p>Dieser Effekt tritt häufig bereits innerhalb weniger Wochen nach der Operation ein, noch bevor ein signifikanter Gewichtsverlust stattgefunden hat. Die Ursache liegt in der Veränderung hormoneller Signalwege im Magen-Darm-Trakt.</p><p>Aus diesem Grund wird die bariatrische Chirurgie heute zunehmend als metabolische Chirurgie bezeichnet.</p>',
      sort: 10,
    },
  ];

  console.log('\n=== FILLING FAQ ===');
  for (const f of faqs) {
    try {
      await client.collections.items.createItem(COLLECTIONS.faq, {
        fieldData: {
          name: f.name,
          slug: f.name.toLowerCase().replace(/[^a-z0-9äöü ]+/g, '').replace(/[äöü]/g, c => ({ä:'ae',ö:'oe',ü:'ue'})[c]).replace(/ +/g, '-').substring(0, 90),
          [fm['Antwort']]: f.antwort,
          [fm['Kategorie']]: f.kategorie,
          [fm['Sortierung']]: f.sort,
        },
        isArchived: false,
        isDraft: false,
      });
      console.log(`  ✅ ${f.name.substring(0, 60)}`);
    } catch (e) {
      console.log(`  ❌ ${f.name.substring(0, 40)}:`, e.message?.substring(0, 100));
    }
  }
}

async function main() {
  await fillPresse();
  await fillKarriere();
  await fillFAQ();
  console.log('\n=== ALL CMS ITEMS DONE ===');
}

main().catch(console.error);
