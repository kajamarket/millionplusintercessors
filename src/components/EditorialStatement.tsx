import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

const VISION_PRINCIPLES = [
  {
    title: 'Prayer',
    subtitle: 'Standing Before God',
    description: 'Standing before God in persistent, devoted personal and corporate intercession.',
  },
  {
    title: 'Unity',
    subtitle: 'One Mind & Spirit',
    description: 'Believers coming together across boundaries and backgrounds around united prayer.',
  },
  {
    title: 'Nations',
    subtitle: 'Interceding for Peoples',
    description: 'Praying intentionally for families, local communities, leaders, and nations.',
  },
  {
    title: 'Transformation',
    subtitle: 'Enduring Impact',
    description: 'Believing faithful prayer produces spiritual awakening and practical change.',
  },
];

export const EditorialStatement: React.FC = () => {
  const statement = siteConfig.editorialStatement;
  if (!statement || !statement.statement) {
    return null;
  }

  return (
    <section
      id="vision"
      className="relative w-full py-20 md:py-28 bg-surface/40 border-b border-stroke/60 select-none overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono font-medium">
              OUR VISION
            </span>
            <span className="w-8 h-px bg-accent/60" />
          </div>

          {/* Large Serif Statement */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic text-heading tracking-tight leading-[1.12] mb-5">
            “{statement.statement}”
          </h2>

          {/* Subtext */}
          {statement.subtext && (
            <p className="text-xs sm:text-sm text-muted uppercase tracking-[0.2em] font-light font-mono max-w-xl">
              {statement.subtext}
            </p>
          )}
        </motion.div>

        {/* 4 Supporting Principles in a Clean Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VISION_PRINCIPLES.map((principle, idx) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 md:p-7 rounded-2xl bg-white border border-stroke shadow-xs hover:border-accent/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-accent font-semibold block mb-2">
                  0{idx + 1}.
                </span>
                <h3 className="text-xl font-display italic text-heading mb-1">
                  {principle.title}
                </h3>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted block mb-3">
                  {principle.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-text-primary/75 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
