import * as functions from 'firebase-functions';
import { cors } from './cors';

// Mailchimp configuration
const MAILCHIMP_API_KEY = 'a0ea152d1144e3b3d7d6c117d914e686-us4';
const AUDIENCE_ID = 'e84f95f298';
const DATACENTER = 'us4'; // Extracted from API key

interface MailchimpSubscriber {
  email_address: string;
  status: 'subscribed' | 'pending';
  merge_fields?: {
    FNAME?: string;
    LNAME?: string;
  };
  tags?: string[];
}

export const subscribeToNewsletter = functions.https.onRequest(async (req, res) => {
  // Handle CORS
  cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { email, firstName, lastName } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Prepare subscriber data
      const subscriberData: MailchimpSubscriber = {
        email_address: email,
        status: 'subscribed', // Use 'pending' for double opt-in
      };

      // Add name fields if provided
      if (firstName || lastName) {
        subscriberData.merge_fields = {
          FNAME: firstName || '',
          LNAME: lastName || '',
        };
      }

      // Make request to Mailchimp API
      const mailchimpUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

      const response = await fetch(mailchimpUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({
          success: true,
          message: 'Successfully subscribed to newsletter!',
          email: email
        });
      } else {
        // Handle Mailchimp errors
        if (data.title === 'Member Exists') {
          res.status(400).json({
            error: 'This email is already subscribed to our newsletter.'
          });
        } else {
          console.error('Mailchimp API error:', data);
          res.status(400).json({
            error: data.detail || 'Failed to subscribe. Please try again.'
          });
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  });
});

// Masterclass Pre-registration Function
export const subscribeToMasterclass = functions.https.onRequest(async (req, res) => {
  // Handle CORS
  cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { email, firstName, lastName } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Prepare subscriber data with masterclass pre-registration tag
      const subscriberData: MailchimpSubscriber = {
        email_address: email,
        status: 'subscribed',
      };

      // Add name fields if provided
      if (firstName || lastName) {
        subscriberData.merge_fields = {
          FNAME: firstName || '',
          LNAME: lastName || '',
        };
      }

      // Add tags for masterclass pre-registration
      subscriberData.tags = ['masterclass-preregister', 'website-subscriber'];

      // Make request to Mailchimp API
      const mailchimpUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

      const response = await fetch(mailchimpUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      const data = await response.json();

      if (response.ok) {
        res.status(200).json({
          success: true,
          message: 'Successfully subscribed! You\'ll be notified when new masterclasses launch.',
          email: email
        });
      } else {
        // Handle Mailchimp errors
        if (data.title === 'Member Exists') {
          // Update existing member with masterclass tag
          const crypto = require('crypto');
          const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
          const updateUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}`;

          const updateResponse = await fetch(updateUrl, {
            method: 'PATCH',
            headers: {
              'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tags: [
                { name: 'masterclass-preregister', status: 'active' }
              ]
            }),
          });

          if (updateResponse.ok) {
            res.status(200).json({
              success: true,
              message: 'You\'re already subscribed! We\'ve updated your preferences for masterclass notifications.',
              email: email
            });
          } else {
            res.status(400).json({
              error: 'You\'re already subscribed to our newsletter.'
            });
          }
        } else {
          console.error('Mailchimp API error:', data);
          res.status(400).json({
            error: data.detail || 'Failed to subscribe. Please try again.'
          });
        }
      }
    } catch (error) {
      console.error('Masterclass subscription error:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  });
});

// Assessment Completion Function with Follow-up Email
export const completeAssessment = functions.https.onRequest(async (req, res) => {
  // Handle CORS
  cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    try {
      const { email, firstName, lastName, assessmentScore, lowestScoringPillar, topRecommendations } = req.body;

      if (!email) {
        res.status(400).json({ error: 'Email is required' });
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Invalid email format' });
        return;
      }

      // Prepare subscriber data with assessment completion
      const subscriberData: any = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || '',
          ASCORE: assessmentScore || '',
          LOWPILLAR: lowestScoringPillar || '',
          TOPRECS: topRecommendations || ''
        },
        tags: ['biohacking-assessment-completed', 'assessment-lead', 'masterclass-nurture']
      };

      // Make request to Mailchimp API
      const mailchimpUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

      const response = await fetch(mailchimpUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriberData),
      });

      const data = await response.json();

      if (response.ok || data.title === 'Member Exists') {
        // If member exists, update their tags and merge fields
        if (data.title === 'Member Exists') {
          const crypto = require('crypto');
          const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
          const updateUrl = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}`;

          await fetch(updateUrl, {
            method: 'PATCH',
            headers: {
              'Authorization': `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              merge_fields: subscriberData.merge_fields,
              tags: [
                { name: 'biohacking-assessment-completed', status: 'active' },
                { name: 'assessment-lead', status: 'active' },
                { name: 'masterclass-nurture', status: 'active' }
              ]
            }),
          });
        }

        res.status(200).json({
          success: true,
          message: 'Assessment completed\! Check your email for your personalised recommendations and masterclass access.',
          email: email,
          followUpScheduled: true
        });

      } else {
        console.error('Mailchimp API error:', data);
        res.status(400).json({
          error: data.detail || 'Failed to process assessment. Please try again.'
        });
      }

    } catch (error) {
      console.error('Assessment completion error:', error);
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  });
});
