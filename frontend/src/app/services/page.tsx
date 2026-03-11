import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { servicesData } from '@/data/siteData';
import { faqData } from '@/data/siteData';
import { Icon } from '@/components/ui/Icon';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/home/CTABanner';
import { FAQSection } from '@/components/shared/FAQSection';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our full range of crane rental and lifting services: Mobile Crane Rental, Hydra Crane, Heavy Lifting, Machinery Shifting, Industrial Lifting, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        badge="Our Services"
        title="Comprehensive Crane &"
        titleHighlight="Lifting Solutions"
        description="From standard crane rentals to complex heavy lifting operations, we provide end-to-end lifting services tailored to your project needs."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            {servicesData.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card-gold-glow group flex gap-5 p-5 md:p-6"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                  <Icon name={service.icon} size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-heading font-bold text-brand-green group-hover:text-brand-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-brand-gold">
                    Learn More <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqData.slice(0, 5)} title="Common Questions About Our Services" />
      <CTABanner />
    </>
  );
}
