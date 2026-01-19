import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function GuidePage() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    acceptMarketing: false
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
          tags: ['guide-download', 'guide-page-lead']
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
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <>
      <Helmet>
        <title>Free Biohacking Guide | What if Everything You've Been Told About Ageing is Outdated? | BiohackMe</title>
        <meta name="description" content="Download your FREE comprehensive biohacking guide. What if everything you've been told about ageing is outdated? Learn science-backed strategies to defy traditional limitations of ageing through biohacking." />
        <meta name="keywords" content="free biohacking guide, aging outdated, longevity secrets, biohacking ebook, health optimisation guide, biohacking starter kit, anti-aging biohacking, biohacking Australia" />
        <meta property="og:title" content="Free Biohacking Guide | What if Everything About Ageing is Outdated?" />
        <meta property="og:description" content="Download your FREE guide to defy the traditional limitations of ageing through science-backed biohacking strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/guide" />
        <meta property="og:image" content="https://www.biohackme.com.au/biohacking-guide-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Biohacking Guide | What if Everything About Ageing is Outdated?" />
        <meta name="twitter:description" content="Get instant access to science-backed strategies to defy aging through biohacking." />
        <link rel="canonical" href="https://www.biohackme.com.au/guide" />

        {/* Schema markup for Guide */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "name": "BiohackMe Ultimate Guide - Defy Ageing",
            "description": "Comprehensive biohacking guide to defy traditional limitations of ageing through science-backed longevity strategies",
            "author": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "Biohacking Expert & Nutritionist"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BiohackMe",
              "url": "https://www.biohackme.com.au"
            },
            "datePublished": "2024-12-01",
            "inLanguage": "en-AU",
            "isAccessibleForFree": true,
            "keywords": ["biohacking", "anti-aging", "longevity", "health optimisation", "wellness", "performance enhancement"]
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section - Image Left, Content Right */}
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start mb-20">

              {/* Left - Camilla's Image + Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-1"
              >
                <img
                  src="/images/camilla-main-headshot.jpg.webp"
                  alt="Camilla Thompson - Biohacking Expert"
                  className="w-full max-w-xl mx-auto rounded-lg shadow-lg mb-8"
                />

                {/* Lead Capture Form - Under Image */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 border border-sky/20">
                  <h3 className="text-lg font-semibold text-ocean mb-4 text-center">
                    Get Your FREE Guide Now
                  </h3>

                  {showSuccess ? (
                    <div className="text-center">
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                        ✅ Success! Your download should start automatically.
                      </div>
                      <p className="text-sm text-ocean/70">
                        Check your downloads folder if it doesn't appear.
                      </p>
                    </div>
                  ) : (
                    <form id="hero-form" onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-sky/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky"
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-sky/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 ${
                          isSubmitting
                            ? 'bg-charcoal/50 text-white cursor-not-allowed'
                            : 'bg-sky hover:bg-sky/90 text-white hover:scale-105 shadow-lg'
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : 'Download My FREE BIOHACKME GUIDE Now'}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Right - Main Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 md:order-2 space-y-8 pt-8"
              >
                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-ocean leading-tight">
                    WHAT IF EVERYTHING YOU'VE BEEN TOLD ABOUT AGEING…
                    <span className="text-sky block mt-4">IS OUTDATED?</span>
                  </h1>

                  <h2 className="text-xl md:text-2xl font-semibold text-ocean">
                    <span className="text-sky font-bold">BIOHACKME</span> by Camilla Thompson
                  </h2>
                </div>

                <div className="space-y-4 text-lg text-ocean/80 leading-relaxed">
                  <p>
                    What if we could defy the traditional limitations of ageing, by unraveling the secrets of longevity through the lens of biohacking?
                  </p>

                  <p className="font-semibold text-ocean">
                    Biohacking isn't a trend. It's the future of health.
                  </p>

                  <p>
                    In a world of conflicting wellness advice, BioHackMe cuts through the noise. It's your science-backed, practical guide to biohacking… designed to future-proof your health and help you take control of your wellbeing.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Guide Details Section */}
            <div className="grid md:grid-cols-2 gap-12 items-start mb-20">

              {/* Left - What's in the Guide */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-200 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold text-ocean mb-6">
                  WHAT'S IN THIS GUIDE?
                </h3>

                <div className="space-y-3 text-ocean mb-8">
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>WTF is Biohacking?</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Biohackers Mindset?</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Biohacking Framework</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Biohacking on a Budget</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Biohacking Technologies</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Biohacking for Women</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Biohacking for Men</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sky font-bold mr-3">✓</span>
                    <span>Top 10 Biohacks</span>
                  </div>
                </div>

                <p className="text-ocean/80 mb-6">
                  This guide provides all the information, tips, and tricks you need to get started.
                </p>

                <button
                  onClick={() => {
                    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full bg-sky hover:bg-sky/90 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  DOWNLOAD FREE BIOHACKME GUIDE
                </button>
              </motion.div>

              {/* Right - Freebie Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <img
                  src="/images/Freebie.webp"
                  alt="BiohackMe Free Guide"
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Testimonial Section - Blue Background */}
        <section className="bg-ocean text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-sky font-semibold mb-4">
                  Carmen Bekker, Lead Partner, KPMG Consulting
                </p>
                <blockquote className="text-xl md:text-2xl leading-relaxed italic">
                  "Camilla is an absolutely fantastic wellness coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session."
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Camilla Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Left - Camilla's Hero Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="order-2 md:order-1"
                >
                  <img
                    src="/images/hero homepage.webp"
                    alt="Camilla Thompson - BiohackMe Coach"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </motion.div>

                {/* Right - About Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="order-1 md:order-2 space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-ocean">
                    Hello, I'm Camilla... On a mission to help people optimise their lives, one biohack at a time
                  </h2>

                  <h3 className="text-lg font-semibold text-sky">
                    Camilla Thompson - Nutritionist. Health Coach. PCC Coach. Biohacker. Wellbeing Expert. Keynote Speaker. Behaviour Change Expert. Founder of the BioHackMe framework.
                  </h3>

                  <div className="space-y-4 text-ocean/80 leading-relaxed">
                    <p>
                      After battling a mysterious, debilitating illness for many years, Biohacking became my lifeline to get well— and I discovered a path that not only healed my body, but elevated every part of my life and <strong className="text-ocean">reversed my age by 10 years</strong>.
                    </p>

                    <p>
                      Now, I help people like you unlock peak performance, boost vitality, and reclaim their wellbeing. <strong>One small daily adjustment at a time.</strong>
                    </p>

                    <p>
                      My approach blends ancient therapies with cutting-edge science. It's not woo-woo or fluff. It's not all tech. <strong className="text-sky">It's YOU, upgraded.</strong>
                    </p>

                    <p className="text-xl font-semibold text-ocean">
                      The world is waking up to the power of biohacking. Are you ready to lead the way?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Link
                      to="/about"
                      className="bg-sky hover:bg-sky/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      ABOUT ME
                    </Link>

                    <a
                      href="https://calendly.com/thewellnesscoachsession/15min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-sky hover:bg-sky/90 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      BOOK DISCOVERY CALL
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Contact - Blue Background */}
        <section className="bg-ocean text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-4">
              <p className="text-white/70">Connect with me:</p>
              <div className="flex justify-center space-x-6">
                <a
                  href="mailto:hello@biohackme.com.au"
                  className="text-sky hover:text-ice transition-colors"
                >
                  hello@biohackme.com.au
                </a>
                <a
                  href="https://instagram.com/biohackmecoach"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky hover:text-ice transition-colors"
                >
                  @BIOHACKMECOACH
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}