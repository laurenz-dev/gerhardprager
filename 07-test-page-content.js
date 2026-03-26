require('dotenv').config({ quiet: true });
const { WebflowClient } = require('webflow-api');

const client = new WebflowClient({ accessToken: process.env.WEBFLOW_API_TOKEN });
const homePageId = '69bbf7916a4fe877dcbedb0b';

async function testAddContent() {
  // First, check all methods available including undocumented ones
  console.log('=== CHECKING updateStaticContent SIGNATURE ===');
  console.log(client.pages.updateStaticContent.toString().substring(0, 500));

  // Try to add a simple text node
  console.log('\n=== TRYING TO ADD CONTENT ===');
  try {
    const result = await client.pages.updateStaticContent(homePageId, {
      nodes: [
        {
          nodeId: 'hero-section',
          type: 'text',
          text: {
            text: 'Univ.-Prof. Dr. Gerhard Prager',
          },
        },
      ],
    });
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (e) {
    console.log('Error:', e.message?.substring(0, 500));
    console.log('Full error:', JSON.stringify(e, null, 2)?.substring(0, 1000));
  }

  // Try alternative format
  console.log('\n=== TRYING ALTERNATIVE FORMAT ===');
  try {
    const result = await client.pages.updateStaticContent(homePageId, {
      nodes: [
        {
          id: 'test-1',
          type: 'Heading',
          tag: 'h1',
          text: 'Univ.-Prof. Dr. Gerhard Prager',
        },
      ],
    });
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (e) {
    console.log('Error:', e.message?.substring(0, 500));
  }

  // Let me check the raw HTTP API directly
  console.log('\n=== TRYING RAW API ===');
  const fetch = (await import('node-fetch')).default;

  // First get page content via REST
  try {
    const resp = await fetch(`https://api.webflow.com/v2/pages/${homePageId}/dom`, {
      headers: {
        'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
        'accept': 'application/json',
      },
    });
    const data = await resp.json();
    console.log('DOM GET:', JSON.stringify(data, null, 2)?.substring(0, 1000));
  } catch (e) {
    console.log('REST Error:', e.message);
  }

  // Try POST to add nodes
  try {
    const resp = await fetch(`https://api.webflow.com/v2/pages/${homePageId}/dom`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WEBFLOW_API_TOKEN}`,
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        nodes: [
          {
            nodeId: 'test-heading',
            type: 'text',
            text: '<h1>Univ.-Prof. Dr. Gerhard Prager</h1>',
          },
        ],
      }),
    });
    const data = await resp.json();
    console.log('DOM POST:', JSON.stringify(data, null, 2)?.substring(0, 1000));
  } catch (e) {
    console.log('POST Error:', e.message);
  }
}

testAddContent().catch(console.error);
