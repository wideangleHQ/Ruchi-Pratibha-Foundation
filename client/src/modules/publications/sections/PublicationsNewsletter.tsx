'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';

export const PublicationsNewsletter: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section
      id="pub-newsletter"
      className="py-24 sm:py-32 bg-institutional-dark text-white border-b border-white/10 overflow-hidden scroll-mt-24 sm:scroll-mt-28 relative"
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-space text-institutional-accent font-semibold">
              Editorial Subscriptions
            </span>
            <span className="h-[1px] w-8 bg-institutional-accent/60" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-cormorant text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight"
          >
            Stay Connected with New Publications
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-manrope text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed mb-8 sm:mb-10"
          >
            Receive notifications when new issues of <em>Amaruchi</em>, <em>Prativayana</em>, annual governance reports, or special commemorative volumes are digitised and released.
          </motion.p>

          {/* Subscription Form */}
          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded bg-white/10 border border-institutional-accent/40 text-center max-w-md w-full"
            >
              <CheckCircle2 className="w-8 h-8 text-institutional-accent mx-auto mb-2" />
              <h4 className="font-cormorant text-xl font-bold text-white mb-1">
                Subscribed Successfully
              </h4>
              <p className="font-manrope text-xs text-gray-300">
                You will receive editorial notifications regarding new publications and digital library additions.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-3 max-w-md w-full"
            >
              <div className="relative w-full">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/15 rounded-sm text-xs font-manrope text-white placeholder-gray-400 focus:outline-none focus:border-institutional-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 text-xs font-space uppercase tracking-widest bg-institutional-accent text-institutional-dark font-semibold rounded-sm hover:bg-institutional-accentHover transition-colors shrink-0 min-h-[44px]"
              >
                Subscribe
              </button>
            </motion.form>
          )}

          <span className="text-[10px] font-space text-gray-500 mt-6">
            PRIVACY ASSURED • ZERO SPAM • OFFICIAL FOUNDATION DISPATCH
          </span>
        </div>
      </div>
    </section>
  );
};
