'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';
import { THEME } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-brand-green">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(186,141,50,0.1) 35px, rgba(186,141,50,0.1) 36px)`,
        }} />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-300 to-brand-gold" />

      <div className="container-custom relative z-10 py-32 lg:py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
              Mumbai&apos;s Trusted Crane Partner — Serving All India
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Professional{' '}
            <span className="text-brand-gold">Crane Rental</span>{' '}
            &amp; Heavy Lifting Services
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed sm:text-xl"
          >
            Shivoham Crane Services delivers safe, reliable, and on-time crane solutions
            for construction, industrial, and infrastructure projects across India.
            Well-maintained fleet. Trained operators. 24/7 availability.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/contact#quote-form"
              className="btn-primary text-base px-8 py-4"
            >
              Request a Quote
              <ChevronRight size={18} />
            </Link>
            <Link
              href="/services"
              className="btn-secondary border-white/30 text-white hover:bg-white hover:text-brand-green text-base px-8 py-4"
            >
              View Services
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4"
            >
              WhatsApp Us
            </a>
          </motion.div>

          {/* Quick contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center gap-4 text-white/50 text-sm"
          >
            <a
              href={`tel:${THEME.contact.phone}`}
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Phone size={14} />
              {THEME.contact.phone}
            </a>
            <span className="h-4 w-px bg-white/20" />
            <span>Free site survey & quote</span>
          </motion.div>
        </div>
      </div>

      {/* Decorative crane silhouette */}
      <div className="absolute bottom-0 right-0 hidden lg:block opacity-10">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="240" y="100" width="20" height="400" fill="#ba8d32"/>
          <rect x="100" y="80" width="300" height="20" fill="#ba8d32"/>
          <rect x="100" y="80" width="10" height="100" fill="#ba8d32" transform="rotate(-15 100 80)"/>
          <polygon points="250,100 350,100 300,30" fill="#ba8d32"/>
          <rect x="340" y="100" width="5" height="200" fill="#ba8d32"/>
          <rect x="320" y="295" width="45" height="10" fill="#ba8d32"/>
          <rect x="330" y="300" width="25" height="40" fill="#ba8d32"/>
        </svg>
      </div>
    </section>
  );
}
