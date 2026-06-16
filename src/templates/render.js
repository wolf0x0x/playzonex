const site = require("../data/site");

const nav = [
  ["home", "/", "Home"],
  ["online", "/online-games/", "Online Games"],
  ["roblox", "/roblox/", "Roblox"],
  ["minecraft", "/minecraft/", "Minecraft"],
  ["steam", "/steam/", "Steam"],
  ["edu", "/blooket/", "Edu Games"],
  ["gear", "/gear/", "Gear"]
];

const icon = (name) => {
  const icons = {
    search: '<path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="8"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.8-1.6l8-10A1 1 0 0 1 13 3v7h7a1 1 0 0 1 .8 1.6l-8 10A1 1 0 0 1 11 21v-7z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.8 1.2 6.9-6.2-3.3L5.8 21 7 14.1 2 9.3l6.9-1z"/>',
    play: '<path d="M6 4.5v15l13-7.5z"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M5 5H3v2a4 4 0 0 0 4 4M19 5h2v2a4 4 0 0 1-4 4"/>',
    puzzle: '<path d="M19 13v5a2 2 0 0 1-2 2h-5v-3a2 2 0 1 0-4 0v3H5a2 2 0 0 1-2-2v-5h3a2 2 0 1 0 0-4H3V6a2 2 0 0 1 2-2h4a2 2 0 1 1 4 0h4a2 2 0 0 1 2 2v3h-3a2 2 0 1 0 0 4z"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
    crosshair: '<circle cx="12" cy="12" r="7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V8a3 3 0 0 1 3-3h6M18 8v8a3 3 0 0 1-3 3H9"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    orbit: '<circle cx="12" cy="12" r="3"/><path d="M4.2 19.8c-2-2 1-8.3 6.7-14s12-8.7 14-6.7-1 8.3-6.7 14-12 8.7-14 6.7Z" transform="scale(.8) translate(3 3)"/>'
  };
  return `<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.star}</svg>`;
};

const esc = (text = "") => String(text)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const layout = (page, body) => {
  const searchIndex = [
    ...site.games.map((g) => ({ title: g.title, tags: g.category, url: `/game/${g.slug}/` })),
    ...site.pages.filter((p) => p.path !== "/").map((p) => ({ title: p.title.replace(" - PlayZoneX", ""), tags: p.nav, url: p.path }))
  ];
  const navLinks = nav.map(([key, href, label]) => `<a class="${page.nav === key ? "active" : ""}" href="${href}">${label}</a>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": page.type === "detail" ? "VideoGame" : "WebPage",
    name: page.title,
    description: page.desc,
    url: `https://playzonex.xyz${page.path}`
  };
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.desc)}">
  <link rel="canonical" href="https://playzonex.xyz${page.path}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.desc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://playzonex.xyz${page.path}">
  <meta property="og:image" content="${site.images.arcade}">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <header class="topbar">
    <div class="container nav-inner">
      <a class="brand" href="/">PlayZoneX.xyz</a>
      <nav class="nav" aria-label="Primary">${navLinks}</nav>
      <div class="actions">
        <a class="icon-btn" href="/online-games/" aria-label="Search">${icon("search")}</a>
        <button class="menu-btn" data-menu aria-label="Open navigation">${icon("menu")}</button>
        <a class="btn" href="/gear/">Join Now</a>
      </div>
    </div>
    <nav class="mobile-nav" data-mobile-nav aria-label="Mobile">${navLinks}</nav>
  </header>
  ${body}
  ${footer()}
  <script>window.PlayZoneXSearch=${JSON.stringify(searchIndex)};</script>
  <script src="/assets/main.js" defer></script>
