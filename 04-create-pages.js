require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const siteId = process.env.WEBFLOW_SITE_ID;

async function createPages() {
  const pages = [
    {
      slug: 'ueber-mich',
      title: 'Über Prof. Gerhard Prager | IFSO-Präsident & Bariatriechirurg Wien',
      description: 'Univ.-Prof. Dr. Gerhard Prager — IFSO-Präsident, Professor für Bariatrische Chirurgie an der MedUni Wien. Lebenslauf, akademische Laufbahn und internationale Tätigkeit.',
      openGraphTitle: 'Über Prof. Gerhard Prager | IFSO-Präsident',
      openGraphDescription: 'Professor für Bariatrische & Endokrine Chirurgie an der MedUni Wien / AKH Wien. Präsident der IFSO mit 10.000+ Mitgliedern weltweit.',
    },
    {
      slug: 'eingriffe',
      title: 'Eingriffe | Bariatrische & Endokrine Chirurgie | Prof. Dr. Gerhard Prager Wien',
      description: 'Magenbypass, Schlauchmagen, Magenballon, Schilddrüsen-OP und mehr — alle Eingriffe von IFSO-Präsident Prof. Gerhard Prager am AKH Wien und in der Privatordination.',
      openGraphTitle: 'Eingriffe — Bariatrische & Endokrine Chirurgie Wien',
      openGraphDescription: 'Alle chirurgischen Eingriffe von Prof. Gerhard Prager: Magenbypass, Schlauchmagen, Schilddrüse und mehr.',
    },
    {
      slug: 'bariatrische-chirurgie',
      title: 'Bariatrische Chirurgie Wien | Univ.-Prof. Dr. Gerhard Prager',
      description: 'Bariatrische Chirurgie in Wien — Magenbypass, Schlauchmagen, Magenballon und Revisionseingriffe von IFSO-Präsident Prof. Gerhard Prager. 9.900+ Operationen.',
      openGraphTitle: 'Bariatrische Chirurgie Wien | Prof. Gerhard Prager',
      openGraphDescription: 'Adipositaschirurgie auf höchstem Niveau — vom Präsidenten der IFSO an der MedUni Wien.',
    },
    {
      slug: 'endokrine-chirurgie',
      title: 'Endokrine Chirurgie Wien | Univ.-Prof. Dr. Gerhard Prager',
      description: 'Schilddrüsen-, Nebenschilddrüsen- und Nebennierenchirurgie in Wien — minimal-invasiv von Prof. Gerhard Prager, MedUni Wien / AKH Wien.',
      openGraphTitle: 'Endokrine Chirurgie Wien | Prof. Gerhard Prager',
      openGraphDescription: 'Schilddrüse, Nebenschilddrüse, Nebenniere — endokrine Chirurgie von Prof. Gerhard Prager am AKH Wien.',
    },
    {
      slug: 'wissenschaft',
      title: 'Wissenschaft & Forschung | Prof. Dr. Gerhard Prager, MedUni Wien',
      description: 'Über 265 wissenschaftliche Publikationen — Forschung zu Bariatrisch-Metabolischer Chirurgie, Endokriner Chirurgie und der Magen-Darm-Leber-Achse.',
      openGraphTitle: 'Wissenschaft & Forschung | Prof. Gerhard Prager',
      openGraphDescription: '265+ Publikationen in bariatrisch-metabolischer und endokriner Chirurgie. IFSO Scientific Committee Chairman.',
    },
    {
      slug: 'presse',
      title: 'Presse & Medien | Prof. Dr. Gerhard Prager Wien',
      description: 'Presseartikel, Interviews und Medienbeiträge über Univ.-Prof. Dr. Gerhard Prager — IFSO-Präsident und Professor für Bariatrische Chirurgie an der MedUni Wien.',
      openGraphTitle: 'Presse & Medien | Prof. Gerhard Prager',
      openGraphDescription: 'Medienberichte über Prof. Prager: MedUni Wien, Profil, AKH Wien und mehr.',
    },
    {
      slug: 'patient-journey',
      title: 'Ihr Weg zur Operation | Patient Journey | Prof. Dr. Gerhard Prager Wien',
      description: 'Von der Erstberatung bis zur Nachsorge — der vollständige Ablauf Ihrer Behandlung bei Prof. Gerhard Prager am AKH Wien und in der Privatordination.',
      openGraphTitle: 'Ihr Weg zur Operation | Prof. Gerhard Prager',
      openGraphDescription: 'Erstgespräch → Voruntersuchungen → Operation → Nachsorge. Ihr individueller Behandlungsweg.',
    },
    {
      slug: 'faq',
      title: 'Häufige Fragen | Bariatrische Chirurgie Wien | Prof. Dr. Gerhard Prager',
      description: 'Antworten auf häufige Fragen zu bariatrischer Chirurgie, Kosten, Ablauf und Nachsorge — von IFSO-Präsident Prof. Gerhard Prager, MedUni Wien.',
      openGraphTitle: 'FAQ — Häufige Fragen | Prof. Gerhard Prager',
      openGraphDescription: 'Alles über bariatrische Chirurgie: BMI-Kriterien, Kosten, Ablauf und Nachsorge.',
    },
    {
      slug: 'kontakt',
      title: 'Termin vereinbaren | Prof. Dr. Gerhard Prager Wien',
      description: 'Privatordination Wien 7, Kaiserstraße 43/4a. Ordinationszeiten: Mi 16–20 Uhr. Termin: +43 660 489 58 51. Prof. Gerhard Prager, MedUni Wien.',
      openGraphTitle: 'Kontakt & Termin | Prof. Gerhard Prager Wien',
      openGraphDescription: 'Kaiserstraße 43/4a, 1070 Wien. Mi 16–20 Uhr. Telefonische Terminvereinbarung: +43 660 489 58 51.',
    },
    {
      slug: 'impressum',
      title: 'Impressum | Univ.-Prof. Dr. Gerhard Prager',
      description: 'Impressum und rechtliche Informationen zur Website von Univ.-Prof. Dr. Gerhard Prager, Professor für Bariatrische Chirurgie, MedUni Wien.',
      openGraphTitle: 'Impressum | Prof. Gerhard Prager',
      openGraphDescription: 'Rechtliche Informationen und Impressum.',
    },
    {
      slug: 'datenschutz',
      title: 'Datenschutzerklärung | Univ.-Prof. Dr. Gerhard Prager',
      description: 'Datenschutzerklärung der Website von Univ.-Prof. Dr. Gerhard Prager — Informationen zum Umgang mit personenbezogenen Daten.',
      openGraphTitle: 'Datenschutz | Prof. Gerhard Prager',
      openGraphDescription: 'Datenschutzerklärung gemäß DSGVO.',
    },
  ];

  console.log('=== CREATING STATIC PAGES ===\n');

  for (const p of pages) {
    try {
      const result = await client.pages.createPage(siteId, {
        slug: p.slug,
        title: p.title,
        seo: {
          title: p.title,
          description: p.description,
        },
        openGraph: {
          title: p.openGraphTitle,
          description: p.openGraphDescription,
        },
        isDraft: false,
        isArchived: false,
      });
      console.log(`✅ /${p.slug} — ID: ${result.id}`);
    } catch (e) {
      console.log(`❌ /${p.slug}:`, e.message?.substring(0, 150));
    }
  }

  // Also update the Home page SEO
  console.log('\n=== UPDATING HOME PAGE SEO ===');
  try {
    const homePageId = '69bbf7916a4fe877dcbedb0b';
    const updated = await client.pages.updatePageSettings(homePageId, {
      title: 'Univ.-Prof. Dr. Gerhard Prager | Bariatrische & Endokrine Chirurgie Wien',
      seo: {
        title: 'Univ.-Prof. Dr. Gerhard Prager | Bariatrische & Endokrine Chirurgie Wien',
        description: 'Prof. Gerhard Prager — IFSO-Präsident & Professor für Bariatrische Chirurgie an der MedUni Wien. 9.900+ Eingriffe. Jetzt Termin in der Privatordination Wien.',
      },
      openGraph: {
        title: 'Univ.-Prof. Dr. Gerhard Prager — IFSO-Präsident',
        description: 'Professor für Bariatrische & Endokrine Chirurgie an der MedUni Wien / AKH Wien. Präsident der weltgrößten Fachgesellschaft für Adipositaschirurgie.',
      },
    });
    console.log('✅ Home page SEO updated');
  } catch (e) {
    console.log('❌ Home update:', e.message?.substring(0, 150));
  }

  // List all pages
  console.log('\n=== ALL PAGES ===');
  const allPages = await client.pages.list(siteId);
  for (const pg of allPages.pages || []) {
    console.log(`  ${pg.publishedPath || pg.slug || '/'} — "${pg.title}" (${pg.id})`);
  }
  console.log(`Total: ${allPages.pagination?.total} pages`);
}

createPages().catch(console.error);
