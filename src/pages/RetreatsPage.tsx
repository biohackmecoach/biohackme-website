import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, CheckCircle, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const testimonials = [
  {
    quote: "I attended the Live Well Longer Retreat at the beautiful Revivo Resort in Bali this year and am so thankful that I did, as I gained a deeper understanding of myself at a biological, functional and spiritual level. The educational lectures were inspiring and well planned and the pre-testing so valuable as Camilla and Azra guide you through understanding your own blueprint. I am so excited to put into practise some of the techniques and health hacks that I have learnt and highly recommend this outstanding retreat to all.",
    name: "Carol Vincent",
    detail: "Retreat Guest Sept 2025"
  },
  {
    quote: "The Live Well Longer Retreat exceeded all my expectations. I gained an enormous amount of knowledge and felt completely nurtured by the wonderful Camilla & Azra, as well as the beautiful Revivo Resort. It was a complete mind/body reset plus detailed planning and information to move forward with. Highly recommend.",
    name: "Amanda",
    detail: "Retreat Guest 2025"
  },
  {
    quote: "I wish every woman in my life had the opportunity to do one of these retreats with Camilla and Azra. It was a perfect blend of spirituality, science, relaxation and girl time! I can't recommend it highly enough.",
    name: "Rachel Comty",
    detail: "Retreat Guest"
  },
  {
    quote: "I'd recommend this retreat because it offered a transformative experience, with stunning surroundings, and a peaceful escape to recharge, reflect and reconnect with yourself. This was my first experience of being at a retreat and it has set the bar so high. Azra and Camilla have created something truly unique and special.",
    name: "Sally",
    detail: "Retreat Guest"
  },
  {
    quote: "The Live Well Longer retreat was an absolutely life changing experience for me! Camilla and Azra very eloquently balanced teachings around Biohacking, hormones, and all factors that impact a healthy long life with the most beautiful surroundings, facilities, food and spirituality of Revivo.",
    name: "Tamara Williams",
    detail: "Retreat Guest"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-ocean/10"
        >
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-ocean fill-ocean" />
            ))}
          </div>
          <p className="text-ocean text-base md:text-lg leading-relaxed mb-6 text-center italic">
            "{testimonials[currentIndex].quote}"
          </p>
          <div className="text-center">
            <div className="text-ocean font-semibold text-lg">{testimonials[currentIndex].name}</div>
            <div className="text-sky text-sm mt-1">{testimonials[currentIndex].detail}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prevTestimonial}
          className="p-3 rounded-full bg-ice hover:bg-ocean/10 text-ocean transition-all hover:scale-110"
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-ocean w-8' : 'bg-sky/30 hover:bg-sky/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="p-3 rounded-full bg-ice hover:bg-ocean/10 text-ocean transition-all hover:scale-110"
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const RetreatsPage = () => {
  return (
    <>
      <Helmet>
        <title>Women's Biohacking Retreat Bali 2026 | Live Well Longer | Award-Winning Wellness</title>
        <meta name="description" content="Join Australia's leading biohackers Camilla Thompson & Azra Alagic for an exclusive women-only longevity retreat at REVIVO Bali. May 1-6, 2026. Limited to 16 guests." />
        <meta name="keywords" content="women's biohacking retreat Bali, Live Well Longer Retreats, luxury wellness retreat 2026, REVIVO Bali, longevity retreat Australia" />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-gradient-to-b from-ice/30 via-white to-ice/20 font-montserrat">

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-4"
            >
              <img
                src="/Images retreat Revivo/logo-primary.png"
                alt="Live Well Longer Retreats"
                className="h-6 sm:h-8 md:h-9 max-w-[180px] sm:max-w-[225px] md:max-w-[270px] w-auto opacity-80"
                loading="eager"
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-xl sm:text-2xl text-sky mb-8 font-light">
                Reset. Recharge. Rewire your longevity.
              </h1>
            </motion.div>

            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl mx-auto space-y-4 text-base md:text-lg text-ocean/90 leading-relaxed mb-12"
            >
              <p>
                The award-winning Live Well Longer immersive retreats are designed to help you reset your biology,
                restore your balance, and reimagine what ageing well truly means.
              </p>
              <p>
                Set in world-class wellness destinations and led by Australia's leading biohackers{' '}
                <strong className="text-ocean">Azra Alagic</strong> and{' '}
                <strong className="text-ocean">Camilla Thompson</strong>, these retreats blend ancient wisdom with modern science.
              </p>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <a
                href="https://www.livewelllongerretreats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ocean hover:bg-ocean/90 text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Visit Website For More Info
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Transform Your Health */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16"
            >
              <h2 className="text-2xl md:text-3xl font-light text-ocean mb-10">Transform Your Health</h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    title: "Reignite Your Energy",
                    desc: "Discover science-backed strategies to boost vitality and maintain sustainable energy throughout your day.",
                    icon: (
                      <svg className="w-10 h-10 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )
                  },
                  {
                    title: "Reset Your Nervous System",
                    desc: "Learn powerful techniques to calm your stress response and restore balance to your body.",
                    icon: (
                      <svg className="w-10 h-10 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Reconnect to Your Body",
                    desc: "Tap into your body's innate wisdom through mindful movement and restorative rituals.",
                    icon: (
                      <svg className="w-10 h-10 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Optimise Your Hormones",
                    desc: "Restore hormonal and metabolic balance for lasting health and longevity.",
                    icon: (
                      <svg className="w-10 h-10 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-ice rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-ocean mb-3">{item.title}</h3>
                    <p className="text-sm text-ocean/80 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <p className="text-ocean/90 mt-12 text-base md:text-lg">
                Step away from the noise, reconnect with yourself, and discover what it truly means to Live Well Longer.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Meet Your Hosts */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ice/30 to-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light text-ocean mb-4">
                Meet Your Hosts
              </h2>
              <p className="text-lg text-sky">Australia's Leading Biohackers</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Camilla Thompson */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-6 overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="/Images retreat Revivo/camilla.webp"
                    alt="Camilla Thompson - Biohacker & Wellness Expert"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-ocean mb-2">Camilla Thompson</h3>
                <p className="text-sky mb-4">Biohacker & Wellness Expert</p>
                <p className="text-ocean/80 text-sm leading-relaxed">
                  Camilla is a leading Australian biohacker, health coach, and author passionate about
                  helping women optimise their health and longevity. With expertise in functional medicine,
                  nutrition, and cutting-edge biohacking techniques, she empowers her clients to take
                  control of their wellness journey.
                </p>
              </motion.div>

              {/* Azra Alagic */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mb-6 overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="/Images retreat Revivo/Azra-81.jpg"
                    alt="Azra Alagic - Longevity & Performance Coach"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-ocean mb-2">Azra Alagic</h3>
                <p className="text-sky mb-4">Longevity & Performance Coach</p>
                <p className="text-ocean/80 text-sm leading-relaxed">
                  Azra is a certified longevity and performance coach specializing in helping women
                  unlock their full potential through science-backed wellness strategies. Her holistic
                  approach combines ancient wisdom with modern biohacking to create transformative
                  experiences that optimize health, energy, and vitality.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Upcoming Retreat */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-light text-ocean mb-4">
                Upcoming Retreat - REVIVO Bali
              </h2>
              <p className="text-xl text-sky">5 Nights | May 1-6, 2026</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src="/Images retreat Revivo/DD Retreat.jpg"
                  alt="Winner - Best Group Retreat of the Year 2025"
                  className="w-full rounded-2xl shadow-xl"
                  loading="lazy"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4 text-ocean/90"
              >
                <p className="text-base leading-relaxed">
                  Fresh from winning <strong className="text-ocean">Best Group Retreat of the Year 2025</strong> at the Destination Deluxe Awards, the Live Well Longer Retreat returns to Bali for its next transformative women's-only experience.
                </p>
                <p className="text-base leading-relaxed">
                  Join Australia's leading biohackers, <strong className="text-ocean">Camilla Thompson</strong> and{' '}
                  <strong className="text-ocean">Azra Alagic</strong>, for an exclusive women's-only longevity retreat at the award-winning REVIVO Wellness Resort (16 guests only).
                </p>
                <p className="text-base leading-relaxed">
                  Immerse yourself in a personalised longevity retreat crafted to restore balance, boost vitality, and support a longer, healthier life. This retreat blends ancient therapies and wisdom with modern biohacking science.
                </p>
                <div className="bg-ice border border-ocean/20 rounded-xl p-6 mt-6">
                  <div className="text-sm text-sky mb-2">Investment</div>
                  <div className="text-3xl font-semibold text-ocean mb-1">From $5,500 AUD</div>
                  <div className="text-sm text-ocean/70">All inclusive (Flights and functional testing not included)</div>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://www.livewelllongerretreats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-ocean hover:bg-ocean/90 text-white px-6 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Visit Website For More Info
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ice/30 to-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-light text-ocean mb-4">
                What Our Guests Say
              </h2>
            </motion.div>

            <TestimonialSlider />
          </div>
        </section>

        {/* Retreat Highlights */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-light text-ocean mb-4">
                Retreat Highlights (Inclusive)
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                "Exclusive women-only retreat for just 16 guests",
                "Luxury 5-star accommodation",
                "Half board: Wholefood meals - breakfast & dinner",
                "Airport transfers to/from Ngurah Rai International Airport",
                "Full moon ceremony",
                "Conscious breathwork class",
                "Hack your hormones session",
                "One MOVEŌ class each day - Yin or Yang",
                "Daily biohacking workshops blending science with practical tools",
                "60-minute private coaching session with Azra (Value $300)",
                "1:1 consultation with Doctor from Cocoon Medical",
                "2 x spa treatments included",
                "Contrast therapy and access to gym"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-ice/50 rounded-lg p-4"
                >
                  <CheckCircle className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ocean">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-ocean to-sky">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                Ready to Transform Your Health?
              </h2>
              <p className="text-xl text-ice mb-10">
                Limited to 16 guests • May 1-6, 2026 • REVIVO Bali
              </p>
              <a
                href="https://www.livewelllongerretreats.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white hover:bg-ice text-ocean px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105"
              >
                Visit Website For More Info
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default RetreatsPage;
