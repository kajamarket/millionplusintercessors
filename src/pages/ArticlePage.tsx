import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { getPostBySlug, posts } from '../data/posts';
import { siteConfig } from '../site.config';
import { BlogPost } from '../types/blog';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="min-h-screen bg-bg text-text-primary pt-32 pb-20 flex flex-col items-center justify-center px-6">
        <Seo
          title="Article Not Found"
          description="The requested ministry article could not be located."
          path={`/blog/${slug || ''}/`}
        />
        <h1 className="text-4xl font-display italic text-heading mb-4">
          Article Not Found
        </h1>
        <p className="text-muted text-sm mb-8 font-light">
          The article you are looking for has been moved or relocated.
        </p>
        <Link
          to="/blog/"
          className="px-6 py-3 rounded-full bg-surface border border-stroke text-xs text-heading font-medium hover:bg-stroke transition-colors focus-visible:ring-2 focus-visible:ring-accent"
        >
          Return to All Articles
        </Link>
      </div>
    );
  }

  // Find 3 related posts (same category or other recent posts)
  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug)
    .filter((p) =>
      p.categories.some((c) => post.categories.some((pc) => pc.slug === c.slug))
    )
    .slice(0, 3);

  // If fewer than 3, backfill with recent posts
  const finalRelated =
    relatedPosts.length >= 3
      ? relatedPosts
      : [
          ...relatedPosts,
          ...posts
            .filter(
              (p) =>
                p.slug !== post.slug && !relatedPosts.some((rp) => rp.slug === p.slug)
            )
            .slice(0, 3 - relatedPosts.length),
        ];

  const primaryCategory = post.categories?.[0]?.name || 'Ministry';

  // Demote any internal h1 tags to h2 so the page maintains exactly one h1
  const sanitizedContent = (post.contentHtml || '')
    .replace(/<h1(\s|>)/gi, '<h2$1')
    .replace(/<\/h1>/gi, '</h2>');

  return (
    <article className="min-h-screen bg-bg text-text-primary pt-28 pb-16">
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}/`}
        image={post.featuredImage.url}
        type="article"
        article={{
          author: post.author,
          datePublished: post.date,
          dateModified: post.modified || post.date,
          category: primaryCategory,
          tags: post.tags,
        }}
        breadcrumbs={[
          { name: 'Articles', path: '/blog/' },
          ...(post.categories?.[0]
            ? [{ name: post.categories[0].name, path: `/category/${post.categories[0].slug}/` }]
            : []),
          { name: post.title, path: `/blog/${post.slug}/` },
        ]}
      />

      <div className="max-w-[760px] mx-auto px-6 md:px-8">
        {/* Back Link & Category */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stroke/60">
          <Link
            to="/blog/"
            className="inline-flex items-center gap-2 text-xs text-muted hover:text-heading transition-colors font-medium"
          >
            <span>←</span>
            <span>All Articles</span>
          </Link>

          <div className="flex items-center gap-2">
            {post.categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}/`}
                className="text-xs text-accent hover:underline uppercase tracking-wider font-mono font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-heading tracking-tight leading-[1.12] mb-6 font-display italic">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-light border-y border-stroke/40 py-3">
            <span className="text-heading font-medium">{post.author}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{post.date.slice(0, 10)}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{post.readingTime} min read</span>
            {post.modified && post.modified !== post.date && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-muted/70 font-mono">
                  Updated {post.modified.slice(0, 10)}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.url && (
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-surface border border-stroke/70 mb-12 shadow-xl">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Article Content Container: calm editorial reading column */}
        <div
          className="article-content space-y-6 text-base md:text-lg leading-relaxed text-text-primary/90 font-light [&>p]:leading-relaxed [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-display [&>h2]:italic [&>h2]:text-heading [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-medium [&>h3]:text-heading [&>h3]:mt-8 [&>h3]:mb-3 [&>blockquote]:border-l-2 [&>blockquote]:border-accent [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-heading [&>blockquote]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>img]:rounded-2xl [&>img]:border [&>img]:border-stroke [&>img]:my-8 [&>figure]:my-8 [&>figcaption]:text-xs [&>figcaption]:text-muted [&>figcaption]:mt-2 [&>a]:text-heading [&>a]:underline [&>a]:underline-offset-4 [&>a]:decoration-accent [&>a]:hover:text-accent"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-stroke/60 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted uppercase tracking-wider font-mono mr-2">
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted bg-surface px-3 py-1 rounded-full border border-stroke"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share & Connect Desk */}
        <div className="mt-12 p-8 rounded-3xl bg-surface/50 border border-stroke/70 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-heading mb-1">
              {siteConfig.name}
            </h3>
            <p className="text-xs text-muted max-w-sm">
              {siteConfig.description}
            </p>
          </div>

          <Link
            to="/contact/"
            className="px-6 py-2.5 rounded-full bg-accent text-white hover:bg-accent-light text-xs font-mono uppercase tracking-wider font-medium transition-colors whitespace-nowrap shrink-0 shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
          >
            Connect With Ministry →
          </Link>
        </div>

        {/* Related Posts */}
        {finalRelated.length > 0 && (
          <section className="mt-20 pt-12 border-t border-stroke/60">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-accent/60" />
              <h2 className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
                RELATED STORIES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {finalRelated.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}/`}
                  className="group flex flex-col p-5 rounded-2xl bg-surface/40 border border-stroke/70 hover:bg-surface hover:border-accent/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-bg mb-4 border border-stroke/80">
                    <img
                      src={rel.featuredImage.url}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] text-accent font-mono uppercase tracking-wider mb-1">
                    {rel.date.slice(0, 10)} · {rel.readingTime} min read
                  </span>
                  <h3 className="text-sm font-display italic text-heading group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-24">
        <ContactFooter />
      </div>
    </article>
  );
};

// SSG static paths generation for all blog posts
export async function getStaticPaths() {
  return posts.map((p: BlogPost) => `/blog/${p.slug}/`);
}
