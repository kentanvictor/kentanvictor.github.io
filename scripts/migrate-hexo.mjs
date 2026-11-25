// Split the Hexo bilingual posts ({% zh %} / {% en %} blocks) into one
// Markdown file per language for the Astro content collections.
// Usage: node scripts/migrate-hexo.mjs <hexo source dir>
import fs from 'node:fs';
import path from 'node:path';
import { slug as githubSlug } from 'github-slugger';

const src = process.argv[2];
if (!src) throw new Error('usage: node scripts/migrate-hexo.mjs <hexo source dir>');
const outRoot = path.resolve('src/content');

const TAG_EN = { 前端: 'Frontend', 后端: 'Backend', Map: 'GIS', git: 'Git', Matlab: 'MATLAB', QT: 'Qt' };
const TAG_ZH = { Map: 'GIS', git: 'Git', Matlab: 'MATLAB', QT: 'Qt' };

function parseFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('no front matter');
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return { data, body: m[2] };
}

function blocks(body, lang) {
  const re = new RegExp(`\\{%\\s*${lang}\\s*%\\}([\\s\\S]*?)\\{%\\s*end${lang}\\s*%\\}`, 'g');
  return [...body.matchAll(re)].map(x => x[1].replace(/\r\n/g, '\n').trim());
}

function slugify(s) {
  return s.toLowerCase().replace(/c\+\+/g, 'cpp').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s.*$/gm, ' ')
    .replace(/^\s*>+\s*/gm, '')
    .replace(/^\s*(?:[-+*]|\d+\.)\s+/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_|]/g, '')
    .replace(/-{3,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function excerpt(md, lang) {
  const t = plainText(md);
  const max = lang === 'zh' ? 90 : 180;
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return (lang === 'en' ? cut.replace(/\s+\S*$/, '') : cut) + '…';
}

// Drop a leading H1 that just repeats the title (the layout already shows it).
function stripLeadingH1(md) {
  return md.replace(/^#\s+[^\n]*\n+/, '');
}

const yamlStr = s => JSON.stringify(s);

function write(dir, slug, fm, body) {
  fs.mkdirSync(dir, { recursive: true });
  const lines = Object.entries(fm)
    .filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && !v.length))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? `[${v.map(yamlStr).join(', ')}]` : typeof v === 'string' ? yamlStr(v) : v}`);
  fs.writeFileSync(path.join(dir, `${slug}.md`), `---\n${lines.join('\n')}\n---\n\n${body}\n`);
}

const postsDir = path.join(src, '_posts');
const report = [];
for (const file of fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))) {
  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(postsDir, file), 'utf8'));
  const zh = blocks(body, 'zh');
  const en = blocks(body, 'en');
  if (!zh.length || zh.length !== en.length) throw new Error(`${file}: zh=${zh.length} en=${en.length}`);
  const slug = slugify(data.title_en || data.title);
  const date = data.date.replace(' ', 'T');
  const tags = (data.tags || data.categories || '').split(/,\s*/).filter(Boolean);
  const legacy = data.date < '2021';
  const hexoUrl = '/' + data.date.slice(0, 10).replace(/-/g, '/') + '/' + path.basename(file, '.md') + '/';
  for (const [lang, parts, title, map] of [['zh', zh, data.title, TAG_ZH], ['en', en, data.title_en || data.title, TAG_EN]]) {
    // Hexo heading ids keep case ("#Kernel-API"); Astro uses GitHub-style ids ("#kernel-api").
    // If a link still misses (e.g. the heading has spaces the link left out), match ignoring hyphens.
    const joined = stripLeadingH1(parts.join('\n\n'));
    const headingIds = new Map(
      [...joined.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m => githubSlug(m[1].trim())).map(id => [id.replace(/-/g, ''), id]),
    );
    const md = joined.replace(/\]\(#([^)\s]+)\)/g, (_, raw) => {
      const id = githubSlug(decodeURIComponent(raw));
      return `](#${headingIds.get(id.replace(/-/g, '')) ?? id})`;
    });
    write(path.join(outRoot, 'blog', lang), slug, {
      title,
      description: excerpt(parts[0], lang),
      date,
      tags: tags.map(t => map[t] || t),
      legacy,
      hexoUrl,
    }, md);
  }
  report.push(`${slug}  (${zh.length} section${zh.length > 1 ? 's' : ''})`);
}

// Standalone pages (About, Mentoring)
for (const name of ['about', 'mentoring']) {
  const { data, body } = parseFrontMatter(fs.readFileSync(path.join(src, name, 'index.md'), 'utf8'));
  for (const [lang, title] of [['zh', data.title], ['en', data.title_en]]) {
    const md = blocks(body, lang).join('\n\n')
      // Internal links get the language prefix used by the new site.
      .replace(/\]\(\/(about|mentoring)\/\)/g, `](/${lang}/$1/)`);
    write(path.join(outRoot, 'pages', lang), name, { title }, md);
  }
  report.push(`page: ${name}`);
}

console.log(report.join('\n'));
console.log(`${report.length} items migrated`);
