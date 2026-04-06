# Domain Launch Checklist & Quick Reference
## Prof. Dr. Gerhard Prager - Landing Pages & Redirect Strategy

**Created:** April 4, 2024
**Total Files:** 9 (3 HTML landing pages + 6 supporting files + 2 strategy documents)

---

## Quick File Reference

### Domain 1: laparoscopy-vienna.at
**Location:** `/sessions/charming-epic-fermi/mnt/PAPA-WEBSITE/laparoscopy-vienna-at/`

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 47 KB | Bilingual (DE/EN) landing page focused on laparoscopic procedures |
| `robots.txt` | 138 B | Search engine crawling directives |
| `sitemap.xml` | 1.2 KB | XML sitemap with 6 URL entries |

**Key Features:**
- Bilingual (German/English) with language switcher in header
- 8+ FAQ items with expandable toggle functionality
- Hero section with dual CTAs
- 4 expertise cards + 6 procedure cards
- 8+ benefits list
- Credentials display (9,900+ surgeries, 435+ publications, 40+ years, IFSO President)
- 15 links to gerhardprager.eu
- Schema.org MedicalBusiness markup
- Responsive mobile design
- Self-referencing canonical: `https://laparoscopy-vienna.at`

---

### Domain 2: fettsuchtchirurgie.eu
**Location:** `/sessions/charming-epic-fermi/mnt/PAPA-WEBSITE/fettsuchtchirurgie-eu/`

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 28 KB | German landing page for obesity/bariatric surgery |
| `robots.txt` | 138 B | Search engine crawling directives |
| `sitemap.xml` | 1.1 KB | XML sitemap with 6 URL entries |

**Key Features:**
- German-language page (primary target market)
- Explains terminology: "Fettsuchtchirurgie" (older) → "Bariatrische Chirurgie" (modern)
- Highlight box clarifying modern terminology
- 8 FAQ items addressing patient questions
- 4 expertise cards + 6 procedure cards
- Benefits list with 8 advantages
- Credentials display
- 15 links to gerhardprager.eu
- Schema.org MedicalBusiness markup
- Responsive mobile design
- Self-referencing canonical: `https://fettsuchtchirurgie.eu`

---

### Domain 3: prager-chirurgie.at (Redirect)
**Location:** `/sessions/charming-epic-fermi/mnt/PAPA-WEBSITE/prager-chirurgie-at/`

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 7.9 KB | Redirect landing page with user-friendly messaging |

**Key Features:**
- Meta refresh redirect (5-second delay) to https://gerhardprager.eu
- JavaScript fallback redirect with countdown timer
- User-friendly "You are being redirected" message
- Manual link option for users with redirects disabled
- Professional styling matching Prof. Prager brand
- Friendly German messaging
- Schema.org redirect metadata
- Countdown timer updating every second
- 14 references to gerhardprager.eu and redirect relationship

---

## Strategy Documents

### REDIRECT_STRATEGY.md
**Size:** 14.3 KB
**Sections:**
1. Executive Summary
2. Domain Structure Overview
3. SEO Strategy (Canonicals, Internal Linking, Schema.org)
4. User Journey & Conversion Strategy
5. Technical Implementation Details
6. Domain Authority & Link Building
7. Performance Metrics & KPIs
8. Maintenance Schedule
9. Risk Management & Contingencies
10. Expansion Opportunities

**Key Recommendations:**
- Micro-sites use self-referencing canonicals (not hub domain)
- 8+ internal links from each micro-site to gerhardprager.eu
- Separate domain authority strategy vs. main hub consolidation
- 301 redirects preferred for legacy domains
- Monthly monitoring with quarterly deep-dives

---

## Content Summary

### laparoscopy-vienna.at
**Primary Keywords:** laparoscopic surgery Vienna, minimal invasive chirurgie wien, minimally invasive surgery, laparoscopy

**Content Breakdown:**
- Hero section + 2 CTAs
- Expertise section: 4 cards
- Procedures: 6 laparoscopic procedures listed
- Benefits: 8 major advantages highlighted
- Why Prof. Prager: 4 credential statistics
- FAQ: 8 questions about laparoscopic surgery
- Contact section with 3 contact details
- Related links: 8 links to main website
- Footer with 4 links

**Languages:** German (DE) & English (EN)

---

### fettsuchtchirurgie.eu
**Primary Keywords:** Fettsuchtchirurgie, bariatrische Chirurgie, Adipositaschirurgie, Gewichtsreduktionschirurgie

