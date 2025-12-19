#!/usr/bin/env node
/**
 * Webhook Health Checker
 * Checks if Stripe webhooks are functioning properly
 * Run this daily or hourly via cron
 *
 * Usage: node scripts/check-webhook-health.js
 */

const admin = require('firebase-admin');
require('dotenv').config({ path: './functions/.env' });

// Initialize Firebase Admin
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function checkWebhookHealth() {
  console.log('\n🔍 Checking webhook health...\n');

  try {
    // Check recent payments
    const recentPayments = await admin.firestore()
      .collection('payments')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    console.log(`📊 Found ${recentPayments.size} recent payment records\n`);

    let completedCount = 0;
    let pendingCount = 0;
    let oldPendingPayments = [];

    recentPayments.forEach(doc => {
      const payment = doc.data();
      const status = payment.status;

      if (status === 'completed') {
        completedCount++;
      } else if (status === 'pending') {
        pendingCount++;

        // Check if payment is more than 1 hour old
        const createdAt = payment.createdAt?.toDate();
        if (createdAt) {
          const hoursSinceCreated = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
          if (hoursSinceCreated > 1) {
            oldPendingPayments.push({
              id: doc.id,
              email: payment.userEmail,
              hoursSinceCreated: Math.round(hoursSinceCreated * 10) / 10,
              createdAt: createdAt.toISOString()
            });
          }
        }
      }
    });

    console.log(`✅ Completed payments: ${completedCount}`);
    console.log(`⏳ Pending payments: ${pendingCount}`);

    if (oldPendingPayments.length > 0) {
      console.log(`\n⚠️  WARNING: ${oldPendingPayments.length} old pending payment(s) detected!\n`);
      console.log('These payments may indicate webhook failures:\n');

      oldPendingPayments.forEach(payment => {
        console.log(`   🚨 ${payment.email}`);
        console.log(`      Session ID: ${payment.id}`);
        console.log(`      Age: ${payment.hoursSinceCreated} hours`);
        console.log(`      Created: ${payment.createdAt}`);
        console.log(`      Action: Run manual grant script:`);
        console.log(`      → node scripts/manual-grant-masterclass-access.js ${payment.email}\n`);
      });

      console.log('⚠️  WEBHOOK MAY BE BROKEN! Check Stripe webhook configuration.\n');
      return false;
    } else if (pendingCount > 0) {
      console.log('\n✅ All pending payments are recent (< 1 hour old)');
      console.log('   Webhooks appear to be functioning normally\n');
      return true;
    } else {
      console.log('\n✅ No pending payments. System healthy.\n');
      return true;
    }

  } catch (error) {
    console.error('\n❌ ERROR checking webhook health:', error);
    return false;
  }
}

// Check for recent webhook logs
async function checkWebhookLogs() {
  console.log('🔍 Checking webhook execution logs...\n');

  try {
    const webhookLogs = await admin.firestore()
      .collection('webhook_logs')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .get();

    if (webhookLogs.empty) {
      console.log('⚠️  No webhook logs found. Webhooks may not be configured.\n');
      return false;
    }

    const lastLog = webhookLogs.docs[0].data();
    const lastWebhookTime = lastLog.timestamp.toDate();
    const hoursSinceLastWebhook = (Date.now() - lastWebhookTime.getTime()) / (1000 * 60 * 60);

    console.log(`Last webhook: ${lastWebhookTime.toISOString()}`);
    console.log(`Time since last webhook: ${Math.round(hoursSinceLastWebhook * 10) / 10} hours\n`);

    if (hoursSinceLastWebhook > 48) {
      console.log('⚠️  WARNING: No webhooks received in 48+ hours!\n');
      return false;
    }

    console.log('✅ Webhook logs look healthy\n');
    return true;
  } catch (error) {
    console.log('ℹ️  No webhook_logs collection found (expected if logging not set up yet)\n');
    return true;
  }
}

// Main execution
async function main() {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   WEBHOOK HEALTH CHECK                    ║');
  console.log('╚═══════════════════════════════════════════╝\n');

  const paymentsHealthy = await checkWebhookHealth();
  const logsHealthy = await checkWebhookLogs();

  console.log('═══════════════════════════════════════════');

  if (paymentsHealthy && logsHealthy) {
    console.log('✅ OVERALL STATUS: HEALTHY');
    console.log('   All webhooks functioning normally\n');
    process.exit(0);
  } else {
    console.log('🚨 OVERALL STATUS: ACTION REQUIRED');
    console.log('   1. Check Stripe webhook configuration');
    console.log('   2. Process any old pending payments manually');
    console.log('   3. Verify webhook URL is correct\n');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
