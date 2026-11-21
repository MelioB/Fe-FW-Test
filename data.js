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
    atk_type: [""],
    techniques: [],
    masterTech: {
      name: "Notions d'attaque",
      desc: "Confère Frc +1.",
      icon: "https://cdn.fireemblemwiki.org/4/43/Is_fe18_attack_basics.png"
    }
  },
  {
    id: "hunter",
    name: "Chasseur",
    tier: "Novice",
    growths: { hp: 10, str: 0, mag: 0, spd: 10, dex: 10, def: 0, res: 0, lck: 0, cha: 0 },
    allowed: ["sword", "bow", "infantry", "authority"],
    atk_type: [""],
    techniques: [],
    masterTech: {
      name: "Notions de chasse",
      desc: "Confère Tec/Vit +1.",
      icon: "https://cdn.fireemblemwiki.org/c/c7/Is_fe18_hunting_basics.png"
    }
  },
  {
    id: "soldier",
    name: "Soldat",
    tier: "Novice",
    growths: { hp: 10, str: 5, mag: 0, spd: -5, dex: 5, def: 10, res: 0, lck: 0, cha: 0 },
    allowed: ["sword", "lance", "axe", "infantry", "heavy_armor", "authority"],
    atk_type: [""],
    techniques: [],
    masterTech: {
      name: "Notions de défense",
      desc: "Confère Déf +1 / Capacité Pivot",
      icon: "https://cdn.fireemblemwiki.org/1/14/Is_fe18_defense_basics.png"
    }
  },
  {
    id: "ornius_rider",
    name: "Cavalier Ornius",
    tier: "Novice",
    growths: { hp: 10, str: 0, mag: 0, spd: 10, dex: 0, def: 0, res: 5, lck: 5, cha: 0 },
    allowed: ["sword", "lance", "axe", "cavalry", "flying", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" }
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
    atk_type: [""],
    techniques: [],
    masterTech: {
      name: "Notions de magie",
      desc: "Confère Mag/Rés +1.",
      icon: "https://cdn.fireemblemwiki.org/7/7b/Is_fe18_magic_basics.png"
    }
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
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Crit épée +3", desc: "Avec une épée équipée : Crit +3.", icon: "https://cdn.fireemblemwiki.org/f/f2/Is_fe18_sword_crit_%2B3.png" }
    ],
    masterTech: {
      name: "Arts ravageurs",
      desc: "Si l'unité porte un coup critique : +6 dégâts.",
      icon: "https://cdn.fireemblemwiki.org/6/67/Is_fe18_ravaging_arts.png"
    }
  },
  {
    id: "brigand",
    name: "Brigand",
    tier: "Avancée",
    growths: { hp: 15, str: 15, mag: -5, spd: 5, dex: 0, def: 5, res: 0, lck: 0, cha: 5 },
    allowed: ["sword", "axe", "brawl", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Préc hache +3", desc: "Avec une hache équipée : Préc +3.", icon: "https://cdn.fireemblemwiki.org/c/c2/Is_fe18_axe_hit_%2B3.png" }
    ],
    masterTech: {
      name: "Regroupement",
      desc: "Quand l'ennemi esquive une attaque : Esq +20 pendant le combat.",
      icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_regroup.png"
    }
  },
  {
    id: "pugilist",
    name: "Lutteur",
    tier: "Avancée",
    growths: { hp: 15, str: 10, mag: -5, spd: 10, dex: 5, def: 10, res: 0, lck: 0, cha: 5 },
    allowed: ["brawl", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Esq poings +3", desc: "Avec des gantelets équipés : Esq +3.", icon: "https://cdn.fireemblemwiki.org/a/a5/Is_fe18_brawl_avo_%2B3.png" }
    ],
    masterTech: {
      name: "Frappe et recul",
      desc: "En utilisant un art de combat : Esq +10 pendant le combat.",
      icon: "https://cdn.fireemblemwiki.org/7/73/Is_fe18_attack%2C_get_back.png"
    }
  },
  {
    id: "archer",
    name: "Archer",
    tier: "Avancée",
    growths: { hp: 10, str: 5, mag: 0, spd: 10, dex: 10, def: 5, res: 0, lck: 5, cha: 5 },
    allowed: ["bow", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Préc arc +5", desc: "Avec un arc équipé : Préc +5.", icon: "https://cdn.fireemblemwiki.org/c/c0/Is_fe18_bow_hit_%2B5.png" }
    ],
    masterTech: {
      name: "Crescendo",
      desc: "Après avoir vaincu un ennemi : Préc +3 jusqu'à la fin de la carte (max +30).",
      icon: "https://cdn.fireemblemwiki.org/d/d4/Is_fe18_crescendo.png"
    }
  },
  {
    id: "rogue",
    name: "Escroc",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: 0, spd: 15, dex: 10, def: 0, res: 5, lck: 5, cha: 0 },
    allowed: ["sword", "bow", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Crochetage", desc: "Permet d'ouvrir les coffres sans clé.", icon: "https://cdn.fireemblemwiki.org/b/b0/Is_fe18_locktouch.png" },
      { name: "Fouille", desc: "Un peu plus de chances d'obtenir un résultat parfait en fouillant.", icon: "https://cdn.fireemblemwiki.org/1/1b/Is_fe18_search.png" }
    ],
    masterTech: {
      name: "Dans l'ombre",
      desc: "Après avoir vaincu un ennemi : Esq +10 jusqu'à la fin de son combat suivant.",
      icon: "https://cdn.fireemblemwiki.org/5/5e/Is_fe18_in_shadow.png"
    }
  },
  {
    id: "armored_knight",
    name: "Combattant Cuirassé",
    tier: "Avancée",
    growths: { hp: 10, str: 10, mag: -5, spd: -5, dex: 5, def: 25, res: -5, lck: 0, cha: 5 },
    allowed: ["sword", "lance", "axe", "infantry", "heavy_armor", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Déf riposte +3", desc: "Si l'ennemi attaque en premier : Prot +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/1/1b/Is_fe18_strike-last_def_%2B3.png" }
    ],
    masterTech: {
      name: "Grande riposte",
      desc: "Si l'ennemi attaque en premier : Att +3 pendant le combat.",
      icon: "https://cdn.fireemblemwiki.org/6/6f/Is_fe18_great_counter.png"
    }
  },
  {
    id: "light_cavalry",
    name: "Cavalerie Légère",
    tier: "Avancée",
    growths: { hp: 10, str: 5, mag: -5, spd: 5, dex: 0, def: 5, res: 0, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "axe", "cavalry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" }
    ],
    masterTech: {
      name: "Santé renforcée",
      desc: "Confère PV max +3.",
      icon: "https://cdn.fireemblemwiki.org/2/2e/Is_fe18_bolster_health.png"
    }
  },
  {
    id: "charioteer",
    name: "Aurige",
    tier: "Avancée",
    growths: { hp: 10, str: 5, mag: -5, spd: -5, dex: 15, def: 10, res: 0, lck: 5, cha: 10 },
    allowed: ["bow", "cavalry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Armure de char", desc: "[Cavalier] Bouclier +5. Ne peut pas esquiver les attaques.", icon: "https://cdn.fireemblemwiki.org/1/18/Is_fe18_chariot_armor.png" },
      { name: "Tactique d'aurige", desc: "Permet d'utiliser Monter et Descendre. [Cavalier] Permet d'utiliser l'ordre Charge.", icon: "https://cdn.fireemblemwiki.org/9/98/Is_fe18_charioteer_tactics.png" },
      { name: "Voie de l'aurige", desc: "Les taux de croissance augmentent avec le niveau.", icon: "https://cdn.fireemblemwiki.org/6/60/Is_fe18_charioteer%27s_path.png" }
    ],
    masterTech: {
      name: "Chargeur",
      desc: "En utilisant Charge : Prot +10 jusqu'à sa prochaine phase.",
      icon: "https://cdn.fireemblemwiki.org/e/ef/Is_fe18_charger.png"
    }
  },
  {
    id: "armored_ornius",
    name: "Cuirassier Ornius",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: -5, spd: 10, dex: 5, def: 10, res: 0, lck: 5, cha: 5 },
    allowed: ["sword", "lance", "axe", "cavalry", "flying", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" }
    ],
    masterTech: {
      name: "Sens du danger",
      desc: "Si l'ennemi est efficace contre l'unité : Esq +20 pendant le combat.",
      icon: "https://cdn.fireemblemwiki.org/1/18/Is_fe18_sense_threat.png"
    }
  },
  {
    id: "wing_soldier",
    name: "Soldat Ailé",
    tier: "Avancée",
    growths: { hp: 10, str: 0, mag: 5, spd: 0, dex: 5, def: 5, res: 5, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "flying", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" }
    ],
    masterTech: {
      name: "Ailes protectrices",
      desc: "Confère Rés +3.",
      icon: "https://cdn.fireemblemwiki.org/9/91/Is_fe18_protecting_wings.png"
    }
  },
  {
    id: "shaman",
    name: "Shaman",
    tier: "Avancée",
    growths: { hp: 5, str: -5, mag: 15, spd: 10, dex: 10, def: -10, res: 10, lck: 10, cha: 0 },
    allowed: ["sword", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Préc magie +3", desc: "Avec une magie équipée : Préc +3.", icon: "https://cdn.fireemblemwiki.org/3/3b/Is_fe18_magic_hit_%2B3.png" },
      { name: "Adepte de magie noire", desc: "Nombre d'utilisations des magies noires ×2.", icon: "https://cdn.fireemblemwiki.org/c/cd/Is_fe18_black-magic_seeker.png" }
    ],
    masterTech: {
      name: "Entrave technique",
      desc: "Tec -3 aux ennemis adjacents.",
      icon: "https://cdn.fireemblemwiki.org/c/c6/Is_fe18_bind_dexterity.png"
    }
  },
  {
    id: "priest",
    name: "Prêtre",
    tier: "Avancée",
    growths: { hp: 5, str: -5, mag: 10, spd: 5, dex: 5, def: -10, res: 15, lck: 15, cha: 10 },
    allowed: ["axe", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Soin magique +5", desc: "Les magies de soin rendent +5 PV.", icon: "https://cdn.fireemblemwiki.org/b/bd/Is_fe18_magic_heal_%2B5.png" },
      { name: "Adepte de magie blanche", desc: "Nombre d'utilisations des magies blanches ×2.", icon: "https://cdn.fireemblemwiki.org/4/43/Is_fe18_white-magic_seeker.png" }
    ],
    masterTech: {
      name: "Piété",
      desc: "Confère Chance +3.",
      icon: "https://cdn.fireemblemwiki.org/1/13/Is_fe18_piety.png"
    }
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
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Crit épée +5", desc: "Avec une épée équipée : Crit +5.", icon: "https://cdn.fireemblemwiki.org/a/a0/Is_fe18_sword_crit_%2B5.png" }
    ],
    masterTech: {
      name: "Toujours vigilant",
      desc: "Après avoir vaincu un ennemi avec un coup critique, récupère quelques PV.",
      icon: "https://cdn.fireemblemwiki.org/8/83/Is_fe18_ever_vigilant.png"
    }
  },
  {
    id: "dancer",
    name: "Danseur",
    tier: "Élite",
    growths: { hp: 15, str: 5, mag: 0, spd: 25, dex: 10, def: 0, res: 5, lck: 10, cha: 20 },
    allowed: ["sword", "bow", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Danse", desc: "Permet d'utiliser l'art de combat Danse.", icon: "https://cdn.fireemblemwiki.org/a/aa/Is_fe18_dance.png" }
    ],
    masterTech: {
      name: "Danse spéciale",
      desc: "En utilisant Danse : Tec/Vit +3 à l'allié ciblé pendant la phase.",
      icon: "https://cdn.fireemblemwiki.org/d/d8/Is_fe18_special_dance.png"
    }
  },
  {
    id: "warrior",
    name: "Guerrier",
    tier: "Élite",
    growths: { hp: 20, str: 20, mag: -5, spd: 0, dex: 0, def: 5, res: -5, lck: 0, cha: 5 },
    allowed: ["sword", "axe", "brawl", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Préc hache +5", desc: "Avec une hache équipée : Préc +5.", icon: "https://cdn.fireemblemwiki.org/0/09/Is_fe18_axe_hit_%2B5.png" },
      { name: "Préc poings +5", desc: "Avec des gantelets équipés : Préc +5.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_brawl_hit_%2B5.png" }
    ],
    masterTech: {
      name: "Art maîtrisé",
      desc: "Préc +10 en attaquant avec un art de combat.",
      icon: "https://cdn.fireemblemwiki.org/f/f5/Is_fe18_practiced_art.png"
    }
  },
  {
    id: "blacksmith",
    name: "Forgeron",
    tier: "Élite",
    growths: { hp: 15, str: 10, mag: 10, spd: 0, dex: 5, def: 10, res: 10, lck: 0, cha: 5 },
    allowed: ["axe", "black_magic", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Préc hache +5", desc: "Avec une hache équipée : Préc +5.", icon: "https://cdn.fireemblemwiki.org/0/09/Is_fe18_axe_hit_%2B5.png" },
      { name: "Adepte de magie noire", desc: "Nombre d'utilisations des magies noires ×2.", icon: "https://cdn.fireemblemwiki.org/c/cd/Is_fe18_black-magic_seeker.png" }
    ],
    masterTech: {
      name: "Bricolage",
      desc: "En utilisant un art de combat, l'arme ne perd pas de durabilité. Déclenchement : 10 %.",
      icon: "https://cdn.fireemblemwiki.org/1/15/Is_fe18_makeshift.png"
    }
  },
  {
    id: "sniper",
    name: "Archer d'Élite",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 10, dex: 20, def: 5, res: 5, lck: 5, cha: 5 },
    allowed: ["bow", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Préc arc +10", desc: "Avec un arc équipé : Préc +10.", icon: "https://cdn.fireemblemwiki.org/5/51/Is_fe18_bow_hit_%2B10.png" }
    ],
    masterTech: {
      name: "Tir d'élite",
      desc: "Avec un arc équipé : Préc +15.",
      icon: "https://cdn.fireemblemwiki.org/1/14/Is_fe18_marksmanship.png"
    }
  },
  {
    id: "sylvan_cavalier",
    name: "Cavalier Sylvain",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 10, dex: 10, def: 5, res: 5, lck: 5, cha: 5 },
    allowed: ["sword", "bow", "cavalry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Préc arc +5", desc: "Avec un arc équipé : Préc +5.", icon: "https://cdn.fireemblemwiki.org/c/c0/Is_fe18_bow_hit_%2B5.png" }
    ],
    masterTech: {
      name: "Œil du chasseur",
      desc: "Avec un arc équipé : Att +3 lors d'une attaque double.",
      icon: "https://cdn.fireemblemwiki.org/8/81/Is_fe18_hunter%27s_eye.png"
    }
  },
  {
    id: "ranger",
    name: "Rodeur",
    tier: "Élite",
    growths: { hp: 10, str: 5, mag: 0, spd: 15, dex: 15, def: 0, res: 10, lck: 15, cha: 0 },
    allowed: ["sword", "bow", "infantry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Crochetage", desc: "Permet d'ouvrir les coffres sans clé.", icon: "https://cdn.fireemblemwiki.org/b/b0/Is_fe18_locktouch.png" },
      { name: "Fouille avancée", desc: "Plus de chances d'obtenir un résultat parfait en fouillant.", icon: "https://cdn.fireemblemwiki.org/d/d6/Is_fe18_advanced_search.png" }
    ],
    masterTech: {
      name: "Tir de riposte",
      desc: "Avec un arc équipé, peut contre-attaquer les ennemis adjacents. Déclenchement : 50 %.",
      icon: "https://cdn.fireemblemwiki.org/b/b5/Is_fe18_countershot.png"
    }
  },
  {
    id: "elephan rider",
    name: "Cavalier d'Élephant",
    tier: "Élite",
    growths: { hp: 20, str: 10, mag: -5, spd: 20, dex: -10, def: 15, res: -5, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "axe", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Bottes d'éléphant de guerre", desc: "[Cavalier] Dégâts reçus divisés par 2 quand il est attaqué. Ne peut pas esquiver les attaques.", icon: "https://cdn.fireemblemwiki.org/6/64/Is_fe18_war-elephant_boots.png" },
      { name: "Tactique d'éléphant", desc: "Permet d'utiliser Monter et Descendre. [Cavalier] Permet d'utiliser l'ordre Charge lourde.", icon: "https://cdn.fireemblemwiki.org/9/9c/Is_fe18_elephant_tactics.png" },
      { name: "Voie du cavalier d'éléphant", desc: "Les taux de croissance augmentent avec le niveau.", icon: "https://cdn.fireemblemwiki.org/5/5e/Is_fe18_elephant_rider%27s_path.png" }
    ],
    masterTech: {
      name: "Avant-garde d'éléphant",
      desc: "[Cavalier] S'il monte un éléphant : Préc +10.",
      icon: "https://cdn.fireemblemwiki.org/1/1d/Is_fe18_elephant_vanguard.png"
    }
  },
  {
    id: "Guardian", // C'est une Unité Soins Lance Heavy en eng = Guardian
    name: "Guardian",
    tier: "Élite",
    growths: { hp: 10, str: 10, mag: 0, spd: 0, dex: 5, def: 10, res: 15, lck: 5, cha: 5 },
    allowed: ["lance", "white_magic", "infantry", "heavy_armor", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Soin magique +10", desc: "Les magies de soin rendent +10 PV.", icon: "https://cdn.fireemblemwiki.org/2/28/Is_fe18_magic_heal_%2B10.png" }
    ],
    masterTech: {
      name: "Parade",
      desc: "Après avoir vaincu un ennemi : Prot +3 jusqu'à sa prochaine phase.",
      icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_brace.png"
    }
  },
  {
    id: "dreadnought",
    name: "Hoplite",
    tier: "Élite",
    growths: { hp: 15, str: 15, mag: -5, spd: -10, dex: 5, def: 30, res: -10, lck: 0, cha: 5 },
    allowed: ["lance", "axe", "infantry", "heavy_armor", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" },
      { name: "Déf riposte +5", desc: "Si l'ennemi attaque en premier : Prot +5 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/0/02/Is_fe18_strike-last_def_%2B5.png" }
    ],
    masterTech: {
      name: "Riposte concentrée",
      desc: "Si l'ennemi attaque en premier : Préc +10 pendant le combat.",
      icon: "https://cdn.fireemblemwiki.org/4/46/Is_fe18_focused_counter.png"
    }
  },
  {
    id: "bard_cavalier",
    name: "Cavalier Bardé",
    tier: "Élite",
    growths: { hp: 10, str: 10, mag: -5, spd: 0, dex: 0, def: 5, res: 10, lck: 5, cha: 10 },
    allowed: ["sword", "lance", "axe", "cavalry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
      { name: "Arts de combat +2", desc: "Peut équiper 2 arts de combat de plus.", icon: "https://cdn.fireemblemwiki.org/4/4f/Is_fe18_combat_arts_%2B2.png" }
    ],
    masterTech: {
      name: "Égide",
      desc: "Dégâts magiques reçus divisés par 2. Déclenchement : 20 %.",
      icon: "https://cdn.fireemblemwiki.org/d/d9/Is_fe18_aegis.png"
    }
  },
  {
    id: "cataphract",
    name: "Cataphractaire",
    tier: "Élite",
    growths: { hp: 15, str: 15, mag: -5, spd: -10, dex: 0, def: 10, res: -5, lck: 0, cha: 5 },
    allowed: ["lance", "axe", "heavy_armor", "cavalry", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Déf riposte +3", desc: "Si l'ennemi attaque en premier : Prot +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/1/1b/Is_fe18_strike-last_def_%2B3.png" }
    ],
    masterTech: {
      name: "Pavois",
      desc: "Dégâts physiques reçus divisés par 2. Déclenchement : 20 %.",
      icon: "https://cdn.fireemblemwiki.org/c/c5/Is_fe18_pavise.png"
    }
  },
  {
    id: "calander_cavalier",
    name: "Cavalier Calandre",
    tier: "Élite",
    growths: { hp: 15, str: 0, mag: 10, spd: 10, dex: 5, def: 10, res: 10, lck: 5, cha: 5 },
    allowed: ["sword", "lance", "axe", "black_magic", "cavalry", "flying", "authority"],
    atk_type: [""],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" },
      { name: "Adepte de magie noire", desc: "Nombre d'utilisations des magies noires ×2.", icon: "https://cdn.fireemblemwiki.org/c/cd/Is_fe18_black-magic_seeker.png" }
    ],
    masterTech: {
      name: "Dépassement",
      desc: "Après avoir vaincu un ennemi : Dépl +1 jusqu'à la fin du tour suivant (max +3).",
      icon: "https://cdn.fireemblemwiki.org/1/12/Is_fe18_overtake.png"
    }
  },
  {
    id: "dragon_rider_elite",
    name: "Cavalier Dragon",
    tier: "Élite",
    growths: { hp: 15, str: 5, mag: 0, spd: 5, dex: 0, def: 10, res: 10, lck: 10, cha: 5 },
    allowed: ["sword", "lance", "axe", "flying", "authority"],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
      { name: "Arts de combat +1", desc: "Peut équiper 1 art de combat de plus.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_combat_arts_%2B1.png" }
    ],
    masterTech: {
      name: "Assiégeant",
      desc: "Si l'ennemi est sur un terrain favorable : Préc +20 pendant le combat.",
      icon: "https://cdn.fireemblemwiki.org/9/93/Is_fe18_besieger.png"
    }
  },
  {
    id: "vate",
    name: "Vate",
    tier: "Élite",
    growths: { hp: 10, str: -5, mag: 20, spd: 5, dex: 15, def: -10, res: 15, lck: 10, cha: 0 },
    allowed: ["sword", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    techniques: [
      { name: "Préc magie +5", desc: "Avec une magie équipée : Préc +5.", icon: "https://cdn.fireemblemwiki.org/0/0a/Is_fe18_magic_hit_%2B5.png" },
      { name: "Adepte de magie noire", desc: "Nombre d'utilisations des magies noires ×2.", icon: "https://cdn.fireemblemwiki.org/c/cd/Is_fe18_black-magic_seeker.png" }
    ],
    masterTech: {
      name: "Entrave vitesse",
      desc: "Vit -3 aux ennemis adjacents.",
      icon: "https://cdn.fireemblemwiki.org/d/d6/Is_fe18_bind_speed.png"
    }
  },
  {
    id: "bishop",
    name: "Évêque",
    tier: "Élite",
    growths: { hp: 10, str: -5, mag: 15, spd: 0, dex: 5, def: -10, res: 20, lck: 20, cha: 10 },
    allowed: ["axe", "brawl", "black_magic", "white_magic", "infantry", "authority"],
    techniques: [
      { name: "Soin magique +10", desc: "Les magies de soin rendent +10 PV.", icon: "https://cdn.fireemblemwiki.org/2/28/Is_fe18_magic_heal_%2B10.png" },
      { name: "Adepte de magie blanche", desc: "Nombre d'utilisations des magies blanches ×2.", icon: "https://cdn.fireemblemwiki.org/4/43/Is_fe18_white-magic_seeker.png" }
    ],
    masterTech: {
      name: "Barrière",
      desc: "Rés +3 aux alliés adjacents.",
      icon: "https://cdn.fireemblemwiki.org/9/99/Is_fe18_barrier.png"
    }
  },
  {
    id: "troubadour",
    name: "Troubadour",
    tier: "Élite",
    growths: { hp: 10, str: 0, mag: 15, spd: 0, dex: 5, def: 5, res: 15, lck: 15, cha: 10 },
    allowed: ["black_magic", "white_magic", "cavalry", "authority"],
    techniques: [
      { name: "Monter/Descendre", desc: "Permet d'utiliser les ordres Monter et Descendre.", icon: "images/monter.png" },
      { name: "Préc magie +3", desc: "Avec une magie équipée : Préc +3.", icon: "https://cdn.fireemblemwiki.org/3/3b/Is_fe18_magic_hit_%2B3.png" },
      { name: "Soin magique +5", desc: "Les magies de soin rendent +5 PV.", icon: "https://cdn.fireemblemwiki.org/b/bd/Is_fe18_magic_heal_%2B5.png" }
    ]
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
    proficiencies: ["sword", "lance", "white_magic", "cavalry"],
    weaknesses: ["bow"]
  },
  {
    id: "dietrich",
    name: "Dietrich",
    faction: "House Lamine (Lord)",
    portrait: "portrait/thumbs/dietrich.webp",
    baseStats: { hp: 28, str: 13, mag: 7, spd: 13, dex: 14, def: 9, res: 6, lck: 10, cha: 13 },
    growths: { hp: 50, str: 45, mag: 30, spd: 50, dex: 60, def: 40, res: 30, lck: 50, cha: 60 },
    proficiencies: ["sword", "infantry"],
    weaknesses: ["white_magic"]
  },
  {
    id: "theodora",
    name: "Theodora",
    faction: "Megaira's Beacon (Lord)",
    portrait: "portrait/thumbs/theodora.webp",
    baseStats: { hp: 31, str: 14, mag: 6, spd: 10, dex: 10, def: 11, res: 6, lck: 7, cha: 13 },
    growths: { hp: 70, str: 50, mag: 30, spd: 40, dex: 40, def: 40, res: 30, lck: 30, cha: 50 },
    proficiencies: ["lance", "white_magic", "authority"],
    weaknesses: ["black_magic"]
  },
  {
    id: "leda",
    name: "Leda",
    faction: "Rose Tempest (Lord)",
    portrait: "portrait/thumbs/leda.webp",
    baseStats: { hp: 24, str: 9, mag: 10, spd: 15, dex: 13, def: 6, res: 9, lck: 7, cha: 14 },
    growths: { hp: 40, str: 35, mag: 35, spd: 65, dex: 50, def: 30, res: 35, lck: 25, cha: 55 },
    proficiencies: ["sword", "bow", "white_magic", "infantry"],
    weaknesses: ["lance"]
  },
  {
    id: "hong_hua",
    name: "Hong Hua",
    faction: "Armée du Sauveur (Auto)",
    portrait: "portrait/thumbs/hong_hua.webp",
    baseStats: { hp: 24, str: 7, mag: 14, spd: 12, dex: 12, def: 6, res: 12, lck: 8, cha: 10 },
    growths: { hp: 40, str: 30, mag: 45, spd: 45, dex: 45, def: 30, res: 45, lck: 30, cha: 40 },
    proficiencies: ["black_magic", "white_magic"],
    weaknesses: ["axe", "heavy_armor"]
  },
  {
    id: "troy",
    name: "Troy",
    faction: "Armée du Sauveur (Auto)",
    portrait: "portrait/thumbs/troy.webp",
    baseStats: { hp: 25, str: 11, mag: 12, spd: 13, dex: 11, def: 7, res: 8, lck: 8, cha: 8 },
    growths: { hp: 40, str: 45, mag: 45, spd: 50, dex: 40, def: 30, res: 30, lck: 30, cha: 30 },
    proficiencies: ["brawl", "black_magic", "white_magic"],
    weaknesses: []
  },
  {
    id: "tialla",
    name: "Tialla",
    faction: "Ribeira Winds",
    portrait: "portrait/thumbs/tialla.webp",
    baseStats: { hp: 22, str: 6, mag: 13, spd: 10, dex: 11, def: 5, res: 12, lck: 13, cha: 11 },
    growths: { hp: 30, str: 25, mag: 45, spd: 35, dex: 40, def: 20, res: 40, lck: 50, cha: 45 },
    proficiencies: ["black_magic", "white_magic", "authority"],
    weaknesses: ["sword"]
  },
  {
    id: "peter",
    name: "Peter",
    faction: "Ribeira Winds",
    portrait: "portrait/thumbs/peter.webp",
    baseStats: { hp: 25, str: 10, mag: 5, spd: 12, dex: 15, def: 8, res: 6, lck: 9, cha: 8 },
    growths: { hp: 40, str: 35, mag: 20, spd: 45, dex: 60, def: 30, res: 25, lck: 35, cha: 30 },
    proficiencies: ["bow", "infantry"],
    weaknesses: ["heavy_armor"]
  },
  {
    id: "ultand",
    name: "Ultand",
    faction: "Ribeira Winds",
    portrait: "portrait/thumbs/ultand.webp",
    baseStats: { hp: 26, str: 11, mag: 11, spd: 9, dex: 11, def: 9, res: 12, lck: 14, cha: 12 },
    growths: { hp: 45, str: 40, mag: 40, spd: 35, dex: 40, def: 35, res: 45, lck: 55, cha: 50 },
    proficiencies: ["lance", "white_magic"],
    weaknesses: ["sword"]
  },
  {
    id: "fabio",
    name: "Fabio",
    faction: "House Lamine",
    portrait: "portrait/thumbs/fabio.webp",
    baseStats: { hp: 24, str: 6, mag: 15, spd: 9, dex: 11, def: 6, res: 13, lck: 9, cha: 8 },
    growths: { hp: 40, str: 25, mag: 50, spd: 35, dex: 40, def: 30, res: 45, lck: 35, cha: 30 },
    proficiencies: ["black_magic", "white_magic", "authority", "infantry"],
    weaknesses: ["bow"]
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    faction: "House Lamine",
    portrait: "portrait/thumbs/esmeralda.webp",
    baseStats: { hp: 30, str: 15, mag: 5, spd: 9, dex: 9, def: 13, res: 6, lck: 9, cha: 8 },
    growths: { hp: 55, str: 55, mag: 20, spd: 35, dex: 35, def: 45, res: 25, lck: 35, cha: 30 },
    proficiencies: ["lance", "axe", "heavy_armor"],
    weaknesses: ["sword"]
  },
  {
    id: "mikaela",
    name: "Mikaela",
    faction: "House Lamine",
    portrait: "portrait/thumbs/mikaela.webp",
    baseStats: { hp: 28, str: 13, mag: 7, spd: 11, dex: 9, def: 11, res: 6, lck: 8, cha: 10 },
    growths: { hp: 50, str: 45, mag: 30, spd: 40, dex: 35, def: 40, res: 25, lck: 30, cha: 40 },
    proficiencies: ["axe", "bow", "infantry"],
    weaknesses: []
  },
  {
    id: "bonaventure",
    name: "Bonaventure",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/bonaventure.webp",
    baseStats: { hp: 24, str: 9, mag: 13, spd: 11, dex: 13, def: 7, res: 11, lck: 9, cha: 10 },
    growths: { hp: 35, str: 35, mag: 45, spd: 40, dex: 50, def: 30, res: 40, lck: 35, cha: 40 },
    proficiencies: ["sword", "black_magic", "white_magic", "authority", "cavalry"],
    weaknesses: ["heavy_armor", "flying"]
  },
  {
    id: "tobias",
    name: "Tobias",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/tobias.webp",
    baseStats: { hp: 29, str: 13, mag: 5, spd: 8, dex: 10, def: 13, res: 5, lck: 8, cha: 10 },
    growths: { hp: 55, str: 60, mag: 15, spd: 25, dex: 30, def: 45, res: 20, lck: 40, cha: 35 },
    proficiencies: ["lance", "axe", "cavalry", "heavy_armor"],
    weaknesses: []
  },
  {
    id: "lysander",
    name: "Lysander",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/lysander.webp",
    baseStats: { hp: 25, str: 10, mag: 11, spd: 12, dex: 12, def: 8, res: 10, lck: 10, cha: 12 },
    growths: { hp: 45, str: 40, mag: 25, spd: 50, dex: 35, def: 40, res: 25, lck: 30, cha: 30 },
    proficiencies: ["lance", "axe", "cavalry", "flying"],
    weaknesses: ["sword", "brawl", "heavy_armor"]
  },
  {
    id: "lilian",
    name: "Lilian",
    faction: "Megaira's Beacon",
    portrait: "portrait/thumbs/lilian.webp",
    baseStats: { hp: 24, str: 10, mag: 9, spd: 14, dex: 12, def: 7, res: 11, lck: 11, cha: 11 },
    growths: { hp: 35, str: 35, mag: 30, spd: 40, dex: 55, def: 30, res: 35, lck: 50, cha: 25 },
    proficiencies: ["bow", "infantry"],
    weaknesses: ["brawl"]
  },
  {
    id: "buccar",
    name: "Buccar",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/buccar.webp",
    baseStats: { hp: 30, str: 14, mag: 4, spd: 11, dex: 10, def: 11, res: 5, lck: 8, cha: 9 },
    growths: { hp: 50, str: 50, mag: 20, spd: 25, dex: 40, def: 45, res: 20, lck: 30, cha: 35 },
    proficiencies: ["lance", "axe"],
    weaknesses: ["black_magic", "white_magic"]
  },
  {
    id: "sirocco",
    name: "Sirocco",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/sirocco.webp",
    baseStats: { hp: 26, str: 12, mag: 6, spd: 14, dex: 13, def: 8, res: 7, lck: 10, cha: 10 },
    growths: { hp: 40, str: 40, mag: 40, spd: 45, dex: 50, def: 35, res: 35, lck: 50, cha: 45 },
    proficiencies: ["sword", "black_magic", "white_magic", "authority"],
    weaknesses: ["heavy_armor"]
  },
  {
    id: "mu",
    name: "Mu",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/mu.jpeg", // Image test//
    baseStats: { hp: 23, str: 6, mag: 14, spd: 12, dex: 11, def: 5, res: 13, lck: 11, cha: 11 },
    growths: { hp: 50, str: 50, mag: 25, spd: 50, dex: 50, def: 40, res: 30, lck: 30, cha: 40 },
    proficiencies: ["sword", "axe", "brawl", "white_magic"],
    weaknesses: []
  },
  {
    id: "olympia",
    name: "Olympia",
    faction: "Rose Tempest",
    portrait: "portrait/thumbs/olympia.webp",
    baseStats: { hp: 27, str: 12, mag: 8, spd: 12, dex: 12, def: 10, res: 9, lck: 9, cha: 13 },
    growths: { hp: 35, str: 35, mag: 50, spd: 35, dex: 35, def: 30, res: 40, lck: 40, cha: 40 },
    proficiencies: ["axe", "white_magic"],
    weaknesses: ["lance"]
  },
  {
    id: "jester",
    name: "Jester",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/jester.webp",
    baseStats: { hp: 25, str: 11, mag: 8, spd: 15, dex: 14, def: 7, res: 7, lck: 14, cha: 12 },
    growths: { hp: 40, str: 35, mag: 15, spd: 60, dex: 45, def: 35, res: 25, lck: 40, cha: 40 },
    proficiencies: ["sword", "bow", "infantry"],
    weaknesses: ["axe"]
  },
  {
    id: "goliath",
    name: "Goliath",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/goliath.webp",
    baseStats: { hp: 34, str: 16, mag: 3, spd: 7, dex: 8, def: 14, res: 4, lck: 7, cha: 9 },
    growths: { hp: 55, str: 60, mag: 5, spd: 15, dex: 30, def: 50, res: 20, lck: 35, cha: 20 },
    proficiencies: ["axe", "heavy_armor"],
    weaknesses: []
  },
  {
    id: "dante",
    name: "Dante",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/dante.webp",
    baseStats: { hp: 27, str: 13, mag: 7, spd: 12, dex: 12, def: 9, res: 7, lck: 9, cha: 11 },
    growths: { hp: 30, str: 30, mag: 45, spd: 40, dex: 40, def: 20, res: 40, lck: 45, cha: 30 },
    proficiencies: ["black_magic", "white_magic", "authority"],
    weaknesses: ["brawl"]
  },
  {
    id: "diego",
    name: "Diego",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/diego.webp",
    baseStats: { hp: 26, str: 12, mag: 7, spd: 13, dex: 13, def: 9, res: 7, lck: 10, cha: 10 },
    growths: { hp: 45, str: 40, mag: 20, spd: 45, dex: 60, def: 35, res: 20, lck: 35, cha: 30 },
    proficiencies: ["sword", "bow", "infantry"],
    weaknesses: ["black_magic"]
  },
  {
    id: "loretta",
    name: "Loretta",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/loretta.webp",
    baseStats: { hp: 23, str: 6, mag: 13, spd: 12, dex: 12, def: 6, res: 12, lck: 12, cha: 12 },
    growths: { hp: 35, str: 35, mag: 35, spd: 55, dex: 40, def: 30, res: 40, lck: 30, cha: 30 },
    proficiencies: ["sword", "lance"],
    weaknesses: ["heavy_armor"]
  },
  {
    id: "ursula",
    name: "Ursula",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/ursula.webp",
    baseStats: { hp: 24, str: 8, mag: 13, spd: 13, dex: 13, def: 6, res: 11, lck: 9, cha: 11 },
    growths: { hp: 40, str: 35, mag: 35, spd: 50, dex: 50, def: 35, res: 30, lck: 40, cha: 45 },
    proficiencies: ["sword", "bow"],
    weaknesses: []
  },
  {
    id: "ludia",
    name: "Ludia",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/ludia.webp",
    baseStats: { hp: 25, str: 11, mag: 8, spd: 14, dex: 13, def: 8, res: 8, lck: 10, cha: 11 },
    growths: { hp: 40, str: 35, mag: 20, spd: 55, dex: 45, def: 30, res: 20, lck: 30, cha: 30 },
    proficiencies: ["sword", "infantry"],
    weaknesses: ["axe", "black_magic"]
  },
  {
    id: "nezha",
    name: "Nezha",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/nezah.webp",
    baseStats: { hp: 26, str: 12, mag: 9, spd: 14, dex: 13, def: 8, res: 8, lck: 11, cha: 11 },
    growths: { hp: 45, str: 45, mag: 25, spd: 45, dex: 50, def: 35, res: 25, lck: 30, cha: 25 },
    proficiencies: ["sword", "brawl", "infantry"],
    weaknesses: ["lance"]
  },
  {
    id: "sha_lan",
    name: "Sha Lan",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/sha_lan.webp",
    baseStats: { hp: 24, str: 9, mag: 12, spd: 13, dex: 12, def: 7, res: 11, lck: 11, cha: 12 },
    growths: { hp: 35, str: 30, mag: 45, spd: 35, dex: 50, def: 30, res: 45, lck: 35, cha: 40 },
    proficiencies: ["lance", "white_magic", "authority"],
    weaknesses: ["sword"]
  },
  {
    id: "dadao",
    name: "Dadao",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/dadao.webp",
    baseStats: { hp: 29, str: 14, mag: 5, spd: 10, dex: 11, def: 12, res: 6, lck: 8, cha: 9 },
    growths: { hp: 50, str: 55, mag: 20, spd: 30, dex: 35, def: 45, res: 20, lck: 25, cha: 30 },
    proficiencies: ["axe", "heavy_armor"],
    weaknesses: ["lance", "black_magic", "white_magic"]
  },
  {
    id: "guzran",
    name: "Guzran",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/guzran.webp",
    baseStats: { hp: 31, str: 15, mag: 4, spd: 9, dex: 10, def: 12, res: 5, lck: 7, cha: 10 },
    growths: { hp: 45, str: 45, mag: 20, spd: 50, dex: 45, def: 35, res: 20, lck: 45, cha: 30 },
    proficiencies: ["sword", "brawl", "infantry"],
    weaknesses: ["black_magic", "white_magic"]
  },
  {
    id: "yang_jie",
    name: "Yang Jie",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/yang_jie.webp",
    baseStats: { hp: 26, str: 12, mag: 8, spd: 13, dex: 14, def: 8, res: 8, lck: 10, cha: 10 },
    growths: { hp: 50, str: 35, mag: 40, spd: 35, dex: 35, def: 30, res: 40, lck: 40, cha: 25 },
    proficiencies: ["axe", "white_magic"],
    weaknesses: ["sword", "cavalry"]
  },
  {
    id: "io",
    name: "Io",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/io.webp",
    baseStats: { hp: 23, str: 7, mag: 13, spd: 13, dex: 12, def: 6, res: 12, lck: 11, cha: 11 },
    growths: { hp: 45, str: 40, mag: 25, spd: 35, dex: 45, def: 40, res: 25, lck: 35, cha: 35 },
    proficiencies: ["lance", "axe", "cavalry"],
    weaknesses: []
  },
  {
    id: "peppe",
    name: "Peppe",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/peppe.webp",
    baseStats: { hp: 25, str: 10, mag: 7, spd: 14, dex: 14, def: 7, res: 7, lck: 13, cha: 11 },
    growths: { hp: 30, str: 30, mag: 25, spd: 60, dex: 45, def: 30, res: 30, lck: 45, cha: 30 },
    proficiencies: ["sword", "bow", "infantry"],
    weaknesses: []
  },
  {
    id: "noctula",
    name: "Noctula",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/noctula.webp",
    baseStats: { hp: 24, str: 8, mag: 14, spd: 12, dex: 12, def: 6, res: 12, lck: 8, cha: 10 },
    growths: { hp: 50, str: 45, mag: 20, spd: 45, dex: 40, def: 40, res: 20, lck: 35, cha: 30 },
    proficiencies: ["axe", "brawl", "infantry"],
    weaknesses: ["sword"]
  },
  {
    id: "sofia",
    name: "Sofia",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/sofia.webp",
    baseStats: { hp: 24, str: 9, mag: 11, spd: 13, dex: 12, def: 7, res: 11, lck: 11, cha: 13 },
    growths: { hp: 35, str: 30, mag: 45, spd: 30, dex: 40, def: 25, res: 40, lck: 30, cha: 40 },
    proficiencies: ["bow", "white_magic"],
    weaknesses: ["axe"]
  },
  {
    id: "catania",
    name: "Catania",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/catania.webp",
    baseStats: { hp: 27, str: 13, mag: 6, spd: 12, dex: 12, def: 10, res: 7, lck: 9, cha: 11 },
    growths: { hp: 35, str: 35, mag: 35, spd: 55, dex: 50, def: 30, res: 35, lck: 40, cha: 45 },
    proficiencies: ["sword", "lance"],
    weaknesses: ["heavy_armor"]
  },
  {
    id: "nydine",
    name: "Nydine",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/nydine.webp",
    baseStats: { hp: 25, str: 10, mag: 10, spd: 13, dex: 13, def: 7, res: 10, lck: 10, cha: 11 },
    growths: { hp: 45, str: 40, mag: 30, spd: 45, dex: 40, def: 30, res: 25, lck: 35, cha: 35 },
    proficiencies: ["axe", "cavalry", "flying"],
    weaknesses: ["brawl", "heavy_armor"]
  },
  {
    id: "zarcone",
    name: "Zarcone",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/zarcone.webp",
    baseStats: { hp: 28, str: 14, mag: 6, spd: 11, dex: 11, def: 11, res: 6, lck: 8, cha: 10 },
    growths: { hp: 40, str: 30, mag: 20, spd: 35, dex: 60, def: 30, res: 25, lck: 30, cha: 15 },
    proficiencies: ["sword", "axe"],
    weaknesses: ["black_magic", "white_magic"]
  },
  {
    id: "majide",
    name: "Majide",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/majide.webp",
    baseStats: { hp: 26, str: 11, mag: 11, spd: 12, dex: 12, def: 8, res: 10, lck: 9, cha: 11 },
    growths: { hp: 65, str: 50, mag: 15, spd: 20, dex: 30, def: 40, res: 10, lck: 25, cha: 5 },
    proficiencies: ["axe", "brawl"],
    weaknesses: ["black_magic"]
  },
  {
    id: "benditz",
    name: "Benditz",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/benditz.webp",
    baseStats: { hp: 27, str: 12, mag: 6, spd: 12, dex: 14, def: 9, res: 7, lck: 10, cha: 9 },
    growths: { hp: 50, str: 35, mag: 20, spd: 35, dex: 50, def: 35, res: 25, lck: 30, cha: 35 },
    proficiencies: ["bow", "cavalry"],
    weaknesses: []
  },
  {
    id: "inyoni",
    name: "Inyoni",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/inyoni.webp",
    baseStats: { hp: 24, str: 10, mag: 9, spd: 15, dex: 13, def: 7, res: 9, lck: 11, cha: 11 },
    growths: { hp: 40, str: 50, mag: 20, spd: 35, dex: 40, def: 40, res: 30, lck: 40, cha: 30 },
    proficiencies: ["bow"],
    weaknesses: []
  },
  {
    id: "jasmine",
    name: "Jasmine",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/jasmine.webp",
    baseStats: { hp: 25, str: 9, mag: 12, spd: 13, dex: 12, def: 7, res: 11, lck: 11, cha: 13 },
    growths: { hp: 50, str: 40, mag: 20, spd: 30, dex: 45, def: 45, res: 25, lck: 40, cha: 45 },
    proficiencies: ["lance", "axe", "heavy_armor"],
    weaknesses: ["sword", "flying"]
  },
  {
    id: "alexandra",
    name: "Alexandra",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/alexandra.webp",
    baseStats: { hp: 28, str: 13, mag: 7, spd: 11, dex: 12, def: 11, res: 7, lck: 9, cha: 12 },
    growths: { hp: 30, str: 35, mag: 35, spd: 55, dex: 45, def: 30, res: 40, lck: 50, cha: 50 },
    proficiencies: ["sword", "lance", "flying"],
    weaknesses: ["axe", "black_magic"]
  },
  {
    id: "nuzzuo",
    name: "Nuzzuo",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/nuzzuo.webp",
    baseStats: { hp: 29, str: 14, mag: 5, spd: 10, dex: 10, def: 12, res: 6, lck: 9, cha: 9 },
    growths: { hp: 50, str: 50, mag: 15, spd: 5, dex: 45, def: 20, res: 15, lck: 25, cha: 35 },
    proficiencies: ["sword", "bow"],
    weaknesses: []
  },
  {
    id: "kiroc",
    name: "Kiroc",
    faction: "Jeux Héroïques",
    portrait: "portrait/thumbs/kiroc.webp",
    baseStats: { hp: 26, str: 12, mag: 8, spd: 13, dex: 13, def: 8, res: 8, lck: 10, cha: 10 },
    growths: { hp: 55, str: 40, mag: 15, spd: 55, dex: 50, def: 30, res: 15, lck: 30, cha: 25 },
    proficiencies: ["bow"],
    weaknesses: []
  },
  {
    id: "bertrand",
    name: "Bertrand",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/bertrand.webp", // Image test//
    baseStats: { hp: 28, str: 11, mag: 4, spd: 7, dex: 10, def: 7, res: 3, lck: 4, cha: 9 },
    growths: { hp: 50, str: 55, mag: 15, spd: 45, dex: 50, def: 45, res: 20, lck: 30, cha: 50 },
    proficiencies: ["sword", "axe", "brawl"],
    weaknesses: ["black_magic", "white_magic"]
  },
  {
    id: "talimun",
    name: "Talimun",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/talimun.webp", // Image test//
    baseStats: { hp: 27, str: 9, mag: 11, spd: 9, dex: 8, def: 6, res: 7, lck: 12, cha: 9 },
    growths: { hp: 45, str: 40, mag: 45, spd: 40, dex: 45, def: 35, res: 40, lck: 60, cha: 50 },
    proficiencies: ["sword", "black_magic", "authority"],
    weaknesses: ["heavy_armor"]
  },
  {
    id: "gaitz",
    name: "Gaitz",
    faction: "Fiery Mane",
    portrait: "portrait/thumbs/gaitz.webp", // Image test//
    baseStats: { hp: 27, str: 10, mag: 3, spd: 7, dex: 7, def: 6, res: 3, lck: 5, cha: 7 },
    growths: { hp: 50, str: 50, mag: 20, spd: 40, dex: 45, def: 45, res: 25, lck: 40, cha: 45 },
    proficiencies: ["lance", "axe", "cavalry"],
    weaknesses: ["black_magic", "white_magic"]
  },
  {
    id: "simon",
    name: "Simon",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/simon.webp", // Image test//
    baseStats: { hp: 28, str: 11, mag: 4, spd: 6, dex: 7, def: 7, res: 3, lck: 10, cha: 4 },
    growths: { hp: 50, str: 50, mag: 20, spd: 35, dex: 40, def: 40, res: 25, lck: 50, cha: 35 },
    proficiencies: ["sword", "axe", "infantry"],
    weaknesses: []
  },
  {
    id: "fianna",
    name: "Fianna",
    faction: "Tale of the Moon",
    portrait: "portrait/thumbs/fianna.webp", // Image test//
    baseStats: { hp: 22, str: 4, mag: 11, spd: 5, dex: 6, def: 4, res: 8, lck: 4, cha: 7 },
    growths: { hp: 30, str: 35, mag: 55, spd: 30, dex: 40, def: 20, res: 45, lck: 25, cha: 40 },
    proficiencies: ["black_magic", "white_magic"],
    weaknesses: ["sword", "brawl"]
  },
  {
    id: "orchel",
    name: "Orchel",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/orchel.webp", // Image test//
    baseStats: { hp: 22, str: 15, mag: 9, spd: 4, dex: 3, def: 12, res: 12, lck: 5, cha: 10 },
    growths: { hp: 30, str: 60, mag: 45, spd: 10, dex: 20, def: 60, res: 60, lck: 20, cha: 60 },
    proficiencies: ["axe", "black_magic", "white_magic"],
    weaknesses: ["sword", "cavalry", "flying"]
  },
  {
    id: "seteth",
    name: "Seteth",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/seteth.webp", // Image test//
    baseStats: { hp: 26, str: 10, mag: 7, spd: 8, dex: 7, def: 6, res: 6, lck: 6, cha: 8 },
    growths: { hp: 45, str: 45, mag: 30, spd: 40, dex: 45, def: 40, res: 35, lck: 30, cha: 50 },
    proficiencies: ["lance", "axe", "authority"],
    weaknesses: []
  },
  {
    id: "ninae",
    name: "Ninae",
    faction: "Linaria Dewdrops",
    portrait: "portrait/thumbs/ninae.webp", // Image test//
    baseStats: { hp: 28, str: 8, mag: 5, spd: 6, dex: 8, def: 6, res: 9, lck: 7, cha: 6 },
    growths: { hp: 45, str: 45, mag: 35, spd: 35, dex: 45, def: 35, res: 45, lck: 50, cha: 40 },
    proficiencies: ["lance", "white_magic"],
    weaknesses: ["bow"]
  },
  {
    id: "anatolia",
    name: "Anatolia",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/anatolia.webp", // Image test//
    baseStats: { hp: 25, str: 6, mag: 11, spd: 10, dex: 8, def: 6, res: 6, lck: 6, cha: 8 },
    growths: { hp: 40, str: 35, mag: 50, spd: 50, dex: 45, def: 35, res: 40, lck: 40, cha: 50 },
    proficiencies: ["brawl", "black_magic", "infantry"],
    weaknesses: ["heavy_armor"]
  },
  {
    id: "halvin",
    name: "Halvin",
    faction: "Bridal Party",
    portrait: "portrait/thumbs/halvin.webp", // Image test//
    baseStats: { hp: 24, str: 7, mag: 5, spd: 8, dex: 9, def: 5, res: 5, lck: 7, cha: 6 },
    growths: { hp: 35, str: 35, mag: 30, spd: 45, dex: 60, def: 30, res: 25, lck: 40, cha: 35 },
    proficiencies: ["bow", "cavalry"],
    weaknesses: ["axe"]
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


// Compétences personnelles (source : Fire Emblem Wiki, vérifiées)
// when : "Base", "Overblaze", "Niv. 20", "Niv. 35"... ; icônes hébergées sur le Fire Emblem Wiki
const PERSONAL_SKILLS = {
  cai: [
    { when: "Base", name: "Brio", desc: "Dépl +1.", icon: "https://cdn.fireemblemwiki.org/8/88/Is_fe18_brio.png" },
    { when: "Overblaze", name: "Brio+", desc: "Dépl +2.", icon: "https://cdn.fireemblemwiki.org/8/88/Is_fe18_brio%2B.png" },
    { when: "Niv. 35", name: "Flamekeeper", desc: "L'unité et ses alliés ne subissent pas les Underworld Flames, et les attaques reçues dedans font moitié moins de dégâts.", icon: "https://cdn.fireemblemwiki.org/6/66/Is_fe18_flamekeeper.png" }
  ],
  dietrich: [
    { when: "Base", name: "Murderous Intent", desc: "Si l'unité attaque en premier : Crit +5 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/b/b7/Is_fe18_murderous_intent.png" },
    { when: "Overblaze", name: "Murderous Intent+", desc: "Si l'unité attaque en premier : Crit +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/2/22/Is_fe18_murderous_intent%2B.png" },
    { when: "Niv. 5", name: "Bestial Impulse", desc: "Après un combat : Crit +2 jusqu'à ce qu'une unité porte un coup critique.", icon: "https://cdn.fireemblemwiki.org/f/f2/Is_fe18_bestial_impulse.png" }
  ],
  theodora: [
    { when: "Base", name: "Royal Resolve", desc: "Dégâts reçus divisés par 2 quand elle est attaquée. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/9/95/Is_fe18_royal_resolve.png" },
    { when: "Overblaze", name: "Royal Resolve+", desc: "Dégâts reçus divisés par 2 quand elle est attaquée. Déclenchement : 50 %.", icon: "https://cdn.fireemblemwiki.org/d/db/Is_fe18_royal_resolve%2B.png" },
    { when: "Niv. 5", name: "Direct Hit", desc: "+10 dégâts avec les Blaze Arts. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/6/64/Is_fe18_direct_hit.png" },
    { when: "Niveau ?", name: "Unstoppable Force", desc: "Dégâts ×3 contre les obstacles.", icon: "https://cdn.fireemblemwiki.org/8/8f/Is_fe18_unstoppable_force.png" }
  ],
  leda: [
    { when: "Base", name: "Blindside", desc: "Si elle attaque en premier, l'ennemi ne peut pas contre-attaquer. Déclenchement : 5 %.", icon: "https://cdn.fireemblemwiki.org/3/3e/Is_fe18_blindside.png" },
    { when: "Overblaze", name: "Blindside+", desc: "Si elle attaque en premier, l'ennemi ne peut pas contre-attaquer. Déclenchement : 10 %.", icon: "https://cdn.fireemblemwiki.org/e/e1/Is_fe18_blindside%2B.png" },
    { when: "Niveau ?", name: "Improviso", desc: "Après avoir utilisé une Blaze Art pendant l'Overblaze, elle peut encore attaquer.", icon: "https://cdn.fireemblemwiki.org/9/92/Is_fe18_improviso.png" }
  ],
  hong_hua: [
    { when: "Base", name: "Zhu Ming", desc: "Préc +10 avec une magie équipée.", icon: "https://cdn.fireemblemwiki.org/8/8e/Is_fe18_zhu_ming.png" },
    { when: "Niv. 50", name: "Amplify Magic", desc: "Après un combat : Att +4 jusqu'à la fin du combat suivant. Déclenchement : Mag ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/8/88/Is_fe18_amplify_magic.png" },
    { when: "Niv. 60", name: "Amplify Magic+", desc: "Après un combat : Att +7 jusqu'à la fin du combat suivant. Déclenchement : Mag ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/7/79/Is_fe18_amplify_magic%2B.png" }
  ],
  troy: [
    { when: "Base", name: "Yun Shou", desc: "Préc +10 avec des gantelets équipés.", icon: "https://cdn.fireemblemwiki.org/8/8f/Is_fe18_yun_shou.png" },
    { when: "Niv. 50", name: "Modified Weapon", desc: "Avec Zerberus équipé, ses attaques sont efficaces contre les unités volantes.", icon: "https://cdn.fireemblemwiki.org/f/f0/Is_fe18_modified_weapon.png" },
    { when: "Niv. 60", name: "Modified Weapon+", desc: "Avec Zerberus équipé, ses attaques sont très efficaces contre les unités volantes.", icon: "https://cdn.fireemblemwiki.org/e/e0/Is_fe18_modified_weapon%2B.png" }
  ],
  tialla: [
    { when: "Base", name: "Tactician's Wit", desc: "Portée +1 pour les arts de combat utilisables sur les alliés.", icon: "https://cdn.fireemblemwiki.org/9/9b/Is_fe18_tactician%27s_wit.png" },
    { when: "Niv. 20", name: "Tactician's Insight", desc: "Après un combat où elle a attaqué en premier : Esq -5 à l'ennemi pendant son prochain combat.", icon: "https://cdn.fireemblemwiki.org/e/e2/Is_fe18_tactician%27s_insight.png" },
    { when: "Niv. 35", name: "Tactician's Insight+", desc: "Après un combat où elle a attaqué en premier : Esq -10 à l'ennemi pendant son prochain combat.", icon: "https://cdn.fireemblemwiki.org/f/f4/Is_fe18_tactician%27s_insight%2B.png" }
  ],
  peter: [
    { when: "Base", name: "Steady Aim", desc: "Portée +1 avec un art de combat à l'arc.", icon: "https://cdn.fireemblemwiki.org/d/dc/Is_fe18_steady_aim.png" },
    { when: "Niv. 20", name: "Correct for Drift", desc: "Si sa précision ≥ 90 % : Préc +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/7/78/Is_fe18_correct_for_drift.png" },
    { when: "Niv. 35", name: "Correct for Drift+", desc: "Si sa précision ≥ 75 % : Préc +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/3/31/Is_fe18_correct_for_drift%2B.png" }
  ],
  ultand: [
    { when: "Base", name: "Patch Up", desc: "Après le combat d'un allié adjacent, lui rend quelques PV.", icon: "https://cdn.fireemblemwiki.org/2/2c/Is_fe18_patch_up.png" },
    { when: "Niv. 20", name: "Pray for Safety", desc: "Esq. crit. +10 aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/0/0a/Is_fe18_pray_for_safety.png" },
    { when: "Niv. 35", name: "Pray for Safety+", desc: "Esq. crit. +20 aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/d/d6/Is_fe18_pray_for_safety%2B.png" }
  ],
  fabio: [
    { when: "Base", name: "Dark Calling", desc: "Esq. crit. -5 aux ennemis adjacents.", icon: "https://cdn.fireemblemwiki.org/9/90/Is_fe18_dark_calling.png" },
    { when: "Niv. 20", name: "Dark Secrets", desc: "La portée de Dark Calling passe à 2 cases.", icon: "https://cdn.fireemblemwiki.org/a/a5/Is_fe18_dark_secrets.png" },
    { when: "Niv. 35", name: "Dark Secrets+", desc: "La portée de Dark Calling passe à 3 cases.", icon: "https://cdn.fireemblemwiki.org/8/84/Is_fe18_dark_secrets%2B.png" }
  ],
  esmeralda: [
    { when: "Base", name: "Brawn", desc: "Le poids de son équipement est réduit à 80 %.", icon: "https://cdn.fireemblemwiki.org/6/68/Is_fe18_brawn.png" },
    { when: "Niv. 20", name: "Throwing Arm", desc: "En lançant une lance : Préc +10 et Att +2 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/a/af/Is_fe18_throwing_arm.png" },
    { when: "Niv. 35", name: "Throwing Arm+", desc: "En lançant une lance : Préc +20 et Att +4 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/f/f0/Is_fe18_throwing_arm%2B.png" }
  ],
  mikaela: [
    { when: "Base", name: "Veteran's Mettle", desc: "Préc +10 en combat contre un ennemi adjacent.", icon: "https://cdn.fireemblemwiki.org/b/b9/Is_fe18_veteran%27s_mettle.png" },
    { when: "Niv. 20", name: "Redblade's Will", desc: "Att +3 en combat contre un ennemi adjacent.", icon: "https://cdn.fireemblemwiki.org/4/4c/Is_fe18_redblade%27s_will.png" },
    { when: "Niv. 35", name: "Redblade's Will+", desc: "Att +3 en combat contre un ennemi adjacent, et Att +3 de plus en attaquant un ennemi adjacent (déclenchement : 30 %).", icon: "https://cdn.fireemblemwiki.org/d/dc/Is_fe18_redblade%27s_will%2B.png" }
  ],
  bonaventure: [
    { when: "Base", name: "Sage Advice", desc: "Déf +3 aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/d/dd/Is_fe18_sage_advice.png" },
    { when: "Niv. 20", name: "Additional Intel", desc: "Préc +10 aux alliés adjacents pendant leurs combats. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/5/52/Is_fe18_additional_intel.png" },
    { when: "Niv. 35", name: "Additional Intel+", desc: "Préc +20 aux alliés adjacents pendant leurs combats. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/5/5c/Is_fe18_additional_intel%2B.png" }
  ],
  tobias: [
    { when: "Base", name: "Power Arts", desc: "Att +3 en attaquant avec un art de combat.", icon: "https://cdn.fireemblemwiki.org/6/62/Is_fe18_power_arts.png" },
    { when: "Niv. 20", name: "All-Out Attack", desc: "Dégâts ×1,3 avec un art de combat. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/1/17/Is_fe18_all-out_attack.png" },
    { when: "Niv. 35", name: "All-Out Attack+", desc: "Dégâts ×1,5 avec un art de combat. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/7/75/Is_fe18_all-out_attack%2B.png" }
  ],
  lysander: [
    { when: "Base", name: "Racing Attack", desc: "S'il attaque en premier : Esq +15 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/7/72/Is_fe18_racing_attack.png" },
    { when: "Niv. 20", name: "Accelerate", desc: "Après avoir vaincu un ennemi : Vit +1 jusqu'à la fin de la carte (max +10).", icon: "https://cdn.fireemblemwiki.org/4/41/Is_fe18_accelerate.png" },
    { when: "Niv. 35", name: "Accelerate+", desc: "Après avoir vaincu un ennemi : Vit +2 jusqu'à la fin de la carte (max +10).", icon: "https://cdn.fireemblemwiki.org/9/9d/Is_fe18_accelerate%2B.png" }
  ],
  lilian: [
    { when: "Base", name: "Safety First", desc: "Si l'ennemi ne peut pas contre-attaquer : Préc +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/a/a7/Is_fe18_safety_first.png" },
    { when: "Niv. 20", name: "Upper Hand", desc: "Si sa précision = 100 % : Att +3 en attaquant.", icon: "https://cdn.fireemblemwiki.org/9/99/Is_fe18_upper_hand.png" },
    { when: "Niv. 35", name: "Upper Hand+", desc: "Si sa précision = 100 % : Att +5 en attaquant.", icon: "https://cdn.fireemblemwiki.org/f/f3/Is_fe18_upper_hand%2B.png" }
  ],
  buccar: [
    { when: "Base", name: "Guardian's Duty", desc: "Dégâts reçus réduits à 90 % quand il est attaqué.", icon: "https://cdn.fireemblemwiki.org/e/ef/Is_fe18_guardian%27s_duty.png" },
    { when: "Niv. 20", name: "Retaliatory Blow", desc: "Si l'ennemi attaque en premier : dégâts ×1,3 en attaquant. Déclenchement : 5 %.", icon: "https://cdn.fireemblemwiki.org/d/d6/Is_fe18_retaliatory_blow.png" },
    { when: "Niv. 35", name: "Retaliatory Blow+", desc: "Si l'ennemi attaque en premier : dégâts ×1,3 en attaquant. Déclenchement : 10 %.", icon: "https://cdn.fireemblemwiki.org/f/f0/Is_fe18_retaliatory_blow%2B.png" }
  ],
  sirocco: [
    { when: "Base", name: "Goddess's Favor", desc: "Après un combat, récupère 5 PV.", icon: "https://cdn.fireemblemwiki.org/6/63/Is_fe18_goddess%27s_favor.png" },
    { when: "Niv. 20", name: "Wind's Caprice", desc: "Donne au hasard Esq +1, +5 ou +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/2/28/Is_fe18_wind%27s_caprice.png" },
    { when: "Niv. 35", name: "Wind's Caprice+", desc: "Donne au hasard Esq +1, +5, +20 ou +30 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/3/3d/Is_fe18_wind%27s_caprice%2B.png" }
  ],
  mu: [
    { when: "Base", name: "Signs of Growth", desc: "Meilleure croissance des stats de base à chaque niveau.", icon: "https://cdn.fireemblemwiki.org/d/da/Is_fe18_signs_of_growth.png" },
    { when: "Niv. 20", name: "Warrior's Blood", desc: "Bonus de stats selon le type d'arme équipée.", icon: "https://cdn.fireemblemwiki.org/d/dd/Is_fe18_warrior%27s_blood.png" },
    { when: "Niv. 35", name: "Warrior's Blood+", desc: "Gros bonus de stats selon le type d'arme équipée.", icon: "https://cdn.fireemblemwiki.org/c/cf/Is_fe18_warrior%27s_blood%2B.png" }
  ],
  olympia: [
    { when: "Base", name: "Competitive Zeal", desc: "Crit +10 avec une magie équipée.", icon: "https://cdn.fireemblemwiki.org/5/5d/Is_fe18_competitive_zeal.png" },
    { when: "Niv. 20", name: "Ardent Nosferatu", desc: "Avec Nosferatu : Att +3 et Crit +5 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/b/bf/Is_fe18_ardent_nosferatu.png" },
    { when: "Niv. 35", name: "Ardent Nosferatu+", desc: "Avec Nosferatu : Att +5 et Crit +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/a/a6/Is_fe18_ardent_nosferatu%2B.png" }
  ],
  jester: [
    { when: "Base", name: "Blink of an Eye", desc: "Après avoir utilisé Échange (Swap) : Déf +3 jusqu'à sa prochaine phase.", icon: "https://cdn.fireemblemwiki.org/5/5b/Is_fe18_blink_of_an_eye.png" },
    { when: "Niv. 20", name: "Flickering Edge", desc: "Quand il esquive une attaque : Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/2/20/Is_fe18_flickering_edge.png" },
    { when: "Niv. 35", name: "Flickering Edge+", desc: "Quand il esquive une attaque : Att +5 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/b/b0/Is_fe18_flickering_edge%2B.png" }
  ],
  goliath: [
    { when: "Base", name: "Heavyweight Class", desc: "Ne peut pas devenir cavalier ni volant. Gabarit +5.", icon: "https://cdn.fireemblemwiki.org/a/ac/Is_fe18_heavyweight_class.png" },
    { when: "Niv. 20", name: "Pin Down", desc: "Dépl -3 aux ennemis adjacents.", icon: "https://cdn.fireemblemwiki.org/8/8a/Is_fe18_pin_down.png" },
    { when: "Niv. 35", name: "Pin Down+", desc: "Dépl -5 aux ennemis adjacents.", icon: "https://cdn.fireemblemwiki.org/2/28/Is_fe18_pin_down%2B.png" }
  ],
  dante: [
    { when: "Base", name: "Stage Directions", desc: "Esq. crit. +10 aux alliés à 2 cases ou moins pendant leurs combats. Déclenchement : Charisme de l'allié ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/2/22/Is_fe18_stage_directions.png" },
    { when: "Niv. 20", name: "Dramatic Effect", desc: "Quand Stage Directions se déclenche : Préc +10 à l'allié ciblé.", icon: "https://cdn.fireemblemwiki.org/3/3e/Is_fe18_dramatic_effect.png" },
    { when: "Niv. 35", name: "Dramatic Effect+", desc: "Quand Stage Directions se déclenche : Préc et Crit +10 à l'allié ciblé.", icon: "https://cdn.fireemblemwiki.org/1/1b/Is_fe18_dramatic_effect%2B.png" }
  ],
  diego: [
    { when: "Base", name: "Caretaker", desc: "Les alliés adjacents ne peuvent pas subir d'attaque double pendant le combat. Déclenchement : 5 %.", icon: "https://cdn.fireemblemwiki.org/c/cc/Is_fe18_caretaker.png" },
    { when: "Niv. 20", name: "No Mercy", desc: "Préc et Crit +5 lors d'une attaque double.", icon: "https://cdn.fireemblemwiki.org/c/c5/Is_fe18_no_mercy.png" },
    { when: "Niv. 35", name: "No Mercy+", desc: "Préc et Crit +10 lors d'une attaque double.", icon: "https://cdn.fireemblemwiki.org/a/a3/Is_fe18_no_mercy%2B.png" }
  ],
  loretta: [
    { when: "Base", name: "Steadfast", desc: "Si PV ≥ 50 % : Esq +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/a/aa/Is_fe18_steadfast.png" },
    { when: "Niv. 20", name: "Peak Form", desc: "Si PV au maximum : Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/1/1a/Is_fe18_peak_form.png" },
    { when: "Niv. 35", name: "Peak Form+", desc: "Si PV au maximum : Att +3 et Esq +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/5/5f/Is_fe18_peak_form%2B.png" }
  ],
  ursula: [
    { when: "Base", name: "Management Skills", desc: "Accès au stockage pour elle et les alliés à 2 cases ou moins.", icon: "https://cdn.fireemblemwiki.org/8/8a/Is_fe18_management_skills.png" },
    { when: "Niv. 20", name: "Seize the Chance", desc: "Dégâts ×1,3 en attaquant. Déclenchement : Chance ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/2/24/Is_fe18_seize_the_chance.png" },
    { when: "Niv. 35", name: "Seize the Chance+", desc: "Dégâts ×1,5 en attaquant. Déclenchement : Chance ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/2/23/Is_fe18_seize_the_chance%2B.png" }
  ],
  ludia: [
    { when: "Base", name: "Falcon", desc: "Si elle attaque en premier : Vit. d'attaque +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/a/a3/Is_fe18_falcon.png" },
    { when: "Niv. 20", name: "Perception", desc: "Si elle peut faire une attaque double : Esq +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/d/d8/Is_fe18_perception.png" },
    { when: "Niv. 35", name: "Perception+", desc: "Si elle peut faire une attaque double : Esq +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/6/68/Is_fe18_perception%2B.png" }
  ],
  nezha: [
    { when: "Base", name: "Quick Draw", desc: "S'il attaque en premier : Att +3 pendant le combat. Déclenchement : 50 %.", icon: "https://cdn.fireemblemwiki.org/1/1d/Is_fe18_quick_draw.png" },
    { when: "Niv. 20", name: "Never Stop", desc: "Att +5 en attaquant après Quick Draw. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/8/8b/Is_fe18_never_stop.png" },
    { when: "Niv. 35", name: "Never Stop+", desc: "Att +5 en attaquant après Quick Draw. Déclenchement : 50 %.", icon: "https://cdn.fireemblemwiki.org/7/7f/Is_fe18_never_stop%2B.png" }
  ],
  sha_lan: [
    { when: "Base", name: "Cooler Heads", desc: "Après avoir utilisé Repli (Draw Back), peut utiliser une magie de soutien.", icon: "https://cdn.fireemblemwiki.org/8/87/Is_fe18_cooler_heads.png" },
    { when: "Niv. 20", name: "Watchfulness", desc: "Vit +2 aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/6/66/Is_fe18_watchfulness.png" },
    { when: "Niv. 35", name: "Watchfulness+", desc: "Vit +4 aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/6/62/Is_fe18_watchfulness%2B.png" }
  ],
  dadao: [
    { when: "Base", name: "One Chance", desc: "Si ni lui ni l'ennemi ne peuvent faire d'attaque double : Att +5 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/7/75/Is_fe18_one_chance.png" },
    { when: "Niv. 20", name: "Full Strength", desc: "Dégâts ×1,3 en attaquant. Déclenchement : For ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/8/81/Is_fe18_full_strength.png" },
    { when: "Niv. 35", name: "Full Strength+", desc: "Dégâts ×1,5 en attaquant. Déclenchement : For ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/f/fb/Is_fe18_full_strength%2B.png" }
  ],
  guzran: [
    { when: "Base", name: "Hot-Headed", desc: "Donne Préc +10, Esq +10 ou Crit +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/7/72/Is_fe18_hot-headed.png" },
    { when: "Niv. 20", name: "Top Form", desc: "Hot-Headed donne +15 au lieu de +10.", icon: "https://cdn.fireemblemwiki.org/c/cf/Is_fe18_top_form.png" },
    { when: "Niv. 35", name: "Top Form+", desc: "Hot-Headed donne +20 au lieu de +10.", icon: "https://cdn.fireemblemwiki.org/b/bc/Is_fe18_top_form%2B.png" }
  ],
  yang_jie: [
    { when: "Base", name: "Monkly Havoc", desc: "Après avoir vaincu un ennemi, récupère tous ses PV. Déclenchement : Chance ÷ 2 %.", icon: "https://cdn.fireemblemwiki.org/b/ba/Is_fe18_monkly_havoc.png" },
    { when: "Niv. 20", name: "Robust Health", desc: "Bouclier +3 quand il est attaqué. Déclenchement : PV restants %.", icon: "https://cdn.fireemblemwiki.org/0/0a/Is_fe18_robust_health.png" },
    { when: "Niv. 35", name: "Robust Health+", desc: "Bouclier +5 quand il est attaqué. Déclenchement : PV restants %.", icon: "https://cdn.fireemblemwiki.org/1/19/Is_fe18_robust_health%2B.png" }
  ],
  io: [
    { when: "Base", name: "With My Steed", desc: "[Cavalier] Si elle attaque en premier : Bouclier +3 et Esq. crit. +30 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/8/89/Is_fe18_with_my_steed.png" },
    { when: "Niv. 20", name: "Mounted Push", desc: "[Cavalier] Si elle attaque en premier : Préc +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/1/1c/Is_fe18_mounted_push.png" },
    { when: "Niv. 35", name: "Mounted Push+", desc: "[Cavalier] Si elle attaque en premier : Préc +10 et Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/7/72/Is_fe18_mounted_push%2B.png" }
  ],
  peppe: [
    { when: "Base", name: "Hunter's Snare", desc: "Pendant la phase ennemie, si l'ennemi est blessé, il attaque en premier. Déclenchement : 30 %.", icon: "https://cdn.fireemblemwiki.org/8/83/Is_fe18_hunter%27s_snare.png" },
    { when: "Niv. 20", name: "King's Majesty", desc: "Si l'ennemi est blessé : Att +2 et Crit +5 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/5/55/Is_fe18_king%27s_majesty.png" },
    { when: "Niv. 35", name: "King's Majesty+", desc: "Si l'ennemi est blessé : Att +4 et Crit +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/2/2e/Is_fe18_king%27s_majesty%2B.png" }
  ],
  noctula: [
    { when: "Base", name: "Warrior's Clarity", desc: "Après un combat : Esq +3 jusqu'à sa prochaine phase.", icon: "https://cdn.fireemblemwiki.org/0/00/Is_fe18_warrior%27s_clarity.png" },
    { when: "Niv. 20", name: "Attuned", desc: "Quand Warrior's Clarity se déclenche : Esq +10 jusqu'à sa prochaine phase. Déclenchement : 10 %.", icon: "https://cdn.fireemblemwiki.org/9/9b/Is_fe18_attuned.png" },
    { when: "Niv. 35", name: "Attuned+", desc: "Quand Warrior's Clarity se déclenche : Esq +10 jusqu'à sa prochaine phase. Déclenchement : 20 %.", icon: "https://cdn.fireemblemwiki.org/d/d6/Is_fe18_attuned%2B.png" }
  ],
  sofia: [
    { when: "Base", name: "Healing Knowledge", desc: "Ses magies de soin rendent +10 PV.", icon: "https://cdn.fireemblemwiki.org/5/52/Is_fe18_healing_knowledge.png" },
    { when: "Niv. 20", name: "Distant Healing", desc: "Portée +1 pour les magies de soin.", icon: "https://cdn.fireemblemwiki.org/5/5d/Is_fe18_distant_healing.png" },
    { when: "Niv. 35", name: "Distant Healing+", desc: "Portée +2 pour les magies de soin.", icon: "https://cdn.fireemblemwiki.org/a/a8/Is_fe18_distant_healing%2B.png" }
  ],
  catania: [
    { when: "Base", name: "Punishing Squall", desc: "Si sa vit. d'attaque ≥ celle de l'ennemi +3 : Préc +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/9/9b/Is_fe18_punishing_squall.png" },
    { when: "Niv. 20", name: "Wind My Friend", desc: "Si sa vit. d'attaque ≥ celle de l'ennemi +5 : Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/b/be/Is_fe18_wind_my_friend.png" },
    { when: "Niv. 35", name: "Wind My Friend+", desc: "Si sa vit. d'attaque ≥ celle de l'ennemi +5 : Att +3, et si ≥ +8 : Esq +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/4/40/Is_fe18_wind_my_friend%2B.png" }
  ],
  nydine: [
    { when: "Base", name: "Barge Through", desc: "[Cavalier] Peut traverser les cases ennemies (sauf les ennemis de grande taille).", icon: "https://cdn.fireemblemwiki.org/3/36/Is_fe18_barge_through.png" },
    { when: "Niv. 20", name: "At a Gallop", desc: "[Cavalier] Coût de déplacement du terrain -1 (minimum 1).", icon: "https://cdn.fireemblemwiki.org/6/6b/Is_fe18_at_a_gallop.png" },
    { when: "Niv. 35", name: "At a Gallop+", desc: "[Cavalier] Coût de déplacement du terrain -2 (minimum 1).", icon: "https://cdn.fireemblemwiki.org/c/c0/Is_fe18_at_a_gallop%2B.png" }
  ],
  zarcone: [
    { when: "Base", name: "Hatchet Man", desc: "Préc +10 avec une hache équipée.", icon: "https://cdn.fireemblemwiki.org/d/dc/Is_fe18_hatchet_man.png" },
    { when: "Niv. 20", name: "Vulgar Conduct", desc: "Si les PV de l'ennemi ≤ 50 % : Préc +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/5/50/Is_fe18_vulgar_conduct.png" },
    { when: "Niv. 35", name: "Vulgar Conduct+", desc: "Si les PV de l'ennemi ≤ 50 % : Préc +20 et Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/5/52/Is_fe18_vulgar_conduct%2B.png" }
  ],
  majide: [
    { when: "Base", name: "Hellbent Axe", desc: "For +3 avec une hache équipée.", icon: "https://cdn.fireemblemwiki.org/4/4b/Is_fe18_hellbent_axe.png" },
    { when: "Niv. 20", name: "Fear Nothing", desc: "S'il attaque en premier : Att +3 mais Esq -30 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/9/90/Is_fe18_fear_nothing.png" },
    { when: "Niv. 35", name: "Fear Nothing+", desc: "S'il attaque en premier : Att +6 mais Esq -30 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/2/21/Is_fe18_fear_nothing%2B.png" }
  ],
  benditz: [
    { when: "Base", name: "Wheeled Warrior", desc: "[Cavalier] S'il est conducteur de char : Préc +20.", icon: "https://cdn.fireemblemwiki.org/e/ee/Is_fe18_wheeled_warrior.png" },
    { when: "Niv. 20", name: "Chariot Stagger", desc: "S'il est conducteur de char : +1 utilisation des coups déstabilisants.", icon: "https://cdn.fireemblemwiki.org/9/9c/Is_fe18_chariot_stagger.png" },
    { when: "Niv. 35", name: "Chariot Stagger+", desc: "S'il est conducteur de char : +2 utilisations des coups déstabilisants.", icon: "https://cdn.fireemblemwiki.org/e/ee/Is_fe18_chariot_stagger%2B.png" }
  ],
  inyoni: [
    { when: "Base", name: "Heavy-Bow User", desc: "For +3 avec un arc équipé.", icon: "https://cdn.fireemblemwiki.org/b/b3/Is_fe18_heavy-bow_user.png" },
    { when: "Niv. 20", name: "Pierce", desc: "Att +2 et Crit +5 avec un art de combat à l'arc.", icon: "https://cdn.fireemblemwiki.org/8/83/Is_fe18_pierce.png" },
    { when: "Niv. 35", name: "Pierce+", desc: "Att +4 et Crit +10 avec un art de combat à l'arc.", icon: "https://cdn.fireemblemwiki.org/8/83/Is_fe18_pierce%2B.png" }
  ],
  jasmine: [
    { when: "Base", name: "Expert Counter", desc: "Si l'ennemi attaque en premier : Préc +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/7/7e/Is_fe18_expert_counter.png" },
    { when: "Niv. 20", name: "Raging Counter", desc: "Si l'ennemi attaque en premier : Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/b/ba/Is_fe18_raging_counter.png" },
    { when: "Niv. 35", name: "Raging Counter+", desc: "Si l'ennemi attaque en premier : Att +3 et Crit +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/f/f9/Is_fe18_raging_counter%2B.png" }
  ],
  alexandra: [
    { when: "Base", name: "Silver Maiden", desc: "Préc et Esq +5 pour chaque allié adjacent.", icon: "https://cdn.fireemblemwiki.org/0/01/Is_fe18_silver_maiden.png" },
    { when: "Niv. 20", name: "Soar", desc: "Sur un terrain inaccessible : Vit. d'attaque +3.", icon: "https://cdn.fireemblemwiki.org/8/89/Is_fe18_soar.png" },
    { when: "Niv. 35", name: "Soar+", desc: "Sur un terrain inaccessible : Vit. d'attaque +5.", icon: "https://cdn.fireemblemwiki.org/f/fc/Is_fe18_soar%2B.png" }
  ],
  nuzzuo: [
    { when: "Base", name: "Har Hali Wisdom", desc: "S'il est efficace contre l'ennemi : Att +3 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/6/6e/Is_fe18_har_hali_wisdom.png" },
    { when: "Niv. 20", name: "Precision Strike", desc: "S'il est efficace contre l'ennemi : Préc +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/a/af/Is_fe18_precision_strike.png" },
    { when: "Niv. 35", name: "Precision Strike+", desc: "S'il est efficace contre l'ennemi : Préc +20 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/1/10/Is_fe18_precision_strike%2B.png" }
  ],
  kiroc: [
    { when: "Base", name: "Tyranny", desc: "Si l'ennemi a une altération d'état : Att +3 et Crit +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/1/18/Is_fe18_tyranny.png" },
    { when: "Niv. 20", name: "Menace", desc: "Divise par 2 l'esq. crit. de l'ennemi pendant le combat. Déclenchement : 10 %.", icon: "https://cdn.fireemblemwiki.org/5/53/Is_fe18_menace.png" },
    { when: "Niv. 35", name: "Menace+", desc: "Divise par 2 l'esq. crit. de l'ennemi pendant le combat. Déclenchement : 20 %.", icon: "https://cdn.fireemblemwiki.org/5/54/Is_fe18_menace%2B.png" }
  ],
  bertrand: [
    { when: "Base", name: "Requiem Style", desc: "Attaque double quelle que soit la vit. d'attaque. Déclenchement : 5 %.", icon: "https://cdn.fireemblemwiki.org/a/ab/Is_fe18_requiem_style.png" },
    { when: "Overblaze", name: "Requiem Style+", desc: "Attaque double quelle que soit la vit. d'attaque. Déclenchement : 10 %.", icon: "https://cdn.fireemblemwiki.org/7/7e/Is_fe18_requiem_style%2B.png" },
    { when: "Niveau ?", name: "Go No Sen", desc: "Pendant la phase ennemie, il attaque en premier. Déclenchement : 25 %.", icon: "https://cdn.fireemblemwiki.org/2/2f/Is_fe18_go_no_sen.png" },
    { when: "Niveau ?", name: "Sen No Sen", desc: "S'il attaque en premier, son attaque double passe avant la contre-attaque ennemie. Déclenchement : 25 %.", icon: "https://cdn.fireemblemwiki.org/6/61/Is_fe18_sen_no_sen.png" }
  ],
  talimun: [
    { when: "Base", name: "Swashbuckler's Luck", desc: "Chance +3.", icon: "https://cdn.fireemblemwiki.org/d/dc/Is_fe18_swashbuckler%27s_luck.png" },
    { when: "Overblaze", name: "Swashbuckler's Luck+", desc: "Chance +5 pour lui et tous ses alliés.", icon: "https://cdn.fireemblemwiki.org/6/6a/Is_fe18_swashbuckler%27s_luck%2B.png" },
    { when: "Niveau ?", name: "Cannoning Flair", desc: "Préc +30 pendant le combat en utilisant l'artillerie.", icon: "https://cdn.fireemblemwiki.org/3/31/Is_fe18_cannoning_flair.png" },
    { when: "Niveau ?", name: "Winds of Victory", desc: "Préc +15 en attaquant, Esq +15 quand il est attaqué. Déclenchement : Chance %.", icon: "https://cdn.fireemblemwiki.org/1/1a/Is_fe18_winds_of_victory.png" }
  ],
  gaitz: [
    { when: "Base", name: "Brave Assist", desc: "Déf +3 aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/5/5a/Is_fe18_brave_assist.png" },
    { when: "Niv. 20", name: "Flashing Fang", desc: "Att +4 et Préc +50 en attaquant. Déclenchement : 20 %.", icon: "https://cdn.fireemblemwiki.org/f/f3/Is_fe18_flashing_fang.png" },
    { when: "Niv. 35", name: "Flashing Fang+", desc: "Att +7 et Préc +100 en attaquant. Déclenchement : 20 %.", icon: "https://cdn.fireemblemwiki.org/9/9a/Is_fe18_flashing_fang%2B.png" }
  ],
  simon: [
    { when: "Base", name: "Close Call", desc: "Si PV ≥ 2 et qu'une attaque devrait le tuer, il garde 1 PV. Déclenchement : Chance %.", icon: "https://cdn.fireemblemwiki.org/2/25/Is_fe18_close_call.png" },
    { when: "Niv. 20", name: "Devil's Luck", desc: "Après avoir vaincu un ennemi : Chance +1 jusqu'à la fin de la carte (max +10).", icon: "https://cdn.fireemblemwiki.org/c/c3/Is_fe18_devil%27s_luck.png" },
    { when: "Niv. 35", name: "Devil's Luck+", desc: "Après avoir vaincu un ennemi : Chance +2 jusqu'à la fin de la carte (max +10).", icon: "https://cdn.fireemblemwiki.org/b/bc/Is_fe18_devil%27s_luck%2B.png" }
  ],
  fianna: [
    { when: "Base", name: "Graceful Light", desc: "Ses magies de soin ne coûtent rien. Déclenchement : Chance %.", icon: "https://cdn.fireemblemwiki.org/0/01/Is_fe18_graceful_light.png" },
    { when: "Niv. 20", name: "Gift of Faith", desc: "Ses magies de soin rendent +20 PV. Déclenchement : Chance %.", icon: "https://cdn.fireemblemwiki.org/8/8a/Is_fe18_gift_of_faith.png" },
    { when: "Niv. 35", name: "Gift of Faith+", desc: "Ses magies de soin rendent +30 PV. Déclenchement : Chance %.", icon: "https://cdn.fireemblemwiki.org/d/dd/Is_fe18_gift_of_faith%2B.png" }
  ],
  orchel: [
    { when: "Base", name: "Solid and Sturdy", desc: "Déf +5. Unité en armure, ne peut pas devenir cavalier ni volant.", icon: "https://cdn.fireemblemwiki.org/2/2d/Is_fe18_solid_and_sturdy.png" },
    { when: "Niveau ?", name: "Predictive Sense", desc: "S'il attaque en premier : Préc +20 pour la magie pendant le combat.", icon: "https://cdn.fireemblemwiki.org/2/2d/Is_fe18_predictive_sense.png" },
    { when: "Niveau ?", name: "Harmonic Soul", desc: "Effet pas encore connu (« ??? » sur le wiki).", icon: "https://cdn.fireemblemwiki.org/a/a7/Is_fe18_harmonic_soul.png" },
    { when: "Niveau ?", name: "Harmonic Soul+", desc: "En soignant un allié avec la magie, il récupère des PV.", icon: "https://cdn.fireemblemwiki.org/b/bc/Is_fe18_harmonic_soul%2B.png" },
    { when: "Niveau ?", name: "Self-Repair", desc: "Au début de sa phase pendant l'Overblaze, récupère beaucoup de PV.", icon: "https://cdn.fireemblemwiki.org/0/0c/Is_fe18_self-repair.png" }
  ],
  seteth: [
    { when: "Base", name: "Ready for Battle", desc: "Lors de son premier combat en phase ennemie, il attaque en premier. Déclenchement : 50 %.", icon: "https://cdn.fireemblemwiki.org/7/74/Is_fe18_ready_for_battle.png" },
    { when: "Niv. 20", name: "Pass Judgment", desc: "Quand Diadem of Balance se déclenche : Att +4.", icon: "https://cdn.fireemblemwiki.org/9/99/Is_fe18_pass_judgment.png" },
    { when: "Niv. 35", name: "Pass Judgment+", desc: "Quand Diadem of Balance se déclenche : Att +7.", icon: "https://cdn.fireemblemwiki.org/c/c6/Is_fe18_pass_judgment%2B.png" }
  ],
  ninae: [
    { when: "Base", name: "Spirits' Voices", desc: "Si l'ennemi utilise la magie : Préc et Esq +10 pendant le combat.", icon: "https://cdn.fireemblemwiki.org/8/8c/Is_fe18_spirits%27_voices.png" },
    { when: "Niv. 20", name: "Spirits' Guidance", desc: "Donne Spirits' Voices aux alliés adjacents.", icon: "https://cdn.fireemblemwiki.org/e/e9/Is_fe18_spirits%27_guidance.png" },
    { when: "Niv. 35", name: "Spirits' Guidance+", desc: "Donne Spirits' Voices aux alliés à 2 cases ou moins.", icon: "https://cdn.fireemblemwiki.org/7/75/Is_fe18_spirits%27_guidance%2B.png" }
  ],
  anatolia: [
    { when: "Base", name: "Celestial Flow", desc: "Esq +3.", icon: "https://cdn.fireemblemwiki.org/7/75/Is_fe18_celestial_flow.png" },
    { when: "Overblaze", name: "Meridian Rotation", desc: "Esq +5. Permet d'utiliser la Blaze Art Shining Dragon Strike.", icon: "https://cdn.fireemblemwiki.org/2/2d/Is_fe18_meridian_rotation.png" },
    { when: "Niveau ?", name: "Meridian Expansion", desc: "Après avoir vaincu un ennemi : PV max +2 jusqu'à la fin de la carte (max +10).", icon: "https://cdn.fireemblemwiki.org/8/8e/Is_fe18_meridian_expansion.png" },
    { when: "Niveau ?", name: "Continuum", desc: "Quand elle esquive une attaque, récupère 5 PV.", icon: "https://cdn.fireemblemwiki.org/8/8f/Is_fe18_continuum.png" },
    { when: "Niveau ?", name: "Continuum+", desc: "Quand elle esquive une attaque, récupère 10 PV.", icon: "https://cdn.fireemblemwiki.org/2/21/Is_fe18_continuum%2B.png" }
  ],
  halvin: [
    { when: "Base", name: "Adaptability", desc: "Après un combat : Préc +2 jusqu'à la fin de la carte (max +30).", icon: "https://cdn.fireemblemwiki.org/5/54/Is_fe18_adaptability.png" },
    { when: "Niv. 20", name: "Halt Advance", desc: "Après un combat où il a attaqué en premier : Vit -2 à l'ennemi pendant son prochain combat.", icon: "https://cdn.fireemblemwiki.org/1/18/Is_fe18_halt_advance.png" },
    { when: "Niv. 35", name: "Halt Advance+", desc: "Après un combat où il a attaqué en premier : Vit -3 à l'ennemi pendant son prochain combat.", icon: "https://cdn.fireemblemwiki.org/7/78/Is_fe18_halt_advance%2B.png" }
  ]
};
