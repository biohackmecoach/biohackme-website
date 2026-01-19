import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>BiohackMe Book by Camilla Thompson | Australia's #1 Biohacking Guide | Buy on Amazon</title>
        <meta name="description" content="Australia's first biohacking book by expert Camilla Thompson. Reverse aging, boost energy & optimize health with science-backed strategies. Buy now on Amazon, Booktopia & in stores." />
        <meta name="keywords" content="biohacking book, health optimisation, personalised medicine, functional health, wellness guide, performance enhancement" />
        <meta property="og:title" content="BiohackMe: The Complete Guide to Optimizing Your Health" />
        <meta property="og:description" content="The definitive guide to biohacking your health with science-backed strategies and personalised protocols." />
        <meta property="og:type" content="book" />
        <meta property="og:url" content="https://www.biohackme.com.au/my-book" />
        <link rel="canonical" href="https://www.biohackme.com.au/my-book" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BiohackMe: The Complete Guide to Optimizing Your Health" />
        <meta name="twitter:description" content="Transform your health with evidence-based biohacking strategies and personalised protocols." />
      </Helmet>
      
      <Header />

      {/* Hero Section with Dark Background */}
      <section className="relative bg-gradient-to-br from-ocean to-sky text-white min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-white/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 sm:pt-24 md:pt-32 lg:pt-48 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-montserrat mb-8 leading-tight">
              <span className="block text-white font-bold">
                BiohackMe
              </span>
              <span className="font-light text-white/90">The Book</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-montserrat font-light mb-6 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Want to live longer, feel stronger, and take control of your health?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Biohack Me is a science-backed guide to longevity, designed for real life.
              No fluff, no extremes—just practical strategies to help you optimise your body, mind, and energy levels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-end mb-8">
              <a
                href="https://www.amazon.com.au/Biohack-Me-Practical-Everyday-Longevity/dp/1394334036"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-ocean transition-all duration-300"
              >
                Buy on Amazon
              </a>
              <a
                href="https://www.booktopia.com.au/search.ep?keywords=biohack+me+camilla+thompson"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-ocean transition-all duration-300"
              >
                Buy on Booktopia
              </a>
              <img
                src="/images/Book award/ABBA_Winner & Finalist Stickers_41x41_2025_Bleed14.jpg"
                alt="Australian Business Book Awards 2025 Finalist - Health and Wellbeing"
                className="h-28 w-auto rounded shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 font-montserrat">
        {/* Book Section - Side by Side Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Book Image - Left Side */}
            <div className="text-center lg:text-left">
              <img
                src="https://static.wixstatic.com/media/f5168e_07fd3756f95c42368f72e5a6556609a0~mv2.png/v1/fill/w_410,h_607,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Render%201%20(FRONT)%20-%20No%20Background_PNG.png"
                alt="BiohackMe Book Cover"
                className="w-full max-w-sm mx-auto lg:mx-0"
              />
            </div>

            {/* Quote and Buy Button - Right Side */}
            <div className="space-y-6 md:space-y-8">
              {/* Dave Asprey Quote */}
              <div className="bg-gradient-to-br from-ocean/10 to-sky/10 p-8 rounded-3xl border border-ocean/20">
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-6 text-charcoal text-center lg:text-left">
                  "Camilla provides a masterclass in turning back the clock. This book is a must-read if you are looking to supercharge your life through biohacking."
                </blockquote>
                <footer className="text-lg font-medium text-ocean text-center lg:text-left">
                  Dave Asprey
                  <div className="text-sm text-charcoal/70 mt-1">
                    Father of Biohacking, Founder of Bulletproof
                  </div>
                </footer>
              </div>

              {/* Multi-Channel Purchase Options */}
              <div className="text-center lg:text-left px-4 lg:px-0">
                <h3 className="text-lg font-medium text-ocean mb-4">Available Globally:</h3>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="https://www.amazon.com.au/Biohack-Me-Practical-Everyday-Longevity/dp/1394334036"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', padding: '12px 24px', borderRadius: '9999px', backgroundColor: '#022D4E', color: 'white', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    Buy on Amazon
                  </a>
                  <a
                    href="https://www.booktopia.com.au/search.ep?keywords=biohack+me+camilla+thompson"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', padding: '12px 24px', borderRadius: '9999px', backgroundColor: '#0A4A6E', color: 'white', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
                  >
                    Buy on Booktopia
                  </a>
                </div>
                <div className="bg-ice/30 p-4 rounded-lg text-sm text-left">
                  <p className="font-medium text-ocean mb-2">In All Good Bookshops & Airports</p>
                  <p className="text-charcoal/70">Available worldwide in physical and digital formats</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* What's Inside Section */}
        <section className="py-20 bg-gradient-to-br from-ocean to-sky text-white mb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-5xl font-montserrat font-light text-white mb-12 leading-tight">
                What's Inside
              </h2>
          
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-12 text-left">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">Everyday habits that improve health and performance</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">Proven biohacks that deliver real results</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">Biohacking framework to personalise your approach</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">Science-backed strategies for optimal sleep and recovery</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">Nutrition and supplementation protocols for longevity</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/90">Stress management techniques for sustainable wellbeing</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* New Book Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-light text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean to-sky">
              Supercharge your life. One biohack at a time.
            </span>
          </h2>
          
          {/* Introduction Section */}
          <div className="bg-gradient-to-r from-ice/30 to-cloud/30 p-8 rounded-3xl mb-12">
            <div className="space-y-4 text-lg text-gray-500 leading-relaxed font-light">
              <p>
                Do you struggle to prioritise your health amongst the demands of a busy lifestyle? Are you afraid of growing old and not thriving in your later years? Then maybe biohacking is for you.
              </p>
              <p>
                Biohacking is all about hacking your biology and environment so you can live better for longer. It involves making small, incremental changes to your lifestyle and diet today that will improve your health, vitality and wellbeing into the future.
              </p>
            </div>
          </div>

          {/* About the Book & Author */}
          <div className="bg-gradient-to-r from-sky/10 to-ocean/10 p-8 rounded-3xl mb-12">
            <h3 className="text-2xl font-montserrat font-light text-ocean mb-6 text-center">
              Take Control of Your Health
            </h3>
            <div className="space-y-4 text-lg text-gray-500 leading-relaxed font-light">
              <p>
                Biohacking proves that we have more control over ageing than what we might think. With Biohack Me, you'll discover that ageing is something we should embrace, not fear.
              </p>
              <p>
                Author Camilla Thompson is a trailblazer in biohacking, nutrition, and health coaching. As a trusted coach and wellness mentor, Camilla has dedicated nearly a decade of her life to helping others optimise their health and longevity. In this powerful guide, she provides clear, actionable strategies that will empower you to take charge of your health and protect your cognitive and physical wellbeing as you age.
              </p>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-white border border-ocean/10 rounded-3xl p-8 shadow-lg mb-12">
            <h3 className="text-2xl font-montserrat font-light text-ocean mb-6 text-center">
              Transform Every Area of Your Life
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed mb-6 text-center font-light">
              By learning the biohacking framework outlined in this book, you can improve your sleep, mood, health, relationships, brain and so much more. You'll learn:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-ocean mr-3 font-medium">•</span>
                  <span className="text-gray-500 font-light">The importance of sleep rituals and habits, like nasal breathing and your circadian rhythm</span>
                </div>
                <div className="flex items-start">
                  <span className="text-ocean mr-3 font-medium">•</span>
                  <span className="text-gray-500 font-light">Strategies to boost your energy though intermittent fasting, red-light therapy and cold exposure</span>
                </div>
                <div className="flex items-start">
                  <span className="text-ocean mr-3 font-medium">•</span>
                  <span className="text-gray-500 font-light">How to revolutionise your relationship with stress and anxiety using the circle of control</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-ocean mr-3 font-medium">•</span>
                  <span className="text-gray-500 font-light">Methods to improve your nervous system function, such as breathwork and acupuncture</span>
                </div>
                <div className="flex items-start">
                  <span className="text-ocean mr-3 font-medium">•</span>
                  <span className="text-gray-500 font-light">Why neuroplasticity is crucial for optimum long-term brain function</span>
                </div>
                <div className="flex items-start">
                  <span className="text-ocean mr-3 font-medium">•</span>
                  <span className="text-gray-500 font-light">How a nutrient-rich diet, hydration hacks and cognitive training can improve your overall brain health</span>
                </div>
              </div>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="text-center bg-gradient-to-r from-ocean to-sky text-white p-8 rounded-3xl">
            <p className="text-xl leading-relaxed font-light">
              Once you master the biohacking basics, you will unlock your full potential and transform your mind and body for the better. Whether you're a health newbie or a seasoned wellness warrior, <span className="font-medium">Biohack Me is your ticket to supercharging your life.</span>
            </p>
          </div>
        </motion.div>

        {/* Why This Book Is Different - Moved Down */}
        <div className="bg-gradient-to-r from-ocean/5 to-sky/5 p-8 rounded-3xl mb-16">
          <h3 className="text-2xl md:text-3xl font-montserrat font-light text-charcoal mb-6 text-center">
            Why This Book Is Different
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="text-ocean text-xl">•</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Science-Based</h4>
                <p className="text-gray-700">Every recommendation backed by peer-reviewed research</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-ocean text-xl">•</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Personalised Approach</h4>
                <p className="text-gray-700">Strategies tailored to your unique biology and lifestyle</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-ocean text-xl">•</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Actionable Protocols</h4>
                <p className="text-gray-700">Step-by-step implementation guides, not just theory</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-ocean text-xl">•</div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Real-World Tested</h4>
                <p className="text-gray-700">Proven with hundreds of coaching clients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-ocean to-sky text-white p-12 rounded-3xl"
          id="buy-now"
        >
          <h3 className="text-3xl md:text-4xl font-montserrat font-light mb-4">Ready to Transform Your Health?</h3>
          <p className="text-xl mb-4 opacity-90">
            Order now and start your biohacking journey
          </p>
          <p className="text-lg mb-8 opacity-80">
            Available globally in physical and digital formats
          </p>
          {/* Social Proof Banner */}
          <div className="bg-white/20 backdrop-blur rounded-xl p-6 mb-8 text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="flex text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
              <span className="ml-2 text-white font-medium">4.8/5 stars</span>
            </div>
            <p className="text-white/90 mb-2">"Australia's most practical biohacking guide"</p>
          </div>

          {/* Multi-Channel Purchase Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-white font-medium mb-3">Buy Online:</h4>
              <div className="space-y-3">
                <a
                  href="https://www.amazon.com.au/Biohack-Me-Practical-Everyday-Longevity/dp/1394334036?crid=9IG03P4KA7QX&dib=eyJ2IjoiMSJ9.GbADeTF-Z6mlbHKDu_sPD12vKrYEnrKRiF3xEN6ACpZNCOKPco-ARqaxSfeDVRxoaHDzjawtoeary6jq6GT9Zg3UOCkSDN3BdBUxEUoIV3Qa2ABQoW_lVoSGWtPZi_hjICN4ZWMGyzfdm0IGGYgFgZnJPgqCiDvx4spybI7OSSVv1MplYI92JONRL2wgJTYOHc02V7g0yJku50QscBNleb6FIGanwCWEA8dQCwIxdj8lDABQ_Tx-KnIhTOAZ6ZTQY0dlM3pB3eRVzh6eJY1iOsuwNrdPXWLrP8HEtNJsbZG4I72qy5aX9_BI7JrXjD7J1zRyD56OHLXLPv_6Se1TLUpaRkcNUyNcPQhwO2WrpZvfPuFf3KKLgUBM2BJdsjt8yiw6FTOXV_xJLyOdDdYK4KFnhxGce5XeAdujWr4Iz-nmKC4JZp-waj-kpOl6Tbd3.VrDS1MdxB0GyJG9xem2dIRfmB3uLiHcSddzJdAkann0&dib_tag=se&keywords=biohack+me&qid=1738561296&sprefix=biohack+me,aps,653&sr=8-1&linkCode=sl1&tag=camillathomps-22&linkId=ba1a4ce7f6279d3631a2290c8e274fb2&language=en_AU&ref_=as_li_ss_tl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-ocean px-6 py-3 rounded-full font-medium hover:bg-ice transition-colors block text-center flex items-center justify-center"
                >
                  Amazon Australia
                </a>
                <a
                  href="https://www.booktopia.com.au/search.ep?keywords=biohack+me+camilla+thompson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-ocean px-6 py-3 rounded-full font-medium hover:bg-ice transition-colors block text-center flex items-center justify-center"
                >
                  Booktopia
                </a>
              </div>
            </div>
            <div className="text-left">
              <h4 className="text-white font-medium mb-3">In All Good Bookstores & Airports:</h4>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-left">
                <p className="text-white/90 mb-2">Available worldwide in physical bookstores and airports</p>
                <p className="text-xs text-white/70">Ask your local bookstore to order it for you!</p>
              </div>
            </div>
          </div>


          <div className="text-center">
            <Link
              to="/superchargeyourlife"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-ocean transition-colors inline-block"
            >
              Want 1:1 Coaching Instead?
            </Link>
          </div>
        </motion.div>

      </div>
      
      <Footer />
    </div>
  )
}