</body>
</html>`;
};

const ad = (label = "Advertisement 728 x 90") => `<div class="ad">${label}</div>`;

const footer = () => `<footer class="footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="/">PlayZoneX.xyz</a>
      <p>一个面向全球休闲玩家的免费在线游戏发现、攻略与推荐站。所有外部游戏均跳转官方平台，不嵌入版权游戏内容。</p>
    </div>
    <div><strong>Games</strong><a href="/online-games/">Online Games</a><a href="/online-games/action/">Action</a><a href="/online-games/puzzle/">Puzzle</a></div>
    <div><strong>Guides</strong><a href="/roblox/">Roblox</a><a href="/minecraft/">Minecraft</a><a href="/blooket/">Blooket</a></div>
    <div><strong>Steam</strong><a href="/steam/free-games/">Free Games</a><a href="/steam/deals/">Deals</a><a href="/gear/">Gear</a></div>
    <div><strong>Company</strong><a href="/about/">About</a><a href="/wordle/">Wordle</a><a href="/roblox/codes/">Codes</a></div>
  </div>
</footer>`;

const gameCard = (game) => `<article class="card" data-game-card data-category="${game.category}" data-rating="${game.rating}" data-plays="${game.plays}" data-title="${esc(game.title)}">
  <a href="/game/${game.slug}/">
    <div class="card-img"><img src="${game.image}" alt="${esc(game.title)} screenshot" loading="lazy"></div>
    <div class="card-body">
      <div class="meta">${game.tags.map((tag, i) => `<span class="badge ${i ? "" : "orange"}">${esc(tag)}</span>`).join("")}<span>★ ${game.rating}</span><span>${game.plays} plays</span></div>
      <h3>${esc(game.title)}</h3>
      <p>${categoryName(game.category)} · 官方游玩入口、玩法亮点和相似推荐。</p>
    </div>
  </a>
</article>`;

const categoryName = (slug) => site.categories.find((c) => c.slug === slug)?.title || slug;

const heroSearch = () => `<div class="search-wrap">
  <input class="search-input" data-search placeholder="搜索游戏、攻略、兑换码..." autocomplete="off">
  <button class="search-submit" aria-label="Search">${icon("search")}</button>
  <div class="suggestions" data-suggestions></div>
</div>`;

const home = () => `<main>
  <section class="hero" style="--hero:url('${site.images.arcade}')">
    <div class="hero-content">
      <div class="eyebrow">Free Games · Guides · Deals</div>
      <h1>发现你的下一款最爱游戏</h1>
      <p class="lead">10,000+ 免费在线游戏 | Roblox 攻略 | Minecraft 模组 | Steam 免费游戏 | Wordle 与 Blooket 技巧</p>
      ${heroSearch()}
      <div class="chips">${["Poki", "Crazy Games", "Roblox", "Minecraft", "Steam", "Wordle"].map((x) => `<a class="chip" href="/online-games/">${x}</a>`).join("")}</div>
    </div>
  </section>
  <section class="section container">
    <div class="section-head"><div><div class="eyebrow">Categories</div><h2>热门分类</h2></div><p>按玩法快速进入，所有卡片都连接到可索引的伪静态分类页。</p></div>
    <div class="grid cols-4">${site.categories.slice(0, 8).map((c) => `<a class="card" href="/online-games/${c.slug}/"><div class="card-body"><div class="meta">${icon(c.icon)}<span>${c.count}+ games</span></div><h3>${c.title}</h3><p>${c.desc}</p></div></a>`).join("")}</div>
  </section>
  <section class="section container">
    <div class="section-head"><div><div class="eyebrow">Today Picks</div><h2>今日推荐</h2></div><a class="btn secondary" href="/online-games/">查看全部</a></div>
    <div class="grid cols-4">${site.games.slice(0, 4).map(gameCard).join("")}</div>
  </section>
  <section class="section container">${ad()}</section>
  <section class="section container">
    <div class="section-head"><div><div class="eyebrow">Guides</div><h2>攻略速递</h2></div><p>覆盖 Roblox 兑换码、Minecraft 服务器、Steam 折扣与教育游戏技巧。</p></div>
    <div class="grid cols-3">${[...site.robloxGuides.slice(0, 2), ...site.minecraftPages.slice(0, 1)].map((g) => guideCard(g, g.slug === "servers" ? "/minecraft/servers/" : `/roblox/${g.slug}/`)).join("")}</div>
  </section>
  <section class="section container"><div class="panel"><div class="section-head"><div><div class="eyebrow">Gear</div><h2>找到你的完美游戏装备</h2></div><a class="btn orange" href="/gear/">查看推荐</a></div></div></section>
