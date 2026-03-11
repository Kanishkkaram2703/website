'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding bg-brand-white">
      <div className="container-custom">
        <AnimatedSection className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
            FAQs
          </span>
          <h2 className="section-title mt-2">{title}</h2>
        </AnimatedSection>

        <AnimatedStagger className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedItem key={i}>
              <div className="rounded-xl border border-gray-100 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-sm font-semibold text-brand-green">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'shrink-0 text-brand-gold transition-transform duration-300',
                      openIndex === i ? 'rotate-180' : ''
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === i ? 'max-h-96 pb-4' : 'max-h-0'
                  )}
                >
                  <p className="px-6 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
