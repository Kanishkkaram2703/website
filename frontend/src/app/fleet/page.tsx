import type { Metadata } from 'next';
import Link from 'next/link';
import { fleetData } from '@/data/siteData';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Fleet & Equipment',
  description: 'Explore our modern fleet of mobile cranes, hydra cranes, and specialized lifting equipment. Capacities from 10T to 250T+, all regularly inspected and certified.',
};

export default function FleetPage() {
  return (
    <>
      <PageHeader
        badge="Our Fleet"
        title="Modern, Certified"
        titleHighlight="Crane Fleet"
        description="Our well-maintained fleet of cranes is the backbone of our service. Every crane is regularly inspected, load-tested, and certified to meet the highest safety standards."
        breadcrumbs={[{ label: 'Fleet & Equipment' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {fleetData.map((item) => (
              <Link key={item.name} href={`/fleet/${item.slug}`} className="card-gold-glow group overflow-hidden p-0">
                <div className="relative h-56 w-full overflow-hidden bg-gray-50">
                  <ImagePlaceholder
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    objectFit="contain"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-lg bg-brand-gold px-3 py-1 text-xs font-bold text-brand-green">
                      {item.capacity}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-brand-green group-hover:text-brand-gold transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Capacity</span>
                      <span className="font-semibold text-brand-green">{item.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Boom Length</span>
                      <span className="font-semibold text-brand-green">{item.boomLength}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Type</span>
                      <span className="font-semibold text-brand-green">{item.type}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Fleet summary */}
          <div className="mt-16 rounded-2xl bg-brand-green p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {[
                { value: '100+', label: 'Total Cranes' },
                { value: '10T – 250T+', label: 'Capacity Range' },
                { value: 'Monthly', label: 'Inspections' },
                { value: '3rd Party', label: 'Certified' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-heading font-extrabold text-brand-gold lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
