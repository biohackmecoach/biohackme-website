import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, Clock, Users, Star, Check, Lock, ChevronDown, ChevronUp, BookOpen, CreditCard } from 'lucide-react'
import { masterclasses, biohackingPillars } from '../data/masterclasses'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MasterclassPreregister from '../components/MasterclassPreregister'
import SevenPillarsAssessment from '../components/SevenPillarsAssessment'

export default function MasterclassPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedModules, setExpandedModules] = useState<{[key: string]: boolean}>({})

  const availableMasterclasses = masterclasses.filter(m => m.status === 'available')
  const brainMasterclass = masterclasses.find(m => m.id === 'biohack-brain')
  const comingSoonMasterclasses = masterclasses.filter(m => m.status === 'coming-soon' && m.id !== 'biohack-brain')

  const categories = ['all', 'foundation', ...biohackingPillars.map(p => p.toLowerCase().replace('biohack your ', ''))]

  const toggleModuleExpansion = (masterclassId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [masterclassId]: !prev[masterclassId]
    }))
  }

  const getPillarDescription = (pillar: string) => {
    const descriptions: {[key: string]: string} = {
      'BIOHACK YOUR SLEEP': 'Optimise your sleep quality and circadian rhythms for peak recovery and performance.',
      'BIOHACK YOUR MOOD': 'Master emotional regulation and stress management through science-backed techniques.',
      'BIOHACK YOUR BODY': 'Transform your physical health through movement, nutrition, and body optimisation.',
      'BIOHACK YOUR ENVIRONMENT': 'Create spaces that automatically enhance your health and productivity.',
      'BIOHACK YOUR ENERGY': 'Boost mitochondrial function and maintain sustained energy throughout the day.',
      'BIOHACK YOUR RELATIONSHIPS': 'Build meaningful connections that support your health and wellbeing.',
      'BIOHACK YOUR HEALTH': 'Monitor and optimise key biomarkers for longevity and disease prevention.',
      'BIOHACK YOUR BRAIN': 'Enhance cognitive function, memory, and mental performance naturally.'
    }
    return descriptions[pillar] || 'Optimise this area of your life through targeted biohacking strategies.'
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cloud">
      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-ocean to-sky text-white min-h-[60vh] flex items-center overflow-hidden">
        {/* Biohacking Framework Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 rounded-full border-2 border-white/20">
              <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-white/30 flex items-center justify-center">
                  <span className="text-white/40 font-montserrat font-light text-sm text-center">
                    BIOHACKING<br/>FRAMEWORK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-24 md:pt-32 lg:pt-52 pb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-8"
          >
            Biohacking Masterclasses
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl mb-6 leading-relaxed max-w-3xl mx-auto"
          >
            Master the 8-Pillar Framework to future-proof your health and optimise your life.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Transform your sleep, mood, body, environment, energy, relationships, health, and brain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <button
              onClick={() => {
                const videoElement = document.getElementById('hero-preview-video')
                if (videoElement) {
                  videoElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-ocean px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Preview
            </button>
            <button
              onClick={() => {
                const coursesElement = document.getElementById('available-masterclasses')
                if (coursesElement) {
                  coursesElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-ocean transition-all duration-300"
            >
              View All Courses
            </button>
          </motion.div>

          {/* Educational Content Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-8 border border-white/30 max-w-4xl mx-auto"
          >
            <p className="text-sm text-white/90 leading-relaxed">
              <strong>Educational Content Disclaimer:</strong> These masterclasses are for educational purposes only and do not constitute medical advice. 
              Content is not intended to diagnose, treat, cure, or prevent any disease. Always consult with qualified healthcare professionals 
              before implementing health strategies or making changes to your wellness routine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Video Preview Section */}
      <section id="hero-preview-video" className="py-16 bg-gradient-to-br from-ice to-cloud">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-6">
              See What You'll Learn
            </h2>
            <p className="text-lg text-charcoal/80 mb-8">
              Get a preview of the Biohacking Basics Masterclass
            </p>

            {/* Loom Video Embed */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-sky/20">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
                  <iframe
                    src="https://www.loom.com/embed/5cfa26c06d2d474d8964c13023ae935a?sid=423eca8b-2406-4f9c-9fe0-eaf240234230&speed=1"
                    frameBorder="0"
                    allowFullScreen
                    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                    title="Biohacking Masterclass Preview"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-charcoal/70">
                  🎥 Preview of the Biohacking Basics Masterclass
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free 8-Pillar Assessment Section - Compact */}
      <section className="py-12 bg-gradient-to-r from-ice to-cloud">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-sky/20">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-ocean to-sky rounded-full mb-4">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-ocean mb-3">
                Take the 8 Biohacking Pillar Assessment FREE
              </h2>
              <p className="text-base text-charcoal/80 leading-relaxed mb-4">
                Discover your current health baseline across all 8 pillars of biohacking. Get personalised recommendations in just 2 minutes.
              </p>

              <div className="flex justify-center items-center gap-6 mb-4 text-sm">
                <div className="flex items-center text-ocean">
                  <Check className="w-4 h-4 mr-1" />
                  <span>2-minute assessment</span>
                </div>
                <div className="flex items-center text-ocean">
                  <Check className="w-4 h-4 mr-1" />
                  <span>Instant results</span>
                </div>
                <div className="flex items-center text-ocean">
                  <Check className="w-4 h-4 mr-1" />
                  <span>100% FREE</span>
                </div>
              </div>

              <Link
                to="/biohack-assessment"
                className="inline-block bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your FREE Assessment Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Masterclasses */}
      {availableMasterclasses.length > 0 && (
        <section id="available-masterclasses" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-montserrat font-light text-ocean mb-4"
              >
                Available Now
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-xl text-charcoal/80 max-w-2xl mx-auto"
              >
                Start your biohacking journey with these comprehensive masterclasses
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {availableMasterclasses.map((masterclass, index) => (
                <motion.div
                  key={masterclass.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="space-y-6 p-8 flex flex-col flex-grow">
                    {/* Video/Image Section */}
                    <div className="relative">
                      {masterclass.id === 'biohacking-foundation' ? (
                        /* Loom Video for Biohacking Foundation */
                        <div className="aspect-video relative rounded-2xl overflow-hidden">
                          <div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
                            <iframe
                              src="https://www.loom.com/embed/5cfa26c06d2d474d8964c13023ae935a?sid=423eca8b-2406-4f9c-9fe0-eaf240234230&speed=1"
                              frameBorder="0"
                              allowFullScreen
                              style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                              title="Biohacking Foundation Masterclass"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Placeholder for other masterclasses */
                        <div className="aspect-video bg-gradient-to-br from-ice to-sky/20 flex items-center justify-center rounded-2xl">
                          <button className="w-20 h-20 bg-ocean text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 ml-1" />
                          </button>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-ocean text-white px-3 py-1 rounded-full text-sm font-medium">
                          Available Now
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="min-h-[120px] mb-6">
                        <h3 className="text-2xl font-montserrat font-light text-ocean mb-4 leading-tight">
                          {masterclass.title}
                        </h3>
                        <p className="text-charcoal/80 leading-relaxed text-base">
                          {masterclass.description}
                        </p>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-charcoal/70">
                          <Clock className="w-4 h-4 mr-2 text-sky" />
                          <span className="text-sm">{masterclass.duration}</span>
                        </div>
                        <div className="flex items-center text-charcoal/70">
                          <Users className="w-4 h-4 mr-2 text-sky" />
                          <span className="text-sm">{masterclass.level}</span>
                        </div>
                        <div className="flex items-center text-charcoal/70">
                          <Star className="w-4 h-4 mr-2 text-sky" />
                          <span className="text-sm">4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center text-charcoal/70">
                          <Check className="w-4 h-4 mr-2 text-sky" />
                          <span className="text-sm">Certificate</span>
                        </div>
                      </div>

                      {/* Key Outcomes */}
                      <div className="mb-6">
                        <h4 className="font-medium text-ocean mb-3">What You'll Learn:</h4>
                        <div className="space-y-2 min-h-[84px]">
                          {masterclass.outcomes.slice(0, 3).map((outcome, outcomeIndex) => (
                            <div key={outcomeIndex} className="flex items-start">
                              <Check className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-charcoal/80">{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Module Information Toggle */}
                      <div className="mb-6">
                        <button
                          onClick={() => toggleModuleExpansion(masterclass.id)}
                          className="flex items-center justify-between w-full text-ocean font-medium text-left hover:text-sky transition-colors"
                        >
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Module Information ({masterclass.modules.length} modules)
                          </div>
                          {expandedModules[masterclass.id] ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </button>

                        {expandedModules[masterclass.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-4 border-t border-ocean/10 pt-4"
                          >
                            {masterclass.modules.map((module, moduleIndex) => (
                              <div key={module.id} className="bg-ice/30 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium text-ocean text-sm">
                                    Module {moduleIndex + 1}: {module.title}
                                  </h5>
                                  <span className="text-xs text-charcoal/60 bg-white px-2 py-1 rounded-full">
                                    {module.duration}
                                  </span>
                                </div>
                                <p className="text-xs text-charcoal/70 mb-3">{module.description}</p>
                                
                                {module.learningNotes && (
                                  <div className="mb-3">
                                    <h6 className="text-xs font-medium text-ocean mb-2">What You'll Learn:</h6>
                                    <ul className="space-y-1">
                                      {module.learningNotes.map((note, noteIndex) => (
                                        <li key={noteIndex} className="text-xs text-charcoal/70 flex items-start">
                                          <Check className="w-3 h-3 text-sky mr-1 mt-0.5 flex-shrink-0" />
                                          {note}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {module.keyTakeaways && (
                                  <div>
                                    <h6 className="text-xs font-medium text-ocean mb-2">Key Takeaways:</h6>
                                    <ul className="space-y-1">
                                      {module.keyTakeaways.map((takeaway, takeawayIndex) => (
                                        <li key={takeawayIndex} className="text-xs text-charcoal/70 flex items-start">
                                          <Star className="w-3 h-3 text-sky mr-1 mt-0.5 flex-shrink-0" />
                                          {takeaway}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Price and Enhanced CTA - Fixed at bottom */}
                    <div className="mt-auto">
                      <div className="bg-gradient-to-r from-ocean/5 to-sky/5 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-3">
                              <div className="text-2xl font-bold text-ocean">
                                ${masterclass.price} {masterclass.currency}
                              </div>
                              {masterclass.regularPrice && masterclass.regularPrice > masterclass.price && (
                                <div className="text-lg text-charcoal/50 line-through">
                                  ${masterclass.regularPrice} {masterclass.currency}
                                </div>
                              )}
                              {masterclass.launchPrice && masterclass.launchPrice < (masterclass.regularPrice || masterclass.price) && (
                                <div className="bg-ocean text-white px-2 py-1 rounded-full text-xs font-medium">
                                  Launch Offer
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-charcoal/60">One-time payment • Lifetime access</div>
                          </div>
                        </div>

                        {masterclass.status === 'available' ? (
                          <motion.button
                            onClick={() => window.location.href = import.meta.env.VITE_STRIPE_PAYMENT_LINK}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-ocean to-sky text-white hover:shadow-xl"
                          >
                            <CreditCard className="w-5 h-5" />
                            Get Instant Access
                          </motion.button>
                        ) : (
                          <button className="w-full bg-gradient-to-r from-sky/20 to-ice text-ocean py-4 rounded-full font-medium text-lg">
                            Coming Soon - Notify Me
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Biohacking Basics Assessment for Biohacking Foundation */}
                    {masterclass.id === 'biohacking-foundation' && (
                      <div className="bg-gradient-to-r from-ice/50 to-cloud/50 rounded-xl p-4 border border-ocean/20">
                        <h4 className="font-medium text-ocean mb-2 flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          Start with Your Biohacking Basics Assessment
                        </h4>
                        <p className="text-xs text-charcoal/70 mb-3">
                          Before diving into the masterclass, discover where you stand across the fundamental pillars of biohacking. Get your personalized baseline and recommendations.
                        </p>
                        <Link
                          to="/masterclass/biohacking-foundation-assessment"
                          className="bg-gradient-to-r from-ocean to-sky text-white px-4 py-2 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
                        >
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          Start Biohacking Assessment
                        </Link>
                      </div>
                    )}

                    {masterclass.id === 'biohack-brain' && (
                      <div className="bg-gradient-to-r from-ice/50 to-sky/10 rounded-xl p-4 border border-sky/20">
                        <h4 className="font-medium text-ocean mb-2 flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                          </svg>
                          Start with Your Brain Health Assessment
                        </h4>
                        <p className="text-xs text-charcoal/70 mb-3">
                          Complete a quick 1-minute brain audit to identify your cognitive strengths and areas for improvement.
                        </p>
                        <Link
                          to="/brain-assessment"
                          className="bg-gradient-to-r from-sky to-ocean text-white px-4 py-2 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
                        >
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                          </svg>
                          Start Brain Assessment
                        </Link>
                      </div>
                    )}

                    {masterclass.id === 'biohack-sleep' && (
                      <div className="bg-gradient-to-r from-indigo/50 to-purple/10 rounded-xl p-4 border border-indigo/20">
                        <h4 className="font-medium text-ocean mb-2 flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                          </svg>
                          Start with Your Sleep Optimization Assessment
                        </h4>
                        <p className="text-xs text-charcoal/70 mb-3">
                          Discover your sleep biohacking potential and get personalized optimization strategies from my proven methods.
                        </p>
                        <Link
                          to="/sleep-assessment"
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
                        >
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                          </svg>
                          Start Sleep Assessment
                        </Link>
                      </div>
                    )}

                    {masterclass.id === 'biohack-environment' && (
                      <div className="bg-gradient-to-r from-green-500/50 to-teal-500/10 rounded-xl p-4 border border-green-500/20">
                        <h4 className="font-medium text-ocean mb-2 flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v3c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                          </svg>
                          Start with Your Environment Optimisation Assessment
                        </h4>
                        <p className="text-xs text-charcoal/70 mb-3">
                          Discover how your environment impacts your health and get personalised strategies to reduce toxic exposure and create health-supporting spaces.
                        </p>
                        <Link
                          to="/environment-assessment"
                          className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
                        >
                          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7v3c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                          </svg>
                          Start Environment Assessment
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Add Brain Masterclass as Second Card */}
              {brainMasterclass && (
                  <motion.div
                    key={brainMasterclass.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="space-y-6 p-8">
                      {/* Video/Image Section */}
                      <div className="relative">
                        <div className="aspect-video bg-gradient-to-br from-ice to-sky/20 flex items-center justify-center rounded-2xl">
                          <div className="w-16 h-16 bg-ocean/20 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-ocean" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-sky text-white px-3 py-1 rounded-full text-sm font-medium">
                            Coming Soon
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="mb-6">
                          <h3 className="text-2xl font-montserrat font-light text-ocean mb-4 leading-tight">
                            {brainMasterclass.title}
                          </h3>
                          <p className="text-charcoal/80 leading-relaxed text-base">
                            {brainMasterclass.description}
                          </p>
                        </div>

                        {/* Course Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center text-charcoal/70">
                            <Clock className="w-4 h-4 mr-2 text-sky" />
                            <span className="text-sm">{brainMasterclass.duration}</span>
                          </div>
                          <div className="flex items-center text-charcoal/70">
                            <Users className="w-4 h-4 mr-2 text-sky" />
                            <span className="text-sm">{brainMasterclass.level}</span>
                          </div>
                          <div className="flex items-center text-charcoal/70">
                            <Star className="w-4 h-4 mr-2 text-sky" />
                            <span className="text-sm">4.9/5 Rating</span>
                          </div>
                          <div className="flex items-center text-charcoal/70">
                            <Check className="w-4 h-4 mr-2 text-sky" />
                            <span className="text-sm">Certificate</span>
                          </div>
                        </div>

                        {/* Key Outcomes */}
                        <div className="mb-6">
                          <h4 className="font-medium text-ocean mb-3">What You'll Learn:</h4>
                          <div className="space-y-2 min-h-[84px]">
                            {brainMasterclass.outcomes.slice(0, 3).map((outcome, outcomeIndex) => (
                              <div key={outcomeIndex} className="flex items-start">
                                <Check className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-charcoal/80">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Module Information Toggle */}
                        <div className="mb-6">
                          <button
                            onClick={() => toggleModuleExpansion(brainMasterclass.id)}
                            className="flex items-center justify-between w-full text-ocean font-medium text-left hover:text-sky transition-colors"
                          >
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-2" />
                              View Module Information ({brainMasterclass.modules.length} modules)
                            </div>
                            {expandedModules[brainMasterclass.id] ?
                              <ChevronUp className="w-4 h-4" /> :
                              <ChevronDown className="w-4 h-4" />
                            }
                          </button>

                          {expandedModules[brainMasterclass.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 space-y-4 border-t border-ocean/10 pt-4"
                            >
                              {brainMasterclass.modules.map((module, moduleIndex) => (
                                <div key={module.id} className="bg-ice/30 rounded-lg p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h5 className="font-medium text-ocean text-sm">
                                      Module {moduleIndex + 1}: {module.title}
                                    </h5>
                                    <span className="text-xs text-charcoal/60 bg-white px-2 py-1 rounded-full">
                                      {module.duration}
                                    </span>
                                  </div>
                                  <p className="text-xs text-charcoal/70 mb-3">{module.description}</p>

                                  {module.learningNotes && (
                                    <div className="mb-3">
                                      <h6 className="text-xs font-medium text-ocean mb-2">What You'll Learn:</h6>
                                      <ul className="space-y-1">
                                        {module.learningNotes.map((note, noteIndex) => (
                                          <li key={noteIndex} className="text-xs text-charcoal/70 flex items-start">
                                            <Check className="w-3 h-3 text-sky mr-1 mt-0.5 flex-shrink-0" />
                                            {note}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {module.keyTakeaways && (
                                    <div>
                                      <h6 className="text-xs font-medium text-ocean mb-2">Key Takeaways:</h6>
                                      <ul className="space-y-1">
                                        {module.keyTakeaways.map((takeaway, takeawayIndex) => (
                                          <li key={takeawayIndex} className="text-xs text-charcoal/70 flex items-start">
                                            <Star className="w-3 h-3 text-sky mr-1 mt-0.5 flex-shrink-0" />
                                            {takeaway}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price and CTA - Exact same format as PaymentButton component */}
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-sky/20">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-ocean mb-2">{brainMasterclass.title}</h3>
                        <p className="text-charcoal/70 text-sm mb-4">Complete masterclass with lifetime access</p>
                        <div className="text-3xl font-bold text-ocean mb-2">
                          ${brainMasterclass.price}.00 AUD
                        </div>
                        <p className="text-sm text-charcoal/60">One-time payment</p>
                      </div>

                      <button className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-ocean to-sky text-white hover:shadow-xl mb-4">
                        Coming Soon - Notify Me
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-charcoal/50">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        <span>Secure payment powered by Stripe</span>
                      </div>

                      <div className="text-center">
                        <p className="text-xs text-charcoal/50">
                          💳 Secure checkout • 🔒 SSL encrypted • 📱 Mobile friendly
                        </p>
                      </div>
                    </div>

                    {/* Brain Assessment section */}
                    <div className="bg-gradient-to-r from-ice/50 to-cloud/50 rounded-xl p-4 border border-ocean/20 mt-4">
                      <h4 className="font-medium text-ocean mb-2 flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Start with Your Brain Health Assessment
                      </h4>
                      <p className="text-xs text-charcoal/70 mb-3">
                        Before diving into the brain masterclass, discover your current brain health baseline and get personalized recommendations for cognitive optimization.
                      </p>
                      <Link
                        to="/brain-assessment"
                        className="bg-gradient-to-r from-ocean to-sky text-white px-4 py-2 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center"
                      >
                        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Start Brain Assessment
                      </Link>
                    </div>
                  </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Coming Soon Masterclasses */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-montserrat font-light text-ocean mb-4"
            >
              Coming Soon
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-charcoal/80 max-w-2xl mx-auto"
            >
              Deep-dive masterclasses for each pillar of the biohacking framework
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {comingSoonMasterclasses.map((masterclass, index) => (
              <motion.div
                key={masterclass.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image/Video Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-ice to-sky/20 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-ocean/20 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-ocean" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky text-white px-3 py-1 rounded-full text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-montserrat font-light text-ocean mb-2">
                    {masterclass.title}
                  </h3>
                  <p className="text-charcoal/70 mb-4 line-clamp-3">
                    {masterclass.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-charcoal/60">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{masterclass.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold text-ocean">
                        ${masterclass.price} {masterclass.currency}
                      </div>
                      {masterclass.regularPrice && masterclass.regularPrice > masterclass.price && (
                        <div className="text-sm text-charcoal/50 line-through">
                          ${masterclass.regularPrice} {masterclass.currency}
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-sky/20 to-ice text-ocean py-3 rounded-full font-medium text-lg hover:from-sky/30 hover:to-ice transition-all duration-300">
                    Notify Me
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biohacking Framework Section */}
      <section className="py-20 bg-gradient-to-br from-ocean to-sky text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-white/25 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-montserrat font-light mb-4"
          >
            The 8-Pillar 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-ice">
              Biohacking Framework
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl mb-16 max-w-4xl mx-auto leading-relaxed text-white/90"
          >
            A comprehensive system for optimising every aspect of your life through science-backed biohacking strategies. 
            Each pillar builds upon the others to create lasting transformation.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {biohackingPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/30"
              >

                {/* Pillar Content */}
                <div>
                  <h3 className="font-montserrat font-medium text-base lg:text-lg text-center leading-tight mb-3">
                    {pillar.replace('BIOHACK YOUR ', '')}
                  </h3>
                  
                  {/* Visual separator */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-white/50 to-transparent mx-auto mb-3 group-hover:from-white/80 transition-all duration-300"></div>
                  
                  {/* Pillar description */}
                  <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {getPillarDescription(pillar)}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <p className="text-lg text-white/90 mb-6">
              Ready to transform your life with the complete framework?
            </p>
            <button className="bg-white text-ocean px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl hover:bg-ice transition-all duration-300">
              Explore All Masterclasses
            </button>
          </motion.div>
        </div>
      </section>

      {/* Masterclass Pre-registration Section */}
      <section className="py-20 bg-ice">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-12 text-center"
          >
            Be the First to Know
          </motion.h2>

          <div className="max-w-md mx-auto">
            <MasterclassPreregister />
          </div>
        </div>
      </section>

      {/* Footer Medical Disclaimer */}
      <section className="bg-charcoal/5 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-medium text-ocean mb-4">Important Health Disclaimer</h3>
            <div className="text-sm text-charcoal/70 leading-relaxed space-y-2">
              <p>
                <strong>Medical Advice Disclaimer:</strong> The information provided in these masterclasses is for educational and informational purposes only and is not intended as medical advice. The content is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                <strong>Professional Consultation Required:</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information obtained from these courses.
              </p>
              <p>
                <strong>Individual Results Disclaimer:</strong> Results from implementing strategies discussed in these masterclasses may vary. Individual results depend on various factors including but not limited to individual health status, adherence to protocols, and other lifestyle factors.
              </p>
              <p>
                <strong>Certification Disclaimer:</strong> Certificates of completion awarded are for educational purposes only and do not constitute professional certification, medical certification, or formal qualification in any field.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <Footer />
    </>
  )
}

// CSS for line-clamp (add to your CSS file)
const styles = `
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`