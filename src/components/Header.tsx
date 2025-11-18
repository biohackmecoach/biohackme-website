import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-ocean shadow-lg font-montserrat">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Mobile Layout: Social Icons + Logo + Menu Button */}
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Left side - Compact Social Icons */}
          <div className="flex space-x-0.5 sm:space-x-1 -ml-1">
            <a href="https://www.instagram.com/biohackmecoach/" target="_blank" rel="noopener noreferrer" aria-label="Follow BiohackMe on Instagram" className="text-white hover:text-ice p-1">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61556971331791" target="_blank" rel="noopener noreferrer" aria-label="Visit BiohackMe on Facebook" className="text-white hover:text-ice p-1">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to BiohackMe on YouTube" className="text-white hover:text-ice p-1 sm:block">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@biohackmecoach" target="_blank" rel="noopener noreferrer" aria-label="Follow BiohackMe on TikTok" className="text-white hover:text-ice p-1 sm:block">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.10-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.40-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>

          {/* Center - Smaller Logo */}
          <Link to="/" className="flex-1 flex justify-center">
            <img
              src="/logo-white.png"
              alt="BiohackMe"
              className="h-8 sm:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-white hover:text-ice font-medium">About</Link>

            <div className="relative group">
              <button className="text-white hover:text-ice font-medium flex items-center">
                Coaching
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-ocean border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 space-y-3">
                  <Link to="/optimise-your-life" className="block text-white hover:text-ice font-medium">Optimise Your Life</Link>
                  <Link to="/coaching-sessions" className="block text-white hover:text-ice font-medium">1:1 Coaching Sessions</Link>
                  <Link to="/dna-package" className="block text-white hover:text-ice font-medium">DNA Package</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-ice font-medium flex items-center">
                Services
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-48 bg-ocean border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 space-y-3">
                  <Link to="/talks" className="block text-white hover:text-ice font-medium">Talks</Link>
                  <Link to="/masterclass" className="block text-white hover:text-ice font-medium">Masterclass</Link>
                  <Link to="/consultancy" className="block text-white hover:text-ice font-medium">Consultancy</Link>
                  <Link to="/retreats" className="block text-white hover:text-ice font-medium">Retreats</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white hover:text-ice font-medium flex items-center">
                Resources
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-48 bg-ocean border border-white/20 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 space-y-3">
                  <Link to="/my-book" className="block text-white hover:text-ice font-medium">My Book</Link>
                  <Link to="/media" className="block text-white hover:text-ice font-medium">Media</Link>
                  <Link to="/blog" className="block text-white hover:text-ice font-medium">Blog</Link>
                </div>
              </div>
            </div>

            <Link to="/shop" className="text-white hover:text-ice font-medium">Shop</Link>
            <Link to="/contact" className="text-white hover:text-ice font-medium">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 touch-manipulation"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Organized to Match Desktop Structure */}
        {isMenuOpen && (
          <div className="md:hidden bg-ocean border-t border-white/20 py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {/* Top Level Menu Items - Matching Desktop */}
              <Link to="/about" className="text-white hover:text-ice py-3 px-4 min-h-[44px] flex items-center font-medium">About</Link>

              {/* Coaching Section */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="text-ice/70 text-sm font-medium py-2 px-4">COACHING</div>
                <Link to="/optimise-your-life" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Optimise Your Life</Link>
                <Link to="/coaching-sessions" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">1:1 Coaching Sessions</Link>
                <Link to="/dna-package" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">DNA Package</Link>
              </div>

              {/* Services Section */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="text-ice/70 text-sm font-medium py-2 px-4">SERVICES</div>
                <Link to="/talks" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Talks</Link>
                <Link to="/masterclass" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Masterclass</Link>
                <Link to="/consultancy" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Consultancy</Link>
                <Link to="/retreats" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Retreats</Link>
              </div>

              {/* Resources Section */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="text-ice/70 text-sm font-medium py-2 px-4">RESOURCES</div>
                <Link to="/my-book" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">My Book</Link>
                <Link to="/media" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Media</Link>
                <Link to="/blog" className="text-white hover:text-ice py-3 px-6 min-h-[44px] flex items-center">Blog</Link>
              </div>

              {/* Direct Links - Matching Desktop */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <Link to="/shop" className="text-white hover:text-ice py-3 px-4 min-h-[44px] flex items-center font-medium">Shop</Link>
                <Link to="/contact" className="text-white hover:text-ice py-3 px-4 min-h-[44px] flex items-center font-medium">Contact</Link>
              </div>

              {/* Assessments & Free Guide */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <Link to="/brain-assessment" className="text-white hover:text-ice py-3 px-4 min-h-[44px] flex items-center">Brain Assessment</Link>
                <Link to="/biohack-assessment" className="text-white hover:text-ice py-3 px-4 min-h-[44px] flex items-center">Health Assessment</Link>
                <Link to="/freebie" className="text-white hover:text-ice font-medium py-3 px-4 min-h-[44px] flex items-center bg-white/10 rounded-lg mx-2">FREE GUIDE</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}