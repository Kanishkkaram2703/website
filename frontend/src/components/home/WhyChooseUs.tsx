'use client';

import {
  Shield, Clock, Award, Users, Wrench, MapPin,
  CheckCircle2, Phone, Truck, Target
} from 'lucide-react';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

const reasons = [
  {
    icon: Shield,
    title: 'Safety-First Approach',
    description: 'Every lift is backed by certified risk assessments, toolbox talks, and strict compliance with IS standards.',
  },
  {
    icon: Users,
    title: 'Trained Operators',
    description: 'Our operators hold valid licenses, undergo regular training, and have years of field experience.',
  },
  {
    icon: Wrench,
    title: 'Well-Maintained Fleet',
    description: 'All cranes are regularly serviced, load-tested, and certified by third-party inspectors.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We commit to timelines. Rapid mobilization and zero delays are our promise on every project.',
  },
  {
    icon: MapPin,
    title: 'Pan-India Coverage',
    description: 'Based in Navi Mumbai, we serve clients across Maharashtra, Gujarat, Delhi NCR, and beyond.',
  },
  {
    icon: Target,
    title: 'Site Visit & Planning',
    description: 'Detailed site surveys, load calculations, and lift plans prepared before every critical operation.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-brand-white">
      <div className="container-custom">
        <AnimatedSection className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Why Shivoham
          </span>
          <h2 className="section-title mt-2">
            Why <span className="text-brand-gold">Choose Us</span> for Your Project
          </h2>
          <p className="section-subtitle mx-auto text-center">
            When safety, reliability, and performance matter, top contractors and industries trust Shivoham Crane Services.
          </p>
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <AnimatedItem key={i}>
              <div className="flex gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green text-brand-gold transition-all duration-300 group-hover:bg-brand-gold group-hover:text-white">
                  <reason.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-brand-green">
                    {reason.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>

        {/* Stats */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-brand-green p-8 sm:grid-cols-4">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '15+', label: 'Years Experience' },
              { value: '100+', label: 'Cranes in Fleet' },
              { value: '24/7', label: 'Emergency Service' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-heading font-extrabold text-brand-gold lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
