import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [tailwind(), mdx(), svelte(), sitemap()],
  site: 'https://xiaoyu-site.pages.dev',
});
