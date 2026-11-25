# Zoe Tam — personal site (Astro prototype)

Bilingual personal site and blog. Chinese pages live under `/zh/`, English under `/en/`; `/` sends visitors to the language they used last or their browser's language.

## Commands

Requires Node.js 22.23.4 or newer (Astro 7). GitHub Actions uses the version in `.nvmrc`.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things are

| What | Where |
| --- | --- |
| Blog posts | `src/content/blog/zh/<slug>.md` and `src/content/blog/en/<slug>.md` (same file name in both) |
| About / Mentoring | `src/content/pages/<lang>/about.md`, `mentoring.md` |
| Home page text, menu labels, other UI strings | `src/i18n.ts` |
| Colours, fonts, article styles | `src/styles/global.css` |

## Writing a post

Create the same file name in both language folders:

```md
---
title: "设计一个实时风控规则引擎"
description: "One or two sentences shown in the post list."
date: 2026-12-01
tags: ["System Design", "FinTech"]
---

Post body in Markdown.
```

Posts with `legacy: true` are listed under "Early study notes".

## Re-importing from Hexo

`node scripts/migrate-hexo.mjs ../blog-source/source` splits the Hexo `{% zh %}` / `{% en %}` posts into the two folders. It overwrites files with the same name.
