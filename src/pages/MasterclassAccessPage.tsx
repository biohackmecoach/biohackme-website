import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Clock, Users, Star, PlayCircle } from 'lucide-react'

export default function MasterclassAccessPage() {
  const handleDownloadPDF = () => {
    // Direct link to the PDF
    const link = document.createElement('a')
    link.href = '/resources/BIOHACKING-BASICS-MASTERCLASS.pdf'
    link.download = 'Biohacking-Basics-Masterclass.pdf'
    link.click()
  }

  return (
    <>
      <Helmet>
        <title>Biohacking Basics Masterclass | BiohackMe</title>
        <meta name="description" content="Access your Biohacking Basics Masterclass - The 7 Pillars Framework for Optimal Living" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-ice to-cloud">
        {/* Welcome Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >

              <h1 className="text-4xl md:text-5xl font-montserrat font-light text-ocean mb-6 mt-8">
                Welcome to Your Masterclass
              </h1>
              <p className="text-xl text-charcoal/80 mb-8 max-w-2xl mx-auto">
                Congratulations! You now have lifetime access to the Biohacking Basics Masterclass:
                The 7 Pillars Framework for Optimal Living
              </p>

              {/* Quick Access - Download & Video */}
              <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-ocean to-sky text-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold mb-3 flex items-center">
                    <Download className="w-6 h-6 mr-2" />
                    Instant Download
                  </h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Download your complete workbook with worksheets, assessments, and guides.
                  </p>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full bg-white text-ocean py-3 px-6 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Workbook PDF
                  </button>
                </div>

                <div className="bg-gradient-to-br from-sky to-ice border-2 border-ocean/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-ocean mb-3 flex items-center">
                    <PlayCircle className="w-6 h-6 mr-2" />
                    Full Masterclass Video
                  </h3>
                  <p className="text-charcoal/80 mb-4 text-sm">
                    Watch the complete masterclass below, or open in new window for larger view.
                  </p>
                  <a
                    href="https://www.loom.com/share/61af56a7d8f445a9a47b22e5e6b3b8e4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-ocean text-white py-3 px-6 rounded-full font-semibold hover:bg-sky transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Open Video in New Tab
                  </a>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-ice/50 to-cloud/50 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
                <h2 className="text-lg font-semibold text-ocean mb-3 text-left">How to Get the Most From Your Masterclass:</h2>
                <div className="grid md:grid-cols-2 gap-4 text-charcoal/80 text-left">
                  <div className="flex items-start">
                    <span className="text-ocean mr-2 font-bold">•</span>
                    <span>Download your workbook first (button above)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean mr-2 font-bold">•</span>
                    <span>Watch the video and take notes in your workbook</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean mr-2 font-bold">•</span>
                    <span>Complete the assessments as you go</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-ocean mr-2 font-bold">•</span>
                    <span>Bookmark this page - you have lifetime access</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Masterclass Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">

              {/* Main Video */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-montserrat font-light text-ocean mb-4">
                      Biohacking Basics: Future-Proof Your Health
                    </h2>
                    <div className="flex items-center gap-6 text-charcoal/70 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-sky" />
                        <span className="text-sm">30 minutes</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-sky" />
                        <span className="text-sm">Beginner Level</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-sky" />
                        <span className="text-sm">4.9/5 Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video bg-gradient-to-br from-ocean/10 to-sky/10 rounded-2xl overflow-hidden relative">
                    <iframe
                      src="https://www.loom.com/embed/61af56a7d8f445a9a47b22e5e6b3b8e4?sid=3b66481a-8897-4e34-9fab-278141051ba4"
                      frameBorder="0"
                      webkitAllowFullScreen
                      mozAllowFullScreen
                      allowFullScreen
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                      title="Biohacking Basics Masterclass - Full Course"
                      className="relative w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Resources Section */}
              <div className="grid md:grid-cols-2 gap-8">

                {/* Download Masterclass PDF */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-semibold text-ocean mb-4 flex items-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download Your Resources
                  </h3>
                  <p className="text-charcoal/70 mb-6">
                    Get the complete masterclass materials including worksheets, assessments, and bonus content.
                  </p>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full bg-gradient-to-r from-ocean to-sky text-white py-3 px-6 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Masterclass PDF
                  </button>
                </motion.div>

                {/* What's Included */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-semibold text-ocean mb-4">
                    What's Included
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">Complete 30-minute masterclass video</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">Biohacking Wheel Life Audit worksheet</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">7 Pillars Foundation Guide</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">Anchor & Amplify Habit Workbook</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">30-Day Biohack Tracker</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-charcoal/80">Lifetime access to all materials</span>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Support Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-ice to-cloud rounded-2xl p-8 mt-12 text-center"
              >
                <h3 className="text-2xl font-semibold text-ocean mb-4">
                  Questions or Need Support?
                </h3>
                <p className="text-charcoal/70 mb-6">
                  I'm here to support you on your biohacking journey. Don't hesitate to reach out if you have any questions.
                </p>
                <a
                  href="mailto:hello@biohackme.com.au?subject=Masterclass Support"
                  className="inline-flex items-center bg-ocean text-white px-6 py-3 rounded-full font-medium hover:bg-sky transition-colors"
                >
                  Get Support
                </a>
              </motion.div>

            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}