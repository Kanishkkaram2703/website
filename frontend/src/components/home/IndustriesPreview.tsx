'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { industriesData } from '@/data/siteData';
import { Icon } from '@/components/ui/Icon';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

export function IndustriesPreview() {
  return (
    <section className="section-padding bg-brand-green relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(186,141,50,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container-custom relative z-10">
        <AnimatedSection className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Industries We Serve
          </span>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl lg:text-5xl font-heading">
            Trusted Across <span className="text-brand-gold">Every Major</span> Industry
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/60">
            From oil refineries to high-rise construction, our cranes power India&apos;s biggest projects.
          </p>
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industriesData.map((industry) => (
            <AnimatedItem key={industry.name}>
              <div className="card-dark-gold-glow group rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col h-full transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                  <Icon name={industry.icon} size={24} />
                </div>
                <h3 className="text-base font-heading font-bold text-white group-hover:text-brand-gold transition-colors">
                  {industry.name}
                </h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed flex-1">
                  {industry.description}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <Link href="/industries" className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-gold bg-transparent px-6 py-3 text-sm font-semibold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-green">
            Explore All Industries
            <ChevronRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
