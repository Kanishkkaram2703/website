'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { fleetData } from '@/data/siteData';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

export function FleetPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
                Our Fleet
              </span>
              <h2 className="section-title mt-2">
                Modern, <span className="text-brand-gold">Well-Maintained</span> Equipment
              </h2>
              <p className="section-subtitle">
                Our fleet ranges from 10T to 250T+ cranes, regularly inspected and certified for peak performance.
              </p>
            </div>
            <Link href="/fleet" className="btn-secondary shrink-0">
              View Full Fleet
              <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleetData.slice(0, 3).map((item) => (
            <AnimatedItem key={item.name}>
              <Link href={`/fleet/${item.slug}`} className="card-gold-glow group overflow-hidden p-0 block">
                <div className="relative h-52 w-full overflow-hidden bg-gray-50">
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
                <div className="p-5">
                  <h3 className="text-lg font-heading font-bold text-brand-green">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex gap-4 text-xs text-gray-500">
                    <span>Boom: {item.boomLength}</span>
                    <span>Type: {item.type}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
