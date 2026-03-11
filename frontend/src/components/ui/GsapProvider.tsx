'use client';

import { useGsapSectionReveal, useSmoothAnchor } from '@/lib/gsap-animations';

/**
 * GsapProvider: mounts once in layout, initializes sitewide GSAP scroll animations.
 * Must be a client component.
 */
export function GsapProvider({ children }: { children: React.ReactNode }) {
  useGsapSectionReveal();
  useSmoothAnchor();
  return <>{children}</>;
}
