'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { servicesData } from '@/data/siteData';
import { Icon } from '@/components/ui/Icon';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

export function ServicesSnapshot() {
  return (
    <section className="section-padding bg-brand-white">
      <div className="container-custom">
        <AnimatedSection className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            What We Offer
          </span>
          <h2 className="section-title mt-2">
            Our Crane <span className="text-brand-gold">&amp; Lifting</span> Services
          </h2>
          <p className="section-subtitle mx-auto text-center">
            From mobile crane rental to emergency night lifts, we provide comprehensive
            lifting solutions for every industry and project scale.
          </p>
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service) => (
            <AnimatedItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="card-gold-glow group flex flex-col h-full"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                  <Icon name={service.icon} size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-green group-hover:text-brand-gold transition-colors">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                  {service.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-brand-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn More <ChevronRight size={14} />
                </div>
              </Link>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
            <ChevronRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
