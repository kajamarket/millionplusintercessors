import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const MissionSection: React.FC = () => {
  const mission = siteConfig.mission;
  if (!mission || !mission.heading) {
    return null;
  }

  return (
    <section
      id="about"
      className="relative bg-white py-20 md:py-28 border-b border-stroke/50"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Left Column: Numbered Label & Large Serif Heading */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-accent font-mono text-xs tracking-widest font-semibold">
                01.
              </span>
              <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase font-mono">
                {mission.label || 'A PEOPLE COMMITTED TO PRAYER'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              {mission.heading}
            </h2>
          </div>

          {/* Right Column: Paragraphs & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2">
            <div className="space-y-5 text-base md:text-lg text-text-primary/85 font-light leading-relaxed">
              {mission.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {mission.ctaHref && mission.ctaText && (
              <div className="mt-8 pt-6 border-t border-stroke/60">
                <Link
                  to={mission.ctaHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-heading hover:text-accent transition-colors group cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="underline underline-offset-4 decoration-accent/60 group-hover:decoration-accent">
                    {mission.ctaText}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
