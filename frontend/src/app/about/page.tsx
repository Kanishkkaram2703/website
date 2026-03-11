import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Shield, Users, Award, Target, Eye, Hammer } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Shivoham Crane Services — Navi Mumbai-based crane rental and heavy lifting company serving clients across India.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="About Us"
        title="Built on Safety."
        titleHighlight="Driven by Excellence."
        description="Since 2026, Shivoham Crane Services has been Navi Mumbai's trusted partner for crane rental and heavy lifting operations, serving clients across India with unwavering commitment to safety and reliability."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">Our Story</span>
              <h2 className="section-title mt-2">
                From Navi Mumbai to <span className="text-brand-gold">All of India</span>
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Shivoham Crane Services was founded with a single vision: to provide safe, reliable, and
                  professional crane services to India&apos;s growing industrial and infrastructure sectors.
                  Starting with just two cranes in Navi Mumbai, we have grown into a full-service lifting solutions
                  provider with a fleet of 100+ cranes serving clients nationwide.
                </p>
                <p>
                  Our journey has been defined by an unwavering commitment to safety, investing in operator
                  training, maintaining our equipment to the highest standards, and building long-term
                  partnerships with our clients. Today, we are proud to be the preferred crane partner for
                  some of India&apos;s leading construction firms, EPC contractors, and industrial plants.
                </p>
                <p>
                  What sets us apart is not just our equipment — it is our people. Every team member at
                  Shivoham is trained to think safety-first and deliver excellence on every project.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact#quote-form" className="btn-primary">
                  Work With Us
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green to-brand-green-800 flex items-center justify-center">
                <div className="text-center p-8">
                  <Image
                    src="/images/logo.png"
                    alt="Shivoham Crane Services"
                    width={200}
                    height={200}
                    className="mx-auto rounded-xl"
                  />
                  <p className="mt-4 text-brand-gold font-heading font-bold text-xl">Since 2026</p>
                  <p className="text-white/60 text-sm">Navi Mumbai, Maharashtra</p>
                </div>
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-brand-gold p-6 shadow-xl">
                <p className="text-3xl font-heading font-extrabold text-brand-green">500+</p>
                <p className="text-sm font-medium text-brand-green/80">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="section-padding bg-brand-white">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To provide India\'s safest and most reliable crane rental and heavy lifting services, enabling our clients to complete their projects on time and within budget.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'To be India\'s most trusted and preferred crane services company, known for safety excellence, operational efficiency, and customer satisfaction.',
              },
              {
                icon: Shield,
                title: 'Our Values',
                text: 'Safety is non-negotiable. Integrity in every interaction. Excellence in every lift. Commitment to our people. Respect for the environment.',
              },
            ].map((item, i) => (
              <div key={i} className="card-gold-glow flex flex-col h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green text-brand-gold">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-brand-green">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Promise */}
      <section className="section-padding bg-brand-green">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Our Promise to <span className="text-brand-gold">Every Client</span>
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {[
              'Certified and insured equipment on every project',
              'Trained and licensed operators — no exceptions',
              'Detailed site survey and lift plan before every operation',
              'On-time mobilization with zero delays',
              'Transparent pricing with no hidden costs',
              'Dedicated project coordinator for your assignment',
              '24/7 emergency support line',
              'Full documentation and compliance certificates',
            ].map((promise, i) => (
              <div key={i} className="flex items-start gap-3 text-left text-white/80">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                  <ChevronRight size={14} />
                </div>
                <span className="text-sm">{promise}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
