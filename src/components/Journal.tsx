import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/blog';

interface JournalProps {
  posts: BlogPost[];
}

export const Journal: React.FC<JournalProps> = ({ posts }) => {
  // Display up to 4 posts in the journal section
  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 4) : [];

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section id="journal" className="bg-white py-20 md:py-28 relative border-b border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header pattern */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/60" />
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                WRITINGS & DEVOTIONALS
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              Recent reflections
            </h2>

            {/* Subtext */}
            <p className="text-muted text-sm md:text-base mt-3 max-w-lg font-light leading-relaxed">
              Equipping believers through thoughtful biblical perspectives on intercession, faith, and spiritual devotion.
            </p>
          </div>

          {/* "View all" button */}
          <div className="hidden md:inline-flex shrink-0">
            <Link
              to="/blog/"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stroke bg-white text-xs font-medium text-heading hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>View all articles</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Journal entries displayed as clean horizontal cards */}
        <div className="flex flex-col gap-3.5">
          {displayPosts.map((post, idx) => {
            const categoryName = post.categories?.[0]?.name || 'Reflections';

            return (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  to={`/blog/${post.slug}/`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 bg-white hover:bg-surface border border-stroke rounded-2xl transition-all duration-300 group cursor-pointer hover:border-accent hover:shadow-xs"
                >
                  {/* Left: Indicator & Title */}
                  <div className="flex items-center gap-4 md:gap-5 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface border border-stroke flex items-center justify-center text-accent shrink-0 group-hover:border-accent transition-colors">
                      <span className="font-mono text-xs font-semibold">0{idx + 1}</span>
                    </div>

                    <div className="min-w-0 pr-2">
                      <h3 className="text-base sm:text-lg md:text-xl font-display italic text-heading group-hover:text-accent transition-colors truncate">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted mt-1 font-mono">
                        <span className="text-accent">{categoryName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date ? post.date.slice(0, 10) : ''}</span>
                        {post.readingTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingTime} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Read CTA arrow */}
                  <div className="hidden sm:flex items-center gap-2 pr-4 shrink-0 text-xs font-mono uppercase tracking-wider text-muted group-hover:text-accent transition-colors">
                    <span>Read</span>
                    <span className="text-accent text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
