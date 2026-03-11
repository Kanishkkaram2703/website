import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { FAQSection } from '@/components/shared/FAQSection';
import { faqData } from '@/data/siteData';
import { THEME } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Contact Us & Request Quote',
  description: 'Request a free quote for crane rental and lifting services. Contact Shivoham Crane Services at our Navi Mumbai office or reach us via WhatsApp, phone, or email.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Contact Us"
        title="Get in Touch &"
        titleHighlight="Request a Quote"
        description="Fill out the form below and our team will get back to you within 2 hours with a customized quote for your project."
        breadcrumbs={[{ label: 'Contact / Request Quote' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2" id="quote-form">
              <h2 className="text-2xl font-heading font-bold text-brand-green">
                Request a Quote
              </h2>
              <p className="mt-2 text-gray-600 text-sm">
                Tell us about your project and we will prepare a detailed quote. Fields marked with * are required.
              </p>
              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>

            {/* Contact info sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Contact details */}
                <div className="rounded-2xl bg-brand-green p-6 text-white">
                  <h3 className="text-lg font-heading font-bold text-brand-gold">
                    Contact Information
                  </h3>
                  <div className="mt-6 space-y-5">
                    <a href={`tel:${THEME.contact.phone}`} className="flex items-start gap-4 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold">
                        <Phone size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider">Phone</p>
                        <p className="text-sm font-semibold group-hover:text-brand-gold transition-colors">
                          {THEME.contact.phone}
                        </p>
                      </div>
                    </a>
                    <a href={`mailto:${THEME.contact.email}`} className="flex items-start gap-4 group">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider">Email</p>
                        <p className="text-sm font-semibold group-hover:text-brand-gold transition-colors">
                          {THEME.contact.email}
                        </p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider">Office</p>
                        <p className="text-sm font-semibold">{THEME.contact.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider">Hours</p>
                        <p className="text-sm font-semibold">Mon–Sat: 8AM – 8PM</p>
                        <p className="text-xs text-white/60">Emergency: 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp card */}
                <div className="rounded-2xl bg-[#25D366] p-6 text-white">
                  <h3 className="text-lg font-bold">WhatsApp Us</h3>
                  <p className="mt-2 text-sm text-white/90">
                    Prefer WhatsApp? Send us a message and get an instant response from our team.
                  </p>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#25D366] transition-all hover:bg-white/90"
                  >
                    Open WhatsApp Chat
                  </a>
                </div>

                {/* Map placeholder */}
                <div className="rounded-2xl overflow-hidden border border-gray-100">
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <MapPin size={32} className="mx-auto mb-2" />
                      <p className="text-sm">Navi Mumbai, Maharashtra</p>
                      <a
                        href={THEME.contact.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-gold hover:underline mt-1 inline-block"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqData} title="Frequently Asked Questions" />
    </>
  );
}
