#!/usr/bin/env node
/**
 * Quick Fix Script for Sydney Cooper
 * Grants immediate masterclass access
 */

import admin from 'firebase-admin';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, '../serviceAccountKey.json'), 'utf8')
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = 'sydcoops15@gmail.com';
const firstName = 'Sydney';

console.log('\n🔧 GRANTING IMMEDIATE ACCESS TO SYDNEY COOPER\n');
console.log('Email:', email);
console.log('Status: Webhook failed - manual grant required\n');

async function grantAccess() {
  try {
    // Step 1: Create user in Firestore
    console.log('1️⃣  Creating Firestore record...');
    const userRef = admin.firestore().collection('users').doc();
    const userId = userRef.id;

    await userRef.set({
      email: email,
      firstName: firstName,
      access: {
        masterclass: true,
        masterclassDate: admin.firestore.FieldValue.serverTimestamp(),
        grantedManually: true,
        reason: 'webhook_failure_2025-11-24'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('   ✅ User created:', userId);

    // Step 2: Create payment record (for audit trail)
    console.log('\n2️⃣  Creating payment record...');
    await admin.firestore().collection('payments').add({
      userId: userId,
      userEmail: email,
      productType: 'masterclass',
      status: 'completed',
      source: 'manual_grant',
      reason: 'webhook_failure',
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('   ✅ Payment recorded');

    // Step 3: Log manual access grant
    console.log('\n3️⃣  Logging manual grant...');
    await admin.firestore().collection('manual_access_grants').add({
      email: email,
      userId: userId,
      firstName: firstName,
      productType: 'masterclass',
      grantedAt: admin.firestore.FieldValue.serverTimestamp(),
      grantedBy: 'manual-script-sydney',
      reason: 'Stripe webhook failure - customer paid but received nothing'
    });

    console.log('   ✅ Manual grant logged');

    // Step 4: Generate access info
    console.log('\n4️⃣  Access Information:\n');
    console.log('   🔗 Masterclass URL: https://biohackme.com.au/masterclass-access');
    console.log(`   📧 Email: ${email}`);
    console.log(`   🆔 User ID: ${userId}`);
    console.log(`   👤 Name: ${firstName}`);

    console.log('\n✅ SUCCESS! Sydney now has full masterclass access.\n');
    console.log('📨 NEXT STEPS:');
    console.log('   1. Add Sydney to Mailchimp manually');
    console.log('   2. Send her the welcome email (see IMMEDIATE-FIX-FOR-SYDNEY.md)');
    console.log('   3. Verify she received everything');
    console.log('   4. Configure Stripe webhook to prevent this from happening again\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error);
    throw error;
  }
}

grantAccess()
  .then(() => {
    console.log('═══════════════════════════════════════════');
    console.log('Done! Now send Sydney the welcome email.');
    console.log('═══════════════════════════════════════════\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