**Content Breakdown:**
- Hero section + 2 CTAs
- Information: Explains terminology shift from Fettsucht to Bariatrie
- Expertise: 4 cards covering experience
- Procedures: 6 bariatric procedures listed
- Benefits: 8 major advantages of bariatric surgery
- Prof. Credentials: 4 credential statistics
- FAQ: 8 questions about bariatric surgery
- Contact section with 3 contact details
- Related links: 8 links to main website
- Footer with 4 links

**Languages:** German (DE) only

---

### prager-chirurgie.at
**Purpose:** Legacy domain redirect with excellent UX

**Content Elements:**
- Header with "Prof. Dr. Gerhard Prager" + tagline
- Redirect notice explaining what's happening
- Countdown timer (animated, updates every second)
- Friendly German messaging
- Manual CTA button: "Zur Hauptwebsite"
- Additional quick links: Bariatric Surgery, Endocrine Surgery, Contact
- Footer explaining redirect
- Schema.org metadata indicating relationship

---

## DNS & Hosting Setup Required

### Domain Registration
- [ ] laparoscopy-vienna.at - Register (or verify owned)
- [ ] fettsuchtchirurgie.eu - Register (or verify owned)
- [ ] prager-chirurgie.at - Register (or verify owned)

### SSL Certificates
- [ ] laparoscopy-vienna.at - Install HTTPS certificate
- [ ] fettsuchtchirurgie.eu - Install HTTPS certificate
- [ ] prager-chirurgie.at - Install HTTPS certificate

### Hosting Configuration
- [ ] Upload HTML files to correct web root directories
- [ ] Ensure proper MIME types (text/html, application/xml, text/plain)
- [ ] Set HTTP headers for caching (robots.txt, sitemaps)
- [ ] Enable gzip compression
- [ ] Configure SSL redirect (HTTP → HTTPS)

### DNS Records
All three domains should use A records pointing to the web server hosting these files.

---

## Search Engine Submission

### Google Search Console
- [ ] Submit laparoscopy-vienna.at sitemap to GSC
- [ ] Submit fettsuchtchirurgie.eu sitemap to GSC
- [ ] Request indexation for prager-chirurgie.at (may take time)
- [ ] Verify ownership of all domains
- [ ] Monitor indexation status
- [ ] Check for crawl errors

### Bing Webmaster Tools
- [ ] Submit all three domains
- [ ] Submit sitemaps
- [ ] Verify ownership

### Other Search Engines
- [ ] Yandex Webmaster (if targeting Russian-speaking patients)
- [ ] Baidu (if targeting Chinese-speaking patients)

---

## Link Building & Outreach

### Priority 1: Medical Directories
- [ ] IFSO (International Federation for Surgery of Obesity)
- [ ] Austrian Medical Chamber (Ärztekammer)
- [ ] European Society of Bariatric Surgeons
- [ ] Jameda (German physician directory)
- [ ] Healthgrades / Doctolib

### Priority 2: Content & Press
- [ ] Press release about specialization in laparoscopy
- [ ] Profile update on professional websites
- [ ] Link from gerhardprager.eu to micro-sites
- [ ] Patient testimonial sites

### Priority 3: Internal Linking
- [ ] Verify all 15 links from each micro-site work
- [ ] Check anchor text variation
- [ ] Monitor click-through rates
- [ ] A/B test CTA button text

---

## Analytics & Monitoring Setup

### Google Analytics 4
- [ ] Create property for laparoscopy-vienna.at
- [ ] Create property for fettsuchtchirurgie.eu
- [ ] Create property for prager-chirurgie.at
- [ ] Set up conversion goals (consultation requests)
- [ ] Enable cross-domain tracking to gerhardprager.eu
- [ ] Configure audience segments (new vs. returning)

### Monitoring Metrics
- [ ] Organic traffic trends
- [ ] Keyword rankings (track 10-15 primary keywords per domain)
- [ ] Click-through to gerhardprager.eu
- [ ] Bounce rate analysis
- [ ] Consultation request conversion rate
- [ ] Device breakdown (mobile vs. desktop)

---

## Content Maintenance Schedule

### Weekly
- [ ] Monitor Google Search Console for new errors
- [ ] Check form submissions / consultation requests
- [ ] Review user feedback

### Monthly
- [ ] Update FAQ based on new user questions
- [ ] Verify all external links are working
- [ ] Check Google Analytics for traffic anomalies
- [ ] Review top performing keywords

### Quarterly
- [ ] Comprehensive SEO audit
- [ ] Update Prof. Prager statistics (surgeries, publications)
- [ ] Refresh patient testimonials
- [ ] Competitive analysis
- [ ] Link profile review

### Annual
- [ ] Full website audit
- [ ] Update all metadata and schema markup
- [ ] Evaluate micro-site ROI
- [ ] Plan next 12 months expansion

---

