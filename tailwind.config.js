/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'Inter Variable', 'system-ui', '-apple-system', 'sans-serif'],
        'serif': ['Montserrat', 'Playfair Display', 'serif'],
        'script': ['JWC Marker', 'cursive'],
        'montserrat': ['Montserrat', 'Inter Variable', 'sans-serif'],
        'brooklyn': ['Brooklyn', 'Montserrat', 'Inter Variable', 'sans-serif'],
      },
      colors: {
        // BiohackMe Brand Colors
        ocean: '#022D4E',     // Primary dark blue
        sky: '#5780AB',       // Medium blue  
        ice: '#E9EFF2',       // Light blue/white
        cloud: '#F3F5F6',     // Off-white
        charcoal: '#161616',  // Dark text
        
        // Semantic mappings
        primary: '#022D4E',   // Ocean
        secondary: '#5780AB', // Sky
        accent: '#E9EFF2',    // Ice
        background: '#F3F5F6', // Cloud
        text: '#161616',      // Charcoal
        
        // UI colors
        success: '#10B981',
        warning: '#F59E0B', 
        error: '#EF4444',
        info: '#3B82F6',
      },
      screens: {
        'xs': '360px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}