import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Gift, Mic, Users, GraduationCap, Mountain, CalendarHeart, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const offerings = [
  {
    title: 'My Book',
    description: 'Buy the book',
    to: '/my-book',
    icon: BookOpen,
  },
  {
    title: 'Free Guide',
    description: 'Download the guide',
    to: '/freebie',
    icon: Gift,
  },
  {
    title: 'Speaking & Talks',
    description: 'View talks & book Camilla',
    to: '/talks',
    icon: Mic,
  },
  {
    title: 'Coaching Programs',
    description: 'Explore coaching options',
    to: '/coaching-programs',
    icon: Users,
  },
  {
    title: 'Masterclass',
    description: 'Access the masterclass',
    to: '/masterclass',
    icon: GraduationCap,
  },
  {
    title: 'Retreats',
    description: 'View upcoming retreats',
    href: 'https://www.livewelllongerretreats.com/',
    icon: Mountain,
  },
]


export default function LinksPage() {
  return (
    <div className="min-h-screen bg-white font-montserrat">
      <Helmet>
        <title>Links | BiohackMe</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Quick links to all of Camilla's offerings — book, guide, coaching, masterclass, talks, and retreats." />
      </Helmet>

      <Header />

      <div className="max-w-3xl mx-auto px-4 py-12 pt-20 sm:pt-36 md:pt-40">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-ocean mt-4 md:mt-8 mb-3">
            Camilla Thompson
          </h1>
          <p className="text-lg text-ocean/70 mb-4">
            Biohacking expert, author & speaker — everything you need, in one place.
          </p>
          <div className="flex justify-center gap-3">
            {[
              { href: 'https://www.instagram.com/biohackmecoach/', icon: Instagram, label: 'Instagram' },
              { href: 'https://www.facebook.com/profile.php?id=61556971331791', icon: Facebook, label: 'Facebook' },
              { href: 'https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw', icon: Youtube, label: 'YouTube' },
              { href: 'https://www.linkedin.com/in/camillathompsonnutritionist/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://www.tiktok.com/@biohackmecoach', label: 'TikTok', svg: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.14z"/>
                </svg>
              )},
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-11 h-11 rounded-full bg-ocean/10 hover:bg-ocean hover:text-white text-ocean flex items-center justify-center transition-colors"
              >
                {social.svg || (social.icon && <social.icon className="w-5 h-5" />)}
              </a>
            ))}
          </div>
          <a
            href="https://calendly.com/thewellnesscoachsession/15min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center w-full max-w-md bg-ocean text-white px-6 py-3.5 rounded-full font-bold hover:bg-ocean/90 transition-colors shadow-lg text-sm sm:text-base"
          >
            <CalendarHeart className="mr-2 w-5 h-5" />
            BOOK A FREE HEALTH OPTIMISATION CALL
          </a>
        </motion.div>

        {/* Offering Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {offerings.map((item, index) => {
            const cardClass = "flex flex-col items-center text-center p-5 rounded-2xl border border-ocean/10 bg-gradient-to-b from-ice/50 to-cloud/50 shadow-sm hover:shadow-md hover:border-ocean/25 transition-all group h-full"
            const cardContent = (
              <>
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center mb-3 group-hover:bg-ocean/20 transition-colors">
                  <item.icon className="w-6 h-6 text-ocean" />
                </div>
                <h2 className="font-bold text-ocean text-sm sm:text-base mb-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-ocean/60">
                  {item.description}
                </p>
              </>
            )
            return (
              <motion.div
                key={item.to || item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              >
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {cardContent}
                  </a>
                ) : (
                  <Link to={item.to!} className={cardClass}>
                    {cardContent}
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>


      </div>

      <Footer />
    </div>
  )
}
