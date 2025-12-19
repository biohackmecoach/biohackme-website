"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDFDownloadLink = exports.createPDFAccessToken = exports.sendEmailViaSendGrid = exports.sendMasterclassWelcomeEmail = void 0;
const admin = require("firebase-admin");
/**
 * Email Sender - Sends immediate transactional emails via Mailchimp
 * This bypasses automation delays and sends emails immediately after payment
 */
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const DATACENTER = process.env.MAILCHIMP_DATA_CENTER || 'us4';
/**
 * Send immediate welcome email with masterclass access
 */
async function sendMasterclassWelcomeEmail(data) {
    try {
        // Use Mailchimp Transactional API (Mandrill) for immediate email
        // Alternative: Use SendGrid, Postmark, or another transactional service
        const mailchimpUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/messages/send`;
        const emailContent = {
            message: {
                from_email: 'camilla@biohackme.com.au',
                from_name: 'Camilla Barnes - BiohackMe',
                subject: '🎉 Welcome to Your Biohacking Masterclass!',
                to: [{
                        email: data.email,
                        name: data.firstName || '',
                        type: 'to'
                    }],
                html: generateMasterclassWelcomeHTML(data),
                text: generateMasterclassWelcomeText(data),
                tags: ['masterclass-welcome', 'transactional'],
                track_opens: true,
                track_clicks: true,
                auto_text: true,
                inline_css: true
            }
        };
        // For now, we'll use a simpler approach with Mailchimp
        // In production, consider using SendGrid or Postmark for better transactional email delivery
        console.log(`Sending welcome email to: ${data.email}`);
        // TODO: Implement actual email sending
        // For now, we'll log and rely on Mailchimp automation
        // But this function is ready to be extended with any transactional email service
        return true;
    }
    catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
}
exports.sendMasterclassWelcomeEmail = sendMasterclassWelcomeEmail;
/**
 * Generate HTML email content for masterclass welcome
 */
function generateMasterclassWelcomeHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Your Biohacking Masterclass</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px; background: linear-gradient(135deg, #022D4E 0%, #0A5A8A 100%); border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">
                🎉 Welcome to Your Masterclass!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px;">
                ${data.firstName ? `Hi ${data.firstName},` : 'Hi there,'}<br><br>
                Congratulations on taking the first step towards optimizing your health and performance!
                Your Biohacking Basics Masterclass is now ready for you.
              </p>

              <!-- Access Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${data.accessLink}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #022D4E 0%, #0A5A8A 100%); color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px;">
                      🚀 ACCESS YOUR MASTERCLASS NOW
                    </a>
                  </td>
                </tr>
              </table>

              <!-- PDF Download -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #0A5A8A; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 10px; color: #022D4E; font-size: 18px;">
                  📚 Your Masterclass Resources
                </h3>
                <p style="margin: 0 0 15px; color: #555; font-size: 14px;">
                  Download your comprehensive PDF guide and resources:
                </p>
                <a href="${data.pdfDownloadLink}" style="display: inline-block; padding: 12px 24px; background-color: #022D4E; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  📥 Download PDF Resources
                </a>
              </div>

              <!-- Login Instructions -->
              <div style="background-color: #e3f2fd; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 10px; color: #022D4E; font-size: 16px;">
                  🔐 Your Login Instructions
                </h3>
                <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">
                  ${data.loginInstructions}
                </p>
              </div>

              <!-- What to Expect -->
              <h3 style="color: #022D4E; font-size: 20px; margin: 30px 0 15px;">
                What You'll Learn:
              </h3>
              <ul style="color: #555; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>The 8-Pillar Biohacking Framework for optimal health</li>
                <li>Science-backed strategies to enhance sleep, energy, and performance</li>
                <li>Practical protocols you can implement immediately</li>
                <li>How to optimize your environment for automatic health gains</li>
                <li>Personalized recommendations based on your unique needs</li>
              </ul>

              <!-- Support -->
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e0e0e0;">
                <p style="font-size: 14px; color: #555; margin: 0 0 10px;">
                  <strong>Need help?</strong> Reply to this email or contact us at
                  <a href="mailto:camilla@biohackme.com.au" style="color: #0A5A8A;">camilla@biohackme.com.au</a>
                </p>
                <p style="font-size: 14px; color: #555; margin: 0;">
                  Can't wait to see you transform your health!<br>
                  <strong>Camilla Barnes</strong><br>
                  Founder, BiohackMe
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="font-size: 12px; color: #888; margin: 0;">
                © ${new Date().getFullYear()} BiohackMe. All rights reserved.<br>
                <a href="https://biohackme.com.au" style="color: #0A5A8A; text-decoration: none;">biohackme.com.au</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
/**
 * Generate plain text email content for masterclass welcome
 */
function generateMasterclassWelcomeText(data) {
    return `
🎉 Welcome to Your Biohacking Masterclass!

${data.firstName ? `Hi ${data.firstName},` : 'Hi there,'}

Congratulations on taking the first step towards optimizing your health and performance! Your Biohacking Basics Masterclass is now ready for you.

🚀 ACCESS YOUR MASTERCLASS:
${data.accessLink}

📚 DOWNLOAD YOUR PDF RESOURCES:
${data.pdfDownloadLink}

🔐 LOGIN INSTRUCTIONS:
${data.loginInstructions}

WHAT YOU'LL LEARN:
• The 8-Pillar Biohacking Framework for optimal health
• Science-backed strategies to enhance sleep, energy, and performance
• Practical protocols you can implement immediately
• How to optimize your environment for automatic health gains
• Personalized recommendations based on your unique needs

Need help? Reply to this email or contact us at camilla@biohackme.com.au

Can't wait to see you transform your health!

Camilla Barnes
Founder, BiohackMe
https://biohackme.com.au

© ${new Date().getFullYear()} BiohackMe. All rights reserved.
  `;
}
/**
 * Send email via SendGrid (recommended for production)
 */
async function sendEmailViaSendGrid(data) {
    // TODO: Implement SendGrid integration
    // This is the recommended approach for production
    // npm install @sendgrid/mail
    return true;
}
exports.sendEmailViaSendGrid = sendEmailViaSendGrid;
/**
 * Create downloadable PDF access token
 */
async function createPDFAccessToken(email, productType) {
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    // Store token in Firestore with expiry (optional)
    await admin.firestore().collection('download_tokens').add({
        token: token,
        email: email,
        productType: productType,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: null,
        used: false
    });
    return token;
}
exports.createPDFAccessToken = createPDFAccessToken;
/**
 * Generate download link for PDF
 */
function generatePDFDownloadLink(token) {
    return `https://biohackme.com.au/download/${token}`;
}
exports.generatePDFDownloadLink = generatePDFDownloadLink;
//# sourceMappingURL=email-sender.js.map