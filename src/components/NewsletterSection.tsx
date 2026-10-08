import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteConfig } from '../site.config';

export const NewsletterSection: React.FC = () => {
  return (
    <section
      id="join"
      className="bg-white py-20 md:py-28 border-b border-stroke/50 relative"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-surface/50 border border-stroke"
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-accent font-mono text-xs tracking-widest font-semibold">
              06.
            </span>
            <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase font-mono">
              STAND WITH US
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15] mb-4">
            Stand With Us in Prayer
          </h2>

          {/* Supporting Text */}
          <p className="text-muted text-sm md:text-base font-light leading-relaxed mb-8 max-w-lg mx-auto">
            If you identify with the call to raise a people committed to persistent intercession for individuals, families, communities, and nations, we invite you to connect with {siteConfig.name}.
          </p>

          {/* CTAs */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-white hover:bg-accent-light text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Join the Movement</span>
              <span>→</span>
            </Link>

            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-stroke text-heading hover:border-accent hover:text-accent text-xs font-mono uppercase tracking-wider font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
