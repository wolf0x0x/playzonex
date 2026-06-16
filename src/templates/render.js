const site = require("../data/site");

const LANGUAGES = ["en", "es", "pt", "fr", "de", "ja", "zh"];
const GA_ID = process.env.PLAYZONEX_GA_ID || "";
const AD_CLIENT = process.env.PLAYZONEX_AD_CLIENT || "";
const DOMAIN = "https://playzonex.xyz";

const categoryI18n = {
  action: { en: "Action Games", es: "Juegos de Acción", pt: "Jogos de Ação", fr: "Jeux d'Action", de: "Actionspiele", ja: "アクションゲーム", zh: "动作游戏" },
  puzzle: { en: "Puzzle Games", es: "Juegos de Puzle", pt: "Jogos de Quebra-Cabeça", fr: "Jeux de Réflexion", de: "Denkspiele", ja: "パズルゲーム", zh: "益智游戏" },
  racing: { en: "Racing Games", es: "Juegos de Carreras", pt: "Jogos de Corrida", fr: "Jeux de Course", de: "Rennspiele", ja: "レースゲーム", zh: "竞速游戏" },
  shooting: { en: "Shooting Games", es: "Juegos de Disparos", pt: "Jogos de Tiro", fr: "Jeux de Tir", de: "Shooter", ja: "シューティングゲーム", zh: "射击游戏" },
  sports: { en: "Sports Games", es: "Juegos Deportivos", pt: "Jogos de Esportes", fr: "Jeux de Sport", de: "Sportspiele", ja: "スポーツゲーム", zh: "体育游戏" },
  strategy: { en: "Strategy Games", es: "Juegos de Estrategia", pt: "Jogos de Estratégia", fr: "Jeux de Stratégie", de: "Strategiespiele", ja: "ストラテジーゲーム", zh: "策略游戏" },
  multiplayer: { en: "Multiplayer Games", es: "Juegos Multijugador", pt: "Jogos Multijogador", fr: "Jeux Multijoueur", de: "Mehrspieler-Spiele", ja: "マルチプレイヤーゲーム", zh: "多人游戏" },
  "io-games": { en: ".io Games", es: "Juegos .io", pt: "Jogos .io", fr: "Jeux .io", de: ".io Spiele", ja: ".ioゲーム", zh: ".io 游戏" }
};

const categoryDescI18n = {
  action: {
    en: "High-paced levels, fighting, parkour and reaction challenges.",
    es: "Niveles rápidos, lucha, parkour y desafíos de reacción.",
    pt: "Fases rápidas, luta, parkour e desafios de reação.",
    fr: "Niveaux rapides, combat, parkour et défis de réflexes.",
    de: "Schnelle Levels, Kämpfe, Parkour und Reaktionsherausforderungen.",
    ja: "ハイペースなステージ、格闘、パルクール、反射神経チャレンジ。",
    zh: "高节奏闯关、格斗、跑酷与反应挑战。"
  },
  puzzle: {
    en: "Brain teasers, physics levels, numbers and logic training.",
    es: "Acertijos, niveles de física, números y entrenamiento lógico.",
    pt: "Quebra-cabeças, fases de física, números e treino de lógica.",
    fr: "Casse-têtes, niveaux de physique, nombres et entraînement logique.",
    de: "Denksportaufgaben, Physik-Level, Zahlen und Logiktraining.",
    ja: "脳トレ、物理ステージ、数字と論理トレーニング。",
    zh: "脑洞谜题、物理关卡、数字与逻辑训练。"
  },
  racing: {
    en: "Drifting, off-road, city tracks and speed challenges.",
    es: "Derrapes, todoterreno, circuitos urbanos y desafíos de velocidad.",
    pt: "Drifts, off-road, pistas urbanas e desafios de velocidade.",
    fr: "Dérapages, tout-terrain, circuits urbains et défis de vitesse.",
    de: "Driften, Offroad, Stadtstrecken und Geschwindigkeitsherausforderungen.",
    ja: "ドリフト、オフロード、市街地コース、スピードチャレンジ。",
    zh: "漂移、越野、城市赛道与极速挑战。"
  },
  shooting: {
    en: "Light shooters, aim training and team arena recommendations.",
    es: "Tiro ligero, entrenamiento de puntería y arenas de equipo.",
    pt: "Tiro leve, treino de mira e arenas em equipe.",
    fr: "Tirs légers, entraînement de visée et arènes en équipe.",
    de: "Leichte Shooter, Zieltraining und Team-Arena-Empfehlungen.",
    ja: "軽量シューター、照準トレーニング、チームアリーナおすすめ。",
    zh: "轻量射击、瞄准训练与团队竞技推荐。"
  },
  sports: {
    en: "Soccer, basketball, skateboard, billiards and arcade sports.",
    es: "Fútbol, baloncesto, skate, billar y deportes arcade.",
    pt: "Futebol, basquete, skate, sinuca e esportes arcade.",
    fr: "Football, basket, skate, billard et sports d'arcade.",
    de: "Fußball, Basketball, Skateboard, Billard und Arcade-Sport.",
    ja: "サッカー、バスケ、スケート、ビリヤード、アーケードスポーツ。",
    zh: "足球、篮球、滑板、台球和街机运动。"
  },
  strategy: {
    en: "Tower defense, management, tactical boards and resource games.",
    es: "Defensa de torres, gestión, tácticas y juegos de recursos.",
    pt: "Defesa de torres, gestão, táticas e jogos de recursos.",
    fr: "Tower defense, gestion, tactique et jeux de ressources.",
    de: "Tower Defense, Management, Taktik- und Ressourcenspiele.",
    ja: "タワーディフェンス、経営、戦術ボード、資源管理ゲーム。",
    zh: "塔防、经营、战术棋盘与资源管理。"
  },
  multiplayer: {
    en: "Party, co-op and competitive games to play with friends.",
    es: "Juegos de fiesta, cooperativos y competitivos para jugar con amigos.",
    pt: "Jogos de festa, cooperativos e competitivos para jogar com amigos.",
    fr: "Jeux de fête, coopératifs et compétitifs à jouer entre amis.",
    de: "Party-, Koop- und kompetitive Spiele mit Freunden.",
    ja: "友達と遊ぶパーティー、協力、対戦ゲーム。",
    zh: "和朋友一起玩的派对、合作与竞技游戏。"
  },
  "io-games": {
    en: "Instant multiplayer arenas and lightweight survival gameplay.",
    es: "Arenas multijugador instantáneas y supervivencia ligera.",
    pt: "Arenas multijogador instantâneas e sobrevivência leve.",
    fr: "Arènes multijoueur instantanées et survie légère.",
    de: "Sofortige Mehrspieler-Arenen und leichtes Survival-Gameplay.",
    ja: "即プレイマルチプレイヤーアリーナと軽量サバイバル。",
    zh: "即开即玩的多人竞技和轻量生存玩法。"
  }
};

