# Faith Heroes Africa

A statically generated ministry website and continental archive chronicling stories, testimonies, and timeless legacies of faith heroes transforming nations across Africa.

Built with **React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js**, fed by the WordPress REST API at build time and pre-rendered to pure static HTML via `vite-react-ssg` for deployment on GitHub Pages with a custom domain.

## Changing the Site Identity
To adapt or rebrand this website for another ministry or organization, edit `src/site.config.json` (or `src/site.config.ts`) with your custom name, domain, slug, and copy—all site-specific values are centralized there.

### Founder Portrait
Replace with a verified real photograph at `/public/founder.jpg` and set `founder.photo`; never use AI-generated or stock images.

## Build Flow
1. **Content Ingestion**: `node scripts/fetch-content.mjs`
   - Connects to the WordPress REST API endpoint (`${wpApiUrl}/distribution_site?slug=${slug}`).
   - Fetches all posts belonging to the ministry's distribution site term ID.
   - Normalizes titles, excerpts, reading time, categories, authors, and dates.
   - Downloads all featured images and embedded content images locally to `public/wp-media/` with content hashes.
   - Rewrites image and link paths to pure relative static routes.
   - Generates `src/generated/posts.json`, `public/sitemap.xml`, and `public/robots.txt`.
2. **Static Site Generation**: `vite-react-ssg build`
   - Pre-renders static HTML for every route: `/`, `/blog/`, `/blog/page/:n/`, `/blog/:slug/`, `/category/:slug/`, `/about/`, `/contact/`, and `/404/`.
   - Injects canonical links, OpenGraph metadata, Twitter cards, and Schema.org JSON-LD structured data directly into `<head>`.
3. **Postbuild Step**: `node scripts/postbuild.mjs`
   - Produces `dist/404.html` and ensures `CNAME` and `.nojekyll` are in `dist/`.

## Development Commands
```bash
# Run local development (fetches latest WP content first, then launches Vite dev server)
npm run dev

# Build production static bundle for GitHub Pages
npm run build

# Preview production build locally
npm run preview
```

## GitHub Pages Deployment
A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. When pushed to `main`, repository dispatched with `wordpress_update`, or triggered via cron, it automatically builds and deploys the static files to GitHub Pages.
