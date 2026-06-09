import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// EN is served at the root (/), FR at /fr/, IT at /it/.
// Update `site` to the real deployed URL before going live.
export default defineConfig({
  site: 'https://ux-design-giuliabedini.com',
  i18n: {
    locales: ['en', 'fr', 'it'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
