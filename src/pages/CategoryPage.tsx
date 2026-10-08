import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { getPostsByCategory, getAllCategories } from '../data/posts';
import { siteConfig } from '../site.config';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const categoryPosts = getPostsByCategory(slug || '');
  const categories = getAllCategories();
  const currentCategory = categories.find((c) => c.slug === slug);
  const categoryName = currentCategory ? currentCategory.name : (slug || 'Category');

  return (
    <div className="min-h-screen bg-bg text-text-primary pt-28 pb-16">
      <Seo
        title={`${categoryName} Stories`}
        description={`Read ministry articles and stories categorized under ${categoryName} on ${siteConfig.name}.`}
        path={`/category/${slug || ''}/`}
        type="website"
        pageType="CollectionPage"
        breadcrumbs={[
          { name: 'Articles', path: '/blog/' },
          { name: categoryName, path: `/category/${slug || ''}/` },
        ]}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
              CATEGORY STORIES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-heading tracking-tight mb-4">
            <span className="font-display italic font-normal">{categoryName}</span> stories
          </h1>

          <p className="text-muted text-sm md:text-base max-w-xl font-light leading-relaxed">
            Exploring stories, leadership insights, and reflections filed under {categoryName}.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            <Link
              to="/blog/"
              className="px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-surface/70 text-muted hover:text-heading hover:bg-surface border border-stroke/70 transition-colors"
            >
              All Articles
            </Link>
            {categories.map((cat) => {
              const isActive = cat.slug === slug;
              return (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}/`}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white shadow-sm'
                      : 'bg-surface/70 text-muted hover:text-heading hover:bg-surface border border-stroke/70'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Posts List */}
        {categoryPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface/40 border border-stroke/70">
            <p className="text-muted text-sm font-light">No articles currently published in this category.</p>
            <Link
              to="/blog/"
              className="inline-block mt-4 px-6 py-2.5 rounded-full bg-accent text-white hover:bg-accent-light hover:text-black text-xs font-mono uppercase tracking-wider font-medium transition-colors"
            >
              View All Articles
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-16">
            {categoryPosts.map((post, idx) => (
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
                  <div className="flex items-center gap-4 md:gap-6 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-stroke group-hover:border-accent transition-colors bg-surface">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding={idx === 0 ? 'sync' : 'async'}
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
            ))}
          </div>
        )}
      </div>

      <div className="mt-20">
        <ContactFooter />
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const categories = getAllCategories();
  return categories.map((c) => `/category/${c.slug}/`);
}
