const functions = require('firebase-functions')
const fetch = require('node-fetch')

const MAILCHIMP_API_KEY = 'a0ea152d1144e3b3d7d6c117d914e686-us4'
const AUDIENCE_ID = 'e84f95f298'
const DATA_CENTER = 'us4'

exports.subscribeToNewsletter = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).send('')
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { email, firstName, lastName, tags } = req.body

    if (!email) {
      res.status(400).json({ error: 'Email is required' })
      return
    }

    if (!firstName) {
      res.status(400).json({ error: 'First name is required' })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' })
      return
    }

    const url = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

    const subscriberData = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName
      },
      tags: []
    }

    // Add last name if provided
    if (lastName) {
      subscriberData.merge_fields.LNAME = lastName
    }

    // Add custom tags if provided
    if (tags && Array.isArray(tags)) {
      subscriberData.tags = tags
    }

    // Add timestamp tag
    const today = new Date().toISOString().split('T')[0]
    subscriberData.tags.push(`subscribed-${today}`)

    console.log('Subscribing to Mailchimp:', subscriberData)

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscriberData)
    })

    const result = await response.json()
    console.log('Mailchimp response:', result)

    if (response.ok || response.status === 400) {
      // 400 might mean user already exists, which is okay
      if (result.title === 'Member Exists') {
        // Update existing member with new tags if provided
        if (tags && tags.length > 0) {
          const memberHash = Buffer.from(email.toLowerCase()).toString('hex')
          const updateUrl = `https://${DATA_CENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${memberHash}/tags`

          const updateResponse = await fetch(updateUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tags: tags.map(tag => ({ name: tag, status: 'active' }))
            })
          })

          if (updateResponse.ok) {
            res.status(200).json({ success: true, message: 'Successfully updated existing subscriber with new tags' })
            return
          }
        }

        res.status(200).json({ success: true, message: 'Email already subscribed' })
        return
      }

      res.status(200).json({ success: true, message: 'Successfully subscribed to newsletter' })
      return
    }

    console.error('Mailchimp API Error:', result)
    res.status(500).json({ error: `Mailchimp API Error: ${result.detail || 'Unknown error'}` })

  } catch (error) {
    console.error('Function Error:', error)
    res.status(500).json({ error: 'Failed to subscribe to newsletter' })
  }
})