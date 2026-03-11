import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { fleetData } from '@/data/siteData';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageTransition, TransitionChild } from '@/components/ui/PageTransition';
import { THEME } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return fleetData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const crane = fleetData.find((c) => c.slug === params.slug);
  if (!crane) return {};
  return {
    title: crane.name,
    description: crane.description,
  };
}

export default function FleetDetailPage({ params }: Props) {
  const crane = fleetData.find((c) => c.slug === params.slug);
  if (!crane) notFound();

  const otherCranes = fleetData.filter((c) => c.slug !== params.slug);

  return (
    <PageTransition>
      <TransitionChild>
      <PageHeader
        badge="Fleet Detail"
        title={crane.name}
        description={crane.description}
        breadcrumbs={[
          { label: 'Fleet & Equipment', href: '/fleet' },
          { label: crane.name },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl bg-gray-50 mb-8">
                <ImagePlaceholder
                  src={crane.image}
                  alt={crane.name}
                  fill
                  className="h-full w-full"
                  objectFit="contain"
                />
              </div>

              <h2 className="text-2xl font-heading font-bold text-brand-green">
                About This Crane
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{crane.description}</p>

              <h3 className="mt-10 text-xl font-heading font-bold text-brand-green">
                Specifications
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[
                  { label: 'Capacity', value: crane.capacity },
                  { label: 'Boom Length', value: crane.boomLength },
                  { label: 'Type', value: crane.type },
                ].map((spec) => (
                  <div key={spec.label} className="rounded-xl border border-gray-100 bg-brand-white p-5 text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{spec.label}</p>
                    <p className="mt-1 text-lg font-heading font-bold text-brand-green">{spec.value}</p>
                  </div>
                ))}
              </div>

              <h3 className="mt-10 text-xl font-heading font-bold text-brand-green">
                Key Highlights
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  'Regular third-party load testing',
                  'Certified and licensed operators included',
                  'Available for short-term & long-term hire',
                  'Pan-India mobilization within 24–48 hours',
                  'Comprehensive insurance coverage',
                  'Well-maintained, safety-inspected equipment',
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-2xl bg-brand-green p-8">
                <h3 className="text-xl font-heading font-bold text-white">
                  Need the {crane.name}?
                </h3>
                <p className="mt-2 text-white/60 text-sm">
                  Get a free quote for your project. Our team will assess requirements and provide the right solution.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact#quote-form" className="btn-primary">
                    Request Quote <ChevronRight size={16} />
                  </Link>
                  <a
                    href={getWhatsAppUrl(`Hi, I am interested in the ${crane.name} for my project. Please share details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    WhatsApp
                  </a>
                  <a href={`tel:${THEME.contact.phone}`} className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                    <Phone size={16} /> Call
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                {/* Other cranes */}
                <div className="rounded-2xl border border-gray-100 bg-brand-white p-6">
                  <h3 className="text-lg font-heading font-bold text-brand-green mb-4">
                    Other Cranes
                  </h3>
                  <div className="space-y-2">
                    {otherCranes.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/fleet/${c.slug}`}
                        className="flex items-center gap-3 rounded-lg p-3 text-sm text-gray-700 transition-all hover:bg-white hover:shadow-sm hover:text-brand-gold"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/5 text-brand-green text-xs font-bold">
                          {c.capacity.replace(' Ton', 'T')}
                        </span>
                        <span className="flex-1">{c.name}</span>
                        <ChevronRight size={14} className="text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick contact card */}
                <div className="rounded-2xl bg-brand-gold p-6 text-brand-green">
                  <h3 className="text-lg font-heading font-bold">
                    Quick Enquiry
                  </h3>
                  <p className="mt-2 text-sm text-brand-green/80">
                    Call us directly or WhatsApp for an instant quote.
                  </p>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${THEME.contact.phone}`}
                      className="flex items-center gap-2 rounded-lg bg-brand-green px-4 py-3 text-sm font-semibold text-brand-gold transition-all hover:bg-brand-green-800"
                    >
                      <Phone size={16} />
                      {THEME.contact.phone}
                    </a>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full justify-center"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      </TransitionChild>
    </PageTransition>
  );
}