const i18n = {
  en: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "Home", online: "Online Games", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "Edu Games", gear: "Gear" },
    langLabel: "Language",
    searchPlaceholder: "Search games, guides, codes...",
    home: { eyebrow: "Free Games · Guides · Deals", h1: "Discover Your Next Favorite Game", lead: "10,000+ free online games | Roblox guides | Minecraft mods | Steam free games | Wordle & Blooket tips" },
    categories: { eyebrow: "Categories", title: "Popular Categories", subtitle: "Quickly browse by gameplay type." },
    picks: { eyebrow: "Today Picks", title: "Today's Picks", viewAll: "View All" },
    guides: { eyebrow: "Guides", title: "Guide Hub", subtitle: "Roblox codes, Minecraft servers, Steam deals and educational game tips." },
    gear: { eyebrow: "Gear", title: "Find Your Perfect Gaming Gear" },
    footer: "A free online game discovery, guides and recommendations site for global casual players. All external games link to official platforms; no copyrighted game content is embedded.",
    lobby: { title: "Online Games Hall", desc: "10,000+ free online games, no download, click and play." },
    filterAll: "All",
    sortTitle: "Name",
    sortRating: "Top Rated",
    sortPlays: "Most Played",
    showing: "Showing {n} featured games",
    loadMore: "Load More",
    roblox: { title: "Roblox Guide Center", desc: "Popular Roblox game guides, codes, skins and trend data." },
    minecraft: { title: "Minecraft Zone", desc: "Minecraft mods, servers, building tutorials, seeds and commands." },
    steam: { title: "Steam Picks", desc: "Steam free games, deal tracking and new releases." },
    blooket: { title: "Blooket Tips", desc: "Classroom modes, coin efficiency and event strategies." },
    wordle: { title: "Wordle Daily Answer & Tips", desc: "Hints, step-by-step reveals and starter word suggestions." },
    gearPage: { title: "Gaming Gear Recommendations", desc: "Affordable gear for online games, Roblox, Minecraft and Steam players.", cta: "View Recommendations" },
    about: { title: "About PlayZoneX", desc: "Content principles, data sources and collaboration information." },
    guide: { eyebrow: "Guide", articleTitle: "Core Content", quickStart: "Quick Start", updateTitle: "Update Strategy", faqTitle: "FAQ", faqUpdate: "How often is this updated?", faqUpdateAnswer: "Core data updates daily or every 4 hours; guides are maintained as events and versions change.", faqDownload: "Do you provide direct game downloads?", faqDownloadAnswer: "No. We only provide navigation, guides and recommendations; game links point to official platforms.", relatedTitle: "Related" },
    codes: { eyebrow: "Roblox Codes", copy: "Copy", note: "Codes must be redeemed in-game. Expired codes are kept as short-term history." },
    servers: { title: "Minecraft Server Status", desc: "Live player counts, versions and status from public Minecraft servers.", source: "Source", refresh: "Refresh Status" },
    detail: { free: "Free", rating: "Rating", plays: "plays", official: "Play Official", moreSame: "More Like This" },
    gameCardHint: "Official play entry, highlights and similar recommendations.",
    status: { active: "active", checking: "checking", expired: "expired" }
  },
  es: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "Inicio", online: "Juegos Online", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "Educativos", gear: "Equipos" },
    langLabel: "Idioma",
    searchPlaceholder: "Buscar juegos, guías, códigos...",
    home: { eyebrow: "Juegos Gratis · Guías · Ofertas", h1: "Descubre Tu Próximo Juego Favorito", lead: "Más de 10.000 juegos online gratis | guías Roblox | mods Minecraft | juegos gratis Steam | trucos Wordle y Blooket" },
    categories: { eyebrow: "Categorías", title: "Categorías Populares", subtitle: "Navega rápido por tipo de juego." },
    picks: { eyebrow: "Elegidos Hoy", title: "Elegidos de Hoy", viewAll: "Ver Todo" },
    guides: { eyebrow: "Guías", title: "Centro de Guías", subtitle: "Códigos Roblox, servidores Minecraft, ofertas Steam y trucos educativos." },
    gear: { eyebrow: "Equipos", title: "Encuentra Tu Equipo de Juego Perfecto" },
    footer: "Un sitio gratuito de descubrimiento de juegos, guías y recomendaciones para jugadores casuales globales. Todos los juegos externos enlazan a plataformas oficiales; no se incrusta contenido con derechos de autor.",
    lobby: { title: "Sala de Juegos Online", desc: "Más de 10.000 juegos online gratis, sin descargar, haz clic y juega." },
    filterAll: "Todos",
    sortTitle: "Nombre",
    sortRating: "Mejor Valorados",
    sortPlays: "Más Jugados",
    showing: "Mostrando {n} juegos destacados",
    loadMore: "Cargar Más",
    roblox: { title: "Centro de Guías Roblox", desc: "Guías populares de Roblox, códigos, skins y datos de tendencias." },
    minecraft: { title: "Zona Minecraft", desc: "Mods, servidores, tutoriales de construcción, semillas y comandos de Minecraft." },
    steam: { title: "Recomendaciones Steam", desc: "Juegos gratis Steam, seguimiento de ofertas y novedades." },
    blooket: { title: "Consejos Blooket", desc: "Modos de clase, eficiencia de monedas y estrategias de eventos." },
    wordle: { title: "Respuesta Diaria Wordle y Consejos", desc: "Pistas, revelación paso a paso y palabras iniciales recomendadas." },
    gearPage: { title: "Recomendaciones de Equipos de Juego", desc: "Equipos asequibles para juegos online, Roblox, Minecraft y Steam.", cta: "Ver Recomendaciones" },
    about: { title: "Sobre PlayZoneX", desc: "Principios de contenido, fuentes de datos e información de colaboración." },
    guide: { eyebrow: "Guía", articleTitle: "Contenido Principal", quickStart: "Inicio Rápido", updateTitle: "Estrategia de Actualización", faqTitle: "Preguntas Frecuentes", faqUpdate: "¿Con qué frecuencia se actualiza?", faqUpdateAnswer: "Los datos principales se actualizan diariamente o cada 4 horas; las guías se mantienen según eventos y versiones.", faqDownload: "¿Proporcionáis descargas directas?", faqDownloadAnswer: "No. Solo ofrecemos navegación, guías y recomendaciones; los enlaces apuntan a plataformas oficiales.", relatedTitle: "Relacionado" },
    codes: { eyebrow: "Códigos Roblox", copy: "Copiar", note: "Los códigos deben canjearse dentro del juego. Los caducados se conservan como historial breve." },
    servers: { title: "Estado de Servidores Minecraft", desc: "Jugadores en línea, versiones y estado de servidores públicos de Minecraft.", source: "Fuente", refresh: "Actualizar Estado" },
    detail: { free: "Gratis", rating: "Valoración", plays: "jugadas", official: "Jugar Oficial", moreSame: "Más Similares" },
    gameCardHint: "Entrada oficial, puntos fuertes y recomendaciones similares.",
    status: { active: "activo", checking: "verificando", expired: "caducado" }
  },
  pt: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "Início", online: "Jogos Online", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "Educativos", gear: "Equipamentos" },
    langLabel: "Idioma",
    searchPlaceholder: "Pesquisar jogos, guias, códigos...",
    home: { eyebrow: "Jogos Grátis · Guias · Ofertas", h1: "Descubra Seu Próximo Jogo Favorito", lead: "Mais de 10.000 jogos online grátis | guias Roblox | mods Minecraft | jogos grátis Steam | dicas Wordle e Blooket" },
    categories: { eyebrow: "Categorias", title: "Categorias Populares", subtitle: "Navegue rápido por tipo de jogo." },
    picks: { eyebrow: "Escolhas de Hoje", title: "Escolhas de Hoje", viewAll: "Ver Tudo" },
    guides: { eyebrow: "Guias", title: "Centro de Guias", subtitle: "Códigos Roblox, servidores Minecraft, ofertas Steam e dicas educativas." },
    gear: { eyebrow: "Equipamentos", title: "Encontre Seu Equipamento de Jogo Perfeito" },
    footer: "Um site gratuito de descoberta de jogos, guias e recomendações para jogadores casuais globais. Todos os jogos externos linkam para plataformas oficiais; nenhum conteúdo com direitos autorais é incorporado.",
    lobby: { title: "Salão de Jogos Online", desc: "Mais de 10.000 jogos online grátis, sem download, clique e jogue." },
    filterAll: "Todos",
    sortTitle: "Nome",
    sortRating: "Mais Bem Avaliados",
    sortPlays: "Mais Jogados",
    showing: "Mostrando {n} jogos em destaque",
    loadMore: "Carregar Mais",
    roblox: { title: "Centro de Guias Roblox", desc: "Guias populares de Roblox, códigos, skins e dados de tendências." },
    minecraft: { title: "Zona Minecraft", desc: "Mods, servidores, tutoriais de construção, sementes e comandos de Minecraft." },
    steam: { title: "Recomendações Steam", desc: "Jogos grátis Steam, acompanhamento de ofertas e lançamentos." },
    blooket: { title: "Dicas Blooket", desc: "Modos de sala de aula, eficiência de moedas e estratégias de eventos." },
    wordle: { title: "Resposta Diária Wordle e Dicas", desc: "Dicas, revelação passo a passo e palavras iniciais recomendadas." },
    gearPage: { title: "Recomendações de Equipamentos de Jogo", desc: "Equipamentos acessíveis para jogos online, Roblox, Minecraft e Steam.", cta: "Ver Recomendações" },
    about: { title: "Sobre PlayZoneX", desc: "Princípios de conteúdo, fontes de dados e informações de colaboração." },
    guide: { eyebrow: "Guia", articleTitle: "Conteúdo Principal", quickStart: "Início Rápido", updateTitle: "Estratégia de Atualização", faqTitle: "Perguntas Frequentes", faqUpdate: "Com que frequência isso é atualizado?", faqUpdateAnswer: "Os dados principais são atualizados diariamente ou a cada 4 horas; os guias são mantidos conforme eventos e versões mudam.", faqDownload: "Vocês fornecem downloads diretos de jogos?", faqDownloadAnswer: "Não. Oferecemos apenas navegação, guias e recomendações; os links dos jogos apontam para plataformas oficiais.", relatedTitle: "Relacionado" },
    codes: { eyebrow: "Códigos Roblox", copy: "Copiar", note: "Os códigos devem ser resgatados no jogo. Códigos expirados são mantidos como histórico curto." },
    servers: { title: "Status dos Servidores Minecraft", desc: "Jogadores online, versões e status de servidores públicos de Minecraft.", source: "Fonte", refresh: "Atualizar Status" },
    detail: { free: "Grátis", rating: "Avaliação", plays: "jogadas", official: "Jogar Oficial", moreSame: "Mais Similares" },
    gameCardHint: "Entrada oficial, destaques e recomendações similares.",
    status: { active: "ativo", checking: "verificando", expired: "expirado" }
  },
  fr: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "Accueil", online: "Jeux en Ligne", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "Éducatifs", gear: "Matériel" },
    langLabel: "Langue",
    searchPlaceholder: "Rechercher jeux, guides, codes...",
    home: { eyebrow: "Jeux Gratuits · Guides · Offres", h1: "Découvrez Votre Prochain Jeu Préféré", lead: "Plus de 10 000 jeux en ligne gratuits | guides Roblox | mods Minecraft | jeux gratuits Steam | astuces Wordle et Blooket" },
    categories: { eyebrow: "Catégories", title: "Catégories Populaires", subtitle: "Parcourez rapidement par type de jeu." },
    picks: { eyebrow: "Choix du Jour", title: "Sélection du Jour", viewAll: "Voir Tout" },
    guides: { eyebrow: "Guides", title: "Centre de Guides", subtitle: "Codes Roblox, serveurs Minecraft, offres Steam et astuces éducatives." },
    gear: { eyebrow: "Matériel", title: "Trouvez Votre Matériel de Jeu Parfait" },
    footer: "Un site gratuit de découverte de jeux, guides et recommandations pour les joueurs occasionnels du monde entier. Tous les jeux externes renvoient vers les plateformes officielles ; aucun contenu protégé n'est intégré.",
    lobby: { title: "Salon de Jeux en Ligne", desc: "Plus de 10 000 jeux en ligne gratuits, sans téléchargement, cliquez et jouez." },
    filterAll: "Tous",
    sortTitle: "Nom",
    sortRating: "Mieux Notés",
    sortPlays: "Plus Joués",
    showing: "Affichage de {n} jeux en vedette",
    loadMore: "Charger Plus",
    roblox: { title: "Centre de Guides Roblox", desc: "Guides de jeux Roblox populaires, codes, skins et données de tendances." },
    minecraft: { title: "Zone Minecraft", desc: "Mods, serveurs, tutoriels de construction, graines et commandes Minecraft." },
    steam: { title: "Recommandations Steam", desc: "Jeux gratuits Steam, suivi des offres et nouveautés." },
    blooket: { title: "Astuces Blooket", desc: "Modes classe, efficacité des pièces et stratégies d'événements." },
    wordle: { title: "Réponse Quotidienne Wordle et Astuces", desc: "Indices, révélation progressive et suggestions de mots de départ." },
    gearPage: { title: "Recommandations de Matériel de Jeu", desc: "Matériel abordable pour les joueurs en ligne, Roblox, Minecraft et Steam.", cta: "Voir les Recommandations" },
    about: { title: "À Propos de PlayZoneX", desc: "Principes de contenu, sources de données et informations de collaboration." },
    guide: { eyebrow: "Guide", articleTitle: "Contenu Principal", quickStart: "Démarrage Rapide", updateTitle: "Stratégie de Mise à Jour", faqTitle: "FAQ", faqUpdate: "À quelle fréquence cela est-il mis à jour ?", faqUpdateAnswer: "Les données principales sont mises à jour quotidiennement ou toutes les 4 heures ; les guides sont maintenus selon les événements et versions.", faqDownload: "Proposez-vous des téléchargements directs de jeux ?", faqDownloadAnswer: "Non. Nous fournissons uniquement navigation, guides et recommandations ; les liens vers les jeux pointent vers les plateformes officielles.", relatedTitle: "Liens Connexes" },
    codes: { eyebrow: "Codes Roblox", copy: "Copier", note: "Les codes doivent être utilisés en jeu. Les codes expirés sont conservés brièvement." },
    servers: { title: "Statut des Serveurs Minecraft", desc: "Joueurs en ligne, versions et statut des serveurs Minecraft publics.", source: "Source", refresh: "Actualiser" },
    detail: { free: "Gratuit", rating: "Note", plays: "parties", official: "Jouer Officiel", moreSame: "Plus Similaires" },
    gameCardHint: "Entrée officielle, points forts et recommandations similaires.",
    status: { active: "actif", checking: "vérification", expired: "expiré" }
  },
  de: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "Startseite", online: "Online-Spiele", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "Lernspiele", gear: "Equipment" },
    langLabel: "Sprache",
    searchPlaceholder: "Spiele, Guides, Codes suchen...",
    home: { eyebrow: "Kostenlose Spiele · Guides · Deals", h1: "Entdecke Dein Nächstes Lieblingsspiel", lead: "Mehr als 10.000 kostenlose Online-Spiele | Roblox-Guides | Minecraft-Mods | kostenlose Steam-Spiele | Wordle- & Blooket-Tipps" },
    categories: { eyebrow: "Kategorien", title: "Beliebte Kategorien", subtitle: "Schnell nach Spieltyp browsen." },
    picks: { eyebrow: "Top-Tipps Heute", title: "Tipps des Tages", viewAll: "Alle Anzeigen" },
    guides: { eyebrow: "Guides", title: "Guide-Zentrum", subtitle: "Roblox-Codes, Minecraft-Server, Steam-Deals und Lernspiel-Tipps." },
    gear: { eyebrow: "Equipment", title: "Finde Dein Perfektes Gaming-Equipment" },
    footer: "Eine kostenlose Seite zur Spiele-Entdeckung, Guides und Empfehlungen für globale Casual-Spieler. Alle externen Spiele verlinken zu offiziellen Plattformen; urheberrechtlich geschützte Inhalte werden nicht eingebettet.",
    lobby: { title: "Online-Spielehalle", desc: "Mehr als 10.000 kostenlose Online-Spiele, ohne Download, anklicken und spielen." },
    filterAll: "Alle",
    sortTitle: "Name",
    sortRating: "Beste Bewertung",
    sortPlays: "Meistgespielt",
    showing: "{n} empfohlene Spiele werden angezeigt",
    loadMore: "Mehr Laden",
    roblox: { title: "Roblox-Guide-Zentrum", desc: "Beliebte Roblox-Spiel-Guides, Codes, Skins und Trenddaten." },
    minecraft: { title: "Minecraft-Zone", desc: "Minecraft-Mods, Server, Bau-Tutorials, Seeds und Befehle." },
    steam: { title: "Steam-Empfehlungen", desc: "Kostenlose Steam-Spiele, Deal-Tracking und Neuerscheinungen." },
    blooket: { title: "Blooket-Tipps", desc: "Klassenmodi, Münz-Effizienz und Event-Strategien." },
    wordle: { title: "Wordle Tägliche Antwort & Tipps", desc: "Hinweise, schrittweise Auflösung und empfohlene Startwörter." },
    gearPage: { title: "Gaming-Equipment-Empfehlungen", desc: " erschwingliches Equipment für Online-Spiele, Roblox, Minecraft und Steam-Spieler.", cta: "Empfehlungen Ansehen" },
    about: { title: "Über PlayZoneX", desc: "Inhaltsgrundsätze, Datenquellen und Kooperationsinformationen." },
    guide: { eyebrow: "Guide", articleTitle: "Kerninhalte", quickStart: "Schnellstart", updateTitle: "Update-Strategie", faqTitle: "FAQ", faqUpdate: "Wie oft wird dies aktualisiert?", faqUpdateAnswer: "Kern Daten werden täglich oder alle 4 Stunden aktualisiert; Guides werden je nach Events und Versionen gepflegt.", faqDownload: "Bietet ihr direkte Spiel-Downloads an?", faqDownloadAnswer: "Nein. Wir bieten nur Navigation, Guides und Empfehlungen; Spiel-Links führen zu offiziellen Plattformen.", relatedTitle: "Verwandte Links" },
    codes: { eyebrow: "Roblox-Codes", copy: "Kopieren", note: "Codes müssen im Spiel eingelöst werden. Abgelaufene Codes werden kurzzeitig als Historie gespeichert." },
    servers: { title: "Minecraft-Server-Status", desc: "Live-Spielerzahlen, Versionen und Status öffentlicher Minecraft-Server.", source: "Quelle", refresh: "Status Aktualisieren" },
    detail: { free: "Kostenlos", rating: "Bewertung", plays: "Spiele", official: "Offiziell Spielen", moreSame: "Ähnliche Spiele" },
    gameCardHint: "Offizieller Spiel-Entry, Highlights und ähnliche Empfehlungen.",
    status: { active: "aktiv", checking: "prüfung", expired: "abgelaufen" }
  },
  ja: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "ホーム", online: "オンラインゲーム", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "教育ゲーム", gear: "ゲーミンググッズ" },
    langLabel: "言語",
    searchPlaceholder: "ゲーム、攻略、コードを検索...",
    home: { eyebrow: "無料ゲーム · 攻略 · セール", h1: "次のお気に入りゲームを見つけよう", lead: "1万種類以上の無料オンラインゲーム | Roblox攻略 | Minecraft MOD | Steam無料ゲーム | Wordle & Blooket コツ" },
    categories: { eyebrow: "カテゴリ", title: "人気カテゴリ", subtitle: "遊び方のタイプで素早く探す。" },
    picks: { eyebrow: "本日のおすすめ", title: "本日のおすすめ", viewAll: "すべて見る" },
    guides: { eyebrow: "攻略", title: "攻略ハブ", subtitle: "Robloxコード、Minecraftサーバー、Steamセール、教育ゲームのコツ。" },
    gear: { eyebrow: "グッズ", title: "あなたにぴったりのゲーミンググッズを見つける" },
    footer: "世界中のカジュアルプレイヤー向けの無料ゲーム発見・攻略・おすすめサイト。外部ゲームはすべて公式プラットフォームへリンクしており、著作権コンテンツは埋め込んでいません。",
    lobby: { title: "オンラインゲームホール", desc: "1万種類以上の無料オンライ ンゲーム。ダウンロード不要、クリックしてすぐプレイ。" },
    filterAll: "すべて",
    sortTitle: "名前",
    sortRating: "評価順",
    sortPlays: "人気順",
    showing: "{n} 件のおすすめゲームを表示中",
    loadMore: "もっと見る",
    roblox: { title: "Roblox 攻略センター", desc: "人気Robloxゲーム攻略、コード、スキン、トレンドデータ。" },
    minecraft: { title: "Minecraft ゾーン", desc: "Minecraft MOD、サーバー、建築チュートリアル、シード値、コマンド大全。" },
    steam: { title: "Steam おすすめ", desc: "Steam無料ゲーム、割引追跡、新作情報。" },
    blooket: { title: "Blooket コツ", desc: "クラスモード、コイン効率、イベント戦略。" },
    wordle: { title: "Wordle 今日の答えとコツ", desc: "ヒント、段階的な答え、おすすめの始めの言葉。" },
    gearPage: { title: "ゲーミンググッズおすすめ", desc: "オンラインゲーム、Roblox、Minecraft、Steamプレイヤー向けのコスパグッズ。", cta: "おすすめを見る" },
    about: { title: "PlayZoneX について", desc: "コンテンツ方針、データソース、コラボレーション情報。" },
    guide: { eyebrow: "攻略", articleTitle: "核心コンテンツ", quickStart: "クイックスタート", updateTitle: "更新方針", faqTitle: "よくある質問", faqUpdate: "どのくらいの頻度で更新されますか？", faqUpdateAnswer: "核心データは毎日または4時間ごとに更新。攻略はイベントやバージョン変化に応じてメンテナンスされます。", faqDownload: "ゲームの直接ダウンロードは提供していますか？", faqDownloadAnswer: "いいえ。当サイトはナビゲーション、攻略、おすすめのみを提供し、ゲームリンクは公式プラットフォームへ飛びます。", relatedTitle: "関連リンク" },
    codes: { eyebrow: "Roblox コード", copy: "コピー", note: "コードはゲーム内で使用する必要があります。期限切れコードは短期間履歴として残ります。" },
    servers: { title: "Minecraft サーバーステータス", desc: "公開Minecraftサーバーのオンライン人数、バージョン、ステータス。", source: "ソース", refresh: "ステータス更新" },
    detail: { free: "無料", rating: "評価", plays: "プレイ数", official: "公式でプレイ", moreSame: "類似ゲーム" },
    gameCardHint: "公式プレイ入口、魅力、類似おすすめ。",
    status: { active: "有効", checking: "確認中", expired: "期限切れ" }
  },
  zh: {
    siteName: "PlayZoneX",
    titleSuffix: " | PlayZoneX",
    nav: { home: "首页", online: "在线游戏", roblox: "Roblox", minecraft: "Minecraft", steam: "Steam", edu: "教育游戏", gear: "装备" },
    langLabel: "语言",
    searchPlaceholder: "搜索游戏、攻略、兑换码...",
    home: { eyebrow: "免费游戏 · 攻略 · 优惠", h1: "发现你的下一款最爱游戏", lead: "10,000+ 免费在线游戏 | Roblox 攻略 | Minecraft 模组 | Steam 免费游戏 | Wordle 与 Blooket 技巧" },
    categories: { eyebrow: "分类", title: "热门分类", subtitle: "按玩法快速进入。" },
    picks: { eyebrow: "今日推荐", title: "今日推荐", viewAll: "查看全部" },
    guides: { eyebrow: "攻略", title: "攻略速递", subtitle: "覆盖 Roblox 兑换码、Minecraft 服务器、Steam 折扣与教育游戏技巧。" },
    gear: { eyebrow: "装备", title: "找到你的完美游戏装备" },
    footer: "一个面向全球休闲玩家的免费在线游戏发现、攻略与推荐站。所有外部游戏均跳转官方平台，不嵌入版权游戏内容。",
    lobby: { title: "在线游戏大厅", desc: "10,000+ 免费游戏，无需下载，即点即玩。" },
    filterAll: "全部",
    sortTitle: "按名称",
    sortRating: "评分最高",
    sortPlays: "最热",
    showing: "正在展示 {n} 款精选游戏",
    loadMore: "加载更多",
    roblox: { title: "Roblox 攻略中心", desc: "热门游戏攻略、兑换码、皮肤获取和趋势数据。" },
    minecraft: { title: "Minecraft 专区", desc: "模组推荐、服务器状态、建筑教程、地图种子和指令大全。" },
    steam: { title: "Steam 推荐", desc: "免费游戏、折扣追踪、新品评测和适合休闲玩家的低门槛选择。" },
    blooket: { title: "Blooket 玩法与技巧", desc: "课堂模式、金币效率、活动玩法。" },
    wordle: { title: "Wordle 每日答案 + 攻略", desc: "保留提示、分步揭晓、开局词建议。" },
    gearPage: { title: "游戏设备推荐", desc: "针对在线小游戏、Roblox、Minecraft 与 Steam 休闲玩家的高性价比设备清单。", cta: "查看推荐" },
    about: { title: "关于 PlayZoneX", desc: "PlayZoneX 是一个静态优先的游戏导航与攻略站，专注合规外链、清晰分类和可持续更新。" },
    guide: { eyebrow: "攻略", articleTitle: "核心内容", quickStart: "快速上手", updateTitle: "更新策略", faqTitle: "常见问题", faqUpdate: "多久更新？", faqUpdateAnswer: "核心数据按每日或每 4 小时更新，攻略内容按活动和版本变化维护。", faqDownload: "是否直接提供游戏下载？", faqDownloadAnswer: "不提供。本站只做导航、攻略与推荐，游戏入口跳转官方平台。", relatedTitle: "相关入口" },
    codes: { eyebrow: "Roblox 兑换码", copy: "复制", note: "兑换码需以游戏内实际可用状态为准，过期码会保留短期历史记录。" },
    servers: { title: "Minecraft 服务器状态", desc: "公开 Minecraft 服务器的在线人数、版本和状态。", source: "数据来源", refresh: "刷新状态" },
    detail: { free: "免费", rating: "评分", plays: "plays", official: "前往官方游玩", moreSame: "相似游戏" },
    gameCardHint: "官方游玩入口、玩法亮点和相似推荐。",
    status: { active: "有效", checking: "确认中", expired: "已过期" }
  }
};

