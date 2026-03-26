require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const siteId = process.env.WEBFLOW_SITE_ID;

const PAGE_IDS = {
  home: '69bbf7916a4fe877dcbedb0b',
  karriere: '69bbff39ed8b069464964ee4',
  publikationen: '69bbff370ee7828c9d631aeb',
  faq: '69bbff363890b07e38a7cb73',
  presse: '69bbff34026b454fc0d1ff37',
  eingriffe: '69bbff2e3b57a9dcd0fb88af',
};

async function updateTemplateSEO() {
  console.log('=== UPDATING TEMPLATE PAGE SEO ===\n');

  const updates = [
    {
      id: PAGE_IDS.eingriffe,
      title: 'Eingriffe | Bariatrische & Endokrine Chirurgie | Prof. Dr. Gerhard Prager Wien',
      seoTitle: 'Eingriffe Wien | Univ.-Prof. Dr. Gerhard Prager',
      seoDesc: 'Magenbypass, Schlauchmagen, Schilddrüsen-OP — alle Eingriffe von IFSO-Präsident Prof. Gerhard Prager am AKH Wien. Termin: +43 660 489 58 51.',
    },
    {
      id: PAGE_IDS.presse,
      title: 'Presse & Medien | Prof. Dr. Gerhard Prager',
      seoTitle: 'Presse & Medien | Prof. Dr. Gerhard Prager Wien',
      seoDesc: 'Presseartikel und Medienbeiträge über IFSO-Präsident Prof. Gerhard Prager — MedUni Wien, Profil, AKH Wien.',
    },
    {
      id: PAGE_IDS.faq,
      title: 'Häufige Fragen | Prof. Dr. Gerhard Prager',
      seoTitle: 'FAQ — Häufige Fragen | Bariatrische Chirurgie Wien | Prof. Dr. Gerhard Prager',
      seoDesc: 'Antworten auf häufige Fragen zu bariatrischer Chirurgie, Kosten, Ablauf und Nachsorge — von Prof. Gerhard Prager, MedUni Wien.',
    },
    {
      id: PAGE_IDS.karriere,
      title: 'Akademische Laufbahn | Prof. Dr. Gerhard Prager',
      seoTitle: 'Lebenslauf & Karriere | Prof. Dr. Gerhard Prager Wien',
      seoDesc: 'Akademische Laufbahn von Prof. Gerhard Prager — von der Promotion 1992 bis zur IFSO-Präsidentschaft 2023. MedUni Wien.',
    },
    {
      id: PAGE_IDS.publikationen,
      title: 'Wissenschaftliche Publikationen | Prof. Dr. Gerhard Prager',
      seoTitle: 'Publikationen | Prof. Dr. Gerhard Prager, MedUni Wien',
      seoDesc: '265+ wissenschaftliche Publikationen in bariatrisch-metabolischer und endokriner Chirurgie von Prof. Gerhard Prager.',
    },
  ];

  for (const u of updates) {
    try {
      await client.pages.updatePageSettings(u.id, {
        title: u.title,
        seo: {
          title: u.seoTitle,
          description: u.seoDesc,
        },
        openGraph: {
          title: u.seoTitle,
          description: u.seoDesc,
        },
      });
      console.log(`✅ ${u.title}`);
    } catch (e) {
      console.log(`❌ ${u.title}:`, e.message?.substring(0, 120));
    }
  }
}