</main>`;

const guideCard = (g, href) => `<a class="card" href="${href}"><div class="card-img"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div><div class="card-body"><span class="badge">Guide</span><h3>${g.title}</h3><p>${g.kicker}</p></div></a>`;

const pageHero = (title, desc, image, eyebrow = "PlayZoneX") => `<section class="page-hero container">
  <div class="page-title">
    <div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>
    <div class="hero-media"><img src="${image}" alt="${esc(title)}" loading="eager"></div>
  </div>
</section>`;

const cleanTitle = (title) => title.replace(" - PlayZoneX", "");

const lobby = (active) => {
  const list = active ? site.games.filter((g) => g.category === active) : site.games;
  return `<main>
    ${pageHero(active ? categoryName(active) : "在线游戏大厅", active ? site.categories.find((c) => c.slug === active).desc : "10,000+ 免费游戏，无需下载，即点即玩。每张卡片都指向官方平台或详情页，合规推荐不嵌入版权内容。", site.images.arcade, "Online Games")}
    <section class="section container">
      ${ad()}
      <div class="filters" style="margin-top:32px"><button class="filter active" data-filter="all">全部</button>${site.categories.map((c) => `<button class="filter" data-filter="${c.slug}">${c.title}</button>`).join("")}</div>
      <div class="toolbar"><div class="meta">正在展示 ${list.length} 款精选游戏</div><select class="select" data-sort><option value="title">按名称</option><option value="rating">评分最高</option><option value="plays">最热</option></select></div>
      <div class="grid cols-4" data-game-grid>${list.map(gameCard).join("")}</div>
      <div style="text-align:center;margin-top:28px"><button class="btn secondary">加载更多</button></div>
    </section>
  </main>`;
};

const roblox = () => `<main>
  ${pageHero("Roblox 攻略中心", "热门游戏攻略、兑换码、皮肤获取和趋势数据，面向轻量查询与长期 SEO 内容沉淀。", site.images.roblox, "Roblox Hub")}
  <section class="section container">
    <div class="stats"><div class="stat"><strong>71.5M</strong>日活玩家</div><div class="stat"><strong>4.2M</strong>在线峰值</div><div class="stat"><strong>+18%</strong>热门玩法增长</div><div class="stat"><strong>Hourly</strong>趋势更新</div></div>
  </section>
  <section class="section container"><div class="section-head"><div><div class="eyebrow">Guides</div><h2>热门攻略</h2></div><a class="btn" href="/roblox/codes/">兑换码汇总</a></div><div class="grid cols-3">${site.robloxGuides.map((g) => guideCard(g, `/roblox/${g.slug}/`)).join("")}</div></section>
</main>`;

const minecraft = () => `<main>
  ${pageHero("Minecraft 专区", "模组推荐、服务器状态、建筑教程、地图种子和指令大全。", site.images.minecraft, "Minecraft Station")}
  <section class="section container"><div class="split"><div class="grid cols-2">${site.minecraftPages.map((g) => guideCard(g, `/minecraft/${g.slug}/`)).join("")}</div><aside class="panel"><h3>服务器快照</h3>${serverTable()}<a class="btn secondary" href="/minecraft/servers/">查看服务器列表</a></aside></div></section>
</main>`;

const steam = () => `<main>
  ${pageHero("Steam 推荐", "免费游戏、折扣追踪、新品评测和适合休闲玩家的低门槛选择。", site.images.steam, "Steam Deals")}
  <section class="section container"><div class="grid cols-2">${site.steamPages.map((g) => guideCard(g, `/steam/${g.slug}/`)).join("")}</div></section>
</main>`;

const guide = (page) => `<main>
  ${pageHero(page.guide.title, page.guide.kicker, page.guide.image, "Guide")}
  <section class="section container"><div class="split"><article class="panel"><h2>核心内容</h2>${articleBlocks(page.guide.title)}${faq(page.guide.title)}</article><aside class="panel">${ad("Advertisement 300 x 250")}<h3>相关入口</h3>${relatedLinks(page.nav)}</aside></div></section>
