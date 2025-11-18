// Email service using EmailJS for contact form
// You'll need to sign up at https://www.emailjs.com/ and get your keys

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  subject: string
  message: string
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    // For now, we'll use a simple form submission approach
    // You can replace this with EmailJS or another email service

    // Create a mailto link with the form data
    const subject = encodeURIComponent(`Contact Form: ${formData.subject}`)
    const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

---
Sent from BiohackMe contact form
    `)

    const mailtoUrl = `mailto:hello@biohackme.com.au?subject=${subject}&body=${body}`

    // Open default email client
    window.location.href = mailtoUrl

    return { success: true }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Alternative EmailJS implementation (requires setup)
export const sendContactEmailViaEmailJS = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Uncomment and configure these when you set up EmailJS
    // const emailjs = (window as any).emailjs
    // const result = await emailjs.send(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   {
    //     to_email: 'hello@biohackme.com.au',
    //     from_name: `${formData.firstName} ${formData.lastName}`,
    //     from_email: formData.email,
    //     phone: formData.phone,
    //     subject: formData.subject,
    //     message: formData.message
    //   },
    //   'YOUR_PUBLIC_KEY'
    // )
    // return { success: true }

    // For now, fall back to mailto
    return sendContactEmail(formData)
  } catch (error) {
    console.error('EmailJS error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}