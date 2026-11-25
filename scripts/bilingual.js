/* global hexo */

/**
 * 中英双语支持
 *
 * 在文章里这样写：
 *
 *   {% zh %}
 *   中文内容（Markdown）
 *   {% endzh %}
 *
 *   {% en %}
 *   English content (Markdown)
 *   {% enden %}
 *
 * 英文标题写在 front-matter 的 `title_en` 里。页面右上角的按钮负责切换，
 * 选择会记在浏览器里；第一次访问时按浏览器语言决定显示哪种。
 */

'use strict';

const { escapeHTML } = require('hexo-util');

const LANGS = {
  zh: { htmlLang: 'zh-CN', i18n: 'zh-CN' },
  en: { htmlLang: 'en', i18n: 'en' }
};

// ---------- 正文块 ----------

function renderBlock(lang) {
  return function(args, content) {
    let html = hexo.render.renderSync({ text: content, engine: 'markdown' });
    // 英文块的标题 id 和页内锚点都加前缀，避免和中文标题重名，链接也就不会跳到隐藏的那一份
    if (lang === 'en') {
      html = html
        .replace(/(<h[1-6][^>]*\sid=")/g, '$1en-')
        .replace(/(<a[^>]*\shref=")#(?!en-)/g, '$1#en-');
    }
    return `<div class="bi bi-${lang}" lang="${LANGS[lang].htmlLang}"><!--bi:${lang}-->${html}<!--/bi:${lang}--></div>`;
  };
}

Object.keys(LANGS).forEach(lang => {
  hexo.extend.tag.register(lang, renderBlock(lang), { ends: true });
});

// ---------- 模板辅助函数 ----------

// 只取出某种语言的正文，用来分别生成两份目录
hexo.extend.helper.register('bi_part', (html, lang) => {
  if (!html) return html;
  const re = new RegExp(`<!--bi:${lang}-->([\\s\\S]*?)<!--/bi:${lang}-->`, 'g');
  const parts = [];
  let m;
  while ((m = re.exec(html)) !== null) parts.push(m[1]);
  return parts.length ? parts.join('\n') : html;
});

hexo.extend.helper.register('bi_has', html => Boolean(html) && html.includes('<!--bi:'));

// 文章标题：有英文标题时输出两份，由 CSS 只显示当前语言
hexo.extend.helper.register('bi_title', (post, fallback) => {
  const zh = post.title || fallback || '';
  if (!post.title_en) return zh;
  return `<span class="bi-zh">${zh}</span><span class="bi-en">${escapeHTML(post.title_en)}</span>`;
});

// 主题界面文字（菜单、“阅读全文”等）同时输出中英两份
hexo.extend.helper.register('bi__', function(key, ...args) {
  const i18n = hexo.theme.i18n;
  const out = Object.keys(LANGS).map(lang => {
    const text = i18n.__(LANGS[lang].i18n)(key, ...args);
    return `<span class="bi-${lang}">${text}</span>`;
  });
  return out.join('');
});

// ---------- 页面注入：样式、按钮、切换脚本 ----------

const HEAD = `
{%- if page.title_en %}<meta name="bi-title-en" content="{{ page.title_en | escape }} | {{ config.title | escape }}">{%- endif %}
<script>
(function () {
  var lang;
  try { lang = localStorage.getItem('bi-lang'); } catch (e) {}
  if (lang !== 'zh' && lang !== 'en') {
    lang = /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
})();
</script>
<style>
html[data-lang="en"] .bi-zh,
html:not([data-lang="en"]) .bi-en { display: none !important; }
.bi-toggle {
  position: fixed; top: 14px; right: 92px; z-index: 1100;
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border: 1px solid #ddd; border-radius: 999px;
  background: rgba(255, 255, 255, .92); color: #555;
  font-size: 13px; line-height: 1.2; cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .08);
  transition: border-color .2s, color .2s;
}
.bi-toggle:hover, .bi-toggle:focus-visible { border-color: #222; color: #222; outline: none; }
.bi-toggle .bi-opt { opacity: .45; }
.bi-toggle .bi-opt.is-on { opacity: 1; font-weight: 600; }
@media (max-width: 767px) { .bi-toggle { top: auto; bottom: 16px; right: 16px; } }
</style>
`;

const BODY_END = `
<button type="button" class="bi-toggle" aria-label="切换语言 / Switch language" title="切换语言 / Switch language">
  <span class="bi-opt" data-l="zh">中</span><span aria-hidden="true">/</span><span class="bi-opt" data-l="en">EN</span>
</button>
<script>
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.bi-toggle');
  var titleZh = document.title;
  var metaEn = document.querySelector('meta[name="bi-title-en"]');
  var titleEn = metaEn ? metaEn.getAttribute('content') : titleZh;

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
    document.title = lang === 'en' ? titleEn : titleZh;
    btn.querySelectorAll('.bi-opt').forEach(function (el) {
      el.classList.toggle('is-on', el.getAttribute('data-l') === lang);
    });
    btn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
  }

  apply(root.getAttribute('data-lang') === 'en' ? 'en' : 'zh');

  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-lang') === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('bi-lang', next); } catch (e) {}
    apply(next);
    // 正文高度变了，让目录高亮和侧边栏重新计算位置
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
  });
})();
</script>
`;

hexo.extend.filter.register('theme_inject', injects => {
  injects.head.raw('bilingual-head', HEAD, {}, { cache: false });
  injects.bodyEnd.raw('bilingual-body-end', BODY_END, {}, { cache: false });
});
