import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, X } from 'lucide-react'

interface CoachingContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function CoachingContactForm({ isOpen, onClose }: CoachingContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiry: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = 'Coaching Enquiry from ' + formData.name
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Enquiry Details:
${formData.enquiry}`

    const mailtoLink = `mailto:hello@biohackme.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Open email client
    window.location.href = mailtoLink

    // Close form
    onClose()

    // Reset form
    setFormData({ name: '', email: '', phone: '', enquiry: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-ocean mb-2 font-montserrat">
            Coaching Enquiry
          </h2>
          <p className="text-gray-600">
            Fill out the form below and we'll send your enquiry directly to Camilla's inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent transition-all"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent transition-all"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent transition-all"
              placeholder="+61 xxx xxx xxx"
            />
          </div>

          <div>
            <label htmlFor="enquiry" className="block text-sm font-medium text-gray-700 mb-2">
              Coaching Enquiry *
            </label>
            <textarea
              id="enquiry"
              name="enquiry"
              required
              rows={4}
              value={formData.enquiry}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your health goals and what you're looking for in a coaching program..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-ocean/90 hover:to-sky/90 transition-all duration-300"
          >
            <Send className="w-4 h-4" />
            <span>Send Enquiry</span>
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          This will open your email client to send the enquiry to hello@biohackme.com.au
        </p>
      </motion.div>
    </div>
  )
}