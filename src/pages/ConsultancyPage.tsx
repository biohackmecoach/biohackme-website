import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  CheckCircle,
  Users,
  Star,
  ArrowRight,
  Building2,
  Target,
  TrendingUp,
  Shield,
  Award,
  Zap,
  Globe,
  BarChart3,
  Lightbulb,
  Plane,
  Hotel,
  Briefcase,
  Brain,
  Heart
} from 'lucide-react'

export default function ConsultancyPage() {
  const services = [
    {
      icon: <Hotel className="w-12 h-12" />,
      title: "Executive Biohacking Suites",
      subtitle: "For Luxury Hotels & Premium Hospitality",
      description: "Premium wellness technology integration for discerning hotel brands",
      features: [
        "Transform guest experiences from accommodation to active healthspan optimisation",
        "Comprehensive executive experiences incorporating diet optimisation and recovery protocols",
        "Complete design, implementation, and staff training for seamless integration"
      ]
    },
    {
      icon: <Plane className="w-12 h-12" />,
      title: "Aviation Wellness Innovation",
      subtitle: "For Premium Airlines & Executive Travel",
      description: "World's first in-flight biohacking cabin concepts and longevity lounges",
      features: [
        "Transform ultra-long-haul travel from jet-lagged to jet-optimised",
        "Executive lounge experiences that enhance rather than deplete",
        "Circadian optimisation, advanced recovery protocols, and jet lag elimination"
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Corporate Longevity Programs",
      subtitle: "High-Performance Organisations",
      description: "Executive wellness programs with medical-grade biohacking technology deployment",
      features: [
        "Wellness programmes proven to reduce healthcare costs by 15-30%",
        "Productivity enhancement through science-backed performance protocols",
        "Exclusive implementations for forward-thinking companies"
      ]
    }
  ]

  const whyBiohackMe = [
    {
      title: "Tech-Backed. Research-Led.",
      description: "Every recommendation is grounded in the latest longevity science and peer-reviewed research."
    },
    {
      title: "Recovery is the New Hustle.",
      description: "Advanced recovery isn't an add-on — it's the foundation of high performance."
    },
    {
      title: "Boutique by Design.",
      description: "We work exclusively with select brands and organisations to deliver hyper-personalised solutions with discretion and depth."
    },
    {
      title: "Unrivalled Access.",
      description: "Strategic partnerships with best-in-class wellness technologies: red light, circadian lighting, HBOT, cryo, wearables, hydrogen water, and more."
    },
    {
      title: "From Start to Sustain.",
      description: "We handle the full journey — from initial audit to implementation, activation, and ongoing optimisation."
    },
    {
      title: "First-Mover Advantage.",
      description: "Be amongst the first to integrate next-generation wellness technology and lead your industry into the future of human performance."
    }
  ]

  const clientFocus = [
    {
      category: "Luxury Hospitality",
      description: "Boutique hotels, wellness retreats, exclusive member clubs, premium resorts"
    },
    {
      category: "Premium Travel",
      description: "Executive aviation, ultra-long-haul carriers, luxury travel experiences"
    },
    {
      category: "Select Organisations",
      description: "Innovation-focused companies, executive wellness programmes, high-performance teams"
    }
  ]

  return (
    <>
      <Helmet>
        <title>Luxury Hotel & Executive Wellness Consultancy | BiohackMe Partners</title>
        <meta name="description" content="Transform your luxury brand with our pioneering wellness consultancy. Executive biohacking suites for premium hotels, aviation wellness innovation, and corporate longevity programs for high-performance organizations." />
        <meta name="keywords" content="luxury hotel wellness consultancy, executive biohacking services, corporate longevity programs, premium wellness technology integration, aviation wellness innovation, biohacking technology for luxury hotels, executive wellness suite design, corporate healthspan optimization" />
        <meta property="og:title" content="Luxury Hotel & Executive Wellness Consultancy | BiohackMe Partners" />
        <meta property="og:description" content="Transform your luxury brand with cutting-edge wellness technology integration for hotels, airlines, and corporations." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "BiohackMe Partners",
            "description": "Luxury wellness consultancy for hotels, airlines and corporations",
            "url": "https://www.biohackme.com.au/consultancy",
            "serviceType": "Wellness Consultancy",
            "areaServed": ["Australia", "Asia Pacific", "Global"],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sydney",
              "addressCountry": "AU"
            },
            "priceRange": "$$$$"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-ice via-cloud to-white">
        <Header />

        {/* Hero Section */}
        <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-ocean mb-6 font-montserrat leading-tight">
                  Executive Wellness & Longevity
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ocean to-sky">
                    Consultancy for Luxury Brands
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-4xl mx-auto">
                  Optimising Executive Travel and Performance Environments
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-5xl mx-auto">
                  BioHackMe is a <strong>next-generation global consultancy</strong> redefining how luxury hotels, premium travel brands and high-performance companies integrate cutting-edge biohacking into their environments.
                </p>
                <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-5xl mx-auto">
                  <strong>This is more than consulting. It's architecture for the future of human optimisation.</strong>
                </p>

                <div className="flex justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300"
                  >
                    Book Consultation Call
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Banner */}
        <section className="py-16 px-4 bg-gradient-to-br from-sky via-ocean to-sky">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
                Innovative Longevity &
                <span className="block">
                  Healthspan Services
                </span>
              </h2>
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium border border-white/30">
                Launching 2025
              </div>
            </div>
          </div>
        </section>

        {/* Services Content */}
        <section className="py-20 px-4 bg-gradient-to-br from-sky/10 via-white to-ice/40">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-sky/20 h-full flex flex-col"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-ocean mb-3 font-montserrat min-h-[3rem]">
                        {service.title}
                      </h3>
                      <div className="bg-gradient-to-r from-sky to-ocean text-white px-4 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                        {service.subtitle}
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed min-h-[4rem]">
                        {service.description}
                      </p>
                    </div>
                    <div className="space-y-3 mt-auto">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-sky mr-3 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why BiohackMe - Blue Theme */}
        <section className="py-20 px-4 bg-gradient-to-br from-sky via-ocean to-sky">
          <div className="max-w-6xl mx-auto">

            {/* Header with Image */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left - Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img
                  src="/images/How we work together/Biohackme website images13.webp"
                  alt="Camilla Thompson - BiohackMe Founder"
                  className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Right - Content */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
                  WHY BIOHACKME?
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-ice to-white mx-auto lg:mx-0 mb-6"></div>
                <p className="text-xl text-white/90 leading-relaxed">
                  Founded by Camilla Thompson, BiohackMe brings cutting-edge science and proven strategies to optimise workplace wellness, corporate performance, and premium travel brands.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyBiohackMe.map((edge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 text-center border border-white/20 hover:border-white/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4 font-montserrat">
                      {edge.title}
                    </h3>
                    <p className="text-ice/90 leading-relaxed">
                      {edge.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Client Focus */}
        <section className="py-16 px-4 bg-gradient-to-l from-ice/30 via-sky/5 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-ocean mb-4 font-montserrat">
                Client Focus
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {clientFocus.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  <h3 className="text-xl font-bold text-ocean mb-3 font-montserrat">
                    {client.category}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {client.description}
                  </p>
                  <div className="flex justify-center mt-auto">
                    <span className="font-semibold text-white bg-gradient-to-r from-ocean to-sky px-4 py-2 rounded-full text-sm">
                      Now Accepting Partnerships
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Ready to Pioneer */}
        <section className="py-16 px-4 bg-gradient-to-r from-ocean to-sky text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-montserrat">
                Ready to Pioneer the Future?
              </h2>
              <p className="text-xl text-white/95 mb-4 leading-relaxed">
                <strong>Launch your brand into the next era of human optimisation.</strong>
              </p>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Transform your competitive advantage through science-backed longevity technology that delivers measurable results whilst positioning your organisation as an industry innovator.
              </p>

              <div className="space-y-4 mb-8">
                <p className="text-white/90">
                  <strong>Strategic Consultation:</strong> Available for qualified luxury brands and forward-thinking organisations ready to lead their industry
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-ice to-white rounded-3xl p-12 shadow-2xl border border-ocean/10"
            >

              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  <strong>Contact:</strong> hello@biohackme.com.au
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-500 italic text-sm">
                    Supercharging human performance through cutting-edge wellness technology integration.
                  </p>
                  <p className="text-gray-500 italic text-sm">
                    Where science meets luxury. Where innovation meets results.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}