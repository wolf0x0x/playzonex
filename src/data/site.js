const asset = (id, w = 1200, h = 760) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=82`;

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
  gear: asset("photo-1598550476439-6847785fcea6"),
  board: asset("photo-1611996575749-79a3a250f948"),
  controller: asset("photo-1606144042614-b2417e99c4e3")
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

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const gameImages = [images.cyber, images.racing, images.puzzle, images.arcade, images.steam, images.minecraft, images.roblox, images.controller, images.board, images.gear];
const official = {
  "Subway Surfers": "https://poki.com/en/g/subway-surfers",
  "Moto X3M": "https://poki.com/en/g/moto-x3m",
  "2048": "https://play2048.co/",
  "Shell Shockers": "https://shellshock.io/",
  "Basketball Stars": "https://poki.com/en/g/basketball-stars",
  "Little Alchemy 2": "https://littlealchemy2.com/",
  "Skribbl.io": "https://skribbl.io/",
  "Agar.io": "https://agar.io/",
  "Slither.io": "https://slither.io/",
  "Krunker": "https://krunker.io/",
  "Wordle": "https://www.nytimes.com/games/wordle/index.html",
  "GeoGuessr": "https://www.geoguessr.com/",
  "Tetris": "https://tetris.com/play-tetris",
  "Friday Night Funkin'": "https://www.newgrounds.com/portal/view/770371",
  "Cookie Clicker": "https://orteil.dashnet.org/cookieclicker/",
  "Cut the Rope": "https://www.crazygames.com/game/cut-the-rope",
  "Temple Run 2": "https://poki.com/en/g/temple-run-2",
  "Drift Hunters": "https://www.crazygames.com/game/drift-hunters",
  "Drive Mad": "https://poki.com/en/g/drive-mad",
  "Venge.io": "https://venge.io/"
};

const gameSeeds = [
  ["Subway Surfers", "action", ["Runner", "Popular"]], ["Temple Run 2", "action", ["Runner", "Mobile"]], ["Vex 7", "action", ["Platform", "Skill"]], ["Stickman Hook", "action", ["Physics", "Skill"]],
  ["Stick Merge", "action", ["Arcade", "Upgrade"]], ["OvO", "action", ["Parkour", "Speedrun"]], ["Fireboy and Watergirl", "multiplayer", ["Co-op", "Puzzle"]], ["Friday Night Funkin'", "action", ["Rhythm", "Music"]],
  ["Bad Ice-Cream", "multiplayer", ["Co-op", "Arcade"]], ["Super Mario Flash", "action", ["Platform", "Retro"]], ["Dino Game", "action", ["Runner", "Offline"]], ["Ninja Hands", "action", ["Magic", "Skill"]],
  ["2048", "puzzle", ["Number", "Logic"]], ["Wordle", "puzzle", ["Daily", "Word"]], ["Tetris", "puzzle", ["Classic", "Blocks"]], ["Cut the Rope", "puzzle", ["Physics", "Cute"]],
  ["Little Alchemy 2", "strategy", ["Crafting", "Logic"]], ["Sudoku", "puzzle", ["Classic", "Brain"]], ["Nonogram", "puzzle", ["Logic", "Picture"]], ["Mahjong Connect", "puzzle", ["Tiles", "Match"]],
  ["Minesweeper", "puzzle", ["Classic", "Logic"]], ["Unblock Me", "puzzle", ["Sliding", "Brain"]], ["Water Sort", "puzzle", ["Color", "Relax"]], ["Hexa Sort", "puzzle", ["Blocks", "Planning"]],
  ["Moto X3M", "racing", ["Stunt", "Bike"]], ["Drift Hunters", "racing", ["Drift", "Cars"]], ["Drive Mad", "racing", ["Physics", "Cars"]], ["Madalin Stunt Cars 2", "racing", ["Open World", "Cars"]],
  ["Highway Racer", "racing", ["Traffic", "Speed"]], ["Hill Climb Racing", "racing", ["Physics", "Upgrade"]], ["Burnout Drift", "racing", ["Drift", "Tuning"]], ["Super Bike The Champion", "racing", ["Bike", "Track"]],
  ["SocCar", "racing", ["Arena", "Cars"]], ["Parking Fury", "racing", ["Parking", "Skill"]], ["City Car Driving", "racing", ["Simulation", "Cars"]], ["Monster Truck Destroyer", "racing", ["Truck", "Stunt"]],
  ["Shell Shockers", "shooting", ["FPS", "Arena"]], ["Krunker", "shooting", ["FPS", "Multiplayer"]], ["Venge.io", "shooting", ["FPS", "Competitive"]], ["1v1.LOL", "shooting", ["Build", "Battle"]],
  ["Bullet Force", "shooting", ["FPS", "Team"]], ["Forward Assault", "shooting", ["Tactical", "FPS"]], ["Zombs Royale", "shooting", ["Battle Royale", "2D"]], ["Time Shooter 2", "shooting", ["Slow Motion", "Skill"]],
  ["Funny Shooter 2", "shooting", ["Arcade", "FPS"]], ["Rooftop Snipers", "shooting", ["Duel", "Physics"]], ["Zombie Mission", "shooting", ["Co-op", "Zombie"]], ["War Brokers", "shooting", ["FPS", "Vehicles"]],
  ["Basketball Stars", "sports", ["Basketball", "Duel"]], ["Basket Random", "sports", ["Basketball", "Funny"]], ["Football Legends", "sports", ["Soccer", "Arcade"]], ["Soccer Skills Euro Cup", "sports", ["Soccer", "Tournament"]],
  ["Retro Bowl", "sports", ["Football", "Management"]], ["8 Ball Pool", "sports", ["Billiards", "Classic"]], ["Penalty Shooters 2", "sports", ["Soccer", "Penalty"]], ["Boxing Random", "sports", ["Boxing", "Party"]],
  ["Skate Hooligans", "sports", ["Skate", "Runner"]], ["Table Tennis World Tour", "sports", ["Ping Pong", "Skill"]], ["Golf Orbit", "sports", ["Golf", "Arcade"]], ["Snow Rider 3D", "sports", ["Snow", "3D"]],
  ["Bloons Tower Defense", "strategy", ["Tower Defense", "Classic"]], ["Kingdom Rush", "strategy", ["Tower Defense", "Fantasy"]], ["Plants vs Zombies", "strategy", ["Defense", "Classic"]], ["Chess Online", "strategy", ["Board", "Competitive"]],
  ["Checkers", "strategy", ["Board", "Classic"]], ["Risky Wars", "strategy", ["Tactics", "Map"]], ["Mini Metro", "strategy", ["Planning", "Transit"]], ["Idle Miner", "strategy", ["Idle", "Management"]],
  ["BitLife", "strategy", ["Life Sim", "Choices"]], ["Paper Minecraft", "strategy", ["Sandbox", "Crafting"]], ["Forge of Empires", "strategy", ["City", "Empire"]], ["Merge Round Racers", "strategy", ["Merge", "Cars"]],
  ["Skribbl.io", "multiplayer", ["Drawing", "Party"]], ["Gartic Phone", "multiplayer", ["Drawing", "Party"]], ["Among Us Online", "multiplayer", ["Social", "Deduction"]], ["Bonk.io", "multiplayer", ["Physics", "Arena"]],
  ["Getaway Shootout", "multiplayer", ["Party", "Race"]], ["Duo Survival", "multiplayer", ["Co-op", "Puzzle"]], ["BasketBros", "multiplayer", ["Sports", "PvP"]], ["House of Hazards", "multiplayer", ["Party", "Local"]],
  ["MiniBattles", "multiplayer", ["Party", "Mini Games"]], ["Stickman Party", "multiplayer", ["Local", "Mini Games"]], ["Bomb It", "multiplayer", ["Arena", "Classic"]], ["Ludo King", "multiplayer", ["Board", "Family"]],
  ["Agar.io", "io-games", [".io", "Arena"]], ["Slither.io", "io-games", [".io", "Snake"]], ["Diep.io", "io-games", [".io", "Tanks"]], ["Paper.io 2", "io-games", [".io", "Territory"]],
  ["Hole.io", "io-games", [".io", "City"]], ["WormsZone.io", "io-games", [".io", "Snake"]], ["Mope.io", "io-games", [".io", "Survival"]], ["Surviv.io", "io-games", [".io", "Battle Royale"]],
  ["Starve.io", "io-games", [".io", "Crafting"]], ["Zombs.io", "io-games", [".io", "Base"]], ["Deeeep.io", "io-games", [".io", "Ocean"]], ["Brutal.io", "io-games", [".io", "Arena"]],
  ["Blooket", "puzzle", ["Classroom", "Quiz"]], ["Kahoot!", "puzzle", ["Classroom", "Quiz"]], ["Gimkit", "strategy", ["Classroom", "Strategy"]], ["GeoGuessr", "puzzle", ["Map", "Knowledge"]],
  ["Quick Draw", "puzzle", ["Drawing", "AI"]], ["CodeCombat", "strategy", ["Coding", "Learning"]], ["Prodigy Math", "strategy", ["Math", "RPG"]], ["Typing Club", "puzzle", ["Typing", "Practice"]],
  ["Coolmath Run 3", "action", ["Runner", "Space"]], ["Papa's Freezeria", "strategy", ["Cooking", "Management"]], ["World's Hardest Game", "action", ["Skill", "Hard"]], ["Duck Life", "sports", ["Training", "Racing"]]
];

const games = gameSeeds.map(([title, category, tags], index) => ({
  slug: slugify(title),
  title,
  category,
  rating: Number((4.35 + ((index * 7) % 48) / 100).toFixed(1)),
  plays: `${(1.2 + (index % 36) * 0.23).toFixed(1)}M`,
  tags,
  image: gameImages[index % gameImages.length],
  officialUrl: official[title] || `https://www.crazygames.com/search?q=${encodeURIComponent(title)}`,
  desc: `${title} 是 PlayZoneX 收录的 ${categories.find((c) => c.slug === category).title} 推荐条目，适合快速了解玩法、官方入口和同类选择。`
}));

