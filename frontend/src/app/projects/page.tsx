import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { projectsData } from '@/data/siteData';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { PageHeader } from '@/components/layout/PageHeader';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'Projects & Gallery',
  description: 'View our portfolio of crane operations and lifting projects across India — from metro stations to refineries, factories to wind farms.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        badge="Our Projects"
        title="Project"
        titleHighlight="Portfolio"
        description="A showcase of our successfully completed crane operations and heavy lifting projects across India. Each project reflects our commitment to safety, precision, and on-time delivery."
        breadcrumbs={[{ label: 'Projects & Gallery' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <div key={project.title} className="card-gold-glow group overflow-hidden p-0">
                <div className="relative h-56 w-full overflow-hidden bg-gray-50">
                  <ImagePlaceholder
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    objectFit="contain"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-lg bg-brand-green/90 px-3 py-1 text-xs font-bold text-brand-gold backdrop-blur-sm">
                      {project.service}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-lg bg-brand-gold px-3 py-1 text-xs font-bold text-brand-green">
                      {project.tonnage}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-heading font-bold text-brand-green group-hover:text-brand-gold transition-colors">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} />
                    {project.location}
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
