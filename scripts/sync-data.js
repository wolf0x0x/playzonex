const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const today = new Date().toISOString();
const site = require("../src/data/site");

const mkdir = (dir) => fs.mkdirSync(dir, { recursive: true });
const writeJson = (file, data) => {
  mkdir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const localCover = (slug) => `/assets/game-covers/${slug}.svg`;
const localGear = (slug) => `/assets/gear/${slug}.svg`;
const localGuide = (slug) => `/assets/guide-covers/${slug}.svg`;
const localDownload = (kind, file) => `/assets/downloads/${kind}/${file}`;
const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
const ALL_MODULES = ["steam", "minecraft", "roblox", "wordle", "rawg", "blooket", "games", "gear"];

const readJson = (file, fallback = {}) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
};

function requestedModules() {
  const args = process.argv.slice(2);
  const argValue = args.find((arg) => arg.startsWith("--modules="))?.split("=")[1]
    || args[args.indexOf("--modules") + 1];
  const raw = argValue || process.env.PLAYZONEX_SYNC_MODULES || "all";
  const selected = raw.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean);
  if (!selected.length || selected.includes("all")) return new Set(ALL_MODULES);
  return new Set(selected.filter((item) => ALL_MODULES.includes(item)));
}

function hasModule(modules, name) {
  return modules.has(name);
}

async function fetchText(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 9000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "PlayZoneXBot/1.0 (+https://playzonex.xyz/)",
        "accept": options.accept || "text/html,application/json;q=0.9,*/*;q=0.8"
      }
    });
    if (!res.ok) return null;
    return { url: res.url, body: await res.text(), contentType: res.headers.get("content-type") || "" };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchBinary(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 12000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent": "PlayZoneXBot/1.0 (+https://playzonex.xyz/)",
        "accept": "image/avif,image/webp,image/png,image/jpeg,image/svg+xml;q=0.8,*/*;q=0.5"
      }
    });
    if (!res.ok) return null;
    const contentType = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    if (!contentType.startsWith("image/")) return null;
    const bytes = Buffer.from(await res.arrayBuffer());
    if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return null;
    return { url: res.url || url, bytes, contentType };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function extractOgImage(html) {
  if (!html) return "";
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].replace(/&amp;/g, "&");
  }
  return "";
}

function resolveUrl(value, baseUrl) {
  if (!value) return "";
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return "";
  }
}

