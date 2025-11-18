import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, ArrowRight } from 'lucide-react';

interface MasterclassPreregisterProps {
  className?: string;
}

const MasterclassPreregister: React.FC<MasterclassPreregisterProps> = ({
  className = ""
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Call Firebase Function for Mailchimp masterclass subscription
      const response = await fetch('https://us-central1-biohackme-app-379de.cloudfunctions.net/subscribeToMasterclass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed! You\'ll be notified when new masterclasses launch.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }

    } catch (error) {
      console.error('Masterclass subscription error:', error);
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center ${className}`}
      >
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h4 className="text-xl font-montserrat font-light text-ocean mb-2">You're In!</h4>
        <p className="text-charcoal/70 text-sm">{message}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      <div className="text-center mb-6">
        <Bell className="w-8 h-8 text-ocean mx-auto mb-3" />
        <h4 className="text-xl font-montserrat font-light text-ocean mb-2">Stay Updated</h4>
        <p className="text-charcoal/70 text-sm">Get notified when new masterclasses launch and receive exclusive biohacking tips.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 text-sm border border-sky/30 rounded-full focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent bg-white"
          />
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-ocean to-sky text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50 text-sm whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            <ArrowRight className="ml-2 w-4 h-4" />
          </motion.button>
        </div>

        {status === 'error' && (
          <p className="text-red-500 text-xs text-center">{message}</p>
        )}

        <p className="text-xs text-charcoal/60 text-center">
          No spam, unsubscribe at any time.
        </p>
      </form>
    </motion.div>
  );
};

export default MasterclassPreregister;