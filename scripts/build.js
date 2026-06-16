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
write(path.join(dist, "data/mc-servers.json"), JSON.stringify(site.servers, null, 2));
write(path.join(dist, "data/gear.json"), JSON.stringify(site.gear, null, 2));

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
  icons: []
}, null, 2));

const staticTargets = ["index.html", "online-games", "roblox", "minecraft", "steam", "blooket", "wordle", "gear", "about", "game", "assets", "data", "sitemap.xml", "robots.txt", "ads.txt", "manifest.webmanifest", "CNAME", ".nojekyll", ...LANGUAGES.filter((lang) => lang !== "en")];
for (const target of staticTargets) rm(path.join(root, target));
copyDir(dist, root);

console.log(`Built ${totalPages} pages (${site.pages.length} pages × ${LANGUAGES.length} languages) to ${dist}`);
