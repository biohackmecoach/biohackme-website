// src/config/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
);

// Stripe configuration
export const stripeConfig = {
  // Coaching program subscription
  coachingPriceId: import.meta.env.VITE_STRIPE_COACHING_PRICE_ID,
  
  // Masterclass one-time payment
  masterclassPriceId: import.meta.env.VITE_STRIPE_MASTERCLASS_PRICE_ID,
  
  // Book purchase (handled externally via Amazon, but tracked)
  bookPriceId: import.meta.env.VITE_STRIPE_BOOK_PRICE_ID,
  
  // Currency
  currency: 'aud',
  
  // Success and cancel URLs
  successUrl: `${window.location.origin}/payment-success`,
  cancelUrl: `${window.location.origin}/payment-cancelled`
};

// Stripe payment intent configuration
export const paymentIntentConfig = {
  payment_method_types: ['card'],
  currency: stripeConfig.currency,
  setup_future_usage: 'on_session'
};

// Helper function to format price for display
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD'
  }).format(amount / 100); // Stripe amounts are in cents
};