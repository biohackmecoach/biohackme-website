#!/usr/bin/env node
/**
 * Manual Masterclass Access Granter
 * Use this when webhook fails or for manual processing
 *
 * Usage: node scripts/manual-grant-masterclass-access.js customer@email.com
 */

const admin = require('firebase-admin');
const crypto = require('crypto');
require('dotenv').config({ path: './functions/.env' });

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const DATACENTER = process.env.MAILCHIMP_DATA_CENTER;

async function grantMasterclassAccess(email) {
  console.log(`\n🔄 Granting masterclass access to: ${email}\n`);

  try {
    // Step 1: Find or create user in Firestore
    console.log('1️⃣  Checking Firestore...');
    const usersRef = admin.firestore().collection('users');
    const userQuery = await usersRef.where('email', '==', email).limit(1).get();

    let userId;
    if (userQuery.empty) {
      console.log('   Creating new user record...');
      const newUserRef = usersRef.doc();
      userId = newUserRef.id;
      await newUserRef.set({
        email: email,
        access: {
          masterclass: true,
          masterclassDate: admin.firestore.FieldValue.serverTimestamp(),
          grantedManually: true
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`   ✅ User created: ${userId}`);
    } else {
      userId = userQuery.docs[0].id;
      console.log(`   Found existing user: ${userId}`);
      await usersRef.doc(userId).set({
        access: {
          masterclass: true,
          masterclassDate: admin.firestore.FieldValue.serverTimestamp(),
          grantedManually: true
        }
      }, { merge: true });
      console.log('   ✅ Access granted in Firestore');
    }

    // Step 2: Add to Mailchimp with masterclass-customer tag
    console.log('\n2️⃣  Adding to Mailchimp...');
    const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
    const mailchimpUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}`;

    const mailchimpResponse = await fetch(mailchimpUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed',
        status: 'subscribed',
        tags: [
          { name: 'masterclass-customer', status: 'active' },
          { name: 'paid-customer', status: 'active' },
          { name: 'manual-access-granted', status: 'active' }
        ]
      }),
    });

    if (mailchimpResponse.ok) {
      console.log('   ✅ Added to Mailchimp with tags');
    } else {
      const error = await mailchimpResponse.json();
      console.log(`   ⚠️  Mailchimp warning: ${error.detail || error.title}`);
    }

    // Step 3: Log the manual access grant
    console.log('\n3️⃣  Logging manual access grant...');
    await admin.firestore().collection('manual_access_grants').add({
      email: email,
      userId: userId,
      productType: 'masterclass',
      grantedAt: admin.firestore.FieldValue.serverTimestamp(),
      grantedBy: 'manual-script',
      reason: 'Webhook failure or manual processing'
    });
    console.log('   ✅ Logged in audit trail');

    // Step 4: Generate access link
    console.log('\n4️⃣  Access Information:');
    console.log(`   🔗 Masterclass Access URL: https://biohackme.com.au/masterclass-access`);
    console.log(`   📧 Email: ${email}`);
    console.log(`   🆔 User ID: ${userId}`);

    console.log('\n✅ SUCCESS! Customer now has full masterclass access.');
    console.log('\n📨 Next steps:');
    console.log('   1. Send welcome email to customer with access link');
    console.log('   2. Check Mailchimp automation triggered');
    console.log('   3. Follow up with customer to ensure they received everything\n');

  } catch (error) {
    console.error('\n❌ ERROR granting access:', error);
    throw error;
  }
}

// Main execution
const email = process.argv[2];

if (!email) {
  console.error('\n❌ ERROR: Please provide customer email');
  console.log('\nUsage: node scripts/manual-grant-masterclass-access.js customer@email.com\n');
  process.exit(1);
}

if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
  console.error('\n❌ ERROR: Invalid email format\n');
  process.exit(1);
}

grantMasterclassAccess(email)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
