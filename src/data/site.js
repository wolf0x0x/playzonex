const asset = (id, w = 1200, h = 760) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const images = {
  arcade: asset("photo-1511512578047-dfb367046420"),
  cyber: asset("photo-1542751371-adc38448a05e"),
  racing: asset("photo-1511882150382-421056c89033"),
  puzzle: asset("photo-1606167668584-78701c57f13d"),
  roblox: asset("photo-1612287230202-1ff1d85d1bdf"),
  minecraft: asset("photo-1605901309584-818e25960a8f"),
  steam: asset("photo-1493711662062-fa541adb3fc8"),
  blooket: asset("photo-1523240795612-9a054b0db644"),
  wordle: asset("photo-1455390582262-044cdead277a"),
  gear: asset("photo-1598550476439-6847785fcea6")
};

const categories = [
  { slug: "action", title: "动作游戏", icon: "zap", color: "blue", desc: "高节奏闯关、格斗、跑酷与反应挑战。", count: 1240 },
  { slug: "puzzle", title: "益智游戏", icon: "puzzle", color: "violet", desc: "脑洞谜题、物理关卡、数字与逻辑训练。", count: 980 },
  { slug: "racing", title: "竞速游戏", icon: "gauge", color: "orange", desc: "漂移、越野、城市赛道与极速挑战。", count: 730 },
  { slug: "shooting", title: "射击游戏", icon: "crosshair", color: "pink", desc: "轻量射击、瞄准训练与团队竞技推荐。", count: 860 },
  { slug: "sports", title: "体育游戏", icon: "trophy", color: "green", desc: "足球、篮球、滑板、台球和街机运动。", count: 650 },
  { slug: "strategy", title: "策略游戏", icon: "route", color: "amber", desc: "塔防、经营、战术棋盘与资源管理。", count: 540 },
  { slug: "multiplayer", title: "多人游戏", icon: "users", color: "cyan", desc: "和朋友一起玩的派对、合作与竞技游戏。", count: 1120 },
  { slug: "io-games", title: ".io 游戏", icon: "orbit", color: "lime", desc: "即开即玩的多人竞技和轻量生存玩法。", count: 430 }
];

const games = [
  { slug: "subway-surfers", title: "Subway Surfers", category: "action", rating: 4.8, plays: "Official", tags: ["Runner", "Popular"], image: images.cyber, officialUrl: "https://poki.com/en/g/subway-surfers" },
  { slug: "moto-x3m", title: "Moto X3M", category: "racing", rating: 4.7, plays: "Official", tags: ["Racing"], image: images.racing, officialUrl: "https://poki.com/en/g/moto-x3m" },
  { slug: "2048", title: "2048", category: "puzzle", rating: 4.7, plays: "Official", tags: ["Puzzle"], image: images.puzzle, officialUrl: "https://play2048.co/" },
  { slug: "shell-shockers", title: "Shell Shockers", category: "shooting", rating: 4.6, plays: "Official", tags: ["Skill"], image: images.arcade, officialUrl: "https://shellshock.io/" },
  { slug: "basketball-stars", title: "Basketball Stars", category: "sports", rating: 4.6, plays: "Official", tags: ["Sports"], image: images.steam, officialUrl: "https://poki.com/en/g/basketball-stars" },
  { slug: "little-alchemy-2", title: "Little Alchemy 2", category: "strategy", rating: 4.8, plays: "Official", tags: ["Strategy"], image: images.minecraft, officialUrl: "https://littlealchemy2.com/" },
  { slug: "skribbl-io", title: "Skribbl.io", category: "multiplayer", rating: 4.6, plays: "Official", tags: ["Co-op"], image: images.roblox, officialUrl: "https://skribbl.io/" },
  { slug: "agar-io", title: "Agar.io", category: "io-games", rating: 4.5, plays: "Official", tags: [".io"], image: images.arcade, officialUrl: "https://agar.io/" }
];

const robloxGuides = [
  { slug: "blox-fruits", title: "Blox Fruits 攻略", kicker: "等级路线、果实选择、Boss 刷新", image: images.roblox },
  { slug: "adopt-me", title: "Adopt Me 攻略", kicker: "宠物价值、交易保护、活动清单", image: images.blooket },
  { slug: "brookhaven", title: "Brookhaven RP 攻略", kicker: "角色扮演地点、隐藏互动、玩法灵感", image: images.arcade },
  { slug: "pet-simulator-99", title: "Pet Simulator 99 攻略", kicker: "钻石收益、宠物成长、区域推进", image: images.gear },
  { slug: "codes", title: "Roblox 兑换码汇总", kicker: "每日检查、过期标记、一键复制", image: images.cyber },
  { slug: "skins", title: "Roblox 皮肤获取指南", kicker: "免费外观、活动奖励、搭配建议", image: images.puzzle }
];

const minecraftPages = [
  { slug: "mods", title: "热门模组推荐", kicker: "性能、冒险、建筑、画质增强", image: images.minecraft },
  { slug: "servers", title: "服务器列表", kicker: "在线人数、版本、延迟状态", image: images.cyber },
  { slug: "builds", title: "建筑教程", kicker: "生存基地、城堡、红石门、村庄规划", image: images.gear },
  { slug: "seeds", title: "种子推荐", kicker: "村庄、雪山、樱花林、远古城市", image: images.puzzle },
  { slug: "commands", title: "指令大全", kicker: "传送、天气、物品、管理员常用命令", image: images.steam }
];

