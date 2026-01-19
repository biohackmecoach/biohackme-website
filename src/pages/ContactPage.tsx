import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { sendContactEmail } from '../utils/email'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email || !formData.message) return

    setIsSubmitting(true)

    const result = await sendContactEmail(formData)

    if (result.success) {
      setShowSuccess(true)
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      }, 5000)
    } else {
      alert('Failed to send message. Please try again or email us directly at hello@biohackme.com.au')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact | BiohackMe - Get In Touch with Camilla</title>
        <meta name="description" content="Contact Camilla Arnoldussen for biohacking coaching, speaking engagements, media inquiries, and wellness consultations. Please reach out with any questions." />
        <meta name="keywords" content="contact Camilla, biohacking coach contact, health coaching inquiries, speaking engagements, media inquiries" />
        <meta property="og:title" content="Contact | BiohackMe - Get In Touch" />
        <meta property="og:description" content="Contact Camilla for biohacking coaching, speaking engagements, and wellness consultations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/contact" />
        <link rel="canonical" href="https://www.biohackme.com.au/contact" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact | BiohackMe - Get In Touch" />
        <meta name="twitter:description" content="Contact Camilla for biohacking coaching, speaking engagements, and wellness consultations." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.biohackme.com.au"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://www.biohackme.com.au/contact"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Header />

      {/* Hero Section with Dark Background */}
      <section className="relative bg-gradient-to-br from-ocean to-sky text-white min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-36 md:pt-40 lg:pt-48 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-white">
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your health? I'd love to hear about your wellness journey and how we can work together.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Contact Methods Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-ice/50 to-cloud/50 p-8 rounded-2xl text-center border border-ocean/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean mb-2">1:1 Coaching</h3>
              <p className="text-gray-600 mb-4">Personalised biohacking protocols tailored to your unique goals</p>
              <Link to="/superchargeyourlife" className="text-ocean hover:text-sky font-medium">Learn More →</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-sky/10 to-ocean/10 p-8 rounded-2xl text-center border border-sky/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-sky to-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean mb-2">Speaking</h3>
              <p className="text-gray-600 mb-4">Keynote presentations and corporate wellness workshops</p>
              <Link to="/talks" className="text-ocean hover:text-sky font-medium">View Speaking →</Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-ocean/10 to-ice/50 p-8 rounded-2xl text-center border border-ocean/20"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean mb-2">Media</h3>
              <p className="text-gray-600 mb-4">Interviews, podcast appearances, and press opportunities</p>
              <Link to="/media" className="text-ocean hover:text-sky font-medium">View Media →</Link>
            </motion.div>
          </div>
        </section>

        {/* Main Contact Section - Form + Photo Side by Side */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
          {!showSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ocean focus:ring-2 focus:ring-ocean/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="coaching">1:1 Coaching</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="media">Media Inquiry</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  placeholder="Tell me about your goals and how I can help you..."
                />
              </div>

              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className={`bg-gradient-to-r from-ocean to-sky text-white px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center bg-green-50 p-12 rounded-lg border-2 border-green-200"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thanks for submitting!</h2>
              <p className="text-gray-600">
                I'll get back to you within 24-48 hours.
              </p>
            </motion.div>
          )}
          </motion.div>

          {/* Photo and Greeting - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="bg-gradient-to-br from-ice/30 to-cloud/30 p-8 rounded-3xl border border-ocean/10">
              <img
                src="/images/camilla-main-headshot.jpg.webp"
                alt="Camilla Thompson - BiohackMe Coach"
                className="w-56 h-56 object-cover rounded-2xl mx-auto lg:mx-0 mb-6 shadow-lg"
              />
              <div className="max-w-md mx-auto lg:mx-0">
                <h3 className="text-3xl font-bold text-ocean mb-4">Hi, I'm Camilla!</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  I'd love to hear from you. Whether you're curious about biohacking, need guidance on your wellness journey,
                  or want to discuss speaking opportunities, I'm here to help.
                </p>

                {/* Quick Contact Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <a href="mailto:hello@biohackme.com.au" className="text-ocean hover:text-sky font-medium text-lg">
                      hello@biohackme.com.au
                    </a>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-10 h-10 bg-sky rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-lg">Response within 24-48 hours</span>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <p className="text-sm text-gray-500 mb-3">Follow @BIOHACKMECOACH</p>
                  {/* Social Media Icons */}
                  <div className="flex justify-center lg:justify-start gap-3">
                    <a href="https://www.instagram.com/biohackmecoach/" target="_blank" rel="noopener noreferrer"
                       className="w-8 h-8 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw" target="_blank" rel="noopener noreferrer"
                       className="w-8 h-8 bg-gradient-to-r from-sky to-ocean rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="https://www.tiktok.com/@biohackmecoach" target="_blank" rel="noopener noreferrer"
                       className="w-8 h-8 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>

      </div>
      
      <Footer />
    </div>
  )
}