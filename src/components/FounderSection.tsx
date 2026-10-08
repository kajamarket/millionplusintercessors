import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const FounderSection: React.FC = () => {
  const founder = siteConfig.founder;

  if (!founder || !founder.name) {
    return null;
  }

  return (
    <section
      id="resources"
      className="relative bg-white py-20 md:py-28 border-b border-stroke/50 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Dignified Dark Green Container Panel */}
        <div className="relative rounded-3xl md:rounded-[36px] bg-[#0E2C22] text-[#F7F7F7] p-8 md:p-12 lg:p-14 border border-[#174635] overflow-hidden shadow-xl">
          {/* Subtle watermark */}
          <div
            aria-hidden="true"
            className="absolute -top-10 md:-top-16 -right-4 md:right-8 font-display italic text-[140px] md:text-[220px] text-white/5 select-none pointer-events-none leading-none z-0"
          >
            04
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Left Column: Verified Photograph */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start">
              {founder.photo && founder.photo.trim() !== '' ? (
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/20">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E2C22]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              ) : null}
            </div>

            {/* Right Column: Narrative Copy */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Numbered label */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#86EFAC] font-mono text-xs tracking-widest font-semibold">
                  04.
                </span>
                <span className="text-white/70 text-xs tracking-[0.25em] font-medium uppercase font-mono">
                  {founder.label || 'OUR STORY & LEADERSHIP'}
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-white tracking-tight leading-[1.15] mb-5">
                {founder.title || `Meet ${founder.name}`}
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-white/85 font-light leading-relaxed">
                {founder.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Quote */}
              {founder.quote && founder.quote.trim() !== '' && (
                <blockquote className="mt-7 pt-6 border-t border-white/15">
                  <p className="font-display italic text-base sm:text-lg text-[#86EFAC] mb-2 leading-relaxed">
                    “{founder.quote}”
                  </p>
                  <cite className="not-italic text-xs text-white/60 uppercase tracking-widest font-mono">
                    — {founder.name}
                  </cite>
                </blockquote>
              )}

              {/* Strip & Books CTA */}
              {founder.stripText && (
                <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-white/80 font-mono uppercase tracking-wider">
                    {founder.stripText}
                  </div>
                  {founder.booksUrl && founder.booksUrl.trim() !== '' && (
                    <a
                      href={founder.booksUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#86EFAC] underline underline-offset-4 decoration-white/40 transition-colors"
                    >
                      <span>Explore Books on Prayer & Leadership</span>
                      <span>→</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
