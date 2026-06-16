const fs = require("fs");
const path = require("path");
const site = require("../src/data/site");
const { renderPage, LANGUAGES, pageUrl } = require("../src/templates/render");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

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

rm(dist);
mkdir(dist);

let totalPages = 0;

for (const lang of LANGUAGES) {
  for (const page of site.pages) {
    const target = page.path === "/"
      ? path.join(dist, lang === "en" ? "index.html" : `${lang}/index.html`)
      : path.join(dist, lang === "en" ? page.path : `${lang}${page.path}`, "index.html");
    write(target, renderPage(page, lang));
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
if (process.env.PLAYZONEX_ADS_TXT) write(path.join(dist, "ads.txt"), `${process.env.PLAYZONEX_ADS_TXT.trim()}\n`);
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

const staticTargets = ["index.html", "online-games", "roblox", "minecraft", "steam", "edu-games", "blooket", "wordle", "gear", "about", "privacy", "terms", "game", "assets", "data", "sitemap.xml", "robots.txt", "ads.txt", "manifest.webmanifest", "favicon.svg", "apple-touch-icon.svg", "CNAME", ".nojekyll", ...LANGUAGES.filter((lang) => lang !== "en")];
for (const target of staticTargets) rm(path.join(root, target));
copyDir(dist, root);

console.log(`Built ${totalPages} pages (${site.pages.length} pages × ${LANGUAGES.length} languages) to ${dist}`);
