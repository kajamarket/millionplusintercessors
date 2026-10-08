import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig } from '../site.config';
import { BlogPost } from '../types/blog';

// Minimalist Ministry SVG Icons
const IntercessionIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    <path d="M16 6V26M10 12H22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="16" cy="12" r="2.5" fill="#114B32" />
  </svg>
);

const UnityIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="11" cy="16" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <circle cx="21" cy="16" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <circle cx="16" cy="16" r="2" fill="#114B32" />
  </svg>
);

const DiscipleshipIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="7" y="6" width="18" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
    <line x1="11" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="11" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <line x1="11" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path d="M21 6V15L23 13L25 15V6" fill="#114B32" />
  </svg>
);

const NationsIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
    <ellipse cx="16" cy="16" rx="6" ry="12" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    <line x1="4" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
    <circle cx="16" cy="16" r="2" fill="#114B32" />
  </svg>
);

const TestimonyIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path
      d="M16 5C17.5 8.5 20.5 11.5 21.5 15C23 19 20.5 24 16 25C11.5 24 9 19 10.5 15C11.5 11.5 14.5 8.5 16 5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="2.5" fill="#114B32" />
  </svg>
);

const GeneralStoriesIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect x="6.5" y="6" width="19" height="20" rx="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 11H21M11 15H21M11 19H17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <circle cx="21" cy="19" r="1.5" fill="#114B32" />
  </svg>
);

interface CategoryItem {
  title: string;
  description: string;
  slug: string;
  Icon: React.FC<{ className?: string }>;
}

const CATEGORY_CARDS: CategoryItem[] = [
  {
    title: 'Intercession & Prayer',
    description: 'Teachings, biblical foundations, and reflections on standing in the gap before God.',
    slug: 'intercession',
    Icon: IntercessionIcon,
  },
  {
    title: 'Unity in Prayer',
    description: 'Believers standing together in persistent corporate prayer across churches and communities.',
    slug: 'unity',
    Icon: UnityIcon,
  },
  {
    title: 'Prayer for Nations',
    description: 'Fervent prayer for community peace, national righteousness, and spiritual renewal.',
    slug: 'nations',
    Icon: NationsIcon,
  },
  {
    title: 'Christian Discipleship',
    description: 'Nurturing spiritual depth, devotional disciplines, and godly character.',
    slug: 'discipleship',
    Icon: DiscipleshipIcon,
  },
  {
    title: 'Inspiring Articles',
    description: 'Documented stories of faith, perseverance, and God’s faithfulness.',
    slug: 'inspiring-articles',
    Icon: TestimonyIcon,
  },
  {
    title: 'General Stories',
    description: 'Biblical reflections, devotionals, and ministry perspectives.',
    slug: 'uncategorized',
    Icon: GeneralStoriesIcon,
  },
];

interface CategoryCarouselProps {
  posts?: BlogPost[];
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const config = siteConfig.categoriesSection;

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  if (!config) {
    return null;
  }

  return (
    <section
      id="category-collections"
      className="relative bg-white py-20 md:py-28 border-b border-stroke/50"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/70" />
              <span className="text-muted text-xs tracking-[0.25em] font-medium uppercase font-mono">
                {config.label || 'AREAS OF FOCUS & TEACHING'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              {config.heading}
            </h2>

            {config.intro && (
              <p className="text-muted text-sm md:text-base mt-4 font-light leading-relaxed">
                {config.intro}
              </p>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono uppercase tracking-wider text-muted hidden sm:inline-block">
              {config.promptDesktop || 'EXPLORE A TOPIC →'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                aria-label="Scroll topics backward"
                className="w-10 h-10 rounded-full border border-stroke bg-white flex items-center justify-center text-muted hover:text-heading hover:border-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                aria-label="Scroll topics forward"
                className="w-10 h-10 rounded-full border border-stroke bg-white flex items-center justify-center text-muted hover:text-heading hover:border-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Snap Carousel */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          ref={containerRef}
          className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 select-none focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Topics carousel"
        >
          {CATEGORY_CARDS.map((cat, idx) => {
            const { Icon } = cat;

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="snap-start shrink-0 w-[290px] sm:w-[380px] md:w-[420px]"
              >
                <Link
                  to={`/category/${cat.slug}/`}
                  className="group relative flex flex-row items-center justify-between h-full min-h-[140px] p-5 sm:p-6 rounded-2xl bg-white text-text-primary border border-stroke shadow-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-accent"
                >
                  {/* Left Icon */}
                  <div className="shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent">
                      <Icon className="w-6 h-6 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Center info */}
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-3 h-[1.5px] bg-accent" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                        FOCUS AREA
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-display italic text-heading tracking-tight leading-[1.2] mb-1.5 group-hover:text-accent transition-colors truncate">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-muted font-light leading-snug line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  {/* Right Arrow */}
                  <div className="shrink-0 flex items-center pl-2 border-l border-stroke">
                    <div className="w-8 h-8 rounded-full bg-surface text-muted flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