## Launch Checklist

### Pre-Launch (Before Going Live)
- [ ] All HTML files validate (W3C HTML5 validation)
- [ ] All links tested (internal and external)
- [ ] Mobile responsiveness tested (iOS & Android)
- [ ] Performance tested (PageSpeed Insights >90)
- [ ] Schema.org markup validated (schema.org validator)
- [ ] Spelling/grammar checked
- [ ] Contact information verified and current
- [ ] Brand consistency reviewed

### Launch Day
- [ ] Domains point to correct hosting
- [ ] HTTPS/SSL working (green padlock)
- [ ] robots.txt accessible at root
- [ ] sitemaps accessible at root
- [ ] Pages render correctly in Chrome, Firefox, Safari
- [ ] Forms working properly (if applicable)
- [ ] Analytics tracking installed
- [ ] Google Search Console verified
- [ ] Sitemap submitted to GSC

### Post-Launch (First Month)
- [ ] Monitor indexation (Google Search Console)
- [ ] Check for crawl errors
- [ ] Monitor organic traffic
- [ ] Verify mobile usability
- [ ] Check Core Web Vitals
- [ ] Monitor conversion rates
- [ ] Respond to initial queries
- [ ] Build initial backlinks

---

## File Paths (Quick Reference)

```
/sessions/charming-epic-fermi/mnt/PAPA-WEBSITE/
├── REDIRECT_STRATEGY.md                    (14.3 KB)
├── DOMAIN_LAUNCH_CHECKLIST.md             (This file)
├── laparoscopy-vienna-at/
│   ├── index.html                         (47 KB, 887 lines)
│   ├── robots.txt
│   └── sitemap.xml
├── fettsuchtchirurgie-eu/
│   ├── index.html                         (28 KB, 710 lines)
│   ├── robots.txt
│   └── sitemap.xml
└── prager-chirurgie-at/
    └── index.html                         (7.9 KB, 264 lines)
```

---

## Content Statistics

| Metric | laparoscopy-vienna | fettsuchtchirurgie | prager-chirurgie |
|--------|-------------------|-------------------|------------------|
| HTML Lines | 887 | 710 | 264 |
| File Size | 47 KB | 28 KB | 7.9 KB |
| FAQ Items | 8 | 8 | N/A |
| External Links | 15 | 15 | 14 |
| Languages | 2 (DE/EN) | 1 (DE) | 1 (DE) |
| Schema.org Types | MedicalBusiness | MedicalBusiness | WebPage + MD |
| Meta Tags | 10+ | 10+ | 8+ |
| Procedures Listed | 6 | 6 | N/A |

---

## Quick Links for Testing

Once domains are live:
- https://laparoscopy-vienna.at
- https://laparoscopy-vienna.at/#faq (Jump to FAQ)
- https://fettsuchtchirurgie.eu
- https://fettsuchtchirurgie.eu/#benefits (Jump to benefits)
- https://prager-chirurgie.at (Should redirect to gerhardprager.eu within 5 seconds)

---

## Troubleshooting Reference

### Issue: Pages not showing in Google Search
**Solutions:**
1. Verify domains in Google Search Console
2. Submit sitemaps explicitly
3. Request indexation for specific URLs
4. Check robots.txt isn't blocking crawlers
5. Ensure HTTPS/SSL working correctly

### Issue: Redirect not working
**Solutions:**
1. Check domain DNS records pointing to correct IP
2. Verify HTTP 301 redirect configured (if using server-side)
3. Test both meta refresh and JavaScript redirect
4. Allow 24-48 hours for DNS propagation
5. Clear browser cache and try in incognito

### Issue: Links to gerhardprager.eu not working
**Solutions:**
1. Verify gerhardprager.eu domain is live
2. Check SSL certificate valid on main domain
3. Verify firewall isn't blocking cross-domain links
4. Test in different browsers/locations
5. Check analytics for actual link clicks

### Issue: Mobile page layout broken
**Solutions:**
1. Test viewport meta tag: `<meta name="viewport"...>`
2. Check CSS media queries for breakpoints
3. Test on real devices (not just browser tools)
4. Verify font sizes readable on mobile
5. Test form input fields on mobile keyboard

---

## Contact Information (For Updates)

**Prof. Dr. Gerhard Prager**
- Phone: +43 (1) 4311-1111
- Email: office@gerhardprager.eu
- Website: https://gerhardprager.eu

**Update Notes:** This checklist should be reviewed monthly and updated as domains are launched, analytics are gathered, and optimization occurs.

---

**Document Status:** Final - Ready for Implementation
**Last Updated:** April 4, 2024
**Next Review:** April 30, 2024 (30 days post-launch)
