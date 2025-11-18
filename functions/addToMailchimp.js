const functions = require('firebase-functions')
const fetch = require('node-fetch')

const MAILCHIMP_API_KEY = 'a0ea152d1144e3b3d7d6c117d914e686-us4'
const AUDIENCE_ID = 'e84f95f298'
const DATA_CENTER = 'us4'

exports.addToMailchimp = functions.https.onCall(async (data, context) => {
  try {
    const { email, source, firstName } = data

    if (!email) {
      throw new functions.https.HttpsError('invalid-argument', 'Email is required')
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid email format')
    }

    const url = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {},
      tags: []
    }

    // Add first name if provided
    if (firstName) {
      subscriberData.merge_fields.FNAME = firstName
    }

    // Add source tag
    if (source) {
      subscriberData.tags.push(source)
    }

    // Add timestamp tag
    const today = new Date().toISOString().split('T')[0]
    subscriberData.tags.push(`subscribed-${today}`)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData)
    })

    const result = await response.json()

    if (response.ok || response.status === 400) {
      // 400 might mean user already exists, which is okay
      if (result.title === 'Member Exists') {
        // Update existing member with new tags
        // FIX: Use MD5 hash instead of Base64 (Mailchimp requirement)
        const crypto = require('crypto')
        const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
        const updateUrl = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${emailHash}`

        const updateResponse = await fetch(updateUrl, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: subscriberData.tags.map(tag => ({ name: tag, status: 'active' }))
          })
        })

        if (updateResponse.ok) {
          return { success: true, message: 'Successfully updated existing subscriber with new tags' }
        }
      }

      return { success: true, message: 'Successfully subscribed to wellness coach audience' }
    }

    console.error('Mailchimp API Error:', result)
    throw new functions.https.HttpsError('internal', `Mailchimp API Error: ${result.detail || 'Unknown error'}`)

  } catch (error) {
    console.error('Function Error:', error)
    if (error instanceof functions.https.HttpsError) {
      throw error
    }
    throw new functions.https.HttpsError('internal', 'Failed to subscribe to mailing list')
  }
})