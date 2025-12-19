import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

const BrainAssessmentPage: React.FC = () => {
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
    const savedResults = localStorage.getItem('brain-assessment-results')
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
          localStorage.removeItem('brain-assessment-results')
        }
      } catch (error) {
        localStorage.removeItem('brain-assessment-results')
      }
    }
  }, [])

  const questions = [
    {
      id: 1,
      text: "How often do you forget where you placed everyday items (keys, phone, glasses)?",
      options: [
        { text: "Never - I always remember where I put things", value: 5 },
        { text: "Rarely - maybe once a month", value: 4 },
        { text: "Sometimes - a few times per week", value: 3 },
        { text: "Often - almost daily", value: 2 },
        { text: "Very frequently - multiple times a day", value: 1 }
      ]
    },
    {
      id: 2,
      text: "How would you rate your ability to concentrate on tasks without getting distracted?",
      options: [
        { text: "Excellent - I can focus deeply for extended periods", value: 5 },
        { text: "Good - I usually maintain focus well", value: 4 },
        { text: "Fair - I get distracted but can refocus", value: 3 },
        { text: "Poor - I struggle to maintain focus", value: 2 },
        { text: "Very poor - I'm constantly distracted", value: 1 }
      ]
    },
    {
      id: 3,
      text: "Do you struggle to remember names of people you've recently met?",
      options: [
        { text: "Never - I always remember names easily", value: 5 },
        { text: "Rarely - I usually recall names", value: 4 },
        { text: "Sometimes - about half the time", value: 3 },
        { text: "Often - I frequently forget names", value: 2 },
        { text: "Always - I rarely remember new names", value: 1 }
      ]
    },
    {
      id: 4,
      text: "How often do you walk into a room and forget why you went there?",
      options: [
        { text: "Never - I always remember my purpose", value: 5 },
        { text: "Rarely - maybe once a month", value: 4 },
        { text: "Sometimes - a few times per week", value: 3 },
        { text: "Often - multiple times per week", value: 2 },
        { text: "Very frequently - almost daily", value: 1 }
      ]
    },
    {
      id: 5,
      text: "Can you easily recall what you did or ate yesterday without effort?",
      options: [
        { text: "Yes, easily - I remember details clearly", value: 5 },
        { text: "Mostly - I can recall most things", value: 4 },
        { text: "Somewhat - I remember some things", value: 3 },
        { text: "Barely - I struggle to remember", value: 2 },
        { text: "No - I can't recall much at all", value: 1 }
      ]
    },
    {
      id: 6,
      text: "How would you rate your mental clarity and sharpness throughout the day?",
      options: [
        { text: "Excellent - Sharp and clear all day", value: 5 },
        { text: "Good - Usually clear with occasional dips", value: 4 },
        { text: "Fair - Some clear periods, some foggy", value: 3 },
        { text: "Poor - Often feel mentally foggy", value: 2 },
        { text: "Very poor - Constant brain fog", value: 1 }
      ]
    },
    {
      id: 7,
      text: "Do you experience \"brain fog\" or difficulty thinking clearly?",
      options: [
        { text: "Never - My thinking is always clear", value: 5 },
        { text: "Rarely - Only when very tired or stressed", value: 4 },
        { text: "Sometimes - A few times per week", value: 3 },
        { text: "Often - Most days I experience this", value: 2 },
        { text: "Constantly - It's a daily struggle", value: 1 }
      ]
    },
    {
      id: 8,
      text: "How easily can you learn and remember new information or skills?",
      options: [
        { text: "Very easily - I pick things up quickly", value: 5 },
        { text: "Fairly easily - I learn at a good pace", value: 4 },
        { text: "Moderately - It takes some effort", value: 3 },
        { text: "With difficulty - Learning is challenging", value: 2 },
        { text: "Very difficult - I struggle to retain new information", value: 1 }
      ]
    },
    {
      id: 9,
      text: "Do you find it harder to multitask or switch between tasks compared to before?",
      options: [
        { text: "No - I multitask as well as ever", value: 5 },
        { text: "Slightly - Minimal change", value: 4 },
        { text: "Somewhat - I notice some difficulty", value: 3 },
        { text: "Significantly - It's much harder now", value: 2 },
        { text: "Extremely - I can barely multitask anymore", value: 1 }
      ]
    },
    {
      id: 10,
      text: "How often do you struggle to find the right words during conversations?",
      options: [
        { text: "Never - Words come easily", value: 5 },
        { text: "Rarely - Occasional tip-of-tongue moments", value: 4 },
        { text: "Sometimes - A few times per week", value: 3 },
        { text: "Often - Multiple times daily", value: 2 },
        { text: "Constantly - It's a persistent problem", value: 1 }
      ]
    },
    {
      id: 11,
      text: "Can you easily recall details from books, movies, or conversations?",
      options: [
        { text: "Yes - I remember details very well", value: 5 },
        { text: "Mostly - I recall the main points well", value: 4 },
        { text: "Somewhat - I remember general themes", value: 3 },
        { text: "Barely - Details fade quickly", value: 2 },
        { text: "No - I forget almost everything", value: 1 }
      ]
    },
    {
      id: 12,
      text: "How would you rate your ability to make decisions quickly and confidently?",
      options: [
        { text: "Excellent - I decide quickly and confidently", value: 5 },
        { text: "Good - I usually make decisions well", value: 4 },
        { text: "Fair - I sometimes struggle with decisions", value: 3 },
        { text: "Poor - Decision-making is difficult", value: 2 },
        { text: "Very poor - I'm often paralyzed by decisions", value: 1 }
      ]
    },
    {
      id: 13,
      text: "Do you stay properly hydrated throughout the day (at least 2 litres of water)?",
      options: [
        { text: "Yes - I consistently drink 2+ litres daily", value: 5 },
        { text: "Usually - Most days I hydrate well", value: 4 },
        { text: "Sometimes - I often forget to drink enough", value: 3 },
        { text: "Rarely - I'm often dehydrated", value: 2 },
        { text: "No - I barely drink water", value: 1 }
      ]
    },
    {
      id: 14,
      text: "How much alcohol do you consume per week?",
      options: [
        { text: "None - I don't drink alcohol", value: 5 },
        { text: "1-2 drinks per week", value: 4 },
        { text: "3-7 drinks per week", value: 3 },
        { text: "8-14 drinks per week", value: 2 },
        { text: "More than 14 drinks per week", value: 1 }
      ]
    },
    {
      id: 15,
      text: "Overall, how concerned are you about your memory and cognitive function?",
      options: [
        { text: "Not concerned - My cognition is excellent", value: 5 },
        { text: "Slightly concerned - Minor occasional issues", value: 4 },
        { text: "Moderately concerned - Noticeable changes", value: 3 },
        { text: "Very concerned - Significant problems", value: 2 },
        { text: "Extremely concerned - Major cognitive decline", value: 1 }
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

    try {
      // Get assessment results data
      const resultData = getResultData()
      const topRecommendations = resultData.recommendations.slice(0, 3).join('; ')

      // Call Firebase Function to trigger email automation
      const response = await fetch('https://us-central1-biohackme-app-379de.cloudfunctions.net/completeAssessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: '',
          lastName: '',
          assessmentScore: resultData.score,
          lowestScoringPillar: 'Brain Health',
          topRecommendations: topRecommendations
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store results in localStorage for persistence
        const assessmentResults = {
          answers,
          email,
          timestamp: Date.now(),
          type: 'brain-assessment'
        }
        localStorage.setItem('brain-assessment-results', JSON.stringify(assessmentResults))

        setEmailSubmitted(true)
        setShowEmailCapture(false)
        setShowResults(true)
      } else {
        alert('Failed to submit assessment. Please try again.')
      }
    } catch (error) {
      console.error('Assessment submission error:', error)
      alert('Failed to submit assessment. Please try again.')
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
        title: "Brain Optimisation Champion",
        description: "Outstanding! You're implementing most of the brain-optimising strategies from my book and maintaining excellent cognitive health habits.",
        colour: "score-excellent",
        recommendations: [
          "Continue your excellent brain health practices - you're a true biohacking champion",
          "Consider becoming a mentor to others starting their brain optimisation journey",
          "Fine-tune any remaining areas where you scored lower",
          "Stay updated with the latest brain optimisation research and techniques",
          "Monitor your progress and adjust strategies based on how you feel and perform"
        ]
      }
    } else if (percentage >= 70) {
      return {
        score: percentage,
        title: "Strong Brain Foundation",
        description: "Well done! You have a solid foundation in brain optimisation practices. There are some key areas where you can enhance your cognitive performance.",
        colour: "score-good",
        recommendations: [
          "Focus on the specific areas where you scored lowest in this assessment",
          "Implement 2-3 new brain-healthy habits from my book over the next month",
          "Pay special attention to sleep quality and stress management techniques",
          "Add more brain-challenging activities to your daily routine",
          "Consider working with a coach to accelerate your progress"
        ]
      }
    } else if (percentage >= 50) {
      return {
        score: percentage,
        title: "Brain Optimisation Opportunity",
        description: "You have room for significant improvement in your brain health practices. The good news is that small changes can make a big difference!",
        colour: "score-fair",
        recommendations: [
          "Start with the fundamentals: quality sleep, proper hydration with Celtic sea salt, and regular exercise",
          "Introduce brain-healthy foods like wild salmon, eggs, walnuts, and blueberries into your daily diet",
          "Begin a simple stress management practice like deep breathing or grounding techniques",
          "Eliminate or significantly reduce processed foods and sugar from your diet",
          "Consider a comprehensive approach with my coaching programme for personalised guidance"
        ]
      }
    } else {
      return {
        score: percentage,
        title: "Brain Transformation Needed",
        description: "Your brain health practices need significant attention, but this is actually exciting - you have enormous potential for improvement!",
        colour: "score-poor",
        recommendations: [
          "Start immediately with basic hydration - add Celtic sea salt to your water daily",
          "Prioritise 7-9 hours of quality sleep as your foundation",
          "Begin with 10 minutes of daily movement and gradually increase",
          "Eliminate processed foods and focus on whole, anti-inflammatory foods",
          "I strongly recommend working together through my coaching programme for comprehensive support and accountability"
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
          <title>Brain Optimisation Assessment | BiohackMe Australia</title>
          <meta name="description" content="Discover your cognitive biohacking potential and unlock peak mental performance with this comprehensive brain health assessment." />
        </Helmet>

        <div style={{
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #E8F4FD 0%, #4A90E2 100%)',
          minHeight: '100vh',
          color: '#161616'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px 20px 20px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#1E3A8A',
                marginBottom: '20px'
              }}>
                Before You Begin
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#161616',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                Please read and agree to the following before starting your Brain Optimisation Assessment.
              </p>

              <div style={{
                background: '#F8FAFC',
                padding: '25px',
                borderRadius: '15px',
                marginBottom: '25px',
                textAlign: 'left'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1E3A8A',
                  marginBottom: '15px'
                }}>
                  Consent
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '14px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      style={{ marginTop: '4px', marginRight: '12px', width: '18px', height: '18px' }}
                    />
                    <span style={{ lineHeight: '1.6' }}>
                      I agree to the collection and use of my responses for the purpose of generating my personalised Biohacking Assessment results, in line with the{' '}
                      <a href="/privacy-policy" style={{ color: '#4A90E2', textDecoration: 'underline', fontWeight: 500 }} target="_blank" rel="noopener noreferrer">
                        BioHackMe Privacy Policy
                      </a>
                      . I understand this information is for educational purposes only and does not constitute medical advice.
                    </span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      style={{ marginTop: '4px', marginRight: '12px', width: '18px', height: '18px' }}
                    />
                    <span style={{ lineHeight: '1.6' }}>
                      I'd like to receive occasional updates, resources, and offers from BioHackMe.
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleConsentSubmit}
                disabled={!privacyConsent}
                style={{
                  width: '100%',
                  background: privacyConsent ? '#4A90E2' : '#ccc',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '18px',
                  fontWeight: 600,
                  cursor: privacyConsent ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (privacyConsent) {
                    e.currentTarget.style.background = '#1E3A8A'
                  }
                }}
                onMouseLeave={(e) => {
                  if (privacyConsent) {
                    e.currentTarget.style.background = '#4A90E2'
                  }
                }}
              >
                Start Assessment
              </button>

              {!privacyConsent && (
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginTop: '15px'
                }}>
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
          <title>Brain Optimisation Assessment Results | BiohackMe Australia</title>
          <meta name="description" content="Get your personalised brain optimisation results and proven strategies from Camilla's book to enhance focus, memory, and mental clarity." />
        </Helmet>

        <div style={{
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #E8F4FD 0%, #4A90E2 100%)',
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
                color: '#1E3A8A',
                marginBottom: '10px',
                letterSpacing: '2px'
              }}>
                BIOHACKME
              </div>
              <div style={{
                fontSize: '16px',
                color: '#4A90E2',
                fontWeight: 500
              }}>
                Supercharge Your Life, One Biohack at a Time
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#1E3A8A',
                margin: '20px 0 10px'
              }}>
                Brain Optimisation Assessment
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#161616',
                opacity: 0.8,
                marginBottom: '30px'
              }}>
                Discover your cognitive biohacking potential and unlock peak mental performance
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
                color: '#1E3A8A',
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
                Enter your email to receive your personalised brain optimisation score and my proven strategies to enhance your focus, memory, and mental clarity.
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
                    border: '2px solid #E8F4FD',
                    borderRadius: '12px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
                  onBlur={(e) => e.target.style.borderColor = '#E8F4FD'}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? '#ccc' : '#4A90E2',
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
                      e.target.style.background = '#1E3A8A'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.background = '#4A90E2'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                >
                  {isSubmitting ? 'Subscribing...' : 'Get My Brain Assessment Results'}
                </button>
              </form>

              <p style={{
                fontSize: '14px',
                color: '#666',
                marginTop: '15px',
                lineHeight: '1.5'
              }}>
                By entering your email, you'll receive your assessment results and occasional brain optimisation tips.
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
          <title>Your Brain Optimisation Results | BiohackMe Australia</title>
          <meta name="description" content="Your personalised brain optimisation assessment results with recommendations to enhance cognitive performance." />
        </Helmet>

        <div style={{
          fontFamily: "'Inter', sans-serif",
          background: 'linear-gradient(135deg, #E8F4FD 0%, #4A90E2 100%)',
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
                color: '#1E3A8A',
                marginBottom: '10px',
                letterSpacing: '2px'
              }}>
                BIOHACKME
              </div>
              <div style={{
                fontSize: '16px',
                color: '#4A90E2',
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
                color: '#1E3A8A',
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
                background: '#F8FAFC',
                padding: '25px',
                borderRadius: '15px',
                margin: '20px 0',
                textAlign: 'left'
              }}>
                <h3 style={{
                  color: '#1E3A8A',
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
                        color: '#4A90E2',
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
                background: 'linear-gradient(135deg, #4A90E2, #1E3A8A)',
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
                  Ready to Optimise Your Brain?
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  Take your cognitive performance to the next level with my comprehensive coaching programme,
                  where you'll get personalised strategies and accountability to transform your brain health.
                </p>
                <a
                  href="/superchargeyourlife"
                  style={{
                    background: 'white',
                    color: '#1E3A8A',
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
                  Explore My Coaching Programme
                </a>
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <button
                  onClick={() => {
                    localStorage.removeItem('brain-assessment-results')
                    setAnswers({})
                    setEmail('')
                    setEmailSubmitted(false)
                    setShowResults(false)
                    setShowEmailCapture(false)
                    setCurrentQuestion(1)
                  }}
                  style={{
                    background: 'transparent',
                    color: '#4A90E2',
                    border: '2px solid #4A90E2',
                    padding: '12px 30px',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#4A90E2'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#4A90E2'
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
        <title>Brain Optimisation Assessment | BiohackMe Australia</title>
        <meta name="description" content="Discover your cognitive biohacking potential and unlock peak mental performance with this comprehensive brain health assessment." />
        <meta name="keywords" content="brain assessment, cognitive health, brain optimization, mental performance, biohacking assessment" />
        <meta property="og:title" content="Brain Optimisation Assessment | BiohackMe Australia" />
        <meta property="og:description" content="Test your brain health and get personalized recommendations for peak cognitive performance." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://biohackme.com.au/brain-assessment" />
      </Helmet>

      <div style={{
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #E8F4FD 0%, #4A90E2 100%)',
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
              color: '#1E3A8A',
              marginBottom: '10px',
              letterSpacing: '2px'
            }}>
              BIOHACKME
            </div>
            <div style={{
              fontSize: '16px',
              color: '#4A90E2',
              fontWeight: 500
            }}>
              Supercharge Your Life, One Biohack at a Time
            </div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#1E3A8A',
              margin: '20px 0 10px'
            }}>
              Brain Optimisation Assessment
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#161616',
              opacity: 0.8,
              marginBottom: '30px'
            }}>
              Discover your cognitive biohacking potential and unlock peak mental performance
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
            <p><strong>Your brain is your most valuable asset.</strong> Optimising brain health is crucial for cognitive function, creativity and overall mental wellbeing.</p>
            <p>This assessment evaluates your current brain health practices against the key biohacks from my book. You'll discover which of my proven strategies could enhance your focus, memory, and mental clarity while supporting long-term cognitive health and neuroplasticity.</p>
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
              background: '#1E3A8A',
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
              color: '#4A90E2',
              fontWeight: 600,
              fontSize: '14px',
              marginBottom: '10px'
            }}>
              Question {currentQuestion} of {totalQuestions}
            </div>

            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#1E3A8A',
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
                    background: currentAnswer === option.value ? '#4A90E2' : '#F8FAFC',
                    border: `2px solid ${currentAnswer === option.value ? '#1E3A8A' : '#E8F4FD'}`,
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
                      e.target.style.borderColor = '#4A90E2'
                      e.target.style.background = '#E8F4FD'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentAnswer !== option.value) {
                      e.target.style.borderColor = '#E8F4FD'
                      e.target.style.background = '#F8FAFC'
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
                color: '#4A90E2',
                border: '2px solid #4A90E2',
                padding: '12px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: currentQuestion === 1 ? 'none' : 'block'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#4A90E2'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#4A90E2'
              }}
            >
              Previous
            </button>

            <button
              onClick={nextQuestion}
              disabled={!currentAnswer}
              style={{
                background: currentAnswer ? '#4A90E2' : '#ccc',
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
                  e.target.style.background = '#1E3A8A'
                  e.target.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentAnswer) {
                  e.target.style.background = '#4A90E2'
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

export default BrainAssessmentPage