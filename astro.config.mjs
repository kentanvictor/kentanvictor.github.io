import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkBreaks from 'remark-breaks';

export default defineConfig({
  site: 'https://kentanvictor.github.io',
  integrations: [
    sitemap({
      // Only the real pages; the redirect pages for old Hexo addresses stay out.
      filter: (page) => /^https:\/\/kentanvictor\.github\.io\/(zh|en)\//.test(page),
      i18n: { defaultLocale: 'zh', locales: { zh: 'zh-CN', en: 'en' } },
    }),
  ],
  markdown: {
    // remark pipeline: the Hexo posts were written with single line breaks
    // rendered as <br>, which the default Sätteri processor cannot do.
    processor: unified({ remarkPlugins: [remarkBreaks] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
