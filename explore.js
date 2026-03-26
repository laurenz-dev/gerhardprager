require('dotenv').config();
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const siteId = process.env.WEBFLOW_SITE_ID;

async function main() {
  console.log('=== 1. SITE INFO ===');
  try {
    const site = await client.sites.get(siteId);
    console.log(JSON.stringify(site, null, 2));
  } catch (e) {
    console.error('Site Error:', e.message);
  }

  console.log('\n=== 2. COLLECTIONS ===');
  try {
    const collections = await client.collections.list(siteId);
    console.log(JSON.stringify(collections, null, 2));
  } catch (e) {
    console.error('Collections Error:', e.message);
  }

  console.log('\n=== 3. PAGES ===');
  try {
    const pages = await client.pages.list(siteId);
    console.log(JSON.stringify(pages, null, 2));
  } catch (e) {
    console.error('Pages Error:', e.message);
  }

  console.log('\n=== 4. CUSTOM DOMAINS ===');
  try {
    const domains = await client.sites.getCustomDomain(siteId);
    console.log(JSON.stringify(domains, null, 2));
  } catch (e) {
    console.log('No custom domains or error:', e.message);
  }
}

main().catch(console.error);
