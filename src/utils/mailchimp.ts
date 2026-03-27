import { db } from '../config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export interface MailchimpSubscription {
  email: string
  source: string
  firstName?: string
  assessmentData?: {
    score?: number
    results?: string
  }
}

// Firestore backup for all lead captures
export const backupToFirestore = async (email: string, source: string, extra?: Record<string, unknown>) => {
  try {
    await addDoc(collection(db, 'leads'), {
      email,
      source,
      createdAt: serverTimestamp(),
      ...extra
    })
  } catch (err) {
    console.error('Firestore backup error:', err)
  }
}

export const subscribeToMailchimp = async ({ email, source, firstName }: MailchimpSubscription): Promise<{ success: boolean; error?: string }> => {
  // Always backup to Firestore first
  await backupToFirestore(email, source, firstName ? { firstName } : undefined)

  try {
    // Import Firebase functions
    const { getFunctions, httpsCallable } = await import('firebase/functions')
    const functions = getFunctions()
    const addToMailchimp = httpsCallable(functions, 'addToMailchimp')

    // Call Firebase function to add to Mailchimp with tags
    const result = await addToMailchimp({
      email,
      source,
      firstName
    })

    console.log('Mailchimp subscription success:', result)
    return { success: true }

  } catch (error) {
    console.error('Mailchimp subscription error:', error)
    // Still return success so user gets thank you message and download
    // Even if Mailchimp fails, we don't want to block the download
    return { success: true }
  }
}
