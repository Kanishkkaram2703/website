import dynamic from 'next/dynamic';
import { TrustBar } from '@/components/home/TrustBar';
import { ServicesSnapshot } from '@/components/home/ServicesSnapshot';
import { FleetPreview } from '@/components/home/FleetPreview';
import { IndustriesPreview } from '@/components/home/IndustriesPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ProjectsPreview } from '@/components/home/ProjectsPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTABanner } from '@/components/home/CTABanner';

/* Dynamic import: keeps canvas/GSAP out of SSR bundle */
const HeroScrollSequence = dynamic(
  () => import('@/components/home/HeroScrollSequence'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <>
      <HeroScrollSequence
        frameCount={192}
        framePathPattern="/hero-seq/{frame}.jpg"
        logoPath="/logo/logo.png"
      />
      <TrustBar />
      <ServicesSnapshot />
      <FleetPreview />
      <IndustriesPreview />
      <WhyChooseUs />
      <ProjectsPreview />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
