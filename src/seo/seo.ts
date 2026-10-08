import { siteConfig } from '../site.config';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface ArticleGraphData {
  author: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
  tags?: string[];
}

export interface BuildMetaOptions {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
}

export interface BuildGraphOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage';
  article?: ArticleGraphData;
  breadcrumbs?: BreadcrumbItem[];
}

export interface MetaOutput {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogType: 'website' | 'article';
  twitterCard: 'summary_large_image';
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

/**
 * Returns an absolute URL using siteConfig.domain.
 * Enforces trailing slashes for directory paths, omitting them for files with extensions.
 */
export function absUrl(inputPath: string): string {
  if (!inputPath) return `https://${siteConfig.domain}/`;
  if (inputPath.startsWith('http://') || inputPath.startsWith('https://')) {
    return inputPath;
  }

  const clean = inputPath.startsWith('/') ? inputPath : `/${inputPath}`;

  // If path ends with a known file extension, do not append trailing slash
  const hasExtension = /\.[a-zA-Z0-9]{2,5}$/.test(clean);
  if (hasExtension) {
    return `https://${siteConfig.domain}${clean}`;
  }

  const withTrailingSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return `https://${siteConfig.domain}${withTrailingSlash}`;
}

/**
 * Builds standardized meta tags for HTML header.
 */
export function buildMeta(options: BuildMetaOptions): MetaOutput {
  const { title, description, path, image, type = 'website' } = options;

  let pageTitle = '';
  const isHome = !title || path === '/' || path === '' || title === siteConfig.name;

  if (isHome) {
    pageTitle = `${siteConfig.name} — ${siteConfig.tagline}`;
  } else {
    // Pattern: Page title | Site name, max about 60 characters before brand
    const preBrandTitle = title.length > 60 ? `${title.slice(0, 57).trim()}...` : title;
    pageTitle = `${preBrandTitle} | ${siteConfig.name}`;
  }

  // Trim description to max 160 characters
  const rawDesc = description || siteConfig.description;
  const trimmedDesc = rawDesc.length > 160 ? `${rawDesc.slice(0, 157).trim()}...` : rawDesc;

  const canonical = absUrl(path);
  const imageUrl = image ? absUrl(image) : absUrl(siteConfig.defaultOgImage);

  return {
    title: pageTitle,
    description: trimmedDesc,
    canonical,
    ogTitle: pageTitle,
    ogDescription: trimmedDesc,
    ogUrl: canonical,
    ogImage: imageUrl,
    ogType: type,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: trimmedDesc,
    twitterImage: imageUrl,
  };
}

/**
 * Builds a single unified Schema.org @graph JSON-LD structure.
 */
export function buildGraph(options: BuildGraphOptions): object {
  const {
    title,
    description,
    path,
    image,
    type = 'website',
    pageType,
    article,
    breadcrumbs,
  } = options;

  const canonical = absUrl(path);
  const imageUrl = image ? absUrl(image) : absUrl(siteConfig.defaultOgImage);
  const orgId = `https://${siteConfig.domain}/#organization`;
  const websiteId = `https://${siteConfig.domain}/#website`;
  const webpageId = `${canonical}#webpage`;

  const graph: any[] = [];

  // 1. Organization
  const organizationNode: any = {
    '@type': 'Organization',
    '@id': orgId,
    name: siteConfig.name,
    url: absUrl('/'),
    logo: absUrl(siteConfig.defaultOgImage),
  };

  if (siteConfig.social && siteConfig.social.length > 0) {
    const validSocial = siteConfig.social
      .map((s) => s.href)
      .filter((h) => typeof h === 'string' && h.startsWith('http'));
    if (validSocial.length > 0) {
      organizationNode.sameAs = validSocial;
    }
  }

  if (siteConfig.contactEmail) {
    organizationNode.contactPoint = {
      '@type': 'ContactPoint',
      email: siteConfig.contactEmail,
      contactType: 'editorial',
    };
  }

  graph.push(organizationNode);

  // 2. WebSite
  const webSiteNode: any = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: absUrl('/'),
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': orgId,
    },
    inLanguage: 'en',
  };

  graph.push(webSiteNode);

  // 3. WebPage (or CollectionPage, AboutPage, ContactPage)
  const resolvedPageType =
    pageType ||
    (path === '/'
      ? 'WebPage'
      : path === '/about/' || path === '/about'
      ? 'AboutPage'
      : path === '/contact/' || path === '/contact'
      ? 'ContactPage'
      : path.startsWith('/blog') || path.startsWith('/category')
      ? type === 'article'
        ? 'ItemPage'
        : 'CollectionPage'
      : 'WebPage');

  const pageNode: any = {
    '@type': resolvedPageType,
    '@id': webpageId,
    url: canonical,
    name: title,
    description: description.length > 160 ? description.slice(0, 160).trim() : description,
    isPartOf: {
      '@id': websiteId,
    },
    inLanguage: 'en',
  };

  graph.push(pageNode);

  // 4. Article (on article pages)
  if (type === 'article' && article) {
    const articleNode: any = {
      '@type': 'Article',
      '@id': `${canonical}#article`,
      headline: title,
      description: description.length > 160 ? description.slice(0, 160).trim() : description,
      image: imageUrl,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      mainEntityOfPage: {
        '@id': webpageId,
      },
      publisher: {
        '@id': orgId,
      },
    };

    if (article.author) {
      articleNode.author = {
        '@type': 'Person',
        name: article.author,
      };
    }

    if (article.category) {
      articleNode.articleSection = article.category;
    }

    if (article.tags && article.tags.length > 0) {
      articleNode.keywords = article.tags.join(', ');
    }

    graph.push(articleNode);
  }

  // 5. BreadcrumbList (every page except home)
  if (path !== '/' && path !== '' && breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbItems = [
      { name: 'Home', path: '/' },
      ...breadcrumbs,
    ];

    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absUrl(item.path),
      })),
    };

    graph.push(breadcrumbNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