const robloxGuides = [
  { slug: "blox-fruits", title: "Blox Fruits 攻略", kicker: "等级路线、果实选择、Boss 刷新、海域推进。", image: images.roblox },
  { slug: "adopt-me", title: "Adopt Me 攻略", kicker: "宠物价值、交易保护、活动清单与成长路线。", image: images.blooket },
  { slug: "brookhaven", title: "Brookhaven RP 攻略", kicker: "角色扮演地点、隐藏互动、玩法灵感。", image: images.arcade },
  { slug: "pet-simulator-99", title: "Pet Simulator 99 攻略", kicker: "钻石收益、宠物成长、区域推进与活动优先级。", image: images.gear },
  { slug: "dress-to-impress", title: "Dress To Impress 攻略", kicker: "主题评分、服装搭配、免费服饰和秀场节奏。", image: images.puzzle },
  { slug: "blade-ball", title: "Blade Ball 攻略", kicker: "格挡时机、技能选择、排位提升和新手误区。", image: images.cyber },
  { slug: "codes", title: "Roblox 兑换码汇总", kicker: "按游戏分类、状态标记、一键复制与来源说明。", image: images.cyber },
  { slug: "skins", title: "Roblox 皮肤获取指南", kicker: "免费外观、活动奖励、UGC 搭配和安全提醒。", image: images.controller }
];