function imageExt(contentType, url = "") {
  const byType = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/svg+xml": "svg"
  };
  if (byType[contentType]) return byType[contentType];
  const match = url.toLowerCase().match(/\.([a-z0-9]{3,4})(?:[?#]|$)/);
  return match ? match[1].replace("jpeg", "jpg") : "jpg";
}

async function downloadImage(url, kind, slug) {
  if (!url) return "";
  const result = await fetchBinary(url);
  if (!result) return "";
  const ext = imageExt(result.contentType, result.url);
  const fileName = `${slug}.${ext}`;
  const file = path.join(root, "src/assets/downloads", kind, fileName);
  mkdir(path.dirname(file));
  fs.writeFileSync(file, result.bytes);
  return localDownload(kind, fileName);
}

function svgCover(game) {
  const colors = {
    action: ["#7c3aed", "#06b6d4"],
    puzzle: ["#0891b2", "#f59e0b"],
    racing: ["#ef4444", "#f97316"],
    shooting: ["#db2777", "#6366f1"],
    sports: ["#16a34a", "#22c55e"],
    strategy: ["#ca8a04", "#0f766e"],
    multiplayer: ["#2563eb", "#9333ea"],
    "io-games": ["#65a30d", "#14b8a6"]
  }[game.category] || ["#4f46e5", "#06b6d4"];
  const safeTitle = game.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 430">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="920" height="430" rx="34" fill="#111827"/>
  <rect x="18" y="18" width="884" height="394" rx="28" fill="url(#bg)" opacity=".92"/>
  <path d="M100 315C210 214 272 366 392 250s214 14 326-96" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="34" stroke-linecap="round"/>
  <g filter="url(#glow)" fill="none" stroke="#fff" stroke-width="18" stroke-linecap="round"><path d="M132 112h88M176 68v88"/><circle cx="720" cy="104" r="22"/><circle cx="790" cy="160" r="22"/></g>
  <text x="70" y="286" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="58" font-weight="800">${safeTitle}</text>
  <text x="72" y="336" fill="#e5e7eb" font-family="Inter,Arial,sans-serif" font-size="28" font-weight="700">${game.tags.join(" / ")}</text>
</svg>`;
}

function svgGear(item) {
  const safeTitle = item.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 430">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#111827"/><stop offset=".55" stop-color="#1e3a8a"/><stop offset="1" stop-color="#0f766e"/></linearGradient></defs>
  <rect width="920" height="430" rx="34" fill="url(#g)"/>
  <rect x="90" y="96" width="740" height="184" rx="58" fill="#020617" opacity=".42" stroke="#7dd3fc" stroke-width="8"/>
  <circle cx="270" cy="188" r="38" fill="#7dd3fc"/><circle cx="650" cy="174" r="18" fill="#fbbf24"/><circle cx="710" cy="214" r="18" fill="#f472b6"/>
  <text x="70" y="350" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="46" font-weight="800">${safeTitle}</text>
</svg>`;
}

function svgGuide(slug) {
  const titles = {
    arcade: "PlayZoneX",
    cyber: "Live Guide",
    racing: "Fast Picks",
    puzzle: "Brain Games",
    roblox: "Roblox Hub",
    minecraft: "Minecraft Station",
    steam: "Steam Watch",
    blooket: "Classroom Games",
    wordle: "Word Strategy",
    gear: "Gear Picks",
    board: "Top Rated",
    controller: "Player Setup"
  };
  const palettes = {
    arcade: ["#111827", "#2563eb", "#14b8a6"],
    cyber: ["#020617", "#7c3aed", "#06b6d4"],
    racing: ["#111827", "#ef4444", "#f59e0b"],
    puzzle: ["#0f172a", "#0891b2", "#facc15"],
    roblox: ["#111827", "#dc2626", "#f97316"],
    minecraft: ["#132516", "#16a34a", "#84cc16"],
    steam: ["#0b1220", "#2563eb", "#38bdf8"],
    blooket: ["#102a43", "#0ea5e9", "#22c55e"],
    wordle: ["#1f2937", "#16a34a", "#fbbf24"],
    gear: ["#111827", "#0f766e", "#60a5fa"],
    board: ["#1e1b4b", "#7c3aed", "#f472b6"],
    controller: ["#111827", "#4f46e5", "#22d3ee"]
  };
  const [base, a, b] = palettes[slug] || palettes.arcade;
  const title = (titles[slug] || slug).replace(/&/g, "&amp;");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${base}"/><stop offset=".48" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="20"/></filter>
  </defs>
  <rect width="1200" height="760" fill="url(#bg)"/>
  <g opacity=".28" filter="url(#soft)"><circle cx="260" cy="190" r="170" fill="#fff"/><circle cx="940" cy="560" r="230" fill="#fff"/></g>
  <path d="M130 540c160-180 285 70 435-92 150-162 280-30 505-210" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="46" stroke-linecap="round"/>
  <rect x="110" y="106" width="980" height="548" rx="42" fill="#020617" fill-opacity=".28" stroke="#fff" stroke-opacity=".24"/>
  <g fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="24" stroke-linecap="round">
    <path d="M240 252h132M306 186v132"/>
    <circle cx="842" cy="244" r="34"/>
    <circle cx="936" cy="314" r="34"/>
  </g>
  <text x="140" y="520" fill="#fff" font-family="Inter,Arial,sans-serif" font-size="84" font-weight="850">${title}</text>
  <text x="146" y="592" fill="#dbeafe" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="700">PlayZoneX verified content surface</text>
</svg>`;
}

async function syncGame(game) {
  const slug = game.slug;
  const candidates = [game.officialUrl, `https://www.crazygames.com/game/${slug}`, `https://poki.com/en/g/${slug}`]
    .filter(Boolean)
    .filter((url, index, arr) => arr.indexOf(url) === index);
  let verifiedUrl = "";
  let ogImage = "";
  for (const candidate of candidates) {
    const page = await fetchText(candidate);
    if (!page) continue;
    verifiedUrl = page.url || candidate;
    ogImage = resolveUrl(extractOgImage(page.body), verifiedUrl);
    break;
  }
  const coverFile = path.join(root, "src/assets/game-covers", `${slug}.svg`);
  if (!fs.existsSync(coverFile)) {
    mkdir(path.dirname(coverFile));
    fs.writeFileSync(coverFile, svgCover(game));
  }
  const downloadedImage = await downloadImage(ogImage, "game-covers", slug);
  return {
    officialUrl: verifiedUrl || game.officialUrl,
    linkStatus: verifiedUrl ? "verified" : "candidate",
    image: downloadedImage || localCover(slug),
    remoteImage: ogImage || null,
    imageSource: downloadedImage ? "downloaded-og-image" : "generated-svg-fallback",
    rating: null,
    plays: "Not tracked",
    checkedAt: today
  };
}

async function syncMinecraftServers() {
  const servers = [];
  for (const server of site.servers) {
    const result = await fetchText(`https://api.mcsrvstat.us/3/${encodeURIComponent(server.address)}`, { accept: "application/json" });
    if (!result) {
      servers.push({ ...server, players: "Unavailable", status: "checking", source: "mcsrvstat unavailable", checkedAt: today });
      continue;
    }
    try {
      const data = JSON.parse(result.body);
      servers.push({
        ...server,
        version: data.version || server.version,
        players: data.players?.online != null ? `${data.players.online.toLocaleString()} / ${(data.players.max || 0).toLocaleString()}` : "Unavailable",
        status: data.online ? "active" : "expired",
        source: "mcsrvstat.us",
        checkedAt: today
      });
    } catch {
      servers.push({ ...server, players: "Unavailable", status: "checking", source: "mcsrvstat parse error", checkedAt: today });
    }
  }
  return servers;
}

async function syncSteam() {
  const result = await fetchText("https://store.steampowered.com/api/featuredcategories?cc=us&l=english", { accept: "application/json" });
  if (!result) return [];
  try {
    const data = JSON.parse(result.body);
    const groups = [
      ["free", data.top_sellers?.items || []],
      ["deals", data.specials?.items || []],
      ["new", data.new_releases?.items || []]
    ];
    const entries = [];
    for (const [list, items] of groups) {
      for (const item of items.slice(0, 8)) {
        const image = await downloadImage(item.header_image, "steam", String(item.id));
        entries.push({
          title: item.name,
          price: item.final_price === 0 ? "Free" : item.discount_percent ? `-${item.discount_percent}%` : `$${(item.final_price / 100).toFixed(2)}`,
          rating: item.review_summary || "Steam listing",
          url: `https://store.steampowered.com/app/${item.id}/`,
          list,
          image: image || item.header_image,
          remoteImage: item.header_image || null,
          history: [],
          source: "Steam Store featuredcategories",
          checkedAt: today
        });
      }
    }
    return entries;
  } catch {
    return [];
  }
}

async function syncRawgMetadata() {
  const apiKey = process.env.RAWG_API_KEY || process.env.PLAYZONEX_RAWG_API_KEY || "";
  if (!apiKey) {
    return {
      checkedAt: today,
      source: "RAWG API key not configured",
      games: []
    };
  }
  const result = await fetchText(`https://api.rawg.io/api/games?key=${encodeURIComponent(apiKey)}&page_size=40&ordering=-rating`, { accept: "application/json" });
  if (!result) {
    return {
      checkedAt: today,
      source: "RAWG unavailable",
      games: []
    };
  }
  try {
    const data = JSON.parse(result.body);
    return {
      checkedAt: today,
      source: "RAWG API",
      games: (data.results || []).map((game) => ({
        id: game.id,
        slug: game.slug,
        title: game.name,
        released: game.released || null,
        rating: game.rating ?? null,
        ratingsCount: game.ratings_count ?? null,
        metacritic: game.metacritic ?? null,
        backgroundImage: game.background_image || null,
        platforms: (game.platforms || []).map((entry) => entry.platform?.name).filter(Boolean),
        genres: (game.genres || []).map((entry) => entry.name).filter(Boolean),
        tags: (game.tags || []).slice(0, 8).map((entry) => entry.name).filter(Boolean)
      }))
    };
  } catch {
    return {
      checkedAt: today,
      source: "RAWG parse error",
      games: []
    };
  }
}

function syncRoblox() {
  return {
    trending: site.robloxTrending.map((item) => ({
      ...item,
      players: item.players && item.players !== "Not tracked" ? item.players : "Not tracked",
      source: item.source && !/formula|generated/i.test(item.source) ? item.source : "No public unauthenticated API configured",
      checkedAt: today
    })),
    codes: [],
    state: "watchlist-no-public-api"
  };
}

function syncWordle() {
  return {
    history: [],
    state: "no-answer-republication",
    checkedAt: today,
    note: "Daily answer is not republished unless a verified licensed source is configured."
  };
}

function syncBlooketGuides() {
  return {
    checkedAt: today,
    source: "PlayZoneX editorial maintenance",
    guides: site.blooketModes.map((mode) => ({
      mode: mode.mode,
      goal: mode.goal,
      tip: mode.tip,
      freshness: "reviewed"
    }))
  };
}

function syncGearAssets() {
  for (const item of site.gear) {
    const file = path.join(root, "src/assets/gear", `${slugify(item.title)}.svg`);
    if (!fs.existsSync(file)) {
      mkdir(path.dirname(file));
      fs.writeFileSync(file, svgGear(item));
    }
  }
}

function syncGuideAssets() {
  const slugs = Object.values(site.images).map((image) => image.match(/\/([^/]+)\.svg$/)?.[1]).filter(Boolean);
  for (const slug of [...new Set(slugs)]) {
    const file = path.join(root, "src/assets/guide-covers", `${slug}.svg`);
    if (!fs.existsSync(file)) {
      mkdir(path.dirname(file));
      fs.writeFileSync(file, svgGuide(slug));
    }
  }
}

(async () => {
  const modules = requestedModules();
  const generatedPath = path.join(root, "src/data/generated.json");
  const previous = readJson(generatedPath, {});
  mkdir(path.join(root, "src/assets/game-covers"));
  mkdir(path.join(root, "src/assets/gear"));
  mkdir(path.join(root, "src/assets/guide-covers"));
  mkdir(path.join(root, "src/assets/downloads/game-covers"));
  mkdir(path.join(root, "src/assets/downloads/steam"));

  const generated = {
    ...previous,
    checkedAt: today,
    requestedModules: [...modules]
  };

  if (hasModule(modules, "games")) {
    const gameEntries = {};
    for (const game of site.games) {
      gameEntries[game.slug] = await syncGame(game);
    }
    generated.games = gameEntries;
  }

  if (hasModule(modules, "gear")) {
    syncGearAssets();
  }
  syncGuideAssets();

  if (hasModule(modules, "minecraft")) {
    generated.servers = await syncMinecraftServers();
  }

  if (hasModule(modules, "steam")) {
    generated.steamDeals = await syncSteam();
  }

  if (hasModule(modules, "roblox")) {
    const roblox = syncRoblox();
    generated.robloxTrending = roblox.trending;
    generated.codes = roblox.codes;
    generated.robloxState = roblox.state;
  }

  if (hasModule(modules, "wordle")) {
    const wordle = syncWordle();
    generated.wordleHistory = wordle.history;
    generated.wordleState = wordle.state;
    generated.wordleNote = wordle.note;
  }

  if (hasModule(modules, "rawg")) {
    generated.rawgMetadata = await syncRawgMetadata();
  }

  if (hasModule(modules, "blooket")) {
    generated.blooketGuides = syncBlooketGuides();
  }

  writeJson(path.join(root, "src/data/generated.json"), generated);
  writeJson(path.join(root, "src/data/sync-state.json"), {
    checkedAt: today,
    requestedModules: [...modules],
    steam: hasModule(modules, "steam") ? ((generated.steamDeals || []).length ? "synced-steam-featuredcategories" : "unavailable") : "not-requested",
    minecraft: hasModule(modules, "minecraft") ? ((generated.servers || []).some((server) => server.source === "mcsrvstat.us") ? "synced-mcsrvstat" : "unavailable") : "not-requested",
    roblox: hasModule(modules, "roblox") ? (generated.robloxState || "watchlist-no-public-api") : "not-requested",
    wordle: hasModule(modules, "wordle") ? (generated.wordleState || "no-answer-republication") : "not-requested",
    rawg: hasModule(modules, "rawg") ? (generated.rawgMetadata?.games?.length ? "synced-rawg-api" : generated.rawgMetadata?.source || "unavailable") : "not-requested",
    blooket: hasModule(modules, "blooket") ? "synced-editorial-guides" : "not-requested",
    games: hasModule(modules, "games") ? (Object.values(generated.games || {}).some((game) => game.linkStatus === "verified") ? "verified-links-and-local-covers" : "local-covers-generated") : "not-requested",
    gear: hasModule(modules, "gear") ? "local-assets-generated" : "not-requested",
    note: "Generated data avoids formula-made metrics and unverifiable active claims. Missing live providers are surfaced as unavailable or watchlist status."
  });
  console.log(`Data sync completed at ${today}: modules=${[...modules].join(",")}; games=${Object.keys(generated.games || {}).length}; servers=${(generated.servers || []).length}; steam=${(generated.steamDeals || []).length}.`);
})();
