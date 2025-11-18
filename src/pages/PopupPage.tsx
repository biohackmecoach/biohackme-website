import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, X } from 'lucide-react'

export default function PopupPage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.firstName) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit to Mailchimp via Firebase function
      const response = await fetch('https://us-central1-biohackme-app-379de.cloudfunctions.net/subscribeToNewsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: '',
          tags: ['guide-download', 'meta-ads-lead']
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        // Trigger PDF download
        setTimeout(() => {
          const link = document.createElement('a')
          link.href = '/biohackme-guide.pdf'
          link.download = 'BiohackMe-Guide.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }, 1000)
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClose = () => {
    window.close()
  }

  if (showSuccess) {
    return (
      <>
        <Helmet>
          <title>Download Starting - BiohackMe Guide</title>
        </Helmet>

        <div className="min-h-screen bg-gradient-to-br from-ocean to-sky flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-ocean mb-4">
              Success! Your download is starting...
            </h2>

            <p className="text-charcoal/80 mb-6">
              Your FREE BiohackMe guide should download automatically. If it doesn't, check your downloads folder.
            </p>

            <p className="text-sm text-charcoal/60 mb-6">
              You've also been added to our newsletter for exclusive biohacking tips!
            </p>

            <button
              onClick={handleClose}
              className="bg-ocean hover:bg-ocean/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Close Window
            </button>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Get Your FREE BiohackMe Guide | What if Everything About Ageing is Outdated?</title>
        <meta name="description" content="Download your FREE comprehensive biohacking guide. Learn science-backed strategies to defy traditional limitations of ageing." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-ocean to-sky flex items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-ice transition-colors"
          title="Close window"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
        >
          {/* Guide Preview Image */}
          <div className="text-center mb-6">
            <img
              src="/images/Freebie.webp"
              alt="BiohackMe Free Guide Preview"
              className="w-32 h-auto mx-auto rounded-lg shadow-lg mb-4"
            />

            <h1 className="text-2xl md:text-3xl font-bold text-ocean mb-2">
              Get Your FREE BiohackMe Guide
            </h1>

            <h2 className="text-lg font-semibold text-sky mb-4">
              What if Everything About Ageing is Outdated?
            </h2>

            <p className="text-charcoal/80 text-sm">
              Join thousands who've discovered science-backed strategies to defy traditional limitations of ageing through biohacking.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-sky/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-sky/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky focus:border-transparent"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full font-semibold py-4 px-6 rounded-lg text-white text-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-charcoal/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-ocean to-sky hover:shadow-xl'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Download FREE Guide Now'}
            </motion.button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-sky/20">
            <div className="flex items-center justify-center space-x-6 text-sm text-charcoal/70">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-1" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-1" />
                <span>100% FREE</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-1" />
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}