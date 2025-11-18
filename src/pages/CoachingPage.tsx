import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CoachingContactForm from '../components/CoachingContactForm'
import { CheckCircle, Users, Star, ArrowRight, Moon, Zap, Brain, Heart, Activity, Shield, TreePine } from 'lucide-react'

export default function CoachingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const testimonials = [
    {
      name: "Carmen Bekker",
      role: "Lead Partner, KPMG Consulting",
      content: "Camilla is an absolutely fantastic wellness coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      name: "Kevin Figueiredo",
      role: "Chief People & Safety Officer, Super Retail Group",
      content: "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies. Leaders left recharged, inspired, and equipped with tools to sustain vitality and drive transformational change.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      name: "Carly Daff",
      role: "Head of Teams & Education, Canva",
      content: "Camilla's guidance as a wellness coach over the past three years has been invaluable—both personally and professionally. She's helped me manage workload, set boundaries, and navigate complex work situations. Her impact extended to my leadership team too, where she delivered powerful strategies on managing burnout.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      name: "Renee Opperman",
      role: "Marketing Executive – Property & Construction",
      content: "Camilla is a fabulous executive wellbeing coach. Her guidance and support have been life-changing—both in my business and in life. She's not afraid of courageous conversations, delivered in a direct yet supportive way.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    },
    {
      name: "Troy Love",
      role: "Keynote Speaker & Storytelling Coach",
      content: "Camilla is highly recommended as a speaker and coach. Her natural ability to frame ideas makes them immediately approachable and applicable. She has a wealth of knowledge to share!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      name: "Anna Torun",
      role: "OD & ICF Leadership Coach",
      content: "Camilla delivered short, laser-focused wellbeing coaching sessions that landed so well with our workforce, we extended the offering twice. Her expertise in leadership wellbeing is exceptional, and the value to staff was clear. I highly recommend her.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      name: "Jason Bresland",
      role: "Operations Director, Nando's ANZ",
      content: "Camilla has a special gift for connecting, coaching, and adapting to meet each person's needs. She brought out the best in our team, and we're incredibly grateful for the experience. Highly recommend.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      name: "Karen Sampson",
      role: "Head of Safety, Health and Wellbeing ANZ, Nando's",
      content: "Camilla partnered with us to deliver a bespoke wellness program for our leaders. Her flexibility, genuine coaching style, and ability to connect had a truly positive impact across the business.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      name: "Luisa Marciano",
      role: "Head of People – ANZ, Nando's",
      content: "Camilla customised a powerful program for our senior leaders—far from one-size-fits-all. Her individual and group coaching made a measurable difference in our wellbeing stats and an even greater impact in the room. Personally, I'm grateful for the lifelong tools she gave me.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150"
    }
  ]

  const programIncludes = [
    "DNA Methylation Test",
    "1 x 60-minute initial coaching session",
    "2 x 30-minute coaching sessions per month",
    "Weekly accountability check-ins"
  ]

  const optionalTesting = [
    "Biometric testing to analyse key health metrics",
    "Microbiome testing to understand gut health and its impact on overall wellness",
    "Genetic testing to uncover predispositions and optimise health choices based on your DNA",
    "Biological age testing to measure how well your body is ageing",
    "Comprehensive blood testing in partnership with a Longevity Doctor"
  ]

  const perfectForYou = [
    "You feel constantly drained, rely on caffeine and still experience energy crashes throughout the day?",
    "You struggle to get a good night's sleep, wake up feeling groggy even after plenty of rest, or have trouble falling and staying asleep?",
    "You're bloated, in discomfort, or experiencing other digestive issues slowing you down, leaving you wondering if your gut health is holding you back?",
    "You have been wanting to make lifestyle changes but feel stuck, overwhelmed, or unsure of where to even begin?",
    "Stress or burnout is making it difficult for you to relax, enjoy life, and find balance in your day-to-day?",
    "You think you're eating healthily but aren't sure if you're choosing the right foods for your body's unique needs?",
    "You find it hard to focus, think clearly or you're dealing with brain fog or memory lapses that affect your productivity?",
    "You are concerned about ageing and your long-term health, and want to know how to take proactive steps to stay vibrant and healthy?"
  ]

  const outcomes = [
    "Feel energised and productive throughout the day without needing to rely on caffeine",
    "Finally get deep, restorative sleep, waking up refreshed and ready to take on whatever comes your way",
    "Learn exactly what foods are right for your body's needs, so you can make the best choices for your health",
    "Improve your digestion and gut health, boosting your energy and overall wellbeing",
    "Clear the mental fog, sharpen your focus, and stay on top of tasks with ease",
    "Build healthy habits that actually stick, so you can make lasting changes without feeling overwhelmed",
    "Reduce stress, avoid burnout, and create a sense of balance in your life",
    "Take control of your long-term health with personalised strategies designed to help you age gracefully and stay strong for years to come"
  ]

  return (
    <>
      <Helmet>
        <title>Personalised Health Coaching Australia | Biohacking Coach Sydney | Camilla Thompson</title>
        <meta name="description" content="Transform your health with Australia's leading personalised health coaching program. Camilla Thompson, expert biohacking coach Sydney, specialises in longevity coaching and women's health optimisation." />
        <meta name="keywords" content="personalised health coaching Australia, biohacking coach Sydney, longevity coach Australia, women's health coach Australia, health optimisation Australia, nationally recognised nutritionist Australia, wellness coach Australia" />
        <meta property="og:title" content="Optimise Your Life | Personalised Biohacking Program" />
        <meta property="og:description" content="Australia's personalised biohacking program with DNA testing, custom protocols, and expert coaching for optimal health & longevity." />
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://biohackme.com.au/superchargeyourlife" />
        <meta property="og:image" content="https://biohackme.com.au/coaching-program-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Optimise Your Life | Personalised Biohacking Program" />
        <meta name="twitter:description" content="Transform your health with personalised biohacking coaching, DNA testing, and custom protocols." />
        <link rel="canonical" href="https://biohackme.com.au/superchargeyourlife" />
        
        {/* Schema markup for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Optimise Your Life Coaching Program",
            "description": "Personalised 3-month biohacking coaching program with DNA testing, custom protocols, and expert support for optimal health & longevity",
            "provider": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "Biohacking Expert, Nutritionist & Wellbeing Coach",
              "description": "Expert biohacking coach, nutritionist, and wellbeing coach specialising in personalised health optimisation"
            },
            "serviceType": "Health Coaching",
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Biohacking Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "DNA Testing & Analysis",
                    "description": "Comprehensive genetic testing to understand your unique biological blueprint"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Personalized Protocols",
                    "description": "Custom nutrition, supplement, and lifestyle strategies based on your genetics"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Brain Optimization",
                    "description": "Advanced techniques for cognitive enhancement and mental performance"
                  }
                }
              ]
            },
            "offers": {
              "@type": "Offer",
              "description": "3-month intensive biohacking coaching program",
              "duration": "P3M",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>


      {/* Hero Section */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        <Header />
        
        {/* Ocean Wave Background */}
        <div className="absolute inset-0">
          {/* Ocean wave pattern */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ocean/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-sky/15 to-transparent"></div>
          
          {/* Floating ocean elements */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-ocean/5 to-sky/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-1/3 right-10 w-80 h-80 bg-gradient-to-l from-sky/8 to-ice/15 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-ocean/8 to-transparent rounded-full blur-xl opacity-40"></div>
          
          
          {/* Wave-like gradients */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-ice via-cloud/50 to-transparent opacity-30"></div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-left mb-8"
              >
                <span className="bg-gradient-to-r from-ocean to-sky text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-medium">
                  <span className="hidden sm:inline">SIGNATURE </span>COACHING PROGRAM
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-montserrat font-bold leading-tight mb-4"
              >
                <span className="bg-gradient-to-r from-ocean to-sky bg-clip-text text-transparent">
                  OPTIMISE
                </span>{' '}
                <span className="text-charcoal font-light">YOUR LIFE</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl md:text-3xl font-light text-ocean mb-6"
              >
                3-Month Personalised Biohacking Program
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg text-charcoal/70 leading-relaxed mb-8"
              >
                Transform your health with personalised biohacking strategies. This 3-month program combines cutting-edge science with ancient therapies to optimise your body's performance and longevity.
              </motion.p>

              {/* DNA Methylation Differentiator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-gradient-to-r from-sky/10 to-ocean/10 rounded-2xl p-6 border border-ocean/20 mb-8"
              >
                <h3 className="text-xl font-semibold text-ocean mb-3 text-center">My Point of Difference</h3>
                <p className="text-charcoal/80 leading-relaxed text-center">
                  I use a <strong className="text-ocean">DNA Methylation Health Assessment</strong> with my coaching program. This takes the guesswork out of coaching and means I can create a truly personalised plan for your unique genetic blueprint — no more one-size-fits-all approaches.
                </p>
              </motion.div>

              {/* Carmen Bekker Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mb-8"
              >
                <div className="bg-gradient-to-r from-ice/50 to-cloud/50 rounded-2xl p-6 border border-sky/20">
                  <blockquote className="text-lg text-charcoal/80 italic leading-relaxed mb-4 text-center">
                    "Camilla is an absolutely fantastic wellness coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session."
                  </blockquote>
                  <div className="text-center text-ocean font-semibold">
                    Carmen Bekker, Lead Partner, KPMG Consulting
                  </div>
                </div>
              </motion.div>

              {/* Book Discovery Call Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex justify-center mb-12"
              >
                <motion.a
                  href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-ocean to-sky text-white px-8 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
                >
                  BOOK DISCOVERY CALL
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
              </motion.div>


            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative">
                <img
                  src="/images/How we work together/Biohackme website images13.webp"
                  alt="Camilla Thompson - 1:1 Biohacking Coaching"
                  className="shadow-2xl w-full max-w-lg mx-auto rounded-2xl object-cover aspect-square"
                />
              </div>
              
              {/* 1:1 Coaching CTA - Matched to image height */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-r from-ice to-cloud rounded-2xl p-8 border border-sky/20 h-full flex flex-col justify-center max-w-lg mx-auto">
                  <div className="text-center">
                    <h3 className="text-xl font-medium text-ocean mb-4">
                      Looking for personalised 1:1 support?
                    </h3>
                    <p className="text-charcoal/70 mb-6 text-base leading-relaxed">
                      Choose from 30-minute sessions, 1-hour deep dives, or executive coaching
                    </p>
                    <motion.a
                      href="#one-on-one-coaching"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-ocean to-sky text-white px-8 py-3 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
                    >
                      VIEW 1:1 COACHING OPTIONS
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* This Program is Right for You */}
      <section id="program-details" className="py-12 md:py-20 bg-ice relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-64 h-64 border border-ocean rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 border border-sky rounded-full"></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-ocean mb-8">
              This program is right for you if...
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-4">
              {perfectForYou.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-sky/10"
                >
                  <CheckCircle className="w-5 h-5 text-sky mr-3 mt-1 flex-shrink-0" />
                  <p className="text-charcoal/80 leading-relaxed text-base">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included Section - Clean Style */}
      <section className="py-12 md:py-20 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center mb-16"
          >
            <div className="inline-block border border-charcoal/30 rounded-full px-8 py-3 mb-8">
              <span className="text-charcoal font-medium tracking-wide">WHAT IS INCLUDED IN THE PROGRAM</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-charcoal mb-12 leading-relaxed">
              This 3-month program focuses on empowering you to biohack your life and make essential lifestyle changes.
            </h2>
            
            
            {/* You'll Get Section - Enhanced with boxes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-2xl font-semibold text-ocean mb-8 text-center">You'll get:</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {programIncludes.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-ice to-white rounded-2xl p-6 shadow-lg border border-sky/20"
                  >
                    <div className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-sky mr-4 mt-1 flex-shrink-0" />
                      <p className="text-charcoal/80 leading-relaxed font-medium">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Optional Testing Section - Enhanced with box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-cloud to-ice rounded-2xl p-8 border border-ocean/10 shadow-lg">
                  <h3 className="text-2xl font-semibold text-ocean mb-6 text-center">Optional Testing</h3>
                  <div className="max-w-3xl mx-auto">
                    <div className="space-y-3 text-charcoal/80 leading-relaxed text-left">
                      {optionalTesting.map((test, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-sky rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-left">{test}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-ocean font-medium mt-6 text-sm">
                    Available in Month 1 for additional cost
                  </p>
                  <div className="mt-6 pt-4 border-t border-ocean/20">
                    <p className="text-xs text-charcoal/60 text-center italic">
                      * I work closely with functional doctors and naturopaths to refer my clients when their needs extend beyond my scope of practice, ensuring comprehensive care and support.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Pricing Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 pt-8 border-t border-ocean/20"
            >
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-ocean mb-8">Program Investment</h3>
                <div className="bg-gradient-to-br from-ice to-white rounded-2xl p-8 border border-ocean/10 shadow-lg max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-ocean mb-2">$1,500</div>
                    <div className="text-charcoal/80">+ GST (3-month program)</div>
                    <div className="text-sm text-charcoal/60 mt-2">Including DNA Methylation test valued at $350</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href="https://buy.stripe.com/6oU14p301eWK9FNcvc5Ne00"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
                    >
                      PAY NOW - START TODAY
                    </motion.a>
                    <motion.a
                      href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white border-2 border-ocean text-ocean px-6 py-3 rounded-full font-medium text-base hover:bg-ocean hover:text-white transition-all duration-300 inline-flex items-center justify-center"
                    >
                      BOOK DISCOVERY CALL
                    </motion.a>
                  </div>
                  
                  <p className="text-center text-charcoal/60 mt-4 text-sm">
                    Secure payment via Stripe • Payment plans available
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-ocean to-sky text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light mb-8">
              With the Optimise Your Life program, you can:
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start bg-white/10 backdrop-blur rounded-xl p-6"
                >
                  <CheckCircle className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" />
                  <p className="text-white/90 leading-relaxed">{outcome}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Additional CTA after outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <h3 className="text-2xl font-montserrat font-light text-white mb-6">
                Ready to transform your health?
              </h3>
              <motion.a
                href="https://calendly.com/thewellnesscoachsession/15min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-ocean px-8 py-3 rounded-full font-medium hover:bg-ice transition-colors inline-flex items-center"
              >
                Start with a Discovery Call
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3-Month Program Breakdown */}
      <section className="py-12 md:py-20 bg-cloud">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-ocean mb-6">
              Optimise your life in 3 Months
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Month 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-ocean to-sky rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                  1
                </div>
                <h3 className="text-2xl font-montserrat font-light text-ocean mb-6">MONTH ONE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Personalised DNA Health Assessment</h4>
                    <p className="text-sm text-charcoal/70">We'll use a DNA Methylation saliva test to uncover how your genes impact detoxification, mood, energy, hormones, digestion and more.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Nutrition for Gut Health & Energy</h4>
                    <p className="text-sm text-charcoal/70">Personalised dietary recommendations based on your test results and genetic profile.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Optional Comprehensive Testing</h4>
                    <p className="text-sm text-charcoal/70">Biometric, microbiome, genetic, biological age, and comprehensive blood testing.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Optimising Sleep for Recovery</h4>
                    <p className="text-sm text-charcoal/70">Leveraging your chronotype, we'll implement strategies to enhance sleep quality and recovery.</p>
                  </div>
                </div>
              </motion.div>

              {/* Month 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-sky to-ocean rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                  2
                </div>
                <h3 className="text-2xl font-montserrat font-light text-ocean mb-6">MONTH TWO</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Personalised Biohacking Plan</h4>
                    <p className="text-sm text-charcoal/70">Based on your assessments, we'll develop a customised biohacking plan tailored to your unique biology and goals.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Cognitive Biohacks</h4>
                    <p className="text-sm text-charcoal/70">Focus on enhancing cognitive function with nootropics, stress management techniques, and personalised mental performance strategies.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Longevity Strategies & Cellular Health</h4>
                    <p className="text-sm text-charcoal/70">Focus on biohacks that promote cellular longevity, such as NAD+ therapy, mitochondrial health, and anti-inflammatory diets.</p>
                  </div>
                </div>
              </motion.div>

              {/* Month 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-ocean to-sky rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6">
                  3
                </div>
                <h3 className="text-2xl font-montserrat font-light text-ocean mb-6">MONTH THREE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Gut-Supportive Supplements & Practices</h4>
                    <p className="text-sm text-charcoal/70">Incorporating personalised supplements, probiotics, and digestive strategies based on your microbiome test results.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Energy Management & Stress Resilience</h4>
                    <p className="text-sm text-charcoal/70">Focus on sustaining energy levels and improving stress resilience through habit stacking, movement, and nutrition hacks.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-ocean mb-2">Your Biohacking Routine</h4>
                    <p className="text-sm text-charcoal/70">Integrate all biohacks into a sustainable, long-term routine with a clear, actionable plan to maintain optimal health.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Biohacking Framework Section */}
      <section className="py-12 md:py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-ice to-transparent rounded-full opacity-30 -translate-x-48"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-cloud to-transparent rounded-full opacity-40 translate-x-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-ocean mb-8">
              Identify Your Key Areas for Biohacking
            </h2>
            <p className="text-xl text-charcoal/70 leading-relaxed max-w-4xl mx-auto">
              Using the biohacking framework 8 pillars: <span className="font-semibold text-ocean">sleep, energy, brain, mood, body, health, relationships, and environment</span>, we will evaluate and rate each area of your life to determine where you need the most support.
            </p>
          </motion.div>
          
          {/* 8 Pillars Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { icon: Moon, label: "Sleep" },
              { icon: Zap, label: "Energy" }, 
              { icon: Brain, label: "Brain" },
              { icon: Heart, label: "Mood" },
              { icon: Activity, label: "Body" },
              { icon: Shield, label: "Health" },
              { icon: Heart, label: "Relationships" },
              { icon: TreePine, label: "Environment" }
            ].map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-ice to-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-ocean/10"
                >
                  <div className="text-ocean mb-3">
                    <IconComponent className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="text-ocean font-medium text-sm">{pillar.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-ice">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-ocean mb-6">
              What My Clients Say
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Real results from high performing leaders who've transformed their health and performance
            </p>
          </motion.div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <p className="text-charcoal/80 italic leading-relaxed mb-6 text-sm">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-ocean text-base">{testimonial.name}</h4>
                    <p className="text-charcoal/60 text-xs">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-ocean to-sky text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light mb-8">
              Ready to Optimise Your Life?
            </h2>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-white/80">Months to Transform</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">DNA</div>
                  <div className="text-white/80">Testing Included</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-white/80">Personalised</div>
                </div>
              </div>
            </div>

            <motion.a
              href="https://calendly.com/thewellnesscoachsession/15min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-ocean px-6 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              BOOK YOUR DISCOVERY CALL
            </motion.a>
            
            <p className="mt-6 text-white/80">
              $1,500 + GST including DNA test • Payment plans available
            </p>
          </motion.div>
        </div>
      </section>


      {/* 1:1 Coaching Section */}
      <section id="one-on-one-coaching" className="py-12 md:py-20 bg-gradient-to-br from-sky to-ocean text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-block bg-white/10 rounded-full px-6 py-2 mb-8">
              <span className="text-white font-medium tracking-wide">1:1 COACHING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light mb-8">
              Personalised One-on-One Sessions
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
                    href="https://calendly.com/thewellnesscoachsession/30-minute-coaching-session"
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

              {/* Executive Coaching */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto">
                    EXEC
                  </div>
                  <h3 className="text-2xl font-montserrat font-light text-white mb-4">Executive Coaching</h3>
                  <div className="text-3xl font-bold text-white mb-2">TBC</div>
                  <div className="text-white/80">Cost to be confirmed</div>
                </div>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Executive-level health optimisation</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Leadership performance enhancement</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">Strategic wellness planning</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                    <p className="text-white/90">C-suite focused approach</p>
                  </div>
                </div>

                <div className="text-center mt-auto">
                  <motion.a
                    href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-ocean px-8 py-2 rounded-full font-medium hover:bg-ice transition-colors inline-flex items-center"
                  >
                    CONTACT FOR DETAILS
                    <ArrowRight className="ml-2 w-4 h-4" />
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
                    <p>• Specific health challenges</p>
                    <p>• Quick biohacking guidance</p>
                    <p>• Energy optimization</p>
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

      {/* Free Guide CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl font-montserrat font-light text-ocean mb-6">
              Download my FREE BIOHACKME GUIDE!
            </h3>
            <p className="text-lg text-charcoal/70 mb-8 leading-relaxed">
              I've spent a long time perfecting this guide to offer you the ideal starting point for your biohacking journey. This guide provides all the information, tips, and tricks you need to get started.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8 items-center">
              {/* Guide Image */}
              <div className="flex justify-center">
                <img 
                  src="/images/Freebie.webp" 
                  alt="Free BiohackMe Guide"
                  className="max-w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>

              {/* What's in the Guide */}
              <div className="bg-ice rounded-2xl p-6">
                <h4 className="text-xl font-medium text-ocean mb-4">WHAT'S IN THIS GUIDE?</h4>
                <div className="space-y-2 text-left">
                  {[
                    "WTF is Biohacking?",
                    "What is a Biohacker Mindset?",
                    "Biohacking Framework",
                    "Biohacking on a Budget",
                    "Biohacking Technologies",
                    "Top 10 Biohacks"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-sky mr-3" />
                      <span className="text-charcoal/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <motion.a
                  href="/freebie"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium text-base shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
                >
                  CLICK HERE TO DOWNLOAD
                  <ArrowRight className="ml-2 w-4 h-4" />
                </motion.a>
                
                <div className="text-center">
                  <p className="text-charcoal/60 mb-3">Ready for personalised guidance?</p>
                  <motion.a
                    href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border-2 border-ocean text-ocean px-4 py-2 rounded-full font-medium text-sm hover:bg-ocean hover:text-white transition-colors"
                  >
                    Book Your Discovery Call
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <CoachingContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

    </>
  )
}