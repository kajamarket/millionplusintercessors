import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const NetworkSection: React.FC = () => {
  const items = (siteConfig.network || []).filter(
    (item) => item.href && item.href.trim() !== ''
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id="network"
      className="bg-white py-20 md:py-28 border-b border-stroke/50 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent font-mono text-xs tracking-widest font-semibold">
              05.
            </span>
            <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase font-mono">
              OUR MINISTRY ECOSYSTEM
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
            Explore Our Ministry Network
          </h2>

          <p className="text-muted text-sm md:text-base mt-4 font-light leading-relaxed">
            {siteConfig.name} is connected within a wider network of sister platforms dedicated to Christian discipleship, media, prayer, missions, and leadership development.
          </p>
        </motion.div>

        {/* Minimal Numbered List */}
        <div className="border-t border-stroke">
          {items.map((item, idx) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col md:flex-row md:items-baseline justify-between py-6 md:py-7 border-b border-stroke hover:border-accent transition-colors gap-4"
              >
                {/* Left: Number + Name */}
                <div className="flex items-baseline gap-4 md:gap-6 min-w-[280px]">
                  <span className="font-mono text-xs text-accent font-semibold tracking-wider shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display italic text-heading group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Middle: Description */}
                <p className="text-xs sm:text-sm text-text-primary/75 font-light leading-relaxed max-w-xl md:px-4">
                  {item.description}
                </p>

                {/* Right: Visit CTA */}
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted group-hover:text-accent shrink-0 self-start md:self-baseline">
                  <span>{item.cta || 'Visit'}</span>
                  <span className="text-accent text-sm transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
