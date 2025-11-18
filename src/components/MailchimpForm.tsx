import React, { useState } from 'react'

interface MailchimpFormProps {
  formId: string
  actionUrl: string
  onSuccess?: () => void
  buttonText?: string
  placeholder?: string
  source?: string
  customStyles?: boolean
}

const MailchimpForm: React.FC<MailchimpFormProps> = ({
  formId,
  actionUrl,
  onSuccess,
  buttonText = "Get Results",
  placeholder = "Enter your email address",
  source = "website",
  customStyles = true
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Create hidden form and submit to Mailchimp
    const form = document.createElement('form')
    form.action = actionUrl
    form.method = 'post'
    form.target = '_blank'
    form.style.display = 'none'

    // Email input
    const emailInput = document.createElement('input')
    emailInput.type = 'email'
    emailInput.name = 'EMAIL'
    emailInput.value = email

    // Source tag
    const sourceInput = document.createElement('input')
    sourceInput.type = 'hidden'
    sourceInput.name = 'MMERGE1' // Adjust field name based on your Mailchimp setup
    sourceInput.value = source

    // Anti-bot field
    const botInput = document.createElement('input')
    botInput.type = 'text'
    botInput.name = `b_${formId}`
    botInput.tabIndex = -1
    botInput.style.position = 'absolute'
    botInput.style.left = '-5000px'

    form.appendChild(emailInput)
    form.appendChild(sourceInput)
    form.appendChild(botInput)
    document.body.appendChild(form)

    form.submit()
    document.body.removeChild(form)

    // Show success state
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      onSuccess?.()
    }, 1000)
  }

  if (showSuccess) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '20px',
        background: customStyles ? '#f0f9ff' : undefined,
        borderRadius: customStyles ? '12px' : undefined,
        border: customStyles ? '2px solid #0ea5e9' : undefined
      }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
        <h3 style={{
          color: customStyles ? '#0369a1' : '#333',
          marginBottom: '10px'
        }}>
          Successfully subscribed!
        </h3>
        <p style={{ color: customStyles ? '#0284c7' : '#666' }}>
          Check your email for your results and exclusive biohacking tips.
        </p>
      </div>
    )
  }

  if (customStyles) {
    return (
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          style={{
            padding: '15px',
            border: '2px solid #E8F4FD',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
          }}
          onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
          onBlur={(e) => e.target.style.borderColor = '#E8F4FD'}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? '#ccc' : '#4A90E2',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.background = '#1E3A8A'
              e.target.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.background = '#4A90E2'
              e.target.style.transform = 'translateY(0)'
            }
          }}
        >
          {isSubmitting ? 'Subscribing...' : buttonText}
        </button>
      </form>
    )
  }

  // Basic form without custom styles
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Subscribing...' : buttonText}
      </button>
    </form>
  )
}

export default MailchimpForm