import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read site config
const configPath = path.join(rootDir, 'src', 'site.config.json');
if (!fs.existsSync(configPath)) {
  console.error(`Error: Site config not found at ${configPath}`);
  process.exit(1);
}
const siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const { name, domain, slug, wpApiUrl, defaultOgImage } = siteConfig;

console.log(`[fetch-content] Starting content fetch for: ${name} (${slug})`);
console.log(`[fetch-content] WordPress API: ${wpApiUrl}`);

// Ensure directories exist
const generatedDir = path.join(rootDir, 'src', 'generated');
const publicMediaDir = path.join(rootDir, 'public', 'wp-media');
const publicDir = path.join(rootDir, 'public');

fs.mkdirSync(generatedDir, { recursive: true });
fs.mkdirSync(publicMediaDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
}

function stripHtml(html) {
  if (!html) return '';
  return decodeHtmlEntities(html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim());
}

function hashUrl(url) {
  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname) || '.jpg';
    const cleanExt = (ext.split('?')[0].slice(0, 5) || '.jpg').toLowerCase();
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
    return `${hash}${cleanExt}`;
  } catch {
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 12);
    return `${hash}.jpg`;
  }
}

const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 FaithHeroes/1.0',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
};

function tryFallbackToCachedPosts(reason) {
  const postsJsonPath = path.join(generatedDir, 'posts.json');
  if (fs.existsSync(postsJsonPath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(postsJsonPath, 'utf-8'));
      if (Array.isArray(cached) && cached.length > 0) {
        console.warn(`[fetch-content] ${reason}. Successfully falling back to cached posts (${cached.length} articles).`);
        const allCatSlugs = Array.from(
          new Set(
            cached.flatMap((p) => (p.categories || []).map((c) => c.slug)).filter(Boolean)
          )
        );
        writeOutputs(cached, allCatSlugs);
        return true;
      }
    } catch (e) {
      console.warn(`[fetch-content] Could not parse cached posts:`, e.message);
    }
  }

  if (process.env.ALLOW_EMPTY === '1') {
    console.warn(`[fetch-content] ${reason}. ALLOW_EMPTY=1 set. Writing empty posts fallback.`);
    writeOutputs([], []);
    return true;
  }

  return false;
}

async function downloadMedia(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return null;
  const filename = hashUrl(url);
  const dest = path.join(publicMediaDir, filename);

  if (fs.existsSync(dest)) {
    return `/wp-media/${filename}`;
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': REQUEST_HEADERS['User-Agent'] },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.warn(`[fetch-content] Warning: failed to download image ${url} (${res.status})`);
      return null;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    return `/wp-media/${filename}`;
  } catch (err) {
    console.warn(`[fetch-content] Warning: failed to download image ${url}:`, err.message);
    return null;
  }
}

