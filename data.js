// Base de données de Fire Emblem: Fortune's Weave (Classes avec taux officiels & Personnages)

const SKILLS_LIST = [
  // 7 Armes & Sorts
  { id: "sword", name: "Épée", category: "Arme", icon: "images/sword.png" },
  { id: "lance", name: "Lance", category: "Arme", icon: "images/lance.png" },
  { id: "axe", name: "Hache", category: "Arme", icon: "images/axe.png" },
  { id: "bow", name: "Arc", category: "Arme", icon: "images/bow.png" },
  { id: "brawl", name: "Pugilat", category: "Arme", icon: "images/brawl.png" },
  { id: "black_magic", name: "Magie Noire", category: "Sort", icon: "images/black_magic.png" },
  { id: "white_magic", name: "Magie Blanche", category: "Sort", icon: "images/white_magic.png" },

  // 5 Talents
  { id: "authority", name: "Autorité", category: "Talent", icon: "images/authority.png" },
  { id: "infantry", name: "Infanterie", category: "Talent", icon: "images/infantry.png" },
  { id: "cavalry", name: "Cavalerie", category: "Talent", icon: "images/cavalry.png" },
  { id: "heavy_armor", name: "Cuirassier", category: "Talent", icon: "images/heavy_armor.png" },
  { id: "flying", name: "Aérien", category: "Talent", icon: "images/flying.png" }
];

// Configuration des Factions (Thèmes et Icônes personnalisées)
const FACTIONS_DATA = {
  "Ribeira Winds": { icon: "images/ribeira_winds_banner.webp" },
  "Ribeira Winds (Lord)": { icon: "images/ribeira_winds_banner.webp" },
  "House Lamine": { icon: "images/house_lamine_banner.webp" },
  "House Lamine (Lord)": { icon: "images/house_lamine_banner.webp" },
  "Megaira's Beacon": { icon: "images/megaira_beacon_banner.webp" },
  "Megaira's Beacon (Lord)": { icon: "images/megaira_beacon_banner.webp" },
  "Rose Tempest": { icon: "images/rose_tempest_banner.webp" },
  "Rose Tempest (Lord)": { icon: "images/rose_tempest_banner.webp" },
  "Armée du Sauveur (Auto)": { icon: "images/rbp_banner.png" },
  "Fiery Mane": { icon: "images/fiery_banner.webp" },
  "Linaria Dewdrops": { icon: "images/linaria_banner.webp" },
  "Tale of the Moon": { icon: "images/tale_moon_banner.webp" },
  "Bridal Party": { icon: "images/bride_banner.webp" }
};