async function addSchemaOrg() {
  console.log('\n=== ADDING SCHEMA.ORG CUSTOM CODE ===\n');

  const physicianSchema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Univ.-Prof. Dr. Gerhard Prager",
  "description": "Professor für Bariatrische Chirurgie, Präsident der IFSO, Leiter der Adipositasambulanz AKH Wien",
  "url": "https://www.gerhardprager.eu",
  "telephone": "+436604895851",
  "email": "gerhard.prager@meduniwien.ac.at",
  "image": "",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaiserstraße 43/4a",
    "addressLocality": "Wien",
    "postalCode": "1070",
    "addressCountry": "AT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.2033,
    "longitude": 16.3419
  },
  "openingHours": "We 16:00-20:00",
  "medicalSpecialty": ["BariatricSurgery", "EndocrineSurgery"],
  "availableService": [
    {"@type": "MedicalProcedure", "name": "Magenbypass (Roux-en-Y)"},
    {"@type": "MedicalProcedure", "name": "Schlauchmagen (Sleeve Gastrectomy)"},
    {"@type": "MedicalProcedure", "name": "Omega-Loop Magenbypass"},
    {"@type": "MedicalProcedure", "name": "Magenballon Orbera"},
    {"@type": "MedicalProcedure", "name": "Revisionseingriffe"},
    {"@type": "MedicalProcedure", "name": "Schilddrüsenchirurgie"},
    {"@type": "MedicalProcedure", "name": "Nebenschilddrüsenchirurgie"},
    {"@type": "MedicalProcedure", "name": "Nebennierenchirurgie"}
  ],
  "affiliation": [
    {"@type": "Hospital", "name": "AKH Wien — Medizinische Universität Wien"},
    {"@type": "Hospital", "name": "Privatklinik Goldenes Kreuz"},
    {"@type": "Hospital", "name": "Privatklinik Confraternität"}
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Medizinische Universität Wien"
  },
  "award": [
    "Präsident IFSO 2023/2024",
    "President Elect IFSO 2021",
    "Präsident IFSO-European Chapter 2018-2020",
    "§98-Professur Bariatrische Chirurgie MedUni Wien 2021"
  ],
  "memberOf": [
    {"@type": "Organization", "name": "IFSO — International Federation for the Surgery of Obesity and Metabolic Disorders"},
    {"@type": "Organization", "name": "ASMBS — American Society for Metabolic and Bariatric Surgery"},
    {"@type": "Organization", "name": "ÖGCH — Österreichische Gesellschaft für Chirurgie"},
    {"@type": "Organization", "name": "Österreichische Gesellschaft für Adipositaschirurgie"},
    {"@type": "Organization", "name": "Österreichische Adipositasgesellschaft"},
    {"@type": "Organization", "name": "VIPmed"}
  ],
  "sameAs": [
    "https://www.researchgate.net/profile/Gerhard-Prager",
    "https://at.linkedin.com/in/gerhard-prager-184a0869"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Univ.-Prof. Dr. Gerhard Prager — Bariatrische & Endokrine Chirurgie Wien",
  "description": "Offizielle Website von Univ.-Prof. Dr. Gerhard Prager, IFSO-Präsident und Professor für Bariatrische Chirurgie an der MedUni Wien.",
  "url": "https://www.gerhardprager.eu",
  "inLanguage": "de-AT",
  "about": {
    "@type": "MedicalSpecialty",
    "name": "Bariatric Surgery"
  },
  "author": {
    "@type": "Physician",
    "name": "Univ.-Prof. Dr. Gerhard Prager"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.gerhardprager.eu/"},
    {"@type": "ListItem", "position": 2, "name": "Eingriffe", "item": "https://www.gerhardprager.eu/eingriffe"},
    {"@type": "ListItem", "position": 3, "name": "Über Prof. Prager", "item": "https://www.gerhardprager.eu/ueber-mich"},
    {"@type": "ListItem", "position": 4, "name": "Wissenschaft", "item": "https://www.gerhardprager.eu/wissenschaft"},
    {"@type": "ListItem", "position": 5, "name": "Kontakt", "item": "https://www.gerhardprager.eu/kontakt"}
  ]
}
</script>`;

  // Add to site-wide custom code (head)
  try {
    await client.sites.update(siteId, {
      customCode: {
        head: physicianSchema,
      },
    });
    console.log('✅ Schema.org added to site-wide <head>');
  } catch (e) {
    console.log('❌ Site custom code error:', e.message?.substring(0, 150));

    // Try alternative: add to individual pages
    console.log('\nTrying page-level custom code...');
    try {
      // Try registering custom code on home page
      const scripts = await client.scripts.listCustomCodeBlocks(siteId);
      console.log('Scripts:', JSON.stringify(scripts, null, 2));
    } catch (e2) {
      console.log('Scripts API:', e2.message?.substring(0, 100));
    }
  }
}

async function publishSite() {
  console.log('\n=== PUBLISHING SITE ===');
  try {
    await client.sites.publish(siteId, {
      publishToWebflowSubdomain: true,
    });
    console.log('✅ Site published!');
  } catch (e) {
    console.log('❌ Publish error:', e.message?.substring(0, 150));
  }
}

async function main() {
  await updateTemplateSEO();
  await addSchemaOrg();
  await publishSite();

  // Final summary
  console.log('\n=== FINAL SITE STATE ===');
  const site = await client.sites.get(siteId);
  console.log('Site name:', site.displayName);
  console.log('Short name:', site.shortName);
  console.log('URL:', `https://${site.shortName}.webflow.io`);

  const pages = await client.pages.list(siteId);
  console.log('\nPages:');
  for (const p of pages.pages || []) {
    console.log(`  ${p.publishedPath || '/'} — ${p.title}`);
    if (p.seo?.title) console.log(`    SEO: ${p.seo.title}`);
  }

  const collections = await client.collections.list(siteId);
  console.log('\nCollections:');
  for (const c of collections.collections || []) {
    try {
      const items = await client.collections.items.listItems(c.id);
      console.log(`  ${c.displayName}: ${items.items?.length || 0} items`);
    } catch (e) {
      console.log(`  ${c.displayName}: error counting`);
    }
  }
}

main().catch(console.error);
