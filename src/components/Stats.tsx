import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const Stats: React.FC = () => {
  // Render only stat items with non-empty value and label. If none filled, omit section.
  const validStats = (siteConfig.stats || []).filter(
    (stat) => stat.value && stat.value.trim() !== '' && stat.label && stat.label.trim() !== ''
  );

  if (validStats.length === 0) {
    return null;
  }

  return (
    <section className="bg-bg py-20 md:py-28 border-t border-stroke/50 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {validStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col p-8 md:p-10 rounded-3xl bg-surface/50 border border-stroke/70 relative group hover:border-accent/60 hover:bg-surface transition-all duration-300 shadow-sm"
            >
              {/* Number display in serif italic */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl md:text-6xl lg:text-7xl font-display italic text-heading tabular-nums tracking-tight">
                  {stat.value}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-base md:text-lg font-medium text-heading mb-2 tracking-tight">
                {stat.label}
              </h3>

              <p className="text-xs md:text-sm text-muted font-light leading-relaxed">
                {index === 0 && 'Spanning nations, tribes, and languages with documented testimonies of revival.'}
                {index === 1 && 'Comprehensive historical records, biographies, and ministry stories.'}
                {index === 2 && 'Readers and leaders empowered globally through Christ-centered resources.'}
              </p>

              {/* Top accent indicator bar */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
