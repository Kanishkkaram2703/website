'use client';

import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';
import { projectsData } from '@/data/siteData';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { AnimatedSection, AnimatedStagger, AnimatedItem } from '@/components/ui/AnimatedSection';

export function ProjectsPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <AnimatedSection>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-gold">
                Our Work
              </span>
              <h2 className="section-title mt-2">
                Featured <span className="text-brand-gold">Projects</span>
              </h2>
              <p className="section-subtitle">
                A glimpse of the high-profile projects we have executed with precision across India.
              </p>
            </div>
            <Link href="/projects" className="btn-secondary shrink-0">
              View All Projects
              <ChevronRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedStagger className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.slice(0, 3).map((project) => (
            <AnimatedItem key={project.title} className="h-full">
              <div className="card-gold-glow group flex h-full flex-col overflow-hidden p-0 sm:min-h-[368px] lg:min-h-[380px]">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-50">
                  <ImagePlaceholder
                    src={project.image}
                    alt={project.title}
                    fill
                    className="h-full w-full object-center transition-transform duration-500 group-hover:scale-105"
                    objectFit="cover"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
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
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-heading font-bold text-brand-green group-hover:text-brand-gold transition-colors">
                    {project.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} />
                    {project.location}
                  </div>
                  <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-gray-600">
                    {project.description}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedStagger>
      </div>
    </section>
  );
}
