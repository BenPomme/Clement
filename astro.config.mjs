// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served by GitHub Pages on the custom domain clementcuisine.fr (set in Settings › Pages).
const site = process.env.SITE_URL ?? 'https://clementcuisine.fr';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(merci|og|mentions-legales|confidentialite)\/$/.test(page),
      i18n: undefined,
    }),
  ],
  image: { layout: 'constrained' },
  devToolbar: { enabled: false },
});
