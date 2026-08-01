'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Map,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Globe,
  Send,
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../constants';

export const ContactAndNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const socialIconsMap = {
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    Twitter,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-12 border-b border-white/10 dark:border-white/10 border-black/10">
      {/* Contact Information Column */}
      <div className="lg:col-span-6 flex flex-col space-y-4">
        <h4 className="font-space text-xs uppercase tracking-widest font-semibold text-institutional-accent mb-2 whitespace-nowrap">
          Institutional Headquarters & Contact
        </h4>

        <div className="space-y-3 font-manrope text-xs text-gray-300 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-institutional-accent flex-shrink-0 mt-0.5" />
            <span>{CONTACT_INFO.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-institutional-accent flex-shrink-0" />
            <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-institutional-accent transition-colors">
              {CONTACT_INFO.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-institutional-accent flex-shrink-0" />
            <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-institutional-accent transition-colors">
              {CONTACT_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-institutional-accent flex-shrink-0" />
            <span>{CONTACT_INFO.officeHours}</span>
          </div>
        </div>

        {/* Google Maps Placeholder Badge */}
        <div className="pt-2">
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-space text-institutional-accent bg-institutional-accent/10 border border-institutional-accent/30 rounded-sm hover:bg-institutional-accent/20 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent whitespace-nowrap"
          >
            <Map className="w-3.5 h-3.5" />
            <span>View on Google Maps</span>
          </a>
        </div>
      </div>

      {/* Newsletter & Social Links Column */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-space text-xs uppercase tracking-widest font-semibold text-institutional-accent mb-2 whitespace-nowrap">
            Subscribe to Institutional Gazette
          </h4>
          <p className="font-manrope text-xs text-gray-400 mb-4">
            Receive official announcements, award archives, and quarterly impact publications directly to your inbox.
          </p>

          {subscribed ? (
            <div className="p-3 bg-institutional-accent/20 border border-institutional-accent/40 rounded-sm text-xs font-space text-institutional-accent">
              ✓ Thank you for subscribing to the Ruchi Prativa Foundation Gazette.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 dark:bg-white/5 border border-white/20 dark:border-white/20 px-3.5 py-2 text-xs text-white placeholder-gray-400 rounded-sm focus:outline-none focus:border-institutional-accent"
              />
              <button
                type="submit"
                className="h-9 px-5 text-xs uppercase tracking-widest font-space font-semibold text-institutional-dark bg-institutional-accent hover:bg-institutional-accentHover transition-colors duration-200 rounded-sm flex items-center justify-center gap-2 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-institutional-accent"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Social Links */}
        <div>
          <h5 className="font-space text-[11px] uppercase tracking-widest text-gray-400 mb-3 whitespace-nowrap">
            Connect With Our Foundation
          </h5>
          <div className="flex items-center space-x-3">
            {SOCIAL_LINKS.map((social) => {
              const IconComp = socialIconsMap[social.icon as keyof typeof socialIconsMap] || Globe;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-institutional-accent hover:border-institutional-accent transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-institutional-accent"
                >
                  <IconComp className="w-4 h-4 stroke-[1.5]" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
