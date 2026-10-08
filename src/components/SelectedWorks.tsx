import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/blog';
import { siteConfig } from '../site.config';

interface SelectedWorksProps {
  posts: BlogPost[];
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ posts }) => {
  const config = siteConfig.featuredArchive;
  const heading = config?.heading || 'Spiritual insights and teachings.';
  const intro =
    config?.intro ||
    'Discover recent articles, devotionals, and reflections from our ministry network to strengthen your prayer life.';

  // If no posts are available, fail gracefully
  if (!posts || posts.length === 0) {
    return null;
  }

  // Display between 3 to 6 posts in a clean multi-column layout
  const displayPosts = posts.slice(0, 6);

  return (
    <section id="articles" className="bg-white py-20 md:py-28 relative border-b border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-accent/60" />
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                {config?.label || 'RECENT WRITINGS & ARTICLES'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-heading tracking-tight leading-[1.15]">
              {heading}
            </h2>

            <p className="text-muted text-sm md:text-base mt-3 max-w-xl font-light leading-relaxed">
              {intro}
            </p>
          </div>

          <div className="hidden md:inline-flex shrink-0">
            <Link
              to="/blog/"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stroke bg-white text-xs font-medium text-heading hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Explore all articles</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Multi-column Grid (3 columns on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch">
          {displayPosts.map((post, idx) => {
            const imageUrl = post.featuredImage?.url || '/og-default.jpg';
            const categoryName = post.categories?.[0]?.name || 'Reflections';

            return (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-stroke hover:border-accent transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <Link to={`/blog/${post.slug}/`} className="flex flex-col h-full">
                  {/* Featured Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface">
                    <img
                      src={imageUrl}
                      alt={post.featuredImage?.alt || post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/95 text-accent border border-stroke font-semibold">
                        {categoryName}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Date & Reading time */}
                      <div className="flex items-center gap-2 text-xs text-muted mb-2.5 font-mono">
                        <span>{post.date ? post.date.slice(0, 10) : ''}</span>
                        {post.readingTime && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingTime} min read</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-display italic text-heading tracking-tight mb-3 group-hover:text-accent transition-colors leading-[1.25] line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-text-primary/75 font-light leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read Article Link */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-accent font-semibold pt-4 border-t border-stroke">
                      <span>Read Article</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stroke bg-white text-xs font-mono uppercase tracking-wider font-semibold text-heading hover:border-accent hover:text-accent transition-colors"
          >
            <span>Explore all articles →</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
