import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, ArrowRight, Dna, Clock, Calendar, MessageCircle, BookOpen, Award, Star, Zap, Shield, X } from 'lucide-react'
import { subscribeToMailchimp } from '../utils/mailchimp'

export default function TheUpgradePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    // Show success immediately, Mailchimp runs in background
    setIsSubmitted(true)
    setIsSubmitting(false)
    // Fire-and-forget - don't block UI
    subscribeToMailchimp({ email, source: 'theupgrade' }).catch(console.error)
  }

  const testimonials = [
    {
      name: "Renee Opperman",
      role: "Marketing Executive – Property & Construction",
      content: "Camilla is a fabulous executive wellbeing coach. Her guidance and support have been life-changing—both in my business and in life. She's not afraid of courageous conversations, delivered in a direct yet supportive way.",
    },
    {
      name: "Carly Daff",
      role: "Head of Teams & Education, Canva",
      content: "Camilla's guidance as a wellness coach over the past three years has been invaluable—both personally and professionally. She's helped me manage workload, set boundaries, and navigate complex work situations.",
    },
    {
      name: "Kevin Figueiredo",
      role: "Chief People & Safety Officer, Super Retail Group",
      content: "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies. Leaders left recharged and inspired.",
    }
  ]

  return (
    <>
      <Helmet>
        <title>The Upgrade: VIP Longevity Coaching | Biological Age Testing | Camilla Thompson</title>
        <meta name="description" content="Improve your biological age in 12 weeks. Private coaching with GlycanAge testing and MyDNA analysis for high performers. Only 10 spots available. Register now." />
        <meta name="keywords" content="executive health coaching Australia, biological age testing Australia, GlycanAge Australia, VIP health coaching, longevity coaching Sydney, executive wellness program, healthspan optimisation, reverse biological age, biohacking coach Australia, MyDNA testing, high performance coaching, founder health program, entrepreneur wellness, CEO health coaching" />
        <meta property="og:title" content="The Upgrade: VIP Longevity Coaching | Camilla Thompson" />
        <meta property="og:description" content="Reverse your biological age by 5-7 years in 12 weeks. Private coaching with advanced testing for high performers. Only 10 spots available." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://www.biohackme.com.au/the-upgrade" />
        <meta property="og:image" content="https://www.biohackme.com.au/images/og-thumbnail.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="product:price:amount" content="4500" />
        <meta property="product:price:currency" content="AUD" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Upgrade: VIP Longevity Coaching | Camilla Thompson" />
        <meta name="twitter:description" content="Reverse your biological age by 5-7 years in 12 weeks. Private coaching with advanced testing for high performers. Only 10 spots available." />
        <meta name="twitter:image" content="https://www.biohackme.com.au/images/og-thumbnail.jpg" />
        <link rel="canonical" href="https://www.biohackme.com.au/the-upgrade" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "The Upgrade - VIP Executive Health Coaching Program",
            "description": "Premium 12-week VIP coaching program for founders, entrepreneurs and leaders. Includes GlycanAge biological age testing, MyDNA genetic testing, and intensive 1:1 coaching with Camilla Thompson.",
            "brand": {
              "@type": "Brand",
              "name": "BioHackMe"
            },
            "offers": {
              "@type": "Offer",
              "price": "4500",
              "priceCurrency": "AUD",
              "availability": "https://schema.org/LimitedAvailability",
              "url": "https://www.biohackme.com.au/the-upgrade",
              "priceValidUntil": "2026-12-31"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "12"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Executive Health Coaching",
            "provider": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "Executive Health Coach & Nutritionist",
              "description": "ICF Professional Certified Coach, nationally recognised nutritionist, author of Biohack Me"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "The Upgrade Program Inclusions",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "GlycanAge Biological Age Test"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "MyDNA Genetic Testing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "12 Weeks 1:1 Coaching"
                  }
                }
              ]
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How are the tests done? Do I need to visit a clinic?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No clinic visits required. Both tests are shipped directly to you. GlycanAge is a simple finger-prick blood test you do at home. MyDNA is a cheek swab. Results arrive in approximately 2 weeks."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of results can I expect in 12 weeks?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Clients typically report more consistent energy, improved sleep quality, clearer thinking, and measurable improvements in biological age markers. Biological age improvements averaged 5-7 years within 12 weeks."
                }
              },
              {
                "@type": "Question",
                "name": "How much time do I need to commit each week?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sessions: 30 minutes fortnightly OR 60 minutes monthly. Weekly check-ins: 3-5 minutes. Total extra time: approximately 30-45 minutes per week for sessions and check-ins."
                }
              },
              {
                "@type": "Question",
                "name": "Is this program available internationally?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. All coaching is done via Zoom, and tests can be shipped internationally. Sessions are scheduled in Australian Eastern Time."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      {/* Semantic H1 for SEO - visually hidden */}
      <h1 className="sr-only">The Upgrade: VIP Longevity Coaching for High Performers - Biological Age Testing Australia</h1>

      {/* 1. Hero Section - Navy */}
      <section id="apply" className="relative min-h-[55vh] bg-ocean overflow-hidden flex items-center">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean via-ocean/90 to-ocean"></div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-ocean/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-sky/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo */}
            <motion.img
              src="/images/the-upgrade-logo.png"
              alt="The Upgrade - VIP Longevity Coaching Program"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-[280px] sm:w-[320px] md:w-[480px] lg:w-[600px] h-auto mx-auto mb-4 object-contain brightness-0 invert"
            />

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl md:text-3xl text-white font-light mb-2"
            >
              Perform Better. Age Slower.
            </motion.p>

            {/* Outcome claim */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl text-sky font-medium mb-6"
            >
              Optimise your health and improve your biological age in 12 weeks
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base md:text-lg text-white/80 mb-6 max-w-2xl mx-auto"
            >
              A high-performance longevity container for founders, entrepreneurs, leaders and high achievers.
            </motion.p>

            {/* Exclusivity + Deadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-sm text-white/70 mb-8"
            >
              <span className="font-bold">Only 10 VIP spots</span> | Intake closes March 15, 2026
            </motion.p>

            {/* CTA #1 - Email Capture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              {!showEmailForm && !isSubmitted && (
                <motion.button
                  onClick={() => setShowEmailForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-white text-ocean px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-sky/20 transition-all duration-300 shadow-lg"
                >
                  Register Your Interest <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              )}

              {showEmailForm && !isSubmitted && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-6 py-4 rounded-full text-charcoal text-center focus:outline-none focus:ring-2 focus:ring-sky"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-ocean px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Register Your Interest'}
                  </motion.button>
                </form>
              )}

              {isSubmitted && (
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-sky mx-auto mb-3" />
                  <p className="text-white text-lg font-medium">You're registered!</p>
                  <p className="text-white/70 text-sm mt-2">We'll be in touch within 24 hours to book your clarity call.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Mirror Moment - "You're not imagining it" */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img
                    src="/images/the-upgrade-hero.jpg"
                    alt="Healthy man with green smoothie"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-6">
                  Are you ageing faster than you're living?
                </h2>

                <p className="text-charcoal/70 mb-4">
                  You're not imagining it. Energy's down. Sleep? Patchy. Recovery takes forever.
                </p>

                <p className="text-charcoal/70 mb-4">
                  Here's what most people don't realise: your chronological age and your biological age aren't the same thing.
                </p>

                <p className="text-charcoal/70 mb-4">
                  You might be 45 on paper—but your body could be ageing like you're 38. Or 57.
                </p>

                <p className="text-charcoal font-medium mb-4">
                  Your biology is the real scorecard.
                </p>

                <p className="text-ocean font-semibold text-lg">
                  The difference is measurable. And it's changeable.
                </p>
              </motion.div>
            </div>

            {/* Camilla's 11-year quote - prominently displayed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 bg-ocean rounded-2xl p-8 text-center max-w-3xl mx-auto"
            >
              <p className="text-white text-xl md:text-2xl italic font-medium mb-3">
                "I've reduced my own biological age by 11 years through simple foundational biohacks. I know this works."
              </p>
              <p className="text-sky font-semibold">— Camilla Thompson</p>
              <p className="text-white/60 text-sm">Author of <em>Biohack Me</em></p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Are you ready to Upgrade - Solution Section */}
      <section className="py-12 md:py-20 bg-sky/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-6 text-center">
              Are you ready for your Upgrade?
            </h2>

            <p className="text-charcoal/70 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
              If you're a high performer who wants clarity, precision and longevity—keep reading.
            </p>

            <p className="text-charcoal/70 leading-relaxed mb-4 text-center max-w-3xl mx-auto">
              A 12-week private coaching program built for people who want to optimise how they function, reverse how they age, and unlock more capacity—mentally and physically.
            </p>

            <div className="bg-ocean rounded-2xl p-8 mb-12 text-center">
              <p className="text-white text-lg md:text-xl font-medium mb-4">
                Elite Performance Coaching. World-Class Diagnostics. Personalised Protocols.
              </p>
              <p className="text-sky text-sm md:text-base">
                Data-driven results with habits that actually stick.
              </p>
            </div>

            {/* Two Tests */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-ocean rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <Dna className="w-8 h-8 text-sky mr-3" />
                  <span className="text-sky text-xs font-medium uppercase tracking-wider">Included</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  <a href="https://glycanage.com/" target="_blank" rel="noopener noreferrer" className="hover:text-sky transition-colors">GlycanAge</a>
                </h3>
                <p className="text-white/70 text-sm">World-leading biological age test that measures how fast you're really ageing</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-ocean rounded-2xl p-8 shadow-xl"
              >
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-sky mr-3" />
                  <span className="text-sky text-xs font-medium uppercase tracking-wider">Included</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  <a href="https://nutripath.com.au/product/methylation-genetic-test-8009/" target="_blank" rel="noopener noreferrer" className="hover:text-sky transition-colors">MyDNA</a>
                </h3>
                <p className="text-white/70 text-sm">Reveals what your genes say about your optimal health strategy</p>
              </motion.div>
            </div>

            <p className="text-lg text-charcoal/70 leading-relaxed mb-12 text-center">
              Then we build your roadmap. Not generic advice. <strong className="text-charcoal">Your protocol, based on your data, for your life.</strong>
            </p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl text-ocean font-bold mt-12 text-center"
            >
              This is the UPGRADE you've been looking for.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 4. Carmen Testimonial */}
      <section className="py-10 bg-ocean">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <blockquote className="text-lg text-white/90 italic leading-relaxed mb-4">
              "Camilla is an absolutely fantastic coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session."
            </blockquote>
            <p className="text-sky font-semibold">Carmen Bekker</p>
            <p className="text-white/60 text-sm">Lead Partner, KPMG Consulting</p>
          </motion.div>
        </div>
      </section>

      {/* Self-Assessment - 5 Questions */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-4 text-center">
              Are you a fit for The Upgrade?
            </h2>
            <p className="text-charcoal/70 text-center mb-8">
              Answer these questions honestly. If you can say yes to 4 or more, you're likely a fit.
            </p>

            <div className="space-y-4">
              {[
                "Do you feel like your energy, recovery, or mental sharpness isn't where it should be—despite \"doing everything right\"?",
                "Have you tried supplements, diets, or health programs that didn't stick—or didn't give you real answers?",
                "Are you curious what your biology actually says about how you're ageing—beyond how you look or feel?",
                "Do you want a personalised strategy, not a generic plan that treats you like everyone else?",
                "Are you ready to invest in yourself at a level that matches what you'd invest in your business, career or family?"
              ].map((question, idx) => (
                <div
                  key={idx}
                  className="flex items-start bg-sky/10 rounded-xl p-5 border-l-4 border-ocean"
                >
                  <div className="w-8 h-8 bg-ocean rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-white font-bold text-sm">{idx + 1}</span>
                  </div>
                  <p className="text-charcoal text-base leading-relaxed pt-1">{question}</p>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <p className="text-ocean font-semibold text-lg mb-6">
                If you said yes to most of these—keep reading. This was built for you.
              </p>
              <motion.button
                onClick={() => {
                  setShowEmailForm(true)
                  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-ocean text-white px-8 py-3 rounded-full font-bold hover:bg-ocean/90 transition-all duration-300 shadow-lg"
              >
                Register Your Interest <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. "This is for you if" - Self-qualification with IS/ISN'T binary */}
      <section className="py-12 md:py-20 bg-sky/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* IS for you */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-8">
                  This IS for you if:
                </h2>
                <div className="space-y-4">
                  {[
                    "You're a high performer—but the cracks are showing (energy, recovery, mental clarity)",
                    "You've tried supplements, diets, programs—but nothing's stuck or given you real answers",
                    "You want to know what's actually happening in your biology, not guess",
                    "You're ready to invest properly in yourself—time, money, attention",
                    "You value expertise and want a coach who gets high-performance life",
                    "You're committed to making lasting changes, not just short-term fixes"
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start bg-white rounded-xl p-4 border-l-4 border-ocean"
                    >
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-charcoal text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* IS NOT for you */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal/50 mb-8">
                  This is NOT for you if:
                </h2>
                <div className="space-y-4">
                  {[
                    "You're looking for a quick fix or magic pill",
                    "You want someone to tell you what to do without understanding why",
                    "You're not willing to make changes to your daily habits",
                    "You expect results without putting in the work",
                    "You prefer DIY approaches and don't want coaching support",
                    "You're not open to trying new approaches based on your data"
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start bg-white/50 rounded-xl p-4 border-l-4 border-charcoal/20"
                    >
                      <X className="w-5 h-5 text-charcoal/40 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-charcoal/60 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Runner image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 max-w-md mx-auto"
            >
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src="/images/the-upgrade-runner.jpg"
                  alt="High performer running"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <p className="text-xl text-ocean font-medium mb-6">
                Sound like you? Keep reading.
              </p>
              <motion.button
                onClick={() => {
                  setShowEmailForm(true)
                  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-ocean text-white px-8 py-3 rounded-full font-bold hover:bg-ocean/90 transition-all duration-300 shadow-lg"
              >
                Register Your Interest <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* This is YOUR Upgrade - Post-assessment statement (Priestley leadership) */}
      <section className="py-12 md:py-16 bg-ocean">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              This is YOUR Upgrade.
            </h2>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-4">
              A precision-led longevity container for people who are ready to optimise, not experiment.
            </p>
            <p className="text-sky font-medium">
              You'll walk away with a personalised longevity strategy to boost your energy, sharpen your mind, strengthen your body, and extend your healthspan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Time Commitment - Addressing overwhelm */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-6 text-center">
              What's the time commitment?
            </h2>
            <p className="text-charcoal/70 text-center mb-8">
              This program is designed to fit into a busy life—not overwhelm it.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-sky/10 rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 text-ocean mx-auto mb-3" />
                <h3 className="font-bold text-ocean mb-2">Sessions</h3>
                <p className="text-charcoal/70 text-sm">30 mins fortnightly OR 60 mins monthly—your choice</p>
              </div>
              <div className="bg-sky/10 rounded-xl p-6 text-center">
                <MessageCircle className="w-8 h-8 text-ocean mx-auto mb-3" />
                <h3 className="font-bold text-ocean mb-2">Check-ins</h3>
                <p className="text-charcoal/70 text-sm">3–5 mins weekly to reply to a text</p>
              </div>
              <div className="bg-sky/10 rounded-xl p-6 text-center">
                <Zap className="w-8 h-8 text-ocean mx-auto mb-3" />
                <h3 className="font-bold text-ocean mb-2">Implementation</h3>
                <p className="text-charcoal/70 text-sm">We optimise what you're already doing—no extra blocks</p>
              </div>
            </div>

            <p className="text-center text-ocean font-medium mt-8">
              Total "extra" time: ~30–45 minutes per week. That's it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. The Upgrade Method - 3-Phase Proprietary Methodology */}
      <section className="py-12 md:py-20 bg-ocean">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              The Upgrade Method: How It Works
            </h2>

            <p className="text-white/80 leading-relaxed mb-12 text-center max-w-2xl mx-auto">
              This is a 3-phase system I have developed to achieve real, measurable results.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 border-t-4 border-sky"
              >
                <div className="w-12 h-12 bg-sky/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Baseline</h3>
                <p className="text-sm text-sky font-medium mb-3">Weeks 1–2</p>
                <p className="text-white/80 leading-relaxed">
                  GlycanAge biological age test + MyDNA genetic analysis. You'll know exactly how fast you're ageing and what your genes reveal about nutrition, sleep, stress and recovery.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 border-t-4 border-sky"
              >
                <div className="w-12 h-12 bg-sky/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Optimise</h3>
                <p className="text-sm text-sky font-medium mb-3">Weeks 3–8</p>
                <p className="text-white/80 leading-relaxed">
                  We design your personalised roadmap. Fortnightly deep dives, weekly check-ins, daily text access. Every protocol is tailored to your biology and tested in real-time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 border-t-4 border-sky"
              >
                <div className="w-12 h-12 bg-sky/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sustain</h3>
                <p className="text-sm text-sky font-medium mb-3">Weeks 9–12</p>
                <p className="text-white/80 leading-relaxed">
                  Refinement and lock-in. By now you know what works. We troubleshoot the gaps and set you up to continue optimising independently.
                </p>
              </motion.div>
            </div>

            <p className="text-center text-lg text-sky font-semibold mb-8">
              You walk away with your data, your protocol, and the tools to sustain it.
            </p>

          </motion.div>
        </div>
      </section>

      {/* Week by Week Breakdown */}
      <section className="py-12 md:py-16 bg-sky/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-4 text-center">
              Your 12-Week Journey
            </h2>
            <p className="text-charcoal/70 text-center mb-10">
              Here's exactly what happens, week by week.
            </p>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-ocean">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1–2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-ocean text-lg mb-2">Weeks 1–2: Baseline</h3>
                    <p className="text-charcoal/70">Complete your GlycanAge and MyDNA tests at home. We schedule your kickoff session and I start reviewing your health history.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-sky">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-sky rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3–4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-ocean text-lg mb-2">Weeks 3–4: Results & Roadmap</h3>
                    <p className="text-charcoal/70">Your test results arrive. We do a deep-dive session to analyse your biological age and genetic profile. Your personalised protocol is built.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-ocean">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">5–8</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-ocean text-lg mb-2">Weeks 5–8: Optimise</h3>
                    <p className="text-charcoal/70">Implementation phase. Fortnightly coaching sessions to refine your protocols. Weekly text check-ins keep you accountable. Real-time adjustments based on how your body responds.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-sky">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-sky rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">9–12</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-ocean text-lg mb-2">Weeks 9–12: Sustain</h3>
                    <p className="text-charcoal/70">Lock in what's working. Troubleshoot any remaining gaps. Build your long-term maintenance plan. You finish with everything you need to continue independently.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-10">
              <motion.button
                onClick={() => {
                  setShowEmailForm(true)
                  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-ocean text-white px-8 py-3 rounded-full font-bold hover:bg-ocean/90 transition-all duration-300 shadow-lg"
              >
                Register Your Interest <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. What's Included */}
      <section className="py-12 md:py-20 bg-ocean text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What's Included in Your Upgrade
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto mb-4">
                This is a high-touch, high-integrity coaching experience.
              </p>
              <p className="text-lg text-sky max-w-3xl mx-auto">
                Every component is deliberately selected to optimise your biology and build a future-proof healthspan strategy.
              </p>
            </div>

            {/* Package Items */}
            <div className="space-y-4 mb-12">
              {[
                {
                  icon: Dna,
                  title: "GlycanAge Biological Age Test",
                  desc: "World-leading immune age and inflammation testing + 1:1 results session with a GlycanAge longevity specialist",
                  value: "$900 value"
                },
                {
                  icon: Zap,
                  title: "MyDNA Genetic Health & Nutrition Test",
                  desc: "Your personalised genetic profile for diet, exercise, recovery and longevity",
                  value: "$799 value"
                },
                {
                  icon: Calendar,
                  title: "2 x 60-minute Deep Dive Strategy Sessions",
                  desc: "To analyse your data and build your custom protocol",
                  value: "$1,200 value"
                },
                {
                  icon: Clock,
                  title: "6 x 30-minute Fortnightly Coaching Sessions",
                  desc: "Accountability, momentum, optimisation",
                  value: "$1,800 value"
                },
                {
                  icon: MessageCircle,
                  title: "Weekly Text Check-Ins",
                  desc: "Real-time access to Camilla for on-the-go support",
                  value: "$500 value"
                },
                {
                  icon: Shield,
                  title: "Tailored Resources, Protocols + Integration Support",
                  desc: "Built for your body, your data, your outcomes",
                  value: "$500 value"
                },
                {
                  icon: BookOpen,
                  title: "Signed Copy of Biohack Me",
                  desc: "Camilla's bestselling guide to health optimisation — delivered at program start",
                  value: "$34.99"
                },
                {
                  icon: Award,
                  title: "Biohack Me Companion Journal",
                  desc: "A practical tool to track your journey and anchor results — delivered at program completion",
                  value: "$60"
                }
              ].map((item, idx) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-sky/20 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-ocean/30 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-sky" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm sm:text-base">{item.title}</h4>
                        <p className="text-white/60 text-xs sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                    <div className="text-sky font-medium text-sm sm:ml-4 pl-13 sm:pl-0">
                      {item.value}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Total Value - Sky box */}
            <div className="bg-sky rounded-t-2xl p-6 sm:p-8 text-center">
              <p className="text-ocean text-base sm:text-lg mb-2">Total program value exceeds</p>
              <p className="text-3xl sm:text-4xl font-bold text-ocean mb-2">$5,700 AUD</p>
              <p className="text-ocean/80 text-sm max-w-md mx-auto">Your investment reflects the level of access, diagnostics and personalisation involved.</p>
            </div>

            {/* Your Investment - White box */}
            <div className="bg-white rounded-b-2xl p-6 sm:p-8 text-center">
              <p className="text-charcoal/60 font-medium mb-1">Your investment:</p>
              <p className="text-3xl sm:text-4xl font-bold text-ocean">$4,500 AUD</p>
              <p className="text-charcoal/50 text-sm mt-2">Or 3 x monthly payments of $1,600</p>
            </div>

            {/* Optional Add-On */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 bg-sky/20 rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-sky/20 rounded-full flex items-center justify-center">
                    <Zap className="w-7 h-7 text-sky" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-sky font-medium uppercase tracking-wider">Optional Add-On</span>
                    </div>
                    <h4 className="text-xl font-bold text-white">WHOOP 5.0</h4>
                    <p className="text-white/60 text-sm">Includes strap + 12-month membership for real-time recovery, strain and sleep tracking</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-2xl font-bold text-sky">+$599</p>
                  <p className="text-white/50 text-xs">Available as add-on</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8. Why Only 10 + Commitment */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-6">
                  Why Only 10 People
                </h2>

                <p className="text-charcoal/70 mb-4">
                  This isn't scalable by design.
                </p>

                <p className="text-charcoal/70 mb-4">
                  Each client gets my direct phone number. Weekly text check-ins where I reach out personally—not an assistant. Protocols built specifically for your biology, not templated plans I copy-paste.
                </p>

                <p className="text-charcoal/70 mb-4">
                  When I tested this model on a few private clients, we saw biological age improvements averaging 5-7 years within 12 weeks.
                </p>

                <p className="text-charcoal font-medium mb-4">
                  That level of result requires this level of attention.
                </p>

                <p className="text-charcoal/70 mb-4">
                  I can't dilute that. So I won't.
                </p>

                <p className="text-ocean font-semibold">
                  If I take on more than 10 people, the quality drops. And I'm not willing to compromise on outcomes.
                </p>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img
                    src="/images/the-upgrade-fitness.jpg"
                    alt="Fitness equipment"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. About Camilla */}
      <section className="py-12 md:py-20 bg-sky/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <img
                  src="/images/How we work together/Biohackme website images13.webp"
                  alt="Camilla Thompson - Coach"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>

              <div>
                <p className="text-ocean font-medium mb-2">Led by</p>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">Camilla Thompson</h2>
                <p className="text-charcoal/70 mb-4">Coach working with C-suite executives on sustainable performance.</p>

                <ul className="space-y-2 text-charcoal/70 mb-4">
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-ocean mr-2 mt-1 flex-shrink-0" />ICF Professional Certified Coach</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-ocean mr-2 mt-1 flex-shrink-0" />Nationally recognised nutritionist</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-ocean mr-2 mt-1 flex-shrink-0" />Author of <em>Biohack Me</em> (Wiley)</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-ocean mr-2 mt-1 flex-shrink-0" />Best Group Retreat 2025 (Destination Deluxe)</li>
                  <li className="flex items-start"><CheckCircle className="w-4 h-4 text-ocean mr-2 mt-1 flex-shrink-0" />Featured: Sunrise, SMH, CEO Magazine</li>
                </ul>

                <p className="font-medium text-ocean text-sm mt-4 mb-2">
                  Nearly a decade mastering executive performance + health optimisation.
                </p>

                <p className="text-charcoal/60 text-xs mb-6 italic">
                  Discreet, confidential coaching. Your health data and conversations remain private.
                </p>

                <motion.a
                  href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center bg-ocean text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-ocean/90 transition-all duration-300 shadow-lg"
                >
                  Book a Clarity Call <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-ocean text-center mb-12">
              What Clients Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-charcoal/80 italic mb-4">"{testimonial.content}"</p>
                  <p className="font-semibold text-ocean">{testimonial.name}</p>
                  <p className="text-charcoal/60 text-sm">{testimonial.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="py-12 md:py-16 bg-ocean">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              What If This Doesn't Work?
            </h2>

            <p className="text-white/80 mb-4">
              Here's the reality: this isn't magic. It's science, data and coaching.
            </p>

            <p className="text-white/80 mb-4">
              If you show up—complete the testing, follow your protocols, use the coaching—you'll see measurable change. Every client who's finished this program has.
            </p>

            <p className="text-white/80 mb-6">
              But if you're expecting results without commitment? This isn't for you.
            </p>

            <p className="text-sky font-semibold text-lg">
              I only work with people who are ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-10 text-center">
              What Happens Next
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-ocean text-lg mb-1">Register your interest</h3>
                  <p className="text-charcoal/70">Enter your details to secure a place in the intake.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-ocean text-lg mb-1">Book a 15-minute clarity call</h3>
                  <p className="text-charcoal/70">We'll talk through where you're at, what you want to optimise, and whether The Upgrade is the right fit.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ocean rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-ocean text-lg mb-1">Decide together</h3>
                  <p className="text-charcoal/70">If it's aligned, we'll lock in your spot and begin onboarding.</p>
                </div>
              </div>
            </div>

            <p className="text-center text-ocean font-medium mt-10">
              Simple. No pressure. No obligation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investment + Final CTA */}
      <section className="py-12 md:py-16 bg-sky/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-ocean mb-6">Ready to Upgrade Your Health?</h2>

            <p className="text-3xl sm:text-5xl font-bold text-ocean mb-2">$4,500 AUD</p>

            <p className="text-charcoal/70 text-sm leading-relaxed mb-6">
              Premium coaching experience including all testing, analysis and 12 weeks of intensive 1:1 support.
            </p>

            {/* Payment Option */}
            <p className="text-charcoal/80 mb-6">
              Or 3 monthly payments of <span className="font-bold text-ocean">$1,600</span>
            </p>

            <p className="text-ocean font-medium mb-2">
              <span className="font-bold">Only 10 VIP spots available.</span> Intake closes March 15, 2026—or sooner if filled.
            </p>

            <p className="text-charcoal/80 mb-8">
              If you're ready for the Upgrade, now's the moment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://buy.stripe.com/eVq7sN0RTdSGaJR1Qy5Ne09"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center bg-ocean text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-ocean/90 transition-all duration-300 shadow-xl"
              >
                Buy Your Upgrade
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center border-2 border-ocean text-ocean px-6 sm:px-10 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-ocean/10 transition-all duration-300 text-center"
              >
                Let's Talk About Your Upgrade
              </motion.a>
            </div>

            <p className="text-charcoal/60 text-sm mt-6 max-w-lg mx-auto">
              After you register, we'll schedule a 15-minute clarity call to discuss your goals and confirm next steps.
            </p>

            <p className="text-charcoal/50 text-sm mt-4">
              Have questions? <a href="/contact" className="text-ocean hover:underline">Reach out here.</a>
            </p>

            <p className="text-charcoal/40 text-xs mt-6">
              Not ready now? The next cohort begins September 2026. Register to save your spot.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 13. FAQ Section - Visible (not accordion) */}
      <section className="py-12 md:py-20 bg-sky/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-ocean text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">How are the tests done? Do I need to visit a clinic?</h3>
                <p className="text-charcoal/70 leading-relaxed">No clinic visits required. Both tests are shipped directly to you within the first 2 weeks of the program. GlycanAge is a simple finger-prick blood test you do at home. MyDNA is a cheek swab. You complete them, send them back in the prepaid packaging, and results arrive in approximately 2 weeks. Everything is designed to fit your schedule—no lab appointments, no travel required.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">What kind of results can I expect in 12 weeks?</h3>
                <p className="text-charcoal/70 leading-relaxed">Every body responds differently, but clients typically report: more consistent energy throughout the day, improved sleep quality and recovery, clearer thinking and mental performance, and measurable improvements in biological age markers. In the first cohort of this program, biological age improvements averaged 5-7 years within 12 weeks. You'll have your baseline data to track progress objectively—not just how you feel, but what the science shows.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">Is this just for people with health issues?</h3>
                <p className="text-charcoal/70 leading-relaxed">No. This is for high performers who want to stay high-performing. Prevention beats intervention. If you're waiting until something breaks, you're already behind. This is about optimising what's working and fixing what isn't—before it becomes a problem. Most of my clients are already successful, healthy people who want to perform at their peak for decades, not just years.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">What if I've already done a DNA test?</h3>
                <p className="text-charcoal/70 leading-relaxed">If you've done 23andMe, AncestryDNA, or similar consumer tests, that's different from MyDNA Health & Nutrition. MyDNA specifically analyses genes related to nutrition, fitness, sleep, stress response, and health optimisation—not ancestry or disease risk. If you've already done MyDNA specifically, we can work with those results. Let me know when you register and we'll discuss options.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">What happens after the 12 weeks?</h3>
                <p className="text-charcoal/70 leading-relaxed">You'll have your complete protocol, your data, and the tools to continue optimising independently. Many clients choose to do quarterly check-ins or re-test their biological age annually to track long-term progress. But the goal is for you to have everything you need to sustain this on your own. This isn't a dependency model—it's an empowerment model.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">I'm already overwhelmed—will this add more to my plate?</h3>
                <p className="text-charcoal/70 leading-relaxed">No. This simplifies your life, it doesn't complicate it. Most people are already spending hours researching supplements, trying different diets, second-guessing their approach. This gives you clarity so you stop spinning. The protocols we build fit into what you're already doing. We're not adding 17 new habits—we're optimising what you're already spending time on: eating, sleeping, moving, recovering.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">How much time do I need to commit each week?</h3>
                <p className="text-charcoal/70 leading-relaxed">Sessions: 30 minutes fortnightly OR 60 minutes monthly (your choice based on schedule). Weekly check-ins: 3-5 minutes to respond to my text with a quick update. Protocol implementation: The strategies we build optimise what you're already doing—eating, sleeping, moving, recovering. You're not adding new blocks of time to your calendar. Total "extra" time: ~30-45 minutes per week for sessions and check-ins.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">What if I miss a week?</h3>
                <p className="text-charcoal/70 leading-relaxed">Life happens. We'll reschedule sessions when needed. The beauty of having weekly text check-ins is that momentum doesn't depend on perfect attendance. If you're travelling or dealing with work chaos, we adjust. This is built for real life, not ideal conditions.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">How do I know if I'm the right fit?</h3>
                <p className="text-charcoal/70 leading-relaxed">If you answered yes to 4 or more questions in the assessment above, you're likely a fit. The clarity call will help us both confirm that. I personally review every registration to ensure we're aligned on goals and commitment level. This only works if we're both in. If we're not a fit, I'll tell you honestly.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ocean mb-3">Is this program available internationally?</h3>
                <p className="text-charcoal/70 leading-relaxed">Yes. All coaching is done via Zoom, and tests can be shipped internationally. However, sessions are scheduled in Australian Eastern Time, so consider time zone compatibility when registering.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
