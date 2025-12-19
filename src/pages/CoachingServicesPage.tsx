import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ChevronDown, CheckCircle, Calendar, Dna, Clock, Users, ArrowRight } from 'lucide-react'

export default function CoachingServicesPage() {
  const [openSection, setOpenSection] = useState<string | null>('optimise')

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <>
      <Helmet>
        <title>DNA Methylation Coaching Australia | Genetic Health Coach Sydney | BioHackMe</title>
        <meta name="description" content="World-leading DNA methylation coaching & epigenetics testing in Australia. Personalised genetic health plans, biohacking protocols & 1:1 coaching with Camilla Thompson. DNA testing from $699." />
        <meta name="keywords" content="DNA methylation coaching Australia, epigenetics coach Sydney, DNA testing Australia, genetic health coach, DNA methylation test, epigenetic coaching, personalised DNA health plan, biohacking DNA coach Australia, genetic wellness coaching Sydney, DNA health optimisation" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/coaching" />
        <meta property="og:title" content="DNA Methylation Coaching Australia | Genetic Health Optimisation" />
        <meta property="og:description" content="Australia's premier DNA methylation coaching. Unlock your genetic potential with personalised epigenetic testing & coaching. DNA packages from $699." />
        <meta property="og:image" content="https://www.biohackme.com.au/dna-coaching-preview.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.biohackme.com.au/coaching" />
        <meta property="twitter:title" content="DNA Methylation Coaching Australia | BioHackMe" />
        <meta property="twitter:description" content="Personalised DNA methylation testing & epigenetics coaching. Transform your health with genetic insights." />
        <meta property="twitter:image" content="https://www.biohackme.com.au/dna-coaching-preview.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.biohackme.com.au/coaching" />

        {/* Schema.org markup for Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "DNA Methylation Coaching",
            "name": "DNA Methylation & Epigenetics Coaching",
            "description": "Personalised DNA methylation testing and coaching to optimise health based on genetic expression. Includes comprehensive epigenetic analysis, personalised health protocols, and expert guidance.",
            "provider": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "DNA Methylation Coach & Epigenetics Expert",
              "description": "Leading DNA methylation coach and epigenetics specialist in Australia, helping clients optimise health through personalised genetic insights",
              "url": "https://www.biohackme.com.au/about"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://www.biohackme.com.au/coaching",
              "serviceType": "Online and In-Person Coaching"
            },
            "offers": [
              {
                "@type": "Offer",
                "name": "DNA Methylation Package",
                "description": "Comprehensive DNA methylation test, detailed reports, results debrief, and tailored health plan",
                "price": "699",
                "priceCurrency": "AUD",
                "availability": "https://schema.org/InStock",
                "url": "https://www.biohackme.com.au/coaching"
              },
              {
                "@type": "Offer",
                "name": "60-Minute Coaching Session",
                "description": "Deep dive strategy session with personalised action plan",
                "price": "300",
                "priceCurrency": "AUD",
                "availability": "https://schema.org/InStock"
              },
              {
                "@type": "Offer",
                "name": "15-Minute Check-in Session",
                "description": "Quick strategy and accountability session",
                "price": "75",
                "priceCurrency": "AUD",
                "availability": "https://schema.org/InStock"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Genetic Health Coaching Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "DNA Methylation Testing",
                    "description": "Comprehensive genetic expression analysis through DNA methylation testing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Epigenetic Coaching",
                    "description": "Personalised coaching based on genetic expression patterns and DNA methylation results"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Personalised Health Protocols",
                    "description": "Custom nutrition, lifestyle and supplement recommendations based on DNA analysis"
                  }
                }
              ]
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "47"
            }
          })}
        </script>

        {/* FAQ Schema for DNA Methylation */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is DNA methylation coaching?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "DNA methylation coaching uses epigenetic testing to understand how your genes are expressing themselves. A DNA methylation coach analyses your test results and creates personalised nutrition, lifestyle, and supplement protocols to optimise your genetic expression for better health outcomes."
                }
              },
              {
                "@type": "Question",
                "name": "How much does DNA methylation testing cost in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our DNA Methylation Package costs $699 + GST and includes the comprehensive DNA methylation test, detailed reports, a 1-hour results debrief session, and a tailored health plan based on your genetic expression patterns."
                }
              },
              {
                "@type": "Question",
                "name": "What's included in the DNA coaching package?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The DNA Methylation Package includes: comprehensive DNA methylation testing kit, detailed genetic expression analysis reports, 1-hour results debrief with an expert coach, and a personalised health plan with nutrition, lifestyle, and supplement recommendations tailored to your genetic profile."
                }
              },
              {
                "@type": "Question",
                "name": "Is DNA methylation coaching available online in Australia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our DNA methylation coaching is available Australia-wide via online video consultations. The DNA testing kit is delivered to your door anywhere in Australia, and all coaching sessions are conducted online for your convenience."
                }
              }
            ]
          })}
        </script>

        {/* Breadcrumb Schema */}
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
                "name": "Coaching Services",
                "item": "https://www.biohackme.com.au/coaching"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "DNA Methylation Coaching",
                "item": "https://www.biohackme.com.au/coaching#dna"
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ocean via-sky to-ice min-h-[50vh] flex items-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              DNA Methylation Coaching<br />
              <span className="text-3xl md:text-4xl font-light">& Genetic Health Optimisation</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-4">
              Australia's Premier Epigenetics & DNA Testing Coaching
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Transform your health with personalised DNA methylation testing, expert genetic coaching, and science-backed biohacking protocols
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Accordion Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Optimise Your Life Program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => toggleSection('optimise')}
              className="w-full bg-gradient-to-r from-ocean to-sky text-white rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <Users className="w-8 h-8" />
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">Optimise Your Life Program</h2>
                  <p className="text-white/80 text-sm md:text-base">3-Month Personalised Biohacking Journey</p>
                </div>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ${
                  openSection === 'optimise' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'optimise' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-ice/30 rounded-b-2xl p-8 space-y-6">
                    <p className="text-lg text-charcoal leading-relaxed">
                      A comprehensive 3-month program combining DNA testing, personalised protocols, and expert coaching to optimise every aspect of your health and performance.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-ocean">What's Included:</h3>
                        <ul className="space-y-3">
                          {[
                            'DNA Methylation Test',
                            '1 × 60-minute initial coaching session',
                            '2 × 30-minute coaching sessions per month',
                            'Weekly accountability check-ins',
                            'Personalised nutrition & supplement protocols',
                            'Custom lifestyle optimization strategies'
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-ocean mr-2 mt-1 flex-shrink-0" />
                              <span className="text-charcoal">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-ocean">Optional Testing:</h3>
                        <ul className="space-y-3 text-sm">
                          {[
                            'Biometric testing',
                            'Microbiome analysis',
                            'Genetic testing',
                            'Biological age testing',
                            'Comprehensive blood work'
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-charcoal/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 mt-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="text-2xl font-bold text-ocean">Investment: Contact for Pricing</p>
                          <p className="text-sm text-charcoal/60">3-month commitment • Personalised support</p>
                        </div>
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center bg-gradient-to-r from-ocean to-sky text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
                        >
                          Apply Now
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 1:1 Coaching Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <button
              onClick={() => toggleSection('coaching')}
              className="w-full bg-gradient-to-r from-sky to-ocean text-white rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <Clock className="w-8 h-8" />
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">1:1 Coaching Sessions</h2>
                  <p className="text-white/80 text-sm md:text-base">Flexible session options for your needs</p>
                </div>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ${
                  openSection === 'coaching' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'coaching' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-ice/30 rounded-b-2xl p-8">
                    <div className="grid md:grid-cols-3 gap-6">

                      {/* 60-Minute Session */}
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-ocean mb-2">60 Minutes</h3>
                          <p className="text-3xl font-bold text-charcoal mb-1">$300</p>
                          <p className="text-sm text-charcoal/60">+ GST</p>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-ocean mr-2 mt-0.5 flex-shrink-0" />
                            <span>Deep dive strategy session</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-ocean mr-2 mt-0.5 flex-shrink-0" />
                            <span>Personalised action plan</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-ocean mr-2 mt-0.5 flex-shrink-0" />
                            <span>Comprehensive health review</span>
                          </li>
                        </ul>
                        <a
                          href="https://calendly.com/thewellnesscoachsession/60-minute-coaching-session"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-ocean to-sky text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </a>
                      </div>

                      {/* 30-Minute Session */}
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-sky to-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-ocean mb-2">30 Minutes</h3>
                          <p className="text-3xl font-bold text-charcoal mb-1">$150</p>
                          <p className="text-sm text-charcoal/60">+ GST</p>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                            <span>Focused coaching session</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                            <span>Progress check-in</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                            <span>Perfect for follow-ups</span>
                          </li>
                        </ul>
                        <a
                          href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-sky to-ocean text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </a>
                      </div>

                      {/* 15-Minute Session */}
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-ocean to-sky rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-ocean mb-2">15 Minutes</h3>
                          <p className="text-3xl font-bold text-charcoal mb-1">$75</p>
                          <p className="text-sm text-charcoal/60">+ GST</p>
                        </div>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-ocean mr-2 mt-0.5 flex-shrink-0" />
                            <span>Quick strategy session</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-ocean mr-2 mt-0.5 flex-shrink-0" />
                            <span>Accountability check-in</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-ocean mr-2 mt-0.5 flex-shrink-0" />
                            <span>Rapid support</span>
                          </li>
                        </ul>
                        <a
                          href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-gradient-to-r from-ocean to-sky text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* DNA Package - NEW! */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 relative"
          >
            {/* New Badge */}
            <div className="absolute -top-3 left-6 z-10">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                NEW!
              </span>
            </div>

            <button
              onClick={() => toggleSection('dna')}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-6 flex items-center justify-between hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <Dna className="w-8 h-8" />
                <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-bold">DNA Package</h2>
                  <p className="text-white/80 text-sm md:text-base">Unlock your genetic blueprint for optimal health</p>
                </div>
              </div>
              <ChevronDown
                className={`w-6 h-6 transition-transform duration-300 ${
                  openSection === 'dna' ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {openSection === 'dna' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-b-2xl p-8 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-emerald-700">
                        What is DNA Methylation Coaching?
                      </h3>
                      <p className="text-lg text-charcoal leading-relaxed">
                        DNA methylation is the cutting-edge science of epigenetics—understanding how your genes express themselves beyond your DNA sequence. Unlike standard genetic testing, <strong>DNA methylation testing reveals how your lifestyle, environment, and habits are actually influencing your genetic expression</strong> right now.
                      </p>
                      <p className="text-lg text-charcoal leading-relaxed">
                        As Australia's leading <strong>DNA methylation coach</strong>, Camilla combines advanced epigenetic testing with personalised health coaching to create targeted protocols that work with your unique genetic blueprint. This is precision health optimisation based on your actual genetic expression patterns.
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-2xl font-bold text-emerald-600 mb-6">Package Includes:</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            title: 'DNA Methylation Test',
                            description: 'Comprehensive genetic testing kit delivered to your door'
                          },
                          {
                            title: 'Detailed Reports',
                            description: 'In-depth analysis of your genetic expression patterns'
                          },
                          {
                            title: 'Results De-brief',
                            description: '1-hour session to review and understand your results'
                          },
                          {
                            title: 'Tailored Health Plan',
                            description: 'Personalised nutrition, lifestyle & supplement recommendations'
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-charcoal mb-1">{item.title}</h4>
                              <p className="text-sm text-charcoal/70">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="text-3xl font-bold text-emerald-600 mb-1">$699 + GST</p>
                          <p className="text-sm text-charcoal/60">One-time investment • Complete package</p>
                        </div>
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
                        >
                          Get Started
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                      <p className="text-sm text-charcoal/80">
                        <strong>Note:</strong> This package provides educational insights based on your DNA methylation. It is not a diagnostic tool and should not replace professional medical advice.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <Footer />
    </>
  )
}
