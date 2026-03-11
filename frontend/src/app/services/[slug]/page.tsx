import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { servicesData } from '@/data/siteData';
import { Icon } from '@/components/ui/Icon';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageTransition, TransitionChild } from '@/components/ui/PageTransition';
import { THEME } from '@/lib/constants';
import { getWhatsAppUrl } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const otherServices = servicesData.filter((s) => s.slug !== params.slug);

  return (
    <PageTransition>
      <TransitionChild>
      <PageHeader
        badge="Service Detail"
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.title },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl mb-8">
                <ImagePlaceholder
                  src={service.image}
                  alt={service.title}
                  fill
                  className="h-full w-full"
                  objectFit="contain"
                />
              </div>

              <h2 className="text-2xl font-heading font-bold text-brand-green">
                About This Service
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">{service.description}</p>

              <h3 className="mt-10 text-xl font-heading font-bold text-brand-green">
                Key Features
              </h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 rounded-2xl bg-brand-green p-8">
                <h3 className="text-xl font-heading font-bold text-white">
                  Need {service.title}?
                </h3>
                <p className="mt-2 text-white/60 text-sm">
                  Get a free quote for your project. Our team will assess requirements and provide the right solution.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact#quote-form" className="btn-primary">
                    Request Quote <ChevronRight size={16} />
                  </Link>
                  <a
                    href={getWhatsAppUrl(`Hi, I need ${service.title} for my project. Please share details.`)}
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
                {/* Other services */}
                <div className="rounded-2xl border border-gray-100 bg-brand-white p-6">
                  <h3 className="text-lg font-heading font-bold text-brand-green mb-4">
                    Other Services
                  </h3>
                  <div className="space-y-2">
                    {otherServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex items-center gap-3 rounded-lg p-3 text-sm text-gray-700 transition-all hover:bg-white hover:shadow-sm hover:text-brand-gold"
                      >
                        <Icon name={s.icon} size={18} className="text-brand-green" />
                        <span className="flex-1">{s.title}</span>
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
