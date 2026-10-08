import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

interface HeroProps {
  ready?: boolean;
}

export const Hero: React.FC<HeroProps> = () => {
  const [roleIndex, setRoleIndex] = useState<number>(0);

  // Cycle role words smoothly
  useEffect(() => {
    if (!siteConfig.heroRoles || siteConfig.heroRoles.length === 0) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.heroRoles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const activeRole = siteConfig.heroRoles[roleIndex] || 'Intercessor';

  const handleScrollToSection = (id: string) => {
    if (typeof document === 'undefined') return;
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] md:min-h-[92vh] w-full flex items-center justify-center bg-white text-text-primary pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-stroke/60 select-none overflow-hidden"
    >
      {/* Subtle background ambient texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface/80 via-white to-white pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Core Editorial Headline & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 mb-5 px-3.5 py-1.5 rounded-full bg-surface border border-stroke">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent font-semibold">
              {siteConfig.heroEyebrow || 'MILLION PLUS INTERCESSORS'}
            </span>
          </div>

          {/* Primary H1: Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-display italic text-heading leading-[1.08] tracking-tight mb-6">
            {siteConfig.heroTitle}
          </h1>

          {/* Dynamic Role Line */}
          <div className="text-sm sm:text-base text-muted font-light mb-6 flex items-center gap-2">
            <span>A dedicated</span>
            <span
              key={roleIndex}
              className="font-display italic text-accent text-lg sm:text-xl font-normal transition-all duration-300"
            >
              {activeRole}
            </span>
            <span>standing before God for nations.</span>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-text-primary/80 max-w-xl mb-9 font-light leading-relaxed">
            {siteConfig.heroDescription ||
              'Million Plus Intercessors exists to encourage and mobilise believers in dedicated prayer and intercession for individuals, families, communities, churches, and nations.'}
          </p>

          {/* Action CTAs */}
          <div className="inline-flex flex-wrap items-center gap-3.5 sm:gap-4">
            {/* Primary CTA */}
            <a
              href="#join"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('join');
              }}
              className="inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-7 py-3.5 bg-accent text-white hover:bg-accent-light transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
            >
              <span>Join the Movement</span>
              <span className="text-xs">→</span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection('about');
              }}
              className="inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-7 py-3.5 bg-white text-heading border border-stroke hover:border-accent hover:text-accent transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Learn More</span>
              <span className="text-xs">↓</span>
            </a>
          </div>

          {/* Microcopy Pillars */}
          {siteConfig.heroMicrocopy && (
            <div className="mt-10 pt-6 border-t border-stroke/60 w-full text-xs text-muted uppercase tracking-[0.2em] font-mono">
              {siteConfig.heroMicrocopy}
            </div>
          )}
        </motion.div>

        {/* Right Column: Restrained Authentic Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden bg-surface border border-stroke shadow-lg p-2.5">
            {/* Image Frame */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
              <img
                src="/faithheroes_whatsapp_img.jpeg"
                alt="Believers gathered in devoted prayer and intercession"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Discreet Caption Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stroke/80 shadow-md">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block mb-1">
                  INTERCESSION MOVEMENT
                </span>
                <p className="text-xs sm:text-sm font-display italic text-heading leading-snug">
                  “I sought for a man among them who would make up the hedge and stand in the gap.”
                </p>
                <span className="text-[10px] font-mono text-muted mt-1 block">
                  — Ezekiel 22:30
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
