import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function TalksPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }
  // Media outlet logos - from media kit page 2
  const mediaLogos = [
    { src: '/images/Talks/media-logos/Sunrise.png', alt: 'Sunrise' },
    { src: '/images/Talks/media-logos/daily mail.png', alt: 'Daily Mail' },
    { src: '/images/Talks/media-logos/SMH.png', alt: 'Sydney Morning Herald' },
    { src: '/images/Talks/media-logos/the morning show.png', alt: 'The Morning Show' },
    { src: '/images/Talks/media-logos/womens health.png', alt: "Women's Health" },
    { src: '/images/Talks/media-logos/womens fitness.png', alt: "Women's Fitness" },
    { src: '/images/Talks/media-logos/download.png', alt: '7 News' },
    { src: '/images/Talks/media-logos/download (2).png', alt: 'The Age' },
    { src: '/images/Talks/media-logos/download (1).png', alt: 'Kanebridge News' },
    { src: '/images/Talks/media-logos/images.png', alt: 'The CEO Magazine' },
  ]

  // Corporate & venue logos - from media kit page 4
  const corporateLogos = [
    { src: '/talks logos/download (1).jpg', alt: 'Super Retail Group', small: false },
    { src: '/talks logos/download (2).jpg', alt: 'Lendlease', small: false },
    { src: '/images/Talks/media-logos/download-4.png', alt: 'Corporate Mental Health Alliance', small: false },
    { src: '/talks logos/wellineux.png', alt: 'Wellineux', small: false },
    { src: '/images/Talks/media-logos/download-2.png', alt: 'Wanderlust Wellspring', small: false },
    { src: '/images/Talks/media-logos/download-1.png', alt: 'Spa & Wellness', small: false },
    { src: '/talks logos/gwinganna.png', alt: 'Gwinganna', small: false },
    { src: '/images/Talks/media-logos/download-2 (1).png', alt: 'Elysia Wellness Retreat', small: false },
    { src: '/talks logos/bondi.png', alt: 'Bondi Wellness Festival', small: true },
  ]

  // Speaking photos from the Talks folder - showing Camilla on stage
  // Photos use custom positions to prevent heads being cut off
  const speakingPhotos = [
    { src: '/images/Talks/IMG_8687.jpg', alt: 'Camilla leading interactive corporate workshop', position: 'center top' },
    { src: '/images/Talks/11.jpg', alt: 'Camilla presenting biohacking strategies', position: 'center 20%' },
    { src: '/images/Talks/1733285858702.jpg', alt: 'Behind the scenes filming', position: 'center 30%', isPortrait: true },
    { src: '/images/Talks/1733285854768.jpg', alt: 'Camilla presenting at corporate event in marquee', position: 'center 25%' },
    { src: '/images/Talks/P1411142.jpg', alt: 'Bondi Wellness Festival panel', position: 'center 20%' },
    { src: '/images/Talks/IMG_8546.jpg', alt: 'Camilla presenting on stage', position: 'center 30%', isPortrait: true },
    { src: '/images/Talks/IMG_1706-hero.jpg', alt: 'Camilla keynote presentation', position: 'center top' },
    { src: '/images/Talks/1.jpg', alt: 'Keynote presentation', position: 'center 20%' },
    { src: '/images/Talks/1701288738747.jpeg', alt: 'Camilla engaging with audience', position: 'center 20%' },
    { src: '/images/Talks/camilla5.jpg', alt: 'Interactive workshop with audience participation', position: 'center 25%' },
    { src: '/images/Talks/9.jpg', alt: 'Camilla on stage', position: 'center 20%' },
    { src: '/images/Talks/7f963b14-eb1d-41e6-b6ad-44407c416943.jpg', alt: 'Book signing event', position: 'center 40%', isPortrait: true },
  ]

  const testimonials = [
    {
      quote: "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies. Leaders left recharged, inspired, and equipped with tools to sustain vitality and drive transformational change.",
      name: "Kevin Figueiredo",
      title: "Chief People & Safety Officer",
      company: "Super Retail Group"
    },
    {
      quote: "Camilla made complex biohacking concepts clear and practical. Her talk at Lendlease was informative, engaging, and resonated with everyone in the room.",
      name: "Angelique Posticescu",
      title: "National Workplace Experience Manager",
      company: "Lendlease"
    }
  ]

  const melTestimonial = {
    quote: "Camilla is a regular and extremely popular guest speaker at the Elysia Wellness Retreat. Her session was both powerful and relatable, providing guests with motivational tools to improve their lives one biohack at a time.",
    name: "Mel Ingham",
    title: "Director",
    company: "Elysia Wellness"
  }

  // Reordered: Future Proof first, then Biohacking Basics, Rising Stronger, We Can Do Hard Things
  const signatureKeynotes = [
    {
      title: "FUTURE-PROOF YOUR HEALTH",
      subtitle: "Optimise Your Life",
      tagline: "Your people's health is your competitive advantage.",
      description: "After nearly a decade testing what actually works (not just what's trending), I bring practical, science-backed tools that help people live and work better. This isn't a generic wellness talk—it's education that addresses what's really driving burnout, productivity decline and retention challenges.",
      outcomes: [
        "How the biology of performance and bio-individuality actually works",
        "Why epigenetics influences energy, focus, stress and long-term health",
        "How sleep architecture impacts decision-making and cognitive performance",
        "Why nervous system regulation is essential for focus under pressure",
        "How cellular energy determines whether people show up depleted or engaged"
      ],
      icon: "shield"
    },
    {
      title: "BIOHACKING BASICS",
      subtitle: "The Ultimate Guide to Optimising Your Biology",
      tagline: "What if we could defy the traditional limitations of ageing?",
      description: "This transformative talk explores biohacking through the lens of longevity science, shifting perspectives from lifespan to healthspan. Audiences discover practical, evidence-based strategies to optimise sleep, energy, relationships, and environment.",
      outcomes: [
        "Understand biohacking as the future of personalised health",
        "Learn the science of epigenetics and gene expression",
        "Walk away with actionable biohacks for immediate implementation",
        "Shift mindset from reactive healthcare to proactive healthspan"
      ],
      icon: "dna"
    },
    {
      title: "RISING STRONGER",
      subtitle: "Building Resilience Through Adversity",
      tagline: "What if burnout wasn't the end—but the beginning of real change?",
      description: "Camilla invites audiences to rethink resilience through the lens of post-traumatic growth research. Introducing The Rising Framework—a practical model for recovery, clarity and sustainable strength.",
      outcomes: [
        "New understanding of burnout through post-traumatic growth",
        "The Rising Framework: a roadmap for rebuilding after adversity",
        "Tools to regulate the nervous system and restore clarity",
        "Practical ways to protect energy and rebuild capacity"
      ],
      icon: "rise"
    },
    {
      title: "WE CAN DO HARD THINGS",
      subtitle: "Turning Adversity Into Advantage",
      tagline: "What if we could turn moments of hardship into moments of clarity?",
      description: "An inspiring keynote exploring how challenges can guide us toward what truly matters. Camilla shares insights on leveraging stress to build resilience and discovering growth through life's toughest experiences.",
      outcomes: [
        "Mindset shift: reframe challenges as catalysts for growth",
        "Strategies to overcome negativity bias",
        "Tools for setting clear boundaries around time and energy",
        "Rituals and habits that contribute to lasting wellbeing"
      ],
      icon: "mountain"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Keynote Speaker Australia | Biohacking & Corporate Wellness | Camilla Thompson</title>
        <meta name="description" content="Book Australia's leading keynote speaker on biohacking, longevity and corporate wellness. Featured on Sunrise, The Morning Show & Daily Mail. Trusted by Lendlease, Super Retail Group & more." />
        <meta name="keywords" content="keynote speaker Australia, corporate wellness speaker, biohacking speaker, longevity speaker, workplace wellness, health speaker Sydney, wellness keynote, executive coach Australia, corporate health speaker" />

        {/* Open Graph */}
        <meta property="og:title" content="Camilla Thompson | Australia's Leading Biohacking Keynote Speaker" />
        <meta property="og:description" content="Transform your next corporate event with Australia's leading biohacking and longevity expert. Trusted by Lendlease, Super Retail Group & top ASX companies." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.biohackme.com.au/talks" />
        <meta property="og:image" content="https://www.biohackme.com.au/images/Talks/IMG_1706-hero.jpg" />
        <meta property="og:site_name" content="BioHackMe" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Camilla Thompson | Australia's Leading Biohacking Keynote Speaker" />
        <meta name="twitter:description" content="Transform your next corporate event with Australia's leading biohacking and longevity expert." />
        <meta name="twitter:image" content="https://www.biohackme.com.au/images/Talks/IMG_1706-hero.jpg" />

        <link rel="canonical" href="https://www.biohackme.com.au/talks" />

        {/* Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Camilla Thompson",
            "jobTitle": "Keynote Speaker & Biohacking Expert",
            "description": "Australia's leading keynote speaker on biohacking, longevity and corporate wellness. Executive ICF coach, nutritionist (NRN), and author of BioHack Me.",
            "url": "https://www.biohackme.com.au/talks",
            "image": "https://www.biohackme.com.au/images/Talks/IMG_1706-hero.jpg",
            "sameAs": [
              "https://www.instagram.com/biohackmecoach/",
              "https://www.linkedin.com/in/camillathompson/"
            ],
            "knowsAbout": ["Biohacking", "Longevity", "Corporate Wellness", "Epigenetics", "Performance Optimisation", "Executive Coaching", "Nutritional Science"],
            "alumniOf": "ICF",
            "award": "Australian Business Book Awards 2025 Finalist - Health and Wellbeing"
          })}
        </script>

        {/* Professional Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Camilla Thompson Keynote Speaking",
            "description": "Premium keynote speaking services on biohacking, longevity and corporate wellness for Australian organisations",
            "url": "https://www.biohackme.com.au/talks",
            "priceRange": "$$$",
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Keynote Topics",
              "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Future-Proof Your Health Keynote"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Biohacking Basics Keynote"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Rising Stronger Keynote"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "We Can Do Hard Things Keynote"}}
              ]
            }
          })}
        </script>

        {/* FAQ Schema for LLMs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What topics does Camilla Thompson speak about?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Camilla Thompson delivers keynotes on biohacking, longevity, corporate wellness, performance optimisation, resilience, and workplace wellbeing. Her signature talks include Future-Proof Your Health, Biohacking Basics, Rising Stronger, and We Can Do Hard Things."
                }
              },
              {
                "@type": "Question",
                "name": "What companies has Camilla Thompson spoken for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Camilla has delivered keynotes for leading Australian organisations including Lendlease, Super Retail Group, Corporate Mental Health Alliance, Gwinganna, Elysia Wellness Retreat, and Bondi Wellness Festival."
                }
              },
              {
                "@type": "Question",
                "name": "What media has featured Camilla Thompson?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Camilla has been featured on Sunrise, The Morning Show, 7 News, Daily Mail Australia, Sydney Morning Herald, The Age, Women's Health, Women's Fitness, and The CEO Magazine."
                }
              },
              {
                "@type": "Question",
                "name": "How can I book Camilla Thompson as a keynote speaker?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book Camilla Thompson for your corporate event, conference, or retreat by visiting biohackme.com.au/talks and clicking 'Book Camilla' or downloading her Media Kit."
                }
              }
            ]
          })}
        </script>

        {/* Review Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Person",
              "name": "Camilla Thompson"
            },
            "author": {
              "@type": "Person",
              "name": "Kevin Figueiredo",
              "jobTitle": "Chief People & Safety Officer",
              "worksFor": {"@type": "Organization", "name": "Super Retail Group"}
            },
            "reviewBody": "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies. Leaders left recharged, inspired, and equipped with tools to sustain vitality and drive transformational change.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section - Premium Speaker */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#1a365d]">
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <p className="text-sm font-medium tracking-[0.3em] uppercase text-white/70 mb-4">AUSTRALIA'S LEADING BIOHACKING EXPERT</p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-[#6b8cae]">
                KEYNOTE<br />SPEAKER
              </h1>

              <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-ice">
                Camilla Thompson
              </h2>

              <p className="text-xl font-medium mb-8 text-white">
                Future-proof your people's health — so they can upgrade their energy, optimise their lives and perform at their best.
              </p>

              <p className="text-lg text-white/70 mb-2 max-w-lg leading-relaxed italic">
                "Camilla is highly-recommended as a speaker and coach. Her natural skills and ability to frame ideas makes them immediately approachable and applicable. She has a wealth of knowledge to share."
              </p>
              <p className="text-sm text-white/50 mb-10">
                — Troy Love, Founder GreatTalk & Pro Keynote Speaker
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#book-camilla"
                  className="inline-flex items-center bg-[#6b8cae] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#5a7a9a] transition-all duration-300 shadow-lg"
                >
                  Book Camilla
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/BioHackMe-Media-Kit.pdf"
                  download
                  className="inline-flex items-center border-2 border-[#6b8cae] text-[#6b8cae] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#6b8cae] hover:text-white transition-all duration-300"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Media Kit
                </a>
              </div>
            </motion.div>

            {/* Right - Hero Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex items-start"
            >
              <div className="w-[500px] h-[500px] rounded-2xl shadow-2xl overflow-hidden relative">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  poster="/images/Talks/IMG_1706-hero.jpg"
                  className="w-full h-full object-cover object-top"
                >
                  <source src="/videos/media-reel-web.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Sound indicator overlay - clickable to unmute */}
                {isMuted && (
                  <button
                    onClick={handleUnmute}
                    className="absolute top-4 left-4 z-20 bg-black/80 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium cursor-pointer hover:bg-black/90 transition-colors animate-pulse"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Click for sound
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media & Features Section - Media Kit Style */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row gap-12 items-center"
            >
              {/* Left - Section Header & Logos */}
              <div className="lg:w-1/2">
                <div className="inline-block border-2 border-[#1a365d] rounded-full px-8 py-3 mb-8">
                  <span className="text-[#1a365d] font-bold tracking-[0.15em] uppercase text-sm">Media & Features</span>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 items-center">
                  {mediaLogos.map((logo, index) => (
                    <img
                      key={index}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 md:h-10 object-contain"
                      loading="lazy"
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-6 tracking-wide">
                  SOCIAL MEDIA REACH - 22K+ (LINKEDIN, IG & FB)
                </p>
              </div>

              {/* Right - Media Image */}
              <div className="lg:w-1/2">
                <img
                  src="/images/Talks/Media/image000001.jpg"
                  alt="Camilla Thompson on Sunrise TV discussing biohacking benefits"
                  className="w-full rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Media Kit Style */}
      <section className="py-10 bg-[#6b8cae]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="inline-block border-2 border-white/30 rounded-full px-8 py-3">
                <span className="text-white font-bold tracking-[0.15em] uppercase text-sm">Testimonials</span>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur rounded-xl p-8"
                >
                  <p className="text-white leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-white/70 text-sm">{testimonial.title}, {testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Talks Delivered To Section - Logo Carousel */}
      <section className="py-10 bg-white overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...corporateLogos, ...corporateLogos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-12 flex items-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Welcome to BioHackMe Section - Media Kit Style */}
      <section className="py-20 bg-[#1a365d] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-block border-2 border-white/30 rounded-full px-8 py-3 mb-8">
                <span className="text-white font-bold tracking-[0.15em] uppercase text-sm">Welcome to BioHackMe</span>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-ice">
                    The next-gen health brand redefining what it means to feel, think, and perform at your peak.
                  </h2>

                  <ul className="space-y-4 text-white/80">
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Founded by Camilla Thompson — Executive ICF coach, biohacker, nutritionist (NRN), health & wellbeing coach, keynote speaker, and performance expert.
                    </li>
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Helps people hack their biology, rewire their mindset, and feel unstoppable.
                    </li>
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Built on real results, real transformation, and science-backed strategies.
                    </li>
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Delivers simple, powerful biohacks to upgrade sleep, energy, stress, and brainpower.
                    </li>
                  </ul>
                </div>

                <div className="lg:pt-[180px]">
                  <ul className="space-y-4 text-white/80">
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Trusted by leading Australian organisations to help teams reach peak performance.
                    </li>
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Driven by a passion for preventative and personalised health.
                    </li>
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Uses data, biomarkers, and genetics to create tailored wellbeing strategies.
                    </li>
                    <li className="flex items-start">
                      <span className="text-ice mr-3">•</span>
                      Empowers people to make smarter choices for stronger bodies, sharper minds, and healthier, more resilient lives.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Work With Camilla - Banner Style */}
      <section className="py-8 bg-[#6b8cae]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="inline-block border-2 border-white/30 rounded-full px-8 py-3 mb-8">
              <span className="text-white font-bold tracking-[0.15em] uppercase text-sm">Why Work With Camilla</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white pt-2"
              >
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start">
                    <span className="text-white mr-3">✓</span>
                    Delivers practical, science-backed strategies that are easy to apply and get real results.
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3">✓</span>
                    Known for her engaging, relatable, and grounded approach — no extremes, no over complication.
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3">✓</span>
                    Equally at home on stage, in the boardroom, or leading retreats, bringing clarity, connection, and transformation to every audience.
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-3">✓</span>
                    Combines lived experience, evidence-based frameworks, and behaviour-change expertise to help people feel better, think clearer, and lead stronger.
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <p className="italic text-white leading-relaxed">
                  "I have worked with Camilla on numerous occasions in various corporate settings, she is an amazing executive coach and an accomplished, highly polished public speaker. Camilla doesn't just do well-being lip service she truly walks the talk and speaks wisely and informatively from lived experience. It all comes from the heart, experience and an innate passion for people to thrive and live their best lives. I cannot recommend Camilla more highly."
                </p>
                <p className="text-white/80 mt-4 font-medium">
                  — Matthew Johnstone, Author & Keynote Speaker
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Photo Gallery - Auto-scrolling Carousel */}
      <section className="py-12 bg-[#f0f4f8] overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -3744],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {/* Double the images for seamless loop */}
            {[...speakingPhotos, ...speakingPhotos].map((photo, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative overflow-hidden"
                style={{ width: '320px', height: '224px', borderRadius: '8px' }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: '8px', objectPosition: photo.position || 'center top' }}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Signature Keynotes - 2x2 Quadrant Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-block border-2 border-[#1a365d] rounded-full px-8 py-3 mb-6">
                <span className="text-[#1a365d] font-bold tracking-[0.15em] uppercase text-sm">Signature Keynotes</span>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl">
                High-energy, inspiring talks packed with actionable insights that leave audiences energised and ready to take action.
              </p>
            </motion.div>

            {/* 2x2 Quadrant Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {signatureKeynotes.map((keynote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#1a365d] rounded-2xl p-8 text-white hover:bg-[#2a4a7d] transition-colors"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    {keynote.icon === 'shield' && (
                      <svg className="w-7 h-7 text-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {keynote.icon === 'dna' && (
                      <svg className="w-7 h-7 text-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    )}
                    {keynote.icon === 'rise' && (
                      <svg className="w-7 h-7 text-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )}
                    {keynote.icon === 'mountain' && (
                      <svg className="w-7 h-7 text-ice" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21l9-9m0 0l9 9m-9-9v12" />
                      </svg>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{keynote.title}</h3>
                  <p className="text-ice text-sm font-medium mb-4">{keynote.subtitle}</p>

                  {/* Tagline */}
                  <p className="text-white/80 italic mb-4 text-sm">{keynote.tagline}</p>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed">{keynote.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Example Talk Section - Media Kit Style */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {signatureKeynotes.slice(0, 1).map((keynote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <div className="inline-block border-2 border-[#1a365d] rounded-full px-8 py-3 mb-8">
                      <span className="text-[#1a365d] font-bold tracking-[0.15em] uppercase text-sm">Example Talk One:</span>
                    </div>

                    <h2 className="text-4xl font-serif font-bold text-[#1a365d] mb-6">
                      {keynote.title}
                    </h2>

                    <p className="text-xl font-serif font-bold text-[#1a365d] mb-6 italic">
                      {keynote.tagline}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      After nearly a decade testing what actually works (not just what's trending), I bring practical, science-backed tools that help people live and work better.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      This isn't a generic wellness talk. It's education that addresses what's really driving burnout, productivity decline and retention challenges.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      That's why organisations across Australia and New Zealand are booking my keynote 'Future-Proof Your Health: Optimise Your Life'—because they're ready to offer their people something different.
                    </p>

                    <p className="text-gray-600 text-sm italic leading-relaxed">
                      The frameworks I share come from coaching high performers, my own health transformation, and biohacks tested in my Australian Business Book Awards finalist book, Biohack Me.
                    </p>
                  </div>

                  <div className="bg-[#f8fafc] rounded-xl p-8">
                    <h3 className="text-xl font-bold text-[#1a365d] mb-6">What makes this keynote different:</h3>

                    <div className="space-y-6">
                      {keynote.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-start bg-white rounded-full px-6 py-4 shadow-sm">
                          <div className="w-10 h-10 bg-[#1a365d]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <svg className="w-5 h-5 text-[#1a365d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Packages Section - Media Kit Style */}
      <section className="py-20 bg-[#6b8cae]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-block border-2 border-white/30 rounded-full px-8 py-3 mb-6">
                <span className="text-white font-bold tracking-[0.15em] uppercase text-sm">Speaker Packages</span>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Keynote', duration: '60-90 Minutes', desc: 'Presentations designed to inspire and educate large audiences on biohacking fundamentals.' },
                { title: 'Speaker + Book Package', duration: '90 Min Keynote + Book', desc: 'Biohacking Basics keynote presentation plus signed copies of "Biohack Me" book for all attendees.' },
                { title: 'Masterclass Workshops', duration: '3-4 Hours', desc: 'Intensive hands-on workshops with practical tools and actionable strategies for immediate implementation.' },
                { title: 'Offsites', duration: 'Half Day - Full Day', desc: 'Education with practical tools and team-building experiences for enhanced corporate productivity and wellbeing.' }
              ].map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-2 border-white/30 rounded-full aspect-square p-6 text-center text-white hover:bg-white/10 transition-colors flex flex-col items-center justify-center"
                >
                  <h3 className="text-base font-bold mb-1">{pkg.title}</h3>
                  <p className="text-white/70 text-xs mb-2">{pkg.duration}</p>
                  <p className="text-white/80 text-xs leading-relaxed">{pkg.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mel Testimonial */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                "{melTestimonial.quote}"
              </p>
              <p className="font-bold text-[#1a365d]">{melTestimonial.name}</p>
              <p className="text-gray-600 text-sm">{melTestimonial.title}, {melTestimonial.company}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Section - Media Kit Style */}
      <section className="py-20 bg-[#1a365d]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <div className="inline-block border-2 border-white/30 rounded-full px-8 py-3 mb-8">
                  <span className="text-white font-bold tracking-[0.15em] uppercase text-sm">Book: BioHackMe</span>
                </div>

                <p className="text-lg text-white/70 mb-4">Global Launch – May 2025</p>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6">
                  "Camilla provides a masterclass in turning back the clock."
                </h2>

                <p className="text-lg text-white/80 mb-2">
                  This book is a must-read if you are looking to supercharge your life through biohacking.
                </p>

                <p className="text-xl text-ice font-bold mb-8">
                  — David Asprey, Father of Biohacking
                </p>

                <Link
                  to="/my-book"
                  className="inline-flex items-center bg-white text-[#1a365d] px-8 py-4 rounded-full font-semibold hover:bg-ice transition-colors"
                >
                  Learn More
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-start items-center"
              >
                <div className="flex items-center gap-4 -ml-8">
                  <img
                    src="/images/Book award/Render 1 (FRONT) - No Background.png"
                    alt="BioHack Me Book by Camilla Thompson"
                    style={{ width: '320px', height: 'auto' }}
                    className="drop-shadow-2xl"
                    loading="lazy"
                  />
                  <img
                    src="/images/Book award/ABBA_Winner & Finalist Stickers_41x41_2025_Bleed14.jpg"
                    alt="Australian Business Book Awards 2025 Finalist - Health and Wellbeing"
                    style={{ width: '180px', height: 'auto' }}
                    className="shadow-lg"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Book Camilla */}
      <section id="book-camilla" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/Talks/11.jpg"
                alt="Camilla Thompson speaking"
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg mb-12"
                loading="lazy"
              />

              <p className="text-lg text-gray-600 mb-4">
                To book Camilla for a keynote, offsite, or media opportunity, contact:
              </p>

              <a
                href="mailto:hello@biohackme.com.au"
                className="text-2xl font-bold text-[#1a365d] hover:text-[#6b8cae] transition-colors block mb-2"
              >
                hello@biohackme.com.au
              </a>

              <a
                href="https://www.biohackme.com.au"
                className="text-lg text-[#6b8cae] hover:text-[#1a365d] transition-colors block mb-2"
              >
                www.biohackme.com.au
              </a>

              <p className="text-gray-600">
                Instagram: <a href="https://www.instagram.com/biohackmecoach/" target="_blank" rel="noopener noreferrer" className="text-[#1a365d] hover:text-[#6b8cae]">@biohackmecoach</a>
              </p>

              <div className="mt-12">
                <a
                  href="mailto:hello@biohackme.com.au?subject=Speaking Enquiry"
                  className="inline-flex items-center bg-[#1a365d] text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#6b8cae] transition-colors shadow-lg"
                >
                  Send Enquiry
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
