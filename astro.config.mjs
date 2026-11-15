// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site until the custom domain (lacuisinedeclement.fr) is connected.
// When the domain is live: set SITE_URL=https://lacuisinedeclement.fr and BASE_PATH=/ in the workflow.
const site = process.env.SITE_URL ?? 'https://benpomme.github.io';
const base = process.env.BASE_PATH ?? '/Clement';

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