</main>`;

const articleBlocks = (title) => `<p>${title} 页面围绕玩家最常见的问题组织：入门路线、每日优先级、常见误区、资源链接和可持续更新的数据模块。</p>
<h3>快速上手</h3><p>先确认你的目标：休闲体验、效率提升、收集进度或竞技排名。PlayZoneX 会把关键步骤拆成可执行清单，并保留官方平台入口。</p>
<h3>更新策略</h3><p>页面支持由本地脚本或 GitHub Actions 更新 JSON 数据，API 不可用时降级显示缓存内容，避免空白页影响 SEO。</p>`;

const faq = (title) => `<h3>常见问题</h3><details open><summary>${title} 多久更新？</summary><p>核心数据按每日或每 4 小时更新，攻略内容按活动和版本变化维护。</p></details><details><summary>是否直接提供游戏下载？</summary><p>不提供。本站只做导航、攻略与推荐，游戏入口跳转官方平台。</p></details>`;

const relatedLinks = (navKey) => {
  const links = nav.filter(([key]) => key === navKey || ["online", "gear", "about"].includes(key));
  return links.map(([, href, label]) => `<a class="btn secondary" style="margin:6px 6px 6px 0" href="${href}">${label}</a>`).join("");
};

const codes = (page) => `<main>
  ${pageHero(cleanTitle(page.title), page.desc, site.images.cyber, "Roblox Codes")}
  <section class="section container"><div class="split"><div class="panel"><h2>当前兑换码</h2>${site.codes.map((c) => `<div class="code-row"><div><strong>${c.code}</strong><div class="meta">${c.reward} · <span class="status ${c.status}">${c.status}</span></div></div><button class="copy-code" data-copy="${c.code}">复制</button></div>`).join("")}</div><aside class="panel">${ad("Advertisement 300 x 250")}<p>兑换码需以游戏内实际可用状态为准，过期码会保留短期历史记录。</p></aside></div></section>
</main>`;

const serverTable = () => `<table class="table"><thead><tr><th>Server</th><th>Version</th><th>Players</th><th>Status</th></tr></thead><tbody>${site.servers.map((s) => `<tr><td><strong>${s.name}</strong><div class="meta">${s.address}</div></td><td>${s.version}</td><td>${s.players}</td><td><span class="status ${s.status}">${s.status}</span></td></tr>`).join("")}</tbody></table>`;

const servers = (page) => `<main>
  ${pageHero(cleanTitle(page.title), page.desc, site.images.minecraft, "Live Status")}
  <section class="section container"><div class="toolbar"><div class="meta">数据来源: Minecraft Server Status API | 更新: <span data-server-updated>${new Date().toISOString().slice(0, 10)}</span></div><button class="btn" data-refresh-servers>刷新状态</button></div><div class="panel">${serverTable()}</div></section>
</main>`;

const steamList = (page) => `<main>
  ${pageHero(cleanTitle(page.title), page.desc, page.guide.image, "Steam")}
  <section class="section container"><div class="grid cols-3">${site.games.slice(0, 6).map((g, i) => `<article class="card"><div class="card-img"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div><div class="card-body"><span class="badge ${i % 2 ? "" : "green"}">${i % 2 ? "-${30 + i * 8}%" : "Free"}</span><h3>${g.title}</h3><p>评价 ${g.rating}/5 · 适合周末试玩与愿望单追踪。</p><a class="btn secondary" rel="sponsored" href="https://store.steampowered.com/">前往 Steam</a></div></article>`).join("")}</div></section>
</main>`;

const blooket = (page) => `<main>
  ${pageHero(cleanTitle(page.title), page.desc, page.guide.image, "Edu Games")}
  <section class="section container"><div class="grid cols-3">${["Gold Quest", "Tower Defense", "Cafe"].map((mode, i) => `<article class="card"><div class="card-body"><span class="badge">${mode}</span><h3>${mode} 模式技巧</h3><p>优先掌握题目节奏、道具时机和课堂组队策略，适合学生与教师快速上手。</p><progress value="${70 + i * 8}" max="100" style="width:100%"></progress></div></article>`).join("")}</div></section>
