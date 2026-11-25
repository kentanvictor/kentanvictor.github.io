import { getCollection, type CollectionEntry } from 'astro:content';
import { slug } from 'github-slugger';
import type { Lang } from './i18n';

/** "C&C++" -> "cc", "Computer Vision" -> "computer-vision", "前端" -> "前端" */
export const tagSlug = (tag: string) => slug(tag) || 'tag';
export const tagHref = (lang: Lang, tag: string) => `/${lang}/tags/${tagSlug(tag)}/`;

export type Post = CollectionEntry<'blog'>;

/** "zh/some-post" -> "some-post" */
export const postSlug = (post: Post) => post.id.split('/').slice(1).join('/');
export const postLang = (post: Post) => post.id.split('/')[0] as Lang;
export const postHref = (post: Post) => `/${postLang(post)}/blog/${postSlug(post)}/`;

export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection('blog', (p) => postLang(p) === lang);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
