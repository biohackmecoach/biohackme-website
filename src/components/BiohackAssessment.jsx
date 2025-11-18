import React, { useState, useEffect } from 'react';

const BiohackAssessment = () => {
  const [scores, setScores] = useState({});
  const [totalRated, setTotalRated] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConsentScreen, setShowConsentScreen] = useState(true);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const pillars = [
    {
      name: "Sleep",
      icon: "M4 18h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2zM4 8h16v8H4V8zm2 2v4h2v-4H6zm4 0v4h4v-4h-4zm6 0v4h2v-4h-2z", // Realistic bed with pillows
      description: "Your body's nightly restoration system - the foundation that determines every other pillar's performance."
    },
    {
      name: "Body",
      icon: "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.67-.2 3.73-.74 1.66-2.23 2.72-4.01 2.72z", // Flame/strength icon
      description: "Your physical vessel - strength, mobility, and vitality that carries you through every moment of life."
    },
    {
      name: "Energy",
      icon: "M7 2v11h3v9l7-12h-4l4-8z", // Lightning bolt
      description: "Sustained vitality and mental clarity - the fuel that powers your peak performance all day long."
    },
    {
      name: "Health",
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", // Heart
      description: "Your biological optimisation - biomarkers, inflammation, and the cellular health that determines longevity."
    },
    {
      name: "Mood",
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", // Happy smiley face
      description: "Your emotional resilience and mental clarity - the inner state that colours every experience."
    },
    {
      name: "Environment",
      icon: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z", // House
      description: "Your surroundings - air quality, lighting, and toxin exposure that silently shape your health daily."
    },
    {
      name: "Relationships",
      icon: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 6c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm8 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm-8 6c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm16 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z", // Two people
      description: "Your social connections - the quality relationships that research shows are the #1 predictor of longevity."
    },
    {
      name: "Brain",
      icon: "M9 1C6.24 1 4 3.24 4 6c0 1.54.81 3.09 2.42 4.56C7.67 12 8.83 13.2 10 14.39c.58.59 1.23 1.18 1.93 1.79.35.31.72.63 1.07.96.35-.33.72-.65 1.07-.96.7-.61 1.35-1.2 1.93-1.79 1.17-1.19 2.33-2.39 3.58-3.83C21.19 9.09 22 7.54 22 6c0-2.76-2.24-5-5-5-1.54 0-2.93.7-3.89 1.8C12.15 1.7 10.76 1 9 1z", // Brain icon
      description: "Your cognitive command center - focus, memory, and mental performance that drives every decision."
    }
  ];

  const recommendations = {
    'Sleep': {
      title: 'Sleep Optimisation Priority',
      recommendation: 'Start with the "9:30 PM Challenge" - be in bed by 9:30, no screens 30 minutes before, and try 10 minutes of reading followed by belly breathing.',
      hack: 'Morning sunlight for 10 minutes within the first hour of waking to reset your circadian rhythm.'
    },
    'Body': {
      title: 'Body Strength Focus',
      recommendation: 'Begin with "Movement Snacks" - 2 minutes of bodyweight exercises every hour. Start with squats, push-ups (modified if needed), and stretches.',
      hack: 'Add a 10-minute walk after meals to improve digestion and blood sugar control.'
    },
    'Energy': {
      title: 'Energy Restoration Protocol',
      recommendation: 'Try the "Hydration Plus" method - start your day with Celtic sea salt in water, eat protein within 2 hours of waking, and avoid energy crashes with balanced meals.',
      hack: 'Power nap limit: 20 minutes between 1-3 PM if needed, but prioritize nighttime sleep quality first.'
    },
    'Health': {
      title: 'Health Foundation Building',
      recommendation: 'Focus on the "Inflammation Reset" - eliminate one processed food daily, add one anti-inflammatory food (like turmeric, berries, or leafy greens).',
      hack: 'Consider getting basic biomarkers tested: Complete Blood Count, Comprehensive Metabolic Panel, and Vitamin D levels.'
    },
    'Mood': {
      title: 'Mood Optimisation Strategy',
      recommendation: 'Implement "Mindset Momentum" - 5 minutes of gratitude journaling each morning and 5 minutes of deep breathing when stress hits.',
      hack: 'Try the "Dopamine Detox" - reduce social media by 30 minutes daily and replace with nature exposure or physical activity.'
    },
    'Environment': {
      title: 'Environmental Upgrade Plan',
      recommendation: 'Start with "Air & Light Optimisation" - open windows daily for fresh air, get morning sunlight, and minimise blue light 2 hours before bed.',
      hack: 'Add one air-purifying plant to your bedroom and workspace. Snake plants or pothos are beginner-friendly.'
    },
    'Relationships': {
      title: 'Connection Enhancement',
      recommendation: 'Practice "Conscious Connection" - one meaningful conversation daily, put devices away during meals, and schedule regular check-ins with loved ones.',
      hack: 'Join a community aligned with your health goals - fitness class, hiking group, or online wellness community.'
    },
    'Brain': {
      title: 'Cognitive Performance Boost',
      recommendation: 'Try "Brain Training Basics" - learn something new for 10 minutes daily, practice meditation or deep work sessions, and prioritize single-tasking.',
      hack: 'Omega-3 optimisation: Add fatty fish twice weekly or consider a high-quality fish oil supplement after consulting your healthcare provider.'
    }
  };

  const setRating = (pillar, score) => {
    const newScores = { ...scores };
    if (!newScores[pillar]) {
      setTotalRated(prev => prev + 1);
    }
    newScores[pillar] = score;
    setScores(newScores);
  };

  const calculateResults = () => {
    if (totalRated < pillars.length) {
      alert('Please rate all 8 areas to get your complete assessment!');
      return;
    }
    setShowResults(true);
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behaviour: 'smooth' });
    }, 300);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleConsentSubmit = () => {
    if (!privacyConsent) {
      alert('Please agree to the privacy policy to start the assessment');
      return;
    }
    setShowConsentScreen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();

    // Here you would integrate with your CRM/email service
    // Example integrations:
    // - ConvertKit API
    // - Mailchimp API
    // - Zapier webhook
    // - Your backend API

    console.log('Lead captured:', { ...formData, scores });

    // For demo purposes
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const getAverageScore = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(totalScore / pillars.length * 10) / 10;
  };

  const getLowestScores = () => {
    return Object.entries(scores)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 3);
  };

  const progress = (totalRated / pillars.length) * 100;

  // Show consent screen first
  if (showConsentScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ocean via-sky to-ice font-montserrat relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 mt-20">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-light text-ocean mb-4">Before You Begin</h1>
              <p className="text-charcoal/80 leading-relaxed">
                Please read and agree to the following before starting your Biohacking Assessment.
              </p>
            </div>

            <div className="bg-ice/50 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-ocean mb-4">Consent</h4>

              <div className="space-y-4 text-sm text-charcoal/80">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-1 mr-3 w-5 h-5 text-ocean focus:ring-ocean rounded"
                  />
                  <span className="leading-relaxed">
                    I agree to the collection and use of my responses for the purpose of generating my personalised Biohacking Assessment results, in line with the{' '}
                    <a href="/privacy-policy" className="text-ocean underline hover:text-sky font-medium" target="_blank" rel="noopener noreferrer">
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
                    className="mt-1 mr-3 w-5 h-5 text-ocean focus:ring-ocean rounded"
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
                  ? 'bg-gradient-to-r from-ocean to-sky text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Start Assessment
            </button>

            {!privacyConsent && (
              <p className="text-sm text-charcoal/60 text-center mt-4">
                Please agree to the privacy policy to begin the assessment
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean via-sky to-ice font-montserrat relative overflow-hidden">

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 pt-28 md:pt-32 lg:pt-36">
            <h1 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-wider">
              BIOHACKME
            </h1>
            <p className="text-xl text-white/90 mb-6">Your Personal Health Assessment & Biohacking Blueprint</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-white/30">
              <p className="text-white font-medium text-lg leading-relaxed">
                ✦ <strong>Discover your unique health baseline in 2 minutes</strong> ✦<br/>
                Get personalised recommendations based on BiohackMe's proven 8-pillar framework
              </p>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-white/80 text-base">
                  <strong>Unlock Your Personal Health Code</strong> - From exhausted to energized, scattered to focused, surviving to thriving. 
                  This isn't just an assessment - it's your roadmap to becoming the strongest, sharpest, most vibrant version of yourself.
                </p>
              </div>
            </div>
          </div>

          {/* Assessment Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50">
            <h2 className="text-3xl font-light text-ocean mb-4 text-center">Rate Your Current Health Status</h2>
            <p className="text-charcoal/80 text-center mb-8 max-w-2xl mx-auto">
              Be honest about where you are right now. This baseline will help identify which biohacks will give you the biggest impact.
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-ice rounded-full h-3 mb-12">
              <div 
                className="bg-gradient-to-r from-ocean to-sky h-3 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Pillars Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {pillars.map((pillar, index) => (
                <div key={pillar.name} className="bg-gradient-to-br from-ice to-cloud rounded-2xl p-6 border border-sky/20 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                  <div className="text-center mb-4 flex-grow">
                    <svg className="w-12 h-12 mx-auto text-ocean mb-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d={pillar.icon}/>
                    </svg>
                    <h3 className="text-xl font-medium text-ocean mb-2">{pillar.name}</h3>
                    <p className="text-sm text-charcoal/70 leading-relaxed">{pillar.description}</p>
                  </div>
                  
                  {/* Modern Slider Rating */}
                  <div className="mt-auto">
                    <div className="relative mb-4">
                      {/* Custom Slider Track */}
                      <div className="relative h-4 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={scores[pillar.name] || 1}
                          onChange={(e) => setRating(pillar.name, parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {/* Custom Thumb - Diamond Shape */}
                        <div 
                          className="absolute top-1/2 w-5 h-5 bg-gradient-to-br from-ocean to-sky shadow-lg border-2 border-white pointer-events-none transition-all duration-200 transform rotate-45"
                          style={{ 
                            left: `${((scores[pillar.name] || 1) - 1) * (100 / 9)}%`,
                            transform: 'translateX(-50%) translateY(-50%) rotate(45deg)'
                          }}
                        ></div>
                        {/* Progress Fill */}
                        <div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-ocean to-sky rounded-full transition-all duration-200"
                          style={{ width: `${((scores[pillar.name] || 1) - 1) * (100 / 9)}%` }}
                        ></div>
                      </div>
                      
                      {/* Labels */}
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-charcoal/60">Flat Battery</span>
                        <span className="text-xs text-charcoal/60">Biohacker Boss</span>
                      </div>
                      
                      {/* Number Scale Below */}
                      <div className="flex justify-between mt-2 px-0.5">
                        {Array.from({length: 10}, (_, i) => (
                          <div 
                            key={i + 1} 
                            className="flex-1 text-center"
                          >
                            <span 
                              className={`text-xs transition-all duration-200 ${
                                scores[pillar.name] === (i + 1) 
                                  ? 'text-ocean font-bold text-sm' 
                                  : 'text-charcoal/40'
                              }`}
                            >
                              {i + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            <div className="text-center">
              <button 
                className={`px-12 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                  totalRated === pillars.length 
                    ? 'bg-gradient-to-r from-ocean to-sky text-white hover:shadow-2xl hover:scale-105 transform' 
                    : 'bg-charcoal/20 text-charcoal/60 cursor-not-allowed'
                }`}
                onClick={calculateResults}
              >
                {totalRated === pillars.length ? '◇ Calculate My Results' : `Rate ${pillars.length - totalRated} more areas to continue`}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="mt-16 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50" id="results-section">
              <h2 className="text-4xl font-light text-ocean mb-8 text-center">Your BiohackMe Assessment Results</h2>
              
              {/* Overall Score */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-ocean to-sky rounded-full text-white mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{getAverageScore()}</div>
                    <div className="text-sm">Overall Score</div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-12">
                <h3 className="text-2xl font-light text-ocean mb-8 text-center">◯ Your Top Priority Areas & Anchor Actions</h3>
                
                <div className="space-y-6">
                  {getLowestScores().map(([pillar, rating], index) => {
                    const rec = recommendations[pillar];
                    return (
                      <div key={pillar} className="bg-gradient-to-r from-ice to-cloud rounded-2xl p-6 border border-sky/20">
                        <h4 className="text-xl font-medium text-ocean mb-3">
                          {index + 1}. {rec.title} (Current: {rating}/10)
                        </h4>
                        <p className="text-charcoal/80 mb-3">
                          <strong>◯ Anchor Action:</strong> {rec.recommendation}
                        </p>
                        <p className="text-charcoal/80">
                          <strong>◇ Biohack:</strong> {rec.hack}
                        </p>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-sky/20 to-ocean/20 rounded-2xl p-6 border border-ocean/30">
                  <h4 className="text-lg font-medium text-ocean mb-3">◈ The Biohacking Stack Effect</h4>
                  <p className="text-charcoal/80">Focus on your #1 priority area first. Once that habit is anchored (typically 2-4 weeks), add the next. This creates a compound effect where each improvement amplifies the others!</p>
                </div>
              </div>

              {/* Lead Capture */}
              <div className="bg-gradient-to-r from-ocean to-sky rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-light mb-4">Ready to Transform Your Health?</h3>
                <p className="mb-8 opacity-90">
                  Get your personalised biohacking action plan based on your results. Plus, receive Camilla's exclusive "Anchor & Amplify" methodology to make lasting changes stick.
                </p>
                
                {!showSuccess ? (
                  <form className="max-w-md mx-auto space-y-4" onSubmit={submitForm}>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-3 rounded-full bg-white text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Your First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-full bg-white text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Your Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-4 py-3 rounded-full bg-white text-charcoal placeholder-charcoal/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder="Your Phone (Optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <button type="submit" className="w-full bg-white text-ocean px-8 py-3 rounded-full font-medium hover:bg-ice transition-colors">
                      Send My Custom Blueprint
                    </button>
                  </form>
                ) : (
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                    <h4 className="text-xl font-medium mb-2">◯ Success! Your Blueprint is on its way!</h4>
                    <p className="opacity-90">Check your email in the next 5 minutes for your personalised biohacking action plan.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiohackAssessment;