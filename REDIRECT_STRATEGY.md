# Redirect Strategy Document
## Prof. Dr. Gerhard Prager - Domain & Website Architecture

**Document Date:** April 4, 2024
**Organization:** Prof. Dr. Gerhard Prager, MD (bariatric & endocrine surgeon, IFSO World President 2023/2024)
**Prepared For:** Website Architecture & SEO Strategy

---

## Executive Summary

This document outlines the redirect strategy and domain architecture for Prof. Dr. Gerhard Prager's digital presence. The strategy includes:

1. **Main Hub Domain:** gerhardprager.eu (primary, comprehensive website)
2. **Specialized Micro-sites:** Standalone landing pages for specific service keywords
3. **Legacy Domain Management:** Strategic redirects from older/alternative domains to main hub

The approach balances SEO value, user experience, and traffic consolidation while maintaining specialist positioning in multiple service categories.

---

## Domain Structure Overview

### Primary Hub
- **Domain:** gerhardprager.eu
- **Purpose:** Comprehensive professional website with full service offerings, credentials, publications, patient resources
- **Target:** International patients, medical professionals, academic researchers
- **Strategy:** Main authority domain, hub for all canonical resources

### Specialized Micro-sites (Standalone Landing Pages)

#### 1. laparoscopy-vienna.at
- **URL:** https://laparoscopy-vienna.at
- **Focus:** Laparoscopic surgery specialization
- **Primary Keywords:** "laparoscopic surgery Vienna", "minimal invasive chirurgie wien", "minimally invasive surgery", "laparoscopic procedures"
- **Canonical:** Points to self (https://laparoscopy-vienna.at)
- **Content:** Standalone page with inline CSS, focused on laparoscopic benefits and procedures
- **Linking Strategy:** 8+ internal links to gerhardprager.eu main domain
- **Purpose:** Capture high-intent searches for laparoscopic-specific terminology

#### 2. fettsuchtchirurgie.eu
- **URL:** https://fettsuchtchirurgie.eu
- **Focus:** Obesity/weight-loss surgery (legacy & modern terminology)
- **Primary Keywords:** "Fettsuchtchirurgie" (older term), "bariatrische Chirurgie", "Adipositaschirurgie", "Gewichtsreduktionschirurgie"
- **Canonical:** Points to self (https://fettsuchtchirurgie.eu)
- **Content:** German-language landing page explaining terminology shift, focusing on modern bariatric procedures
- **Linking Strategy:** 8+ internal links to gerhardprager.eu main domain
- **Purpose:** Capture searches using older terminology while educating patients on modern terminology

#### 3. prager-chirurgie.at (Redirect Domain)
- **URL:** https://prager-chirurgie.at
- **Strategy:** Redirect to gerhardprager.eu
- **Method:** Meta refresh (5-second delay) + JavaScript fallback redirect
- **User Experience:** "You are being redirected" landing page with manual link option
- **Schema Markup:** Includes structured data indicating redirect relationship
- **Purpose:** Legacy domain migration, preserve any historical link value

---

## SEO Strategy

### Canonical Tags Strategy

**Micro-sites use self-referencing canonicals:**
```html
<!-- laparoscopy-vienna.at -->
<link rel="canonical" href="https://laparoscopy-vienna.at">

<!-- fettsuchtchirurgie.eu -->
<link rel="canonical" href="https://fettsuchtchirurgie.eu">

<!-- prager-chirurgie.at -->
<link rel="canonical" href="https://prager-chirurgie.at">
<!-- This is a redirect page, but while it exists, it canonicalizes to itself -->
```

**Rationale:** Micro-sites are standalone resources targeting specific service keywords, not duplicates of gerhardprager.eu. They deserve their own SEO authority.

### Internal Linking Strategy

**Each micro-site includes 8+ outbound links to gerhardprager.eu:**

**laparoscopy-vienna.at links:**
1. Main Website (hero CTA)
2. Learn More at gerhardprager.eu (hero CTA)
3. Main Website (footer)
4. Bariatric Surgery (related links section)
5. Endocrine Surgery (related links section)
6. Publications (related links section)
7. About Prof. Prager (related links section)
8. IFSO Leadership (related links section)
9. Patient Testimonials (related links section)
10. Contact & Appointment (related links section)

**fettsuchtchirurgie.eu links:**
1. More at gerhardprager.eu (hero CTA)
2. Online Appointment (contact section CTA)
3. Main Website (footer)
4. Bariatric Surgery (related links section)
5. Weight Loss Surgery (related links section)
6. Gastric Bypass (related links section)
7. Gastric Sleeve (related links section)
8. Publications (related links section)
9. About Prof. Prager (related links section)
10. Patient Testimonials (related links section)

### Robots.txt & Sitemap Strategy

**All micro-sites include:**
- robots.txt with full Allow: / directive
- XML sitemap with all content sections and anchor links
- Crawl-delay: 1 second (standard best practice)

**Rationale:** Maximize crawlability and indexation of standalone content while managing server load.

### Schema.org Markup

**Each site includes relevant structured data:**

**laparoscopy-vienna.at:**
```json
{
    "@type": "MedicalBusiness",
    "name": "Prof. Dr. Gerhard Prager - Laparoscopic Surgery Vienna",
    "expertise": ["Laparoscopic Surgery", "Bariatric Surgery", "Endocrine Surgery"],
    "knowsAbout": ["Gastric Bypass", "Gastric Sleeve", "Duodenal Switch", "Thyroid Surgery"],
    "sameAs": ["https://gerhardprager.eu"]
}
```

**fettsuchtchirurgie.eu:**
```json
{
    "@type": "MedicalBusiness",
    "name": "Prof. Dr. Gerhard Prager - Fettsuchtchirurgie Wien",
    "expertise": ["Bariatric Surgery", "Obesity Surgery", "Gastric Bypass"],
    "knowsAbout": ["Fettsuchtchirurgie", "Adipositaschirurgie", "Gewichtsreduktionschirurgie"],
    "sameAs": ["https://gerhardprager.eu"]
}
```

**prager-chirurgie.at (Redirect):**
```json
{
    "@type": "WebPage",
    "relatedLink": "https://gerhardprager.eu",
    "isPartOf": { "url": "https://gerhardprager.eu" }
}
```

---

## User Journey & Conversion Strategy

### Entry Points
1. **Organic Search:** Micro-sites capture long-tail service keywords
2. **Direct Navigation:** Users typing domain names
3. **Backlinks:** Existing links to legacy domains preserved via redirects
4. **Marketing Campaigns:** Specialized landing pages for targeted promotions

### Conversion Funnels

**Micro-site Visitor Flow:**
1. Land on specialized micro-site (high service-intent)
2. Learn about specific procedure (laparoscopy or obesity surgery)
3. Review Prof. Prager credentials (9,900+ surgeries, 435+ publications, IFSO President)
4. Click internal link to gerhardprager.eu for comprehensive information
5. Schedule consultation on main site

**Redirect Page Visitor Flow (prager-chirurgie.at):**
1. Arrive at legacy domain
2. See friendly redirect notice
3. Auto-redirect to gerhardprager.eu (5 seconds)
4. Alternative: Click manual link if redirect blocked
5. Access comprehensive services on main domain

---

## Technical Implementation Details

### File Structure
```
/sessions/charming-epic-fermi/mnt/PAPA-WEBSITE/
├── laparoscopy-vienna-at/
│   ├── index.html          (Standalone landing page)
│   ├── robots.txt          (Allow all, reference sitemap)
│   └── sitemap.xml         (Self-referencing URLs)
├── fettsuchtchirurgie-eu/
│   ├── index.html          (German landing page)
│   ├── robots.txt          (Allow all, reference sitemap)
│   └── sitemap.xml         (Self-referencing URLs)
├── prager-chirurgie-at/
│   ├── index.html          (Redirect page)
│   └── (No sitemap - redirect domain)
└── REDIRECT_STRATEGY.md    (This document)
```

### Landing Page Features

**laparoscopy-vienna.at & fettsuchtchirurgie.eu:**
- Bilingual support (DE/EN) for laparoscopy site; German-only for fettsucht
- Language switcher in header
- Sticky navigation with anchor links
- Hero section with dual CTAs
- Expertise cards with hover effects
- Procedures grid
- Benefits list with checkmarks
- Professional credentials display
- 6-8 Q&A FAQ items with toggle functionality
- Contact section with contact details
- Related links section (8+ links to gerhardprager.eu)
- Responsive mobile design
- Inline CSS (no external dependencies)
- Schema.org structured data

**prager-chirurgie.at (Redirect):**
- Meta refresh (5-second delay)
- JavaScript fallback redirect
- Countdown timer showing redirect progress
- Manual link option for users with redirects disabled
- Friendly, reassuring UX messaging
- Schema.org redirect metadata
- Professional styling consistent with Prof. Prager brand

### Mobile Responsiveness
- All pages fully responsive with breakpoints at 768px
- Touch-friendly interactive elements
- Font size scaling for readability
- Grid layouts adapt from multi-column to single-column

---

## Domain Authority & Link Building Strategy

### Authority Transfer
1. **Micro-sites:** Generate their own domain authority through:
   - On-page SEO optimization
   - High-quality backlink acquisition
   - Long-tail keyword targeting
   - User engagement signals

2. **Redirect Domain:** Preserved link value through:
   - 301 redirect (preserve PageRank)
   - Schema.org redirect metadata
   - Gradual consolidation over 6-12 months

### Backlink Acquisition Priorities
1. Medical directories (bariatric, endocrine, surgery)
2. Professional associations (IFSO, national surgical boards)
3. Patient review sites (Healthgrades, Jameda, etc.)
4. Medical academic sites and research databases
5. Healthcare industry publications

### Internal Linking Anchor Text
- Varied anchor text (brand, service-specific, long-tail)
- Natural, conversational link placement
- Balanced ratio of branded vs. keyword-rich anchors

---

## Performance Metrics & Monitoring

### Key Performance Indicators (KPIs)

**Micro-site Performance:**
- Organic traffic (source, device, geography)
- Bounce rate (should be low: high-intent landing pages)
- Click-through to gerhardprager.eu
- Consultation request submissions
- Keyword ranking positions
- Indexed pages per domain

**Redirect Domain Performance:**
- Successful redirect rate (>95% expected)
- Redirect time (should be <100ms)
- User engagement before redirect
- Redirect preservation (301 vs. meta refresh analysis)

### Monitoring Tools
1. Google Search Console (indexation, search queries, ranking)
2. Google Analytics (traffic sources, user behavior, conversions)
3. Ahrefs/Semrush (domain authority, backlinks, competitor analysis)
4. Schema.org validation tools (structured data compliance)

### Reporting Frequency
- Monthly: Traffic, keyword rankings, new backlinks
- Quarterly: User journey analysis, conversion rate optimization
- Annually: ROI analysis, strategic adjustments

---

## Maintenance Schedule

### Monthly Tasks
- Check Search Console for errors/indexation issues
- Monitor ranking positions for primary keywords
- Review analytics for traffic anomalies
- Update FAQ content based on user queries

### Quarterly Tasks
- Content refresh (testimonials, credentials, publications count)
- Backlink analysis and outreach
- A/B testing of CTAs and page layouts
- Competitor analysis

### Annual Tasks
- Comprehensive SEO audit
- Domain authority assessment
- Link profile evaluation
- Strategic planning for next 12 months

### Regular Checks
- Mobile responsiveness testing
- Form functionality testing
- Link validity (internal and external)
- Page load speed optimization

---

## Risk Management & Contingencies

### Potential Issues & Solutions

**Issue 1: Redirect Loops**
- **Risk:** User gets caught in redirect loop
- **Solution:** Direct 301 redirect in HTTP headers (not meta refresh)
- **Status:** Current setup uses meta refresh as user-friendly fallback

**Issue 2: Search Engine Deindexation**
- **Risk:** Micro-sites not indexed due to canonical confusion
- **Solution:** Proper self-referencing canonicals, clear robots.txt
- **Status:** Currently implemented correctly

**Issue 3: Link Equity Loss**
- **Risk:** Backlinks to micro-sites dilute main domain authority
- **Solution:** Accept as tradeoff; micro-sites build their own authority
- **Status:** Intentional strategy for specialized keyword coverage

**Issue 4: User Confusion**
- **Risk:** Users land on unfamiliar domain URL
- **Solution:** Landing pages explain specialization clearly
- **Status:** Clear messaging included in hero and contact sections

---

## Expansion Opportunities

### Potential Future Micro-sites

1. **endocrine-surgery-vienna.at**
   - Focus: Thyroid, adrenal, parathyroid surgery
   - Keywords: "Endocrine surgery Vienna", "Thyroid surgery Vienna"

2. **bariatric-vienna-at**
   - Focus: Comprehensive bariatric procedures
   - Keywords: "Bariatric surgery Vienna", "Weight loss surgery Vienna"

3. **gastric-bypass-wien.at**
   - Focus: Gastric bypass specialization
   - Keywords: "Gastric bypass Vienna", "Magenbypass Wien"

4. **minimal-invasive-surgery-vienna.eu**
   - Focus: Minimally invasive approach across all services
   - Keywords: "Minimal invasive surgery Vienna", "Laparoskopie Wien"

### Implementation Checklist for New Micro-sites
- [ ] Domain registration & SSL certificate
- [ ] Landing page development (match design system)
- [ ] Keyword research & optimization
- [ ] robots.txt & sitemap.xml creation
- [ ] Schema.org markup implementation
- [ ] Internal linking strategy (8+ links to hub)
- [ ] Backlink building campaign
- [ ] Search Console submission
- [ ] Analytics tracking setup
- [ ] Monthly monitoring implementation

---

## Conclusion

This redirect and domain strategy provides Prof. Dr. Gerhard Prager with:

1. **Multiple entry points** for patients searching specific service keywords
2. **Specialized landing pages** optimized for service-specific searches
3. **Preserved domain authority** through proper redirect implementation
4. **Clear user journeys** that consolidate to comprehensive main resource
5. **Scalable architecture** for future micro-site additions
6. **Professional positioning** as specialist across multiple surgical fields

The strategy balances SEO optimization with user experience and maintains Prof. Prager's authority as IFSO World President and one of Europe's leading bariatric and endocrine surgeons.

---

**Document Status:** Final
**Last Updated:** April 4, 2024
**Next Review:** July 4, 2024 (Q3 2024)
