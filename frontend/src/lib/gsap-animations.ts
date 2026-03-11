'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  useGsapSectionReveal                                                */
/*  Fade-up with stagger for sections & cards                          */
/* ------------------------------------------------------------------ */
export function useGsapSectionReveal() {
  const hasInit = useRef(false);

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;

    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    /* Delay slightly so DOM is fully rendered */
    const timer = setTimeout(() => {
      /* Section headings & subtitles */
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* Staggered children (cards, grid items) */
      gsap.utils.toArray<HTMLElement>('.gsap-stagger').forEach((container) => {
        const children = container.children;
        if (!children.length) return;

        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      /* Parallax subtle backgrounds */
      gsap.utils.toArray<HTMLElement>('.gsap-parallax').forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, 300);

    return () => clearTimeout(timer);
  }, []);
}

/* ------------------------------------------------------------------ */
/*  useSmoothAnchor                                                     */
/*  Smooth scroll to hash anchors with offset for fixed header          */
/* ------------------------------------------------------------------ */
export function useSmoothAnchor() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;

      const el = document.querySelector(hash);
      if (!el) return;

      e.preventDefault();
      const headerOffset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', hash);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
