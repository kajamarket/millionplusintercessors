import React from 'react';
import { motion } from 'framer-motion';

const PRAYER_AREAS = [
  {
    title: 'Individuals',
    description: 'Praying for personal salvation, spiritual growth, healing, and endurance in faith.',
  },
  {
    title: 'Families',
    description: 'Interceding for godly households, the sanctity of marriage, and children walking with God.',
  },
  {
    title: 'Churches',
    description: 'Upholding pastors and congregations in biblical truth, doctrinal integrity, and unity.',
  },
  {
    title: 'Communities',
    description: 'Seeking civic peace, mutual care, social righteousness, and community healing.',
  },
  {
    title: 'Nations',
    description: 'Standing in the gap for governance, moral awakening, and continent-wide revival.',
  },
];

export const Explorations: React.FC = () => {
  return (
    <section
      id="prayer"
      className="relative bg-white py-20 md:py-28 border-b border-stroke/50 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Authentic Strong Photograph */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] rounded-3xl overflow-hidden bg-surface border border-stroke shadow-md p-2.5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface">
                <img
                  src="/landmarks/bete_giyorgis_lalibela.jpg"
                  alt="Historic prayer and heritage foundation"
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stroke/80">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold block mb-1">
                    FOUNDATIONS OF FAITH
                  </span>
                  <p className="text-xs sm:text-sm font-display italic text-heading leading-snug">
                    “The effective, fervent prayer of a righteous man avails much.”
                  </p>
                  <span className="text-[10px] font-mono text-muted mt-0.5 block">
                    — James 5:16
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 5 Areas of Prayer */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-accent/60" />
                <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                  PRAYER & INTERCESSION
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15] mb-5">
                Standing in the Gap
              </h2>

              <p className="text-base sm:text-lg text-text-primary/80 font-light leading-relaxed mb-8">
                In Million Plus Intercessors, prayer is not regarded as a passive ritual, but as an active, sacred responsibility. To stand in the gap is to lift others before God with intentionality, perseverance, and genuine compassion.
              </p>
            </div>

            {/* Five Areas of Prayer presented cleanly */}
            <div className="space-y-3 pt-4 border-t border-stroke/60">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold block mb-2">
                Five Key Areas of Intercession
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PRAYER_AREAS.map((area, idx) => (
                  <div
                    key={area.title}
                    className="p-4 rounded-xl bg-surface/50 border border-stroke/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-display italic text-base sm:text-lg text-heading font-normal">
                          {area.title}
                        </h3>
                        <span className="text-[10px] font-mono text-accent font-semibold">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-muted font-light leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
