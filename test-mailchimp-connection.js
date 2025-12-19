// Test Mailchimp connection
// Run with: node test-mailchimp-connection.js

const crypto = require('crypto');

// PASTE YOUR VALUES HERE:
const MAILCHIMP_API_KEY = 'YOUR_API_KEY_HERE';  // Get from Mailchimp → Account → Extras → API Keys
const MAILCHIMP_AUDIENCE_ID = 'YOUR_AUDIENCE_ID_HERE';  // Get from Mailchimp → Audience → Settings → Audience ID
const MAILCHIMP_DATA_CENTER = 'YOUR_DC_HERE';  // Usually 'us4', 'us5', etc. - check your Mailchimp URL

const testEmail = 'test@example.com';
const emailHash = crypto.createHash('md5').update(testEmail.toLowerCase()).digest('hex');

async function testMailchimpConnection() {
  console.log('🧪 Testing Mailchimp Connection...\n');
  console.log('Data Center:', MAILCHIMP_DATA_CENTER);
  console.log('Audience ID:', MAILCHIMP_AUDIENCE_ID);
  console.log('API Key (first 10 chars):', MAILCHIMP_API_KEY.substring(0, 10) + '...');

  const memberUrl = `https://${MAILCHIMP_DATA_CENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${emailHash}`;

  const subscriberData = {
    email_address: testEmail,
    status: 'subscribed',
  };

  try {
    const response = await fetch(memberUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('\n✅ SUCCESS! Mailchimp connection working!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('\n❌ FAILED! Mailchimp returned error:');
      console.log('Status:', response.status);
      console.log('Error:', JSON.stringify(data, null, 2));

      if (data.title === 'Invalid Resource') {
        console.log('\n⚠️  LIKELY ISSUE: Wrong Audience ID or Data Center');
      } else if (data.title === 'API Key Invalid') {
        console.log('\n⚠️  LIKELY ISSUE: Wrong API Key');
      }
    }
  } catch (error) {
    console.log('\n❌ NETWORK ERROR:');
    console.log(error.message);
  }
}

testMailchimpConnection();
