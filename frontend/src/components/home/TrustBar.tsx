'use client';

import { Shield, Clock, Award, MapPin, Users, Wrench } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const trustItems = [
  { icon: Shield, label: 'Safety First', sublabel: 'Zero-incident focus' },
  { icon: Clock, label: '24/7 Available', sublabel: 'Emergency response' },
  { icon: Award, label: '15+ Years', sublabel: 'Industry experience' },
  { icon: MapPin, label: 'Pan-India', sublabel: 'Nationwide service' },
  { icon: Users, label: '500+ Projects', sublabel: 'Successfully completed' },
  { icon: Wrench, label: 'Well-Maintained', sublabel: 'Inspected fleet' },
];

export function TrustBar() {
  return (
    <section className="relative -mt-1 bg-white border-b border-gray-100">
      <AnimatedSection>
        <div className="container-custom py-8 lg:py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {trustItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 group cursor-default">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/5 text-brand-green transition-all duration-300 group-hover:bg-brand-gold/10 group-hover:text-brand-gold">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-green">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.sublabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
