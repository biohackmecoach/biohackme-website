import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function CoachingSessionsPage() {
  return (
    <>
      <Helmet>
        <title>Executive Wellbeing Coaching Australia | Leadership Coaching | The Well Leader Program</title>
        <meta name="description" content="Executive coaching for leaders. 1:1 wellbeing sessions, The Well Leader 12-week program for sustainable leadership. Overcome burnout, build resilience, set boundaries. GLWS Leader Wellbeing Survey. Sydney & Australia-wide virtual coaching." />
        <meta name="keywords" content="executive coaching Australia, leadership wellbeing coaching, executive burnout coaching, wellbeing coaching for leaders, corporate wellness coaching, leadership resilience coaching, work-life balance coaching, executive health coaching, sustainable leadership, C-suite coaching, manager wellbeing, leadership performance coaching, emotional resilience coaching, boundary setting for leaders, Sydney executive coach" />
        <meta property="og:title" content="Executive Wellbeing Coaching | Leadership Coaching Australia" />
        <meta property="og:description" content="Transform your leadership with wellbeing coaching. The Well Leader 12-week program + 1:1 sessions. Build resilience, overcome burnout, lead sustainably." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/coaching-sessions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Executive Wellbeing Coaching for Leaders | Australia" />
        <meta name="twitter:description" content="Leadership coaching programs designed for sustainable performance. 12-week Well Leader program + flexible 1:1 sessions." />
        <link rel="canonical" href="https://www.biohackme.com.au/coaching-sessions" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "BioHackMe Executive Coaching",
            "description": "Executive wellbeing and leadership coaching services for sustainable high performance",
            "provider": {
              "@type": "Person",
              "name": "Camilla",
              "jobTitle": "Executive Wellbeing Coach"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Coaching Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "The Well Leader Program",
                    "description": "12-week executive wellbeing coaching program"
                  },
                  "price": "1900",
                  "priceCurrency": "AUD"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "60-Minute Coaching Session"
                  },
                  "price": "300",
                  "priceCurrency": "AUD"
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "30-Minute Coaching Session"
                  },
                  "price": "150",
                  "priceCurrency": "AUD"
                }
              ]
            }
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
                "name": "Coaching Sessions",
                "item": "https://www.biohackme.com.au/coaching-sessions"
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      {/* 1:1 Coaching Section */}
      <section id="one-on-one-coaching" className="py-12 md:py-20 bg-gradient-to-br from-sky to-ocean text-white min-h-screen pt-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-block bg-white/10 rounded-full px-6 py-2 mb-8">
              <span className="text-white font-medium tracking-wide">WELLBEING COACHING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light mb-8">
              Personalised Coaching Sessions
            </h2>
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Get focused, personalised guidance tailored to your specific health goals and challenges.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* 1 Hour Session */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">
                    1h
                  </div>
                  <h3 className="text-2xl font-montserrat font-light text-white mb-4">Single Session</h3>
                  <div className="text-3xl font-bold text-white mb-2">$300</div>
                  <div className="text-white/80">+ GST per session</div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">60-minute focused coaching session</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Personalised health assessment</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Customised action plan</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Follow-up resources and recommendations</p>
                  </div>
                </div>

                <div className="text-center mt-auto space-y-3">
                  <motion.a
                    href="https://calendly.com/thewellnesscoachsession/60-minute-coaching-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-ocean px-4 py-2 rounded-full font-medium hover:bg-ice transition-colors inline-flex items-center justify-center text-sm"
                  >
                    BOOK SESSION
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </motion.a>
                  <motion.a
                    href="https://buy.stripe.com/6oUeVf8kl4i6f07cvc5Ne02"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-ocean/20 text-white px-4 py-2 rounded-full font-medium hover:bg-ocean/30 transition-colors inline-flex items-center justify-center text-sm"
                  >
                    BUY NOW
                  </motion.a>
                </div>
              </motion.div>

              {/* 30 Min Session */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                    30m
                  </div>
                  <h3 className="text-2xl font-montserrat font-light text-white mb-4">Quick Session</h3>
                  <div className="text-3xl font-bold text-white mb-2">$150</div>
                  <div className="text-white/80">+ GST per session</div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">30-minute targeted coaching</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Specific problem-solving session</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Quick health optimisation tips</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Perfect for follow-up sessions</p>
                  </div>
                </div>

                <div className="text-center mt-auto space-y-3">
                  <motion.a
                    href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-ocean px-4 py-2 rounded-full font-medium hover:bg-ice transition-colors inline-flex items-center justify-center text-sm"
                  >
                    BOOK SESSION
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </motion.a>
                  <motion.a
                    href="https://buy.stripe.com/00w8wR9opg0O4ltfHo5Ne03"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-ocean/20 text-white px-4 py-2 rounded-full font-medium hover:bg-ocean/30 transition-colors inline-flex items-center justify-center text-sm"
                  >
                    BUY NOW
                  </motion.a>
                </div>
              </motion.div>

              {/* Executive Coaching - 12 Week Program */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm mb-6 mx-auto">
                    EXEC
                  </div>
                  <h3 className="text-2xl font-montserrat font-light text-white mb-4">Executive Coaching</h3>
                  <div className="text-3xl font-bold text-white mb-2">TBC</div>
                  <div className="text-white/80">Cost to be confirmed</div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">12-week leadership program</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Wellbeing survey & report</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Personalised wellbeing plan</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Ongoing accountability support</p>
                  </div>
                </div>

                <div className="text-center mt-auto">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-ocean px-4 py-2 rounded-full font-medium hover:bg-ice transition-colors inline-flex items-center justify-center text-sm"
                  >
                    ENQUIRE NOW
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Perfect for section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 max-w-3xl mx-auto">
                <h3 className="text-2xl font-montserrat font-light text-white mb-6">
                  Perfect for:
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-white/90">
                  <div className="text-left space-y-2">
                    <p>• Ongoing health issues</p>
                    <p>• Quick biohacking guidance</p>
                    <p>• Energy optimisation</p>
                  </div>
                  <div className="text-left space-y-2">
                    <p>• Sleep improvement strategies</p>
                    <p>• Stress management techniques</p>
                    <p>• Nutrition planning</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Well Leader Program */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* The Well Leader */}
            <div className="bg-gradient-to-br from-ocean/5 to-sky/5 rounded-2xl p-8 md:p-12">
              <div className="inline-block bg-ocean/10 rounded-full px-6 py-2 mb-6">
                <span className="text-ocean font-medium tracking-wide">12-WEEK PROGRAM</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ocean mb-6">The Well Leader</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
                A 12-week coaching program designed for leaders ready to rebalance and prioritise their wellbeing. Learn to lead effectively and sustainably by role modelling positive wellbeing behaviours.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-ocean mb-4">This Program is For Leaders Who:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Are ready to overcome self-created performance barriers</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Find leadership roles overwhelming</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Want to develop better boundaries</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Seek to build emotional resilience</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-ocean mb-4">Program Structure:</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-ocean mb-2">Part 1: GLWS Leader Wellbeing Survey</h4>
                      <p className="text-sm text-charcoal/70">15-minute assessment of burnout across six wellbeing domains</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-ocean mb-2">Part 2: Wellbeing Report De-brief</h4>
                      <p className="text-sm text-charcoal/70">90-minute session to extract key learnings and behaviour insights</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-ocean mb-2">Part 3: Personalised Wellbeing Plan</h4>
                      <p className="text-sm text-charcoal/70">90-minute session creating your tailored mental and physical health plan</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-ocean mb-4">What's Included:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">GLWS Leader Wellbeing Survey & Report</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">2 x 90-minute intensive coaching sessions</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">6 x 30-minute accountability check-ins</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">Ongoing resources and tools</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="bg-white rounded-2xl px-8 py-6 shadow-lg">
                  <p className="text-sm text-charcoal/60 mb-1">Investment</p>
                  <p className="text-4xl font-bold text-ocean">$1,900</p>
                  <p className="text-sm text-charcoal/60">+ GST</p>
                </div>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-ocean to-sky text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Enquire About The Well Leader
                  <ArrowRight className="ml-2 w-6 h-6" />
                </motion.a>
              </div>

              <div className="mt-6 bg-ocean/10 rounded-lg p-4">
                <p className="text-center text-charcoal/70 italic">
                  "69% of people said their managers had the greatest impact on their mental health"
                </p>
              </div>
            </div>

            {/* Wellbeing Coaching Program */}
            <div className="bg-gradient-to-br from-ice to-cloud rounded-2xl p-8 md:p-12">
              <div className="inline-block bg-sky/10 rounded-full px-6 py-2 mb-6">
                <span className="text-ocean font-medium tracking-wide">ONE-OFF SESSION</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-ocean mb-6">Wellbeing Coaching</h2>
              <p className="text-lg text-charcoal/80 leading-relaxed mb-8">
                One-on-one confidential wellbeing coaching to help you navigate work and life challenges with personalised support.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-ocean mb-4">Foundational Audit Pillars:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Sleep', 'Movement', 'Nutrition', 'Connection', 'Stress Management', 'Financial Wellbeing', 'Emotional Regulation', 'Recovery'].map((pillar, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-sky mr-2 mt-1 flex-shrink-0" />
                        <p className="text-sm text-charcoal/80">{pillar}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-ocean mb-4">Coaching Focus Areas:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Self-compassion strategies to reduce perfectionism</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Workload management and work-life balance</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Creating sustainable healthy habits</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Exploring biohacking and health optimisation</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80">Boundary setting for better wellbeing choices</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-ocean mb-4">Session Includes:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">30-minute personalised coaching session</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">Follow-up email support</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">Motivational resources</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                    <p className="text-charcoal/80">Renewed energy and resilience</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <motion.a
                  href="https://calendly.com/thewellnesscoachsession/30-minute-wellbeing-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-sky to-ocean text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
                >
                  Book 30-Minute Wellbeing Session
                  <ArrowRight className="ml-2 w-6 h-6" />
                </motion.a>
                <p className="mt-4 text-charcoal/60">
                  Or schedule a <a href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session" target="_blank" rel="noopener noreferrer" className="text-ocean hover:text-sky underline">15-minute consultation</a> to learn more
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  )
}
