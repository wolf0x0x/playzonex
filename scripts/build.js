const fs = require("fs");
const path = require("path");
const site = require("../src/data/site");
const { renderPage, LANGUAGES, pageUrl, __, translateDataForLang } = require("../src/templates/render");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const ADS_TXT = process.env.PLAYZONEX_ADS_TXT || "google.com, pub-8695398658548679, DIRECT, f08c47fec0942fa0";

const rm = (target) => {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
};
const mkdir = (dir) => fs.mkdirSync(dir, { recursive: true });
const write = (file, content) => {
  mkdir(path.dirname(file));
  fs.writeFileSync(file, content);
};
const copyDir = (from, to) => {
  mkdir(to);
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (entry.name === ".DS_Store") continue;
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else fs.copyFileSync(src, dst);
  }
};

const esc = (text = "") => String(text)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

// 各语区独立的 SEO/GEO 元数据配置
const seoConfigs = {
  en: { title: "PlayZoneX - Free Online Games & Unblocked Web Games", desc: "Discover and play the best free online games, unblocked games, and popular web games on PlayZoneX. No download required!" },
  es: { title: "PlayZoneX - Juegos Online Gratis y Juegos Desbloqueados", desc: "Descubre los mejores juegos online gratis y juegos de navegador sin descargar en PlayZoneX. ¡Juega ahora!" },
  pt: { title: "PlayZoneX - Jogos Online Grátis e Jogos de Navegador", desc: "Os melhores jogos online grátis e jogos sem download estão no PlayZoneX. Divirta-se com jogos de ação, quebra-cabeça e mais." },
  fr: { title: "PlayZoneX - Jeux Gratuits en Ligne sans Téléchargement", desc: "Jouez aux meilleurs jeux gratuits en ligne et jeux débloqués sur PlayZoneX. Des centaines de jeux par navigateur pour vous." },
  de: { title: "PlayZoneX - Kostenlose Online Spiele & Browsergames", desc: "Spielen Sie die besten kostenlosen Online-Spiele und unblockierten Browsergames auf PlayZoneX ohne Download." },
  ja: { title: "PlayZoneX - 無料オンラインゲーム | 登録不要のブラウザゲーム", desc: "PlayZoneXで最高の無料オンラインゲーム、ブラウザゲームを見つけよう。ダウンロードなしで今すぐプレイ！" },
  zh: { title: "PlayZoneX - 免费在线游戏平台 | 网页免下载游戏大全", desc: "PlayZoneX 汇集全球高品质免费页游、免下载在线小游戏、益智及动作动作游戏。点击即玩，顺畅不卡顿。" }
};

// 各语区 GEO 本地化高频搜索关键词
const geoKeywords = {
  en: "free online games, unblocked games for school, play web games no download, poki games, y8 games, cool math games",
  es: "juegos online gratis, juegos de navegador gratis, juegos sin descargar, unblocked, juegos desbloqueados",
  pt: "jogos online grátis, melhores jogos de navegador, jogar gratis no chromebook, jogos sem download",
  fr: "jeux gratuits en ligne, jeux par navigateur sans téléchargement, jeux débloqués, jeux en ligne école",
  de: "kostenlose online spiele, browsergames ohne download, unblockierte spiele schule, kostenlos spielen",
  ja: "無料オンラインゲーム, ブラウザゲーム 登録不要, スマホ 無料ゲーム おすすめ, 無料で遊べるゲーム",
  zh: "免费在线游戏, 免下载网页游戏, 浏览器游戏盒, 联机页游推荐, 网页小游戏大全"
};

/**
 * 在已渲染的 HTML 中注入/更新 SEO 与 GEO 元数据，避免与 render.js 已生成的标签重复。
 * @param {string} htmlContent 已渲染 HTML
 * @param {string} currentLang 当前语区码
 * @param {string} canonicalSlug 规范路径（不含前导斜杠，首页为空）
 */
function injectSeoAndGeoHeaders(htmlContent, currentLang, canonicalSlug = "") {
  const config = seoConfigs[currentLang] || seoConfigs["en"];
  const domain = "https://playzonex.xyz";
  const isHome = !canonicalSlug || canonicalSlug === "" || canonicalSlug === "index.html";
  const currentUrl = `${domain}/${currentLang === "en" ? "" : currentLang + "/"}${canonicalSlug}`;

  let html = htmlContent;

  // 1. 首页使用 SEO 优化后的 title / description / og:title / og:description
  if (isHome) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(config.title)}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${esc(config.desc)}"`);
    html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${esc(config.title)}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${esc(config.desc)}"`);
  }

  // 2. 注入 GEO 关键词（如不存在）
  if (!html.includes('<meta name="keywords"')) {
    html = html.replace("</head>", `  <meta name="keywords" content="${esc(geoKeywords[currentLang] || geoKeywords["en"])}">\n</head>`);
  }

  // 3. 确保 canonical 存在
  if (!html.includes('<link rel="canonical"')) {
    html = html.replace("</head>", `  <link rel="canonical" href="${esc(currentUrl)}" />\n</head>`);
  }

  // 4. 确保跨语区 hreflang 互连存在（与 render.js 格式保持一致）
  if (!html.includes('rel="alternate" hreflang=')) {
    const hreflangTags = LANGUAGES.map((lang) => {
      const langPath = lang === "en" ? "" : `${lang}/`;
      return `<link rel="alternate" hreflang="${lang}${lang === 'zh' ? '-CN' : ''}" href="${esc(`${domain}/${langPath}${canonicalSlug}`)}" />`;
    }).join("\n  ") + `\n  <link rel="alternate" hreflang="x-default" href="${esc(`${domain}/${canonicalSlug}`)}" />`;
    html = html.replace("</head>", `  ${hreflangTags}\n</head>`);
  }

  // 5. 确保 Open Graph url 存在
  if (!html.includes('property="og:url"')) {
    html = html.replace("</head>", `  <meta property="og:url" content="${esc(currentUrl)}" />\n</head>`);
  }

  return html;
}

rm(dist);
mkdir(dist);

let totalPages = 0;

for (const lang of LANGUAGES) {
  for (const page of site.pages) {
    const target = page.path === "/"
      ? path.join(dist, lang === "en" ? "index.html" : `${lang}/index.html`)
      : path.join(dist, lang === "en" ? page.path : `${lang}${page.path}`, "index.html");
    const canonicalSlug = page.path === "/" ? "" : page.path.replace(/^\//, "");
    const html = injectSeoAndGeoHeaders(renderPage(page, lang), lang, canonicalSlug);
    write(target, html);
    totalPages++;
  }
}

copyDir(path.join(root, "src/assets"), path.join(dist, "assets"));
write(path.join(dist, "data/games.json"), JSON.stringify(site.games, null, 2));
write(path.join(dist, "data/categories.json"), JSON.stringify(site.categories, null, 2));
write(path.join(dist, "data/roblox-codes.json"), JSON.stringify(site.codes, null, 2));
write(path.join(dist, "data/roblox-trending.json"), JSON.stringify(site.robloxTrending, null, 2));
write(path.join(dist, "data/mc-servers.json"), JSON.stringify(site.servers, null, 2));
write(path.join(dist, "data/minecraft-mods.json"), JSON.stringify(site.minecraftMods, null, 2));
write(path.join(dist, "data/minecraft-builds.json"), JSON.stringify(site.minecraftBuilds, null, 2));
write(path.join(dist, "data/minecraft-seeds.json"), JSON.stringify(site.minecraftSeeds, null, 2));
write(path.join(dist, "data/steam.json"), JSON.stringify(site.steamDeals, null, 2));
write(path.join(dist, "data/wordle-history.json"), JSON.stringify(site.wordleHistory, null, 2));
write(path.join(dist, "data/blooket-modes.json"), JSON.stringify(site.blooketModes, null, 2));
write(path.join(dist, "data/gear.json"), JSON.stringify(site.gear, null, 2));

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#101827"/><stop offset=".52" stop-color="#27214f"/><stop offset="1" stop-color="#0e7490"/></linearGradient>
    <linearGradient id="x" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7cf7ff"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#ffb454"/></linearGradient>
  </defs>
  <rect width="128" height="128" rx="26" fill="url(#bg)"/>
  <path d="M33 31l62 66M95 31L33 97" stroke="url(#x)" stroke-width="17" stroke-linecap="round"/>
  <circle cx="31" cy="88" r="8" fill="#7cf7ff"/>
  <circle cx="97" cy="88" r="8" fill="#ffb454"/>
  <path d="M24 39h24M36 27v24" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
  <circle cx="92" cy="36" r="6" fill="#fff"/><circle cx="108" cy="52" r="6" fill="#fff"/>
</svg>`;
write(path.join(dist, "favicon.svg"), favicon);
write(path.join(dist, "apple-touch-icon.svg"), favicon);

const urls = LANGUAGES.flatMap((lang) =>
  site.pages.map((page) => `  <url><loc>${pageUrl(page, lang)}</loc><changefreq>${page.path === "/" ? "daily" : "weekly"}</changefreq><priority>${page.path === "/" ? "1.0" : "0.8"}</priority></url>`)
).join("\n");
write(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write(path.join(dist, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://playzonex.xyz/sitemap.xml\n");
write(path.join(dist, "ads.txt"), `${ADS_TXT.trim()}\n`);
write(path.join(dist, "CNAME"), "playzonex.xyz\n");
write(path.join(dist, ".nojekyll"), "");
write(path.join(dist, "manifest.webmanifest"), JSON.stringify({
  name: "PlayZoneX",
  short_name: "PlayZoneX",
  start_url: "/",
  display: "standalone",
  background_color: "#13121b",
  theme_color: "#4f46e5",
  icons: [
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    { src: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml", purpose: "any maskable" }
  ]
}, null, 2));

console.log(`Built ${totalPages} pages (${site.pages.length} pages × ${LANGUAGES.length} languages) to ${dist}`);