const steamPages = [
  { slug: "free-games", title: "Steam 免费游戏", kicker: "每日同步免费、免费开玩和试玩游戏", image: images.steam },
  { slug: "deals", title: "Steam 折扣追踪", kicker: "按折扣力度、评价、历史低价筛选", image: images.racing }
];

const eduPages = [
  { slug: "blooket", title: "Blooket 玩法与技巧", kicker: "课堂模式、金币效率、活动玩法", image: images.blooket },
  { slug: "wordle", title: "Wordle 每日答案 + 攻略", kicker: "保留提示、分步揭晓、开局词建议", image: images.wordle }
];

const servers = [
  { name: "Hypixel", address: "mc.hypixel.net", version: "Java", players: "Live API", status: "checking" },
  { name: "Complex Gaming", address: "hub.mc-complex.com", version: "Java", players: "Live API", status: "checking" },
  { name: "Purple Prison", address: "purpleprison.net", version: "Java", players: "Live API", status: "checking" },
  { name: "OPBlocks", address: "hub.opblocks.com", version: "Java", players: "Live API", status: "checking" }
];

const codes = [
];

const gear = [
  { title: "低延迟无线鼠标", price: "$39-$79", spec: "轻量机身、2.4GHz、可编程侧键", image: images.gear, url: "https://www.rtings.com/mouse/reviews/best/gaming" },
  { title: "入门机械键盘", price: "$49-$99", spec: "热插拔轴体、RGB、紧凑布局", image: images.arcade, url: "https://www.rtings.com/keyboard/reviews/best/by-usage/gaming" },
  { title: "沉浸式游戏耳机", price: "$59-$129", spec: "虚拟环绕、降噪麦克风、舒适耳罩", image: images.steam, url: "https://www.rtings.com/headphones/reviews/best/by-usage/gaming" }
];

const steamDeals = [
  { title: "Counter-Strike 2", price: "Free", rating: "Very Positive", image: images.cyber, url: "https://store.steampowered.com/app/730/CounterStrike_2/" },
  { title: "Dota 2", price: "Free", rating: "Very Positive", image: images.steam, url: "https://store.steampowered.com/app/570/Dota_2/" },
  { title: "Warframe", price: "Free", rating: "Very Positive", image: images.arcade, url: "https://store.steampowered.com/app/230410/Warframe/" },
  { title: "Apex Legends", price: "Free", rating: "Mixed", image: images.racing, url: "https://store.steampowered.com/app/1172470/Apex_Legends/" },
  { title: "Team Fortress 2", price: "Free", rating: "Very Positive", image: images.roblox, url: "https://store.steampowered.com/app/440/Team_Fortress_2/" },
  { title: "Path of Exile", price: "Free", rating: "Very Positive", image: images.minecraft, url: "https://store.steampowered.com/app/238960/Path_of_Exile/" }
];

const pages = [
  { path: "/", type: "home", title: "PlayZoneX.xyz - 发现你的下一款最爱游戏", desc: "探索免费在线游戏、Roblox 攻略、Minecraft 模组服务器、Steam 免费游戏、Wordle 与 Blooket 技巧。", nav: "home" },
  { path: "/online-games/", type: "lobby", title: "在线游戏大厅", desc: "10,000+ 免费在线游戏分类推荐，无需下载，即点即玩。", nav: "online" },
  ...categories.map((c) => ({ path: `/online-games/${c.slug}/`, type: "category", category: c.slug, title: `${c.title} - PlayZoneX`, desc: c.desc, nav: "online" })),
  { path: "/roblox/", type: "roblox", title: "Roblox 攻略中心", desc: "Roblox 热门游戏攻略、兑换码、皮肤与实时趋势。", nav: "roblox" },
  ...robloxGuides.map((g) => ({ path: `/roblox/${g.slug}/`, type: g.slug === "codes" ? "codes" : "guide", guide: g, title: `${g.title} - PlayZoneX`, desc: g.kicker, nav: "roblox" })),
  { path: "/minecraft/", type: "minecraft", title: "Minecraft 专区", desc: "Minecraft 模组、服务器、建筑教程、种子和指令大全。", nav: "minecraft" },
  ...minecraftPages.map((m) => ({ path: `/minecraft/${m.slug}/`, type: m.slug === "servers" ? "servers" : "guide", guide: m, title: `${m.title} - PlayZoneX`, desc: m.kicker, nav: "minecraft" })),
  { path: "/steam/", type: "steam", title: "Steam 推荐", desc: "Steam 免费游戏、折扣追踪和新品推荐。", nav: "steam" },
  ...steamPages.map((s) => ({ path: `/steam/${s.slug}/`, type: "steam-list", guide: s, title: `${s.title} - PlayZoneX`, desc: s.kicker, nav: "steam" })),
  ...eduPages.map((e) => ({ path: `/${e.slug}/`, type: e.slug, guide: e, title: `${e.title} - PlayZoneX`, desc: e.kicker, nav: "edu" })),
  { path: "/gear/", type: "gear", title: "游戏设备推荐", desc: "适合在线游戏、Roblox、Minecraft 与 Steam 玩家的高性价比设备。", nav: "gear" },
  { path: "/about/", type: "about", title: "关于 PlayZoneX", desc: "PlayZoneX 的内容原则、数据来源和合作说明。", nav: "about" },
  ...games.map((game) => ({ path: `/game/${game.slug}/`, type: "detail", game, title: `${game.title} - 游戏详情`, desc: `${game.title} 官方游玩入口、玩法亮点与相似游戏推荐。`, nav: "online" }))
];

module.exports = { images, categories, games, robloxGuides, minecraftPages, steamPages, eduPages, servers, codes, gear, steamDeals, pages };
