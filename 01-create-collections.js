require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const siteId = process.env.WEBFLOW_SITE_ID;

async function createCollections() {
  console.log('=== CREATING CMS COLLECTIONS ===\n');

  // 1. Eingriffe (Procedures)
  console.log('1. Creating "Eingriffe" collection...');
  try {
    const eingriffe = await client.collections.create(siteId, {
      displayName: 'Eingriffe',
      singularName: 'Eingriff',
      slug: 'eingriffe',
    });
    console.log('   ✅ Created! ID:', eingriffe.id);

    // Add fields to Eingriffe
    const eingriffeFields = [
      { displayName: 'Kategorie', type: 'PlainText', isRequired: true, helpText: 'Bariatrische Chirurgie oder Endokrine Chirurgie' },
      { displayName: 'Kurzbeschreibung', type: 'PlainText', isRequired: true, helpText: 'Kurze Beschreibung für Cards (1-2 Sätze)' },
      { displayName: 'Beschreibung', type: 'RichText', isRequired: false, helpText: 'Ausführliche Beschreibung des Eingriffs' },
      { displayName: 'Indikation', type: 'RichText', isRequired: false, helpText: 'Wer kommt in Frage?' },
      { displayName: 'Ablauf', type: 'RichText', isRequired: false, helpText: 'Operationsablauf Schritt für Schritt' },
      { displayName: 'Vorteile', type: 'RichText', isRequired: false, helpText: 'Vorteile & mögliche Risiken' },
      { displayName: 'Nachsorge', type: 'RichText', isRequired: false, helpText: 'Nachsorge & Langzeitergebnisse' },
      { displayName: 'Evidenz', type: 'RichText', isRequired: false, helpText: 'Wissenschaftliche Evidenz' },
      { displayName: 'Meta Title', type: 'PlainText', isRequired: false },
      { displayName: 'Meta Description', type: 'PlainText', isRequired: false },
      { displayName: 'Sortierung', type: 'Number', isRequired: false, helpText: 'Reihenfolge der Anzeige' },
    ];

    for (const field of eingriffeFields) {
      try {
        await client.collections.fields.create(eingriffe.id, field);
        console.log('   + Field:', field.displayName);
      } catch (e) {
        console.log('   ⚠ Field error:', field.displayName, e.message?.substring(0, 80));
      }
    }
  } catch (e) {
    console.log('   ❌ Error:', e.message?.substring(0, 120));
  }

  // 2. Presse & Medien
  console.log('\n2. Creating "Presse" collection...');
  try {
    const presse = await client.collections.create(siteId, {
      displayName: 'Presse',
      singularName: 'Presseartikel',
      slug: 'presse',
    });
    console.log('   ✅ Created! ID:', presse.id);

    const presseFields = [
      { displayName: 'Quelle', type: 'PlainText', isRequired: true, helpText: 'z.B. MedUni Wien, Profil' },
      { displayName: 'Datum', type: 'PlainText', isRequired: false, helpText: 'z.B. September 2023' },
      { displayName: 'Zusammenfassung', type: 'PlainText', isRequired: false, helpText: 'Kurzbeschreibung für Cards' },
      { displayName: 'Externer Link', type: 'Link', isRequired: false, helpText: 'Link zum Originalartikel' },
      { displayName: 'Kategorie', type: 'PlainText', isRequired: false, helpText: 'z.B. Auszeichnungen, Forschung' },
    ];

    for (const field of presseFields) {
      try {
        await client.collections.fields.create(presse.id, field);
        console.log('   + Field:', field.displayName);
      } catch (e) {
        console.log('   ⚠ Field error:', field.displayName, e.message?.substring(0, 80));
      }
    }
  } catch (e) {
    console.log('   ❌ Error:', e.message?.substring(0, 120));
  }

  // 3. FAQ
  console.log('\n3. Creating "FAQ" collection...');
  try {
    const faq = await client.collections.create(siteId, {
      displayName: 'FAQ',
      singularName: 'Frage',
      slug: 'faq',
    });
    console.log('   ✅ Created! ID:', faq.id);

    const faqFields = [
      { displayName: 'Antwort', type: 'RichText', isRequired: true },
      { displayName: 'Kategorie', type: 'PlainText', isRequired: false, helpText: 'z.B. Bariatrische Chirurgie, Allgemein' },
      { displayName: 'Sortierung', type: 'Number', isRequired: false },
    ];

    for (const field of faqFields) {
      try {
        await client.collections.fields.create(faq.id, field);
        console.log('   + Field:', field.displayName);
      } catch (e) {
        console.log('   ⚠ Field error:', field.displayName, e.message?.substring(0, 80));
      }
    }
  } catch (e) {
    console.log('   ❌ Error:', e.message?.substring(0, 120));
  }

  // 4. Publikationen
  console.log('\n4. Creating "Publikationen" collection...');
  try {
    const pub = await client.collections.create(siteId, {
      displayName: 'Publikationen',
      singularName: 'Publikation',
      slug: 'publikationen',
    });
    console.log('   ✅ Created! ID:', pub.id);

    const pubFields = [
      { displayName: 'Autoren', type: 'PlainText', isRequired: false },
      { displayName: 'Journal', type: 'PlainText', isRequired: false },
      { displayName: 'Jahr', type: 'PlainText', isRequired: false },
      { displayName: 'Typ', type: 'PlainText', isRequired: false, helpText: 'Original Article, Book Chapter, etc.' },
      { displayName: 'DOI Link', type: 'Link', isRequired: false },
    ];

    for (const field of pubFields) {
      try {
        await client.collections.fields.create(pub.id, field);
        console.log('   + Field:', field.displayName);
      } catch (e) {
        console.log('   ⚠ Field error:', field.displayName, e.message?.substring(0, 80));
      }
    }
  } catch (e) {
    console.log('   ❌ Error:', e.message?.substring(0, 120));
  }

  // 5. Timeline / Karriere
  console.log('\n5. Creating "Karriere" collection...');
  try {
    const karriere = await client.collections.create(siteId, {
      displayName: 'Karriere',
      singularName: 'Meilenstein',
      slug: 'karriere',
    });
    console.log('   ✅ Created! ID:', karriere.id);

    const karriereFields = [
      { displayName: 'Jahr', type: 'PlainText', isRequired: true },
      { displayName: 'Beschreibung', type: 'PlainText', isRequired: true },
      { displayName: 'Highlight', type: 'Switch', isRequired: false, helpText: 'Besonders hervorheben?' },
      { displayName: 'Sortierung', type: 'Number', isRequired: false },
    ];

    for (const field of karriereFields) {
      try {
        await client.collections.fields.create(karriere.id, field);
        console.log('   + Field:', field.displayName);
      } catch (e) {
        console.log('   ⚠ Field error:', field.displayName, e.message?.substring(0, 80));
      }
    }
  } catch (e) {
    console.log('   ❌ Error:', e.message?.substring(0, 120));
  }

  // Verify
  console.log('\n=== VERIFYING COLLECTIONS ===');
  const all = await client.collections.list(siteId);
  console.log('Total collections:', all.collections?.length);
  for (const c of all.collections || []) {
    console.log(`  - ${c.displayName} (${c.slug}) — ID: ${c.id}`);
  }
}

createCollections().catch(console.error);
