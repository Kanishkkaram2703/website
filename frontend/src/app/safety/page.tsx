import type { Metadata } from 'next';
import { Shield, CheckCircle2, FileText, HardHat, Award, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Safety & Compliance',
  description: 'Safety is our top priority. Learn about our safety protocols, certifications, operator training, and compliance with Indian lifting standards.',
};

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        badge="Safety & Compliance"
        title="Safety is"
        titleHighlight="Non-Negotiable"
        description="At Shivoham Crane Services, every operation starts and ends with safety. We follow strict protocols, invest in training, and comply with all applicable Indian standards."
        breadcrumbs={[{ label: 'Safety & Compliance' }]}
      />

      {/* Safety pillars */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
              Our Safety Framework
            </span>
            <h2 className="section-title mt-2">
              How We Keep Every <span className="text-brand-gold">Lift Safe</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: HardHat,
                title: 'Pre-Lift Risk Assessment',
                text: 'Every operation begins with a comprehensive risk assessment covering ground conditions, weather, load specs, and surrounding hazards.',
              },
              {
                icon: FileText,
                title: 'Detailed Lift Plans',
                text: 'For critical lifts, we prepare engineered lift plans with load charts, boom configurations, rigging arrangements, and contingency procedures.',
              },
              {
                icon: Award,
                title: 'Certified Equipment',
                text: 'All cranes carry valid third-party load test certificates, fitness certificates, and insurance. We never deploy an uncertified machine.',
              },
              {
                icon: Shield,
                title: 'Toolbox Talks',
                text: 'Before every shift, our team conducts toolbox talks covering the day\'s tasks, hazards, PPE requirements, and emergency procedures.',
              },
              {
                icon: AlertTriangle,
                title: 'Incident Reporting',
                text: 'We maintain a zero-incident culture. Near-misses are investigated and learnings shared across all teams to continuously improve safety.',
              },
              {
                icon: CheckCircle2,
                title: 'Compliance Standards',
                text: 'We comply with IS 3177 (Lifting Appliances), IS 4573 (Mobile Cranes), and follow guidelines from AERB, OISD, and client-specific HSE requirements.',
              },
            ].map((pillar, i) => (
              <div key={i} className="card-gold-glow flex flex-col h-full">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-green text-brand-gold">
                  <pillar.icon size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-brand-green">{pillar.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-brand-green">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Certifications & <span className="text-brand-gold">Documentation</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            We provide complete documentation for every project, ensuring full transparency and regulatory compliance.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {[
              'Third-Party Load Test Certificates',
              'Crane Fitness / Stability Certificates',
              'Operator Competency Licenses',
              'Public Liability Insurance',
              'Comprehensive Risk Assessments',
              'Method Statements & Lift Plans',
              'Daily Inspection Checklists',
              'Incident & Near-Miss Reports',
            ].map((cert, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-left">
                <CheckCircle2 size={18} className="shrink-0 text-brand-gold" />
                <span className="text-sm text-white/80">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operator training */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
                Operator Excellence
              </span>
              <h2 className="section-title mt-2">
                Trained & <span className="text-brand-gold">Certified</span> Operators
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Every crane operator at Shivoham holds a valid license from recognized authorities.
                  Beyond basic certification, our operators undergo regular in-house training covering
                  load chart reading, signal communication, emergency procedures, and site-specific protocols.
                </p>
                <p>
                  We invest heavily in our people because we know that the safest crane is only as good
                  as the person operating it. Our operators average over 8 years of field experience across
                  diverse industries including petrochemicals, power, construction, and manufacturing.
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  'Licensed by recognized Indian authorities',
                  'Minimum 5 years of field experience required',
                  'Annual refresher training and assessment',
                  'Site-specific induction before every new project',
                  'Drug and alcohol policy compliance',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-brand-gold shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-brand-green to-brand-green-800 p-8 sm:p-12 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                <HardHat size={48} />
              </div>
              <p className="mt-6 text-3xl font-heading font-extrabold text-brand-gold">0</p>
              <p className="text-lg text-white font-heading font-semibold">Lost Time Incidents</p>
              <p className="mt-2 text-sm text-white/60">Our target every single day</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-heading font-bold text-brand-gold">250+</p>
                  <p className="text-xs text-white/60">Trained Operators</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-brand-gold">8+ yrs</p>
                  <p className="text-xs text-white/60">Average Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