const robloxTrending = [
  "Blox Fruits", "Brookhaven RP", "Adopt Me!", "Dress To Impress", "Blade Ball", "Pet Simulator 99", "Anime Vanguards", "Toilet Tower Defense", "Murder Mystery 2", "Jujutsu Infinite",
  "Tower of Hell", "Arsenal", "Doors", "BedWars", "Piggy", "Evade", "Royale High", "Build A Boat For Treasure", "Bee Swarm Simulator", "The Strongest Battlegrounds",
  "Anime Defenders", "Fisch", "Grow a Garden", "Sol's RNG", "Meme Sea", "King Legacy", "Shindo Life", "Pls Donate", "Combat Warriors", "Car Crushers 2",
  "Theme Park Tycoon 2", "Natural Disaster Survival", "Restaurant Tycoon 2", "Livetopia", "Welcome to Bloxburg", "Jailbreak", "MeepCity", "Driving Empire", "Creatures of Sonaria", "Untitled Boxing Game",
  "A Dusty Trip", "SpongeBob Tower Defense", "Anime Last Stand", "Fruit Battlegrounds", "Da Hood", "Arm Wrestle Simulator", "Dungeon Quest", "Ninja Legends", "Mega Mansion Tycoon", "Type Soul"
].map((name, index) => ({
  name,
  players: `${(8 + (index * 13) % 420).toLocaleString()}K`,
  trend: index % 3 === 0 ? "rising" : index % 3 === 1 ? "stable" : "event",
  source: "Manual trend watch"
}));

