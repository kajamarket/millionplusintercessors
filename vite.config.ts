import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    ssgOptions: {
      dirStyle: 'nested',
      mock: true,
      async includedRoutes(paths) {
        const postsFile = path.resolve(__dirname, 'src/generated/posts.json');
        let posts = [];
        try {
          if (fs.existsSync(postsFile)) {
            posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
          }
        } catch {
          posts = [];
        }

        const allRoutes = new Set([
          '/',
          '/blog/',
          '/about/',
          '/contact/',
          '/404/',
          ...paths,
        ]);

        const totalPages = Math.max(1, Math.ceil(posts.length / 9));
        for (let i = 1; i <= totalPages; i++) {
          allRoutes.add(`/blog/page/${i}/`);
        }

        for (const post of posts) {
          allRoutes.add(`/blog/${post.slug}/`);
        }

        for (const post of posts) {
          for (const cat of post.categories || []) {
            if (cat.slug) {
              allRoutes.add(`/category/${cat.slug}/`);
            }
          }
        }

        return Array.from(allRoutes);
      },
    },
  };
});