async function run() {
  // Step B: Get term ID for distribution_site slug
  const termUrl = `${wpApiUrl}/distribution_site?slug=${encodeURIComponent(slug)}`;
  console.log(`[fetch-content] Fetching term ID from: ${termUrl}`);

  let termRes;
  try {
    termRes = await fetch(termUrl, {
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(15000),
    });
  } catch (err) {
    console.error(`[fetch-content] Error connecting to WP API:`, err.message);
    if (tryFallbackToCachedPosts(`Connection error: ${err.message}`)) {
      return;
    }
    process.exit(1);
  }

  if (!termRes.ok) {
    console.error(`[fetch-content] Term request failed with status: ${termRes.status}`);
    if (tryFallbackToCachedPosts(`Term request status: ${termRes.status}`)) {
      return;
    }
    process.exit(1);
  }

  let terms;
  try {
    terms = await termRes.json();
  } catch (err) {
    if (tryFallbackToCachedPosts(`Invalid JSON from term endpoint: ${err.message}`)) {
      return;
    }
    process.exit(1);
  }

  if (!Array.isArray(terms) || terms.length === 0) {
    console.error(`[fetch-content] ERROR: No distribution_site term found for slug "${slug}"`);
    if (tryFallbackToCachedPosts(`No distribution_site term found for slug "${slug}"`)) {
      return;
    }
    process.exit(1);
  }

  const termId = terms[0].id;
  console.log(`[fetch-content] Found distribution_site "${terms[0].name}" with ID: ${termId}`);

  // Step C: Fetch all posts looping through pages
  const rawPosts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const postsUrl = `${wpApiUrl}/posts?distribution_site=${termId}&_embed&per_page=100&page=${page}`;
    console.log(`[fetch-content] Fetching posts page ${page}: ${postsUrl}`);

    let res;
    try {
      res = await fetch(postsUrl, {
        headers: REQUEST_HEADERS,
        signal: AbortSignal.timeout(15000),
      });
    } catch (err) {
      console.error(`[fetch-content] Network error fetching posts page ${page}:`, err.message);
      if (tryFallbackToCachedPosts(`Network error on posts page ${page}`)) {
        return;
      }
      process.exit(1);
    }

    if (!res.ok) {
      console.error(`[fetch-content] Failed fetching posts page ${page}: ${res.status}`);
      if (tryFallbackToCachedPosts(`HTTP error ${res.status} on posts page ${page}`)) {
        return;
      }
      process.exit(1);
    }

    const headerTotalPages = res.headers.get('x-wp-totalpages');
    if (headerTotalPages) {
      totalPages = parseInt(headerTotalPages, 10) || 1;
    }

    let data;
    try {
      data = await res.json();
    } catch (err) {
      if (tryFallbackToCachedPosts(`Failed parsing JSON on page ${page}`)) {
        return;
      }
      process.exit(1);
    }

    if (Array.isArray(data)) {
      rawPosts.push(...data);
    }

    page++;
  }

  console.log(`[fetch-content] Total raw posts fetched for term ${termId}: ${rawPosts.length}`);

  if (rawPosts.length === 0) {
    console.log(`[fetch-content] 0 posts found for distribution_site ${slug} (${termId}). Fetching recent articles from WP API...`);
    try {
      const fallbackUrl = `${wpApiUrl}/posts?_embed&per_page=6`;
      const fallbackRes = await fetch(fallbackUrl, {
        headers: REQUEST_HEADERS,
        signal: AbortSignal.timeout(15000),
      });
      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (Array.isArray(fallbackData) && fallbackData.length > 0) {
          rawPosts.push(...fallbackData);
          console.log(`[fetch-content] Successfully fetched ${rawPosts.length} recent articles from WP API.`);
        }
      }
    } catch (err) {
      console.warn(`[fetch-content] Could not fetch fallback articles:`, err.message);
    }
  }

  if (rawPosts.length === 0) {
    if (tryFallbackToCachedPosts('0 raw posts returned by API')) {
      return;
    }
    console.warn(`[fetch-content] Warning: 0 posts found and no cache. Continuing with empty array.`);
    writeOutputs([], []);
    return;
  }

  const knownSlugs = new Set(rawPosts.map((p) => p.slug));
  const wpDomain = new URL(wpApiUrl).hostname;

  // Step D & E: Normalize each post
  const normalizedPosts = [];
  const allCategoriesMap = new Map();

  for (const p of rawPosts) {
    const title = decodeHtmlEntities(p.title?.rendered || 'Untitled');
    const rawExcerpt = p.excerpt?.rendered || '';
    const excerpt = stripHtml(rawExcerpt) || stripHtml(p.content?.rendered || '').slice(0, 160);

    // Author
    let authorName = 'Million Plus Intercessors';
    if (p._embedded?.author?.[0]?.name) {
      authorName = decodeHtmlEntities(p._embedded.author[0].name);
    }

    // Categories
    const categories = [];
    const embeddedTerms = p._embedded?.['wp:term'] || [];
    for (const termGroup of embeddedTerms) {
      if (Array.isArray(termGroup)) {
        for (const term of termGroup) {
          if (term.taxonomy === 'category') {
            const cat = {
              name: decodeHtmlEntities(term.name),
              slug: term.slug,
            };
            categories.push(cat);
            if (!allCategoriesMap.has(cat.slug)) {
              allCategoriesMap.set(cat.slug, cat.name);
            }
          }
        }
      }
    }

    // Fallback category if none
    if (categories.length === 0) {
      categories.push({ name: 'Stories of Faith', slug: 'stories' });
      allCategoriesMap.set('stories', 'Stories of Faith');
    }

    // Tags
    const tags = [];
    for (const termGroup of embeddedTerms) {
      if (Array.isArray(termGroup)) {
        for (const term of termGroup) {
          if (term.taxonomy === 'post_tag') {
            tags.push(decodeHtmlEntities(term.name));
          }
        }
      }
    }

    // Featured image & media details
    let featuredImageUrl = '';
    let featuredImageAlt = title;
    let featuredWidth = undefined;
    let featuredHeight = undefined;

    const mediaObj = p._embedded?.['wp:featuredmedia']?.[0];
    if (mediaObj?.source_url) {
      featuredImageUrl = mediaObj.source_url;
      if (mediaObj.alt_text) featuredImageAlt = decodeHtmlEntities(mediaObj.alt_text);
      if (mediaObj.media_details?.width) featuredWidth = mediaObj.media_details.width;
      if (mediaObj.media_details?.height) featuredHeight = mediaObj.media_details.height;
    } else if (p.yoast_head_json?.og_image?.[0]?.url) {
      featuredImageUrl = p.yoast_head_json.og_image[0].url;
      if (p.yoast_head_json.og_image[0].width) featuredWidth = p.yoast_head_json.og_image[0].width;
      if (p.yoast_head_json.og_image[0].height) featuredHeight = p.yoast_head_json.og_image[0].height;
    }

    let localFeaturedImage = null;
    if (featuredImageUrl) {
      localFeaturedImage = await downloadMedia(featuredImageUrl);
    }

    const featuredImage = {
      url: localFeaturedImage || defaultOgImage || '/og-default.jpg',
      alt: featuredImageAlt || title,
      ...(featuredWidth ? { width: featuredWidth } : {}),
      ...(featuredHeight ? { height: featuredHeight } : {}),
    };

    // Process content HTML
    let contentHtml = p.content?.rendered || '';

    // Download and rewrite images in contentHtml
    const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi;
    const imgReplacements = [];

    let match;
    while ((match = imgRegex.exec(contentHtml)) !== null) {
      const fullTag = match[0];
      const beforeSrc = match[1];
      const srcUrl = match[2];
      const afterSrc = match[3];

      imgReplacements.push({ fullTag, beforeSrc, srcUrl, afterSrc });
    }

    for (const item of imgReplacements) {
      const localSrc = await downloadMedia(item.srcUrl);
      const finalSrc = localSrc || item.srcUrl;

      // Clean attributes: strip srcset, sizes
      let restAttrs = `${item.beforeSrc} ${item.afterSrc}`
        .replace(/\bsrcset=["'][^"']*["']/gi, '')
        .replace(/\bsizes=["'][^"']*["']/gi, '')
        .replace(/\s+/g, ' ')
        .trim();

      // Ensure loading="lazy" and decoding="async"
      if (!restAttrs.includes('loading=')) {
        restAttrs += ' loading="lazy"';
      }
      if (!restAttrs.includes('decoding=')) {
        restAttrs += ' decoding="async"';
      }

      // Check if width/height already present in restAttrs, otherwise attempt from mediaObj
      if (!restAttrs.includes('width=') && mediaObj?.media_details?.width) {
        restAttrs += ` width="${mediaObj.media_details.width}"`;
      }
      if (!restAttrs.includes('height=') && mediaObj?.media_details?.height) {
        restAttrs += ` height="${mediaObj.media_details.height}"`;
      }

      const newImgTag = `<img src="${finalSrc}" ${restAttrs}>`;
      contentHtml = contentHtml.replace(item.fullTag, newImgTag);
    }

    // Step F: Rewrite links inside contentHtml pointing to WordPress domain
    const linkRegex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*?>([\s\S]*?)<\/a>/gi;
    contentHtml = contentHtml.replace(linkRegex, (fullMatch, href, linkText) => {
      try {
        if (href.includes(wpDomain)) {
          for (const s of knownSlugs) {
            if (href.includes(`/${s}/`) || href.endsWith(`/${s}`)) {
              return `<a href="/blog/${s}/">${linkText}</a>`;
            }
          }
          return linkText;
        }
      } catch {
        // keep match if URL error
      }
      return fullMatch;
    });

    // Word count & reading time
    const wordCount = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    normalizedPosts.push({
      id: p.id,
      slug: p.slug,
      title,
      excerpt,
      contentHtml,
      date: p.date,
      modified: p.modified || p.date,
      author: authorName,
      featuredImage,
      categories,
      tags,
      readingTime,
    });
  }

  // Sort newest first
  normalizedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Print fetched post titles
  console.log(`\n========================================`);
  console.log(`FETCHED ARTICLES FOR ${name.toUpperCase()}:`);
  normalizedPosts.forEach((post, i) => {
    console.log(`  ${i + 1}. [${post.slug}] "${post.title}" (${post.date.slice(0, 10)}) - ${post.readingTime} min read`);
  });
  console.log(`========================================\n`);

  writeOutputs(normalizedPosts, Array.from(allCategoriesMap.keys()));
}

