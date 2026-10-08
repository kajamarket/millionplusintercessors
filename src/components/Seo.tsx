import React from 'react';
import { Head } from 'vite-react-ssg';
import {
  buildMeta,
  buildGraph,
  ArticleGraphData,
  BreadcrumbItem,
} from '../seo/seo';
import { siteConfig } from '../site.config';

export interface SeoProps {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  article?: ArticleGraphData;
  breadcrumbs?: BreadcrumbItem[];
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = siteConfig.description,
  path,
  image,
  type = 'website',
  pageType,
  article,
  breadcrumbs,
}) => {
  const meta = buildMeta({
    title,
    description,
    path,
    image,
    type,
  });

  const graph = buildGraph({
    title: title || siteConfig.name,
    description: meta.description,
    path,
    image: meta.ogImage,
    type,
    pageType,
    article,
    breadcrumbs,
  });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />
      <link rel="icon" type="image/png" href="/faithheroes_original_logo_center-removebg-preview.png" />
      <link rel="apple-touch-icon" href="/faithheroes_original_logo_center-removebg-preview.png" />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:url" content={meta.ogUrl} />
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:image" content={meta.ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:title" content={meta.twitterTitle} />
      <meta name="twitter:description" content={meta.twitterDescription} />
      <meta name="twitter:image" content={meta.twitterImage} />

      {/* Single Unified Schema.org @graph JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(graph)}
      </script>
    </Head>
  );
};
