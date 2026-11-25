import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { LANGS, SITE, ui, type Lang } from '../../i18n';
import { getPosts, postHref } from '../../posts';

export function getStaticPaths() {
  return LANGS.map((lang) => ({ params: { lang } }));
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as Lang;
  const posts = await getPosts(lang);
  return rss({
    title: `${SITE.name} · ${ui[lang].nav.blog}`,
    description: ui[lang].siteDescription,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      categories: post.data.tags,
      link: postHref(post),
    })),
    customData: `<language>${ui[lang].htmlLang}</language>`,
  });
}
