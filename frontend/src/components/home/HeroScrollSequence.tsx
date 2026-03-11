'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWhatsAppUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */
interface HeroScrollSequenceProps {
  frameCount?: number;
  framePathPattern?: string; // e.g. "/hero-seq/{frame}.png"
  logoPath?: string;
}

interface Beat {
  id: number;
  start: number; // fraction 0-1
  end: number;
  type: 'text' | 'zoom' | 'logo';
  title?: string;
  subtitle?: string;
  cta?: boolean;
  scale?: [number, number]; // [from, to]
}

/* ------------------------------------------------------------------ */
/*  BEAT DEFINITIONS                                                    */
/* ------------------------------------------------------------------ */
const BEATS: Beat[] = [
  { id: 0, start: 0.00, end: 0.15, type: 'text',  title: 'SHIVOHAM', subtitle: 'CRANE SERVICES', scale: [1.0, 1.02] },
  { id: 1, start: 0.15, end: 0.30, type: 'zoom',  scale: [1.02, 1.12] },
  { id: 2, start: 0.30, end: 0.45, type: 'text',  title: 'Navi Mumbai-based.', subtitle: 'Pan-India deployment.', scale: [1.12, 1.14] },
  { id: 3, start: 0.45, end: 0.60, type: 'zoom',  scale: [1.14, 1.24] },
  { id: 4, start: 0.60, end: 0.75, type: 'text',  title: 'Safety-first lifts.', subtitle: 'On-time execution.', scale: [1.24, 1.26] },
  { id: 5, start: 0.75, end: 0.88, type: 'zoom',  scale: [1.26, 1.36] },
  { id: 6, start: 0.88, end: 1.00, type: 'text',  title: 'Need a crane on-site?', subtitle: 'Get a quote in minutes.', cta: true, scale: [1.36, 1.38] },
];

