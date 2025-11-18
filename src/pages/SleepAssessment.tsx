import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { subscribeToMailchimp } from '../utils/mailchimp'

const SleepAssessment: React.FC = () => {
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

  const totalQuestions = 15

  // Check for existing results on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('sleep-assessment-results')
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
          localStorage.removeItem('sleep-assessment-results')
        }
      } catch (error) {
        localStorage.removeItem('sleep-assessment-results')
      }
    }
  }, [])

  const questions = [
    {
      id: 1,
      text: "How many hours of sleep do you typically get per night?",
      options: [
        { text: "Less than 5 hours", value: 1 },
        { text: "5-6 hours", value: 2 },
        { text: "6-7 hours", value: 3 },
        { text: "7-8 hours", value: 4 },
        { text: "8-9 hours (my optimal range!)", value: 5 },
        { text: "More than 9 hours", value: 4 }
      ]
    },
    {
      id: 2,
      text: "Do you get at least 10 minutes of natural morning light exposure upon waking?",
      options: [
        { text: "Yes, I prioritise morning sunlight daily", value: 5 },
        { text: "Most days I get morning light", value: 4 },
        { text: "Sometimes I get morning light", value: 3 },
        { text: "Rarely get morning light exposure", value: 2 },
        { text: "I usually stay indoors in the morning", value: 1 }
      ]
    },
    {
      id: 3,
      text: "Do you have a relaxing bedtime routine that includes activities like reading, stretching, or yoga nidra?",
      options: [
        { text: "Yes, I have a consistent calming routine", value: 5 },
        { text: "Most nights I do relaxing activities", value: 4 },
        { text: "Sometimes I have a bedtime routine", value: 3 },
        { text: "Rarely have a relaxing routine", value: 2 },
        { text: "No bedtime routine - I just go to bed", value: 1 }
      ]
    },
    {
      id: 4,
      text: "Do you practice \"big belly, little belly\" breathing (deep belly breathing) to help you fall asleep?",
      options: [
        { text: "Yes, I use this technique regularly", value: 5 },
        { text: "Sometimes I practice deep breathing", value: 4 },
        { text: "Occasionally when I remember", value: 3 },
        { text: "Rarely use breathing techniques", value: 2 },
        { text: "Never practiced sleep breathing", value: 1 }
      ]
    },
    {
      id: 5,
      text: "How often do you limit screen exposure at least 30 minutes before bed?",
      options: [
        { text: "Always - I keep phones in another room", value: 5 },
        { text: "Most nights I avoid screens", value: 4 },
        { text: "Sometimes I put screens away", value: 3 },
        { text: "Rarely avoid screens before bed", value: 2 },
        { text: "I usually use devices right until bed", value: 1 }
      ]
    },
    {
      id: 6,
      text: "Is your bedroom environment optimised for sleep (dark, quiet, cool 16-20°C)?",
      options: [
        { text: "Perfect - dark, quiet, cool with blackout setup", value: 5 },
        { text: "Good - most conditions are optimal", value: 4 },
        { text: "Okay - some room for improvement", value: 3 },
        { text: "Poor - several issues to address", value: 2 },
        { text: "Not optimised for sleep at all", value: 1 }
      ]
    },
    {
      id: 7,
      text: "Do you use red-light therapy or red lights in the evening to support melatonin production?",
      options: [
        { text: "Yes, I use red-light therapy devices regularly", value: 5 },
        { text: "I use red lights in the evening sometimes", value: 4 },
        { text: "Occasionally use red/amber lighting", value: 3 },
        { text: "Rarely consider lighting colour", value: 2 },
        { text: "Never thought about evening light therapy", value: 1 }
      ]
    },
    {
      id: 8,
      text: "Do you take magnesium supplements or use magnesium products (glycinate, bath salts, sprays) for sleep?",
      options: [
        { text: "Yes, I use multiple forms of magnesium regularly", value: 5 },
        { text: "I take magnesium supplements for sleep", value: 4 },
        { text: "Sometimes use magnesium products", value: 3 },
        { text: "Rarely use magnesium for sleep", value: 2 },
        { text: "Never used magnesium for sleep support", value: 1 }
      ]
    },
    {
      id: 9,
      text: "Do you use tools like a Shakti mat or get regular acupuncture to help regulate your nervous system?",
      options: [
        { text: "Yes, I regularly use these nervous system tools", value: 5 },
        { text: "Sometimes use acupressure or acupuncture", value: 4 },
        { text: "Occasionally try these methods", value: 3 },
        { text: "Rarely use nervous system regulation tools", value: 2 },
        { text: "Never tried these approaches", value: 1 }
      ]
    },
    {
      id: 10,
      text: "Do you avoid heavy meals at least 2 hours before bed and limit alcohol 3-4 hours before sleep?",
      options: [
        { text: "Yes, I'm strict about eating and drinking timing", value: 5 },
        { text: "Usually follow these guidelines", value: 4 },
        { text: "Sometimes mindful of timing", value: 3 },
        { text: "Occasionally eat or drink late", value: 2 },
        { text: "Often eat or drink close to bedtime", value: 1 }
      ]
    },
    {
      id: 11,
      text: "Do you maintain a consistent sleep schedule, going to bed and waking at similar times daily?",
      options: [
        { text: "Very consistent - within 15 minutes daily", value: 5 },
        { text: "Mostly consistent - within 30 minutes", value: 4 },
        { text: "Somewhat consistent - within 1 hour", value: 3 },
        { text: "Inconsistent - varies by 1-2 hours", value: 2 },
        { text: "Very inconsistent schedule", value: 1 }
      ]
    },
    {
      id: 12,
      text: "How often do you read a book or magazine before bed (instead of screens)?",
      options: [
        { text: "Every night - reading is part of my routine", value: 5 },
        { text: "Most nights I read before bed", value: 4 },
        { text: "Sometimes I read instead of screens", value: 3 },
        { text: "Rarely read before bed", value: 2 },
        { text: "Never read - I use screens until sleep", value: 1 }
      ]
    },
    {
      id: 13,
      text: "Do you use tools like silk eye masks or blackout curtains to create complete darkness?",
      options: [
        { text: "Yes, I use multiple tools for complete darkness", value: 5 },
        { text: "I have good blackout setup", value: 4 },
        { text: "Some light blocking but could improve", value: 3 },
        { text: "Minimal light control", value: 2 },
        { text: "Sleep with light pollution", value: 1 }
      ]
    },
    {
      id: 14,
      text: "When you can't sleep or wake during the night, do you practice breathing techniques instead of reaching for your phone?",
      options: [
        { text: "Always - I use breathing to return to sleep", value: 5 },
        { text: "Usually practice breathing techniques", value: 4 },
        { text: "Sometimes use breathing, sometimes phone", value: 3 },
        { text: "Usually reach for phone when awake", value: 2 },
        { text: "Always use phone when I can't sleep", value: 1 }
      ]
    },
    {
      id: 15,
      text: "Overall, do you view quality sleep as a non-negotiable foundation for your health?",
      options: [
        { text: "Absolutely - sleep is my top priority", value: 5 },
        { text: "Yes, I prioritize sleep highly", value: 4 },
        { text: "I try to prioritize sleep when possible", value: 3 },
        { text: "Sleep is important but not always prioritized", value: 2 },
        { text: "I often sacrifice sleep for other activities", value: 1 }
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

  const handleAnswerSelect = (value: number) => {
    setAnswers({ ...answers, [`q${currentQuestion}`]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = () => {
    setShowEmailCapture(true)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    const result = await subscribeToMailchimp({
      email,
      source: 'sleep-assessment'
    })

    if (result.success) {
      // Store results in localStorage for persistence
      const assessmentResults = {
        answers,
        email,
        timestamp: Date.now(),
        type: 'sleep-assessment'
      }
      localStorage.setItem('sleep-assessment-results', JSON.stringify(assessmentResults))

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
        title: "Sleep Biohacker Champion",
        description: "Outstanding! You're already implementing most of my key sleep biohacks. You understand that quality sleep is truly non-negotiable for optimal health. You're well on your way to mastering the foundational pillar of biohacking.",
        class: "score-excellent",
        recommendations: [
          "Fine-tune your existing routine with advanced sleep tracking technology to identify micro-optimisations",
          "Experiment with precise temperature regulation using cooling mattresses or sleepwear",
          "Master advanced breathing patterns like the 4-7-8 technique for deeper sleep states",
          "Consider periodic sleep studies to validate your optimisation strategies",
          "Explore chronotype-specific timing for meals, exercise, and light exposure",
          "Implement heart rate variability monitoring for recovery optimisation"
        ]
      }
    } else if (percentage >= 70) {
      return {
        score: percentage,
        title: "Strong Sleep Foundation",
        description: "Great work! You have solid sleep habits and understand many important principles. With targeted improvements in a few key areas, you could reach sleep optimisation mastery and experience profound improvements in energy and recovery.",
        class: "score-good",
        recommendations: [
          "Establish a non-negotiable morning light exposure routine - 10 minutes within 30 minutes of waking",
          "Add magnesium glycinate supplementation (200-400mg) 1-2 hours before bed for nervous system calming",
          "Create a strict digital sunset - no screens 60-90 minutes before bedtime",
          "Optimise your sleep environment with blackout curtains, eye masks, and temperature control (16-20°C)",
          "Develop a consistent wind-down routine including breathing exercises or gentle stretching",
          "Consider investing in blue light blocking glasses for evening activities"
        ]
      }
    } else if (percentage >= 50) {
      return {
        score: percentage,
        title: "Sleep Improvement Opportunity",
        description: "You're on the right track but there's significant room for improvement. Focus on building consistent habits around core sleep fundamentals. Small changes in this area can create massive improvements in energy, mood, and overall health.",
        class: "score-fair",
        recommendations: [
          "Commit to a non-negotiable 7-8 hour sleep schedule - same bedtime and wake time daily",
          "Create a 30-minute wind-down routine starting with dimmed lights and relaxing activities",
          "Remove all electronic devices from your bedroom - use an analog alarm clock instead",
          "Start practicing diaphragmatic breathing - 4 counts in, 4 counts hold, 6 counts out",
          "Optimise your sleep environment: cool (16-18°C), dark, and quiet",
          "Get morning sunlight exposure within 10 minutes of waking to reset your circadian rhythm"
        ]
      }
    } else {
      return {
        score: percentage,
        title: "Sleep Transformation Needed",
        description: "Your sleep habits need immediate attention, but this represents your biggest opportunity for health transformation. Sleep is the foundation of everything - improving this one area will create cascading benefits across energy, mood, cognitive function, and overall wellbeing.",
        class: "score-poor",
        recommendations: [
          "Start with ONE habit: Set a consistent bedtime and stick to it for 7 days straight",
          "Get 10 minutes of natural sunlight exposure immediately upon waking - no sunglasses",
          "Create a completely screen-free bedroom - charge devices in another room",
          "Begin with simple 4-7-8 breathing: inhale 4, hold 7, exhale 8 (repeat 4 times)",
          "Make sleep your non-negotiable health priority - everything else depends on this foundation",
          "Track your sleep for one week to establish baseline patterns before making changes"
        ]
      }
    }
  }

  const currentQuestionData = questions[currentQuestion - 1]
  const progressPercentage = (currentQuestion / totalQuestions) * 100
  const currentAnswer = answers[`q${currentQuestion}`]
  const isAnswered = currentAnswer !== undefined
  const allAnswered = Object.keys(answers).length === totalQuestions

  // Show consent screen first
  if (showConsentScreen) {
    return (
      <>
        <Helmet>
          <title>Sleep Optimisation Assessment - BiohackMe</title>
          <meta name="description" content="Discover your sleep biohacking potential with Camilla Thompson's comprehensive sleep assessment." />
        </Helmet>

        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E9EFF2 0%, #5780AB 100%)' }}>
          <div className="max-w-2xl mx-auto px-4 pt-20 pb-16">
            <div className="bg-white/95 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#022D4E] mb-4">Before You Begin</h1>
                <p className="text-gray-600 leading-relaxed">
                  Please read and agree to the following before starting your Sleep Optimisation Assessment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-[#022D4E] mb-4">Consent</h4>

                <div className="space-y-4 text-sm text-gray-700">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 mr-3 w-5 h-5 text-[#5780AB] focus:ring-[#5780AB] rounded"
                    />
                    <span className="leading-relaxed">
                      I agree to the collection and use of my responses for the purpose of generating my personalised Biohacking Assessment results, in line with the{' '}
                      <a href="/privacy-policy" className="text-[#5780AB] underline hover:text-[#022D4E] font-medium" target="_blank" rel="noopener noreferrer">
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
                      className="mt-1 mr-3 w-5 h-5 text-[#5780AB] focus:ring-[#5780AB] rounded"
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
                    ? 'bg-[#5780AB] text-white hover:bg-[#022D4E] hover:shadow-xl'
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
          <title>Get Your Sleep Assessment Results - BiohackMe</title>
          <meta name="description" content="Enter your email to receive your personalised sleep optimisation results and recommendations." />
        </Helmet>

        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E9EFF2 0%, #5780AB 100%)' }}>
          <div className="max-w-md mx-auto px-4 pt-20 pb-16">
            <div className="bg-white/95 rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-[#5780AB] rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-[#022D4E] mb-4">Get Your Sleep Assessment Results</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enter your email to receive your personalised sleep optimisation score and my proven strategies to transform your sleep quality.
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5780AB] focus:border-transparent outline-none text-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5780AB] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#022D4E] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Subscribing...' : 'Get My Sleep Assessment Results'}
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                By entering your email, you'll receive your assessment results and occasional sleep optimisation tips.
                Your email is safe with us and you can unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (showResults) {
    const resultData = getResultData()

    return (
      <>
        <Helmet>
          <title>Sleep Assessment Results - BiohackMe</title>
          <meta name="description" content="Your personalised sleep optimisation assessment results with biohacking recommendations from Camilla Thompson." />
        </Helmet>

        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E9EFF2 0%, #5780AB 100%)' }}>
          <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
            <div className="bg-white/95 rounded-3xl p-8 shadow-xl text-center">
              <div className={`w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white ${resultData.class}`}>
                {resultData.score}%
              </div>

              <h1 className="text-3xl font-bold text-[#022D4E] mb-4">{resultData.title}</h1>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{resultData.description}</p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="text-xl font-semibold text-[#022D4E] mb-4">Your Personalized Sleep Biohacks:</h3>
                <ul className="space-y-3">
                  {resultData.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#5780AB] font-semibold mr-3">✓</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-ice border-2 border-ocean/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-ocean flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  <div className="text-sm text-charcoal">
                    <p className="font-semibold mb-2 text-ocean">Important Medical Disclaimer</p>
                    <p className="leading-relaxed">
                      This assessment is for educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment.
                      The recommendations provided are general wellness suggestions and should not replace professional medical advice.
                      Always consult with a qualified healthcare professional before making any changes to your health routine, diet, exercise program,
                      or if you have any medical conditions or concerns. If you are experiencing a medical emergency, please contact emergency services immediately.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#5780AB] to-[#022D4E] rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Master Your Sleep Like a Biohacker?</h3>
                <p className="text-lg mb-6 leading-relaxed">
                  Join my comprehensive Sleep Masterclass and learn my proven biohacks to transform your sleep quality, boost your energy, and enhance your overall wellbeing. Discover the exact strategies I use to make sleep my non-negotiable foundation for optimal health.
                </p>
                <a
                  href="/masterclass"
                  className="inline-block bg-white text-[#022D4E] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Join the Sleep Masterclass
                </a>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    localStorage.removeItem('sleep-assessment-results')
                    setShowResults(false)
                    setShowEmailCapture(false)
                    setCurrentQuestion(1)
                    setAnswers({})
                    setEmail('')
                    setEmailSubmitted(false)
                  }}
                  className="text-[#5780AB] border-2 border-[#5780AB] px-6 py-2 rounded-full font-medium text-sm hover:bg-[#5780AB] hover:text-white transition-all duration-300"
                >
                  Retake Assessment
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestion(1)
                    setAnswers({})
                  }}
                  className="text-[#5780AB] hover:text-[#022D4E] font-medium"
                >
                  Take Assessment Again
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
        <title>Sleep Optimisation Assessment - BiohackMe</title>
        <meta name="description" content="Discover your sleep biohacking potential with Camilla Thompson's comprehensive sleep assessment. Get personalised optimisation strategies." />
      </Helmet>

      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #E9EFF2 0%, #5780AB 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-8">
          {/* Header */}
          <div className="bg-white/95 rounded-3xl p-8 shadow-xl text-center mb-8">
            <div className="text-2xl font-bold text-[#022D4E] mb-2 tracking-wider">BIOHACKME</div>
            <div className="text-sm text-[#5780AB] font-medium mb-6">Supercharge Your Life, One Biohack at a Time</div>
            <h1 className="text-4xl font-bold text-[#022D4E] mb-4">Sleep Optimisation Assessment</h1>
            <p className="text-lg text-gray-600">Discover your sleep biohacking potential and get personalised optimisation strategies</p>
          </div>

          {/* Intro */}
          <div className="bg-white/95 rounded-xl p-6 shadow-lg mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Sleep is one of my non-negotiables.</strong> I aim for 8 hours a night to function optimally.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This assessment evaluates your current sleep patterns against the key biohacks from my book. You'll discover which of my proven sleep optimisation strategies could transform your energy, focus, and overall wellbeing. Sleep is the cornerstone of health, supporting recovery and regeneration.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/30 rounded-full mb-8">
            <div
              className="h-full bg-[#022D4E] rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white/95 rounded-xl p-8 shadow-lg mb-8">
            <div className="text-sm text-[#5780AB] font-semibold mb-3">
              Question {currentQuestion} of {totalQuestions}
            </div>
            <h2 className="text-2xl font-semibold text-[#022D4E] mb-6 leading-tight">
              {currentQuestionData.text}
            </h2>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, index) => (
                <label key={index} className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  currentAnswer === option.value
                    ? 'bg-[#5780AB] text-white border-[#022D4E]'
                    : 'bg-gray-50 border-gray-200 hover:border-[#5780AB] hover:bg-[#E9EFF2]'
                }`}>
                  <input
                    type="radio"
                    name={`q${currentQuestion}`}
                    value={option.value}
                    checked={currentAnswer === option.value}
                    onChange={() => handleAnswerSelect(option.value)}
                    className="sr-only"
                  />
                  <span className="text-base">{option.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 1}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                currentQuestion === 1
                  ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                  : 'bg-white text-[#5780AB] border-2 border-[#5780AB] hover:bg-[#5780AB] hover:text-white'
              }`}
            >
              Previous
            </button>

            {currentQuestion === totalQuestions ? (
              <button
                onClick={calculateResults}
                disabled={!allAnswered}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                  allAnswered
                    ? 'bg-[#5780AB] text-white hover:bg-[#022D4E] hover:-translate-y-1'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                Get My Sleep Assessment
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={!isAnswered}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                  isAnswered
                    ? 'bg-[#5780AB] text-white hover:bg-[#022D4E] hover:-translate-y-1'
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SleepAssessment