const CLASSES = [
// ========================
// 1. CLASSES NOVICE (Beginner)
// ========================
  {
    id: "gladiator",
    name: "Gladiateur",
    tier: "Novice",
    growths: { hp: 10, str: 10, mag: 0, spd: 0, dex: 0, def: 0, res: 0, lck: 0, cha: 0 },
    allowed: ["sword", "axe", "brawl", "infantry", "authority"],
    focus: ["str", "hp"],
    atk_type: [""]
  },
  {
    id: "hunter",
    name: "Chasseur",
    tier: "Novice",
    growths: { hp: 10, str: 0, mag: 0, spd: 10, dex: 10, def: 0, res: 0, lck: 0, cha: 0 },
    allowed: ["sword", "bow", "infantry", "authority"],
    focus: ["dex", "spd"],
    atk_type: [""]
  },
  {
    id: "soldier",
    name: "Soldat",
    tier: "Novice",
    growths: { hp: 10, str: 5, mag: 0, spd: -5, dex: 5, def: 10, res: 0, lck: 0, cha: 0 },
    allowed: ["sword", "lance", "axe", "infantry", "heavy_armor", "authority"],
    focus: ["def", "str"],
    atk_type: [""],
    masterTech: {
      name: "RBP PAS DE NOM",
      desc: "Confère def +1 / Capacité Pivot ",
      icon: "images/frc_mag.png"
    }
  },
  {
    id: "ornius_rider",
    name: "Cavalier Ornius",
    tier: "Novice",
    growths: { hp: 10, str: 0, mag: 0, spd: 10, dex: 0, def: 0, res: 5, lck: 5, cha: 0 },
    allowed: ["sword", "lance", "axe", "cavalry", "flying", "authority"],
    focus: ["spd", "hp"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
    ],
    masterTech: {
      name: "Notions d'offensive",
      desc: "Confère Frc/Mag +1.",
      icon: "images/frc_mag.png"
    }
  },
  {
    id: "diviner",
    name: "Devin",
    tier: "Novice",
    growths: { hp: 5, str: -5, mag: 15, spd: 0, dex: 5, def: -5, res: 10, lck: 0, cha: 0 },
    allowed: ["sword", "axe", "brawl", "white_magic", "black_magic", "infantry", "authority"],
    focus: ["mag", "res"],
    atk_type: [""]
  },

// ========================
// 2. CLASSES SPÉCIALISÉES (Specialty)
// ========================
  {
    id: "myrmidon",
    name: "Épéiste",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: 0, spd: 15, dex: 10, def: 0, res: 0, lck: 5, cha: 5 },
    allowed: ["sword", "lance", "infantry", "authority"],
    focus: ["spd", "dex"],
    atk_type: [""]
  },
  {
    id: "brigand",
    name: "Brigand",
    tier: "Avancée",
    growths: { hp: 15, str: 15, mag: -5, spd: 5, dex: 0, def: 5, res: 0, lck: 0, cha: 5 },
    allowed: ["sword", "axe", "brawl", "infantry", "authority"],
    focus: ["str", "hp"],
    atk_type: [""]
  },
  {
    id: "pugilist",
    name: "Lutteur",
    tier: "Avancée",
    growths: { hp: 15, str: 10, mag: -5, spd: 10, dex: 5, def: 10, res: 0, lck: 0, cha: 5 },
    allowed: ["brawl", "infantry", "authority"],
    focus: ["hp", "str", "def"],
    atk_type: [""]
  },
  {
    id: "archer",
    name: "Archer",
    tier: "Avancée",
    growths: { hp: 10, str: 5, mag: 0, spd: 10, dex: 10, def: 5, res: 0, lck: 5, cha: 5 },
    allowed: ["bow", "infantry", "authority"],
    focus: ["dex", "spd"],
    atk_type: [""]
  },
  {
    id: "rogue",
    name: "Escroc",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: 0, spd: 15, dex: 10, def: 0, res: 5, lck: 5, cha: 0 },
    allowed: ["sword", "bow", "infantry", "authority"],
    focus: ["spd", "dex"],
    atk_type: [""]
  },
  {
    id: "armored_knight",
    name: "Combattant Cuirassé",
    tier: "Avancée",
    growths: { hp: 10, str: 10, mag: -5, spd: -5, dex: 5, def: 25, res: -5, lck: 0, cha: 5 },
    allowed: ["sword", "lance", "axe", "infantry", "heavy_armor", "authority"],
    focus: ["def", "str"],
    atk_type: [""]
  },
  {
    id: "light_cavalry",
    name: "Cavalerie Légère",
    tier: "Avancée",
    growths: { hp: 10, str: 5, mag: -5, spd: 5, dex: 0, def: 5, res: 0, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "axe", "cavalry", "authority"],
    focus: ["hp", "cha"],
    atk_type: [""]
  },
  {
    id: "charioteer",
    name: "Aurige",
    tier: "Avancée",
    growths: { hp: 10, str: 5, mag: -5, spd: -5, dex: 15, def: 10, res: 0, lck: 5, cha: 10 },
    allowed: ["bow", "cavalry", "authority"],
    focus: ["dex", "def", "cha"],
    atk_type: [""]
  },
  {
    id: "armored_ornius",
    name: "Cuirassier Ornius",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: -5, spd: 10, dex: 5, def: 10, res: 0, lck: 5, cha: 5 },
    allowed: ["sword", "lance", "axe", "cavalry", "flying", "authority"],
    focus: ["spd", "def"],
    atk_type: [""]
  },
  {
    id: "wing_soldier",
    name: "Soldat Ailé",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: 5, spd: 0, dex: 5, def: 5, res: 5, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "flying", "authority"],
    focus: ["hp", "cha"],
    atk_type: [""]
  },
  {
    id: "shaman",
    name: "Shaman",
    tier: "Avancée",
    growths: { hp: 5, str: -5, mag: 15, spd: 10, dex: 10, def: -10, res: 10, lck: 10, cha: 0 },
    allowed: ["sword", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    focus: ["mag", "res"],
    atk_type: [""]
  },
  {
    id: "priest",
    name: "Prêtre",
    tier: "Avancée",
    growths: { hp: 5, str: -5, mag: 10, spd: 5, dex: 5, def: -10, res: 15, lck: 15, cha: 10 },
    allowed: ["axe", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    focus: ["res", "lck"],
    atk_type: [""]
  },

// ========================
// 3. CLASSES ÉLITE (Advanced / Expert)
// ========================
  {
    id: "shido",
    name: "Shido",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 15, dex: 10, def: 0, res: -5, lck: 5, cha: 5 },
    allowed: ["sword", "lance", "infantry", "authority"],
    focus: ["spd", "dex"],
    atk_type: [""]
  },
  {
    id: "dancer",
    name: "Danseur",
    tier: "Élite",
    growths: { hp: 15, str: 5, mag: 0, spd: 25, dex: 10, def: 0, res: 5, lck: 10, cha: 20 },
    allowed: ["sword", "bow", "infantry", "authority"],
    focus: ["spd", "cha"],
    atk_type: [""]
  },
  {
    id: "warrior",
    name: "Guerrier",
    tier: "Élite",
    growths: { hp: 20, str: 20, mag: -5, spd: 0, dex: 0, def: 5, res: -5, lck: 0, cha: 5 },
    allowed: ["sword", "axe", "brawl", "infantry", "authority"],
    focus: ["hp", "str"],
    atk_type: [""]
  },
  {
    id: "blacksmith",
    name: "Forgeron",
    tier: "Élite",
    growths: { hp: 15, str: 10, mag: 10, spd: 0, dex: 5, def: 10, res: 10, lck: 0, cha: 5 },
    allowed: ["axe", "black_magic", "infantry", "authority"],
    focus: ["hp", "str", "def", "res"],
    atk_type: [""]
  },
  {
    id: "sniper",
    name: "Archer d'Élite",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 10, dex: 20, def: 5, res: 5, lck: 5, cha: 5 },
    allowed: ["bow", "infantry", "authority"],
    focus: ["dex"],
    atk_type: [""]
  },
  {
    id: "sylvan_cavalier",
    name: "Cavalier Sylvain",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 10, dex: 10, def: 5, res: 5, lck: 5, cha: 5 },
    allowed: ["sword", "bow", "cavalry", "authority"],
    focus: ["spd", "dex"],
    atk_type: [""]
  },
  {
    id: "ranger",
    name: "Rodeur",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 15, dex: 15, def: 0, res: 10, lck: 15, cha: 0 },
    allowed: ["sword", "bow", "infantry", "authority"],
    focus: ["spd", "dex", "lck"],
    atk_type: [""]
  },
  {
    id: "elephan rider",
    name: "Cavalier d'Élephant",
    tier: "Élite",
    growths: { hp: 20, str: 10, mag: -5, spd: 20, dex: -10, def: 15, res: -5, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "axe", "authority"],
    focus: ["spd", "dex", "lck"],
    atk_type: [""]
  },
  {
    id: "Guardian", // C'est une Unité Soins Lance Heavy en eng = Guardian
    name: "Guardian",
    tier: "Élite",
    growths: { hp: 10, str: 10, mag: 0, spd: 0, dex: 5, def: 10, res: 15, lck: 5, cha: 5 },
    allowed: ["lance", "white_magic", "infantry", "heavy_armor", "authority"],
    focus: ["res", "str", "def"],
    atk_type: [""]
  },
  {
    id: "dreadnought",
    name: "Hoplite",
    tier: "Élite",
    growths: { hp: 15, str: 15, mag: -5, spd: -10, dex: 5, def: 30, res: -10, lck: 0, cha: 5 },
    allowed: ["lance", "axe", "infantry", "heavy_armor", "authority"],
    focus: ["def", "str"],
    atk_type: [""]
  },
  {
    id: "bard_cavalier",
    name: "Cavalier Bardé",
    tier: "Élite",
    growths: { hp: 10, str: 10, mag: -5, spd: 0, dex: 0, def: 5, res: 10, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "axe", "cavalry", "authority"],
    focus: ["str", "res", "cha"],
    atk_type: [""]
  },
  {
    id: "cataphract",
    name: "Cataphractaire",
    tier: "Élite",
    growths: { hp: 15, str: 15, mag: -5, spd: -10, dex: 0, def: 10, res: -5, lck: 0, cha: 5 },
    allowed: ["lance", "axe", "heavy_armor", "cavalry", "authority"],
    focus: ["hp", "str", "def"],
    atk_type: [""]
  },
  {
    id: "calander_cavalier",
    name: "Cavalier Calandre",
    tier: "Élite",
    growths: { hp: 15, str: 0, mag: 10, spd: 10, dex: 5, def: 10, res: 10, lck: 5, cha: 5 },
    allowed: ["sword", "lance", "axe", "black_magic", "cavalry", "flying", "authority"],
    focus: ["hp", "mag", "def", "res"],
    atk_type: [""]
  },
  {
    id: "dragon_rider_elite",
    name: "Cavalier Dragon",
    tier: "Élite",
    growths: { hp: 15, str: 5, mag: 0, spd: 5, dex: 0, def: 10, res: 10, lck: 10, cha: 5 },
    allowed: ["sword", "lance", "axe", "flying", "authority"],
    focus: ["hp", "def", "res", "lck"]
  },
  {
    id: "vate",
    name: "Vate",
    tier: "Élite",
    growths: { hp: 10, str: -5, mag: 20, spd: 5, dex: 15, def: -10, res: 15, lck: 10, cha: 0 },
    allowed: ["sword", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    focus: ["mag", "res", "dex"]
  },
  {
    id: "bishop",
    name: "Évêque",
    tier: "Élite",
    growths: { hp: 10, str: -5, mag: 15, spd: 0, dex: 5, def: -10, res: 20, lck: 20, cha: 10 },
    allowed: ["axe", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    focus: ["res", "lck", "mag"]
  },
  {
    id: "troubadour",
    name: "Troubadour",
    tier: "Élite",
    growths: { hp: 10, str: 0, mag: 15, spd: 0, dex: 5, def: 5, res: 15, lck: 15, cha: 10 },
    allowed: ["black_magic", "white_magic", "cavalry", "authority"],
    focus: ["mag", "res", "lck"]
  }
];

// Liste complète des personnages (inchangée)
const CHARACTERS = [
  {
    id: "cai",
    name: "Cai",
    faction: "Ribeira Winds (Lord)",
    portrait: "portrait/thumbs/cai.webp",
    baseStats: { hp: 26, str: 12, mag: 10, spd: 12, dex: 11, def: 8, res: 7, lck: 9, cha: 11 },
    growths: { hp: 45, str: 45, mag: 40, spd: 45, dex: 45, def: 35, res: 35, lck: 40, cha: 40 },
    proficiencies: ["sword", "lance", "axe", "black_magic", "cavalry", "authority"]
  },
  {
    id: "dietrich",
    name: "Dietrich",
    faction: "House Lamine (Lord)",
    portrait: "portrait/thumbs/dietrich.webp",
    baseStats: { hp: 28, str: 13, mag: 7, spd: 13, dex: 14, def: 9, res: 6, lck: 10, cha: 13 },
    growths: { hp: 50, str: 45, mag: 30, spd: 50, dex: 60, def: 40, res: 30, lck: 50, cha: 60 },
    proficiencies: ["sword", "lance", "bow", "infantry", "authority"]
  },
  {
    id: "theodora",
    name: "Theodora",
    faction: "Megaira's Beacon (Lord)",
    portrait: "portrait/thumbs/theodora.webp",
    baseStats: { hp: 31, str: 14, mag: 6, spd: 10, dex: 10, def: 11, res: 6, lck: 7, cha: 13 },
    growths: { hp: 70, str: 50, mag: 30, spd: 40, dex: 40, def: 40, res: 30, lck: 30, cha: 50 },
    proficiencies: ["axe", "lance", "brawl", "heavy_armor", "authority"]
  },
  {
    id: "leda",
    name: "Leda",
    faction: "Rose Tempest (Lord)",
    portrait: "portrait/thumbs/leda.webp",
    baseStats: { hp: 24, str: 9, mag: 10, spd: 15, dex: 13, def: 6, res: 9, lck: 7, cha: 14 },
    growths: { hp: 40, str: 35, mag: 35, spd: 65, dex: 50, def: 30, res: 35, lck: 25, cha: 55 },
    proficiencies: ["sword", "black_magic", "white_magic", "infantry", "authority"]
  },
  {
    id: "hong_hua",
    name: "Hong Hua",
    faction: "Armée du Sauveur (Auto)",
    portrait: "portrait/thumbs/hong_hua.webp",
    baseStats: { hp: 24, str: 7, mag: 14, spd: 12, dex: 12, def: 6, res: 12, lck: 8, cha: 10 },
    growths: { hp: 40, str: 30, mag: 45, spd: 45, dex: 45, def: 30, res: 45, lck: 30, cha: 40 },
    proficiencies: ["black_magic", "white_magic", "infantry", "authority"]
  },
  {
    id: "troy",
    name: "Troy",
    faction: "Armée du Sauveur (Auto)",
    portrait: "portrait/thumbs/troy.webp",
    baseStats: { hp: 25, str: 11, mag: 12, spd: 13, dex: 11, def: 7, res: 8, lck: 8, cha: 8 },
    growths: { hp: 40, str: 45, mag: 45, spd: 50, dex: 40, def: 30, res: 30, lck: 30, cha: 30 },
    proficiencies: ["sword", "bow", "black_magic", "infantry"]
  },
  {
    id: "tialla",
    name: "Tialla",
    faction: "Ribeira Winds",
    portrait: "portrait/thumbs/tialla.webp",
    baseStats: { hp: 22, str: 6, mag: 13, spd: 10, dex: 11, def: 5, res: 12, lck: 13, cha: 11 },
    growths: { hp: 30, str: 25, mag: 45, spd: 35, dex: 40, def: 20, res: 40, lck: 50, cha: 45 },
    proficiencies: ["white_magic", "black_magic", "bow", "infantry"]
  },
  {
    id: "peter",
    name: "Peter",
    faction: "Ribeira Winds",
    portrait: "portrait/thumbs/peter.webp",
    baseStats: { hp: 25, str: 10, mag: 5, spd: 12, dex: 15, def: 8, res: 6, lck: 9, cha: 8 },
    growths: { hp: 40, str: 35, mag: 20, spd: 45, dex: 60, def: 30, res: 25, lck: 35, cha: 30 },
    proficiencies: ["bow", "sword", "infantry"]
  },
  {
    id: "ultand",
    name: "Ultand",
    faction: "Ribeira Winds",
    portrait: "portrait/thumbs/ultand.webp",
    baseStats: { hp: 26, str: 11, mag: 11, spd: 9, dex: 11, def: 9, res: 12, lck: 14, cha: 12 },
    growths: { hp: 45, str: 40, mag: 40, spd: 35, dex: 40, def: 35, res: 45, lck: 55, cha: 50 },
    proficiencies: ["lance", "white_magic", "black_magic", "cavalry", "authority"]
  },
  {
    id: "fabio",
    name: "Fabio",
    faction: "House Lamine",
    portrait: "portrait/thumbs/fabio.webp",
    baseStats: { hp: 24, str: 6, mag: 15, spd: 9, dex: 11, def: 6, res: 13, lck: 9, cha: 8 },
    growths: { hp: 40, str: 25, mag: 50, spd: 35, dex: 40, def: 30, res: 45, lck: 35, cha: 30 },
    proficiencies: ["black_magic", "white_magic", "infantry"]
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    faction: "House Lamine",
    portrait: "portrait/thumbs/esmeralda.webp",
    baseStats: { hp: 30, str: 15, mag: 5, spd: 9, dex: 9, def: 13, res: 6, lck: 9, cha: 8 },
    growths: { hp: 55, str: 55, mag: 20, spd: 35, dex: 35, def: 45, res: 25, lck: 35, cha: 30 },
    proficiencies: ["axe", "lance", "brawl", "heavy_armor"]
  },
  {
    id: "mikaela",
    name: "Mikaela",
    faction: "House Lamine",
    portrait: "portrait/thumbs/mikaela.webp",
    baseStats: { hp: 28, str: 13, mag: 7, spd: 11, dex: 9, def: 11, res: 6, lck: 8, cha: 10 },
    growths: { hp: 50, str: 45, mag: 30, spd: 40, dex: 35, def: 40, res: 25, lck: 30, cha: 40 },
    proficiencies: ["lance", "sword", "axe", "cavalry", "flying"]
  },
  {
    id: "bonaventure",
    name: "Bonaventure",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/bonaventure.webp",
    baseStats: { hp: 24, str: 9, mag: 13, spd: 11, dex: 13, def: 7, res: 11, lck: 9, cha: 10 },
    growths: { hp: 35, str: 35, mag: 45, spd: 40, dex: 50, def: 30, res: 40, lck: 35, cha: 40 },
    proficiencies: ["bow", "black_magic", "white_magic", "infantry", "authority"]
  },
  {
    id: "tobias",
    name: "Tobias",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/tobias.webp",
    baseStats: { hp: 29, str: 13, mag: 5, spd: 8, dex: 10, def: 13, res: 5, lck: 8, cha: 10 },
    growths: { hp: 55, str: 60, mag: 15, spd: 25, dex: 30, def: 45, res: 20, lck: 40, cha: 35 },
    proficiencies: ["lance", "axe", "heavy_armor", "cavalry"]
  },
  {
    id: "lysander",
    name: "Lysander",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/lysander.webp",
    baseStats: { hp: 25, str: 10, mag: 11, spd: 12, dex: 12, def: 8, res: 10, lck: 10, cha: 12 },
    growths: { hp: 45, str: 40, mag: 25, spd: 50, dex: 35, def: 40, res: 25, lck: 30, cha: 30 },
    proficiencies: ["sword", "black_magic", "white_magic", "cavalry", "authority"]
  },
  {
    id: "lilian",
    name: "Lilian",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/lilian.webp",
    baseStats: { hp: 24, str: 10, mag: 9, spd: 14, dex: 12, def: 7, res: 11, lck: 11, cha: 11 },
    growths: { hp: 35, str: 35, mag: 30, spd: 40, dex: 55, def: 30, res: 35, lck: 50, cha: 25 },
    proficiencies: ["lance", "sword", "flying"]
  },
  {
    id: "buccar",
    name: "Buccar",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/buccar.webp",
    baseStats: { hp: 30, str: 14, mag: 4, spd: 11, dex: 10, def: 11, res: 5, lck: 8, cha: 9 },
    growths: { hp: 50, str: 50, mag: 20, spd: 25, dex: 40, def: 45, res: 20, lck: 30, cha: 35 },
    proficiencies: ["axe", "brawl", "infantry"]
  },
  {
    id: "sirocco",
    name: "Sirocco",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/sirocco.webp",
    baseStats: { hp: 26, str: 12, mag: 6, spd: 14, dex: 13, def: 8, res: 7, lck: 10, cha: 10 },
    growths: { hp: 40, str: 40, mag: 40, spd: 45, dex: 50, def: 35, res: 35, lck: 50, cha: 45 },
    proficiencies: ["sword", "bow", "cavalry", "flying"]
  },
  {
    id: "mu",
    name: "Mu",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/mu.jpeg", // Image test//
    baseStats: { hp: 23, str: 6, mag: 14, spd: 12, dex: 11, def: 5, res: 13, lck: 11, cha: 11 },
    growths: { hp: 50, str: 50, mag: 25, spd: 50, dex: 50, def: 40, res: 30, lck: 30, cha: 40 },
    proficiencies: ["black_magic", "white_magic", "infantry"]
  },
  {
    id: "olympia",
    name: "Olympia",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/olympia.webp",
    baseStats: { hp: 27, str: 12, mag: 8, spd: 12, dex: 12, def: 10, res: 9, lck: 9, cha: 13 },
    growths: { hp: 35, str: 35, mag: 50, spd: 35, dex: 35, def: 30, res: 40, lck: 40, cha: 40 },
    proficiencies: ["lance", "sword", "flying", "authority"]
  },
  {
    id: "jester",
    name: "Jester",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/jester.webp",
    baseStats: { hp: 25, str: 11, mag: 8, spd: 15, dex: 14, def: 7, res: 7, lck: 14, cha: 12 },
    growths: { hp: 40, str: 35, mag: 15, spd: 60, dex: 45, def: 35, res: 25, lck: 40, cha: 40 },
    proficiencies: ["sword", "bow", "brawl", "infantry"]
  },
  {
    id: "goliath",
    name: "Goliath",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/goliath.webp",
    baseStats: { hp: 34, str: 16, mag: 3, spd: 7, dex: 8, def: 14, res: 4, lck: 7, cha: 9 },
    growths: { hp: 55, str: 60, mag: 5, spd: 15, dex: 30, def: 50, res: 20, lck: 35, cha: 20 },
    proficiencies: ["axe", "brawl", "heavy_armor", "infantry"]
  },
  {
    id: "dante",
    name: "Dante",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/dante.webp",
    baseStats: { hp: 27, str: 13, mag: 7, spd: 12, dex: 12, def: 9, res: 7, lck: 9, cha: 11 },
    growths: { hp: 30, str: 30, mag: 45, spd: 40, dex: 40, def: 20, res: 40, lck: 45, cha: 30 },
    proficiencies: ["sword", "lance", "cavalry"]
  },
  {
    id: "diego",
    name: "Diego",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/diego.webp",
    baseStats: { hp: 26, str: 12, mag: 7, spd: 13, dex: 13, def: 9, res: 7, lck: 10, cha: 10 },
    growths: { hp: 45, str: 40, mag: 20, spd: 45, dex: 60, def: 35, res: 20, lck: 35, cha: 30 },
    proficiencies: ["lance", "bow", "cavalry"]
  },
  {
    id: "loretta",
    name: "Loretta",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/loretta.webp",
    baseStats: { hp: 23, str: 6, mag: 13, spd: 12, dex: 12, def: 6, res: 12, lck: 12, cha: 12 },
    growths: { hp: 35, str: 35, mag: 35, spd: 55, dex: 40, def: 30, res: 40, lck: 30, cha: 30 },
    proficiencies: ["white_magic", "sword", "infantry", "flying"]
  },
  {
    id: "ursula",
    name: "Ursula",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/ursula.webp",
    baseStats: { hp: 24, str: 8, mag: 13, spd: 13, dex: 13, def: 6, res: 11, lck: 9, cha: 11 },
    growths: { hp: 40, str: 35, mag: 35, spd: 50, dex: 50, def: 35, res: 30, lck: 40, cha: 45 },
    proficiencies: ["black_magic", "bow", "cavalry"]
  },
  {
    id: "ludia",
    name: "Ludia",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/ludia.webp",
    baseStats: { hp: 25, str: 11, mag: 8, spd: 14, dex: 13, def: 8, res: 8, lck: 10, cha: 11 },
    growths: { hp: 40, str: 35, mag: 20, spd: 55, dex: 45, def: 30, res: 20, lck: 30, cha: 30 },
    proficiencies: ["sword", "lance", "flying"]
  },
  {
    id: "nezha",
    name: "Nezha",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/nezah.webp",
    baseStats: { hp: 26, str: 12, mag: 9, spd: 14, dex: 13, def: 8, res: 8, lck: 11, cha: 11 },
    growths: { hp: 45, str: 45, mag: 25, spd: 45, dex: 50, def: 35, res: 25, lck: 30, cha: 25 },
    proficiencies: ["lance", "brawl", "flying"]
  },
  {
    id: "sha_lan",
    name: "Sha Lan",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/sha_lan.webp",
    baseStats: { hp: 24, str: 9, mag: 12, spd: 13, dex: 12, def: 7, res: 11, lck: 11, cha: 12 },
    growths: { hp: 35, str: 30, mag: 45, spd: 35, dex: 50, def: 30, res: 45, lck: 35, cha: 40 },
    proficiencies: ["sword", "white_magic", "infantry"]
  },
  {
    id: "dadao",
    name: "Dadao",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/dadao.webp",
    baseStats: { hp: 29, str: 14, mag: 5, spd: 10, dex: 11, def: 12, res: 6, lck: 8, cha: 9 },
    growths: { hp: 50, str: 55, mag: 20, spd: 30, dex: 35, def: 45, res: 20, lck: 25, cha: 30 },
    proficiencies: ["axe", "sword", "infantry"]
  },
  {
    id: "guzran",
    name: "Guzran",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/guzran.webp",
    baseStats: { hp: 31, str: 15, mag: 4, spd: 9, dex: 10, def: 12, res: 5, lck: 7, cha: 10 },
    growths: { hp: 45, str: 45, mag: 20, spd: 50, dex: 45, def: 35, res: 20, lck: 45, cha: 30 },
    proficiencies: ["axe", "lance", "heavy_armor"]
  },
  {
    id: "yang_jie",
    name: "Yang Jie",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/yang_jie.webp",
    baseStats: { hp: 26, str: 12, mag: 8, spd: 13, dex: 14, def: 8, res: 8, lck: 10, cha: 10 },
    growths: { hp: 50, str: 35, mag: 40, spd: 35, dex: 35, def: 30, res: 40, lck: 40, cha: 25 },
    proficiencies: ["brawl", "sword", "infantry"]
  },
  {
    id: "io",
    name: "Io",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/io.webp",
    baseStats: { hp: 23, str: 7, mag: 13, spd: 13, dex: 12, def: 6, res: 12, lck: 11, cha: 11 },
    growths: { hp: 45, str: 40, mag: 25, spd: 35, dex: 45, def: 40, res: 25, lck: 35, cha: 35 },
    proficiencies: ["black_magic", "white_magic", "flying"]
  },
  {
    id: "peppe",
    name: "Peppe",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/peppe.webp",
    baseStats: { hp: 25, str: 10, mag: 7, spd: 14, dex: 14, def: 7, res: 7, lck: 13, cha: 11 },
    growths: { hp: 30, str: 30, mag: 25, spd: 60, dex: 45, def: 30, res: 30, lck: 45, cha: 30 },
    proficiencies: ["bow", "sword", "infantry"]
  },
  {
    id: "noctula",
    name: "Noctula",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/noctula.webp",
    baseStats: { hp: 24, str: 8, mag: 14, spd: 12, dex: 12, def: 6, res: 12, lck: 8, cha: 10 },
    growths: { hp: 50, str: 45, mag: 20, spd: 45, dex: 40, def: 40, res: 20, lck: 35, cha: 30 },
    proficiencies: ["black_magic", "sword", "flying"]
  },
  {
    id: "sofia",
    name: "Sofia",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/sofia.webp",
    baseStats: { hp: 24, str: 9, mag: 11, spd: 13, dex: 12, def: 7, res: 11, lck: 11, cha: 13 },
    growths: { hp: 35, str: 30, mag: 45, spd: 30, dex: 40, def: 25, res: 40, lck: 30, cha: 40 },
    proficiencies: ["lance", "white_magic", "cavalry"]
  },
  {
    id: "catania",
    name: "Catania",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/catania.webp",
    baseStats: { hp: 27, str: 13, mag: 6, spd: 12, dex: 12, def: 10, res: 7, lck: 9, cha: 11 },
    growths: { hp: 35, str: 35, mag: 35, spd: 55, dex: 50, def: 30, res: 35, lck: 40, cha: 45 },
    proficiencies: ["sword", "lance", "cavalry"]
  },
  {
    id: "nydine",
    name: "Nydine",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/nydine.webp",
    baseStats: { hp: 25, str: 10, mag: 10, spd: 13, dex: 13, def: 7, res: 10, lck: 10, cha: 11 },
    growths: { hp: 45, str: 40, mag: 30, spd: 45, dex: 40, def: 30, res: 25, lck: 35, cha: 35 },
    proficiencies: ["bow", "white_magic", "flying"]
  },
  {
    id: "zarcone",
    name: "Zarcone",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/zarcone.webp",
    baseStats: { hp: 28, str: 14, mag: 6, spd: 11, dex: 11, def: 11, res: 6, lck: 8, cha: 10 },
    growths: { hp: 40, str: 30, mag: 20, spd: 35, dex: 60, def: 30, res: 25, lck: 30, cha: 15 },
    proficiencies: ["axe", "brawl", "infantry"]
  },
  {
    id: "majide",
    name: "Majide",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/majide.webp",
    baseStats: { hp: 26, str: 11, mag: 11, spd: 12, dex: 12, def: 8, res: 10, lck: 9, cha: 11 },
    growths: { hp: 65, str: 50, mag: 15, spd: 20, dex: 30, def: 40, res: 10, lck: 25, cha: 5 },
    proficiencies: ["sword", "black_magic", "cavalry"]
  },
  {
    id: "benditz",
    name: "Benditz",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/benditz.webp",
    baseStats: { hp: 27, str: 12, mag: 6, spd: 12, dex: 14, def: 9, res: 7, lck: 10, cha: 9 },
    growths: { hp: 50, str: 35, mag: 20, spd: 35, dex: 50, def: 35, res: 25, lck: 30, cha: 35 },
    proficiencies: ["bow", "axe", "cavalry"]
  },
  {
    id: "inyoni",
    name: "Inyoni",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/inyoni.webp",
    baseStats: { hp: 24, str: 10, mag: 9, spd: 15, dex: 13, def: 7, res: 9, lck: 11, cha: 11 },
    growths: { hp: 40, str: 50, mag: 20, spd: 35, dex: 40, def: 40, res: 30, lck: 40, cha: 30 },
    proficiencies: ["lance", "bow", "flying"]
  },
  {
    id: "jasmine",
    name: "Jasmine",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/jasmine.webp",
    baseStats: { hp: 25, str: 9, mag: 12, spd: 13, dex: 12, def: 7, res: 11, lck: 11, cha: 13 },
    growths: { hp: 50, str: 40, mag: 20, spd: 30, dex: 45, def: 45, res: 25, lck: 40, cha: 45 },
    proficiencies: ["sword", "black_magic", "white_magic", "authority"]
  },
  {
    id: "alexandra",
    name: "Alexandra",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/alexandra.webp",
    baseStats: { hp: 28, str: 13, mag: 7, spd: 11, dex: 12, def: 11, res: 7, lck: 9, cha: 12 },
    growths: { hp: 30, str: 35, mag: 35, spd: 55, dex: 45, def: 30, res: 40, lck: 50, cha: 50 },
    proficiencies: ["lance", "sword", "heavy_armor", "authority"]
  },
  {
    id: "nuzzuo",
    name: "Nuzzuo",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/nuzzuo.webp",
    baseStats: { hp: 29, str: 14, mag: 5, spd: 10, dex: 10, def: 12, res: 6, lck: 9, cha: 9 },
    growths: { hp: 50, str: 50, mag: 15, spd: 5, dex: 45, def: 20, res: 15, lck: 25, cha: 35 },
    proficiencies: ["axe", "brawl", "heavy_armor"]
  },
  {
    id: "kiroc",
    name: "Kiroc",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/kiroc.webp",
    baseStats: { hp: 26, str: 12, mag: 8, spd: 13, dex: 13, def: 8, res: 8, lck: 10, cha: 10 },
    growths: { hp: 55, str: 40, mag: 15, spd: 55, dex: 50, def: 30, res: 15, lck: 30, cha: 25 },
    proficiencies: ["sword", "axe", "flying"]
  },
  {
    id: "bertrand",
    name: "Bertrand",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/bertrand.webp", // Image test//
    baseStats: { hp: 28, str: 11, mag: 4, spd: 7, dex: 10, def: 7, res: 3, lck: 4, cha: 9 },
    growths: { hp: 50, str: 55, mag: 15, spd: 45, dex: 50, def: 45, res: 20, lck: 30, cha: 50 },
    proficiencies: ["sword", "axe"]
  },
  {
    id: "talimun",
    name: "Talimun",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/talimun.webp", // Image test//
    baseStats: { hp: 27, str: 9, mag: 11, spd: 9, dex: 8, def: 6, res: 7, lck: 12, cha: 9 },
    growths: { hp: 45, str: 40, mag: 45, spd: 40, dex: 45, def: 35, res: 40, lck: 60, cha: 50 },
    proficiencies: ["sword", "black_magic"]
  },
  {
    id: "gaitz",
    name: "Gaitz",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/gaitz.webp", // Image test//
    baseStats: { hp: 27, str: 10, mag: 3, spd: 7, dex: 7, def: 6, res: 3, lck: 5, cha: 7 },
    growths: { hp: 50, str: 50, mag: 20, spd: 40, dex: 45, def: 45, res: 25, lck: 40, cha: 45 },
    proficiencies: ["sword", "cavalry"]
  },
  {
    id: "simon",
    name: "Simon",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/simon.webp", // Image test//
    baseStats: { hp: 28, str: 11, mag: 4, spd: 6, dex: 7, def: 7, res: 3, lck: 10, cha: 4 },
    growths: { hp: 50, str: 50, mag: 20, spd: 35, dex: 40, def: 40, res: 25, lck: 50, cha: 35 },
    proficiencies: ["sword", "axe"]
  },
  {
    id: "fianna",
    name: "Fianna",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/fianna.webp", // Image test//
    baseStats: { hp: 22, str: 4, mag: 11, spd: 5, dex: 6, def: 4, res: 8, lck: 4, cha: 7 },
    growths: { hp: 30, str: 35, mag: 55, spd: 30, dex: 40, def: 20, res: 45, lck: 25, cha: 40 },
    proficiencies: ["black_magic", "white_magic"]
  },
  {
    id: "orchel",
    name: "Orchel",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/orchel.webp", // Image test//
    baseStats: { hp: 22, str: 15, mag: 9, spd: 4, dex: 3, def: 12, res: 12, lck: 5, cha: 10 },
    growths: { hp: 30, str: 60, mag: 45, spd: 10, dex: 20, def: 60, res: 60, lck: 20, cha: 60 },
    proficiencies: ["sword", "axe"]
  },
  {
    id: "seteth",
    name: "Seteth",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/seteth.webp", // Image test//
    baseStats: { hp: 26, str: 10, mag: 7, spd: 8, dex: 7, def: 6, res: 6, lck: 6, cha: 8 },
    growths: { hp: 45, str: 45, mag: 30, spd: 40, dex: 45, def: 40, res: 35, lck: 30, cha: 50 },
    proficiencies: ["sword", "axe"]
  },
  {
    id: "ninae",
    name: "Ninae",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/ninae.webp", // Image test//
    baseStats: { hp: 28, str: 8, mag: 5, spd: 6, dex: 8, def: 6, res: 9, lck: 7, cha: 6 },
    growths: { hp: 45, str: 45, mag: 35, spd: 35, dex: 45, def: 35, res: 45, lck: 50, cha: 40 },
    proficiencies: ["sword", "axe"]
  },
  {
    id: "anatolia",
    name: "Anatolia",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/anatolia.webp", // Image test//
    baseStats: { hp: 25, str: 6, mag: 11, spd: 10, dex: 8, def: 6, res: 6, lck: 6, cha: 8 },
    growths: { hp: 40, str: 35, mag: 50, spd: 50, dex: 45, def: 35, res: 40, lck: 40, cha: 50 },
    proficiencies: ["sword", "axe"]
  },
  {
    id: "halvin",
    name: "Halvin",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/halvin.webp", // Image test//
    baseStats: { hp: 24, str: 7, mag: 5, spd: 8, dex: 9, def: 5, res: 5, lck: 7, cha: 6 },
    growths: { hp: 35, str: 35, mag: 30, spd: 45, dex: 60, def: 30, res: 25, lck: 40, cha: 35 },
    proficiencies: ["sword", "axe"]
  }
];


// Données de recrutement par route de Lord, classées par Renom puis Soutien
const RECRUITMENT_DATA = {
  cai: [
    { name: "Guzran", condition: "Auto", support: "Auto", renown: 3 },
    { name: "Yang Jie", condition: "S2, R3", support: "S2", renown: 3 },
    { name: "Noctula", condition: "S1, R4", support: "S1", renown: 4 },
    { name: "Majide", condition: "S2, R5", support: "S2", renown: 5 },
    { name: "Mikaela", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Halvin", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Nydine", condition: "S1, R6", support: "S1", renown: 6 },
    { name: "Nuzzuo", condition: "S2, R6", support: "S2", renown: 6 },
    { name: "Nezha", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Ninae", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Seteth", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Esmeralda", condition: "S2, R7", support: "S2", renown: 7 },
    { name: "Alexandra", condition: "S2, R7", support: "S2", renown: 7 },
    { name: "Dadao", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Loretta", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Goliath", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Jasmine", condition: "S1, R8", support: "S1", renown: 8 },
    { name: "Lilian", condition: "S2, R8", support: "S2", renown: 8 },
    { name: "Lysander", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Olympia", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Inyoni", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Kiroc", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Zarcone", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Simon", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Fianna", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Peppe", condition: "S1, R9", support: "S1", renown: 9 },
    { name: "Mu", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Sirocco", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Benditz", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Sofia", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Ludia", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Catania", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Io", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Dante", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Jester", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Ursula", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Diego", condition: "S3, R10", support: "S3", renown: 10 }
  ],
  leda: [
    { name: "Catania", condition: "Auto", support: "Auto", renown: 3 },
    { name: "Guzran", condition: "S1, R3", support: "S1", renown: 3 },
    { name: "Kiroc", condition: "S1, R4", support: "S1", renown: 4 },
    { name: "Jasmine", condition: "S2, R4", support: "S2", renown: 4 },
    { name: "Zarcone", condition: "S2, R5", support: "S2", renown: 5 },
    { name: "Dadao", condition: "S2, R5", support: "S2", renown: 5 },
    { name: "Loretta", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Fianna", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Io", condition: "S1, R6", support: "S1", renown: 6 },
    { name: "Esmeralda", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Mikaela", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Simon", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Inyoni", condition: "S1, R7", support: "S1", renown: 7 },
    { name: "Lilian", condition: "S2, R7", support: "S2", renown: 7 },
    { name: "Lysander", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Benditz", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Sofia", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Ludia", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Halvin", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Tialla", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Ultand", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Noctula", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Yang Jie", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Diego", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Sha Lan", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Ninae", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Fabio", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Nuzzuo", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Majide", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Nezha", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Peter", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Nydine", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Alexandra", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Dante", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Seteth", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Goliath", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Jester", condition: "S3, R10", support: "S3", renown: 10 }
  ],
  dietrich: [
    { name: "Yang Jie", condition: "Auto", support: "Auto", renown: 3 },
    { name: "Io", condition: "S2, R3", support: "S2", renown: 3 },
    { name: "Kiroc", condition: "S1, R4", support: "S1", renown: 4 },
    { name: "Nydine", condition: "S2, R5", support: "S2", renown: 5 },
    { name: "Ultand", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Noctula", condition: "S1, R6", support: "S1", renown: 6 },
    { name: "Lysander", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Olympia", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Goliath", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Jester", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Benditz", condition: "S2, R7", support: "S2", renown: 7 },
    { name: "Mu", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Zarcone", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Ursula", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Fianna", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Simon", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Catania", condition: "S1, R8", support: "S1", renown: 8 },
    { name: "Lilian", condition: "S2, R8", support: "S2", renown: 8 },
    { name: "Dante", condition: "S2, R8", support: "S2", renown: 8 },
    { name: "Peter", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Buccar", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Guzran", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Peppe", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Alexandra", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Majide", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Inyoni", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Ninae", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Nuzzuo", condition: "S1, R9", support: "S1", renown: 9 },
    { name: "Sirocco", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Tialla", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Sofia", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Jasmine", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Ludia", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Halvin", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Loretta", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Diego", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Nezha", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Sha Lan", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Dadao", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Gaitz", condition: "S3, R10", support: "S3", renown: 10 }
  ],
  theodora: [
    { name: "Sofia", condition: "Auto", support: "Auto", renown: 3 },
    { name: "Noctula", condition: "S1, R3", support: "S1", renown: 3 },
    { name: "Zarcone", condition: "S1, R4", support: "S1", renown: 4 },
    { name: "Sirocco", condition: "S1, R5", support: "S1", renown: 5 },
    { name: "Dadao", condition: "S2, R5", support: "S2", renown: 5 },
    { name: "Nydine", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Loretta", condition: "S3, R5", support: "S3", renown: 5 },
    { name: "Nuzzuo", condition: "S1, R6", support: "S1", renown: 6 },
    { name: "Alexandra", condition: "S1, R6", support: "S1", renown: 6 },
    { name: "Nezha", condition: "S2, R6", support: "S2", renown: 6 },
    { name: "Ultand", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Dante", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Ninae", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Seteth", condition: "S3, R6", support: "S3", renown: 6 },
    { name: "Peppe", condition: "S2, R7", support: "S2", renown: 7 },
    { name: "Peter", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Catania", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Simon", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Ludia", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Halvin", condition: "S3, R7", support: "S3", renown: 7 },
    { name: "Benditz", condition: "S1, R8", support: "S1", renown: 8 },
    { name: "Diego", condition: "S2, R8", support: "S2", renown: 8 },
    { name: "Mikaela", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Buccar", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Guzran", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Jasmine", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Majide", condition: "S3, R8", support: "S3", renown: 8 },
    { name: "Inyoni", condition: "S1, R9", support: "S1", renown: 9 },
    { name: "Mu", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Olympia", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Esmeralda", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Yang Jie", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Fianna", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Ursula", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Goliath", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Jester", condition: "S3, R9", support: "S3", renown: 9 },
    { name: "Tialla", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Io", condition: "S3, R10", support: "S3", renown: 10 },
    { name: "Kiroc", condition: "S3, R10", support: "S3", renown: 10 }
  ]
};

// Personnages fixes (déjà présents dans l'équipe de départ de chaque Héros)
const FIXED_ROSTER_DATA = {
  cai: ["Tialla", "Peter", "Ultand"],
  leda: ["Buccar", "Sirocco", "Mu", "Olympia"],
  dietrich: ["Fabio", "Esmeralda", "Mikaela"],
  theodora: ["Bonaventure", "Tobias", "Lilian", "Lysander"]
};