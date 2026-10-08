import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { posts, getAllCategories } from '../data/posts';
import { siteConfig } from '../site.config';

const POSTS_PER_PAGE = 9;

export const BlogListPage: React.FC = () => {
  const { n } = useParams<{ n?: string }>();
  const currentPage = n ? parseInt(n, 10) || 1 : 1;

  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const categories = getAllCategories();

  const canonicalPath = currentPage === 1 ? '/blog/' : `/blog/page/${currentPage}/`;
  const pageTitle = currentPage === 1 ? 'Articles' : `Articles — Page ${currentPage}`;

  return (
    <div className="min-h-screen bg-bg text-text-primary pt-28 pb-16">
      <Seo
        title={pageTitle}
        description={`Explore articles, teachings, and spiritual reflections from ${siteConfig.name}. Equipping believers in prayer, faith, and intercession.`}
        path={canonicalPath}
        type="website"
        pageType="CollectionPage"
        breadcrumbs={
          currentPage === 1
            ? [{ name: 'Articles', path: '/blog/' }]
            : [
                { name: 'Articles', path: '/blog/' },
                { name: `Page ${currentPage}`, path: `/blog/page/${currentPage}/` },
              ]
        }
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
              WRITINGS & REFLECTIONS
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-heading tracking-tight mb-4">
            Articles & <span className="font-display italic font-normal">teachings</span>
          </h1>

          <p className="text-muted text-sm md:text-base max-w-xl font-light leading-relaxed">
            Spiritual perspectives, biblical reflections, and devotionals to encourage your walk of prayer and discipleship.
          </p>

          {/* Category Filter Tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-8">
              <Link
                to="/blog/"
                className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-accent text-white shadow-sm"
              >
                All Articles ({totalPosts})
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}/`}
                  className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-surface/70 text-muted hover:text-heading hover:bg-surface border border-stroke/70 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Articles List using journal pill style */}
        <div className="flex flex-col gap-4 mb-16">
          {currentPosts.map((post, idx) => {
            const categoryName = post.categories?.[0]?.name || 'General';

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link
                  to={`/blog/${post.slug}/`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 md:p-5 bg-surface/40 hover:bg-surface border border-stroke/70 rounded-[28px] sm:rounded-full transition-all duration-300 group cursor-pointer hover:border-accent/60 hover:shadow-sm"
                >
                  {/* Left: Thumbnail & Title */}
                  <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke group-hover:border-accent transition-colors bg-surface">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        loading={idx === 0 && currentPage === 1 ? 'eager' : 'lazy'}
                        decoding={idx === 0 && currentPage === 1 ? 'sync' : 'async'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="min-w-0 pr-2">
                      <h2 className="text-base sm:text-lg md:text-xl font-display italic text-heading group-hover:text-accent transition-colors truncate">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-muted mt-1 font-light font-mono">
                        <span className="text-accent">{categoryName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.date.slice(0, 10)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Date & Arrow */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pl-18 sm:pl-0 pr-2 sm:pr-4">
                    <span className="text-xs text-muted font-mono tracking-wider">
                      {post.date.slice(0, 10)}
                    </span>

                    <div className="w-9 h-9 rounded-full bg-surface border border-stroke/70 flex items-center justify-center text-muted group-hover:text-heading group-hover:border-accent transition-all duration-300">
                      <span className="text-sm leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-accent">
                        ↗
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-8 border-t border-stroke/50">
            {currentPage > 1 && (
              <Link
                to={currentPage === 2 ? '/blog/' : `/blog/page/${currentPage - 1}/`}
                className="px-5 py-2 rounded-full border border-stroke bg-surface hover:bg-stroke text-xs text-heading transition-colors"
              >
                ← Previous Page
              </Link>
            )}

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isCurrent = p === currentPage;
                const path = p === 1 ? '/blog/' : `/blog/page/${p}/`;
                return (
                  <Link
                    key={p}
                    to={path}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-colors ${
                      isCurrent
                        ? 'bg-accent text-white font-bold'
                        : 'text-muted hover:text-heading hover:bg-surface'
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}
            </div>

            {currentPage < totalPages && (
              <Link
                to={`/blog/page/${currentPage + 1}/`}
                className="px-5 py-2 rounded-full border border-stroke bg-surface hover:bg-stroke text-xs text-heading transition-colors"
              >
                Next Page →
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="mt-20">
        <ContactFooter />
      </div>
    </div>
  );
};