function t(lang, key) {
  const dict = i18n[lang] || i18n.en;
  return key.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : ""), dict) || "";
}

function esc(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const nav = [
  ["home", "/", "nav.home"],
  ["online", "/online-games/", "nav.online"],
  ["roblox", "/roblox/", "nav.roblox"],
  ["minecraft", "/minecraft/", "nav.minecraft"],
  ["steam", "/steam/", "nav.steam"],
  ["edu", "/edu-games/", "nav.edu"],
  ["gear", "/gear/", "nav.gear"]
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

function pageUrl(page, lang) {
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${DOMAIN}${prefix}${page.path}`;
}

function hreflangTags(page, currentLang) {
  return LANGUAGES.map((l) => {
    const href = pageUrl(page, l);
    return `<link rel="alternate" hreflang="${l}${l === 'zh' ? '-CN' : ''}" href="${esc(href)}">`;
  }).join("\n  ") + `\n  <link rel="alternate" hreflang="x-default" href="${esc(pageUrl(page, "en"))}">`;
}

function langSwitcher(page, currentLang) {
  const options = LANGUAGES.map((l) => {
    const label = { en: "English", es: "Español", pt: "Português", fr: "Français", de: "Deutsch", ja: "日本語", zh: "中文" }[l];
    const selected = l === currentLang ? " selected" : "";
    return `<option value="${esc(pageUrl(page, l))}"${selected}>${label}</option>`;
  }).join("");
  return `<label class="lang-switch" aria-label="${esc(t(currentLang, "langLabel"))}"><span>${icon("route")}</span><select data-lang-switch>${options}</select></label>`;
}

const AD_SLOTS = {
  top: process.env.PLAYZONEX_AD_SLOT_TOP || "",
  sidebar: process.env.PLAYZONEX_AD_SLOT_SIDEBAR || "",
  inline: process.env.PLAYZONEX_AD_SLOT_INLINE || "",
  bottom: process.env.PLAYZONEX_AD_SLOT_BOTTOM || ""
};

function getAdHtml(zone, lang = "en") {
  if (!AD_CLIENT || !AD_SLOTS[zone]) {
    return `<div class="ad-shell ad-shell-${zone}" aria-label="Advertisement"><span>Ad slot</span></div>`;
  }
  const slot = AD_SLOTS[zone] || AD_SLOTS.top;
  let style = "display:block;text-align:center;";
  if (zone === "top") style += "margin:18px auto;max-width:728px;width:100%;min-height:90px;";
  else if (zone === "sidebar") style += "width:160px;height:600px;";
  else if (zone === "inline") style += "margin:24px auto;max-width:336px;width:100%;min-height:280px;";
  else if (zone === "bottom") style += "margin:28px auto;max-width:728px;width:100%;min-height:90px;";
  return `<div class="ad-wrapper ad-wrapper-${zone}" style="${style}">
    <ins class="adsbygoogle" style="display:block;" data-ad-client="${AD_CLIENT}" data-ad-slot="${slot}" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
  </div>`;
}

function pageMeta(page, lang) {
  const map = i18n[lang] || i18n.en;
  if (page.path === "/") {
    return { title: `${map.home.h1} - PlayZoneX`, desc: map.home.lead };
  }
  if (page.type === "lobby") {
    return { title: `${map.lobby.title} - PlayZoneX`, desc: map.lobby.desc };
  }
  if (page.type === "category") {
    const title = categoryI18n[page.category]?.[lang] || site.categories.find((c) => c.slug === page.category)?.title || page.title;
    const desc = categoryDescI18n[page.category]?.[lang] || site.categories.find((c) => c.slug === page.category)?.desc || page.desc;
    return { title: `${title} - PlayZoneX`, desc };
  }
  if (page.type === "roblox") return { title: `${map.roblox.title} - PlayZoneX`, desc: map.roblox.desc };
  if (page.type === "minecraft") return { title: `${map.minecraft.title} - PlayZoneX`, desc: map.minecraft.desc };
  if (page.type === "steam") return { title: `${map.steam.title} - PlayZoneX`, desc: map.steam.desc };
  if (page.type === "blooket") return { title: `${map.blooket.title} - PlayZoneX`, desc: map.blooket.desc };
  if (page.type === "wordle") return { title: `${map.wordle.title} - PlayZoneX`, desc: map.wordle.desc };
  if (page.type === "gear") return { title: `${map.gearPage.title} - PlayZoneX`, desc: map.gearPage.desc };
  if (page.type === "about") return { title: `${map.about.title} - PlayZoneX`, desc: map.about.desc };
  if (page.type === "guide" && page.guide) return { title: `${page.guide.title} - PlayZoneX`, desc: page.guide.kicker };
  if (page.type === "codes") return { title: `${map.codes.eyebrow} - PlayZoneX`, desc: page.desc };
  if (page.type === "servers") return { title: `${map.servers.title} - PlayZoneX`, desc: map.servers.desc };
  if (page.type === "steam-list" && page.guide) return { title: `${page.guide.title} - PlayZoneX`, desc: page.guide.kicker };
  if (page.type === "detail" && page.game) return { title: `${page.game.title} - ${t(lang, "detail.official")} - PlayZoneX`, desc: `${page.game.title} game details, official play link and similar recommendations.` };
  return { title: page.title, desc: page.desc };
}

const layout = (page, body, lang = "en") => {
  const meta = pageMeta(page, lang);
  const labels = i18n[lang] || i18n.en;
  const searchIndex = [
    ...site.games.map((g) => ({ title: g.title, tags: g.category, url: `/game/${g.slug}/` })),
    ...site.codes.map((c) => ({ title: `${c.game} ${c.code}`, tags: "roblox code", url: "/roblox/codes/" })),
    ...site.minecraftMods.map((m) => ({ title: m.name, tags: `minecraft mod ${m.focus}`, url: "/minecraft/mods/" })),
    ...site.servers.map((s) => ({ title: s.name, tags: "minecraft server", url: "/minecraft/servers/" })),
    ...site.steamDeals.map((s) => ({ title: s.title, tags: `steam ${s.list}`, url: `/steam/${s.list === "deals" ? "deals" : s.list === "new" ? "new-releases" : s.list === "top" ? "top-rated" : "free-games"}/` })),
    ...site.pages.filter((p) => p.path !== "/").map((p) => ({ title: p.title.replace(" - PlayZoneX", ""), tags: p.nav, url: p.path }))
  ];
  const navLinks = nav.map(([key, href, labelKey]) => {
    const active = page.nav === key ? "active" : "";
    return `<a class="${active}" href="${href}">${esc(t(lang, labelKey))}</a>`;
  }).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": page.type === "detail" ? "VideoGame" : "WebPage",
    name: meta.title.replace(" - PlayZoneX", ""),
    description: meta.desc,
    url: pageUrl(page, lang)
  };
  if (page.type === "detail" && page.game) {
    schema.image = page.game.image;
    schema.aggregateRating = { "@type": "AggregateRating", ratingValue: page.game.rating, bestRating: "5" };
    schema.url = page.game.officialUrl;
  }
  return `<!doctype html>
<html lang="${lang}${lang === "zh" ? "-CN" : ""}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.desc)}">
  <link rel="canonical" href="${esc(pageUrl(page, lang))}">
  ${hreflangTags(page, lang)}
  <meta property="og:title" content="${esc(meta.title)}">
  <meta property="og:description" content="${esc(meta.desc)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${esc(pageUrl(page, lang))}">
  <meta property="og:image" content="${site.images.arcade}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.svg">
  <link rel="preconnect" href="https://images.unsplash.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/assets/styles.css">
  ${AD_CLIENT ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}" crossorigin="anonymous"></script>` : ""}
  ${GA_ID ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>` : ""}
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <header class="topbar">
    <div class="container nav-inner">
      <a class="brand" href="/">${labels.siteName}.xyz</a>
      <nav class="nav" aria-label="Primary">${navLinks}</nav>
      <div class="actions">
        <a class="icon-btn" href="/online-games/" aria-label="Search">${icon("search")}</a>
        ${langSwitcher(page, lang)}
        <button class="menu-btn" data-menu aria-label="Open navigation">${icon("menu")}</button>
        <a class="btn" href="/gear/">${esc(t(lang, "nav.gear"))}</a>
      </div>
    </div>
    <nav class="mobile-nav" data-mobile-nav aria-label="Mobile">${navLinks}</nav>
  </header>
  ${getAdHtml("top", lang)}
  ${body}
  ${getAdHtml("bottom", lang)}
  ${footer(lang)}
  <aside class="ad-sticky" aria-label="Advertisement">${getAdHtml("sidebar", lang)}</aside>
  <script>window.PlayZoneXSearch=${JSON.stringify(searchIndex)};</script>
  <script src="/assets/main.js" defer></script>
  <script>document.addEventListener('change',function(e){var t=e.target;if(t&&t.matches&&t.matches('[data-lang-switch]')){window.location.href=t.value;}});</script>
</body>
</html>`;
};

const footer = (lang = "en") => `<footer class="footer">
  <div class="container footer-grid">
    <div>
      <a class="brand" href="/">${t(lang, "siteName")}.xyz</a>
      <p>${esc(t(lang, "footer"))}</p>
    </div>
    <div><strong>${esc(t(lang, "nav.online"))}</strong><a href="/online-games/">${esc(t(lang, "nav.online"))}</a><a href="/online-games/action/">${esc(categoryI18n.action[lang])}</a><a href="/online-games/puzzle/">${esc(categoryI18n.puzzle[lang])}</a></div>
    <div><strong>${esc(t(lang, "nav.edu"))}</strong><a href="/edu-games/">Edu Games</a><a href="/edu-games/blooket/">Blooket</a><a href="/edu-games/wordle/">Wordle</a></div>
    <div><strong>Steam</strong><a href="/steam/free-games/">${esc(t(lang, "steam.title"))}</a><a href="/steam/deals/">Deals</a><a href="/steam/top-rated/">Top Rated</a></div>
    <div><strong>${esc(t(lang, "siteName"))}</strong><a href="/about/">${esc(t(lang, "about.title"))}</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></div>
  </div>
</footer>`;

const gameCard = (game, lang = "en") => `<article class="card" data-game-card data-category="${game.category}" data-rating="${game.rating}" data-plays="${game.rating}" data-title="${esc(game.title)}">
  <a href="/game/${game.slug}/">
    <div class="card-img"><img src="${game.image}" alt="${esc(game.title)} screenshot" loading="lazy"></div>
    <div class="card-body">
      <div class="meta">${game.tags.map((tag, i) => `<span class="badge ${i ? "" : "orange"}">${esc(tag)}</span>`).join("")}<span>★ ${game.rating}</span><span>${game.plays} ${t(lang, "detail.plays")}</span></div>
      <h3>${esc(game.title)}</h3>
      <p>${categoryName(game.category, lang)} · ${t(lang, "gameCardHint")}</p>
    </div>
  </a>
</article>`;

const categoryName = (slug, lang = "en") => categoryI18n[slug]?.[lang] || site.categories.find((c) => c.slug === slug)?.title || slug;

const heroSearch = (lang = "en") => `<div class="search-wrap">
  <input class="search-input" data-search placeholder="${esc(t(lang, "searchPlaceholder"))}" autocomplete="off">
  <button class="search-submit" aria-label="Search">${icon("search")}</button>
  <div class="suggestions" data-suggestions></div>
</div>`;

const home = (lang = "en") => `<main>
  <section class="hero" style="--hero:url('${site.images.arcade}')">
    <div class="hero-particles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="hero-content">
      <div class="eyebrow">${esc(t(lang, "home.eyebrow"))}</div>
      <h1>${esc(t(lang, "home.h1"))}</h1>
      <p class="lead">${esc(t(lang, "home.lead"))}</p>
      ${heroSearch(lang)}
      <div class="chips">${["Poki", "Crazy Games", "Roblox", "Minecraft", "Steam", "Wordle"].map((x) => `<a class="chip" href="/online-games/">${x}</a>`).join("")}</div>
    </div>
  </section>
  <section class="section container">
    <div class="section-head"><div><div class="eyebrow">${esc(t(lang, "categories.eyebrow"))}</div><h2>${esc(t(lang, "categories.title"))}</h2></div><p>${esc(t(lang, "categories.subtitle"))}</p></div>
    <div class="grid cols-4">${site.categories.slice(0, 8).map((c) => `<a class="card" href="/online-games/${c.slug}/"><div class="card-body"><div class="meta">${icon(c.icon)}<span>${c.count}+ games</span></div><h3>${esc(categoryName(c.slug, lang))}</h3><p>${esc(categoryDescI18n[c.slug]?.[lang] || c.desc)}</p></div></a>`).join("")}</div>
  </section>
  <section class="section container">
    <div class="section-head"><div><div class="eyebrow">${esc(t(lang, "picks.eyebrow"))}</div><h2>${esc(t(lang, "picks.title"))}</h2></div><a class="btn secondary" href="/online-games/">${esc(t(lang, "picks.viewAll"))}</a></div>
    <div class="grid cols-4">${site.games.slice(0, 12).map((g) => gameCard(g, lang)).join("")}</div>
  </section>
  <section class="section container">${getAdHtml("inline", lang)}</section>
  <section class="section container">
    <div class="section-head"><div><div class="eyebrow">${esc(t(lang, "guides.eyebrow"))}</div><h2>${esc(t(lang, "guides.title"))}</h2></div><p>${esc(t(lang, "guides.subtitle"))}</p></div>
    <div class="grid cols-3">${site.robloxGuides.slice(0, 3).map((g) => guideCard(g, `/roblox/${g.slug}/`, lang)).join("")}${site.minecraftPages.slice(0, 3).map((g) => guideCard(g, `/minecraft/${g.slug}/`, lang)).join("")}${site.steamPages.slice(0, 3).map((g) => guideCard(g, `/steam/${g.slug}/`, lang)).join("")}</div>
  </section>
  <section class="section container"><div class="panel"><div class="section-head"><div><div class="eyebrow">${esc(t(lang, "gear.eyebrow"))}</div><h2>${esc(t(lang, "gear.title"))}</h2></div><a class="btn orange" href="/gear/">${esc(t(lang, "gearPage.cta"))}</a></div></div></section>
</main>`;

const guideCard = (g, href, lang = "en") => `<a class="card" href="${href}"><div class="card-img"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div><div class="card-body"><span class="badge">${esc(t(lang, "guide.eyebrow"))}</span><h3>${esc(g.title)}</h3><p>${g.kicker}</p></div></a>`;

const pageHero = (title, desc, image, eyebrow = "PlayZoneX", lang = "en") => `<section class="page-hero container">
  <div class="page-title">
    <div><div class="eyebrow">${esc(eyebrow)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div>
    <div class="hero-media"><img src="${image}" alt="${esc(title)}" loading="eager"></div>
  </div>
</section>`;

const cleanTitle = (title) => title.replace(" - PlayZoneX", "");

const lobby = (active, lang = "en") => {
  const list = active ? site.games.filter((g) => g.category === active) : site.games;
  const cat = active ? site.categories.find((c) => c.slug === active) : null;
  const title = active ? categoryName(active, lang) : t(lang, "lobby.title");
  const desc = active ? (categoryDescI18n[active]?.[lang] || cat.desc) : t(lang, "lobby.desc");
  return `<main>
    ${pageHero(title, desc, site.images.arcade, t(lang, "nav.online"), lang)}
    <section class="section container">
      ${getAdHtml("inline", lang)}
      <div class="filters" style="margin-top:32px"><button class="filter active" data-filter="all">${esc(t(lang, "filterAll"))}</button>${site.categories.map((c) => `<button class="filter" data-filter="${c.slug}">${esc(categoryName(c.slug, lang))}</button>`).join("")}</div>
      <div class="toolbar"><div class="meta">${esc(t(lang, "showing").replace("{n}", list.length))}</div><select class="select" data-sort><option value="title">${esc(t(lang, "sortTitle"))}</option><option value="rating">${esc(t(lang, "sortRating"))}</option><option value="plays">${esc(t(lang, "sortPlays"))}</option></select></div>
      <div class="grid cols-4" data-game-grid>${list.map((g) => gameCard(g, lang)).join("")}</div>
      <div style="text-align:center;margin-top:28px"><button class="btn secondary">${esc(t(lang, "loadMore"))}</button></div>
    </section>
  </main>`;
};

const roblox = (lang = "en") => `<main>
  ${pageHero(t(lang, "roblox.title"), t(lang, "roblox.desc"), site.images.roblox, "Roblox Hub", lang)}
  <section class="section container">
    <div class="stats"><div class="stat"><strong>${site.robloxTrending.length}</strong>Tracked Experiences</div><div class="stat"><strong>${site.codes.length}</strong>Code Records</div><div class="stat"><strong>${site.robloxGuides.length}</strong>Guides</div><div class="stat"><strong>Daily</strong>Manual Watch</div></div>
  </section>
  <section class="section container"><div class="section-head"><div><div class="eyebrow">Trend Watch</div><h2>Roblox Trending Games</h2></div><a class="btn" href="/roblox/codes/">${esc(t(lang, "codes.eyebrow"))}</a></div><div class="compact-list">${site.robloxTrending.map((g) => `<div class="compact-row"><strong>${esc(g.name)}</strong><span>${esc(g.players)}</span><span class="badge">${esc(g.trend)}</span></div>`).join("")}</div></section>
  <section class="section container"><div class="section-head"><div><div class="eyebrow">${esc(t(lang, "guides.eyebrow"))}</div><h2>${esc(t(lang, "guides.title"))}</h2></div><a class="btn" href="/roblox/codes/">${esc(t(lang, "codes.eyebrow"))}</a></div><div class="grid cols-3">${site.robloxGuides.map((g) => guideCard(g, `/roblox/${g.slug}/`, lang)).join("")}</div></section>
</main>`;

const minecraft = (lang = "en") => `<main>
  ${pageHero(t(lang, "minecraft.title"), t(lang, "minecraft.desc"), site.images.minecraft, "Minecraft Station", lang)}
  <section class="section container"><div class="split"><div class="grid cols-2">${site.minecraftPages.map((g) => guideCard(g, `/minecraft/${g.slug}/`, lang)).join("")}</div><aside class="panel"><h3>${esc(t(lang, "servers.title"))}</h3>${serverTable(lang)}<a class="btn secondary" href="/minecraft/servers/">${esc(t(lang, "servers.title"))}</a></aside></div></section>
  <section class="section container"><div class="section-head"><div><div class="eyebrow">Mods</div><h2>Popular Minecraft Mods</h2></div><a class="btn secondary" href="/minecraft/mods/">View Mods</a></div><div class="compact-list">${site.minecraftMods.slice(0, 12).map((m) => `<div class="compact-row"><strong>${esc(m.name)}</strong><span>${esc(m.version)}</span><span>${esc(m.focus)}</span></div>`).join("")}</div></section>
</main>`;

const steam = (lang = "en") => `<main>
  ${pageHero(t(lang, "steam.title"), t(lang, "steam.desc"), site.images.steam, "Steam Deals", lang)}
  <section class="section container"><div class="grid cols-2">${site.steamPages.map((s) => guideCard(s, `/steam/${s.slug}/`, lang)).join("")}</div></section>
</main>`;

const guide = (page, lang = "en") => `<main>
  ${pageHero(page.guide.title, page.guide.kicker, page.guide.image, t(lang, "guide.eyebrow"), lang)}
  <section class="section container"><div class="split"><article class="panel"><h2>${esc(t(lang, "guide.articleTitle"))}</h2>${articleBlocks(page.guide.title, lang)}${guideData(page)}${faq(page.guide.title, lang)}</article><aside class="panel">${getAdHtml("inline", lang)}<h3>${esc(t(lang, "guide.relatedTitle"))}</h3>${relatedLinks(page.nav, lang)}</aside></div></section>
</main>`;

const guideData = (page) => {
  if (page.path === "/minecraft/mods/") return `<h3>Recommended Mods</h3><div class="compact-list">${site.minecraftMods.map((m) => `<a class="compact-row" rel="nofollow noopener" href="${m.url}"><strong>${esc(m.name)}</strong><span>${esc(m.version)}</span><span>${esc(m.focus)}</span></a>`).join("")}</div>`;
  if (page.path === "/minecraft/builds/") return `<h3>Build Tutorials</h3><div class="compact-list">${site.minecraftBuilds.map((b) => `<div class="compact-row"><strong>${esc(b.title)}</strong><span>${esc(b.difficulty)}</span><span>${esc(b.materials)}</span></div>`).join("")}</div>`;
  if (page.path === "/minecraft/seeds/") return `<h3>Seed List</h3><div class="compact-list">${site.minecraftSeeds.map((s) => `<div class="compact-row"><strong>${esc(s.seed)}</strong><span>${esc(s.highlight)}</span></div>`).join("")}</div>`;
  if (page.path === "/minecraft/commands/") return `<h3>Command Cheatsheet</h3><div class="command-grid">${site.minecraftCommands.map((cmd) => `<code>${esc(cmd)}</code>`).join("")}</div>`;
  if (page.nav === "roblox") return `<h3>Action Checklist</h3><ul class="check-list"><li>Check official announcements before trading or redeeming codes.</li><li>Prioritize limited-time events, then permanent progression.</li><li>Never share account credentials or off-platform payment details.</li></ul>`;
  if (page.nav === "edu") return `<h3>Classroom Checklist</h3><ul class="check-list"><li>Keep rounds short and review missed answers immediately.</li><li>Use team modes when score gaps become too wide.</li><li>Mix recall questions with reasoning questions for retention.</li></ul>`;
  return "";
};

const articleBlocks = (title, lang = "en") => `<p>${esc(title)} ${t(lang, "guide.articleIntro") || t(lang, "guide.articleTitle")}</p>
<h3>${esc(t(lang, "guide.quickStart"))}</h3><p>${esc(t(lang, "guide.quickStartText") || "Confirm your goal: casual fun, efficiency, collection or ranking. PlayZoneX breaks key steps into actionable checklists and keeps official platform links.")}</p>
<h3>${esc(t(lang, "guide.updateTitle"))}</h3><p>${esc(t(lang, "guide.updateText") || "Pages can be updated by local scripts or GitHub Actions; cached content is shown when APIs are unavailable, avoiding blank pages.")}</p>`;

const faq = (title, lang = "en") => `<h3>${esc(t(lang, "guide.faqTitle"))}</h3><details open><summary>${esc(t(lang, "guide.faqUpdate").replace("{title}", title))}</summary><p>${esc(t(lang, "guide.faqUpdateAnswer"))}</p></details><details><summary>${esc(t(lang, "guide.faqDownload"))}</summary><p>${esc(t(lang, "guide.faqDownloadAnswer"))}</p></details>`;

const relatedLinks = (navKey, lang = "en") => {
  const links = nav.filter(([key]) => key === navKey || ["online", "gear", "about"].includes(key));
  return links.map(([, href, labelKey]) => `<a class="btn secondary" style="margin:6px 6px 6px 0" href="${href}">${esc(t(lang, labelKey))}</a>`).join("");
};

const codes = (page, lang = "en") => `<main>
  ${pageHero(t(lang, "codes.eyebrow"), page.desc, site.images.cyber, t(lang, "codes.eyebrow"), lang)}
  <section class="section container"><div class="split"><div class="panel"><h2>${esc(t(lang, "codes.eyebrow"))}</h2>${site.codes.map((c) => `<div class="code-row"><div><strong>${esc(c.code)}</strong><div class="meta">${esc(c.game)} · ${esc(c.reward)} · ${esc(c.lastChecked)} · <span class="status ${c.status}">${esc(t(lang, `status.${c.status}`))}</span></div></div><button class="copy-code" data-copy="${esc(c.code)}">${esc(t(lang, "codes.copy"))}</button></div>`).join("")}</div><aside class="panel">${getAdHtml("inline", lang)}<p>${esc(t(lang, "codes.note"))}</p><p>Data source: manual redemption watch and official/community announcement checks. Always verify in-game before trading.</p></aside></div></section>
</main>`;

const serverTable = (lang = "en") => `<table class="table"><thead><tr><th>Server</th><th>Version</th><th>Players</th><th>Status</th></tr></thead><tbody>${site.servers.map((s) => `<tr><td><strong>${s.name}</strong><div class="meta">${s.address}</div></td><td>${s.version}</td><td>${s.players}</td><td><span class="status ${s.status}">${esc(t(lang, `status.${s.status}`))}</span></td></tr>`).join("")}</tbody></table>`;

const servers = (page, lang = "en") => `<main>
  ${pageHero(t(lang, "servers.title"), t(lang, "servers.desc"), site.images.minecraft, "Live Status", lang)}
  <section class="section container"><div class="toolbar"><div class="meta">${esc(t(lang, "servers.source"))}: Minecraft Server Status API | Updated: <span data-server-updated>${new Date().toISOString().slice(0, 10)}</span></div><button class="btn" data-refresh-servers>${esc(t(lang, "servers.refresh"))}</button></div><div class="panel">${serverTable(lang)}</div></section>
</main>`;

const steamList = (page, lang = "en") => `<main>
  ${pageHero(cleanTitle(page.title), page.desc, page.guide.image, "Steam", lang)}
  <section class="section container"><div class="grid cols-3">${site.steamDeals.filter((g) => g.list === page.guide.list).map((g) => `<article class="card"><div class="card-img"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div><div class="card-body"><span class="badge green">${esc(g.price)}</span><h3>${esc(g.title)}</h3><p>${esc(g.rating)} · ${esc(t(lang, "steam.desc"))}</p><div class="spark">${g.history.map((v) => `<i style="height:${v}%"></i>`).join("")}</div><a class="btn secondary" rel="nofollow noopener" href="${g.url}">Steam</a></div></article>`).join("")}</div></section>
</main>`;

const edu = (lang = "en") => `<main>
  ${pageHero("Edu Games Hub", "Blooket, Wordle, Kahoot and Gimkit guides for classroom play and daily brain training.", site.images.blooket, t(lang, "nav.edu"), lang)}
  <section class="section container"><div class="grid cols-2">${site.eduPages.map((e) => guideCard(e, `/edu-games/${e.slug}/`, lang)).join("")}</div></section>
</main>`;

const blooket = (page, lang = "en") => `<main>
  ${pageHero(t(lang, "blooket.title"), t(lang, "blooket.desc"), page.guide.image, "Edu Games", lang)}
  <section class="section container"><div class="grid cols-3">${site.blooketModes.map((m, i) => `<article class="card"><div class="card-body"><span class="badge">${esc(m.mode)}</span><h3>${esc(m.goal)}</h3><p>${esc(m.tip)}</p><progress value="${70 + i * 4}" max="100" style="width:100%"></progress></div></article>`).join("")}</div></section>
</main>`;

const wordle = (page, lang = "en") => `<main>
  ${pageHero(t(lang, "wordle.title"), t(lang, "wordle.desc"), page.guide.image, "Daily Puzzle", lang)}
  <section class="section container"><div class="split"><article class="panel"><h2>${t(lang, "wordle.hints") || "Today's Hints"}</h2><p>${t(lang, "wordle.hint1") || "Hint 1: Start with a word that covers multiple vowels."}</p><p>${t(lang, "wordle.hint2") || "Hint 2: Avoid repeating letters before turn three."}</p><p>${t(lang, "wordle.hint3") || "Hint 3: Use confirmed consonants to narrow word families."}</p><button class="btn" data-reveal-wordle>${t(lang, "wordle.reveal") || "Reveal Practice Archive"}</button><div data-wordle-answer hidden class="compact-list">${site.wordleHistory.map((w) => `<div class="compact-row"><strong>${esc(w.date)}</strong><span>${esc(w.answer)}</span><span>${esc(w.source)}</span></div>`).join("")}</div></article><aside class="panel"><h3>${t(lang, "wordle.starters") || "Recommended Starters"}</h3><p>SLATE, ADIEU, ROAST ${t(lang, "wordle.startersDesc") || "cover high-frequency letters."}</p>${getAdHtml("inline", lang)}</aside></div></section>
</main>`;

const gear = (lang = "en") => `<main>
  ${pageHero(t(lang, "gearPage.title"), t(lang, "gearPage.desc"), site.images.gear, "Affiliate Gear", lang)}
  <section class="section container"><div class="grid cols-3">${site.gear.map((g) => `<article class="card"><div class="card-img"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div><div class="card-body"><span class="badge orange">${g.price}</span><h3>${esc(g.title)}</h3><p>${esc(g.spec)}</p><p class="meta">${esc(g.disclosure)}</p><a class="btn secondary" rel="sponsored nofollow noopener" href="${g.url}">${esc(t(lang, "gearPage.cta"))}</a></div></article>`).join("")}</div></section>
</main>`;

const legal = (page, lang = "en") => `<main>
  ${pageHero(page.title, page.desc, site.images.arcade, "PlayZoneX", lang)}
  <section class="section container"><article class="panel"><h2>${esc(page.title)}</h2><p>PlayZoneX is a static game discovery and guide website. We link to official game platforms, public resources and product search pages, and we do not host third-party copyrighted games.</p><p>Analytics and advertising scripts are loaded only when production environment variables are configured. External links may use sponsored or nofollow attributes where appropriate.</p><p>Contact: support@playzonex.xyz</p></article></section>
</main>`;

const about = (lang = "en") => `<main>
  ${pageHero(t(lang, "about.title"), t(lang, "about.desc"), site.images.arcade, "About", lang)}
  <section class="section container"><div class="panel"><h2>${esc(t(lang, "about.principles") || "Content Principles")}</h2><p>${esc(t(lang, "about.principlesText") || "We do not embed third-party copyrighted games or host unauthorized resources; we only provide official links, guides, categories and gear recommendations. Data is updated by public APIs, manual JSON and scheduled tasks.")}</p><h3>${esc(t(lang, "about.stack") || "Tech Stack")}</h3><p>${esc(t(lang, "about.stackText") || "Pure HTML/CSS/Vanilla JS static pages, deployable to GitHub Pages; the build script generates sitemap, robots, manifest and all pseudo-static directories.")}</p></div></section>
</main>`;

const detail = (page, lang = "en") => {
  const g = page.game;
  return `<main class="container">
    <section class="detail-hero">
      <div class="play-cover"><img src="${g.image}" alt="${esc(g.title)}"><div class="play-overlay"><a class="play-circle" href="${g.officialUrl}" rel="nofollow noopener">${icon("play")}</a></div></div>
      <aside class="panel"><div class="eyebrow">Game Detail</div><h1>${g.title}</h1><div class="meta"><span class="badge orange">${esc(t(lang, "detail.free"))}</span><span>★ ${g.rating}</span><span>${g.plays} ${t(lang, "detail.plays")}</span></div><p>${categoryName(g.category, lang)} ${t(lang, "gameCardHint")}</p><a class="btn" href="${g.officialUrl}" rel="nofollow noopener">${esc(t(lang, "detail.official"))}</a><a class="btn secondary" href="/online-games/${g.category}/">${esc(t(lang, "detail.moreSame"))}</a></aside>
    </section>
    <section class="section">${getAdHtml("inline", lang)}<div class="section-head"><div><div class="eyebrow">Similar</div><h2>${esc(t(lang, "detail.moreSame"))}</h2></div></div><div class="grid cols-4">${site.games.filter((x) => x.slug !== g.slug).slice(0, 4).map((x) => gameCard(x, lang)).join("")}</div></section>
  </main>`;
};

const renderBody = (page, lang = "en") => {
  if (page.type === "home") return home(lang);
  if (page.type === "lobby") return lobby(null, lang);
  if (page.type === "category") return lobby(page.category, lang);
  if (page.type === "roblox") return roblox(lang);
  if (page.type === "minecraft") return minecraft(lang);
  if (page.type === "steam") return steam(lang);
  if (page.type === "edu") return edu(lang);
  if (page.type === "codes") return codes(page, lang);
  if (page.type === "servers") return servers(page, lang);
  if (page.type === "steam-list") return steamList(page, lang);
  if (page.type === "blooket") return blooket(page, lang);
  if (page.type === "wordle") return wordle(page, lang);
  if (page.type === "gear") return gear(lang);
  if (page.type === "legal") return legal(page, lang);
  if (page.type === "about") return about(lang);
  if (page.type === "detail") return detail(page, lang);
  return guide(page, lang);
};

const renderPage = (page, lang = "en") => layout(page, renderBody(page, lang), lang);

module.exports = { renderPage, LANGUAGES, pageUrl };
