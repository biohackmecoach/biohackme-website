import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TalksPage() {

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Corporate Wellness Speaker Australia | Biohacking Keynote Speaker | Camilla Thompson</title>
        <meta name="description" content="Book Australia's leading corporate wellness speaker and biohacking expert Camilla Thompson. Specialising in workplace wellness programs, health optimisation talks, and keynote presentations." />
        <meta name="keywords" content="corporate wellness speaker Australia, biohacking keynote speaker, workplace wellness programs, health speaker Australia, wellness keynote speaker, biohacking talks Australia, longevity speaker Australia" />
        <meta property="og:title" content="Biohacking Talks | Camilla Thompson - Expert Speaking Engagements" />
        <meta property="og:description" content="Book Camilla Thompson for innovative biohacking talks and speaking engagements." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biohackme.co.nz/talks" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Biohacking Talks | Camilla Thompson" />
        <meta name="twitter:description" content="Book Camilla Thompson for innovative biohacking talks and speaking engagements." />
        
        {/* Schema Markup for Speaking Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Biohacking Speaking Engagements",
            "description": "Professional speaking services on biohacking, longevity, and wellness optimization",
            "provider": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "Biohacking Coach & Wellness Speaker",
              "url": "https://biohackme.co.nz",
              "sameAs": [
                "https://www.instagram.com/biohackmecoach/",
                "https://www.facebook.com/profile.php?id=61556971331791"
              ]
            },
            "serviceType": "Professional Speaking",
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "offers": {
              "@type": "Offer",
              "description": "Biohacking Basics Talk - Corporate wellness presentations",
              "availability": "InStock"
            }
          })}
        </script>
      </Helmet>

      
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-ocean via-sky to-ocean min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-l from-ice/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 pt-20 sm:pt-36 md:pt-40 lg:pt-48 pb-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* Left - Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white lg:order-1"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-8">
                  BIOHACKING TALKS
                </h1>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                  Step into the forefront of longevity with these innovative and cutting-edge talks that redefine health and wellbeing.
                </p>
                <p className="text-lg mb-8 leading-relaxed">
                  Evidence-based strategies that can seamlessly fit into your daily routine to help you optimise your energy, sleep, relationships, environment, body and mood.
                </p>
                <a
                  href="mailto:hello@biohackme.com.au?subject=Speaking Engagement Inquiry"
                  className="inline-block bg-white text-ocean px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-ice transition-colors"
                >
                  Get in touch to book a talk
                </a>
              </motion.div>

              {/* Right - Hero Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative lg:order-2"
              >
                <img
                  src="/images/How we work together/Biohackme website images18.webp"
                  alt="Camilla Thompson - Biohacking Speaker"
                  className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto object-cover rounded-lg shadow-2xl"
                  loading="lazy"
                />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Speaking Packages Section */}
      <div className="py-16 bg-gradient-to-br from-ice via-cloud to-sky/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ocean mb-8">
                Speaking Packages
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Transform your event with evidence-based biohacking insights. Choose from flexible formats designed to meet your audience's needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Keynote Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">Keynote</h3>
                  <p className="text-gray-600 text-sm">60-90 Minutes</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Presentations designed to inspire and educate large audiences on biohacking fundamentals.
                </p>
              </motion.div>

              {/* Speaker + Book Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">Speaker + Book Package</h3>
                  <p className="text-gray-600 text-sm">90 Min Keynote + Book</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Biohacking Basics keynote presentation plus signed copies of "Biohack Me" book for all attendees.
                </p>
              </motion.div>

              {/* Masterclass Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">Masterclass Workshops</h3>
                  <p className="text-gray-600 text-sm">3-4 Hours</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Intensive hands-on workshops with practical tools and actionable strategies for immediate implementation.
                </p>
              </motion.div>

              {/* Offsites Package */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-ocean mb-2">Offsites</h3>
                  <p className="text-gray-600 text-sm">Half Day - Full Day</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Education with practical tools and team-building experiences for enhanced corporate productivity and wellbeing.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <a
                href="mailto:hello@biohackme.com.au?subject=Speaking Package Inquiry"
                className="inline-block bg-ocean text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Custom Quote
              </a>
            </motion.div>

            {/* Previous Talks Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20"
            >
              <h3 className="text-3xl font-serif font-bold text-ocean mb-8 text-center">Biohacking talks have been delivered to</h3>

              {/* Company Logos Banner */}
              <div className="bg-ocean p-8 rounded-2xl mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                  <img src="/talks logos/SUPER-RETAIL-GROUP.avif" alt="Super Retail Group" width="200" height="64" className="h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/talks logos/lendlease-logo-white.avif" alt="Lendlease" width="200" height="64" className="h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/talks logos/Brand Logos-02.avif" alt="Canva" width="200" height="64" className="h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                  <img src="/talks logos/Logo.avif" alt="KPMG" width="200" height="64" className="h-16 object-contain opacity-90 hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="text-center">
                <a
                  href="mailto:hello@biohackme.com.au?subject=Speaking Engagement - Company Talk Request"
                  className="inline-block bg-ocean text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-sky transition-colors"
                >
                  Get in touch to book a talk for your company today
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-12 md:py-20 bg-gradient-to-br from-ice/50 to-cloud/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-ocean mb-4">
                What Clients Say
              </h2>
              <p className="text-lg text-gray-700">
                Hear from organisations who've experienced Camilla's transformative talks
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-700 italic leading-relaxed mb-6">
                  "Camilla made complex biohacking concepts clear and practical. Her talk at Lendlease was informative, engaging, and resonated with everyone in the room."
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-ocean text-lg">Angelique Posticescu</h4>
                  <p className="text-gray-600 text-sm">National Workplace Experience Manager, Lendlease</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-700 italic leading-relaxed mb-6">
                  "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies. Leaders left recharged, inspired, and equipped with tools to sustain vitality and drive transformational change."
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-ocean text-lg">Kevin Figueiredo</h4>
                  <p className="text-gray-600 text-sm">Chief People & Safety Officer, Super Retail Group</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-700 italic leading-relaxed mb-6">
                  "Camilla is a regular and extremely popular guest speaker at the Elysia Wellness Retreat. This weekend, she launched a new presentation focused on biohacking for longevity. Her session was both powerful and relatable, providing guests with motivational tools to improve their lives one biohack at a time."
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-ocean text-lg">Mel Ingham</h4>
                  <p className="text-gray-600 text-sm">Elysia Wellness</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-700 italic leading-relaxed mb-6">
                  "Camilla is highly-recommended as a speaker and coach. Her natural skills and ability to frame ideas makes them immediately approachable and applicable. She has a wealth of knowledge to share!"
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-ocean text-lg">Troy Love</h4>
                  <p className="text-gray-600 text-sm">Pro Speaker, Coach, Author @WhatIsANuff, Conference Host & MC @GreatTalk</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Talk Section */}
      <div className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Talk One */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-ocean text-white p-8 rounded-lg mb-8">
                <h2 className="text-3xl font-serif font-bold mb-4">TALK ONE:</h2>
                <h3 className="text-4xl font-serif font-bold text-ice">BIOHACKING BASICS</h3>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h4 className="text-2xl font-serif font-bold text-ocean mb-6">
                  What if we could defy the traditional limitations of ageing, by unraveling the secrets of longevity through the lens of biohacking?
                </h4>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  In a world inundated with information about health and wellness, biohacking emerges as a beacon of hope, 
                  offering a personalised approach to optimising human potential, backed by science. Join expert wellbeing 
                  coach and behaviour change specialist, Camilla Thompson for a transformative talk. As she delves into the 
                  concept of biohacking; where each small daily adjustment has the power to elevate your health and optimize your wellbeing.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  Drawing on cutting-edge research in genetics, health sciences and holistic wellness practices, Camilla, 
                  shares her inspiring journey through biohacking to achieve better health, happiness, and longevity. 
                  Having lived with a debilitating mysterious illness for almost a decade, Camilla became a dedicated biohacker. 
                  Seeking innovative strategies to optimise her health and support her immune system.
                </p>
              </div>
            </motion.div>

            {/* What Will Audience Gain Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16 bg-ice/30 p-8 rounded-lg"
            >
              <h3 className="text-3xl font-serif font-bold text-ocean mb-8">What will the audience gain?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    This talk explores the evolution of biohacking, positioning it as the future of living and ageing well 
                    by shifting your perspective on lifespan to healthspan.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Camilla fuses ancient therapies with evidence-based modern biohacking technologies, revealing how this 
                    incredible synergy can transform your quality of life and support longevity and pro-ageing.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    With practical insights into specific biohacking strategies and technologies, drawing from Camilla's 
                    personal experiences and the latest global research.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    It's impossible not to walk away from this session motivated to supercharge at least one area of your 
                    sleep, environment, relationships or diet; one biohack at a time.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Talk Two */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-sky text-white p-8 rounded-lg mb-8">
                <h2 className="text-3xl font-serif font-bold mb-4">TALK TWO:</h2>
                <h3 className="text-4xl font-serif font-bold text-ice">BIOHACKING, AI & THE FUTURE OF PERSONALISED HEALTH</h3>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h4 className="text-2xl font-serif font-bold text-ocean mb-6">
                  The future of health is here—and it's personal.
                </h4>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  With AI, data-driven insights, and cutting-edge biohacking, we now have the power to reverse ageing, optimise energy, and extend our healthspan like never before.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  Join Camilla Thompson, nutritionist, executive coach, biohacker, and author with a globally launching biohacking book in May, as she unveils the science behind ageing and shares practical strategies to upgrade your biology.
                </p>
              </div>

              {/* What Will Audience Gain for Talk Two */}
              <div className="bg-sky/10 p-8 rounded-lg mb-8">
                <h3 className="text-3xl font-serif font-bold text-ocean mb-8">What will the audience gain?</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">How AI is revolutionising personalised health and precision medicine</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">The science behind ageing and how we can actively slow or reverse it</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">The role of epigenetics in health and longevity, and how lifestyle choices impact gene expression</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">How bio-individuality influences nutrition, movement, and health strategies</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">Practical biohacks to improve energy, cognitive function, and resilience</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">How nutrition, movement, sleep, and stress management influence healthspan</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">How to prevent burnout and chronic disease with small, sustainable shifts</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">How data-driven health insights can optimise performance at work and in life</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Talk Three */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-ocean to-sky text-white p-8 rounded-lg mb-8 border-2 border-ocean/20">
                <h2 className="text-3xl font-serif font-bold mb-4 text-ice">KEYNOTE:</h2>
                <h3 className="text-4xl font-serif font-bold text-white">WE CAN DO HARD THINGS</h3>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h4 className="text-2xl font-serif font-bold text-ocean mb-6">
                  What if we could turn moments of hardship into moments of clarity and purpose?
                </h4>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Could the challenges we face actually guide us toward what truly matters and help us realign 
                  with our core values?
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  Camilla inspires audiences to see adversity as an advantage and stress as a source of 
                  strength. This keynote explores how we can find the hidden gifts in challenging times by shifting 
                  our perspective and embracing the hard things life throws our way.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  Camilla shares insights on turning obstacles into opportunities, leveraging stress to build 
                  resilience, and discovering personal growth through the toughest experiences. 
                  Encouraging us all to start prioritising our wellbeing, slow down, self-regulate, reconnect, 
                  treat ourselves better and acknowledge the strength we all have within.
                </p>
              </div>

              {/* What Will Audience Gain for Talk Three */}
              <div className="bg-cloud/30 p-8 rounded-lg mb-8">
                <h3 className="text-3xl font-serif font-bold text-ocean mb-8">After this keynote, you'll walk away with:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>A mindset shift:</strong> Learn how to reframe your thinking to see challenges as opportunities and a 
                      powerful catalyst for growth and success
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>Turning negativity bias into positivity:</strong> Discover strategies to overcome the brain's 
                      natural tendency to focus on the negative and shift towards positive outcomes
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>The ability to reduce your daily micro stresses:</strong> Giving yourself permission to slow down 
                      to become calmer, happier and more present
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>Tools for keeping clear boundaries</strong> around your time and energy and identifying your 
                      invisible mental, emotional and physical loads
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-4 h-4 bg-ocean rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      <strong>Knowledge about rituals, habits, and creating moments</strong> that contribute to your 
                      wellbeing with self-compassion and gratitude
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* About Camilla Section */}
      <div className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-ocean mb-8">ABOUT CAMILLA</h2>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img 
                  src="/images/camilla-main-headshot.jpg.webp"
                  alt="Camilla Thompson - Biohacking Coach and Speaker"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  loading="lazy"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                <h4 className="text-2xl font-serif font-bold text-ocean">
                  What if we could defy the traditional limitations of ageing, by unraveling the secrets of longevity through the lens of biohacking?
                </h4>
                
                <p className="text-gray-700 leading-relaxed text-lg">
                  A passionate advocate for personalised and preventative health, Camilla emphasises the importance of 
                  bio-individuality and the integration of ancient therapies with modern technologies. Camilla is 
                  committed to empowering individuals to supercharge their lives, one biohack at a time.
                </p>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://calendly.com/thewellnesscoachsession/15-minute-check-in-session"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-ocean text-white px-8 py-3 rounded-full font-semibold hover:bg-sky transition-colors"
                    >
                      BOOK DISCOVERY CALL
                    </a>
                    <Link
                      to="/about"
                      className="inline-block border-2 border-ocean text-ocean px-8 py-3 rounded-full font-semibold hover:bg-ocean hover:text-white transition-colors"
                    >
                      ABOUT ME
                    </Link>
                  </div>
                  <div className="mt-4">
                    <a
                      href="/media-kit.pdf"
                      download
                      className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      DOWNLOAD MEDIA KIT
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 md:py-20 bg-ocean text-white text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-serif font-bold mb-8">Ready to Transform Your Organisation?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Book Camilla for your next corporate wellness event, conference, or speaking engagement.
            </p>
            
            {/* Contact Form */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
              <form action="mailto:hello@biohackme.com.au" method="POST" encType="text/plain" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                      Company/Organisation
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-white mb-2">
                      Event Type (Optional)
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    >
                      <option value="" className="text-gray-800">Select event type (optional)</option>
                      <option value="keynote" className="text-gray-800">Keynote Speaking</option>
                      <option value="workshop" className="text-gray-800">Workshop</option>
                      <option value="conference" className="text-gray-800">Conference</option>
                      <option value="corporate" className="text-gray-800">Corporate Wellness</option>
                      <option value="other" className="text-gray-800">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Tell us about your event *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                    placeholder="Please share details about your event, audience size, date, location, and specific topics you'd like Camilla to cover..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-white text-ocean px-8 py-3 rounded-full font-semibold hover:bg-ice transition-colors shadow-lg hover:shadow-xl inline-flex items-center"
                  >
                    Send Enquiry
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Alternative contact info */}
            <div className="text-center mb-8">
              <p className="text-lg mb-4">Or reach out directly:</p>
              <p className="text-xl font-semibold mb-2">
                <a href="mailto:hello@biohackme.com.au" className="hover:text-ice transition-colors">
                  hello@biohackme.com.au
                </a>
              </p>
              <p className="text-sm text-white/80">@BIOHACKMECOACH</p>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/biohackmecoach/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61556971331791"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}