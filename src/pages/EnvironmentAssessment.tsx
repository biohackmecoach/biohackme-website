import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { subscribeToMailchimp } from '../utils/mailchimp'

const EnvironmentAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConsentScreen, setShowConsentScreen] = useState(true)
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)

  const totalQuestions = 16

  // Check for existing results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('environment-assessment-results')
    if (savedResults) {
      try {
        const { answers: savedAnswers, email: savedEmail, timestamp } = JSON.parse(savedResults)
        // Show results if saved within last 24 hours
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
          setAnswers(savedAnswers)
          setEmail(savedEmail)
          setEmailSubmitted(true)
          setShowResults(true)
        } else {
          // Clear old results
          localStorage.removeItem('environment-assessment-results')
        }
      } catch (error) {
        localStorage.removeItem('environment-assessment-results')
      }
    }
  }, [])

  const questions = [
    {
      id: 1,
      text: "Do you use air purifiers and/or houseplants to improve your indoor air quality?",
      options: [
        { text: "Yes, I have multiple air purifiers and air-purifying plants", value: 5 },
        { text: "I have some air purification systems", value: 4 },
        { text: "A few houseplants but no purifiers", value: 3 },
        { text: "I occasionally open windows for fresh air", value: 2 },
        { text: "I don't actively work to improve air quality", value: 1 }
      ]
    },
    {
      id: 2,
      text: "Do you filter your drinking water to remove impurities and contaminants?",
      options: [
        { text: "Yes, I have high-quality water filtration systems", value: 5 },
        { text: "I use a good quality filter pitcher or tap filter", value: 4 },
        { text: "Sometimes I use filtered water", value: 3 },
        { text: "Rarely filter water - mostly drink tap water", value: 2 },
        { text: "I only drink tap water without filtration", value: 1 }
      ]
    },
    {
      id: 3,
      text: "Has your home been tested for mould, and do you use a dehumidifier to control moisture?",
      options: [
        { text: "Yes, regularly tested and I maintain optimal humidity levels", value: 5 },
        { text: "I've tested for mould and use humidity control sometimes", value: 4 },
        { text: "I'm aware of moisture issues and address them when obvious", value: 3 },
        { text: "I occasionally check for mould but don't actively prevent it", value: 2 },
        { text: "I've never tested for mould or considered humidity control", value: 1 }
      ]
    },
    {
      id: 4,
      text: "Do you use low-tox cleaning products instead of conventional chemical cleaners?",
      options: [
        { text: "Yes, I exclusively use natural, eco-friendly cleaning products", value: 5 },
        { text: "Mostly natural products with occasional conventional ones", value: 4 },
        { text: "Mix of natural and conventional cleaning products", value: 3 },
        { text: "Mostly conventional with some natural alternatives", value: 2 },
        { text: "I use conventional chemical cleaning products exclusively", value: 1 }
      ]
    },
    {
      id: 5,
      text: "Have you switched to low-tox personal care products (shampoo, skincare, deodorant) and checked them with apps like Yuka?",
      options: [
        { text: "Yes, I use clean products and regularly check ingredients", value: 5 },
        { text: "Most of my personal care products are low-tox", value: 4 },
        { text: "I'm gradually switching to cleaner alternatives", value: 3 },
        { text: "I occasionally choose natural options", value: 2 },
        { text: "I don't consider ingredients in personal care products", value: 1 }
      ]
    },
    {
      id: 6,
      text: "Do you use low-tox cookware (stainless steel, ceramic, cast iron) instead of non-stick or plastic?",
      options: [
        { text: "Yes, all my cookware is non-toxic and safe", value: 5 },
        { text: "Most of my cookware is low-tox", value: 4 },
        { text: "I'm gradually replacing cookware with safer options", value: 3 },
        { text: "I have some low-tox cookware but still use non-stick", value: 2 },
        { text: "I mostly use non-stick or haven't considered cookware toxicity", value: 1 }
      ]
    },
    {
      id: 7,
      text: "Do you maximise natural light during the day and use dimmable or red lights in the evening?",
      options: [
        { text: "Yes, I optimise lighting throughout the day and use red/dim lights at night", value: 5 },
        { text: "I get good natural light and sometimes dim lights in evening", value: 4 },
        { text: "I try to get natural light when possible", value: 3 },
        { text: "I don't actively optimise lighting", value: 2 },
        { text: "I use bright artificial lights throughout the day and evening", value: 1 }
      ]
    },
    {
      id: 8,
      text: "Do you have tech-free zones or put your phone in aeroplane mode/turn off wi-fi at night?",
      options: [
        { text: "Yes, I have designated tech-free zones and turn off devices at night", value: 5 },
        { text: "I often put phone on aeroplane mode and limit bedroom tech", value: 4 },
        { text: "Sometimes I turn off devices or create tech breaks", value: 3 },
        { text: "Rarely disconnect from technology", value: 2 },
        { text: "Technology is always on - no tech-free zones", value: 1 }
      ]
    },
    {
      id: 9,
      text: "How well do you limit psychological pollutants (negative news, draining relationships, toxic social media)?",
      options: [
        { text: "Excellent - I actively curate positive mental inputs", value: 5 },
        { text: "Good - I limit most negative influences", value: 4 },
        { text: "Fair - I'm aware but don't always avoid negative inputs", value: 3 },
        { text: "Poor - often exposed to negative influences", value: 2 },
        { text: "I regularly consume negative news and maintain draining relationships", value: 1 }
      ]
    },
    {
      id: 10,
      text: "Is your living and working space decluttered and organised?",
      options: [
        { text: "Yes, my spaces are consistently clean, organised and clutter-free", value: 5 },
        { text: "Mostly organised with occasional clutter", value: 4 },
        { text: "Sometimes organised, sometimes cluttered", value: 3 },
        { text: "Often cluttered but I try to organise occasionally", value: 2 },
        { text: "My spaces are consistently cluttered and disorganised", value: 1 }
      ]
    },
    {
      id: 11,
      text: "Do you use bamboo or wood fibre chopping boards instead of plastic to reduce microplastic exposure?",
      options: [
        { text: "Yes, I avoid plastic in the kitchen and use natural materials", value: 5 },
        { text: "Mostly natural materials with minimal plastic use", value: 4 },
        { text: "I'm gradually replacing plastic kitchen items", value: 3 },
        { text: "I use some natural materials but still have plastic", value: 2 },
        { text: "I haven't considered microplastics and use plastic cookware", value: 1 }
      ]
    },
    {
      id: 12,
      text: "Is your workspace ergonomically set up with proper chair, desk height, and monitor positioning?",
      options: [
        { text: "Yes, everything is perfectly positioned for optimal posture", value: 5 },
        { text: "Mostly good setup with minor adjustments needed", value: 4 },
        { text: "Decent setup but could be improved", value: 3 },
        { text: "Basic setup that causes some discomfort", value: 2 },
        { text: "Poor ergonomics that regularly cause pain or strain", value: 1 }
      ]
    },
    {
      id: 13,
      text: "Do you maintain comfortable temperature control (around 20-22°C for work, 15-19°C for sleep)?",
      options: [
        { text: "Yes, I maintain optimal temperatures for different activities", value: 5 },
        { text: "Good temperature control most of the time", value: 4 },
        { text: "Generally comfortable but not optimised", value: 3 },
        { text: "Sometimes too hot or cold but I adapt", value: 2 },
        { text: "Poor temperature control that affects comfort and performance", value: 1 }
      ]
    },
    {
      id: 14,
      text: "Do you incorporate nature elements like plants, natural materials, or nature artwork in your spaces?",
      options: [
        { text: "Yes, my spaces are filled with plants and natural elements", value: 5 },
        { text: "Good amount of plants and natural materials", value: 4 },
        { text: "Some plants or natural elements", value: 3 },
        { text: "Minimal natural elements in my environment", value: 2 },
        { text: "Mostly artificial environment with no nature elements", value: 1 }
      ]
    },
    {
      id: 15,
      text: "When travelling, do you practice biohacks like grounding/earthing, staying hydrated with electrolytes, and taking protective supplements?",
      options: [
        { text: "Yes, I have comprehensive travel biohacking protocols", value: 5 },
        { text: "I use several travel biohacks regularly", value: 4 },
        { text: "Sometimes I use travel biohacks", value: 3 },
        { text: "Rarely consider environmental protection whilst travelling", value: 2 },
        { text: "I don't use any travel biohacks or environmental protection", value: 1 }
      ]
    },
    {
      id: 16,
      text: "Overall, how aware are you that your environment significantly impacts your health and energy?",
      options: [
        { text: "Extremely aware - I actively optimise my environment for health", value: 5 },
        { text: "Very aware and I make environmental health a priority", value: 4 },
        { text: "Somewhat aware - I make some environmental considerations", value: 3 },
        { text: "Slightly aware but don't take much action", value: 2 },
        { text: "Not aware of environmental impacts on health", value: 1 }
      ]
    }
  ]

  const handleConsentSubmit = () => {
    if (!privacyConsent) {
      alert('Please agree to the privacy policy to start the assessment')
      return
    }
    setShowConsentScreen(false)
  }

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [`q${questionId}`]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowEmailCapture(true)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    const result = await subscribeToMailchimp({
      email,
      source: 'environment-assessment'
    })

    if (result.success) {
      // Store results in localStorage for persistence
      const assessmentResults = {
        answers,
        email,
        timestamp: Date.now(),
        type: 'environment-assessment'
      }
      localStorage.setItem('environment-assessment-results', JSON.stringify(assessmentResults))

      setEmailSubmitted(true)
      setShowEmailCapture(false)
      setShowResults(true)
    } else {
      alert('Failed to subscribe. Please try again.')
    }

    setIsSubmitting(false)
  }

  const getResultData = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0)
    const maxScore = totalQuestions * 5
    const percentage = Math.round((totalScore / maxScore) * 100)

    if (percentage >= 85) {
      return {
        score: percentage,
        title: "Environment Optimisation Champion",
        description: "Outstanding! You've created a health-supporting environment and are implementing most of the environmental biohacks from my book. Your awareness of environmental toxins and commitment to creating clean spaces is exemplary.",
        colour: "score-excellent",
        recommendations: [
          "Continue your excellent environmental health practices - you're leading by example",
          "Consider mentoring others who are starting their environmental detox journey",
          "Stay updated with the latest research on environmental toxins and solutions",
          "Share your knowledge about mould, air quality, and low-tox living with others",
          "Fine-tune any remaining areas where you scored lower"
        ]
      }
    } else if (percentage >= 70) {
      return {
        score: percentage,
        title: "Strong Environmental Foundation",
        description: "Well done! You have a solid foundation in environmental health practices. There are some key areas where you can further reduce toxic exposure and enhance your environment.",
        colour: "score-good",
        recommendations: [
          "Focus on the specific environmental areas where you scored lowest",
          "Implement 2-3 new environmental biohacks from my book over the next month",
          "Consider professional mould testing if you haven't already done so",
          "Upgrade to higher-quality air and water filtration systems",
          "Create more tech-free zones and improve your lighting optimisation"
        ]
      }
    } else if (percentage >= 50) {
      return {
        score: percentage,
        title: "Environmental Improvement Opportunity",
        description: "You have significant opportunities to improve your environmental health. The good news is that environmental changes can have immediate and dramatic health benefits!",
        colour: "score-fair",
        recommendations: [
          "Start with air and water quality - invest in good filtration systems",
          "Switch to low-tox cleaning and personal care products immediately",
          "Test your home for mould and address any moisture issues",
          "Replace non-stick cookware with stainless steel, ceramic, or cast iron",
          "Consider my comprehensive environmental detox coaching programme for personalised guidance"
        ]
      }
    } else {
      return {
        score: percentage,
        title: "Environmental Transformation Urgently Needed",
        description: "Your environment may be significantly impacting your health. As someone who's experienced severe mould toxicity, I understand how critical environmental changes are - this is where you can see the most dramatic improvements!",
        colour: "score-poor",
        recommendations: [
          "Immediately assess your home for mould and address any water damage",
          "Install air purifiers and improve ventilation in your living spaces",
          "Switch to filtered water and eliminate plastic from food preparation",
          "Replace all toxic cleaning and personal care products with natural alternatives",
          "I strongly recommend working together through my environmental detox coaching programme for comprehensive support"
        ]
      }
    }
  }

  const currentQuestionData = questions[currentQuestion - 1]
  const progress = (currentQuestion / totalQuestions) * 100
  const currentAnswer = answers[`q${currentQuestion}`]

  // Show consent screen first
  if (showConsentScreen) {
    return (
      <>
        <Helmet>
          <title>Environment Optimisation Assessment - BiohackMe</title>
          <meta name="description" content="Assess your environmental health factors with BiohackMe's comprehensive environment assessment." />
        </Helmet>

        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #4CAF50 100%)' }}>
          <div className="max-w-2xl mx-auto px-4 pt-20 pb-16">
            <div className="bg-white/95 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#2E7D32] mb-4">Before You Begin</h1>
                <p className="text-gray-600 leading-relaxed">
                  Please read and agree to the following before starting your Environment Optimisation Assessment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-[#2E7D32] mb-4">Consent</h4>

                <div className="space-y-4 text-sm text-gray-700">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 mr-3 w-5 h-5 text-[#4CAF50] focus:ring-[#4CAF50] rounded"
                    />
                    <span className="leading-relaxed">
                      I agree to the collection and use of my responses for the purpose of generating my personalised Biohacking Assessment results, in line with the{' '}
                      <a href="/privacy-policy" className="text-[#4CAF50] underline hover:text-[#2E7D32] font-medium" target="_blank" rel="noopener noreferrer">
                        BioHackMe Privacy Policy
                      </a>
                      . I understand this information is for educational purposes only and does not constitute medical advice.
                    </span>
                  </label>

                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-1 mr-3 w-5 h-5 text-[#4CAF50] focus:ring-[#4CAF50] rounded"
                    />
                    <span className="leading-relaxed">
                      I'd like to receive occasional updates, resources, and offers from BioHackMe.
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleConsentSubmit}
                disabled={!privacyConsent}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  privacyConsent
                    ? 'bg-[#4CAF50] text-white hover:bg-[#2E7D32] hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Start Assessment
              </button>

              {!privacyConsent && (
                <p className="text-sm text-gray-500 text-center mt-4">
                  Please agree to the privacy policy to begin the assessment
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  if (showEmailCapture) {
    return (
      <>
        <Helmet>
          <title>Environment Optimisation Assessment Results | BiohackMe Australia</title>
          <meta name="description" content="Get your personalised environment optimisation results and proven strategies to reduce toxic exposure and create health-supporting spaces." />
        </Helmet>

        <div style={{
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #E8F5E8 0%, #4A7C59 100%)',
          minHeight: '100vh',
          color: '#161616'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 20px 20px' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#2D5016',
                marginBottom: '10px',
                letterSpacing: '2px'
              }}>
                BIOHACKME
              </div>
              <div style={{
                fontSize: '16px',
                color: '#4A7C59',
                fontWeight: 500
              }}>
                Supercharge Your Life, One Biohack at a Time
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#2D5016',
                margin: '20px 0 10px'
              }}>
                Environment Optimisation Assessment
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#161616',
                opacity: 0.8,
                marginBottom: '30px'
              }}>
                Discover how your environment supports or sabotages your health and wellbeing
              </p>
            </div>

            <div style={{
              display: 'block',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#2D5016',
                marginBottom: '15px'
              }}>
                Get Your Personalised Results
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#161616',
                marginBottom: '25px',
                lineHeight: '1.6'
              }}>
                Enter your email to receive your personalised environment optimisation score and my proven strategies to reduce toxic exposure and create health-supporting spaces.
              </p>

              <form onSubmit={handleEmailSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    padding: '15px',
                    border: '2px solid #E8F5E8',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4A7C59'}
                  onBlur={(e) => e.target.style.borderColor = '#E8F5E8'}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? '#ccc' : '#4A7C59',
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = '#2D5016'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = '#4A7C59'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {isSubmitting ? 'Subscribing...' : 'Get My Environment Assessment Results'}
                </button>
              </form>

              <p style={{
                fontSize: '14px',
                color: '#666',
                marginTop: '15px',
                lineHeight: '1.5'
              }}>
                By entering your email, you'll receive your assessment results and occasional environmental optimisation tips.
                Your email is safe with us and you can unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (showResults) {
    const result = getResultData()

    return (
      <>
        <Helmet>
          <title>Your Environment Optimisation Results | BiohackMe Australia</title>
          <meta name="description" content="Your personalised environment optimisation assessment results with recommendations to create health-supporting spaces." />
        </Helmet>

        <div style={{
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #E8F5E8 0%, #4A7C59 100%)',
          minHeight: '100vh',
          color: '#161616'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 20px 20px' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '40px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#2D5016',
                marginBottom: '10px',
                letterSpacing: '2px'
              }}>
                BIOHACKME
              </div>
              <div style={{
                fontSize: '16px',
                color: '#4A7C59',
                fontWeight: 500
              }}>
                Supercharge Your Life, One Biohack at a Time
              </div>
            </div>

            <div style={{
              display: 'block',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                margin: '20px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: 700,
                color: result.colour === 'score-fair' ? '#161616' : 'white',
                background: result.colour === 'score-excellent' ? '#10B981' :
                           result.colour === 'score-good' ? '#3B82F6' :
                           result.colour === 'score-fair' ? '#F59E0B' : '#EF4444'
              }}>
                {result.score}%
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#2D5016',
                margin: '20px 0'
              }}>
                {result.title}
              </h2>

              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#161616',
                marginBottom: '30px'
              }}>
                {result.description}
              </p>

              <div style={{
                background: '#F8FBF8',
                padding: '25px',
                borderRadius: '15px',
                margin: '20px 0',
                textAlign: 'left'
              }}>
                <h3 style={{
                  color: '#2D5016',
                  fontSize: '20px',
                  marginBottom: '15px'
                }}>
                  Your Personalised Recommendations
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {result.recommendations.map((rec, index) => (
                    <li key={index} style={{
                      padding: '8px 0',
                      paddingLeft: '20px',
                      position: 'relative',
                      lineHeight: '1.5'
                    }}>
                      <span style={{
                        content: '✓',
                        position: 'absolute',
                        left: 0,
                        color: '#4A7C59',
                        fontWeight: 600
                      }}>✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div style={{
                background: '#E9EFF2',
                border: '2px solid rgba(30, 107, 184, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                marginTop: '30px',
                marginBottom: '30px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <svg style={{ width: '24px', height: '24px', color: '#1E6BB8', flexShrink: 0, marginTop: '2px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div style={{ fontSize: '14px', color: '#2C3E50' }}>
                    <p style={{ fontWeight: 600, marginBottom: '8px', color: '#1E6BB8' }}>Important Medical Disclaimer</p>
                    <p style={{ lineHeight: '1.6' }}>
                      This assessment is for educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment.
                      The recommendations provided are general wellness suggestions and should not replace professional medical advice.
                      Always consult with a qualified healthcare professional before making any changes to your health routine, diet, exercise program,
                      or if you have any medical conditions or concerns. If you are experiencing a medical emergency, please contact emergency services immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #4A7C59, #2D5016)',
                padding: '30px',
                borderRadius: '15px',
                color: 'white',
                marginTop: '30px'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  marginBottom: '15px'
                }}>
                  Ready to Transform Your Environment?
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  Learn my complete environmental detox strategies in the Environment masterclass,
                  where I share everything I've learned from my own mould toxicity recovery and helping others create truly healthy spaces.
                </p>
                <a
                  href="/masterclass"
                  style={{
                    background: 'white',
                    color: '#2D5016',
                    padding: '15px 40px',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '18px',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  Explore Environment Masterclass
                </a>
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <button
                  onClick={() => {
                    localStorage.removeItem('environment-assessment-results')
                    setShowResults(false)
                    setShowEmailCapture(false)
                    setCurrentQuestion(1)
                    setAnswers({})
                    setEmail('')
                    setEmailSubmitted(false)
                  }}
                  style={{
                    background: 'transparent',
                    color: '#2D5016',
                    border: '2px solid #2D5016',
                    padding: '10px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#2D5016'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#2D5016'
                  }}
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Environment Optimisation Assessment | BiohackMe Australia</title>
        <meta name="description" content="Discover how your environment supports or sabotages your health and wellbeing with this comprehensive environmental assessment." />
        <meta name="keywords" content="environment assessment, environmental health, mould testing, air quality, water filtration, low tox living" />
        <meta property="og:title" content="Environment Optimisation Assessment | BiohackMe Australia" />
        <meta property="og:description" content="Test your environmental health and get personalized recommendations for creating spaces that support your vitality." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.biohackme.com.au/environment-assessment" />
      </Helmet>

      <div style={{
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #E8F5E8 0%, #4A7C59 100%)',
        minHeight: '100vh',
        color: '#161616'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 20px 20px' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#2D5016',
              marginBottom: '10px',
              letterSpacing: '2px'
            }}>
              BIOHACKME
            </div>
            <div style={{
              fontSize: '16px',
              color: '#4A7C59',
              fontWeight: 500
            }}>
              Supercharge Your Life, One Biohack at a Time
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#2D5016',
              margin: '20px 0 10px'
            }}>
              Environment Optimisation Assessment
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#161616',
              opacity: 0.8,
              marginBottom: '30px'
            }}>
              Discover how your environment supports or sabotages your health and wellbeing
            </p>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '30px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
            lineHeight: '1.6',
            fontSize: '16px'
          }}>
            <p><strong>The environment you live and work in plays a critical role in your health and wellbeing.</strong> As someone who's experienced severe mould toxicity, I understand how invisible environmental factors can dramatically impact your health.</p>
            <p>This assessment evaluates your current environment against the key optimisation strategies from my book. You'll discover which environmental biohacks could transform your health, reduce toxic exposure, and create spaces that support your vitality and longevity.</p>
          </div>

          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '3px',
            marginBottom: '30px'
          }}>
            <div style={{
              height: '100%',
              background: '#2D5016',
              borderRadius: '3px',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '20px',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              color: '#4A7C59',
              fontWeight: 600,
              fontSize: '14px',
              marginBottom: '10px'
            }}>
              Question {currentQuestion} of {totalQuestions}
            </div>

            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#2D5016',
              marginBottom: '20px',
              lineHeight: '1.4'
            }}>
              {currentQuestionData.text}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {currentQuestionData.options.map((option, index) => (
                <label
                  key={index}
                  style={{
                    background: currentAnswer === option.value ? '#4A7C59' : '#F8FBF8',
                    border: `2px solid ${currentAnswer === option.value ? '#2D5016' : '#E8F5E8'}`,
                    borderRadius: '12px',
                    padding: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    color: currentAnswer === option.value ? 'white' : '#161616'
                  }}
                  onMouseEnter={(e) => {
                    if (currentAnswer !== option.value) {
                      e.target.style.borderColor = '#4A7C59'
                      e.target.style.background = '#E8F5E8'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentAnswer !== option.value) {
                      e.target.style.borderColor = '#E8F5E8'
                      e.target.style.background = '#F8FBF8'
                    }
                  }}
                >
                  <input
                    type="radio"
                    name={`q${currentQuestion}`}
                    value={option.value}
                    checked={currentAnswer === option.value}
                    onChange={() => handleAnswerSelect(currentQuestion, option.value)}
                    style={{
                      marginRight: '12px',
                      transform: 'scale(1.2)'
                    }}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '30px'
          }}>
            <button
              onClick={previousQuestion}
              style={{
                background: 'transparent',
                color: '#4A7C59',
                border: '2px solid #4A7C59',
                padding: '12px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: currentQuestion === 1 ? 'none' : 'block'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#4A7C59'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#4A7C59'
              }}
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={!currentAnswer}
              style={{
                background: currentAnswer ? '#4A7C59' : '#ccc',
                color: 'white',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: currentAnswer ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                transform: 'none'
              }}
              onMouseEnter={(e) => {
                if (currentAnswer) {
                  e.target.style.background = '#2D5016'
                  e.target.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentAnswer) {
                  e.target.style.background = '#4A7C59'
                  e.target.style.transform = 'translateY(0)'
                }
              }}
            >
              {currentQuestion === totalQuestions ? 'Get Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EnvironmentAssessment