// ==========================================
// TRADUCTION FRANÇAIS / ANGLAIS
// Le français reste la langue du code ; en anglais, les textes affichés
// sont traduits au chargement et à chaque mise à jour de la page.
// ==========================================
const LANG_KEY = "fefw_lang";
let SITE_LANG = "fr";
try {
  SITE_LANG = localStorage.getItem(LANG_KEY) === "en" ? "en" : "fr";
} catch (e) {}

const EN_PERSONAL = {
  "Brio": "Grants Mov+1.",
  "Brio+": "Grants Mov+2.",
  "Flamekeeper": "Unit and allies are unaffected by Underworld Flames and take half damage from attacks while in Underworld Flames.",
  "Murderous Intent": "If unit attacks first, grants Crit+5 during combat.",
  "Murderous Intent+": "If unit attacks first, grants Crit+10 during combat.",
  "Bestial Impulse": "After combat, grants Crit+2 until a unit makes a critical.",
  "Royal Resolve": "Unit takes half damage when attacked. Trigger % = 30.",
  "Royal Resolve+": "Unit takes half damage when attacked. Trigger % = 50.",
  "Direct Hit": "Deals +10 damage when attacking with Blaze Arts. Trigger % = 30.",
  "Unstoppable Force": "Multiplies damage by 3 when attacking obstacles.",
  "Blindside": "If unit attacks first, cannot be countered during combat. Trigger % = 5.",
  "Blindside+": "If unit attacks first, cannot be countered during combat. Trigger % = 10.",
  "Improviso": "After using Blaze Arts during Overblaze, unit can attack.",
  "Zhu Ming": "When equipped with magic, grants Hit+10.",
  "Amplify Magic": "After combat, grants Atk+4 through unit's next combat. Trigger % = Mag ÷ 2.",
  "Amplify Magic+": "After combat, grants Atk+7 through unit's next combat. Trigger % = Mag ÷ 2.",
  "Yun Shou": "When equipped with gauntlets, grants Hit+10.",
  "Modified Weapon": "When equipped with Zerberus, attacks are effective vs. flying.",
  "Modified Weapon+": "When equipped with Zerberus, attacks are effective+ vs. flying.",
  "Tactician's Wit": "Grants Rng+1 to combat arts usable on allies.",
  "Tactician's Insight": "After combat, if unit attacked first, inflicts Avo-5 on foe throughout their next combat.",
  "Tactician's Insight+": "After combat, if unit attacked first, inflicts Avo-10 on foe throughout their next combat.",
  "Steady Aim": "Grants Rng+1 when attacking with a bow combat art.",
  "Correct for Drift": "If unit's hit % ≥ 90, grants Hit+10 during combat.",
  "Correct for Drift+": "If unit's hit % ≥ 75, grants Hit+20 during combat.",
  "Patch Up": "After an adjacent ally's combat, restores a little HP to that ally.",
  "Pray for Safety": "Grants Ddg+10 to adjacent allies.",
  "Pray for Safety+": "Grants Ddg+20 to adjacent allies.",
  "Dark Calling": "Inflicts Ddg-5 on adjacent foes.",
  "Dark Secrets": "Extends range of Dark Calling to 2 spaces.",
  "Dark Secrets+": "Extends range of Dark Calling to 3 spaces.",
  "Brawn": "Reduces Wt of unit's equipment to 80%.",
  "Throwing Arm": "If throwing a spear, grants Hit+10, Atk+2 during combat.",
  "Throwing Arm+": "If throwing a spear, grants Hit+20, Atk+4 during combat.",
  "Veteran's Mettle": "Grants Hit+10 during combat against an adjacent foe.",
  "Redblade's Will": "Grants Atk+3 during combat against an adjacent foe.",
  "Redblade's Will+": "Grants Atk+3 during combat against an adjacent foe. Also grants Atk+3 when attacking an adjacent foe (Trigger % = 30).",
  "Sage Advice": "Grants Def+3 to adjacent allies.",
  "Additional Intel": "Grants Hit+10 to adjacent allies during their combats. Trigger % = 30.",
  "Additional Intel+": "Grants Hit+20 to adjacent allies during their combats. Trigger % = 30.",
  "Power Arts": "Grants Atk+3 when attacking with a combat art.",
  "All-Out Attack": "Multiplies damage by 1.3 when attacking with a combat art. Trigger % = 30.",
  "All-Out Attack+": "Multiplies damage by 1.5 when attacking with a combat art. Trigger % = 30.",
  "Racing Attack": "If unit attacks first, grants Avo+15 during combat.",
  "Accelerate": "After defeating a foe, grants Spd+1 until the end of the map. (Max +10)",
  "Accelerate+": "After defeating a foe, grants Spd+2 until the end of the map. (Max +10)",
  "Safety First": "If foe cannot counter, grants Hit+10 to unit during combat.",
  "Upper Hand": "If unit's hit % = 100, grants Atk+3 when attacking.",
  "Upper Hand+": "If unit's hit % = 100, grants Atk+5 when attacking.",
  "Guardian's Duty": "Reduces damage to 90% when attacked.",
  "Retaliatory Blow": "If foe attacks first, multiplies damage by 1.3 when attacking. Trigger % = 5.",
  "Retaliatory Blow+": "If foe attacks first, multiplies damage by 1.3 when attacking. Trigger % = 10.",
  "Goddess's Favor": "After combat, restores 5 HP to unit.",
  "Wind's Caprice": "Grants one of Avo+1, Avo+5 or Avo+20 during combat.",
  "Wind's Caprice+": "Grants one of Avo+1, Avo+5, Avo+20 or Avo+30 during combat.",
  "Signs of Growth": "When unit levels up, gains enhanced basic stat growth.",
  "Warrior's Blood": "Grants stat increase based on equipped weapon type.",
  "Warrior's Blood+": "Grants a large stat increase based on equipped weapon type.",
  "Competitive Zeal": "When equipped with magic, grants Crit+10.",
  "Ardent Nosferatu": "When using Nosferatu, grants Atk+3, Crit+5 during combat.",
  "Ardent Nosferatu+": "When using Nosferatu, grants Atk+5, Crit+10 during combat.",
  "Blink of an Eye": "After using Swap, grants Def+3 until unit's next phase.",
  "Flickering Edge": "When unit avoids an attack, grants Atk+3 during combat.",
  "Flickering Edge+": "When unit avoids an attack, grants Atk+5 during combat.",
  "Heavyweight Class": "Unit cannot change to cavalry or flying. Grants Bld+5.",
  "Pin Down": "Inflicts Mov-3 on adjacent foes.",
  "Pin Down+": "Inflicts Mov-5 on adjacent foes.",
  "Stage Directions": "Grants Ddg+10 to allies within 2 spaces during their combats. Trigger % = ally's Cha ÷ 2.",
  "Dramatic Effect": "When Stage Directions triggers, grants Hit+10 to target allies.",
  "Dramatic Effect+": "When Stage Directions triggers, grants Hit/Crit+10 to target allies.",
  "Caretaker": "Adjacent allies cannot suffer a follow-up during combat. Trigger % = 5.",
  "No Mercy": "Grants Hit/Crit+5 when making a follow-up.",
  "No Mercy+": "Grants Hit/Crit+10 when making a follow-up.",
  "Steadfast": "If unit's HP ≥ 50%, grants Avo+10 during combat.",
  "Peak Form": "If unit's HP = 100%, grants Atk+3 during combat.",
  "Peak Form+": "If unit's HP = 100%, grants Atk+3, Avo+10 during combat.",
  "Management Skills": "Allows storage access to unit and allies within 2 spaces.",
  "Seize the Chance": "Multiplies damage by 1.3 when attacking. Trigger % = Lck ÷ 2.",
  "Seize the Chance+": "Multiplies damage by 1.5 when attacking. Trigger % = Lck ÷ 2.",
  "Falcon": "If unit attacks first, grants AS+3 during combat.",
  "Perception": "If unit can make a follow-up, grants Avo+10 during combat.",
  "Perception+": "If unit can make a follow-up, grants Avo+20 during combat.",
  "Quick Draw": "If unit attacks first, grants Atk+3 during combat. Trigger % = 50.",
  "Never Stop": "Grants Atk+5 when attacking after Quick Draw. Trigger % = 30.",
  "Never Stop+": "Grants Atk+5 when attacking after Quick Draw. Trigger % = 50.",
  "Cooler Heads": "After using Draw Back, unit can use assist magic.",
  "Watchfulness": "Grants Spd+2 to adjacent allies.",
  "Watchfulness+": "Grants Spd+4 to adjacent allies.",
  "One Chance": "If unit and foe cannot make a follow-up, grants Atk+5 to unit during combat.",
  "Full Strength": "Multiplies damage by 1.3 when attacking. Trigger % = Str ÷ 2.",
  "Full Strength+": "Multiplies damage by 1.5 when attacking. Trigger % = Str ÷ 2.",
  "Hot-Headed": "Grants one of Hit+10, Avo+10 or Crit+10 during combat.",
  "Top Form": "Changes the effect of Hot-Headed to grant +15.",
  "Top Form+": "Changes the effect of Hot-Headed to grant +20.",
  "Monkly Havoc": "After defeating a foe, recovers HP equal to max HP. Trigger % = Lck ÷ 2.",
  "Robust Health": "Grants Shld+3 when attacked. Trigger % = unit's remaining HP.",
  "Robust Health+": "Grants Shld+5 when attacked. Trigger % = unit's remaining HP.",
  "With My Steed": "[Cavalry] If unit attacks first, grants Shld+3, Ddg+30 during combat.",
  "Mounted Push": "[Cavalry] If unit attacks first, grants Hit+10 during combat.",
  "Mounted Push+": "[Cavalry] If unit attacks first, grants Hit+10, Atk+3 during combat.",
  "Hunter's Snare": "In enemy's phase, if foe is damaged, unit attacks first during combat. Trigger % = 30.",
  "King's Majesty": "If foe is damaged, grants Atk+2, Crit+5 during combat.",
  "King's Majesty+": "If foe is damaged, grants Atk+4, Crit+10 during combat.",
  "Warrior's Clarity": "After combat, grants Avo+3 until unit's next phase.",
  "Attuned": "When Warrior's Clarity triggers, grants Avo+10 until unit's next phase. Trigger % = 10.",
  "Attuned+": "When Warrior's Clarity triggers, grants Avo+10 until unit's next phase. Trigger % = 20.",
  "Healing Knowledge": "When healing an ally with magic, restores +10 HP.",
  "Distant Healing": "Grants Rng+1 to healing magic.",
  "Distant Healing+": "Grants Rng+2 to healing magic.",
  "Punishing Squall": "If AS ≥ foe's AS+3, grants Hit+20 during combat.",
  "Wind My Friend": "If AS ≥ foe's AS+5, grants Atk+3 during combat.",
  "Wind My Friend+": "If AS ≥ foe's AS+5, grants Atk+3, and if AS ≥ foe's AS+8, grants Avo+20 during combat.",
  "Barge Through": "[Cavalry] Can move through foe's space. (Cannot move through large-scale foes.)",
  "At a Gallop": "[Cavalry] Applies -1 to movement cost for terrain (cannot be reduced below 1).",
  "At a Gallop+": "[Cavalry] Applies -2 to movement cost for terrain (cannot be reduced below 1).",
  "Hatchet Man": "When equipped with an axe, grants Hit+10.",
  "Vulgar Conduct": "If foe's HP ≤ 50%, grants Hit+20 during combat.",
  "Vulgar Conduct+": "If foe's HP ≤ 50%, grants Hit+20, Atk+3 during combat.",
  "Hellbent Axe": "When equipped with an axe, grants Str+3.",
  "Fear Nothing": "If unit attacks first, grants Atk+3 at cost of Avo-30 to unit during combat.",
  "Fear Nothing+": "If unit attacks first, grants Atk+6 at cost of Avo-30 to unit during combat.",
  "Wheeled Warrior": "[Cavalry] If unit is a charioteer, grants Hit+20.",
  "Chariot Stagger": "If unit is a charioteer, grants +1 use to staggering blows.",
  "Chariot Stagger+": "If unit is a charioteer, grants +2 uses to staggering blows.",
  "Heavy-Bow User": "When equipped with a bow, grants Str+3.",
  "Pierce": "Grants Atk+2, Crit+5 when attacking with a bow combat art.",
  "Pierce+": "Grants Atk+4, Crit+10 when attacking with a bow combat art.",
  "Expert Counter": "If foe attacks first, grants Hit+20 to unit during combat.",
  "Raging Counter": "If foe attacks first, grants Atk+3 to unit during combat.",
  "Raging Counter+": "If foe attacks first, grants Atk+3, Crit+10 to unit during combat.",
  "Silver Maiden": "Grants Hit/Avo+5 to unit for each adjacent ally.",
  "Soar": "If unit is on inaccessible terrain, grants AS+3.",
  "Soar+": "If unit is on inaccessible terrain, grants AS+5.",
  "Har Hali Wisdom": "If unit is effective against foe, grants Atk+3 during combat.",
  "Precision Strike": "If unit is effective against foe, grants Hit+10 during combat.",
  "Precision Strike+": "If unit is effective against foe, grants Hit+20 during combat.",
  "Tyranny": "If foe has a status effect, grants Atk+3, Crit+10 to unit during combat.",
  "Menace": "Halves foe's Ddg during combat. Trigger % = 10.",
  "Menace+": "Halves foe's Ddg during combat. Trigger % = 20.",
  "Requiem Style": "Unit makes a follow-up regardless of AS during combat. Trigger % = 5.",
  "Requiem Style+": "Unit makes a follow-up regardless of AS during combat. Trigger % = 10.",
  "Go No Sen": "In enemy's phase, unit attacks first during combat. Trigger % = 25.",
  "Sen No Sen": "If unit attacks first, unit's follow-up occurs before foe's counter during combat. Trigger % = 25.",
  "Swashbuckler's Luck": "Grants Lck+3.",
  "Swashbuckler's Luck+": "Grants Lck+5 to unit and all allies.",
  "Cannoning Flair": "When using artillery, grants Hit+30 during combat.",
  "Winds of Victory": "Grants Hit+15 when attacking. Grants Avo+15 when attacked. Trigger % = Lck.",
  "Brave Assist": "Grants Def+3 to adjacent allies.",
  "Flashing Fang": "Grants Atk+4, Hit+50 when attacking. Trigger % = 20.",
  "Flashing Fang+": "Grants Atk+7, Hit+100 when attacking. Trigger % = 20.",
  "Close Call": "If unit's HP ≥ 2 and damage would reduce it to 0, leaves unit with 1 HP. Trigger % = Lck.",
  "Devil's Luck": "After defeating a foe, grants Lck+1 until the end of the map. (Max +10)",
  "Devil's Luck+": "After defeating a foe, grants Lck+2 until the end of the map. (Max +10)",
  "Graceful Light": "When healing an ally with magic, reduces magic cost to 0. Trigger % = Lck.",
  "Gift of Faith": "When healing an ally with magic, restores +20 HP. Trigger % = Lck.",
  "Gift of Faith+": "When healing an ally with magic, restores +30 HP. Trigger % = Lck.",
  "Solid and Sturdy": "Grants Def+5. Unit is armored. Cannot change class to cavalry or flying.",
  "Predictive Sense": "If unit attacks first, grants Hit+20 to magic during combat.",
  "Harmonic Soul": "Effect not documented yet (\"???\" on the wiki).",
  "Harmonic Soul+": "When healing an ally with magic, restores some HP to unit.",
  "Self-Repair": "At start of unit's phase during Overblaze, restores a lot of HP to unit.",
  "Ready for Battle": "For the first combat in enemy's phase, unit attacks first. Trigger % = 50.",
  "Pass Judgment": "When Diadem of Balance triggers, grants Atk+4.",
  "Pass Judgment+": "When Diadem of Balance triggers, grants Atk+7.",
  "Spirits' Voices": "If foe uses magic, grants Hit/Avo+10 to unit during combat.",
  "Spirits' Guidance": "Grants Spirits' Voices to adjacent allies.",
  "Spirits' Guidance+": "Grants Spirits' Voices to allies within 2 spaces.",
  "Celestial Flow": "Grants Avo+3.",
  "Meridian Rotation": "Grants Avo+5. Allows use of the Shining Dragon Strike Blaze Art.",
  "Meridian Expansion": "After defeating a foe, grants max HP+2 until the end of the map. (Max +10)",
  "Continuum": "When unit avoids an attack, restores 5 HP to unit.",
  "Continuum+": "When unit avoids an attack, restores 10 HP to unit.",
  "Adaptability": "After combat, grants Hit+2 until the end of the map. (Max +30)",
  "Halt Advance": "After combat, if unit attacked first, inflicts Spd-2 on foe through their next combat.",
  "Halt Advance+": "After combat, if unit attacked first, inflicts Spd-3 on foe through their next combat."
};
const EN_CLASS_NAMES = {
  "gladiator": "Gladiator",
  "hunter": "Hunter",
  "soldier": "Soldier",
  "ornius_rider": "Ornius Rider",
  "diviner": "Diviner",
  "myrmidon": "Myrmidon",
  "brigand": "Brigand",
  "pugilist": "Pugilist",
  "archer": "Archer",
  "rogue": "Rogue",
  "armored_knight": "Armored Knight",
  "light_cavalry": "Light Cavalry",
  "charioteer": "Charioteer",
  "armored_ornius": "Armored Ornius Rider",
  "wing_soldier": "Wing Soldier",
  "shaman": "Shaman",
  "priest": "Priest",
  "shido": "Shido",
  "dancer": "Dancer",
  "warrior": "Warrior",
  "blacksmith": "Blacksmith",
  "sniper": "Sniper",
  "sylvan_cavalier": "Forest Knight",
  "ranger": "Ranger",
  "elephan rider": "Elephant Rider",
  "Guardian": "Guardian",
  "dreadnought": "Dreadnought",
  "bard_cavalier": "Bardinger",
  "cataphract": "Cataphract",
  "calander_cavalier": "Caladrius",
  "dragon_rider_elite": "Dragoon",
  "vate": "Ovate",
  "bishop": "Bishop",
  "troubadour": "Troubadour"
};
const EN_TECH = {
  "Monter/Descendre": [
    "Mount/Dismount",
    "Allows use of Mount and Dismount commands."
  ],
  "Arts de combat +1": [
    "Combat Arts +1",
    "Unit can equip +1 combat arts."
  ],
  "Arts de combat +2": [
    "Combat Arts +2",
    "Unit can equip +2 combat arts."
  ],
  "Crit épée +3": [
    "Sword Crit +3",
    "When equipped with a sword, grants Crit+3."
  ],
  "Crit épée +5": [
    "Sword Crit +5",
    "When equipped with a sword, grants Crit+5."
  ],
  "Préc hache +3": [
    "Axe Hit +3",
    "When equipped with an axe, grants Hit+3."
  ],
  "Préc hache +5": [
    "Axe Hit +5",
    "When equipped with an axe, grants Hit+5."
  ],
  "Préc poings +5": [
    "Brawl Hit +5",
    "When equipped with gauntlets, grants Hit+5."
  ],
  "Préc arc +5": [
    "Bow Hit +5",
    "When equipped with a bow, grants Hit+5."
  ],
  "Préc arc +10": [
    "Bow Hit +10",
    "When equipped with a bow, grants Hit+10."
  ],
  "Préc magie +3": [
    "Magic Hit +3",
    "When equipped with magic, grants Hit+3."
  ],
  "Préc magie +5": [
    "Magic Hit +5",
    "When equipped with magic, grants Hit+5."
  ],
  "Esq poings +3": [
    "Brawl Avo +3",
    "When equipped with gauntlets, grants Avo+3."
  ],
  "Soin magique +5": [
    "Magic Heal +5",
    "When healing an ally with magic, restores +5 HP."
  ],
  "Soin magique +10": [
    "Magic Heal +10",
    "When healing an ally with magic, restores +10 HP."
  ],
  "Crochetage": [
    "Locktouch",
    "Allows the opening of chests even without keys."
  ],
  "Fouille": [
    "Search",
    "Search results are slightly more likely to be perfect."
  ],
  "Fouille avancée": [
    "Advanced Search",
    "Search results are more likely to be perfect."
  ],
  "Déf riposte +3": [
    "Strike-Last Def +3",
    "If foe attacks first, grants Prt+3 to unit during combat."
  ],
  "Déf riposte +5": [
    "Strike-Last Def +5",
    "If foe attacks first, grants Prt+5 to unit during combat."
  ],
  "Armure de char": [
    "Chariot Armor",
    "[Cavalry] Grants Shld+5. Unit cannot avoid attacks."
  ],
  "Bottes d'éléphant de guerre": [
    "War-Elephant Boots",
    "[Cavalry] Unit takes half damage when attacked. Unit cannot avoid attacks."
  ],
  "Tactique d'aurige": [
    "Charioteer Tactics",
    "Allows use of the Mount and Dismount commands. [Cavalry] Allows use of the Charge command."
  ],
  "Tactique d'éléphant": [
    "Elephant Tactics",
    "Allows use of the Mount and Dismount commands. [Cavalry] Allows use of the Heavy Charge command."
  ],
  "Voie de l'aurige": [
    "Charioteer's Path",
    "Unit's growth rates increase with level."
  ],
  "Voie du cavalier d'éléphant": [
    "Elephant Rider's Path",
    "Unit's growth rates increase with level."
  ],
  "Adepte de magie noire": [
    "Black-Magic Seeker",
    "Multiplies black magic uses by 2."
  ],
  "Adepte de magie blanche": [
    "White-Magic Seeker",
    "Multiplies white magic uses by 2."
  ],
  "Danse": [
    "Dance",
    "Allows use of the Dance combat art."
  ],
  "Notions d'attaque": [
    "Attack Basics",
    "Grants Str+1."
  ],
  "Notions de chasse": [
    "Hunting Basics",
    "Grants Dex/Spd+1."
  ],
  "Notions de défense": [
    "Defense Basics",
    "Grants Def+1 / Pivot ability"
  ],
  "Notions d'offensive": [
    "Offense Basics",
    "Grants Str/Mag+1."
  ],
  "Notions de magie": [
    "Magic Basics",
    "Grants Mag/Res+1."
  ],
  "Arts ravageurs": [
    "Ravaging Arts",
    "If unit makes a critical, deals +6 damage."
  ],
  "Regroupement": [
    "Regroup",
    "When foe avoids an attack, grants Avo+20 to unit during combat."
  ],
  "Frappe et recul": [
    "Attack, Get Back",
    "When using a combat art, grants Avo+10 during combat."
  ],
  "Crescendo": [
    "Crescendo",
    "After defeating a foe, grants Hit+3 until the end of the map. (Max +30)"
  ],
  "Dans l'ombre": [
    "In Shadow",
    "After defeating a foe, grants Avo+10 through unit's next combat."
  ],
  "Grande riposte": [
    "Great Counter",
    "If foe attacks first, grants Atk+3 to unit during combat."
  ],
  "Santé renforcée": [
    "Bolster Health",
    "Grants max HP+3."
  ],
  "Chargeur": [
    "Charger",
    "When using Charge, grants Prt+10 until unit's next phase."
  ],
  "Sens du danger": [
    "Sense Threat",
    "If foe is effective against unit, grants Avo+20 to unit during combat."
  ],
  "Ailes protectrices": [
    "Protecting Wings",
    "Grants Res+3."
  ],
  "Entrave technique": [
    "Bind Dexterity",
    "Inflicts Dex-3 on adjacent foes."
  ],
  "Piété": [
    "Piety",
    "Grants Lck+3."
  ],
  "Toujours vigilant": [
    "Ever Vigilant",
    "After defeating a foe with a critical attack, restores a little HP to unit."
  ],
  "Danse spéciale": [
    "Special Dance",
    "When using Dance, grants Dex/Spd+3 to target ally for the current phase."
  ],
  "Art maîtrisé": [
    "Practiced Art",
    "Grants Hit+10 when attacking with a combat art."
  ],
  "Bricolage": [
    "Makeshift",
    "When using a combat art, reduces weapon durability cost to 0 during combat. Trigger % = 10."
  ],
  "Tir d'élite": [
    "Marksmanship",
    "When equipped with a bow, grants Hit+15."
  ],
  "Œil du chasseur": [
    "Hunter's Eye",
    "When equipped with a bow, grants Atk+3 when making a follow-up."
  ],
  "Tir de riposte": [
    "Countershot",
    "When equipped with a bow, unit can counter adjacent foes during combat. Trigger % = 50."
  ],
  "Avant-garde d'éléphant": [
    "Elephant Vanguard",
    "[Cavalry] If unit is an elephant rider, grants Hit+10."
  ],
  "Parade": [
    "Brace",
    "After defeating a foe, grants Prt+3 until unit's next phase."
  ],
  "Riposte concentrée": [
    "Focused Counter",
    "If foe attacks first, grants Hit+10 to unit during combat."
  ],
  "Égide": [
    "Aegis",
    "Unit takes half damage when attacked with a magical attack. Trigger % = 20."
  ],
  "Pavois": [
    "Pavise",
    "Unit takes half damage when attacked with a physical attack. Trigger % = 20."
  ],
  "Dépassement": [
    "Overtake",
    "After defeating a foe, grants Mov+1 through the end of the next turn. (Max +3)"
  ],
  "Assiégeant": [
    "Besieger",
    "If foe is on favorable terrain, grants Hit+20 to unit during combat."
  ],
  "Entrave vitesse": [
    "Bind Speed",
    "Inflicts Spd-3 on adjacent foes."
  ],
  "Barrière": [
    "Barrier",
    "Grants Res+3 to adjacent allies."
  ]
};

const EN_SKILL_NAMES = {
  sword: "Sword", lance: "Lance", axe: "Axe", bow: "Bow", brawl: "Brawling",
  black_magic: "Black Magic", white_magic: "White Magic", authority: "Authority",
  infantry: "Infantry", cavalry: "Riding", heavy_armor: "Heavy Armor", flying: "Flying"
};

const EN_STATS = { hp: "HP", str: "Strength", mag: "Magic", spd: "Speed", dex: "Dexterity", def: "Defense", res: "Resistance", lck: "Luck", cha: "Charm" };

const EN_RENOWN = {
  3: "Renown 3 — Very early recruitment", 4: "Renown 4 — Early recruitment", 5: "Renown 5 — Early game",
  6: "Renown 6 — Mid game", 7: "Renown 7 — Mid to late game", 8: "Renown 8 — Late recruitment",
  9: "Renown 9 — Very late recruitment", 10: "Renown 10 — Final recruitment"
};

const EN_WHEN = { Base: "Base", Overblaze: "Overblaze", "Niveau ?": "Level ?" };

const EN_TIERS = { Novice: "Novice", "Avancée": "Advanced", "Élite": "Elite" };
const EN_FACTIONS = { "Jeux Héroïques": "Heroic Games", "Armée du Sauveur": "Savior's Army", "Armée du Sauveur (Auto)": "Savior's Army (Auto)" };

// Textes exacts (sans espaces autour)
const EN_TEXT = {
  "Calculateur de classes & progression": "Class & progression calculator",
  "Calculateur de Build": "Build Calculator",
  "Système de Points & Barème": "Points & Scoring",
  "Recrutement": "Recruitment",
  "Comparateur": "Comparator",
  "Factions": "Factions",
  "Classes": "Classes",
  "📊 Système de Points & Calcul de Rang": "📊 Points System & Rank Calculation",
  "Comprendre comment le score de synergie et les rangs sont attribués aux classes": "How the synergy score and ranks are given to classes",
  "1. Maîtrises & Compétences (Priorité Majeure)": "1. Skills & Proficiencies (Top priority)",
  "Quand vous choisissez un personnage, ses points forts sont cochés comme": "When you pick a character, their strengths are ticked as",
  "prioritaires": "priority",
  "et ses compétences peu adaptées sont marquées": "and the skills that don't suit them are marked",
  "peu adapté": "poor fit",
  "peu adaptée": "poor fit",
  ". Vous pouvez changer chaque état d'un clic.": ". You can change each state with one click.",
  "+10 points": "+10 points",
  "-5 points": "-5 points",
  "par maîtrise prioritaire présente dans la classe.": "per priority skill the class has.",
  "par maîtrise prioritaire absente de la classe.": "per priority skill the class lacks.",
  "Déplacements (Infanterie, Cavalerie, Aérien) :": "Movement (Infantry, Riding, Flying):",
  "une classe n'en a qu'un. Si elle correspond à l'un des déplacements prioritaires, les autres ne donnent pas de malus.": "a class only has one. If it matches one of the priority movement types, the others give no penalty.",
  "par maîtrise": "per",
  "que la classe utilise.": "skill the class uses.",
  "2. Gestion des Statistiques Prioritaires": "2. Stat priorities",
  "Selon l'état stratégique attribué à chaque statistique (clics successifs sur les carrés de stats) :": "Depending on the priority given to each stat (click the stat squares to cycle):",
  "★★★ Divine :": "★★★ Divine:",
  "★★ Majeure :": "★★ Major:",
  "★ Prioritaire :": "★ Priority:",
  "• Neutre (Par défaut) :": "• Neutral (default):",
  "🔻 Moins prioritaire :": "🔻 Low priority:",
  "Multiplie la croissance (ou l'évolution) par": "Multiplies the growth (or change) by",
  "en cas de hausse ou de baisse.": "whether it goes up or down.",
  "Compte pour": "Counts as",
  "évolution × 0.25": "change × 0.25",
  ", en hausse comme en baisse.": ", up or down.",
  "Donne": "Gives",
  "0 point": "0 points",
  "si la stat indésirable baisse, mais multiplie l'évolution par": "if the unwanted stat goes down, but multiplies the change by",
  "et retire cette somme (": "and subtracts it (",
  "-(évolution × 1.5)": "-(change × 1.5)",
  ") si elle augmente.": ") if it goes up.",
  "3. Grille des Rangs": "3. Rank table",
  "🧪 Simulateur & Débogueur de Rang": "🧪 Rank Simulator & Debugger",
  "Testez n'importe quelle combinaison Personnage / Classe pour inspecter le détail mathématique exact du score.": "Test any Character / Class combination to inspect the exact score calculation.",
  "1. Personnage de test :": "1. Test character:",
  "2. Classe à tester :": "2. Class to test:",
  "-- Choisir un personnage --": "-- Choose a character --",
  "-- Choisir une classe --": "-- Choose a class --",
  "-- Sélectionnez un personnage --": "-- Select a character --",
  "Maîtrises actives du personnage (cliquez pour activer/désactiver) :": "Character's active skills (click to change):",
  "Priorités des statistiques :": "Stat priorities:",
  "Résultat du calcul": "Calculation result",
  "Personnage + Classe": "Character + Class",
  "Détail ligne par ligne du calcul :": "Line-by-line calculation:",
  "Critère évalué": "Criterion",
  "Règle appliquée": "Rule applied",
  "Détail du calcul": "Calculation",
  "Points": "Points",
  "SCORE TOTAL CALCULÉ :": "TOTAL SCORE:",
  "Anomalie détectée :": "Problem found:",
  "Vérification OK :": "Check OK:",
  "Aucun changement": "No change",
  "Aucune maîtrise sélectionnée": "No skill selected",
  "Aucune maîtrise sélectionnée pour ce test": "No skill selected for this test",
  "Compatible avec la classe": "Matches the class",
  "Absente de la classe": "Not in the class",
  "Autre type de déplacement choisi": "Another movement type chosen",
  "Pas de malus (déplacements exclusifs)": "No penalty (movement types are exclusive)",
  "Utilisée par la classe": "Used by the class",
  "Baisse : 0 pt": "Decrease: 0 pts",
  "★★★ Divine": "★★★ Divine",
  "★★ Majeure": "★★ Major",
  "★ Prioritaire": "★ Priority",
  "• Neutre": "• Neutral",
  "🔻 Moins prioritaire": "🔻 Low priority",
  "Divine (★★★)": "Divine (★★★)",
  "Majeure (★★)": "Major (★★)",
  "Prioritaire (★)": "Priority (★)",
  "Neutre": "Neutral",
  "neutre": "neutral",
  "Moins prioritaire (🔻)": "Low priority (🔻)",
  "🤝 Guide de Recrutement par Route": "🤝 Recruitment Guide by Route",
  "Sélectionnez un Héros pour afficher les personnages recrutables classés par Renom": "Select a Lord to see the recruitable characters sorted by Renown",
  "Enregistrer l'équipe": "Save team",
  "Tout vider": "Clear all",
  "Cliquez sur un personnage dans la liste ci-dessous pour l'ajouter à votre équipe.": "Click a character in the list below to add them to your team.",
  "Auto : Automatique": "Auto: Automatic",
  "S1 : Soutien rang 1": "S1: Support rank 1",
  "S2 : Soutien rang 2": "S2: Support rank 2",
  "S3 : Soutien rang 3": "S3: Support rank 3",
  "🔍 Rechercher un personnage...": "🔍 Search for a character...",
  "Automatique": "Automatic",
  "Héros": "Lord",
  "✓ Équipe enregistrée": "✓ Team saved",
  "Équipe enregistrée": "Team saved",
  "Modifications non enregistrées": "Unsaved changes",
  "⚠️ Impossible d'enregistrer dans ce navigateur": "⚠️ Can't save in this browser",
  "⚠️ Impossible d'enregistrer dans ce navigateur.": "⚠️ Can't save in this browser.",
  "Non recrutable": "Not recruitable",
  "🚫 Non recrutables sur cette route": "🚫 Not recruitable on this route",
  "⚖️ Comparateur de personnages": "⚖️ Character Comparator",
  "Choisissez deux personnages pour comparer leurs stats de base ou leurs croissances": "Choose two characters to compare their base stats or growth rates",
  "Inverser les deux personnages": "Swap the two characters",
  "Stats de base": "Base stats",
  "Croissances": "Growth rates",
  "Voir la fiche": "View profile",
  "Écart": "Diff.",
  "Total": "Total",
  "Graphique radar": "Radar chart",
  "🏰 Factions": "🏰 Factions",
  "Choisissez une faction pour voir ses membres — cliquez sur un membre pour ouvrir sa fiche": "Choose a faction to see its members — click a member to open their profile",
  "Modifié": "Edited",
  "Voir la faction": "View faction",
  "Fermer": "Close",
  "Compétences personnelles": "Personal skills",
  "Recrutement par route": "Recruitment by route",
  "Héros de cette route": "Lord of this route",
  "Dans l'équipe de départ": "In the starting team",
  "Peu adapté :": "Poor fit:",
  "Peu adapté": "Poor fit",
  "✏️ Modifier les maîtrises": "✏️ Edit skills",
  "⚖️ Comparer ce personnage": "⚖️ Compare this character",
  "Builds enregistrés": "Saved builds",
  "Supprimer ce build": "Delete this build",
  "Modifier les Maîtrises & Compétences": "Edit Skills & Proficiencies",
  "Clic sur une compétence :": "Click a skill:",
  "✓ point fort": "✓ strength",
  "✕ peu adapté": "✕ poor fit",
  "✓ prioritaire": "✓ priority",
  ". Les changements sont enregistrés dans ce navigateur et utilisés partout sur le site.": ". Changes are saved in this browser and used everywhere on the site.",
  "Armes": "Weapons",
  "Sorts": "Magic",
  "Talents": "Talents",
  "↺ Valeurs d'origine": "↺ Original values",
  "📋 Copier pour data.js": "📋 Copy for data.js",
  "Annuler": "Cancel",
  "Enregistrer": "Save",
  "Copié ! Remplace ces deux lignes dans le personnage, dans data.js.": "Copied! Replace these two lines in the character, in data.js.",
  "Sélectionne le texte ci-dessous et copie-le (Ctrl+C).": "Select the text below and copy it (Ctrl+C).",
  "Clic : neutre → point fort → peu adapté → neutre": "Click: neutral → strength → poor fit → neutral",
  "Clic : neutre → prioritaire → peu adapté → neutre": "Click: neutral → priority → poor fit → neutral",
  "🛡️ Classes": "🛡️ Classes",
  "Toutes les classes du jeu — choisissez-en une pour voir ses détails et les personnages qui lui conviennent le mieux": "Every class in the game — choose one to see its details and the characters who suit it best",
  "Toutes": "All",
  "Toutes les maîtrises": "All skills",
  "🔍 Rechercher une classe…": "🔍 Search for a class…",
  "Aucune classe ne correspond à ces filtres.": "No class matches these filters.",
  "Croissances de la classe": "Class growth rates",
  "Techniques": "Abilities",
  "Magistrale": "Mastery ability",
  "Aucune magistrale connue.": "No known mastery ability.",
  "Aucune technique de base.": "No base ability.",
  "Aucune technique spécifique": "No specific ability",
  "🎯 Qui pour cette classe ?": "🎯 Who fits this class?",
  "Calcul avec le moteur du calculateur : maîtrises du personnage (points forts et peu adapté) et toutes les stats en Neutre.": "Calculated with the calculator's engine: the character's skills (strengths and poor fits) and every stat set to Neutral.",
  "Aucune maîtrise en commun": "No skill in common",
  "🔎 Rechercher une compétence personnelle par effet (ex. soin, Esq, attaque double)…": "🔎 Search personal skills by effect (e.g. heal, Avo, follow-up)…",
  "⚙️ Gestion des Statistiques": "⚙️ Stat priorities",
  "Cliquez sur un carré de stat pour alterner les priorités :": "Click a stat square to cycle priorities:",
  "Maîtrises & Compétences prioritaires": "Priority Skills & Proficiencies",
  "Les points forts du personnage sont cochés automatiquement, et ce qui lui est peu adapté est marqué en rouge. Cliquez sur une compétence pour changer son état :": "The character's strengths are ticked automatically, and poor fits are marked in red. Click a skill to change its state:",
  "Choisir un personnage :": "Choose a character:",
  "Statistiques Actuelles": "Current stats",
  "Prévisualisation des Changements": "Change preview",
  "Classe Novice": "Novice Class",
  "Classe Avancée": "Advanced Class",
  "Classe Élite": "Elite Class",
  "1. Classe Novice": "1. Novice Class",
  "2. Classe Avancée": "2. Advanced Class",
  "3. Classe Élite": "3. Elite Class",
  "Valider la classe Novice": "Confirm Novice class",
  "Valider la classe Avancée": "Confirm Advanced class",
  "Valider la classe Élite": "Confirm Elite class",
  "⚠️ Sélectionnez d'abord une classe dans la liste.": "⚠️ Select a class from the list first.",
  "Tier": "Tier",
  "Nom de la classe": "Class name",
  "Retourner le panneau pour voir le calcul du rang": "Flip the panel to see the rank calculation",
  "🔄 Calcul": "🔄 Calculation",
  "🔄 Analyse": "🔄 Analysis",
  "Maîtrises compatibles": "Matching skills",
  "⚖️ Comparer avec une autre classe": "⚖️ Compare with another class",
  "Progression des Growth Rates": "Growth rate changes",
  "Statistique": "Stat",
  "Précédent": "Previous",
  "Évolution": "Change",
  "Total Actuel": "Current total",
  "🧮 Décomposition Mathématique du Rang": "🧮 Rank Calculation Breakdown",
  "Maîtrises en commun": "Skills in common",
  "Rang": "Rank",
  "🏆 Bilan Final du Build": "🏆 Final Build Summary",
  "Novice": "Novice",
  "Avancée": "Advanced",
  "Élite": "Elite",
  "Maîtrises & Compétences finales": "Final Skills & Proficiencies",
  "Statistiques Finales cumulées": "Final stats",
  "💾 Enregistrer ce build": "💾 Save this build",
  "✓ Build enregistré": "✓ Build saved",
  "Recommencer un nouveau build": "Start a new build",
  "Réinitialiser la progression": "Reset progression",
  "📚 Mes builds": "📚 My builds",
  "Les builds enregistrés dans ce navigateur": "Builds saved in this browser",
  "(Base)": "(Base)",
  "(Actuel)": "(Current)",
  "Aucune": "None",
  "Synergie parfaite et absolue (SSS) !": "Perfect, absolute synergy (SSS)!",
  "Synergie magistrale (SS) !": "Masterful synergy (SS)!",
  "Excellente synergie de classe (S) !": "Excellent class synergy (S)!",
  "Très bon choix tactique (A).": "Very good tactical choice (A).",
  "Bon choix général (B).": "Good overall choice (B).",
  "Option correcte (C).": "Decent option (C).",
  "Option viable mais limitée (D).": "Viable but limited option (D).",
  "Choix peu recommandé (E).": "Not recommended (E).",
  "Synergie contre-productive (F).": "Counter-productive synergy (F).",
  "Faction": "Faction",
  "Nom": "Name",
  "Magie": "Magic"
};

// Textes avec une partie variable
const EN_PATTERNS = [
  [/^Renom (\d+) · Soutien (S\d)$/, (m) => `Renown ${m[1]} · Support ${m[2]}`],
  [/^Renom (\d+) · Automatique$/, (m) => `Renown ${m[1]} · Automatic`],
  [/^Soutien (S\d)$/, (m) => `Support ${m[1]}`],
  [/^⭐ Renom (\d+) — (.+)$/, (m) => (EN_RENOWN[m[1]] ? `⭐ ${EN_RENOWN[m[1]]}` : `⭐ Renown ${m[1]} — ${m[2]}`)],
  [/^RANG (.+)$/, (m) => `RANK ${m[1]}`],
  [/^Rang (.+)$/, (m) => `Rank ${m[1]}`],
  [/^(.+) PTS$/, (m) => `${m[1]} PTS`],
  [/^Stat : (.+) \((.+)\)$/, (m) => `Stat: ${m[1]} (${m[2]})`],
  [/^Maîtrise : (.+)$/, (m) => `Skill: ${m[1]}`],
  [/^Peu adapté : (.+)$/, (m) => `Poor fit: ${m[1]}`],
  [/^(.+) — peu adapté$/, (m) => `${m[1]} — poor fit`],
  [/^1 × ([+-]?\d+) pts$/, (m) => `1 × ${m[1]} pts`],
  [/^Palier : (.+) \| Maîtrises classe : (.+)$/, (m) => `Tier: ${EN_TIERS[m[1]] || m[1]} | Class skills: ${m[2]}`],
  [/^-- Choisir une classe (.+) --$/, (m) => `-- Choose a${m[1] === "Avancée" || m[1] === "Élite" ? "n" : ""} ${EN_TIERS[m[1]] || m[1]} class --`],
  [/^\[(Novice|Avancée|Élite)\] (.+)$/, (m) => `[${EN_TIERS[m[1]]}] ${m[2]}`],
  [/^(\d+)\. Classe (Novice|Avancée|Élite)$/, (m) => `${m[1]}. ${EN_TIERS[m[2]]} Class`],
  [/^Classe (Novice|Avancée|Élite)$/, (m) => `${EN_TIERS[m[1]]} Class`],
  [/^Valider la classe (.+)$/, (m) => `Confirm ${EN_TIERS[m[1]] || m[1]} class`],
  [/^Voir la fiche de (.+)$/, (m) => `View ${m[1]}'s profile`],
  [/^(.+) \(Personnage fixe\)$/, (m) => `${m[1]} (Starting character)`],
  [/^(.+) \(Cliquer pour retirer\)$/, (m) => `${m[1]} (Click to remove)`],
  [/^(.+) ne peut pas être recruté sur la route de (.+) — cliquer pour voir sa fiche$/, (m) => `${m[1]} can't be recruited on ${m[2]}'s route — click to view their profile`],
  [/^Déjà dans l'équipe de (.+)$/, (m) => `Already in ${m[1]}'s team`],
  [/^Équipe de (.+)$/, (m) => `${m[1]}'s team`],
  [/^Modifier les maîtrises de (.+)$/, (m) => `Edit ${m[1]}'s skills`],
  [/^🛡️ Équipe sélectionnée \($/, () => "🛡️ Selected team ("],
  [/^(\d+) membres?$/, (m) => `${m[1]} member${m[1] === "1" ? "" : "s"}`],
  [/^(\d+) personnages?$/, (m) => `${m[1]} character${m[1] === "1" ? "" : "s"}`],
  [/^(\d+) personnages classés$/, (m) => `${m[1]} characters ranked`],
  [/^(\d+) compétences? · (\d+) personnages?$/, (m) => `${m[1]} skill${m[1] === "1" ? "" : "s"} · ${m[2]} character${m[2] === "1" ? "" : "s"}`],
  [/^Afficher les (\d+) personnages$/, (m) => `Show all ${m[1]} characters`],
  [/^Afficher seulement le top (\d+)$/, (m) => `Show only the top ${m[1]}`],
  [/^Aucun personnage ne correspond à « (.+) » sur cette route\.$/, (m) => `No character matches "${m[1]}" on this route.`],
  [/^Aucune compétence ne contient « (.+) »\.$/, (m) => `No skill contains "${m[1]}".`],
  [/^Choisissez une classe pour la comparer à (.+)\.$/, (m) => `Choose a class to compare it with ${m[1]}.`],
  [/^Choisir (.+) à la place$/, (m) => `Pick ${m[1]} instead`],
  [/^L'écart est calculé du point de vue de (.+)\. Sur le radar, chaque axe est mis à l'échelle du meilleur personnage du jeu pour cette stat\.$/, (m) => `The difference is calculated from ${m[1]}'s point of view. On the radar, each axis is scaled to the best character in the game for that stat.`],
  [/^Progression complète de votre personnage à travers les (\d+) paliers$/, (m) => `Your character's full progression across the ${m[1]} tiers`],
  [/^Total (.+)$/, (m) => `Total ${m[1]}`],
  [/^✅ Vérification OK : Total cohérent \((.+) pts → Rang (.+)\)\.$/, (m) => `✅ Check OK: total matches (${m[1]} pts → Rank ${m[2]}).`],
  [/^Toutes les données de la classe sont valides et le total correspond exactement au moteur de calcul \((.+) pts → Rang (.+)\)\.$/, (m) => `All class data is valid and the total exactly matches the calculation engine (${m[1]} pts → Rank ${m[2]}).`],
  [/^⚠️ Écart détecté entre le score détaillé \((.+)\) et le moteur \((.+)\)\.$/, (m) => `⚠️ Mismatch between the detailed score (${m[1]}) and the engine (${m[2]}).`],
  [/^Écart entre le score détaillé \((.+)\) et evaluateSynergy \((.+)\)\.$/, (m) => `Mismatch between the detailed score (${m[1]}) and evaluateSynergy (${m[2]}).`],
  [/^Statistiques manquantes dans data\.js pour cette classe : (.+)\.$/, (m) => `Stats missing in data.js for this class: ${m[1]}.`],
  [/^(.+) ne peut pas être recruté sur la route de (.+)$/, (m) => `${m[1]} can't be recruited on ${m[2]}'s route`],
  [/^Prot \+(\d+)/, null]
];

function translateText(fr) {
  if (EN_TEXT[fr] !== undefined) return EN_TEXT[fr];
  if (EN_FACTIONS[fr]) return EN_FACTIONS[fr];
  for (const [re, fn] of EN_PATTERNS) {
    if (!fn) continue;
    const m = fr.match(re);
    if (m) return fn(m);
  }
  // Options du type « Nom (Faction) » ou « Nom — Faction »
  const opt = fr.match(/^(.+?)( \(| — )(Jeux Héroïques|Armée du Sauveur(?: \(Auto\))?)(\)?)$/);
  if (opt) return `${opt[1]}${opt[2]}${EN_FACTIONS[opt[3]]}${opt[4]}`;
  return null;
}

function translateTextNode(node) {
  const raw = node.nodeValue;
  const trimmed = raw.trim();
  if (!trimmed || !/[A-Za-zÀ-ÿ]/.test(trimmed)) return;
  const en = translateText(trimmed);
  if (en === null || en === trimmed) return;
  const start = raw.indexOf(trimmed);
  node.nodeValue = raw.slice(0, start) + en + raw.slice(start + trimmed.length);
}

function translateAttributes(el) {
  ["title", "placeholder", "aria-label"].forEach((attr) => {
    const v = el.getAttribute && el.getAttribute(attr);
    if (!v) return;
    const en = translateText(v.trim());
    if (en !== null && en !== v) el.setAttribute(attr, en);
  });
}

function translateTree(root) {
  if (!root) return;
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  if (["SCRIPT", "STYLE", "TEXTAREA"].includes(root.tagName)) return;
  translateAttributes(root);
  root.querySelectorAll("[title],[placeholder],[aria-label]").forEach(translateAttributes);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement && ["SCRIPT", "STYLE", "TEXTAREA"].includes(n.parentElement.tagName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(translateTextNode);
}

// Traduit les données (noms de classes, maîtrises, stats, compétences) avant l'affichage
function applyLanguageData() {
  if (SITE_LANG !== "en") return;
  document.documentElement.lang = "en";

  SKILLS_LIST.forEach((sk) => {
    if (EN_SKILL_NAMES[sk.id]) sk.name = EN_SKILL_NAMES[sk.id];
  });
  Object.keys(EN_STATS).forEach((k) => {
    if (k in STAT_LABELS) STAT_LABELS[k] = EN_STATS[k];
  });
  if (typeof RENOWN_LABELS !== "undefined") {
    Object.keys(EN_RENOWN).forEach((k) => {
      if (k in RENOWN_LABELS) RENOWN_LABELS[k] = EN_RENOWN[k];
    });
  }
  CLASSES.forEach((cls) => {
    if (EN_CLASS_NAMES[cls.id]) cls.name = EN_CLASS_NAMES[cls.id];
    (cls.techniques || []).forEach((t) => {
      const en = EN_TECH[t.name];
      if (en) {
        t.name = en[0];
        t.desc = en[1];
      }
    });
    if (cls.masterTech && EN_TECH[cls.masterTech.name]) {
      const en = EN_TECH[cls.masterTech.name];
      cls.masterTech.name = en[0];
      cls.masterTech.desc = en[1];
    }
  });
  if (typeof PERSONAL_SKILLS !== "undefined") {
    Object.values(PERSONAL_SKILLS).forEach((list) =>
      list.forEach((sk) => {
        if (EN_PERSONAL[sk.name]) sk.desc = EN_PERSONAL[sk.name];
        sk.when = EN_WHEN[sk.when] || sk.when.replace(/^Niv\. /, "Lv. ");
      })
    );
  }
}

function startPageTranslation() {
  if (SITE_LANG !== "en") return;
  translateTree(document.body);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type === "characterData") translateTextNode(m.target);
      else if (m.type === "attributes") translateAttributes(m.target);
      else m.addedNodes.forEach((n) => translateTree(n));
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["title", "placeholder", "aria-label"]
  });
}

// Bouton FR / EN dans l'en-tête
function initLanguageSwitch() {
  const header = document.querySelector(".main-header");
  if (!header || document.getElementById("lang-switch")) return;
  const box = document.createElement("div");
  box.id = "lang-switch";
  box.className = "lang-switch";
  box.setAttribute("role", "group");
  box.setAttribute("aria-label", "Language");
  ["fr", "en"].forEach((lang) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = lang.toUpperCase();
    btn.className = SITE_LANG === lang ? "active" : "";
    btn.title = lang === "fr" ? "Français" : "English";
    btn.addEventListener("click", () => {
      if (SITE_LANG === lang) return;
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch (e) {}
      location.reload();
    });
    box.appendChild(btn);
  });
  header.appendChild(box);
}