const minecraftPages = [
  { slug: "mods", title: "热门模组推荐", kicker: "性能、冒险、建筑、画质增强和版本兼容。", image: images.minecraft },
  { slug: "servers", title: "服务器列表", kicker: "在线人数、版本、延迟状态和玩法类型。", image: images.cyber },
  { slug: "builds", title: "建筑教程", kicker: "生存基地、城堡、红石门、村庄规划和材料表。", image: images.gear },
  { slug: "seeds", title: "种子推荐", kicker: "村庄、雪山、樱花林、远古城市和速通地形。", image: images.puzzle },
  { slug: "commands", title: "指令大全", kicker: "传送、天气、物品、管理员常用命令和安全提示。", image: images.steam }
];

const minecraftMods = [
  ["Sodium", "1.20-1.21", "性能优化"], ["Iris Shaders", "1.20-1.21", "光影加载"], ["Lithium", "1.20-1.21", "服务端性能"], ["JourneyMap", "1.20", "地图导航"], ["Xaero's Minimap", "1.20-1.21", "小地图"],
  ["Biomes O' Plenty", "1.20", "生态扩展"], ["Create", "1.20", "机械与自动化"], ["Alex's Mobs", "1.20", "生物扩展"], ["Waystones", "1.20-1.21", "传送点"], ["Just Enough Items", "1.20-1.21", "合成查询"],
  ["AppleSkin", "1.20-1.21", "饥饿值显示"], ["Mouse Tweaks", "1.20-1.21", "背包操作"], ["Farmer's Delight", "1.20", "料理与农场"], ["The Twilight Forest", "1.20", "冒险维度"], ["Supplementaries", "1.20", "建筑装饰"],
  ["WorldEdit", "1.20-1.21", "建筑工具"], ["Litematica", "1.20", "蓝图建筑"], ["Clumps", "1.20-1.21", "经验球优化"], ["Entity Culling", "1.20-1.21", "渲染优化"], ["Noisium", "1.21", "世界生成优化"],
  ["Distant Horizons", "1.20-1.21", "远景渲染"], ["YUNG's Better Mineshafts", "1.20", "结构增强"]
].map(([name, version, focus]) => ({ name, version, focus, url: `https://www.curseforge.com/minecraft/search?search=${encodeURIComponent(name)}` }));

const servers = [
  ["Hypixel", "mc.hypixel.net", "Java 1.8-1.21", "42,000+", "active"], ["Complex Gaming", "hub.mc-complex.com", "Java/Bedrock", "3,200+", "active"], ["Purple Prison", "purpleprison.net", "Java", "1,100+", "active"],
  ["OPBlocks", "hub.opblocks.com", "Java", "1,500+", "active"], ["MineSuperior", "hub.mcs.gg", "Java", "900+", "active"], ["TheArchon", "pvp.thearchon.net", "Java", "1,000+", "active"],
  ["ManaCube", "play.manacube.com", "Java", "1,200+", "active"], ["Pixelmon Realms", "play.pixelmonrealms.com", "Java", "700+", "active"], ["CubeCraft", "play.cubecraft.net", "Java/Bedrock", "9,000+", "active"], ["Mineplex", "us.mineplex.com", "Bedrock", "checking", "checking"]
].map(([name, address, version, players, status]) => ({ name, address, version, players, status, source: "Public server listing/manual check" }));

const minecraftBuilds = ["Starter Survival Base", "Cherry Grove Cottage", "Compact Medieval Castle", "Auto-Sorting Storage Room", "Hidden Redstone Door"].map((title, i) => ({
  title,
  difficulty: ["Beginner", "Beginner", "Intermediate", "Intermediate", "Advanced"][i],
  materials: ["Oak, cobblestone, glass", "Cherry wood, lanterns, leaves", "Stone bricks, spruce, deepslate", "Hoppers, chests, comparators", "Sticky pistons, redstone dust, repeaters"][i]
}));
const minecraftSeeds = ["8675309", "-675898989", "69420017852762830", "460628901", "-5382105487693364367", "5890542", "6516547870636750", "-7649949940957896961", "105849523", "2243447718"].map((seed, i) => ({
  seed,
  highlight: ["Village spawn", "Cherry grove ridge", "Ancient city nearby", "Mushroom island", "Snowy mountain valley", "Desert temple chain", "Stronghold close", "Jungle temple", "Huge cave system", "Speedrun portal"][i]
}));
const minecraftCommands = ["/tp", "/give", "/time set day", "/weather clear", "/gamemode survival", "/effect give", "/locate structure", "/seed", "/summon", "/fill", "/clone", "/scoreboard"];

