// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: 'https://rvlanjewar.in', // Updated with your actual domain
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
      filter: (page) => !page.includes('/api'),
    })
  ],
  output: 'server', // Changed from 'static' to 'hybrid' to support API routes
  adapter: cloudflare(),
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  compressHTML: true,
  vite: {
    build: {
      // Remove lightningcss minification to avoid Vercel deployment issues
      // Use default CSS minifier instead
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
});