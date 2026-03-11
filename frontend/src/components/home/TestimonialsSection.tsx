'use client';

import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '@/data/siteData';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-brand-white">
      <div className="container-custom">
        <AnimatedSection className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            Client Testimonials
          </span>
          <h2 className="section-title mt-2">
            What Our <span className="text-brand-gold">Clients</span> Say
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Trusted by leading contractors, EPC companies, and industrial plants across India.
          </p>
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {testimonialsData.map((testimonial, i) => (
            <AnimatedItem key={i}>
              <div className="card-gold-glow relative">
                <Quote size={40} className="absolute top-4 right-4 text-brand-gold/10" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, s) => (
                    <Star key={s} size={16} className="fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-brand-gold font-heading font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-green">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