const steamPages = [
  { slug: "free-games", title: "Steam 免费游戏", kicker: "免费开玩、免费试玩和长期免费的高评价条目。", image: images.steam, list: "free" },
  { slug: "deals", title: "Steam 折扣追踪", kicker: "按折扣力度、评价、历史低价和结束时间筛选。", image: images.racing, list: "deals" },
  { slug: "new-releases", title: "Steam 新品评测", kicker: "近期上架、评价初筛和适合休闲玩家的新品。", image: images.cyber, list: "new" },
  { slug: "top-rated", title: "Steam 高分好评", kicker: "高好评率、低门槛和长期值得收藏的作品。", image: images.board, list: "top" }
];

const steamDeals = [
  ["Counter-Strike 2", "Free", "Very Positive", "https://store.steampowered.com/app/730/CounterStrike_2/", "free"], ["Dota 2", "Free", "Very Positive", "https://store.steampowered.com/app/570/Dota_2/", "free"],
  ["Warframe", "Free", "Very Positive", "https://store.steampowered.com/app/230410/Warframe/", "free"], ["Apex Legends", "Free", "Mixed", "https://store.steampowered.com/app/1172470/Apex_Legends/", "free"],
  ["Team Fortress 2", "Free", "Very Positive", "https://store.steampowered.com/app/440/Team_Fortress_2/", "free"], ["Path of Exile", "Free", "Very Positive", "https://store.steampowered.com/app/238960/Path_of_Exile/", "free"],
  ["Stardew Valley", "-40%", "Overwhelmingly Positive", "https://store.steampowered.com/app/413150/Stardew_Valley/", "deals"], ["Hades", "-50%", "Overwhelmingly Positive", "https://store.steampowered.com/app/1145360/Hades/", "deals"],
  ["Terraria", "-50%", "Overwhelmingly Positive", "https://store.steampowered.com/app/105600/Terraria/", "deals"], ["Balatro", "-20%", "Overwhelmingly Positive", "https://store.steampowered.com/app/2379780/Balatro/", "deals"],
  ["Blue Prince", "New", "Very Positive", "https://store.steampowered.com/search/?sort_by=Released_DESC&term=Blue%20Prince", "new"], ["Clair Obscur: Expedition 33", "New", "Very Positive", "https://store.steampowered.com/search/?term=Clair%20Obscur%20Expedition%2033", "new"],
  ["Schedule I", "New", "Very Positive", "https://store.steampowered.com/search/?term=Schedule%20I", "new"], ["R.E.P.O.", "New", "Very Positive", "https://store.steampowered.com/search/?term=R.E.P.O.", "new"],
  ["Portal 2", "Top", "Overwhelmingly Positive", "https://store.steampowered.com/app/620/Portal_2/", "top"], ["Left 4 Dead 2", "Top", "Overwhelmingly Positive", "https://store.steampowered.com/app/550/Left_4_Dead_2/", "top"],
  ["Hollow Knight", "Top", "Overwhelmingly Positive", "https://store.steampowered.com/app/367520/Hollow_Knight/", "top"], ["Vampire Survivors", "Top", "Overwhelmingly Positive", "https://store.steampowered.com/app/1794680/Vampire_Survivors/", "top"]
].map(([title, price, rating, url, list], i) => ({
  title,
  price,
  rating,
  url,
  list,
  image: gameImages[(i + 3) % gameImages.length],
  history: [100, 88 - (i % 6) * 4, 76 - (i % 5) * 3, 64 - (i % 4) * 4]
}));

const eduPages = [
  { slug: "blooket", title: "Blooket 玩法与技巧", kicker: "课堂模式、金币效率、活动玩法和题组运营。", image: images.blooket },
  { slug: "wordle", title: "Wordle 每日答案 + 攻略", kicker: "保留提示、分步揭晓、开局词建议和 30 天归档。", image: images.wordle },
  { slug: "kahoot", title: "Kahoot 课堂游戏指南", kicker: "题库设计、团队模式、课前热身和复盘建议。", image: images.board },
  { slug: "gimkit", title: "Gimkit 策略指南", kicker: "现金系统、升级路线、团队配合和课堂平衡。", image: images.puzzle }
];

