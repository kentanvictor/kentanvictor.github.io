export const LANGS = ['zh', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const SITE = {
  name: 'Zoe Tam',
  linkedin: 'https://www.linkedin.com/in/tanzhuo/',
  github: 'https://github.com/kentanvictor',
  email: 'kentanvictor@foxmail.com',
};

export const ui = {
  zh: {
    htmlLang: 'zh-CN',
    langName: '中文',
    nav: { home: '首页', blog: '博客', about: '关于我', mentoring: '辅导服务' },
    switchTo: 'EN',
    switchLabel: 'Switch to English',
    themeLabel: '切换深色模式',
    tagline: '软件工程师 · 后端 / 系统设计 / GIS / 金融科技 / AI',
    siteDescription:
      '约 5 年经验的软件工程师，专注后端开发、系统设计、GIS 与金融科技风控。技术文章、项目复盘与 SDE 求职辅导。',
    hero: {
      eyebrow: '软件工程师 · 求职导师',
      title: '把复杂的业务，做成可靠的系统。',
      lead: '我有约 5 年软件研发经验，做过金融科技风控、GIS 地理空间系统和行业数字化转型。现在也帮助工程师准备 SDE 求职、系统设计面试和模拟面试。',
      primary: '预约求职辅导',
      secondary: '阅读博客',
    },
    facts: [
      { value: '~5 年', label: '软件研发与企业级项目经验' },
      { value: '3 个领域', label: '金融科技 · GIS · 能源数字化' },
      { value: 'MSc', label: '伯明翰大学 人工智能与计算机科学' },
    ],
    workTitle: '我做什么',
    work: [
      { icon: 'shield', title: '金融科技风控系统', text: '在阿联酋头部 AI 科技集团的生态内，做金融风控系统的后端研发。' },
      { icon: 'globe', title: 'GIS 地理空间', text: '地理空间数据处理与 GIS 平台研发，参与过大型机构的项目。' },
      { icon: 'layers', title: '后端与系统设计', text: '用 Python、Java、SQL 搭建可扩展、好维护的后端服务。' },
      { icon: 'compass', title: '产品与数字化转型', text: '以产品经理身份，完成能源企业数字化转型的方案设计与交付。' },
    ],
    mentor: {
      title: 'SDE 求职辅导',
      text: '不背题，而是帮你把真实做过的项目讲清楚、讲出深度。',
      items: ['简历与项目经历优化', '项目深挖与追问演练', '系统设计面试框架', '模拟技术面试与书面反馈'],
      cta: '了解辅导服务',
    },
    latest: '最新文章',
    allPosts: '全部文章',
    blog: {
      title: '博客',
      lead: '关于后端、系统设计、GIS、金融科技与 AI 应用的技术笔记和项目复盘。',
      recent: '文章',
      legacy: '早期学习笔记',
      legacyNote: '2016 到 2020 年，我从 C、Java、Android 起步时写的学习笔记，保留下来作为成长记录。',
      legacyBanner: '这是一篇早期学习笔记，写于',
      legacyBannerTail: '，部分内容可能已经过时。',
      back: '返回博客',
      toc: '目录',
      minutes: (n: number) => `${n} 分钟阅读`,
      ctaTitle: '在准备 SDE 求职？',
      ctaText: '我提供简历优化、系统设计面试和模拟面试辅导。',
    },
    tags: {
      title: '标签',
      lead: '按主题浏览全部文章。',
      count: (n: number) => `${n} 篇`,
      tagged: (tag: string) => `标签：${tag}`,
      all: '全部标签',
    },
    footer: '保留所有权利',
    notFound: '页面不存在',
    dateLocale: 'zh-CN',
  },
  en: {
    htmlLang: 'en',
    langName: 'English',
    nav: { home: 'Home', blog: 'Blog', about: 'About', mentoring: 'Mentoring' },
    switchTo: '中文',
    switchLabel: '切换到中文',
    themeLabel: 'Toggle dark mode',
    tagline: 'Software Engineer · Backend / System Design / GIS / FinTech / AI',
    siteDescription:
      'Software engineer with ~5 years of experience in backend development, system design, GIS and FinTech risk systems. Technical writing, project write-ups and SDE career mentoring.',
    hero: {
      eyebrow: 'Software Engineer · Career Mentor',
      title: 'I turn complex business problems into reliable systems.',
      lead: 'I have about five years of experience building FinTech risk systems, GIS platforms and industry digital transformation projects. I also help engineers prepare for SDE roles, system design interviews and mock interviews.',
      primary: 'Book mentoring',
      secondary: 'Read the blog',
    },
    facts: [
      { value: '~5 yrs', label: 'Software and enterprise project experience' },
      { value: '3 domains', label: 'FinTech · GIS · Energy digitalisation' },
      { value: 'MSc', label: 'AI & Computer Science, University of Birmingham' },
    ],
    workTitle: 'What I work on',
    work: [
      { icon: 'shield', title: 'FinTech risk systems', text: 'Backend development of financial risk systems within a leading AI technology group in the UAE.' },
      { icon: 'globe', title: 'GIS & geospatial', text: 'Geospatial data processing and GIS platforms for projects at large organisations.' },
      { icon: 'layers', title: 'Backend & system design', text: 'Scalable, maintainable backend services with Python, Java and SQL.' },
      { icon: 'compass', title: 'Product & transformation', text: 'Led solution design and delivery of a digital transformation project for an energy company as product manager.' },
    ],
    mentor: {
      title: 'SDE career mentoring',
      text: 'Not memorised answers: I help you explain what you have actually built, clearly and in depth.',
      items: ['Resume and project review', 'Project deep-dive practice', 'System design interview framework', 'Mock interviews with written feedback'],
      cta: 'See mentoring',
    },
    latest: 'Latest writing',
    allPosts: 'All posts',
    blog: {
      title: 'Blog',
      lead: 'Notes and project write-ups on backend engineering, system design, GIS, FinTech and AI applications.',
      recent: 'Posts',
      legacy: 'Early study notes',
      legacyNote: 'Notes I wrote from 2016 to 2020 while starting out with C, Java and Android, kept as a record of where I began.',
      legacyBanner: 'This is an early study note from',
      legacyBannerTail: '. Some of it may be out of date.',
      back: 'Back to blog',
      toc: 'On this page',
      minutes: (n: number) => `${n} min read`,
      ctaTitle: 'Preparing for an SDE role?',
      ctaText: 'I offer resume reviews, system design coaching and mock interviews.',
    },
    tags: {
      title: 'Tags',
      lead: 'Browse all posts by topic.',
      count: (n: number) => (n === 1 ? '1 post' : `${n} posts`),
      tagged: (tag: string) => `Tagged “${tag}”`,
      all: 'All tags',
    },
    footer: 'All rights reserved',
    notFound: 'Page not found',
    dateLocale: 'en-GB',
  },
} as const;

export function otherLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}

/** The same page in the other language. */
export function switchPath(pathname: string, lang: Lang): string {
  const prefix = new RegExp(`^/${lang}(?=/|$)`);
  return prefix.test(pathname) ? pathname.replace(prefix, `/${otherLang(lang)}`) : `/${otherLang(lang)}/`;
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(ui[lang].dateLocale, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function readingMinutes(body: string, lang: Lang): number {
  const text = body.replace(/```[\s\S]*?```/g, ' ');
  const units = lang === 'zh' ? (text.match(/[一-鿿]/g) || []).length / 400 + (text.match(/[A-Za-z]+/g) || []).length / 220 : (text.match(/\S+/g) || []).length / 220;
  return Math.max(1, Math.round(units));
}
