import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar, Users, Star, CheckCircle, Heart, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RetreatsPage = () => {
  return (
    <>
      <Helmet>
        <title>Luxury Biohacking Retreats Bali | Women's Longevity & Executive Wellness | BiohackMe</title>
        <meta name="description" content="Transform your health at our luxury biohacking retreats in Bali. Women's longevity programs, executive wellness experiences, and hormonal balance retreats at 5-star Revivo Resort." />
        <meta name="keywords" content="luxury biohacking retreat Bali, women's longevity retreat, executive wellness retreat, perimenopause biohacking retreat, women's hormonal balance retreat, luxury wellness retreat Revivo Bali, biohacking retreat for women over 40, mother daughter wellness retreat, luxury health retreat Indonesia" />
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
                "name": "Retreats",
                "item": "https://www.biohackme.com.au/retreats"
              }
            ]
          })}
        </script>
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice via-cloud to-sky/30 font-montserrat">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-ocean/20 to-sky/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-sky/20 to-ice/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-ice/30 to-ocean/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-block bg-gradient-to-r from-ocean to-sky text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                  LIVE WELL LONGER RETREATS
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-montserrat font-bold text-ocean mb-6 leading-tight">
                  Live Well Longer
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ocean to-sky">
                    Retreats
                  </span>
                </h1>

                {/* Awards & Recognition */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <motion.a
                    href="https://destinationdeluxe.com/award/destination-deluxe-awards-2025-finalists/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Winner Destination Deluxe Group Retreat of the Year 2025
                  </motion.a>

                  <motion.a
                    href="https://www.signatureluxurytravel.com.au/revivo-wellness-resort-bali/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Featured in Signature Luxury Travel
                  </motion.a>
                </div>

                <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
                  Transformational biohacking retreats designed to optimise your health, longevity, and wellbeing through science-backed practices and ancient wisdom.
                </p>
                <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                  Hosted by myself and Azra from Biohack-her at the award-winning Revivo Wellness Resort in Nusa Dua, Bali - a luxurious setting designed for healing and transformation.
                </p>

                {/* Award Image Showcase */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="max-w-md mx-auto mb-8"
                >
                  <img
                    src="/Images retreat Revivo/DD Retreat.jpg"
                    alt="Winner - Destination Deluxe Group Retreat of the Year 2025"
                    className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    loading="lazy"
                  />
                </motion.div>

              </motion.div>
            </div>
          </section>

          {/* Retreat Options Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-8">
                  Our Retreat Experiences
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Women's Biohacking Retreat */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-r from-ocean to-sky text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      SEPTEMBER 2026 • BALI
                    </div>
                    <h3 className="text-2xl font-bold text-ocean mb-4">Women's Biohacking Retreat</h3>
                    <div className="space-y-2 text-gray-600 mb-6">
                      <div className="flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        September 5-10, 2026
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Revivo Wellness Resort, Bali
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 mr-2" />
                        Women Only
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <img
                      src="/Images retreat Revivo/womens.JPG"
                      alt="Women's Biohacking Retreat at Revivo Wellness Resort Bali"
                      className="w-full h-48 object-cover rounded-xl mb-4"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The biohacking retreat every woman deserves. Focus on hormonal balance, longevity, and vitality
                    during perimenopause and menopause transitions.
                  </p>
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Comprehensive hormonal assessments and optimisation</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Perimenopause and menopause support protocols</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Women's longevity and vitality strategies</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Stress management and energy optimisation</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Luxury wellness experiences at 5-star Revivo Resort</span>
                    </div>
                  </div>
                  <motion.a
                    href="https://www.revivoresorts.com/wp-content/uploads/2024/12/BIOHACKING-Retreat-with-Camilla-and-Azra-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium hover:from-ocean/90 hover:to-sky/90 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                  >
                    LEARN MORE
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </motion.a>
                </motion.div>

                {/* Live Well Longer Retreat - Mixed */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-r from-ocean to-sky text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      MAY 2026 • BALI
                    </div>
                    <h3 className="text-2xl font-bold text-ocean mb-4">Live Well Longer Retreat</h3>
                    <div className="space-y-2 text-gray-600 mb-6">
                      <div className="flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        May 1-6, 2026
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Revivo Wellness Resort, Bali
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 mr-2" />
                        Women Only
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <img
                      src="/Images retreat Revivo/men & women.jpg"
                      alt="Live Well Longer Retreat for Women at Revivo Resort"
                      className="w-full h-48 object-cover rounded-xl mb-4"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our signature Live Well Longer retreat designed for women. A comprehensive 5-day biohacking experience focusing on longevity, optimal health, and sustainable wellness practices for life.
                  </p>
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Complete biohacking health assessments</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Longevity-focused protocols and strategies</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Advanced biohacking technologies</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Sustainable lifestyle implementation</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.a
                      href="https://www.livewelllongerretreats.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium hover:from-ocean/90 hover:to-sky/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full justify-center"
                    >
                      REGISTER INTEREST
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </motion.a>
                  </div>
                </motion.div>

                {/* Mother Daughter Retreat */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
                >
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-r from-sky to-ocean text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      2026 • DATES TBC
                    </div>
                    <h3 className="text-2xl font-bold text-ocean mb-4">Mother Daughter Retreat</h3>
                    <div className="space-y-2 text-gray-600 mb-6">
                      <div className="flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        2026 - Dates TBC
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Revivo Wellness Resort, Bali
                      </div>
                      <div className="flex items-center justify-center">
                        <Users className="w-4 h-4 mr-2" />
                        Mother & Daughter Pairs
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <img
                      src="/Images retreat Revivo/mother.jpg"
                      alt="Mother Daughter Retreat at Revivo Wellness Resort Bali"
                      className="w-full h-48 object-cover rounded-xl mb-4"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    A special bonding experience focusing on generational wellness. Learn biohacking fundamentals together
                    while strengthening your relationship and creating lasting healthy habits.
                  </p>
                  <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Intergenerational wellness workshops</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Shared biohacking experiences and learning</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Relationship strengthening activities</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Healthy habit formation for life</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Luxury wellness bonding at Revivo Resort</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.a
                      href="https://www.livewelllongerretreats.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium hover:from-ocean/90 hover:to-sky/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full justify-center"
                    >
                      REGISTER INTEREST
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ocean to-sky">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl text-center"
              >
                <div className="mb-6">
                  <h4 className="font-bold text-white text-xl mb-2">Amanda Smythe</h4>
                  <p className="text-white/80">Retreat Participant</p>
                </div>
                <p className="text-white italic text-lg leading-relaxed">
                  "The Live Well Longer Retreat exceeded all my expectations. I gained an enormous amount of knowledge and felt completely nurtured by the wonderful Camilla & Azra, as well as the beautiful Revivo Resort. It was a complete mind/body reset plus detailed planning and information to move forward with. Highly recommend."
                </p>
              </motion.div>
            </div>
          </section>

          {/* Why This Retreat Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl"
              >
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-ocean mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Why We Created These Retreats</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Modern life isn't exactly designed with optimal health in mind. We're juggling careers, caring roles, 
                  and the constant pressure to do more. Yet persistent fatigue, unexplained symptoms, hormone disruption, 
                  and mystery health issues keep holding us back from feeling our best.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These retreats get to the root causes of your health challenges. We uncover hidden issues like mould exposure, 
                  chronic fatigue triggers, hormone imbalances, and those frustrating mystery symptoms that conventional medicine 
                  can't explain. It's time to reclaim your energy and vitality.
                </p>
              </motion.div>
            </div>
          </section>

          {/* What You'll Experience Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-8">
                  What You'll Experience
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Daily Biohacking Masterclasses",
                    description: "Master the fundamentals with focused daily sessions: biohack your sleep, brain, nervous system, hormones, nutrition, mindset and behaviour change. Each masterclass provides practical tools for lasting transformation.",
                    icon: "",
                    image: "/Images retreat Revivo/Masterclass.jpg"
                  },
                  {
                    title: "Advanced Biohacking Treatments & Technologies",
                    description: "Experience cutting-edge wellness technologies including red light therapy, PEMF devices, hyperbaric chambers, cryotherapy, infrared saunas, breathwork sessions, Traditional Chinese Medicine, sound healing ceremonies, and sacred blessings with Balinese priests.",
                    icon: "",
                    image: "/Images retreat Revivo/biohacking.jpg"
                  },
                  {
                    title: "Functional Food That Loves You Back",
                    description: "Experience NŪTRIŌ restaurant's farm-to-table cuisine featuring locally sourced, organic ingredients free of chemicals and additives. Enjoy nutritious meals designed to support metabolic flexibility, gut health and hormonal balance - crafted using methods like sprouting, fermenting, and cold pressing to retain maximum nutrients.",
                    icon: "",
                    image: "/Images retreat Revivo/Food.jpg"
                  },
                  {
                    title: "Personalised Wellness Optimisation",
                    description: "Receive individual attention with one-on-one consultations, personalised biohacking protocols, and tailored wellness plans designed specifically for your unique health goals and biomarker results.",
                    icon: "",
                    image: "/Images retreat Revivo/personalised wellness.JPG"
                  },
                  {
                    title: "Comprehensive Pre & Functional Testing",
                    description: "Complete health baseline with pre-retreat testing, plus access to Revivo's state-of-the-art Vitality Centre for advanced biomarker analysis, metabolic testing, and longevity assessments to track your transformation.",
                    icon: "",
                    image: "/Images retreat Revivo/functional testing.JPG"
                  },
                  {
                    title: "Deep Connection",
                    description: "Reconnect with who you truly are, your essence and being. Connect with yourself and other like-minded people ready to rise. Find support, share stories, laugh, and become part of the Live Well Longer community.",
                    icon: "",
                    image: "/Images retreat Revivo/deep connection .jpg"
                  }
                ].map((experience, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                  >
                    {experience.image ? (
                      <div className="mb-4">
                        <img
                          src={experience.image}
                          alt={experience.title}
                          className="w-full h-48 object-cover rounded-xl"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-48 mb-4 bg-gradient-to-br from-ocean/10 to-sky/10 rounded-xl flex items-center justify-center">
                        <div className="text-ocean/40 text-6xl">{experience.icon}</div>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-ocean mb-4">{experience.title}</h3>
                    <p className="text-gray-700 leading-relaxed flex-grow">{experience.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Who This Is For Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-8">
                  This Retreat Is Perfect For You If...
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "You're done with quick fixes and cookie-cutter health advice",
                  "You're ready to reconnect with your body's wisdom",
                  "You're curious about using science to feel better, longer",
                  "You're craving rest, renewal, and a serious vitality upgrade",
                  "You're in midlife and want to thrive, not just survive",
                  "You want to understand your hormones during perimenopause/menopause"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start bg-white/70 rounded-xl p-4 shadow-md"
                  >
                    <CheckCircle className="w-5 h-5 text-ocean mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* What You'll Leave With Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-ocean to-sky text-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-montserrat font-light mb-12">
                  You'll Leave This Retreat Feeling...
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {['Clearer', 'Calmer', 'Energised', 'Empowered', 'Connected', 'Revitalised'].map((feeling, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/10 backdrop-blur rounded-2xl p-6 flex items-center justify-center"
                    >
                      <span className="text-2xl font-medium">{feeling}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-xl text-white/90 leading-relaxed">
                  Plus, you'll have practical tools, personalised insights, and a supportive community 
                  to maintain your transformation long after you return home.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-ice to-cloud">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-montserrat font-light text-ocean mb-8">
                  What Our Retreat Participants Say
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-1 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg text-center"
                >
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                    "I wish every woman in my life had the opportunity to do one of these retreats with Camilla and Azra. It was a perfect blend of spirituality, science, relaxation and girl time! Camilla and Azra had obviously put so much thought into all aspects of the retreat and it really showed in how much we learnt and the positivity and encouragement everyone felt upon heading home. I cant reccommend it highly enough."
                  </blockquote>
                  <div className="text-ocean font-semibold text-lg">
                    Rachel Comty
                  </div>
                  <div className="text-gray-500 text-sm">
                    Live Well Longer Retreat Participant
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-ice to-white rounded-3xl p-12 text-center shadow-2xl border border-ocean/10"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-ocean mb-6">
                  Ready to Transform Your Health?
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                  Join us for transformational biohacking retreats designed to optimise your health and longevity.
                  Multiple women-only experiences available throughout 2026.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="bg-ocean/10 px-4 py-2 rounded-full">
                    <span className="text-ocean font-medium">Women's Live Well Longer: May 1-6, 2026</span>
                  </div>
                  <div className="bg-ocean/10 px-4 py-2 rounded-full">
                    <span className="text-ocean font-medium">Mother-Daughter: 2026</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="https://www.revivoresorts.com/wp-content/uploads/2024/12/BIOHACKING-Retreat-with-Camilla-and-Azra-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-8 py-4 rounded-full font-bold text-lg hover:from-ocean/90 hover:to-sky/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    WOMEN'S RETREAT INFO
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </motion.a>

                  <motion.a
                    href="https://www.livewelllongerretreats.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center bg-gradient-to-r from-sky to-ocean text-white px-8 py-4 rounded-full font-bold text-lg hover:from-sky/90 hover:to-ocean/90 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    LIVE WELL LONGER RETREAT
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.a>
                </div>
                
                <p className="text-gray-600 mt-6 text-sm">
                  Questions? Contact us at <a href="mailto:hello@biohackme.com.au" className="text-ocean hover:underline">hello@biohackme.com.au</a>
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default RetreatsPage;