/* ------------------------------------------------------------------ */
/*  HELPERS                                                              */
/* ------------------------------------------------------------------ */
function padFrame(n: number, digits = 5): string {
  return String(n).padStart(digits, '0');
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/* Easing for text overlays */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ------------------------------------------------------------------ */
/*  PRELOADER                                                           */
/* ------------------------------------------------------------------ */
function useFramePreloader(
  frameCount: number,
  pattern: string,
  prefersReducedMotion: boolean
) {
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const loadedCountRef = useRef(0);

  /* Reduced motion: load only ~24 evenly spaced frames */
  const frameIndices = useMemo(() => {
    if (prefersReducedMotion) {
      const step = Math.max(1, Math.floor(frameCount / 24));
      const indices: number[] = [];
      for (let i = 1; i <= frameCount; i += step) indices.push(i);
      if (indices[indices.length - 1] !== frameCount) indices.push(frameCount);
      return indices;
    }
    return Array.from({ length: frameCount }, (_, i) => i + 1);
  }, [frameCount, prefersReducedMotion]);

  useEffect(() => {
    const totalToLoad = frameIndices.length;
    framesRef.current = new Array(frameCount + 1).fill(null);
    loadedCountRef.current = 0;

    /* Batch loading with priority tiers */
    const BATCH_IMMEDIATE = 30; // first 30 frames loaded eagerly
    let cancelled = false;

    const loadImage = (idx: number): Promise<void> => {
      return new Promise((resolve) => {
        if (cancelled) { resolve(); return; }
        const img = new window.Image();
        img.decoding = 'async';
        img.src = pattern.replace('{frame}', padFrame(idx));
        img.onload = () => {
          if (!cancelled) {
            framesRef.current[idx] = img;
            loadedCountRef.current++;
            setProgress(loadedCountRef.current / totalToLoad);
            if (loadedCountRef.current >= totalToLoad) setReady(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCountRef.current++;
          setProgress(loadedCountRef.current / totalToLoad);
          if (loadedCountRef.current >= totalToLoad) setReady(true);
          resolve();
        };
      });
    };

    const loadBatch = async (indices: number[], concurrency: number) => {
      for (let i = 0; i < indices.length; i += concurrency) {
        if (cancelled) break;
        const batch = indices.slice(i, i + concurrency);
        await Promise.all(batch.map(loadImage));
      }
    };

    const startLoading = async () => {
      // Tier 1: first BATCH_IMMEDIATE frames (high priority)
      const tier1 = frameIndices.slice(0, BATCH_IMMEDIATE);
      await loadBatch(tier1, 6);

      // Mark ready early so user sees something quickly
      if (!cancelled && tier1.length >= BATCH_IMMEDIATE) {
        // Allow rendering as soon as initial frames load
      }

      // Tier 2: remaining frames
      const tier2 = frameIndices.slice(BATCH_IMMEDIATE);
      await loadBatch(tier2, 4);
    };

    startLoading();

    return () => { cancelled = true; };
  }, [frameCount, pattern, frameIndices]);

  /* Find closest loaded frame for a given index */
  const getFrame = useCallback(
    (idx: number): HTMLImageElement | null => {
      if (framesRef.current[idx]) return framesRef.current[idx];
      // Nearest loaded frame
      for (let d = 1; d < 10; d++) {
        if (framesRef.current[idx - d]) return framesRef.current[idx - d];
        if (framesRef.current[idx + d]) return framesRef.current[idx + d];
      }
      return framesRef.current[1];
    },
    []
  );

  return { progress, ready, getFrame, frameIndices };
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                            */
/* ------------------------------------------------------------------ */
export default function HeroScrollSequence({
  frameCount = 192,
  framePathPattern = '/hero-seq/{frame}.jpg',
  logoPath = '/logo/logo.png',
}: HeroScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0); // scroll progress 0-1
  const rafRef = useRef<number>(0);
  const lastDrawnFrame = useRef(-1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [logoRevealed, setLogoRevealed] = useState(false);

  /* Detect prefers-reduced-motion */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const { progress: loadProgress, ready, getFrame } = useFramePreloader(
    frameCount,
    framePathPattern,
    prefersReducedMotion
  );

  /* ---- Canvas rendering loop ---- */
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const p = progressRef.current;
    const frameIdx = clamp(Math.round(p * (frameCount - 1)) + 1, 1, frameCount);

    if (frameIdx === lastDrawnFrame.current) return;
    lastDrawnFrame.current = frameIdx;

    const img = getFrame(frameIdx);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    /* Compute current scale from beat definitions */
    let scale = 1;
    for (const beat of BEATS) {
      if (p >= beat.start && p <= beat.end && beat.scale) {
        const beatProgress = (p - beat.start) / (beat.end - beat.start);
        scale = lerp(beat.scale[0], beat.scale[1], beatProgress);
        break;
      }
    }

    /* Draw image with "cover" fit + scale */
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;
    let drawW: number, drawH: number;
    if (imgAspect > canvasAspect) {
      drawH = ch * scale;
      drawW = drawH * imgAspect;
    } else {
      drawW = cw * scale;
      drawH = drawW / imgAspect;
    }
    const dx = (cw - drawW) / 2;
    const dy = (ch - drawH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, drawW, drawH);

    /* Cinematic vignette */
    const gradient = ctx.createRadialGradient(
      cw / 2, ch / 2, cw * 0.25,
      cw / 2, ch / 2, cw * 0.75
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(10,24,21,0.55)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cw, ch);

    /* Subtle dark overlay for text readability */
    ctx.fillStyle = 'rgba(10,24,21,0.25)';
    ctx.fillRect(0, 0, cw, ch);
  }, [frameCount, getFrame]);

  /* ---- Resize canvas ---- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      lastDrawnFrame.current = -1; // force redraw
      drawFrame();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  /* ---- RAF render loop ---- */
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      drawFrame();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  /* ---- GSAP ScrollTrigger ---- */
  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: '.hero-canvas-wrapper',
      scrub: 0.5, // smooth scrub
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
      onLeave: () => setLogoRevealed(true),
      onEnterBack: () => setLogoRevealed(false),
    });

    return () => trigger.kill();
  }, [ready]);

  /* ---- Text overlay visibility ---- */
  const [activeBeat, setActiveBeat] = useState<Beat | null>(BEATS[0]);

  useEffect(() => {
    if (!ready) return;
    let rafId: number;

    const update = () => {
      const p = progressRef.current;
      let found: Beat | null = null;
      for (const beat of BEATS) {
        if (p >= beat.start && p < beat.end && beat.type === 'text') {
          found = beat;
          break;
        }
      }
      setActiveBeat(found);
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [ready]);

  /* ---- Compute text opacity/transform based on beat progress ---- */
  const getOverlayStyle = useCallback(
    (beat: Beat) => {
      const p = progressRef.current;
      if (p < beat.start || p >= beat.end) return { opacity: 0, transform: 'translateY(30px)' };

      const beatProgress = (p - beat.start) / (beat.end - beat.start);

      // Fade in for first 30%, hold, fade out last 20%
      let opacity = 1;
      if (beatProgress < 0.3) {
        opacity = easeOutCubic(beatProgress / 0.3);
      } else if (beatProgress > 0.8) {
        opacity = 1 - easeOutCubic((beatProgress - 0.8) / 0.2);
      }

      const translateY = beatProgress < 0.3 ? lerp(30, 0, easeOutCubic(beatProgress / 0.3)) : 0;

      return {
        opacity,
        transform: `translateY(${translateY}px)`,
      };
    },
    []
  );

  /* ---- Reduced motion fallback ---- */
  const scrollHeight = prefersReducedMotion ? '200vh' : '800vh';

  return (
    <>
    <section
      ref={containerRef}
      className="hero-sequence-container relative"
      style={{ height: scrollHeight }}
      aria-label="Shivoham Crane Services - Cinematic hero showcase"
      role="region"
    >
      {/* Loading screen */}
      {!ready && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-green">
          <div className="mb-8 text-center">
            <div className="relative flex items-center justify-center mx-auto mb-4 rounded-xl border border-brand-gold/30" style={{ width: 64, height: 64, backgroundColor: 'rgba(20,47,42,0.5)' }}>
              <Image
                src={logoPath}
                alt="Shivoham Crane Services"
                width={48}
                height={62}
                className="object-contain"
                style={{ maxWidth: '90%', maxHeight: '90%' }}
                priority
              />
            </div>
            <p className="text-brand-gold font-heading font-semibold text-sm tracking-wider uppercase">
              Loading Experience
            </p>
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-300 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.round(loadProgress * 100)}%` }}
            />
          </div>
          <p className="mt-3 text-white/40 text-xs font-mono">
            {Math.round(loadProgress * 100)}%
          </p>
        </div>
      )}

      {/* Pinned viewport */}
      <div className="hero-canvas-wrapper fixed inset-0 w-screen h-screen overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Top gradient for navbar readability */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-green/60 to-transparent pointer-events-none z-10" />

        {/* Text overlays */}
        {ready && BEATS.filter((b) => b.type === 'text').map((beat) => (
          <HeroBeatOverlay
            key={beat.id}
            beat={beat}
            active={activeBeat?.id === beat.id}
            getStyle={getOverlayStyle}
            logoPath={logoPath}
          />
        ))}

        {/* Logo reveal layer (Beat 7) */}
        <div
          className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-1000 ease-out pointer-events-none ${
            logoRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          aria-hidden={!logoRevealed}
        >
          <div className="bg-black absolute inset-0" />
          <div className="relative z-10 text-center">
            <div className="relative flex items-center justify-center mx-auto rounded-2xl border-2 border-brand-gold/40 shadow-2xl shadow-brand-gold/20" style={{ width: 160, height: 160, backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <Image
                src={logoPath}
                alt="Shivoham Crane Services Logo"
                width={140}
                height={160}
                className="object-contain"
                style={{ maxWidth: '90%', maxHeight: '90%' }}
                priority
              />
            </div>
            <h2 className="mt-6 font-heading text-2xl sm:text-3xl font-bold tracking-wider" style={{ color: '#ba8d32' }}>
              SHIVOHAM
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              CRANE SERVICES
            </p>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        {ready && !logoRevealed && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/40 text-[10px] uppercase tracking-widest font-medium">Scroll</span>
              <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
                <div className="w-1 h-2 bg-brand-gold rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

    {/* ---- Logo brand section on black bg after hero ---- */}
    <section className="logo-brand-section relative w-full overflow-hidden" style={{ backgroundColor: '#000' }}>
      <div className="flex flex-col items-center justify-center py-20 px-6" style={{ minHeight: '60vh' }}>
        <div className="logo-brand-reveal" style={{ position: 'relative' }}>
          {/* Multi-layer gold glow behind logo */}
          <div style={{ position: 'absolute', inset: '-64px', borderRadius: '50%', background: 'rgba(186,141,50,0.15)', filter: 'blur(80px)' }} className="animate-pulse" />
          <div style={{ position: 'absolute', inset: '-40px', borderRadius: '50%', background: 'rgba(186,141,50,0.10)', filter: 'blur(48px)' }} />
          <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', background: 'rgba(186,141,50,0.05)', filter: 'blur(24px)' }} />
          {/* Dark box with logo overlaying */}
          <div className="relative mx-auto rounded-3xl border-2" style={{ width: 280, height: 280, backgroundColor: '#000', borderColor: 'rgba(186,141,50,0.4)', boxShadow: '0 25px 50px -12px rgba(186,141,50,0.4)' }}>
            {/* Logo image overlays the box, slightly larger */}
            <div style={{ position: 'absolute', top: -20, left: -20, right: -20, bottom: -20, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <Image
                src={logoPath}
                alt="Shivoham Crane Services Logo"
                width={300}
                height={388}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 30px rgba(186,141,50,0.35))' }}
              />
            </div>
          </div>
        </div>
        <h2 className="mt-10 font-heading font-extrabold tracking-wider logo-brand-text text-3xl sm:text-4xl md:text-5xl" style={{ color: '#ba8d32' }}>
          SHIVOHAM
        </h2>
        <p className="font-bold uppercase logo-brand-text text-sm sm:text-base md:text-lg" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.35em', marginTop: 12 }}>
          CRANE SERVICES
        </p>
        <div className="logo-brand-text" style={{ marginTop: 24, height: 2, width: 96, background: 'linear-gradient(to right, transparent, #ba8d32, transparent)' }} />
      </div>
    </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BEAT TEXT OVERLAY COMPONENT                                         */
/* ------------------------------------------------------------------ */
interface HeroBeatOverlayProps {
  beat: Beat;
  active: boolean;
  getStyle: (beat: Beat) => { opacity: number; transform: string };
  logoPath: string;
}

function HeroBeatOverlay({ beat, active, getStyle, logoPath }: HeroBeatOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Continuously update style via RAF for smoothness */
  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (overlayRef.current) {
        const style = getStyle(beat);
        overlayRef.current.style.opacity = String(style.opacity);
        overlayRef.current.style.transform = style.transform;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [beat, getStyle]);

  const isBeat0 = beat.id === 0;
  const isCTA = beat.cta;

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none ${
        active ? '' : ''
      }`}
      style={{ opacity: 0, transform: 'translateY(30px)', willChange: 'opacity, transform' }}
      aria-hidden={!active}
    >
      <div className="container-custom text-center max-w-4xl px-6">
        {isBeat0 ? (
          /* Beat 0: Big logo-style title */
          <div>
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white leading-none tracking-tight hero-text-stroke">
              {beat.title}
              <span className="hero-title-glow" />
            </h1>
            <p className="mt-3 text-brand-gold text-lg sm:text-xl md:text-2xl font-bold tracking-[0.25em] uppercase hero-text-stroke">
              {beat.subtitle}
            </p>
          </div>
        ) : isCTA ? (
          /* Beat 6: CTA — gold line 1, white line 2 */
          <div>
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug hero-text-stroke">
              <span className="text-brand-gold">{beat.title}</span>
              <br />
              <span className="text-white">{beat.subtitle}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center pointer-events-auto">
              <Link
                href="/contact#quote-form"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-brand-gold px-8 py-4 text-base font-bold text-brand-green shadow-xl shadow-brand-gold/30 transition-all duration-300 hover:bg-brand-gold-400 hover:shadow-2xl hover:shadow-brand-gold/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-green active:scale-[0.98]"
              >
                Get Quote
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/20 hover:text-[#25D366] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-brand-green active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        ) : (
          /* Beat 2: gold first, white second | Beat 4: white first, gold second */
          <div>
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug hero-text-stroke">
              {beat.id === 2 ? (
                <>
                  <span className="text-brand-gold">{beat.title}</span>
                  <br />
                  <span className="text-white">{beat.subtitle}</span>
                </>
              ) : (
                <>
                  <span className="text-white">{beat.title}</span>
                  <br />
                  <span className="text-brand-gold">{beat.subtitle}</span>
                </>
              )}
            </p>
            <div className="mt-4 h-0.5 w-16 mx-auto bg-brand-gold/60 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