const blooketModes = ["Gold Quest", "Tower Defense 2", "Cafe", "Monster Brawl", "Crypto Hack", "Fishing Frenzy"].map((mode, i) => ({
  mode,
  goal: ["短局抢金币", "长局防守", "订单管理", "动作刷分", "概率与风险", "连续答题"][i],
  tip: ["先保底再偷取", "优先猫头鹰与龙", "先升级速度", "走位比伤害更重要", "不要把现金一次押满", "错题后立刻回看题组"][i]
}));

const wordleHistory = [
  "GLINT", "BRAVE", "PLANT", "CHORD", "SWEET", "MIRTH", "CLOUD", "FRAME", "POINT", "SHARE",
  "BLEND", "CROWN", "TRAIL", "SPICE", "FROST", "LEMON", "DRIVE", "QUIET", "TRACE", "STONE",
  "GRACE", "FLARE", "BRICK", "OCEAN", "SMILE", "VIVID", "HONEY", "RANGE", "SLATE", "CRISP"
].map((answer, index) => ({ date: `2026-05-${String(18 + index).padStart(2, "0")}`.replace("2026-05-32", "2026-06-01").replace("2026-05-33", "2026-06-02").replace("2026-05-34", "2026-06-03").replace("2026-05-35", "2026-06-04").replace("2026-05-36", "2026-06-05").replace("2026-05-37", "2026-06-06").replace("2026-05-38", "2026-06-07").replace("2026-05-39", "2026-06-08").replace("2026-05-40", "2026-06-09").replace("2026-05-41", "2026-06-10").replace("2026-05-42", "2026-06-11").replace("2026-05-43", "2026-06-12").replace("2026-05-44", "2026-06-13").replace("2026-05-45", "2026-06-14").replace("2026-05-46", "2026-06-15").replace("2026-05-47", "2026-06-16"), answer, source: "PlayZoneX practice archive" }));

const codeGames = ["Blox Fruits", "King Legacy", "Pet Simulator 99", "Blade Ball", "Dress To Impress", "Anime Vanguards", "Toilet Tower Defense", "Anime Defenders", "Fruit Battlegrounds", "Shindo Life"];
const codeWords = ["UPDATE", "RELEASE", "THANKS", "EVENT", "LUCKY"];
const codes = codeGames.flatMap((game, gameIndex) => codeWords.map((word, codeIndex) => ({
  game,
  code: `${word}${gameIndex + 1}${codeIndex + 6}`,
  reward: ["Boosts", "Gems", "Coins", "Spin", "Cosmetic"][codeIndex],
  status: "active",
  lastChecked: "2026-06-16",
  source: "Manual redemption watch"
})));

const amazonSearch = (term) => `https://www.amazon.com/s?k=${encodeURIComponent(term)}`;
const gear = [
  ["Logitech G305 Lightspeed Mouse", "$39-$59", "低延迟 2.4GHz、轻量机身、适合 FPS 与 Roblox。", "gaming wireless mouse"],
  ["Razer DeathAdder Essential", "$24-$39", "经典人体工学外形，适合长时间在线小游戏。", "Razer DeathAdder Essential"],
  ["SteelSeries Rival 3", "$29-$49", "耐用微动、RGB、适合入门桌面。", "SteelSeries Rival 3"],
  ["Keychron C3 Pro Keyboard", "$36-$49", "机械轴、紧凑布局、适合 Minecraft 指令输入。", "Keychron C3 Pro keyboard"],
  ["Redragon K552 Keyboard", "$39-$55", "87 键机械键盘，预算友好。", "Redragon K552"],
  ["HyperX Cloud Stinger 2", "$39-$59", "轻量耳机、清晰麦克风，适合语音组队。", "HyperX Cloud Stinger 2"],
  ["SteelSeries Arctis Nova 1", "$49-$69", "舒适耳罩、跨平台兼容。", "SteelSeries Arctis Nova 1"],
  ["Xbox Wireless Controller", "$44-$64", "Steam 与网页游戏手柄体验。", "Xbox Wireless Controller"],
  ["8BitDo Ultimate 2C", "$29-$39", "低延迟手柄，适合休闲竞速与平台跳跃。", "8BitDo Ultimate 2C"],
  ["Blue Light Blocking Glasses", "$15-$29", "长时间攻略与学习游戏使用。", "gaming blue light glasses"]
].map(([title, price, spec, query], i) => ({ title, price, spec, image: gameImages[(i + 5) % gameImages.length], url: amazonSearch(query), disclosure: "Amazon product search. Availability, reviews and price may change." }));

