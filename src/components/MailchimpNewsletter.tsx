import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface MailchimpNewsletterProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const MailchimpNewsletter: React.FC<MailchimpNewsletterProps> = ({
  title = "Get Exclusive Biohacking Tips",
  subtitle = "Join thousands of high performers optimizing their health",
  placeholder = "Enter your email address",
  buttonText = "Get Free Tips",
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Call Firebase Function for Mailchimp subscription
      const response = await fetch('https://us-central1-biohackme-app-379de.cloudfunctions.net/subscribeToNewsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: 'Subscriber',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-r from-ice to-cloud p-8 rounded-2xl text-center border border-ocean/10 ${className}`}
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-montserrat font-light text-ocean mb-2">You're In!</h3>
        <p className="text-charcoal/70">{message}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-gradient-to-r from-ice to-cloud p-8 rounded-2xl border border-ocean/10 ${className}`}
    >
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 text-ocean mx-auto mb-4" />
        <h3 className="text-2xl font-montserrat font-light text-ocean mb-2">{title}</h3>
        <p className="text-charcoal/70">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder={placeholder}
            required
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
            className="flex-1 px-4 py-3 border border-ocean/20 rounded-full focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent text-base bg-white"
            style={{ fontSize: '16px' }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-ocean to-sky text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : buttonText}
          <ArrowRight className="ml-2 w-4 h-4" />
        </motion.button>
      </form>

      {status === 'error' && (
        <p className="text-red-500 text-sm mt-4 text-center">{message}</p>
      )}

      <p className="text-xs text-charcoal/60 mt-4 text-center">
        No spam, unsubscribe at any time. See our <a href="/privacy" className="text-ocean hover:underline">privacy policy</a>.
      </p>
    </motion.div>
  );
};

export default MailchimpNewsletter;