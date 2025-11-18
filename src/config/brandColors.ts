// BiohackMe Brand Colors Configuration
// Based on Brand Guidelines PDF

export const brandColors = {
  // Primary Brand Colors
  ocean: '#022D4E',     // Primary dark blue - RGB: 2 45 78
  sky: '#5780AB',       // Medium blue - RGB: 87 128 171  
  ice: '#E9EFF2',       // Light blue/white - RGB: 233 239 242
  cloud: '#F3F5F6',     // Off-white - RGB: 243 245 246
  charcoal: '#161616',  // Dark text - RGB: 22 22 22

  // Extended palette for UI
  primary: '#022D4E',   // Ocean - primary brand color
  secondary: '#5780AB', // Sky - secondary brand color
  accent: '#E9EFF2',    // Ice - accent color
  background: '#F3F5F6', // Cloud - background color
  text: '#161616',      // Charcoal - text color
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B', 
  error: '#EF4444',
  info: '#3B82F6',

  // Gradients
  oceanGradient: 'linear-gradient(135deg, #022D4E 0%, #5780AB 100%)',
  skyGradient: 'linear-gradient(135deg, #5780AB 0%, #E9EFF2 100%)',
  iceGradient: 'linear-gradient(135deg, #E9EFF2 0%, #F3F5F6 100%)',
}

// Brand typography scale
export const brandFonts = {
  primary: 'Montserrat, sans-serif',
  secondary: 'Montserrat, Inter, sans-serif',
  script: 'JWC Marker, cursive',
  sans: 'Montserrat, Inter, system-ui, -apple-system, sans-serif',
}

export default brandColors;