'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';
import { NAV_LINKS, THEME } from '@/lib/constants';
import { getWhatsAppUrl, cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setShrunk(y > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-brand-green/95 backdrop-blur-md shadow-xl'
          : 'bg-brand-green'
      )}
    >
      {/* Top bar — hides on shrink */}
      <div
        className={cn(
          'hidden border-b border-white/10 lg:block transition-all duration-500 overflow-hidden',
          shrunk ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        )}
      >
        <div className="container-custom flex items-center justify-between py-2 text-xs text-white/70">
          <div className="flex items-center gap-6">
            <a href={`tel:${THEME.contact.phone}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Phone size={12} />
              {THEME.contact.phone}
            </a>
            <a href={`mailto:${THEME.contact.email}`} className="hover:text-brand-gold transition-colors">
              {THEME.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Navi Mumbai | Pan-India Service</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded bg-[#25D366] px-3 py-1 text-xs font-semibold text-white hover:bg-[#20BA5A] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-custom">
        <nav className={cn(
          'flex items-center justify-between transition-all duration-500',
          shrunk ? 'py-1.5 lg:py-1' : 'py-3 lg:py-2'
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
            <div className={cn(
              'relative flex items-center justify-center rounded-lg border border-brand-gold/30 transition-all duration-500',
              shrunk ? 'h-10 w-10' : 'h-14 w-14'
            )} style={{ backgroundColor: 'rgba(20,47,42,0.5)' }}>
              <Image
                src="/images/logo.png"
                alt="Shivoham Crane Services"
                width={56}
                height={72}
                className="object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%', padding: '2px' }}
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg font-heading font-bold leading-tight uppercase" style={{ color: '#ba8d32' }}>
                SHIVOHAM
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                CRANE SERVICES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  pathname === link.href
                    ? 'text-brand-gold bg-white/10'
                    : 'text-white/80 hover:text-brand-gold hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact#quote-form"
              className="btn-primary text-xs px-5 py-2.5"
            >
              Get Quote
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-brand-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-brand-green-800 border-t border-white/10"
          >
            <div className="container-custom py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'text-brand-gold bg-white/10'
                      : 'text-white/80 hover:text-brand-gold hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/contact#quote-form" className="btn-primary text-center">
                  Request a Quote
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-center"
                >
                  WhatsApp Us
                </a>
                <a href={`tel:${THEME.contact.phone}`} className="btn-secondary text-center border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
