'use client';

import Link from 'next/link';
import { ChevronRight, Phone } from 'lucide-react';
import { THEME } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-brand-green py-16 lg:py-20">
      {/* Gold accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Need a Crane for Your Next Project?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Get a free, no-obligation quote within 2 hours. Our team will assess your requirements
            and recommend the right crane solution.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact#quote-form" className="btn-primary text-base px-8 py-4">
              Request a Quote
              <ChevronRight size={18} />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-4"
            >
              WhatsApp Us
            </a>
            <a
              href={`tel:${THEME.contact.phone}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-brand-green"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
