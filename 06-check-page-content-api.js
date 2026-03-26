require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const siteId = process.env.WEBFLOW_SITE_ID;
const homePageId = '69bbf7916a4fe877dcbedb0b';

async function checkAPIs() {
  // Check all available methods on client.pages
  console.log('=== PAGES API METHODS ===');
  const pagesMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(client.pages));
  console.log(pagesMethods);

  // Check if getContent exists
  console.log('\n=== TRYING getContent ===');
  try {
    const content = await client.pages.getContent(homePageId, { localeId: null });
    console.log('Content:', JSON.stringify(content, null, 2).substring(0, 2000));
  } catch (e) {
    console.log('Error:', e.message?.substring(0, 200));
  }

  // Check if updateStaticContent exists
  console.log('\n=== TRYING updateStaticContent ===');
  try {
    // Just check if method exists
    console.log('updateStaticContent exists:', typeof client.pages.updateStaticContent);
  } catch (e) {
    console.log('Error:', e.message?.substring(0, 200));
  }

  // Check all client namespaces
  console.log('\n=== ALL CLIENT NAMESPACES ===');
  const namespaces = Object.keys(client).filter(k => typeof client[k] === 'object' && client[k] !== null);
  for (const ns of namespaces) {
    try {
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(client[ns]));
      if (methods.length > 1) {
        console.log(`\nclient.${ns}:`);
        console.log('  ', methods.filter(m => m !== 'constructor').join(', '));
      }
    } catch (e) {}
  }

  // Check components API
  console.log('\n=== COMPONENTS ===');
  try {
    const components = await client.components?.list(siteId);
    console.log('Components:', JSON.stringify(components, null, 2)?.substring(0, 500));
  } catch (e) {
    console.log('Components error:', e.message?.substring(0, 150));
  }
}

checkAPIs().catch(console.error);
