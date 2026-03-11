import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { industriesData } from '@/data/siteData';
import { Icon } from '@/components/ui/Icon';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'Shivoham Crane Services caters to Construction, Oil & Gas, Power, Manufacturing, Steel, Ports, Telecom, and more across India.',
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        badge="Industries"
        title="Industries"
        titleHighlight="We Serve"
        description="Our crane and lifting solutions are trusted across all major industrial sectors in India. We understand the unique challenges of each industry and deliver tailored solutions."
        breadcrumbs={[{ label: 'Industries We Serve' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {industriesData.map((industry) => (
              <div key={industry.name} className="card-gold-glow group flex flex-col h-full text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/5 text-brand-green transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                  <Icon name={industry.icon} size={32} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-green group-hover:text-brand-gold transition-colors">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>

          {/* Pan-India context */}
          <div className="mt-16 rounded-2xl bg-brand-green p-8 sm:p-12 text-center">
            <h3 className="text-2xl font-heading font-bold text-white sm:text-3xl">
              Serving Industries <span className="text-brand-gold">Across India</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              With our Navi Mumbai headquarters and a network spanning the entire country, we mobilize cranes
              for projects from Gujarat to Tamil Nadu, Delhi to Karnataka — wherever your project takes you.
            </p>
            <div className="mt-8">
              <Link href="/contact#quote-form" className="btn-primary">
                Discuss Your Industry Needs
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
