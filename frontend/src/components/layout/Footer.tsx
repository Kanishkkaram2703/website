import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowUpRight, ChevronRight } from 'lucide-react';
import { NAV_LINKS, THEME, SERVICES } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white">
      {/* CTA strip */}
      <div className="bg-brand-gold">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div>
            <h3 className="text-xl font-heading font-bold text-brand-green">
              Ready to lift your project?
            </h3>
            <p className="text-sm text-brand-green/80">
              Get a free quote within 2 hours. Pan-India service available.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/contact#quote-form" className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-brand-gold transition-all hover:bg-brand-green-800">
              Request Quote
              <ChevronRight size={16} />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative flex items-center justify-center h-14 w-14 rounded-lg border border-brand-gold/30" style={{ backgroundColor: 'rgba(20,47,42,0.5)' }}>
                <Image
                  src="/images/logo.png"
                  alt="Shivoham Crane Services"
                  width={56}
                  height={72}
                  className="object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%', padding: '2px' }}
                />
              </div>
              <div>
                <span className="block text-lg font-heading font-bold leading-tight uppercase" style={{ color: '#ba8d32' }}>
                  SHIVOHAM
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  CRANE SERVICES
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              {THEME.company.description}
            </p>
            <div className="space-y-3">
              <a href={`tel:${THEME.contact.phone}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-brand-gold transition-colors">
                <Phone size={16} className="text-brand-gold" />
                {THEME.contact.phone}
              </a>
              <a href={`mailto:${THEME.contact.email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-brand-gold transition-colors">
                <Mail size={16} className="text-brand-gold" />
                {THEME.contact.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 text-brand-gold shrink-0" />
                <span>{THEME.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-6 text-sm font-heading font-semibold uppercase tracking-wider text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-brand-gold"
                  >
                    <ChevronRight size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-sm font-heading font-semibold uppercase tracking-wider text-brand-gold">
              Our Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href={`/services/${service.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`}
                    className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-brand-gold"
                  >
                    <ChevronRight size={12} />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h4 className="mb-6 text-sm font-heading font-semibold uppercase tracking-wider text-brand-gold">
              Working Hours
            </h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Monday – Saturday</span>
                <span className="text-white">8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">On-call only</span>
              </div>
              <div className="flex justify-between">
                <span>Emergency</span>
                <span className="text-brand-gold font-semibold">24/7 Available</span>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-heading font-semibold uppercase tracking-wider text-brand-gold">
                Service Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Navi Mumbai', 'Pune', 'Delhi', 'Gujarat', 'Karnataka', 'Pan-India'].map((city) => (
                  <span
                    key={city}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {currentYear} {THEME.company.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/50">
            <Link href="/safety" className="hover:text-brand-gold transition-colors">
              Safety Policy
            </Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-brand-gold transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
