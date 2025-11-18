import { Link } from 'react-router-dom'
import { Heart, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ocean text-white font-montserrat">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 pb-safe">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Brand & About */}
          <div className="lg:col-span-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo-white.png"
                alt="BiohackMe"
                className="h-8 w-auto"
              />
            </Link>

            {/* Social Links */}
            <div className="flex space-x-3 sm:space-x-4 justify-center lg:justify-start">
              <a 
                href="https://www.instagram.com/biohackmecoach/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-ice transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61556971331791" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-ice transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/channel/UCMpV7HCXEyIOxuUgK0U5blw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-ice transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@biohackmecoach" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-ice transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04.57z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-ice/80 hover:text-white transition-colors duration-300">
                  About Camilla
                </Link>
              </li>
              <li>
                <Link to="/my-book" className="text-ice/80 hover:text-white transition-colors duration-300">
                  My Book
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Media
                </Link>
              </li>
              <li>
                <Link to="/talks" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Speaking
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-3 text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/optimise-your-life" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Optimise Your Life
                </Link>
              </li>
              <li>
                <Link to="/coaching-sessions" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Executive Coaching
                </Link>
              </li>
              <li>
                <Link to="/dna-package" className="text-ice/80 hover:text-white transition-colors duration-300">
                  DNA Testing
                </Link>
              </li>
              <li>
                <Link to="/masterclass" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Masterclasses
                </Link>
              </li>
              <li>
                <Link to="/consultancy" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Consultancy
                </Link>
              </li>
              <li>
                <Link to="/retreats" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Retreats
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/freebie" className="text-ice/80 hover:text-white transition-colors duration-300">
                  Free Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-3 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 justify-center lg:justify-start">
                <Mail className="w-5 h-5 text-ice mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:hello@biohackme.com.au"
                    className="text-ice/80 hover:text-white transition-colors duration-300 break-all sm:whitespace-nowrap"
                  >
                    hello@biohackme.com.au
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 justify-center lg:justify-start">
                <MapPin className="w-5 h-5 text-ice mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-ice/80">
                    Sydney, Australia
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-center lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 bg-sky hover:bg-sky/80 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <span>Contact Me</span>
                  <Heart className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 py-4 pb-8 sm:pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-ice/60 text-sm">
              © {currentYear} BiohackMe. All rights reserved. Built with 💙 by Camilla Thompson.
            </p>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy-policy"
                className="text-ice/60 hover:text-white text-sm transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-ice/60 hover:text-white text-sm transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}