function writeOutputs(posts, categorySlugs) {
  // Write posts.json
  const postsJsonPath = path.join(generatedDir, 'posts.json');
  fs.writeFileSync(postsJsonPath, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`[fetch-content] Wrote ${posts.length} posts to ${postsJsonPath}`);

  // Write robots.txt: User-agent: *, Allow: /, and the Sitemap: line. Nothing else.
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: https://${domain}/sitemap.xml\n`;
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
  console.log(`[fetch-content] Wrote robots.txt referencing https://${domain}/sitemap.xml`);

  // Write sitemap.xml: omit <priority> and <changefreq>, use accurate <lastmod> (ISO date)
  const newestDate = posts[0]?.modified?.slice(0, 10) || new Date().toISOString().slice(0, 10);

  const urls = [
    { loc: `https://${domain}/`, lastmod: newestDate },
    { loc: `https://${domain}/blog/`, lastmod: newestDate },
    { loc: `https://${domain}/about/`, lastmod: newestDate },
    { loc: `https://${domain}/contact/`, lastmod: newestDate },
  ];

  // Articles
  for (const post of posts) {
    urls.push({
      loc: `https://${domain}/blog/${post.slug}/`,
      lastmod: post.modified?.slice(0, 10) || post.date?.slice(0, 10) || newestDate,
    });
  }

  // Categories with newest post date in that category
  for (const catSlug of categorySlugs) {
    const catPosts = posts.filter((p) => p.categories.some((c) => c.slug === catSlug));
    const catDate = catPosts[0]?.modified?.slice(0, 10) || newestDate;
    urls.push({
      loc: `https://${domain}/category/${catSlug}/`,
      lastmod: catDate,
    });
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf-8');
  console.log(`[fetch-content] Wrote sitemap.xml with ${urls.length} indexable URLs to ${sitemapPath}`);
}

run().catch((err) => {
  console.error('[fetch-content] Fatal error:', err);
  process.exit(1);
});