</main>`;

const wordle = (page) => `<main>
  ${pageHero(cleanTitle(page.title), page.desc, page.guide.image, "Daily Puzzle")}
  <section class="section container"><div class="split"><article class="panel"><h2>今日提示</h2><p>提示 1：包含一个常见元音。</p><p>提示 2：不是复数形式。</p><p>提示 3：可以作为动词使用。</p><button class="btn" data-reveal-wordle>显示答案</button><p data-wordle-answer hidden><strong>CRANE</strong> 是演示答案；正式运营时由每日同步脚本更新。</p></article><aside class="panel"><h3>推荐开局词</h3><p>CRANE、SLATE、ADIEU、ROAST 可覆盖高频字母。</p>${ad("Advertisement 300 x 250")}</aside></div></section>
</main>`;

const gear = () => `<main>
  ${pageHero("游戏设备推荐", "针对在线小游戏、Roblox、Minecraft 与 Steam 休闲玩家的高性价比设备清单。", site.images.gear, "Affiliate Gear")}
  <section class="section container"><div class="grid cols-3">${site.gear.map((g) => `<article class="card"><div class="card-img"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div><div class="card-body"><span class="badge orange">${g.price}</span><h3>${g.title}</h3><p>${g.spec}</p><a class="btn secondary" rel="sponsored" href="https://www.amazon.com/">查看参考</a></div></article>`).join("")}</div></section>
</main>`;

const about = () => `<main>
  ${pageHero("关于 PlayZoneX", "PlayZoneX 是一个静态优先的游戏导航与攻略站，专注合规外链、清晰分类和可持续更新。", site.images.arcade, "About")}
  <section class="section container"><div class="panel"><h2>内容原则</h2><p>我们不直接嵌入第三方版权游戏，不托管未授权资源，只提供官方入口、攻略、分类与设备推荐。数据由公开 API、手动维护 JSON 和定时任务组合更新。</p><h3>技术架构</h3><p>纯 HTML/CSS/Vanilla JS 静态页，GitHub Pages 可直接部署；构建脚本生成 sitemap、robots、manifest 和所有伪静态目录。</p></div></section>
</main>`;

const detail = (page) => {
  const g = page.game;
  return `<main class="container">
    <section class="detail-hero">
      <div class="play-cover"><img src="${g.image}" alt="${esc(g.title)}"><div class="play-overlay"><a class="play-circle" href="${g.officialUrl}" rel="nofollow noopener">${icon("play")}</a></div></div>
      <aside class="panel"><div class="eyebrow">Game Detail</div><h1>${g.title}</h1><div class="meta"><span class="badge orange">免费</span><span>★ ${g.rating}</span><span>${g.plays} plays</span></div><p>${categoryName(g.category)} 游戏推荐。点击播放按钮将前往官方平台游玩。</p><a class="btn" href="${g.officialUrl}" rel="nofollow noopener">前往官方游玩</a><a class="btn secondary" href="/online-games/${g.category}/">查看更多同类</a></aside>
    </section>
    <section class="section">${ad()}<div class="section-head"><div><div class="eyebrow">Similar</div><h2>相似游戏</h2></div></div><div class="grid cols-4">${site.games.filter((x) => x.slug !== g.slug).slice(0, 4).map(gameCard).join("")}</div></section>
  </main>`;
};

const renderBody = (page) => {
  if (page.type === "home") return home();
  if (page.type === "lobby") return lobby();
  if (page.type === "category") return lobby(page.category);
  if (page.type === "roblox") return roblox();
  if (page.type === "minecraft") return minecraft();
  if (page.type === "steam") return steam();
  if (page.type === "codes") return codes(page);
  if (page.type === "servers") return servers(page);
  if (page.type === "steam-list") return steamList(page);
  if (page.type === "blooket") return blooket(page);
  if (page.type === "wordle") return wordle(page);
  if (page.type === "gear") return gear();
  if (page.type === "about") return about();
  if (page.type === "detail") return detail(page);
  return guide(page);
};

const renderPage = (page) => layout(page, renderBody(page));

module.exports = { renderPage };