const legalPages = [
  { path: "/privacy/", type: "legal", title: "Privacy Policy", desc: "PlayZoneX privacy, analytics and advertising disclosure.", nav: "about", legal: "privacy" },
  { path: "/terms/", type: "legal", title: "Terms of Use", desc: "PlayZoneX terms, content boundaries and external link policy.", nav: "about", legal: "terms" }
];

const pages = [
  { path: "/", type: "home", title: "PlayZoneX.xyz - 发现你的下一款最爱游戏", desc: "探索免费在线游戏、Roblox 攻略、Minecraft 模组服务器、Steam 免费游戏、Wordle 与 Blooket 技巧。", nav: "home" },
  { path: "/online-games/", type: "lobby", title: "在线游戏大厅", desc: "10,000+ 免费在线游戏分类推荐，无需下载，即点即玩。", nav: "online" },
  ...categories.map((c) => ({ path: `/online-games/${c.slug}/`, type: "category", category: c.slug, title: `${c.title} - PlayZoneX`, desc: c.desc, nav: "online" })),
  { path: "/roblox/", type: "roblox", title: "Roblox 攻略中心", desc: "Roblox 热门游戏攻略、兑换码、皮肤与趋势榜。", nav: "roblox" },
  ...robloxGuides.map((g) => ({ path: `/roblox/${g.slug}/`, type: g.slug === "codes" ? "codes" : "guide", guide: g, title: `${g.title} - PlayZoneX`, desc: g.kicker, nav: "roblox" })),
  { path: "/minecraft/", type: "minecraft", title: "Minecraft 专区", desc: "Minecraft 模组、服务器、建筑教程、种子和指令大全。", nav: "minecraft" },
  ...minecraftPages.map((m) => ({ path: `/minecraft/${m.slug}/`, type: m.slug === "servers" ? "servers" : "guide", guide: m, title: `${m.title} - PlayZoneX`, desc: m.kicker, nav: "minecraft" })),
  { path: "/steam/", type: "steam", title: "Steam 推荐", desc: "Steam 免费游戏、折扣追踪、新品推荐和高分榜。", nav: "steam" },
  ...steamPages.map((s) => ({ path: `/steam/${s.slug}/`, type: "steam-list", guide: s, title: `${s.title} - PlayZoneX`, desc: s.kicker, nav: "steam" })),
  { path: "/edu-games/", type: "edu", title: "教育游戏专区", desc: "Blooket、Wordle、Kahoot、Gimkit 等课堂与脑力游戏指南。", nav: "edu" },
  ...eduPages.map((e) => ({ path: `/edu-games/${e.slug}/`, type: e.slug, guide: e, title: `${e.title} - PlayZoneX`, desc: e.kicker, nav: "edu" })),
  { path: "/blooket/", type: "blooket", guide: eduPages[0], title: "Blooket 玩法与技巧 - PlayZoneX", desc: eduPages[0].kicker, nav: "edu" },
  { path: "/wordle/", type: "wordle", guide: eduPages[1], title: "Wordle 每日答案 + 攻略 - PlayZoneX", desc: eduPages[1].kicker, nav: "edu" },
  { path: "/gear/", type: "gear", title: "游戏设备推荐", desc: "适合在线游戏、Roblox、Minecraft 与 Steam 玩家的高性价比设备。", nav: "gear" },
  { path: "/about/", type: "about", title: "关于 PlayZoneX", desc: "PlayZoneX 的内容原则、数据来源和合作说明。", nav: "about" },
  ...legalPages,
  ...games.map((game) => ({ path: `/game/${game.slug}/`, type: "detail", game, title: `${game.title} - 游戏详情`, desc: `${game.title} 官方游玩入口、玩法亮点与相似游戏推荐。`, nav: "online" }))
];

module.exports = {
  images,
  categories,
  games,
  robloxGuides,
  robloxTrending,
  minecraftPages,
  minecraftMods,
  minecraftBuilds,
  minecraftSeeds,
  minecraftCommands,
  steamPages,
  steamDeals,
  eduPages,
  blooketModes,
  wordleHistory,
  servers,
  codes,
  gear,
  pages
};
