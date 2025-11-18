import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Helmet>
        <title>About Camilla Thompson | Nationally Recognised Nutritionist & Biohacking Expert | Featured on 7News & SMH</title>
        <meta name="description" content="Meet Camilla Thompson: Australia's leading biohacking expert, nationally recognised nutritionist, bestselling author & executive wellness coach. Featured on 7News, Sydney Morning Herald, Daily Mail. Specializing in DNA methylation testing, longevity coaching & personalised health optimization. Based in Sydney, serving Australia-wide." />
        <meta name="keywords" content="Camilla Thompson nutritionist, Camilla Thompson biohacking, biohacking expert Australia, nutritionist Sydney, nationally recognised nutritionist, executive wellness coach Australia, DNA testing specialist, longevity coach Sydney, 7News health expert, bestselling author Australia, functional medicine Sydney, women's health coach, corporate wellness consultant, health optimization expert" />

        {/* Open Graph */}
        <meta property="og:title" content="About Camilla Thompson | Nationally Recognised Nutritionist & Biohacking Expert Australia" />
        <meta property="og:description" content="Featured on 7News, Sydney Morning Herald & Daily Mail. Bestselling author, DNA testing specialist & executive wellness coach. Helping Australians optimize health & longevity through science-backed biohacking." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.biohackme.com.au/about" />
        <meta property="og:image" content="https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp" />
        <meta property="og:locale" content="en_AU" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Camilla Thompson | Biohacking Expert & Nutritionist Australia" />
        <meta name="twitter:description" content="Nationally recognised nutritionist, bestselling author & health expert. Featured on 7News, SMH. Specializing in DNA testing & longevity coaching." />
        <meta name="twitter:image" content="https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.biohackme.com.au/about" />

        {/* Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Camilla Thompson",
            "alternateName": "Camilla Arnoldussen",
            "jobTitle": "Nutritionist & Biohacking Expert",
            "description": "Nationally recognised nutritionist, biohacking expert, bestselling author and executive wellness coach specializing in DNA methylation testing, longevity optimization and personalised health strategies for high-performing individuals.",
            "url": "https://www.biohackme.com.au",
            "image": "https://www.biohackme.com.au/images/camilla-main-headshot.jpg.webp",
            "sameAs": [
              "https://www.linkedin.com/in/camilla-thompson-b7485b2a/",
              "https://www.instagram.com/biohackmecoach/",
              "https://www.facebook.com/profile.php?id=61556971331791",
              "https://biohackme.substack.com"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sydney",
              "addressRegion": "NSW",
              "addressCountry": "AU"
            },
            "award": [
              "Featured health expert on 7News The Morning Show",
              "Bestselling author - BiohackMe: Optimise Your Life",
              "Featured in Sydney Morning Herald health coverage",
              "Featured in Daily Mail Australia wellness articles",
              "Featured on 19+ health and wellness podcasts including SWIISH"
            ],
            "knowsAbout": [
              "DNA Methylation Testing",
              "MTHFR Gene Testing",
              "Biohacking",
              "Longevity Optimization",
              "Functional Medicine",
              "Epigenetics",
              "Mold Illness Recovery",
              "HLA-DR Gene Testing",
              "Executive Wellness Coaching",
              "Women's Hormone Health",
              "Corporate Wellness Programs",
              "Biological Age Testing",
              "Detoxification Protocols",
              "Nutrient Metabolism",
              "Personalized Nutrition"
            ],
            "hasCredential": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Nationally Recognised Nutritionist"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "BiohackMe",
              "url": "https://www.biohackme.com.au"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Australian College of Nutritional & Environmental Medicine"
            },
            "knowsLanguage": "en-AU",
            "nationality": "Australian",
            "gender": "Female",
            "birthDate": "1976",
            "agentInteractionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/WriteAction",
              "userInteractionCount": "1",
              "description": "Bestselling author of BiohackMe book"
            }
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
                "name": "About Camilla Thompson",
                "item": "https://www.biohackme.com.au/about"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-12 pt-20 sm:pt-36 md:pt-40 lg:pt-48">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-montserrat font-bold mb-6 md:mb-8 text-ocean mt-4 md:mt-8">
            ABOUT CAMILLA
          </h1>

          {/* Introduction paragraph moved up */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-ice/50 to-cloud/50 p-8 rounded-2xl border border-ocean/10">
              <p className="text-xl leading-relaxed">
                <strong className="text-ocean">Camilla Thompson</strong> is Australia's leading biohacking expert and executive wellness coach with proven expertise helping high-performing individuals optimise their health, performance, and longevity.
              </p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <p className="text-charcoal/60 mb-4">Connect with me</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.linkedin.com/in/camilla-thompson-b7485b2a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:text-sky transition-colors p-2"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/biohackmecoach/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:text-sky transition-colors p-2"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61556971331791"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean hover:text-sky transition-colors p-2"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Section */}
        <div className="mb-20">
          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <img
              src="/images/How we work together/Biohackme website images13.webp"
              alt="Camilla Thompson"
              className="w-full max-w-4xl mx-auto rounded-lg object-cover shadow-2xl"
            />
          </motion.div>
          
          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-montserrat font-light text-ocean mb-8 text-center leading-relaxed">
              Executive Wellness Coach, Biohacking Expert Australia, Nationally Recognised Nutritionist Sydney, Women's Health Specialist, Longevity Coach & Keynote Speaker
            </h2>

            {/* Bio paragraphs with better spacing and formatting */}
            <div className="space-y-8 text-lg text-charcoal/80 leading-relaxed">
              
              {/* Credentials & Media */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-ocean mb-4">Author & Founder</h3>
                  <p>
                    She is the author of <strong>Australia's first biohacking book</strong> and founder of multiple successful ventures including The Wellness Coach, BioHackMe and MouldSafe.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-ocean mb-4">Media Recognition</h3>
                  <p>
                    A sought-after speaker and media contributor, she has been featured in <strong>The Sydney Morning Herald, The Age, Women's Health</strong> and on <strong>Sunrise TV</strong>.
                  </p>
                </div>
              </div>
              
              {/* Philosophy */}
              <div className="bg-gradient-to-r from-sky/10 to-ocean/10 p-8 rounded-2xl border border-sky/20">
                <h3 className="text-xl font-medium text-ocean mb-4">My Philosophy</h3>
                <p>
                  A passionate advocate for personalised and preventative health, Camilla emphasises the importance of <strong>bio-individuality</strong> and the integration of ancient therapies with modern technologies.
                </p>
              </div>

              {/* DNA Methylation Point of Difference */}
              <div className="bg-gradient-to-r from-ocean/10 to-sky/10 rounded-2xl p-8 border border-ocean/20">
                <h3 className="text-2xl font-semibold text-ocean mb-4 text-center">My Point of Difference</h3>
                <p className="text-lg text-charcoal/80 leading-relaxed text-center">
                  I use a <strong className="text-ocean">DNA Methylation Health Assessment</strong> with my coaching programs. This takes the guesswork out of coaching and means I can create truly personalised plans for your unique genetic blueprint — no more one-size-fits-all approaches.
                </p>
              </div>

              {/* Executive Coaching */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-ocean mb-4">Executive Wellness Coaching</h3>
                <p>
                  Blending science, strategy and lifestyle, Camilla helps high-performing executives and leaders optimise their health for peak performance. She has worked with major corporations across Australia and New Zealand, providing evidence-based strategies for stress management, cognitive performance, energy optimisation, and longevity planning.
                </p>
              </div>

              {/* General Coaching, Talks & Masterclasses */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-ocean mb-4">Coaching, Speaking & Masterclasses</h3>
                <p>
                  Beyond executive coaching, Camilla offers personalised 1:1 coaching for individuals seeking to optimise their health and longevity. She is a sought-after keynote speaker delivering transformative talks on biohacking and wellness, and hosts comprehensive masterclasses covering topics from brain optimisation to sleep mastery, making cutting-edge health strategies accessible to everyone.
                </p>
              </div>

              {/* Destination Deluxe Award Winning Retreats */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-ocean mb-4">Destination Deluxe Award Winning Global Retreats</h3>
                <p>
                  Camilla hosts exclusive <strong>Live Well Longer</strong> biohacking retreats in stunning global locations, recognised by <strong>Destination Deluxe</strong> as award-winning wellness experiences. These intimate retreats combine luxury accommodation with cutting-edge biohacking technologies and transformative practices, often featuring expert co-hosts specialising in longevity medicine and advanced wellness techniques.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="text-center bg-gradient-to-r from-ocean to-sky text-white p-8 rounded-2xl">
                <p className="text-xl leading-relaxed">
                  <em>"I'm committed to empowering individuals to supercharge their lives, one biohack at a time."</em>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Carousel Section */}
        <section className="py-12 md:py-20 bg-ice mb-8 md:mb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-light text-ocean mb-4 md:mb-6">
                What My Clients Say
              </h2>
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                Real results from high performing people who've transformed their health and performance
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {[
                  {
                    name: "Carmen Bekker",
                    role: "Lead Partner, KPMG Consulting",
                    content: "Camilla is an absolutely fantastic wellness coach—highly recommended to anyone wanting to supercharge personal performance. She brings deep biohacking expertise into every coaching session.",
                  },
                  {
                    name: "Renee Opperman", 
                    role: "Marketing Executive – Property & Construction",
                    content: "Camilla is a fabulous executive wellbeing coach. Her guidance and support have been life-changing—both in my business and in life. She's not afraid of courageous conversations, delivered in a direct yet supportive way.",
                  },
                  {
                    name: "Lyz Evans",
                    role: "Principal Physiotherapist Women In Focus Physiotherapy", 
                    content: "Camilla's honest and practical approach to wellness was refreshing. Her health plan—based on real test results—made everything truly personalised. I'm excited to implement her recommendations now and long-term.",
                  },
                  {
                    name: "Angelique Posticescu",
                    role: "National Workplace Experience Manager, Lendlease",
                    content: "Camilla made complex biohacking concepts clear and practical. Her talk at Lendlease was informative, engaging, and resonated with everyone in the room.",
                  },
                  {
                    name: "Carly Daff",
                    role: "Head of Teams & Education, Canva",
                    content: "Camilla's guidance as a wellness coach over the past three years has been invaluable—both personally and professionally. She's helped me manage workload, set boundaries, and navigate complex work situations. Her impact extended to my leadership team too, where she delivered powerful strategies on managing burnout.",
                  },
                  {
                    name: "Kevin Figueiredo",
                    role: "Chief People & Safety Officer, Super Retail Group",
                    content: "Camilla's expertise in biohacking was the highlight of our Wellbeing Day. She delivered a captivating session blending the latest research with practical strategies. Leaders left recharged, inspired, and equipped with tools to sustain vitality and drive transformational change.",
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <p className="text-charcoal/80 italic leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-ocean text-lg">{testimonial.name}</h4>
                      <p className="text-charcoal/60 text-sm">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Kit Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-ocean to-sky text-white p-8 rounded-2xl shadow-xl mb-8 md:mb-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-montserrat font-light mb-4">
            Media & Speaking Enquiries
          </h3>
          <p className="text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
            Download my complete media kit including high-resolution photos, bio, speaking topics, and press materials.
          </p>
          <a
            href="/media-kit.pdf"
            download
            className="inline-flex items-center bg-white text-ocean px-8 py-3 rounded-full font-semibold hover:bg-ice transition-all duration-300 shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            DOWNLOAD MEDIA KIT
          </a>
        </motion.div>

        {/* Call to Action Sections */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
          {/* My Book CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-ocean/10"
          >
            <h3 className="text-2xl font-montserrat font-light mb-4 text-ocean">
              Discover My Book
            </h3>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              A science-backed guide to longevity, designed for real life. No fluff, no extremes—just practical 
              strategies to help you optimise your body, mind, and energy levels.
            </p>
            <Link
              to="/my-book"
              className="bg-ocean text-white px-6 py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors inline-block"
            >
              Learn More About The Book
            </Link>
          </motion.div>

          {/* Coaching CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gradient-to-br from-ice to-cloud p-8 rounded-2xl shadow-lg border border-sky/20"
          >
            <h3 className="text-2xl font-montserrat font-light mb-4 text-ocean">
              Work With Me
            </h3>
            <p className="text-charcoal/70 mb-6 leading-relaxed">
              Transform your health with personalised biohacking strategies. Join my signature program and 
              supercharge your life with evidence-based approaches.
            </p>
            <Link
              to="/superchargeyourlife"
              className="bg-sky text-white px-6 py-3 rounded-full font-medium hover:bg-sky/90 transition-colors inline-block"
            >
              Explore Coaching Program
            </Link>
          </motion.div>
        </div>

        {/* Free Guide Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-br from-ice to-cloud p-8 rounded-2xl mb-16 border border-ocean/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-montserrat font-light mb-4 text-ocean">
                Download my FREE BiohackMe Guide!
              </h3>
              <p className="text-charcoal/70 mb-6 leading-relaxed">
                I've spent a long time perfecting this guide to offer you the ideal starting point for your biohacking journey.
              </p>
              <div className="space-y-3 mb-6">
                <p className="font-medium text-charcoal/70">What's in this guide:</p>
                {[
                  "WTF is Biohacking?",
                  "What is a Biohacker Mindset?",
                  "Biohacking Framework",
                  "Biohacking on a Budget",
                  "Biohacking for Women",
                  "Biohacking for Men",
                  "Biohacking Technologies",
                  "Top 10 Biohacks"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-ocean mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-charcoal/70">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link 
                to="/freebie"
                className="bg-ocean text-white px-8 py-3 rounded-full font-medium hover:bg-ocean/90 transition-colors inline-block"
              >
                Get Free Guide
              </Link>
            </div>
            <div className="text-center">
              <img 
                src="/images/Freebie.webp"
                alt="BiohackMe Guide"
                className="w-full max-w-sm mx-auto rounded shadow-lg"
              />
            </div>
          </div>
        </motion.div>

      </div>
      
      <Footer />
    </div>
  )
}