import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MailchimpNewsletter from '../components/MailchimpNewsletter'
import LogoLoop from '../components/LogoLoop'
import {
  BookOpenIcon,
  Users,
  PlayCircle,
  ShoppingBag,
  Star,
  ArrowRight,
  CheckCircle,
  Download,
  Brain,
  Heart
} from 'lucide-react'

export default function HomePage() {

  return (
    <>
      <Helmet>
        <title>Biohacking Coach Australia | DNA Testing & Health Optimization Sydney | Camilla</title>
        <meta name="description" content="Australia's leading biohacking coach specializing in DNA methylation testing, MTHFR analysis & personalized health optimization. Camilla - Expert nutritionist & longevity coach. Transform your health with data-driven biohacking strategies. Sydney & Australia-wide." />
        <meta name="keywords" content="biohacking coach Australia, DNA methylation testing Australia, MTHFR testing Sydney, health optimization Australia, functional medicine Australia, longevity coach Sydney, genetic testing Australia, biohacking Sydney, nutritionist Sydney, COMT gene testing, personalized nutrition Australia, sleep optimization coach, metabolic health coach, biological age testing, epigenetics Australia, performance optimization coach, red light therapy Sydney, contrast therapy, ice bath coaching, breathwork coach Australia, infrared sauna therapy, women's health biohacking, executive health coaching, nationally recognised nutritionist" />
        <meta name="author" content="Camilla Thompson" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href="https://www.biohackme.com.au/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.biohackme.com.au/" />
        <meta property="og:title" content="Biohackme Coach | Biohacking Australia" />
        <meta property="og:description" content="Optimise Your Life One BioHack at a Time with expert biohacking coach Camilla Thompson." />
        <meta property="og:image" content="https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp" />
        <meta property="og:site_name" content="BiohackMe" />
        <meta property="og:locale" content="en_AU" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.biohackme.com.au/" />
        <meta property="twitter:title" content="Biohackme Coach | Biohacking Australia" />
        <meta property="twitter:description" content="Optimise Your Life One BioHack at a Time with expert biohacking coach Camilla Thompson." />
        <meta property="twitter:image" content="https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp" />
        <meta property="twitter:site" content="@biohackmecoach" />
        <meta property="twitter:creator" content="@biohackmecoach" />
        
        {/* Additional SEO */}
        <meta name="language" content="en" />
        <meta name="geo.region" content="AU" />
        <meta name="geo.country" content="Australia" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BiohackMe",
            "description": "Australia's leading biohacking expert and health optimisation specialist",
            "url": "https://www.biohackme.com.au",
            "logo": "https://www.biohackme.com.au/logo-black.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sydney",
              "addressRegion": "NSW",
              "addressCountry": "AU"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@biohackme.com.au",
              "contactType": "customer service",
              "areaServed": "AU",
              "availableLanguage": "en"
            },
            "founder": {
              "@type": "Person",
              "name": "Camilla Thompson",
              "jobTitle": "Biohacking Expert, Nutritionist & Wellbeing Coach",
              "description": "Expert biohacking coach, nutritionist, and wellbeing coach specialising in personalised health optimisation strategies"
            },
            "sameAs": [
              "https://www.instagram.com/biohackmecoach/",
              "https://www.facebook.com/profile.php?id=61556971331791",
              "https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw",
              "https://www.tiktok.com/@biohackmecoach"
            ],
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "serviceType": [
              "Health Coaching",
              "Biohacking Consultation",
              "DNA Methylation Testing",
              "MTHFR Genetic Testing",
              "Functional Medicine",
              "Personalized Nutrition",
              "Sleep Optimization",
              "Longevity Coaching",
              "Executive Wellbeing Coaching",
              "Corporate Wellness",
              "Speaking Engagements",
              "Health Retreats",
              "Performance Optimization",
              "Metabolic Health Coaching"
            ],
            "priceRange": "$$-$$$",
            "makesOffer": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "DNA Methylation Testing Package",
                  "description": "Comprehensive genetic testing with personalized health plan"
                },
                "price": "699",
                "priceCurrency": "AUD"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "3-Month Health Transformation Program",
                  "description": "Optimise Your Life - Personalized biohacking coaching"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Executive Wellbeing Coaching",
                  "description": "Leadership coaching for sustainable performance"
                },
                "price": "1900",
                "priceCurrency": "AUD"
              }
            ],
            "hasProduct": {
              "@type": "Book",
              "name": "Biohack Me",
              "author": {
                "@type": "Person",
                "name": "Camilla Thompson"
              },
              "description": "Biohacking for every age and gender - Making biohacking accessible to everyone",
              "genre": "Health & Wellness",
              "isbn": "978-1-234-56789-0",
              "publisher": {
                "@type": "Organization",
                "name": "BiohackMe Publishing"
              },
              "datePublished": "2024",
              "inLanguage": "en-AU"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.biohackme.com.au"
            }]
          })}
        </script>
      </Helmet>

      <Header />
      
      {/* Hero Section - Side by Side Layout */}
      <section className="bg-white pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

            {/* Content Side - Left */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              {/* Main Headline - Hidden on mobile, shown on desktop */}
              <h1 className="hidden lg:block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold leading-tight text-center lg:text-left">
                <span className="text-ocean block">Optimise Your Life</span>
                <span className="text-sky block">One BioHack at a Time.</span>
              </h1>

              {/* New Tagline - Hidden on mobile, shown on desktop */}
              <p className="hidden lg:block text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center lg:text-left">
                <span className="text-ocean font-bold">Australia's leading biohacking coach</span> <span className="text-gray-600">specialising in health optimisation and personalised longevity strategies.</span>
              </p>

              {/* Media Logos Row - Animated Logo Loop */}
              <div className="py-6 sm:py-8">
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 font-light tracking-wider text-center">AS FEATURED IN</p>
                <div className="block sm:hidden">
                  {/* Mobile: Static logo grid */}
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto items-center">
                    <img src="/images/media-logos/Sunrise.png" alt="Sunrise" width="120" height="32" className="h-8 w-auto object-contain opacity-60 mx-auto" />
                    <img src="/images/media-logos/the morning show.png" alt="The Morning Show" width="120" height="32" className="h-8 w-auto object-contain opacity-60 mx-auto" />
                    <img src="/images/media-logos/daily mail.png" alt="Daily Mail" width="120" height="32" className="h-8 w-auto object-contain opacity-60 mx-auto" />
                    <img src="/images/media-logos/SMH.png" alt="SMH" width="120" height="32" className="h-8 w-auto object-contain opacity-60 mx-auto" />
                    <img src="/images/media-logos/womens fitness.png" alt="Women's Fitness" width="120" height="32" className="h-8 w-auto object-contain opacity-60 mx-auto" />
                    <img src="/images/media-logos/womens health.png" alt="Women's Health" width="120" height="32" className="h-8 w-auto object-contain opacity-60 mx-auto" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  {/* Desktop: Animated logo loop */}
                  <LogoLoop
                    logos={[
                      { src: "/images/media-logos/Sunrise.png", alt: "Sunrise", scale: 1.8 },
                      "/images/media-logos/the morning show.png",
                      "/images/media-logos/daily mail.png",
                      "/images/media-logos/SMH.png",
                      "/images/media-logos/images.png",
                      "/images/media-logos/womens fitness.png",
                      "/images/media-logos/womens health.png",
                      { src: "/images/media-logos/Sunrise.png", alt: "Sunrise", scale: 1.8 },
                      "/images/media-logos/the morning show.png",
                      "/images/media-logos/daily mail.png"
                    ]}
                    speed={30}
                    logoHeight={60}
                    gap={60}
                    pauseOnHover={true}
                    fadeOut={true}
                    fadeOutColor="white"
                    scaleOnHover={false}
                    ariaLabel="Media outlets featuring BiohackMe"
                    className="max-w-4xl mx-auto"
                  />
                </div>
              </div>

              {/* Future Proof Message - Softer Style */}
              <div className="border-2 border-ocean/20 bg-gradient-to-r from-ice/50 to-cloud/50 px-4 sm:px-6 py-3 rounded-full my-4 sm:my-6 max-w-lg mx-auto">
                <p className="text-base sm:text-lg md:text-xl font-medium text-ocean text-center tracking-wide">
                  Future Proof Your Health
                </p>
              </div>

              {/* 4 Action Buttons - Mobile Optimized with 44px+ Touch Targets */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-lg mx-auto">
                <a
                  href="/freebie"
                  className="bg-ocean text-white px-4 sm:px-6 py-4 sm:py-4 rounded-full font-semibold hover:bg-ocean/90 transition-colors inline-flex items-center justify-center text-sm sm:text-base shadow-lg min-h-[44px]"
                >
                  <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  FREE GUIDE
                </a>

                <a
                  href="https://www.amazon.com.au/Biohack-Me-Practical-Everyday-Longevity/dp/1394334036?crid=9IG03P4KA7QX&dib=eyJ2IjoiMSJ9.GbADeTF-Z6mlbHKDu_sPD12vKrYEnrKRiF3xEN6ACpZNCOKPco-ARqaxSfeDVRxoaHDzjawtoeary6jq6GT9Zg3UOCkSDN3BdBUxEUoIV3Qa2ABQoW_lVoSGWtPZi_hjICN4ZWMGyzfdm0IGGYgFgZnJPgqCiDvx4spybI7OSSVv1MplYI92JONRL2wgJTYOHc02V7g0yJku50QscBNleb6FIGanwCWEA8dQCwIxdj8lDABQ_Tx-KnIhTOAZ6ZTQY0dlM3pB3eRVzh6eJY1iOsuwNrdPXWLrP8HEtNJsbZG4I72qy5aX9_BI7JrXjD7J1zRyD56OHLXLPv_6Se1TLUpaRkcNUyNcPQhwO2WrpZvfPuFf3KKLgUBM2BJdsjt8yiw6FTOXV_xJLyOdDdYK4KFnhxGce5XeAdujWr4Iz-nmKC4JZp-waj-kpOl6Tbd3.VrDS1MdxB0GyJG9xem2dIRfmB3uLiHcSddzJdAkann0&dib_tag=se&keywords=biohack+me&qid=1738561296&sprefix=biohack+me,aps,653&sr=8-1&linkCode=sl1&tag=camillathomps-22&linkId=ba1a4ce7f6279d3631a2290c8e274fb2&language=en_AU&ref_=as_li_ss_tl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky text-white px-4 sm:px-6 py-4 sm:py-4 rounded-full font-semibold hover:bg-sky/90 transition-colors inline-flex items-center justify-center text-sm sm:text-base shadow-lg min-h-[44px]"
                >
                  <BookOpenIcon className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  BUY MY BOOK
                </a>

                <a
                  href="/brain-assessment"
                  className="bg-sky text-white px-3 sm:px-4 py-4 sm:py-4 rounded-full font-semibold hover:bg-sky/90 transition-colors inline-flex items-center justify-center text-sm sm:text-base shadow-lg whitespace-nowrap min-h-[44px]"
                >
                  <Brain className="mr-1 sm:mr-2 w-4 h-4" />
                  BRAIN ASSESSMENT
                </a>

                <a
                  href="/biohack-assessment"
                  className="bg-ocean text-white px-3 sm:px-4 py-4 sm:py-4 rounded-full font-semibold hover:bg-ocean/90 transition-colors inline-flex items-center justify-center text-sm sm:text-base shadow-lg whitespace-nowrap min-h-[44px]"
                >
                  <Heart className="mr-1 sm:mr-2 w-4 h-4" />
                  HEALTH ASSESSMENT
                </a>
              </div>
            </div>

            {/* Hero Image Side - Right */}
            <div className="relative order-1 lg:order-2 mb-6 lg:mb-0">
              {/* Mobile Hero Text - Only visible on mobile */}
              <div className="lg:hidden text-center mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-ocean block">Optimise Your Life</span>
                  <span className="text-sky block">One BioHack at a Time.</span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed mt-4">
                  <span className="text-ocean font-bold">Australia's leading biohacking coach</span> <span className="text-gray-600">specialising in health optimisation and personalised longevity strategies.</span>
                </p>
              </div>

              <div className="relative">
                <img
                  src="/images/hero%20homepage.webp"
                  alt="Camilla Thompson - BiohackMe Coach"
                  width="800"
                  height="1200"
                  className="w-full h-auto max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto object-cover rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hi I'm Camilla Section - Moved up */}
      <section className="py-8 sm:py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center">
              {/* Camilla Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative">
                  <img
                    src="/images/camilla-main-headshot.jpg.webp"
                    alt="Camilla Thompson - Biohacking Expert"
                    width="800"
                    height="533"
                    className="w-full max-w-xl lg:max-w-2xl mx-auto object-cover object-right rounded-lg shadow-lg"
                    style={{objectPosition: '70% 50%', maxHeight: '600px'}}
                    loading="lazy"
                  />
                </div>
              </motion.div>
              
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-ocean text-center lg:text-left">
                  Hi I'm Camilla
                </h2>

                <div className="prose prose-lg lg:prose-xl max-w-none leading-relaxed space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 text-center lg:text-left">
                    What if we could defy the traditional limitations of ageing, by unraveling the secrets of longevity through the lens of biohacking?
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 text-center lg:text-left">
                    In a world inundated with information about health and wellness, biohacking emerges as a beacon of hope, offering a personalised approach to optimising human potential, backed by science.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-start">
                  <motion.a
                    href="/about"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mt-6 sm:mt-8 bg-ocean text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-ocean/90 shadow-lg transition-all duration-300 text-sm sm:text-base"
                  >
                    LEARN MORE ABOUT ME
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Dave Asprey Featured Quote */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-ocean/10 to-sky/10 p-8 md:p-12 rounded-xl border border-ocean/20 max-w-4xl mx-auto">
                <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-6 text-charcoal italic">
                  "Camilla provides a masterclass in turning back the clock. This book is a must-read if you are looking to supercharge your life through biohacking."
                </blockquote>
                <footer className="text-lg md:text-xl font-medium text-ocean mb-6">
                  Dave Asprey
                  <div className="text-sm md:text-base text-charcoal/70 mt-1 mb-6">
                    Father of Biohacking, Founder of Bulletproof
                  </div>
                </footer>
                <div className="text-center">
                  <a
                    href="/my-book"
                    className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Read the Book Dave Recommends
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How can we work together Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
              <span className="bg-gradient-to-r from-ocean via-sky to-ocean bg-clip-text text-transparent">
                How can we work together?
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                title: "BioHackMe Talks",
                description: "Transformative keynote speaking and workshops on biohacking for peak performance",
                image: "/images/How we work together/Biohackme website images18.webp",
                link: "/talks",
                cta: "LEARN MORE"
              },
              {
                title: "1:1 Coaching",
                description: "Personalised biohacking coaching program with custom protocols and ongoing support",
                image: "/images/How we work together/Biohackme website images13.webp",
                link: "/superchargeyourlife",
                cta: "LEARN MORE"
              },
              {
                title: "Retreats",
                description: "Destination Deluxe Award Winning Global Live Well Longer Biohacking Retreats",
                image: "/images/How we work together/Biohackme website images3.webp",
                link: "/retreats",
                cta: "LEARN MORE"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center flex flex-col h-full"
              >
                <div className="relative mb-8">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden shadow-lg bg-ice/30">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain object-center"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">
                  <span className="text-ocean">{service.title}</span>
                </h3>
                <p className="text-sky/80 leading-relaxed mb-8 text-lg max-w-md mx-auto flex-grow">
                  {service.description}
                </p>
                
                <motion.a
                  href={service.link}
                  {...(service.link.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium hover:from-sky hover:to-ocean shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm mt-auto"
                >
                  {service.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Testimonials Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Corporate Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Carmen Bekker - KPMG */}
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-ocean/10">
                <p className="text-charcoal/80 italic leading-relaxed mb-6">
                  "Camilla is an absolutely fantastic wellness coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session."
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-ocean text-lg">Carmen Bekker</h4>
                  <p className="text-charcoal/60 text-sm">Lead Partner, KPMG Consulting</p>
                </div>
              </div>

              {/* Kevin Figueiredo - Super Retail Group */}
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-ocean/10">
                <p className="text-charcoal/80 italic leading-relaxed mb-6">
                  "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies."
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-medium text-ocean text-lg">Kevin Figueiredo</h4>
                  <p className="text-charcoal/60 text-sm">Chief People & Safety Officer, Super Retail Group</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* BIOHACKING WITH CAMILLA Section - With Video */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-sky/10 via-ice/20 to-sky/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">
                <span className="text-ocean">BIOHACKING WITH</span> <span className="text-sky">CAMILLA</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the science-backed strategies that can transform your health, energy, and longevity.
              </p>
            </motion.div>
            
            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-sky/20 bg-gradient-to-br from-ice via-sky/20 to-ocean/30">
                <iframe
                  className="w-full aspect-video"
                  src="https://www.youtube.com/embed/b9TMLyX-dpk?start=1"
                  title="Biohacking with Camilla - Introduction Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop & Masterclass Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-ocean">Ready to</span> <span className="text-sky">Take Action?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover the tools and knowledge you need to start your biohacking journey today.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Shop Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-sky shadow-xl hover:shadow-2xl hover:border-ocean transition-all duration-500">
                    <div className="relative w-full h-full bg-gradient-to-br from-sky/20 to-ocean/20 flex items-center justify-center">
                      <div className="text-center">
                        <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-sky mx-auto mb-2 sm:mb-3" />
                        <h3 className="text-lg sm:text-xl font-bold text-ocean">BIOHACKING</h3>
                        <h3 className="text-lg sm:text-xl font-bold text-sky">SHOP</h3>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-ocean">
                  Biohacking Tools & Products
                </h3>
                <p className="text-sky/80 leading-relaxed mb-8 text-lg max-w-md mx-auto">
                  Discover Camilla's curated selection of biohacking devices, supplements, and wellness products to optimise your health.
                </p>
                
                <motion.a
                  href="/shop"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-ocean to-sky text-white px-8 py-4 rounded-full font-semibold hover:from-sky hover:to-ocean shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  EXPLORE SHOP
                </motion.a>
              </motion.div>

              {/* Masterclass Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-sky shadow-xl hover:shadow-2xl hover:border-ocean transition-all duration-500">
                    <div className="relative w-full h-full bg-gradient-to-br from-ocean/20 to-sky/20 flex items-center justify-center">
                      <div className="text-center">
                        <PlayCircle className="w-12 h-12 sm:w-16 sm:h-16 text-ocean mx-auto mb-2 sm:mb-3" />
                        <h3 className="text-lg sm:text-xl font-bold text-ocean">BIOHACKING</h3>
                        <h3 className="text-lg sm:text-xl font-bold text-sky">MASTERCLASS</h3>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 text-ocean">
                  Learn the Science
                </h3>
                <p className="text-sky/80 leading-relaxed mb-8 text-lg max-w-md mx-auto">
                  Master the fundamentals of biohacking with Camilla's comprehensive courses designed to transform your health knowledge.
                </p>
                
                <motion.a
                  href="/masterclass"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-sky to-ocean text-white px-8 py-4 rounded-full font-semibold hover:from-ocean hover:to-sky shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center"
                >
                  <PlayCircle className="mr-2 w-5 h-5" />
                  START LEARNING
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in touch - Free Guide Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-sky/5 via-ice/20 to-sky/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-ocean via-sky to-ocean bg-clip-text text-transparent">
                Get in touch
              </span>
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-ocean mb-8"
            >
              Download my FREE BIOHACKME GUIDE!
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-lg text-ocean/70 leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              I've spent a long time perfecting this guide to offer you the ideal starting point for your biohacking journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
            >
              <div className="text-left">
                <p className="text-lg font-bold text-ocean mb-4">WHAT'S IN THIS GUIDE?</p>
                <ul className="text-lg text-sky/80 space-y-2">
                  <li>✓ WTF is Biohacking?</li>
                  <li>✓ What is a Biohacker Mindset?</li>
                  <li>✓ Biohacking Framework</li>
                  <li>✓ Biohacking on a Budget</li>
                  <li>✓ Biohacking Technologies</li>
                  <li>✓ Top 10 Biohacks</li>
                </ul>
                <p className="text-lg text-ocean/70 mt-4">
                  This guide provides all the information, tips, and tricks you need to get started.
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <img 
                  src="/images/Freebie.webp"
                  alt="BiohackMe Guide"
                  className="w-full max-w-xs sm:max-w-sm rounded-lg shadow-lg object-contain"
                  style={{maxHeight: '350px'}}
                  loading="lazy"
                />
              </div>
            </motion.div>
            
            <motion.a
              href="/freebie"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium hover:from-sky hover:to-ocean shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <Download className="mr-2 w-4 h-4" />
              CLICK HERE TO DOWNLOAD
            </motion.a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-ice to-cloud">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <MailchimpNewsletter
            title="Stay Updated with Latest Biohacking Tips"
            subtitle="Join thousands of high performers getting exclusive health optimization strategies delivered to their inbox"
            buttonText="Get Free Biohacking Tips"
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      <Footer />
    </>
  )
}