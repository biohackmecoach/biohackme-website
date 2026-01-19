import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { functions } from '../config/firebase'
import { httpsCallable } from 'firebase/functions'

export default function FreebiePage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    acceptMarketing: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    setIsSubmitting(true)

    try {
      // Call Firebase Function directly to add to Mailchimp
      const addToMailchimp = httpsCallable(functions, 'addToMailchimp')

      const result = await addToMailchimp({
        email: formData.email.trim().toLowerCase(),
        firstName: formData.firstName,
        source: 'freebie-download'
      })

      console.log('✅ Freebie Lead added to Mailchimp:', result)

      setShowSuccess(true)

      // Trigger download after successful subscription
      const link = document.createElement('a')
      link.href = '/biohackme-guide.pdf'
      link.download = 'BiohackMe-Guide.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

    } catch (error) {
      console.error('❌ Mailchimp subscription failed:', error)
      // Still show success and download - don't block user
      setShowSuccess(true)

      const link = document.createElement('a')
      link.href = '/biohackme-guide.pdf'
      link.download = 'BiohackMe-Guide.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const benefits = [
    "WTF is Biohacking?",
    "What is a Biohacker Mindset?",
    "Biohacking Framework",
    "Biohacking on a Budget",
    "Biohacking for Women",
    "Biohacking for Men",
    "Biohacking Technologies",
    "Top 10 Biohacks"
  ]

  return (
    <>
      <Helmet>
        <title>Free Biohacking Guide | Ultimate Biohacker's Starter Kit | BiohackMe Australia</title>
        <meta name="description" content="Download your FREE comprehensive biohacking guide. Learn the top 10 biohacks, budget-friendly strategies, and technologies to optimize your health. Get instant access to the ultimate biohacker's starter kit." />
        <meta name="keywords" content="free biohacking guide, biohacking ebook, health optimisation guide, biohacking starter kit, biohacking budget, top biohacks, biohacking Australia" />
        <meta property="og:title" content="Free Biohacking Guide | Ultimate Biohacker's Starter Kit" />
        <meta property="og:description" content="Download your FREE comprehensive biohacking guide with top 10 biohacks, budget strategies, and technologies to optimize your health." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/freebie" />
        <meta property="og:image" content="https://www.biohackme.com.au/biohacking-guide-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Biohacking Guide | Ultimate Biohacker's Starter Kit" />
        <meta name="twitter:description" content="Get instant access to the ultimate biohacker's starter kit with top 10 biohacks and budget-friendly strategies." />
        <link rel="canonical" href="https://www.biohackme.com.au/freebie" />
        
        {/* Schema markup for Freebie */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "name": "BiohackMe Ultimate Guide",
            "description": "Comprehensive biohacking guide covering the fundamentals, technologies, and practical strategies for health optimisation",
            "author": {
              "@type": "Person",
              "name": "Camilla Arnoldussen",
              "jobTitle": "Biohacking Coach"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BiohackMe",
              "url": "https://www.biohackme.com.au"
            },
            "datePublished": "2024-12-01",
            "inLanguage": "en-AU",
            "isAccessibleForFree": true,
            "keywords": ["biohacking", "health optimisation", "wellness", "performance enhancement", "longevity"]
          })}
        </script>
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
                "name": "Free Biohacking Guide",
                "item": "https://www.biohackme.com.au/freebie"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <Header />
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean via-sky to-charcoal">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-10 md:right-20 w-48 md:w-96 h-48 md:h-96 bg-sky rounded-full mix-blend-multiply filter blur-3xl animate-float" />
            <div className="absolute bottom-20 left-10 md:left-20 w-48 md:w-96 h-48 md:h-96 bg-ice rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <span className="bg-gradient-to-r from-sky to-ice text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                    Free Download
                  </span>
                </motion.div>
                
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-serif font-bold mb-4 md:mb-6 leading-tight">
                  BIOHACKME GUIDE
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-white/90 mb-8 leading-relaxed font-medium">
                  Download my FREE BIOHACKME GUIDE!
                </h2>

                <div className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <svg className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-6"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky">35</div>
                    <div className="text-sm text-white/60">Pages</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-ice">10+</div>
                    <div className="text-sm text-white/60">Biohacks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cloud">100%</div>
                    <div className="text-sm text-white/60">Free</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {!showSuccess ? (
                  <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-10">
                    <div className="text-center">
                      <img 
                        src="/images/Freebie.webp"
                        alt="BiohackMe Guide"
                        className="w-full max-w-sm mx-auto rounded-lg shadow-lg mb-8"
                      />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="Enter your email here"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-ocean focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="acceptMarketing"
                          name="acceptMarketing"
                          checked={formData.acceptMarketing}
                          onChange={handleChange}
                          className="mt-1 mr-3 w-4 h-4 text-ocean border-gray-300 rounded focus:ring-ocean"
                        />
                        <label htmlFor="acceptMarketing" className="text-sm text-gray-600">
                          Yes, I'd like to receive biohacking tips and exclusive offers via email. 
                          I can unsubscribe at any time.
                        </label>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-premium text-white py-4 rounded-xl font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Subscribe & Download Free Guide'
                        )}
                      </motion.button>

                      <p className="text-xs text-gray-500 text-center">
                        We respect your privacy. Your information is safe and will never be shared.
                      </p>
                    </form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-10 text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-ocean to-sky rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h2 className="text-3xl font-serif font-bold mb-4">Thank You for Downloading the Guide!</h2>
                    <p className="text-gray-600 mb-6">
                      Your BiohackMe Guide is downloading now.
                      This will also be sent to you by email shortly.
                    </p>
                    
                    <motion.a
                      href="/biohackme-guide.pdf"
                      download="BiohackMe-Guide.pdf"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-ocean text-white px-8 py-3 rounded-full font-medium inline-block hover:bg-charcoal transition-colors shadow-lg"
                    >
                      Download Now
                    </motion.a>
                    
                    <p className="text-sm text-gray-500 mt-6">
                      Didn't receive it? Check your spam folder or{' '}
                      <button className="text-ocean hover:text-charcoal underline">
                        contact support
                      </button>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-4 md:mb-6">What's Inside The Guide</h2>
            <p className="text-xl text-gray-700">
              Everything you need to start your biohacking journey
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "WTF is Biohacking?",
                  description: "A global phenomenon making significant impact on personalised health and longevity through advancements in technology and research."
                },
                {
                  title: "What is a Biohacker Mindset?",
                  description: "Embracing curiosity, experimentation, self-responsibility, and a proactive approach to personal wellbeing."
                },
                {
                  title: "Biohacking Framework",
                  description: "The 8-pillar system covering sleep, mood, body, energy, health, brain, relationships, and environment."
                },
                {
                  title: "Biohacking on a Budget",
                  description: "Simple, evidence-based strategies using readily available resources to optimise your health without breaking the bank."
                },
                {
                  title: "Biohacking for Women",
                  description: "Tailored approaches including hormonal cycle tracking, toxin reduction, and strength training for bone health."
                },
                {
                  title: "Biohacking for Men",
                  description: "Optimise testosterone levels through exercise, nutrition, stress management, and intermittent fasting."
                },
                {
                  title: "Biohacking Technologies",
                  description: "Advanced tools including ice baths, CGM, red light therapy, PEMF, ozone therapy, and wearable devices."
                },
                {
                  title: "Top 10 Biohacks",
                  description: "My personal favourite biohacks including fasting, hydration with Celtic sea salt, sleep optimisation, and more."
                }
              ].map((chapter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-ocean/5 to-sky/10 p-6 rounded-2xl border border-ocean/20 hover:shadow-lg transition-all hover:border-ocean/30"
                >
                  <h3 className="font-bold text-lg mb-3 text-ocean">{chapter.title}</h3>
                  <p className="text-gray-700">{chapter.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-ocean to-sky text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-4 md:mb-6">
              Start Your Transformation Today
            </h2>
            <p className="text-xl mb-8 text-ice">
              Join thousands who have already downloaded their guide and started optimising their health
            </p>
            
            <motion.a
              href="#top"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-ice text-ocean px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-medium inline-block hover:bg-white transition-colors shadow-lg"
            >
              Get Your Free Guide Now
            </motion.a>
            
            <p className="mt-6 text-ice/80 text-sm">
              No credit card required • Instant download • 100% free
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}