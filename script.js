const STAT_LABELS = {
  hp: "PV",
  str: "Force",
  mag: "Magie",
  spd: "Vitesse",
  dex: "Technique",
  def: "Défense",
  res: "Résistance",
  lck: "Chance",
  cha: "Charisme"
};

let currentChar = null;
let selectedSkills = [];
let unfavoredSkills = [];
let statPriorities = {};
let selectedClasses = { Novice: null, Avancée: null, Élite: null };
let validatedClasses = { Novice: null, Avancée: null, Élite: null };
let validatedEvals = { Novice: null, Avancée: null, Élite: null };
let previewClass = null;
let currentEvaluatedClass = null;
let currentEvaluatedTier = null;
let isAnalysisFlipped = false;

let simChar = null;
let simClass = null;
let simSkills = [];
let simUnfavored = [];
let simPriorities = {};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof applyLanguageData === "function") applyLanguageData();
  applyCharacterOverrides();
  localizeIcons();
  const select = document.getElementById("character-select");

  CHARACTERS.forEach((char) => {
    const option = document.createElement("option");
    option.value = char.id;
    option.textContent = `${char.name} — ${char.faction}`;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    const charId = e.target.value;
    if (!charId) return;
    currentChar = CHARACTERS.find((c) => c.id === charId);
    
    selectedSkills = [...(currentChar.proficiencies || [])];
    unfavoredSkills = [...(currentChar.weaknesses || [])];
    statPriorities = {};
    Object.keys(STAT_LABELS).forEach(stat => { statPriorities[stat] = "neutre"; });

    previewClass = null;
    isAnalysisFlipped = false;
    
    resetProgression();
    renderSkillsSelector();
    renderStatsPrioritySelector();
    renderCharacterInfo();
    renderTierList("Novice");
  });

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (!currentChar) return;
    selectedSkills = [...(currentChar.proficiencies || [])];
    unfavoredSkills = [...(currentChar.weaknesses || [])];
    statPriorities = {};
    Object.keys(STAT_LABELS).forEach(stat => { statPriorities[stat] = "neutre"; });
    previewClass = null;
    isAnalysisFlipped = false;
    resetProgression();
    renderSkillsSelector();
    renderStatsPrioritySelector();
    renderTierList("Novice");
  });

  const flipBtn = document.getElementById("flip-analysis-btn");
  if (flipBtn) {
    flipBtn.addEventListener("click", () => {
      isAnalysisFlipped = !isAnalysisFlipped;
      const frontFace = document.getElementById("analysis-face-front");
      const backFace = document.getElementById("analysis-face-back");
      
      if (isAnalysisFlipped) {
        frontFace.hidden = true;
        backFace.hidden = false;
        flipBtn.textContent = "🔄 Analyse";
        flipBtn.style.background = "linear-gradient(145deg, #d4af37, #b89728)";
        flipBtn.style.color = "#121212";
        if (currentEvaluatedClass) {
          renderAnalysisBreakdown(currentEvaluatedClass, currentEvaluatedTier);
        }
      } else {
        frontFace.hidden = false;
        backFace.hidden = true;
        flipBtn.textContent = "🔄 Calcul";
        flipBtn.style.background = "#222";
        flipBtn.style.color = "#d4af37";
      }
    });
  }

// --- NOUVEAU CODE À COLLER À LA PLACE ---
  initSimulator();
  initRecruitmentTab();

  initCharacterSheet();
  initComparator();
  initFactionsTab();
  initCharacterEditor();
  initClassesTab();
  initEffectSearch();
  initBuilds();

  // Onglets : bouton -> panneau affiché
  const TABS = [
    { btn: "tab-calculator-btn", panel: "calculator-main-content" },
    { btn: "tab-system-btn", panel: "system-panel" },
    { btn: "tab-recruitment-btn", panel: "recruitment-panel" },
    { btn: "tab-compare-btn", panel: "compare-panel" },
    { btn: "tab-factions-btn", panel: "factions-panel" },
    { btn: "tab-classes-btn", panel: "classes-panel" }
  ];

  function setActiveTab(activeBtn) {
    TABS.forEach(({ btn }) => {
      const el = document.getElementById(btn);
      if (!el) return;
      if (el === activeBtn) {
        el.style.background = "linear-gradient(145deg, #d4af37, #b89728)";
        el.style.color = "#121212";
        el.style.border = "1px solid #f7e7ce";
      } else {
        el.style.background = "#222";
        el.style.color = "#d4af37";
        el.style.border = "1px solid #d4af37";
      }
    });
  }

  window.showTab = function (btnId) {
    TABS.forEach(({ btn, panel }) => {
      const panelEl = document.getElementById(panel);
      if (panelEl) panelEl.hidden = btn !== btnId;
    });
    setActiveTab(document.getElementById(btnId));
  };

  TABS.forEach(({ btn }) => {
    const el = document.getElementById(btn);
    if (el) el.addEventListener("click", () => window.showTab(btn));
  });

  if (typeof initLanguageSwitch === "function") initLanguageSwitch();
  if (typeof startPageTranslation === "function") startPageTranslation();
});

function getSkillObj(skillId) {
  return SKILLS_LIST.find((s) => s.id === skillId) || { name: skillId, category: "" };
}

function getRankCssClass(rank) {
  return "rank-" + rank.toLowerCase();
}

// ==========================================
// MOTEUR DE SCORE (synergie personnage / classe)
// ==========================================
const SKILL_MATCH_PTS = 10;      // maîtrise prioritaire présente dans la classe
const SKILL_MISS_PTS = -5;       // maîtrise prioritaire absente de la classe
const UNFAVORED_PTS = -5;        // maîtrise « peu adaptée » utilisée par la classe
const MOVEMENT_SKILLS = ["infantry", "cavalry", "flying"]; // un seul type de déplacement par classe

const STAT_RULES = {
  divine: { label: "★★★ Divine", up: 1.5, down: 1.5 },
  majeure: { label: "★★ Majeure", up: 1, down: 1 },
  prioritaire: { label: "★ Prioritaire", up: 0.5, down: 0.5 },
  neutre: { label: "• Neutre", up: 0.25, down: 0.25 },
  "moins-prioritaire": { label: "🔻 Moins prioritaire", up: -1.5, down: 0 }
};

function fmtPts(v) {
  const r = Math.round(v * 10) / 10;
  return `${r > 0 ? "+" : ""}${r}`;
}

function evaluateSynergy(char, cls, customSkills = null, customPriorities = null, options = {}) {
  const isCustom = customSkills !== null;
  const activeSkillsList = isCustom ? customSkills : selectedSkills;
  const unfavoredList = options.unfavored || (isCustom ? [] : unfavoredSkills);
  const prioritiesMap = customPriorities !== null ? customPriorities : statPriorities;
  const baseline = options.currentGrowths || (isCustom ? char.growths : getCurrentGrowths());

  const details = [];
  let score = 0;
  const add = (line) => {
    details.push(line);
    score += line.pts;
  };

  // 1. Maîtrises prioritaires
  const matchingSkills = cls.allowed.filter((s) => activeSkillsList.includes(s));
  const unmatchingSkills = activeSkillsList.filter((s) => !cls.allowed.includes(s));
  const selectedMoves = activeSkillsList.filter((s) => MOVEMENT_SKILLS.includes(s));
  const hasMoveMatch = selectedMoves.some((s) => cls.allowed.includes(s));

  activeSkillsList.forEach((sId) => {
    const skill = getSkillObj(sId);
    if (cls.allowed.includes(sId)) {
      add({ type: "skill", icon: skill.icon, label: `Maîtrise : ${skill.name}`, rule: "Compatible avec la classe", math: `1 × +${SKILL_MATCH_PTS} pts`, pts: SKILL_MATCH_PTS });
    } else if (MOVEMENT_SKILLS.includes(sId) && hasMoveMatch) {
      add({ type: "skill", icon: skill.icon, label: `Maîtrise : ${skill.name}`, rule: "Autre type de déplacement choisi", math: "Pas de malus (déplacements exclusifs)", pts: 0 });
    } else {
      add({ type: "skill", icon: skill.icon, label: `Maîtrise : ${skill.name}`, rule: "Absente de la classe", math: `1 × ${SKILL_MISS_PTS} pts`, pts: SKILL_MISS_PTS });
    }
  });

  // 2. Maîtrises peu adaptées utilisées par la classe
  unfavoredList.forEach((sId) => {
    if (!cls.allowed.includes(sId)) return;
    const skill = getSkillObj(sId);
    add({ type: "unfav", icon: skill.icon, label: `Peu adapté : ${skill.name}`, rule: "Utilisée par la classe", math: `1 × ${UNFAVORED_PTS} pts`, pts: UNFAVORED_PTS });
  });

  // 3. Statistiques
  Object.entries(STAT_LABELS).forEach(([stat, label]) => {
    const base = char.growths[stat] || 0;
    const withClass = base + ((cls.growths && cls.growths[stat]) || 0);
    const current = baseline[stat] ?? base;
    const evo = withClass - current;
    const prio = prioritiesMap[stat] || "neutre";
    const rule = STAT_RULES[prio] || STAT_RULES.neutre;

    let pts = 0;
    let math = "Aucun changement";
    if (evo > 0) {
      pts = evo * rule.up;
      math = prio === "moins-prioritaire" ? `-(${evo}% × 1.5)` : `${evo}% × ${rule.up}`;
    } else if (evo < 0) {
      pts = evo * rule.down;
      math = prio === "moins-prioritaire" ? "Baisse : 0 pt" : `${evo}% × ${rule.down}`;
    }

    if (evo !== 0 || prio !== "neutre") {
      add({ type: "stat", label: `Stat : ${label} (${evo > 0 ? "+" : ""}${evo}%)`, rule: rule.label, math, pts });
    }
  });

  score = Math.round(score * 10) / 10;
  const { rank, verdict } = getRankFromScore(score);
  return { rank, score, verdict, matchingSkills, unmatchingSkills, details };
}

// Remplit un tableau de détail du calcul à partir des lignes du moteur
function renderBreakdownRows(tbody, evalData, emptyText) {
  tbody.innerHTML = "";
  const rows = evalData.details;
  if (!rows.some((r) => r.type === "skill" || r.type === "unfav")) {
    tbody.innerHTML += `<tr><td colspan="3" style="color: #888;">${emptyText}</td><td class="neu">0 pts</td></tr>`;
  }
  let sum = 0;
  rows.forEach((r) => {
    sum += r.pts;
    const p = Math.round(r.pts * 10) / 10;
    tbody.innerHTML += `
      <tr class="${r.type === "unfav" ? "row-unfav" : ""}">
        <td><strong>${r.icon ? `<img src="${r.icon}" alt="" class="skill-icon"> ` : ""}${r.label}</strong></td>
        <td>${r.rule}</td>
        <td>${r.math}</td>
        <td class="${p > 0 ? "pos" : p < 0 ? "neg" : "neu"}">${fmtPts(p)} pts</td>
      </tr>`;
  });
  sum = Math.round(sum * 10) / 10;
  tbody.innerHTML += `
    <tr style="background: #222; border-top: 2px solid #d4af37;">
      <td colspan="3" style="text-align: right; color: #d4af37;"><strong>SCORE TOTAL CALCULÉ :</strong></td>
      <td style="color: #d4af37; font-size: 1.05rem;"><strong>${fmtPts(sum)} pts</strong></td>
    </tr>`;
  return sum;
}

function renderAnalysisBreakdown(cls, tier) {
  const evalData = evaluateSynergy(currentChar, cls);

  document.getElementById("analysis-back-score-badge").innerHTML = `
    <span class="rank-badge ${getRankCssClass(evalData.rank)}">Rang ${evalData.rank}</span>
    <span class="rank-badge" style="background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37;">${fmtPts(evalData.score)} pts</span>
  `;

  const sum = renderBreakdownRows(document.getElementById("analysis-breakdown-body"), evalData, "Aucune maîtrise sélectionnée");

  const errorBox = document.getElementById("analysis-back-error-check");
  errorBox.innerHTML =
    sum !== evalData.score
      ? `<div style="background: #2c1515; border: 1px solid #e74c3c; color: #e74c3c; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">⚠️ Écart détecté entre le score détaillé (${sum}) et le moteur (${evalData.score}).</div>`
      : `<div style="background: #15261a; border: 1px solid #27ae60; color: #2ecc71; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem;">✅ Vérification OK : Total cohérent (${evalData.score} pts → Rang ${evalData.rank}).</div>`;
}

function renderSimBreakdown() {
  document.getElementById("sim-res-subtitle").textContent = `Palier : ${simClass.tier} | Maîtrises classe : ${simClass.allowed.map((id) => getSkillObj(id).name).join(", ")}`;
  document.getElementById("sim-res-title").textContent = `${simChar.name} → ${simClass.name}`;

  const evalData = evaluateSynergy(simChar, simClass, simSkills, simPriorities, {
    unfavored: simUnfavored,
    currentGrowths: simChar.growths
  });

  document.getElementById("sim-res-badge").innerHTML = `
    <span class="rank-badge ${getRankCssClass(evalData.rank)}">Rang ${evalData.rank}</span>
    <span class="rank-badge" style="background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37;">${fmtPts(evalData.score)} pts</span>
  `;

  const sum = renderBreakdownRows(document.getElementById("sim-breakdown-body"), evalData, "Aucune maîtrise sélectionnée pour ce test");

  const errorBox = document.getElementById("sim-error-check");
  const missingStats = Object.keys(STAT_LABELS).filter((k) => typeof simClass.growths[k] !== "number");
  if (sum !== evalData.score || missingStats.length > 0) {
    errorBox.innerHTML = `
      <div style="background: #2c1515; border: 1px solid #e74c3c; color: #e74c3c; padding: 10px 14px; border-radius: 6px; font-size: 0.9rem;">
        ⚠️ <strong>Anomalie détectée :</strong>
        ${sum !== evalData.score ? `Écart entre le score détaillé (${sum}) et evaluateSynergy (${evalData.score}). ` : ""}
        ${missingStats.length > 0 ? `Statistiques manquantes dans data.js pour cette classe : ${missingStats.join(", ")}.` : ""}
      </div>`;
  } else {
    errorBox.innerHTML = `
      <div style="background: #15261a; border: 1px solid #27ae60; color: #2ecc71; padding: 8px 14px; border-radius: 6px; font-size: 0.85rem;">
        ✅ <strong>Vérification OK :</strong> Toutes les données de la classe sont valides et le total correspond exactement au moteur de calcul (${evalData.score} pts → Rang ${evalData.rank}).
      </div>`;
  }
}

// État d'une maîtrise : "prio" (prioritaire), "unfav" (peu adapté) ou "none"
function getSkillState(id, prioList, unfavList) {
  if (prioList.includes(id)) return "prio";
  if (unfavList.includes(id)) return "unfav";
  return "none";
}

// Cycle au clic : neutre → prioritaire → peu adapté → neutre
function nextSkillState(state) {
  return state === "none" ? "prio" : state === "prio" ? "unfav" : "none";
}

function getRankFromScore(score) {
  if (score >= 45) return { rank: "SSS", verdict: "Synergie parfaite et absolue (SSS) !" };
  if (score >= 35) return { rank: "SS", verdict: "Synergie magistrale (SS) !" };
  if (score >= 25) return { rank: "S", verdict: "Excellente synergie de classe (S) !" };
  if (score >= 15) return { rank: "A", verdict: "Très bon choix tactique (A)." };
  if (score >= 8) return { rank: "B", verdict: "Bon choix général (B)." };
  if (score >= 0) return { rank: "C", verdict: "Option correcte (C)." };
  if (score >= -6) return { rank: "D", verdict: "Option viable mais limitée (D)." };
  if (score >= -15) return { rank: "E", verdict: "Choix peu recommandé (E)." };
  return { rank: "F", verdict: "Synergie contre-productive (F)." };
}

function resetProgression() {
  selectedClasses = { Novice: null, Avancée: null, Élite: null };
  validatedClasses = { Novice: null, Avancée: null, Élite: null };
  validatedEvals = { Novice: null, Avancée: null, Élite: null };
  previewClass = null;
  currentEvaluatedClass = null;
  currentEvaluatedTier = null;
  
  document.getElementById("tree-section").hidden = false;
  document.getElementById("reset-btn").hidden = false;
  document.getElementById("analysis-panel").hidden = true;
  
  const statBContainer = document.getElementById("stat-b-container");
  if (statBContainer) statBContainer.hidden = true;
  
  const finalPanel = document.getElementById("final-summary-panel");
  if (finalPanel) finalPanel.hidden = true;

  document.getElementById("tier-novice").hidden = false;
  document.getElementById("tier-avancee").hidden = true;
  document.getElementById("tier-elite").hidden = true;
  
  renderCharacterInfo();
}

function renderSkillsSelector() {
  const section = document.getElementById("skills-selection-section");
  if (!section) return;
  section.hidden = false;

  const containers = {
    Arme: document.getElementById("skills-checkboxes-Arme"),
    Sort: document.getElementById("skills-checkboxes-Sort"),
    Talent: document.getElementById("skills-checkboxes-Talent")
  };
  Object.values(containers).forEach((c) => c && (c.innerHTML = ""));

  SKILLS_LIST.forEach((skill) => {
    const state = getSkillState(skill.id, selectedSkills, unfavoredSkills);
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `skill-checkbox-label skill-state-${state}`;
    chip.title = "Clic : neutre → prioritaire → peu adapté → neutre";
    chip.innerHTML = `
      <span class="skill-state-mark">${state === "prio" ? "✓" : state === "unfav" ? "✕" : ""}</span>
      <span><img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ${skill.name}</span>
    `;

    chip.addEventListener("click", () => {
      const next = nextSkillState(getSkillState(skill.id, selectedSkills, unfavoredSkills));
      selectedSkills = selectedSkills.filter((id) => id !== skill.id);
      unfavoredSkills = unfavoredSkills.filter((id) => id !== skill.id);
      if (next === "prio") selectedSkills.push(skill.id);
      if (next === "unfav") unfavoredSkills.push(skill.id);

      renderSkillsSelector();
      const activeTier = !document.getElementById("tier-novice").hidden ? "Novice" :
                         !document.getElementById("tier-avancee").hidden ? "Avancée" : "Élite";
      renderTierList(activeTier);
      renderCharacterInfo();

      if (selectedClasses[activeTier]) {
        const evalData = evaluateSynergy(currentChar, selectedClasses[activeTier]);
        renderAnalysis(selectedClasses[activeTier], evalData, activeTier);
      }
    });

    const target = containers[skill.category];
    if (target) target.appendChild(chip);
  });
}
function renderStatsPrioritySelector() {
  const section = document.getElementById("stats-priority-section");
  if (!section) return;
  section.hidden = false;

  const container = document.getElementById("stats-priority-grid");
  container.innerHTML = "";

  Object.entries(STAT_LABELS).forEach(([statKey, label]) => {
    const priority = statPriorities[statKey] || "neutre";
    const baseVal = currentChar.growths[statKey];

    const pill = document.createElement("div");
    pill.className = "stat-pill";
    pill.style.cursor = "pointer";
    pill.style.transition = "all 0.2s ease";

    if (priority === "divine") {
      pill.style.background = "#102235";
      pill.style.border = "1px solid #00e5ff";
      pill.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.3)";
      pill.innerHTML = `
        <span style="color: #00e5ff; text-shadow: 0 0 5px rgba(0,229,255,0.6);">★★★ ${label}</span>
        <strong style="color: #ffffff;">${baseVal}%</strong>
        <small style="color: #00e5ff;">Divine</small>
      `;
    } else if (priority === "majeure") {
      pill.style.background = "#182a1d";
      pill.style.border = "1px solid #2ecc71";
      pill.style.boxShadow = "0 0 8px rgba(46,204,113,0.3)";
      pill.innerHTML = `
        <span style="color: #2ecc71;">★★ ${label}</span>
        <strong style="color: #ffffff;">${baseVal}%</strong>
        <small style="color: #2ecc71;">Majeure</small>
      `;
    } else if (priority === "prioritaire") {
      pill.style.background = "#2a2211";
      pill.style.border = "1px solid #d4af37";
      pill.style.boxShadow = "none";
      pill.innerHTML = `
        <span style="color: #d4af37;">★ ${label}</span>
        <strong style="color: #d4af37;">${baseVal}%</strong>
        <small style="color: #d4af37;">Prioritaire</small>
      `;
    } else if (priority === "moins-prioritaire") {
      pill.style.background = "#221818";
      pill.style.border = "1px solid #c0392b";
      pill.style.boxShadow = "none";
      pill.innerHTML = `
        <span style="color: #e74c3c;">🔻 ${label}</span>
        <strong style="color: #e74c3c;">${baseVal}%</strong>
        <small style="color: #e74c3c;">Moins</small>
      `;
    } else {
      pill.style.background = "";
      pill.style.border = "";
      pill.style.boxShadow = "";
      pill.innerHTML = `
        <span>${label}</span>
        <strong>${baseVal}%</strong>
        <small class="neu">Neutre</small>
      `;
    }

    pill.addEventListener("click", () => {
      if (statPriorities[statKey] === "neutre" || !statPriorities[statKey]) {
        statPriorities[statKey] = "divine";
      } else if (statPriorities[statKey] === "divine") {
        statPriorities[statKey] = "majeure";
      } else if (statPriorities[statKey] === "majeure") {
        statPriorities[statKey] = "prioritaire";
      } else if (statPriorities[statKey] === "prioritaire") {
        statPriorities[statKey] = "moins-prioritaire";
      } else {
        statPriorities[statKey] = "neutre";
      }

      renderStatsPrioritySelector();
      const activeTier = !document.getElementById("tier-novice").hidden ? "Novice" :
                         !document.getElementById("tier-avancee").hidden ? "Avancée" : "Élite";
      renderTierList(activeTier);

      if (selectedClasses[activeTier]) {
        const evalData = evaluateSynergy(currentChar, selectedClasses[activeTier]);
        renderAnalysis(selectedClasses[activeTier], evalData, activeTier);
      }
    });

    container.appendChild(pill);
  });
}

function getCurrentGrowths() {
  const growths = { ...currentChar.growths };
  const activeValidated = validatedClasses.Élite || validatedClasses.Avancée || validatedClasses.Novice;
  
  if (activeValidated && activeValidated.growths) {
    Object.keys(activeValidated.growths).forEach((stat) => {
      const base = currentChar.growths[stat] || 0;
      const mod = activeValidated.growths[stat] || 0;
      growths[stat] = base + mod;
    });
  }
  
  return growths;
}

function getPreviewGrowths() {
  const growths = getCurrentGrowths();
  if (!previewClass || !previewClass.growths) return growths;

  Object.keys(previewClass.growths).forEach((stat) => {
    growths[stat] = (currentChar.growths[stat] || 0) + (previewClass.growths[stat] || 0);
  });

  return growths;
}

function renderCharacterInfo() {
  document.getElementById("character-info").hidden = false;
  document.getElementById("char-name").textContent = currentChar.name;
  document.getElementById("char-faction").textContent = currentChar.faction;

  const charHeaderInfo = document.querySelector(".char-header-info");
  charHeaderInfo.innerHTML = "";

  const textDiv = document.createElement("div");
  textDiv.className = "char-text-side";
  
// Association des factions avec leurs classes CSS dédiées
  const factionClassMap = {
    "Ribeira Winds (Lord)": "faction-ribeira-winds",
    "Ribeira Winds": "faction-ribeira-winds",
    "House Lamine (Lord)": "faction-house-lamine",
    "House Lamine": "faction-house-lamine",
    "Megaira's Beacon (Lord)": "faction-megairas-beacon",
    "Megaira's Beacon": "faction-megairas-beacon",
    "Rose Tempest (Lord)": "faction-rose-tempest",
    "Rose Tempest": "faction-rose-tempest",
    "Armée du Sauveur (Auto)": "faction-arme-du-sauveur",
    "Fiery Mane": "faction-fiery-mane",
    "Linaria Dewdrops": "faction-linaria-dewdrops",
    "Tale of the Moon": "faction-tale-of-the-moon",
    "Bridal Party": "faction-bridal-party"
  };

  const factionCss = factionClassMap[currentChar.faction] || "badge-faction";

// Récupération automatique de l'icône depuis data.js (FACTIONS_DATA)
  let factionWatermarkHtml = "";
  if (typeof FACTIONS_DATA !== "undefined" && FACTIONS_DATA[currentChar.faction]) {
    const iconPath = FACTIONS_DATA[currentChar.faction].icon;
    if (iconPath) {
      factionWatermarkHtml = `<img src="${iconPath}" alt="" class="faction-watermark">`;
    }
  }

  const nameHeader = document.createElement("div");
  nameHeader.className = "char-identity-wrapper";
  nameHeader.innerHTML = `
    ${factionWatermarkHtml}
    <div class="char-identity-content">
      <h2 id="char-name" style="margin: 0; color: #f7e7ce; font-size: 1.8rem; letter-spacing: 0.5px;">${currentChar.name}</h2>
      <span id="char-faction" class="badge-faction ${factionCss}" style="margin-top: 6px; display: inline-flex; align-items: center;">${currentChar.faction}</span>
    </div>
  `;
  textDiv.appendChild(nameHeader);

  const profContainer = document.createElement("div");
  profContainer.id = "char-proficiencies";
  profContainer.className = "proficiencies-container";
  profContainer.style.display = "flex";
  profContainer.style.flexWrap = "wrap";
  profContainer.style.gap = "6px";
  profContainer.style.marginTop = "12px";
  
  const activeSkillsList = [...selectedSkills];
  activeSkillsList.forEach((pId) => {
    const skill = getSkillObj(pId);
    const span = document.createElement("span");
    span.className = "prof-tag";
    span.style.background = "#222";
    span.style.border = "1px solid #b89728";
    span.style.color = "#d4af37";
    span.style.padding = "4px 10px";
    span.style.borderRadius = "4px";
    span.style.fontSize = "0.85rem";
    span.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ★ ${skill.name}`;
    profContainer.appendChild(span);
  });
  textDiv.appendChild(profContainer);
  charHeaderInfo.appendChild(textDiv);

  let portraitImg = document.createElement("img");
  portraitImg.id = "char-portrait-img";
  portraitImg.className = "character-portrait";
  portraitImg.src = currentChar.portrait || "images/default.png";
  portraitImg.alt = currentChar.name;
  charHeaderInfo.appendChild(portraitImg);

  const currentGrowths = getCurrentGrowths();
  const previewGrowths = getPreviewGrowths();

  let statsHtmlA = "";
  Object.entries(STAT_LABELS).forEach(([key, label]) => {
    const finalVal = currentGrowths[key];
    statsHtmlA += `
      <div class="stat-pill">
        <span>${label}</span>
        <strong>${finalVal}%</strong>
        <small class="neu">Total</small>
      </div>
    `;
  });

  let statsHtmlB = "";
  const statBContainer = document.getElementById("stat-b-container");
  const previewProfContainer = document.getElementById("preview-class-proficiencies");

  if (previewClass) {
    if (statBContainer) statBContainer.hidden = false;

    if (previewProfContainer) {
      previewProfContainer.innerHTML = "";
      previewProfContainer.style.display = "flex";
      previewProfContainer.style.flexWrap = "wrap";
      previewProfContainer.style.gap = "6px";

      activeSkillsList.forEach((skillId) => {
        if (previewClass.allowed.includes(skillId)) {
          const skill = getSkillObj(skillId);
          const span = document.createElement("span");
          span.className = "prof-tag";
          span.style.background = "#222";
          span.style.border = "1px solid #b89728";
          span.style.color = "#d4af37";
          span.style.padding = "4px 10px";
          span.style.borderRadius = "4px";
          span.style.fontSize = "0.85rem";
          span.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ★ ${skill.name}`;
          previewProfContainer.appendChild(span);
        }
      });
    }

    Object.entries(STAT_LABELS).forEach(([key, label]) => {
      const currentVal = currentGrowths[key];
      const previewVal = previewGrowths[key];
      const diff = previewVal - currentVal;

      let pillClass = "";
      let diffHtml = `<small class="neu">(Actuel)</small>`;

      if (diff > 0) {
        pillClass = "boosted";
        diffHtml = `<small class="pos">+${diff}%</small>`;
      } else if (diff < 0) {
        pillClass = "penalized";
        diffHtml = `<small class="neg">${diff}%</small>`;
      }

      statsHtmlB += `
        <div class="stat-pill ${pillClass}">
          <span>${label}</span>
          <strong>${previewVal}%</strong>
          ${diffHtml}
        </div>
      `;
    });
  } else {
    if (statBContainer) statBContainer.hidden = true;
  }

  const growthsGrid1 = document.getElementById("char-base-growths");
  if (growthsGrid1) growthsGrid1.innerHTML = statsHtmlA;

  const growthsGrid2 = document.getElementById("char-base-growths-2");
  if (growthsGrid2) growthsGrid2.innerHTML = statsHtmlB;
}

function renderTierList(tier) {
  const container = document.getElementById(`list-${tier}`);
  container.innerHTML = "";

  const tierClasses = CLASSES.filter((c) => c.tier === tier);
  const evaluated = tierClasses
    .map((cls) => ({ cls, evalData: evaluateSynergy(currentChar, cls) }))
    .sort((a, b) => b.evalData.score - a.evalData.score);

  evaluated.forEach(({ cls, evalData }) => {
    const btn = document.createElement("button");
    btn.className = "class-btn";
    if (selectedClasses[tier]?.id === cls.id) {
      btn.classList.add("selected");
    }

    const rankClass = getRankCssClass(evalData.rank);

    btn.innerHTML = `
      <span>${cls.name}</span>
      <span class="rank-badge ${rankClass}">Rang ${evalData.rank}</span>
    `;

    btn.addEventListener("click", () => {
      selectedClasses[tier] = cls;
      previewClass = cls; 
      renderTierList(tier);
      renderAnalysis(cls, evalData, tier);
      renderCharacterInfo();
    });
    container.appendChild(btn);
  });

  let confirmBtn = document.getElementById(`confirm-${tier}`);
  if (!confirmBtn) {
    confirmBtn = document.createElement("button");
    confirmBtn.id = `confirm-${tier}`;
    confirmBtn.className = "btn-secondary";
    confirmBtn.textContent = `Valider la classe ${tier}`;
    container.parentNode.appendChild(confirmBtn);
  }

  confirmBtn.onclick = () => {
    let warn = document.getElementById(`confirm-warning-${tier}`);
    if (!selectedClasses[tier]) {
      if (!warn) {
        warn = document.createElement("p");
        warn.id = `confirm-warning-${tier}`;
        warn.className = "confirm-warning";
        confirmBtn.insertAdjacentElement("afterend", warn);
      }
      warn.textContent = "⚠️ Sélectionnez d'abord une classe dans la liste.";
      return;
    }
    if (warn) warn.remove();
    handleTierValidation(tier);
  };
}

function handleTierValidation(tier) {
  validatedEvals[tier] = evaluateSynergy(currentChar, selectedClasses[tier]);
  validatedClasses[tier] = selectedClasses[tier];
  previewClass = null;

  if (tier === "Novice") {
    document.getElementById("tier-novice").hidden = true;
    document.getElementById("tier-avancee").hidden = false;
    renderTierList("Avancée");
  } else if (tier === "Avancée") {
    document.getElementById("tier-avancee").hidden = true;
    document.getElementById("tier-elite").hidden = false;
    renderTierList("Élite");
  } else if (tier === "Élite") {
    document.getElementById("tier-elite").hidden = true;
    document.getElementById("analysis-panel").hidden = true;
    renderFinalSummary();
  }

  renderCharacterInfo();
}

function renderFinalSummary() {
  const finalPanel = document.getElementById("final-summary-panel");
  if (!finalPanel) return;
  finalPanel.hidden = false;

  document.getElementById("final-novice").textContent = validatedClasses.Novice ? validatedClasses.Novice.name : "Aucune";
  document.getElementById("final-avancee").textContent = validatedClasses.Avancée ? validatedClasses.Avancée.name : "Aucune";
  document.getElementById("final-elite").textContent = validatedClasses.Élite ? validatedClasses.Élite.name : "Aucune";

  const finalSkillsContainer = document.getElementById("final-skills-list");
  if (finalSkillsContainer) {
    finalSkillsContainer.innerHTML = "";
    const activeSkillsList = [...selectedSkills];
    const allSkills = new Set(activeSkillsList);
    if (validatedClasses.Élite && validatedClasses.Élite.allowed) {
      validatedClasses.Élite.allowed.forEach(s => allSkills.add(s));
    }
    allSkills.forEach(sId => {
      const skill = getSkillObj(sId);
      const isPriority = activeSkillsList.includes(sId);
      const span = document.createElement("span");
      span.className = "prof-tag";
      span.style.padding = "5px 10px";
      span.style.borderRadius = "4px";
      span.style.background = isPriority ? "#2a2211" : "#222";
      span.style.border = isPriority ? "1px solid #d4af37" : "1px solid #444";
      span.textContent = `${isPriority ? "★ " : ""}${skill.name}`;
      finalSkillsContainer.appendChild(span);
    });
  }

  const finalGrowthsGrid = document.getElementById("final-growths-grid");
  finalGrowthsGrid.innerHTML = "";

  const finalGrowths = getCurrentGrowths();

  Object.entries(STAT_LABELS).forEach(([key, label]) => {
    const baseVal = currentChar.growths[key];
    const finalVal = finalGrowths[key];
    const diff = finalVal - baseVal;

    let pillClass = "";
    let diffHtml = `<small class="neu">(Base)</small>`;

    if (diff > 0) {
      pillClass = "boosted";
      diffHtml = `<small class="pos">+${diff}%</small>`;
    } else if (diff < 0) {
      pillClass = "penalized";
      diffHtml = `<small class="neg">${diff}%</small>`;
    }

    finalGrowthsGrid.innerHTML += `
      <div class="stat-pill ${pillClass}">
        <span>${label}</span>
        <strong>${finalVal}%</strong>
        ${diffHtml}
      </div>
    `;
  });

  const restartBtn = document.getElementById("restart-calculator-btn");
  if (restartBtn) {
    restartBtn.onclick = () => {
      finalPanel.hidden = true;
      selectedSkills = [];
      statPriorities = {};
      Object.keys(STAT_LABELS).forEach(stat => { statPriorities[stat] = "neutre"; });
      previewClass = null;
      isAnalysisFlipped = false;
      resetProgression();
      renderSkillsSelector();
      renderStatsPrioritySelector();
      renderTierList("Novice");
    };
  }

  finalPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderAnalysis(cls, evalData, tier) {
  currentEvaluatedClass = cls;
  currentEvaluatedTier = tier;

  const panel = document.getElementById("analysis-panel");
  panel.hidden = false;

  document.getElementById("detail-tier").textContent = `Classe ${tier}`;
  document.getElementById("detail-class-name").textContent = cls.name;

  const scoreEl = document.getElementById("detail-score");
  scoreEl.innerHTML = `
    <span class="rank-badge ${getRankCssClass(evalData.rank)}">RANG ${evalData.rank}</span>
    <span class="rank-badge" style="background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37;">${evalData.score > 0 ? '+' : ''}${evalData.score} PTS</span>
  `;
  
  document.getElementById("detail-verdict").textContent = evalData.verdict;

  // Conteneur principal des maîtrises et compétences côte à côte
  const allowedContainer = document.getElementById("detail-allowed");
  allowedContainer.innerHTML = "";
  allowedContainer.className = "skills-side-by-side-container"; // Applique le conteneur flex/grid

  const activeSkillsList = [...selectedSkills];

  // COLONNE DE GAUCHE : Maîtrises compatibles
  const leftCol = document.createElement("div");
  leftCol.className = "skills-column";
  leftCol.innerHTML = `<h5 style="color: #d4af37; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 8px;">Maîtrises compatibles</h5>`;
  
  const leftGrid = document.createElement("div");
  leftGrid.style.display = "flex";
  leftGrid.style.flexDirection = "column";
  leftGrid.style.gap = "6px";

  cls.allowed.forEach((skillId) => {
    const skill = getSkillObj(skillId);
    const isMatch = activeSkillsList.includes(skillId);
    const isUnfav = unfavoredSkills.includes(skillId);
    const chip = document.createElement("div");
    chip.className = `skill-chip ${isMatch ? "match" : ""} ${isUnfav ? "unfav" : ""}`;
    chip.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ${skill.name}${isMatch ? " ★" : ""}${isUnfav ? " — peu adapté" : ""}`;
    leftGrid.appendChild(chip);
  });
  leftCol.appendChild(leftGrid);
  allowedContainer.appendChild(leftCol);

  // COLONNE DE DROITE : Techniques de classe & Magistrale repositionnée
  const rightCol = document.createElement("div");
  rightCol.className = "skills-column";
  rightCol.innerHTML = `<h5 style="color: #d4af37; font-size: 0.85rem; text-transform: uppercase; margin-bottom: 8px;">Techniques</h5>`;
  
  const rightGrid = document.createElement("div");
  rightGrid.style.display = "flex";
  rightGrid.style.flexDirection = "column";
  rightGrid.style.gap = "6px";

  // 1. Gestion des techniques normales de classe
  if (cls.techniques && cls.techniques.length > 0) {
    cls.techniques.forEach((tech) => {
      const techBadge = document.createElement("div");
      techBadge.className = "tooltip-badge";
      techBadge.innerHTML = `
        <img src="${tech.icon}" alt="${tech.name}" class="skill-icon" onerror="this.style.visibility='hidden'"> <span>${tech.name}</span>
        <div class="tooltip-content">${tech.desc}</div>
      `;
      rightGrid.appendChild(techBadge);
    });
  } else {
    // S'affiche si aucune technique normale n'est présente
    const emptyTech = document.createElement("span");
    emptyTech.style.cssText = "color: #777; font-size: 0.85rem; font-style: italic;";
    emptyTech.textContent = "Aucune technique spécifique";
    rightGrid.appendChild(emptyTech);
  }

  // 2. Gestion de la technique Magistrale (indépendante des techniques normales)
  if (cls.masterTech) {
    const magistraleHeader = document.createElement("h5");
    magistraleHeader.style.cssText = "color: #d4af37; font-size: 0.85rem; text-transform: uppercase; margin: 10px 0 6px 0;";
    magistraleHeader.textContent = "Magistrale";
    rightGrid.appendChild(magistraleHeader);

    const masterBadge = document.createElement("div");
    masterBadge.className = "tooltip-badge master-badge";
    masterBadge.innerHTML = `
      <img src="${cls.masterTech.icon}" alt="${cls.masterTech.name}" class="skill-icon" onerror="this.style.visibility='hidden'"> <span> ${cls.masterTech.name}</span>
      <div class="tooltip-content">${cls.masterTech.desc}</div>
    `;
    rightGrid.appendChild(masterBadge);
  }

  rightCol.appendChild(rightGrid);
  allowedContainer.appendChild(rightCol);

  // Progression des Growth Rates
  const tbody = document.getElementById("detail-growths-body");
  tbody.innerHTML = "";

  const currentGrowthsBeforePreview = getCurrentGrowths();
  const previewGrowths = getPreviewGrowths();

  Object.entries(STAT_LABELS).forEach(([statKey, label]) => {
    const currentTotalVal = currentGrowthsBeforePreview[statKey];
    const statWithPreview = previewGrowths[statKey];
    const diffFromCurrent = statWithPreview - currentTotalVal;

    let rowClass = "";
    let diffClass = "neu";
    let diffText = diffFromCurrent > 0 ? `+${diffFromCurrent}%` : `${diffFromCurrent}%`;

    if (diffFromCurrent > 0) {
      rowClass = "pos-row";
      diffClass = "pos";
    } else if (diffFromCurrent < 0) {
      rowClass = "neg-row";
      diffClass = "neg";
    }

    tbody.innerHTML += `
      <tr class="${rowClass}">
        <td><strong>${label}</strong></td>
        <td>${currentTotalVal}%</td>
        <td class="${diffClass}">${diffText}</td>
        <td><strong>${statWithPreview}%</strong></td>
      </tr>
    `;
  });

  renderClassCompare(cls, tier);

  if (isAnalysisFlipped) {
    renderAnalysisBreakdown(cls, tier);
  }
  
  //panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); //(Si jamis il ya probleme avec le gestion des statistique)
}

function initSimulator() {
  const simCharSelect = document.getElementById("sim-char-select");
  const simClassSelect = document.getElementById("sim-class-select");
  if (!simCharSelect || !simClassSelect) return;

  CHARACTERS.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.faction})`;
    simCharSelect.appendChild(opt);
  });

  CLASSES.forEach((cls) => {
    const opt = document.createElement("option");
    opt.value = cls.id;
    opt.textContent = `[${cls.tier}] ${cls.name}`;
    simClassSelect.appendChild(opt);
  });

  simCharSelect.addEventListener("change", (e) => {
    simChar = CHARACTERS.find(c => c.id === e.target.value) || null;
    if (simChar) {
      simSkills = [...(simChar.proficiencies || [])];
      simUnfavored = [...(simChar.weaknesses || [])];
      simPriorities = {};
      Object.keys(STAT_LABELS).forEach(s => { simPriorities[s] = "neutre"; });
    }
    updateSimulatorUI();
  });

  simClassSelect.addEventListener("change", (e) => {
    simClass = CLASSES.find(c => c.id === e.target.value) || null;
    updateSimulatorUI();
  });
}

function updateSimulatorUI() {
  const configArea = document.getElementById("sim-config-area");
  const resultArea = document.getElementById("sim-result-area");

  if (!simChar) {
    configArea.hidden = true;
    resultArea.hidden = true;
    return;
  }

  configArea.hidden = false;
  renderSimControls();

  if (!simClass) {
    resultArea.hidden = true;
    return;
  }

  resultArea.hidden = false;
  renderSimBreakdown();
}

function renderSimControls() {
  const skillsContainer = document.getElementById("sim-skills-list");
  skillsContainer.innerHTML = "";

  SKILLS_LIST.forEach((skill) => {
    const state = getSkillState(skill.id, simSkills, simUnfavored);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `skill-checkbox-label skill-state-${state}`;
    btn.title = "Clic : neutre → prioritaire → peu adapté → neutre";
    btn.innerHTML = `
      <span class="skill-state-mark">${state === "prio" ? "✓" : state === "unfav" ? "✕" : ""}</span>
      <span><img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ${skill.name}</span>
    `;

    btn.addEventListener("click", () => {
      const next = nextSkillState(getSkillState(skill.id, simSkills, simUnfavored));
      simSkills = simSkills.filter((id) => id !== skill.id);
      simUnfavored = simUnfavored.filter((id) => id !== skill.id);
      if (next === "prio") simSkills.push(skill.id);
      if (next === "unfav") simUnfavored.push(skill.id);
      updateSimulatorUI();
    });
    skillsContainer.appendChild(btn);
  });

  const statsContainer = document.getElementById("sim-stats-list");
  statsContainer.innerHTML = "";

  Object.entries(STAT_LABELS).forEach(([statKey, label]) => {
    const prio = simPriorities[statKey] || "neutre";
    const classBonus = simClass ? (simClass.growths[statKey] || 0) : 0;
    const bonusStr = classBonus > 0 ? `+${classBonus}%` : `${classBonus}%`;

    const pill = document.createElement("div");
    pill.className = "stat-pill";
    pill.style.cursor = "pointer";
    pill.style.padding = "8px";

    if (prio === "divine") {
      pill.style.background = "#102235";
      pill.style.border = "1px solid #00e5ff";
      pill.style.boxShadow = "0 0 8px rgba(0,229,255,0.3)";
      pill.innerHTML = `<span style="color:#00e5ff; text-shadow:0 0 5px rgba(0,229,255,0.6);">★★★ ${label}</span><strong style="color:#ffffff;">${bonusStr}</strong><small style="color:#00e5ff;">Divine</small>`;
    } else if (prio === "majeure") {
      pill.style.background = "#182a1d";
      pill.style.border = "1px solid #2ecc71";
      pill.style.boxShadow = "0 0 8px rgba(46,204,113,0.3)";
      pill.innerHTML = `<span style="color:#2ecc71;">★★ ${label}</span><strong style="color:#ffffff;">${bonusStr}</strong><small style="color:#2ecc71;">Majeure</small>`;
    } else if (prio === "prioritaire") {
      pill.style.background = "#2a2211";
      pill.style.border = "1px solid #d4af37";
      pill.style.boxShadow = "none";
      pill.innerHTML = `<span style="color:#d4af37;">★ ${label}</span><strong style="color:#d4af37;">${bonusStr}</strong><small style="color:#d4af37;">Prioritaire</small>`;
    } else if (prio === "moins-prioritaire") {
      pill.style.background = "#221818";
      pill.style.border = "1px solid #c0392b";
      pill.style.boxShadow = "none";
      pill.innerHTML = `<span style="color:#e74c3c;">🔻 ${label}</span><strong style="color:#e74c3c;">${bonusStr}</strong><small style="color:#e74c3c;">Moins</small>`;
    } else {
      pill.style.background = "";
      pill.style.border = "";
      pill.style.boxShadow = "";
      pill.innerHTML = `<span>${label}</span><strong>${bonusStr}</strong><small class="neu">Neutre</small>`;
    }

    pill.addEventListener("click", () => {
      if (simPriorities[statKey] === "neutre" || !simPriorities[statKey]) simPriorities[statKey] = "divine";
      else if (simPriorities[statKey] === "divine") simPriorities[statKey] = "majeure";
      else if (simPriorities[statKey] === "majeure") simPriorities[statKey] = "prioritaire";
      else if (simPriorities[statKey] === "prioritaire") simPriorities[statKey] = "moins-prioritaire";
      else simPriorities[statKey] = "neutre";
      updateSimulatorUI();
    });

    statsContainer.appendChild(pill);
  });
}

// ==========================================
// GESTION DE L'ONGLET RECRUTEMENT
// ==========================================
let selectedLordRoute = "cai";
let recruitedRosters = {
  cai: [],
  leda: [],
  dietrich: [],
  theodora: []
};

// Équipes enregistrées par Héros (conservées dans le navigateur)
const SAVED_TEAMS_KEY = "fefw_saved_teams";
let savedTeams = loadSavedTeams();

const LORD_COLOR_CLASS = {
  cai: "lord-tag-blue",
  leda: "lord-tag-red",
  dietrich: "lord-tag-purple",
  theodora: "lord-tag-yellow"
};

function loadSavedTeams() {
  try {
    const raw = localStorage.getItem(SAVED_TEAMS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

function persistSavedTeams() {
  try {
    localStorage.setItem(SAVED_TEAMS_KEY, JSON.stringify(savedTeams));
    return true;
  } catch (e) {
    return false;
  }
}

function getLordName(lordId) {
  const charObj = CHARACTERS.find((c) => c.id === lordId);
  return charObj ? charObj.name : lordId;
}

// Équipe complète enregistrée d'un Héros : personnages fixes + recrues enregistrées
function getSavedTeamMembers(lordId) {
  if (!savedTeams[lordId]) return [];
  const fixed = (typeof FIXED_ROSTER_DATA !== "undefined" && FIXED_ROSTER_DATA[lordId]) || [];
  return [...fixed, ...savedTeams[lordId]];
}

// Liste des autres Héros dont l'équipe enregistrée contient déjà ce personnage
function getOtherTeamsContaining(charName, currentLordId) {
  const target = charName.toLowerCase();
  return Object.keys(savedTeams).filter(
    (lordId) =>
      lordId !== currentLordId &&
      getSavedTeamMembers(lordId).some((name) => name.toLowerCase() === target)
  );
}

function isCurrentTeamSaved(lordId) {
  const saved = savedTeams[lordId];
  const current = recruitedRosters[lordId] || [];
  if (!saved) return current.length === 0;
  return saved.length === current.length && saved.every((name) => current.includes(name));
}

function saveCurrentTeam() {
  const current = recruitedRosters[selectedLordRoute] || [];
  if (current.length === 0) {
    delete savedTeams[selectedLordRoute];
  } else {
    savedTeams[selectedLordRoute] = [...current];
  }
  const ok = persistSavedTeams();
  updateSaveTeamStatus(ok ? null : "⚠️ Impossible d'enregistrer dans ce navigateur");
  refreshLordSavedMarkers();
}

function updateSaveTeamStatus(errorMessage) {
  const status = document.getElementById("save-team-status");
  if (!status) return;
  status.classList.remove("status-saved", "status-unsaved", "status-error");

  if (errorMessage) {
    status.textContent = errorMessage;
    status.classList.add("status-error");
  } else if (savedTeams[selectedLordRoute] && isCurrentTeamSaved(selectedLordRoute)) {
    status.textContent = "✓ Équipe enregistrée";
    status.classList.add("status-saved");
  } else if (!isCurrentTeamSaved(selectedLordRoute)) {
    status.textContent = "Modifications non enregistrées";
    status.classList.add("status-unsaved");
  } else {
    status.textContent = "";
  }
}

function refreshLordSavedMarkers() {
  document.querySelectorAll(".lord-circle-item").forEach((el) => {
    el.classList.toggle("has-saved-team", Boolean(savedTeams[el.dataset.lordId]));
  });
}

// Personnages à ne jamais afficher dans la section « Non recrutables »
const NON_RECRUITABLE_EXCLUDED = ["eshmel", "hong hua", "troy"];

const RENOWN_LABELS = {
  3: "Renom 3 — Recrutement très précoce",
  4: "Renom 4 — Recrutement précoce",
  5: "Renom 5 — Début de partie",
  6: "Renom 6 — Milieu de partie",
  7: "Renom 7 — Milieu à fin de partie",
  8: "Renom 8 — Recrutement tardif",
  9: "Renom 9 — Recrutement très tardif",
  10: "Renom 10 — Recrutement ultime"
};

function initRecruitmentTab() {
  const lordsRow = document.getElementById("recruitment-lords-row");
  if (!lordsRow) return;

  const lordsConfig = [
    { id: "cai", colorClass: "lord-blue" },
    { id: "leda", colorClass: "lord-red" },
    { id: "dietrich", colorClass: "lord-purple" },
    { id: "theodora", colorClass: "lord-yellow" }
  ];

  lordsRow.innerHTML = "";

  // Recharge les équipes enregistrées comme sélection de départ
  Object.keys(savedTeams).forEach((lordId) => {
    if (Array.isArray(savedTeams[lordId]) && lordId in recruitedRosters) {
      recruitedRosters[lordId] = [...savedTeams[lordId]];
    } else {
      delete savedTeams[lordId];
    }
  });

  lordsConfig.forEach((lordCfg) => {
    const charObj = CHARACTERS.find((c) => c.id === lordCfg.id);
    if (!charObj) return;

    const item = document.createElement("div");
    item.className = `lord-circle-item ${lordCfg.colorClass} ${selectedLordRoute === lordCfg.id ? "active" : ""}`;
    item.dataset.lordId = lordCfg.id;

    item.innerHTML = `
      <img src="${charObj.portrait}" alt="${charObj.name}" class="lord-avatar-circle">
      <span class="lord-circle-name">${charObj.name}</span>
      <span class="lord-saved-marker" title="Équipe enregistrée">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
    `;

    item.addEventListener("click", () => {
      selectedLordRoute = lordCfg.id;
      document.querySelectorAll(".lord-circle-item").forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
      renderSelectedRoster();
      renderRecruitmentList(selectedLordRoute);
    });

    lordsRow.appendChild(item);
  });

  const clearBtn = document.getElementById("clear-recruitment-selection");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      recruitedRosters[selectedLordRoute] = [];
      renderSelectedRoster();
      renderRecruitmentList(selectedLordRoute);
    });
  }

  const saveBtn = document.getElementById("save-team-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveCurrentTeam();
      renderRecruitmentList(selectedLordRoute);
    });
  }

  const searchInput = document.getElementById("recruitment-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderRecruitmentList(selectedLordRoute);
    });
  }

  refreshLordSavedMarkers();
  renderSelectedRoster();
  renderRecruitmentList(selectedLordRoute);
}

// Normalise un texte pour la recherche (minuscules, sans accents)
function normalizeSearchText(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function toggleRecruitSelection(charName) {
  const currentRoster = recruitedRosters[selectedLordRoute];
  if (currentRoster.includes(charName)) {
    recruitedRosters[selectedLordRoute] = currentRoster.filter((name) => name !== charName);
  } else {
    currentRoster.push(charName);
  }
  renderSelectedRoster();
  renderRecruitmentList(selectedLordRoute);
}

function renderSelectedRoster() {
  const container = document.getElementById("recruitment-selected-list");
  const countSpan = document.getElementById("selected-roster-count");
  const clearBtn = document.getElementById("clear-recruitment-selection");
  if (!container) return;

  const fixedMembers = (typeof FIXED_ROSTER_DATA !== "undefined" && FIXED_ROSTER_DATA[selectedLordRoute]) || [];
  const currentRoster = recruitedRosters[selectedLordRoute] || [];
  const totalCount = fixedMembers.length + currentRoster.length;

  if (countSpan) countSpan.textContent = totalCount;
  if (clearBtn) clearBtn.hidden = currentRoster.length === 0;
  updateSaveTeamStatus();

  container.innerHTML = "";

  const lordColorMap = {
    cai: "roster-blue",
    leda: "roster-red",
    dietrich: "roster-purple",
    theodora: "roster-yellow"
  };
  const colorClass = lordColorMap[selectedLordRoute] || "";

  // 1. Affichage des personnages fixes du Héros (non retirables)
  fixedMembers.forEach((charName) => {
    const charData = CHARACTERS.find(
      (c) => c.name.toLowerCase() === charName.toLowerCase()
    );
    const portraitSrc = charData ? charData.portrait : "images/default.png";

    const item = document.createElement("div");
    item.className = `selected-roster-portrait-only fixed-member ${colorClass}`;
    item.title = `${charName} (Personnage fixe)`;
    item.innerHTML = `<img src="${portraitSrc}" alt="${charName}">`;

    container.appendChild(item);
  });

  // 2. Affichage des personnages recrutés sélectionnés (retirables au clic)
  currentRoster.forEach((charName) => {
    const charData = CHARACTERS.find(
      (c) => c.name.toLowerCase() === charName.toLowerCase()
    );
    const portraitSrc = charData ? charData.portrait : "images/default.png";

    const item = document.createElement("div");
    item.className = `selected-roster-portrait-only ${colorClass}`;
    item.title = `${charName} (Cliquer pour retirer)`;
    item.innerHTML = `<img src="${portraitSrc}" alt="${charName}">`;

    item.addEventListener("click", () => {
      toggleRecruitSelection(charName);
    });

    container.appendChild(item);
  });
}

function renderRecruitmentList(lordId) {
  const container = document.getElementById("recruitment-list-container");
  if (!container || typeof RECRUITMENT_DATA === "undefined") return;

  const searchInput = document.getElementById("recruitment-search");
  const query = searchInput ? normalizeSearchText(searchInput.value) : "";

  const fullList = RECRUITMENT_DATA[lordId] || [];
  const list = query
    ? fullList.filter((entry) => normalizeSearchText(entry.name).includes(query))
    : fullList;
  const currentRoster = recruitedRosters[lordId] || [];
  container.innerHTML = "";

  // Personnages de la liste complète qui ne sont pas recrutables sur cette route
  // (hors Héros actuel et hors personnages fixes de son équipe de départ)
  const recruitableNames = new Set(fullList.map((entry) => entry.name.toLowerCase()));
  const fixedNames = new Set(
    ((typeof FIXED_ROSTER_DATA !== "undefined" && FIXED_ROSTER_DATA[lordId]) || []).map((n) => n.toLowerCase())
  );
  const nonRecruitable = CHARACTERS.filter(
    (c) =>
      c.id !== lordId &&
      !NON_RECRUITABLE_EXCLUDED.includes(c.name.toLowerCase()) &&
      !recruitableNames.has(c.name.toLowerCase()) &&
      !fixedNames.has(c.name.toLowerCase()) &&
      (!query || normalizeSearchText(c.name).includes(query))
  ).sort((a, b) => a.name.localeCompare(b.name, "fr"));

  if (query && list.length === 0 && nonRecruitable.length === 0) {
    container.innerHTML = `<p class="recruitment-no-result">Aucun personnage ne correspond à « ${searchInput.value.replace(/[<>&"]/g, "")} » sur cette route.</p>`;
    return;
  }

  const groupedByRenown = {};
  list.forEach((entry) => {
    if (!groupedByRenown[entry.renown]) {
      groupedByRenown[entry.renown] = [];
    }
    groupedByRenown[entry.renown].push(entry);
  });

  const sortedRenowns = Object.keys(groupedByRenown)
    .map(Number)
    .sort((a, b) => a - b);

  sortedRenowns.forEach((renownLevel) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "renown-group";

    const charsInGroup = groupedByRenown[renownLevel];

    groupDiv.innerHTML = `
      <div class="renown-group-header">
        <h4 class="renown-group-title">⭐ ${RENOWN_LABELS[renownLevel] || "Renom " + renownLevel}</h4>
        <span style="color: #aaa; font-size: 0.85rem;">${charsInGroup.length} personnage${charsInGroup.length > 1 ? "s" : ""}</span>
      </div>
      <div class="renown-chars-grid"></div>
    `;

    const grid = groupDiv.querySelector(".renown-chars-grid");

    charsInGroup.forEach((entry) => {
      const charData = CHARACTERS.find(
        (c) => c.name.toLowerCase() === entry.name.toLowerCase()
      );
      const portraitSrc = charData ? charData.portrait : "images/default.png";
      const isSelected = currentRoster.includes(entry.name);

      let badgeClass = "badge-auto";
      let conditionText = "Automatique";

      if (entry.support === "S1") {
        badgeClass = "badge-s1";
        conditionText = "Soutien S1";
      } else if (entry.support === "S2") {
        badgeClass = "badge-s2";
        conditionText = "Soutien S2";
      } else if (entry.support === "S3") {
        badgeClass = "badge-s3";
        conditionText = "Soutien S3";
      }

      // Héros dont l'équipe enregistrée contient déjà ce personnage
      const otherTeams = getOtherTeamsContaining(entry.name, lordId);
      const otherTeamsHtml = otherTeams
        .map(
          (otherLordId) =>
            `<span class="other-team-tag ${LORD_COLOR_CLASS[otherLordId] || ""}">Équipe de ${getLordName(otherLordId)}</span>`
        )
        .join("");

      const card = document.createElement("div");
      card.className = `recruit-card ${isSelected ? "in-roster" : ""} ${otherTeams.length ? "in-other-team" : ""}`;
      if (otherTeams.length) {
        card.title = `Déjà dans l'équipe de ${otherTeams.map(getLordName).join(", ")}`;
      }
      card.innerHTML = `
        <img src="${portraitSrc}" alt="${entry.name}" class="recruit-card-portrait">
        <div class="recruit-card-info">
          <span class="recruit-card-name">${entry.name} ${isSelected ? "✓" : ""}</span>
          <span class="rec-badge ${badgeClass}">${conditionText}</span>
          ${otherTeamsHtml ? `<div class="other-team-tags">${otherTeamsHtml}</div>` : ""}
        </div>
      `;

      card.appendChild(createSheetButton(charData));

      card.addEventListener("click", () => {
        toggleRecruitSelection(entry.name);
      });

      grid.appendChild(card);
    });

    container.appendChild(groupDiv);
  });

  // Section finale : personnages non recrutables sur cette route
  if (nonRecruitable.length > 0) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "renown-group non-recruitable-group";
    groupDiv.innerHTML = `
      <div class="renown-group-header">
        <h4 class="renown-group-title">🚫 Non recrutables sur cette route</h4>
        <span style="color: #aaa; font-size: 0.85rem;">${nonRecruitable.length} personnage${nonRecruitable.length > 1 ? "s" : ""}</span>
      </div>
      <div class="renown-chars-grid"></div>
    `;

    const grid = groupDiv.querySelector(".renown-chars-grid");

    nonRecruitable.forEach((charData) => {
      const card = document.createElement("div");
      card.className = "recruit-card non-recruitable";
      card.title = `${charData.name} ne peut pas être recruté sur la route de ${getLordName(lordId)} — cliquer pour voir sa fiche`;
      card.innerHTML = `
        <img src="${charData.portrait || "images/default.png"}" alt="${charData.name}" class="recruit-card-portrait">
        <div class="recruit-card-info">
          <span class="recruit-card-name">${charData.name}</span>
          <span class="rec-badge badge-unavailable">Non recrutable</span>
        </div>
      `;
      card.appendChild(createSheetButton(charData));
      card.addEventListener("click", () => openCharacterSheet(charData.id));
      grid.appendChild(card);
    });

    container.appendChild(groupDiv);
  }
}


// ==========================================
// FICHE PERSONNAGE (fenêtre)
// ==========================================
const FACTION_CSS_MAP = {
  "Ribeira Winds (Lord)": "faction-ribeira-winds",
  "Ribeira Winds": "faction-ribeira-winds",
  "House Lamine (Lord)": "faction-house-lamine",
  "House Lamine": "faction-house-lamine",
  "Megaira's Beacon (Lord)": "faction-megairas-beacon",
  "Megaira's Beacon": "faction-megairas-beacon",
  "Rose Tempest (Lord)": "faction-rose-tempest",
  "Rose Tempest": "faction-rose-tempest",
  "Armée du Sauveur (Auto)": "faction-arme-du-sauveur",
  "Fiery Mane": "faction-fiery-mane",
  "Linaria Dewdrops": "faction-linaria-dewdrops",
  "Tale of the Moon": "faction-tale-of-the-moon",
  "Bridal Party": "faction-bridal-party"
};

const ROUTE_LORDS = ["cai", "leda", "dietrich", "theodora"];

// Valeur maximale de chaque stat parmi tous les personnages (pour les barres et le radar)
function getStatMaxima(mode) {
  const maxima = {};
  Object.keys(STAT_LABELS).forEach((k) => {
    maxima[k] = Math.max(1, ...CHARACTERS.map((c) => (c[mode] && c[mode][k]) || 0));
  });
  return maxima;
}

function createSheetButton(charData) {
  if (!charData) return document.createTextNode("");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sheet-open-btn";
  btn.title = `Voir la fiche de ${charData.name}`;
  btn.setAttribute("aria-label", btn.title);
  btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle class="dot" cx="12" cy="7.6" r="1.2"/></svg>`;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    openCharacterSheet(charData.id);
  });
  return btn;
}

// Statut d'un personnage sur la route de chaque Héros
function getRouteStatus(charObj, lordId) {
  const nameLc = charObj.name.toLowerCase();
  if (charObj.id === lordId) return { cls: "route-lord", text: "Héros de cette route" };
  const fixed = ((typeof FIXED_ROSTER_DATA !== "undefined" && FIXED_ROSTER_DATA[lordId]) || []).map((n) => n.toLowerCase());
  if (fixed.includes(nameLc)) return { cls: "route-fixed", text: "Dans l'équipe de départ" };
  const entry = ((typeof RECRUITMENT_DATA !== "undefined" && RECRUITMENT_DATA[lordId]) || []).find(
    (e) => e.name.toLowerCase() === nameLc
  );
  if (entry) {
    const how = entry.support && entry.support !== "Auto" ? `Soutien ${entry.support}` : "Automatique";
    return { cls: "route-ok", text: `Renom ${entry.renown} · ${how}` };
  }
  return { cls: "route-no", text: "Non recrutable" };
}

function renderStatBars(charObj, mode, suffix) {
  const maxima = getStatMaxima(mode);
  return Object.entries(STAT_LABELS)
    .map(([key, label]) => {
      const val = (charObj[mode] && charObj[mode][key]) || 0;
      const pct = Math.round((val / maxima[key]) * 100);
      return `
        <div class="sheet-stat-row">
          <span class="sheet-stat-label">${label}</span>
          <div class="sheet-stat-bar"><div class="sheet-stat-fill ${mode === "growths" ? "fill-growth" : ""}" style="width:${pct}%"></div></div>
          <span class="sheet-stat-value">${val}${suffix}</span>
        </div>`;
    })
    .join("");
}

// Compétences personnelles d'un personnage (PERSONAL_SKILLS dans data.js)
function getWhenCss(when) {
  if (when === "Base") return "when-base";
  if (when === "Overblaze") return "when-over";
  if (/\?/.test(when)) return "when-unk";
  return "when-niv";
}

function renderPersonalSkills(charId) {
  const list = (typeof PERSONAL_SKILLS !== "undefined" && PERSONAL_SKILLS[charId]) || [];
  if (!list.length) return "";
  const rows = list
    .map(
      (sk) => `
        <div class="personal-skill">
          <img src="${sk.icon}" alt="" class="personal-skill-icon" loading="lazy" onerror="this.style.visibility='hidden'">
          <span class="personal-skill-when ${getWhenCss(sk.when)}">${sk.when}</span>
          <div class="personal-skill-text">
            <span class="personal-skill-name">${sk.name}</span>
            <span class="personal-skill-desc">${sk.desc}</span>
          </div>
        </div>`
    )
    .join("");
  return `
    <div class="sheet-block">
      <h4>Compétences personnelles</h4>
      <div class="personal-skills-list">${rows}</div>
    </div>`;
}

function openCharacterSheet(charId) {
  const charObj = CHARACTERS.find((c) => c.id === charId);
  const modal = document.getElementById("char-sheet-modal");
  const content = document.getElementById("char-sheet-content");
  if (!charObj || !modal || !content) return;

  const factionBanner =
    typeof FACTIONS_DATA !== "undefined" && FACTIONS_DATA[charObj.faction] ? FACTIONS_DATA[charObj.faction].icon : "";
  const factionCss = FACTION_CSS_MAP[charObj.faction] || "";

  const profsHtml = (charObj.proficiencies || [])
    .map((pId) => {
      const skill = getSkillObj(pId);
      return `<span class="sheet-prof">${skill.icon ? `<img src="${skill.icon}" alt="" class="skill-icon">` : ""}${skill.name}</span>`;
    })
    .join("");

  const weakHtml = (charObj.weaknesses || [])
    .map((pId) => {
      const skill = getSkillObj(pId);
      return `<span class="sheet-prof weak">${skill.icon ? `<img src="${skill.icon}" alt="" class="skill-icon">` : ""}${skill.name}</span>`;
    })
    .join("");

  const baseTotal = Object.keys(STAT_LABELS).reduce((sum, k) => sum + ((charObj.baseStats || {})[k] || 0), 0);
  const growthTotal = Object.keys(STAT_LABELS).reduce((sum, k) => sum + ((charObj.growths || {})[k] || 0), 0);

  const routesHtml = ROUTE_LORDS.map((lordId) => {
    const status = getRouteStatus(charObj, lordId);
    return `
      <div class="sheet-route ${status.cls}">
        <span class="sheet-route-lord ${LORD_COLOR_CLASS[lordId] || ""}">${getLordName(lordId)}</span>
        <span class="sheet-route-status">${status.text}</span>
      </div>`;
  }).join("");

  content.innerHTML = `
    <div class="sheet-header">
      ${factionBanner ? `<img src="${factionBanner}" alt="" class="sheet-faction-watermark">` : ""}
      <img src="${charObj.portrait || "images/default.png"}" alt="${charObj.name}" class="sheet-portrait">
      <div class="sheet-identity">
        <h2 id="char-sheet-name">${charObj.name}</h2>
        <button type="button" class="badge-faction sheet-faction-link ${factionCss}" title="Voir la faction">${charObj.faction}</button>
        <div class="sheet-profs">${profsHtml}</div>
        ${weakHtml ? `<div class="sheet-profs sheet-weak"><span class="sheet-weak-label">Peu adapté :</span>${weakHtml}</div>` : ""}
      </div>
    </div>

    <div class="sheet-columns">
      <div class="sheet-block">
        <h4>Stats de base <span class="sheet-total">Total ${baseTotal}</span></h4>
        ${renderStatBars(charObj, "baseStats", "")}
      </div>
      <div class="sheet-block">
        <h4>Croissances <span class="sheet-total">Total ${growthTotal}%</span></h4>
        ${renderStatBars(charObj, "growths", "%")}
      </div>
    </div>

    ${renderPersonalSkills(charObj.id)}

    ${renderCharacterBuilds(charObj.id)}

    <div class="sheet-block">
      <h4>Recrutement par route</h4>
      <div class="sheet-routes">${routesHtml}</div>
    </div>

    <div class="sheet-actions">
      <button type="button" class="sheet-compare-btn" id="sheet-edit-btn">✏️ Modifier les maîtrises</button>
      <button type="button" class="sheet-compare-btn" id="sheet-compare-btn">⚖️ Comparer ce personnage</button>
    </div>
  `;

  content.querySelector(".sheet-faction-link").addEventListener("click", () => {
    closeCharacterSheet();
    openFactionPage(getFactionKey(charObj.faction));
  });

  content.querySelectorAll(".build-delete-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      deleteBuild(btn.dataset.buildId);
      openCharacterSheet(charObj.id);
    })
  );

  content.querySelector("#sheet-edit-btn").addEventListener("click", () => {
    closeCharacterSheet();
    openCharacterEditor(charObj.id, true);
  });

  content.querySelector("#sheet-compare-btn").addEventListener("click", () => {
    closeCharacterSheet();
    openComparatorWith(charObj.id);
  });

  modal.hidden = false;
  document.body.classList.add("sheet-open");
}

function closeCharacterSheet() {
  const modal = document.getElementById("char-sheet-modal");
  if (modal) modal.hidden = true;
  document.body.classList.remove("sheet-open");
}

function initCharacterSheet() {
  const modal = document.getElementById("char-sheet-modal");
  if (!modal) return;
  document.getElementById("char-sheet-close").addEventListener("click", closeCharacterSheet);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeCharacterSheet();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeCharacterSheet();
  });
}

// ==========================================
// COMPARATEUR DE PERSONNAGES
// ==========================================
let compareMode = "baseStats";

function initComparator() {
  const selA = document.getElementById("compare-select-a");
  const selB = document.getElementById("compare-select-b");
  if (!selA || !selB) return;

  const sorted = [...CHARACTERS].sort((a, b) => a.name.localeCompare(b.name, "fr"));
  const optionsHtml = sorted.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");
  selA.innerHTML = optionsHtml;
  selB.innerHTML = optionsHtml;
  selA.value = sorted[0].id;
  selB.value = (sorted[1] || sorted[0]).id;

  selA.addEventListener("change", renderComparator);
  selB.addEventListener("change", renderComparator);

  document.getElementById("compare-swap-btn").addEventListener("click", () => {
    const tmp = selA.value;
    selA.value = selB.value;
    selB.value = tmp;
    renderComparator();
  });

  document.querySelectorAll(".compare-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      compareMode = btn.dataset.mode;
      document.querySelectorAll(".compare-mode-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderComparator();
    });
  });

  renderComparator();
}

function openComparatorWith(charId) {
  const selA = document.getElementById("compare-select-a");
  const selB = document.getElementById("compare-select-b");
  if (!selA || !selB) return;
  if (selB.value === charId) selB.value = selA.value;
  selA.value = charId;
  renderComparator();
  if (typeof window.showTab === "function") window.showTab("tab-compare-btn");
  const panel = document.getElementById("compare-panel");
  if (panel) panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCompareCard(containerId, charObj, sideClass) {
  const el = document.getElementById(containerId);
  if (!el || !charObj) return;
  const profs = (charObj.proficiencies || [])
    .map((pId) => {
      const skill = getSkillObj(pId);
      return skill.icon ? `<img src="${skill.icon}" alt="${skill.name}" title="${skill.name}" class="skill-icon">` : "";
    })
    .join("");
  el.innerHTML = `
    <img src="${charObj.portrait || "images/default.png"}" alt="${charObj.name}" class="compare-portrait ${sideClass}">
    <div class="compare-card-info">
      <span class="compare-card-name">${charObj.name}</span>
      <span class="compare-card-faction">${charObj.faction}</span>
      <div class="compare-card-profs">${profs}</div>
      <button type="button" class="compare-card-sheet">Voir la fiche</button>
    </div>
  `;
  el.querySelector(".compare-card-sheet").addEventListener("click", () => openCharacterSheet(charObj.id));
}

function buildRadarSvg(charA, charB, mode) {
  const keys = Object.keys(STAT_LABELS);
  const maxima = getStatMaxima(mode);
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 140;
  const angleFor = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / keys.length;
  const point = (i, ratio) => {
    const a = angleFor(i);
    return [cx + Math.cos(a) * radius * ratio, cy + Math.sin(a) * radius * ratio];
  };

  let svg = `<svg viewBox="-60 -10 ${size + 120} ${size + 20}" class="radar-svg" role="img" aria-label="Graphique radar">`;

  // Grille (4 niveaux)
  [0.25, 0.5, 0.75, 1].forEach((lvl) => {
    const pts = keys.map((_, i) => point(i, lvl).join(",")).join(" ");
    svg += `<polygon points="${pts}" class="radar-grid" />`;
  });

  // Axes + libellés
  keys.forEach((k, i) => {
    const [x, y] = point(i, 1);
    svg += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="radar-axis" />`;
    const [lx, ly] = point(i, 1.2);
    const anchor = Math.abs(lx - cx) < 10 ? "middle" : lx > cx ? "start" : "end";
    svg += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" class="radar-label">${STAT_LABELS[k]}</text>`;
  });

  const shape = (charObj, cls) => {
    const pts = keys
      .map((k, i) => point(i, Math.min(1, ((charObj[mode] || {})[k] || 0) / maxima[k])).join(","))
      .join(" ");
    let out = `<polygon points="${pts}" class="radar-shape ${cls}" />`;
    keys.forEach((k, i) => {
      const [x, y] = point(i, Math.min(1, ((charObj[mode] || {})[k] || 0) / maxima[k]));
      out += `<circle cx="${x}" cy="${y}" r="3.5" class="radar-dot ${cls}" />`;
    });
    return out;
  };

  svg += shape(charA, "shape-a");
  svg += shape(charB, "shape-b");
  svg += `</svg>`;
  return svg;
}

function renderComparator() {
  const selA = document.getElementById("compare-select-a");
  const selB = document.getElementById("compare-select-b");
  if (!selA || !selB) return;
  const charA = CHARACTERS.find((c) => c.id === selA.value);
  const charB = CHARACTERS.find((c) => c.id === selB.value);
  if (!charA || !charB) return;

  renderCompareCard("compare-card-a", charA, "side-a");
  renderCompareCard("compare-card-b", charB, "side-b");

  const radar = document.getElementById("compare-radar");
  if (radar) {
    radar.innerHTML = `
      ${buildRadarSvg(charA, charB, compareMode)}
      <div class="radar-legend">
        <span class="legend-a">● ${charA.name}</span>
        <span class="legend-b">● ${charB.name}</span>
      </div>`;
  }

  const suffix = compareMode === "growths" ? "%" : "";
  let totalA = 0;
  let totalB = 0;
  const rows = Object.entries(STAT_LABELS)
    .map(([key, label]) => {
      const a = (charA[compareMode] || {})[key] || 0;
      const b = (charB[compareMode] || {})[key] || 0;
      totalA += a;
      totalB += b;
      const diff = a - b;
      const diffHtml = diff === 0 ? `<span class="diff-even">=</span>` : `<span class="${diff > 0 ? "diff-a" : "diff-b"}">${diff > 0 ? "+" : ""}${diff}${suffix}</span>`;
      return `
        <tr>
          <td class="${a > b ? "win-a" : ""}">${a}${suffix}</td>
          <th>${label}</th>
          <td class="${b > a ? "win-b" : ""}">${b}${suffix}</td>
          <td class="diff-cell">${diffHtml}</td>
        </tr>`;
    })
    .join("");

  const totalDiff = totalA - totalB;
  const table = document.getElementById("compare-table");
  if (table) {
    table.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th class="head-a">${charA.name}</th>
            <th></th>
            <th class="head-b">${charB.name}</th>
            <th class="diff-cell">Écart</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
        <tfoot>
          <tr>
            <td class="${totalA > totalB ? "win-a" : ""}">${totalA}${suffix}</td>
            <th>Total</th>
            <td class="${totalB > totalA ? "win-b" : ""}">${totalB}${suffix}</td>
            <td class="diff-cell">${totalDiff === 0 ? `<span class="diff-even">=</span>` : `<span class="${totalDiff > 0 ? "diff-a" : "diff-b"}">${totalDiff > 0 ? "+" : ""}${totalDiff}${suffix}</span>`}</td>
          </tr>
        </tfoot>
      </table>
      <p class="compare-note">L'écart est calculé du point de vue de ${charA.name}. Sur le radar, chaque axe est mis à l'échelle du meilleur personnage du jeu pour cette stat.</p>`;
  }
}

// ==========================================
// PAGES DE FACTION
// ==========================================
const FACTION_ORDER = [
  "Ribeira Winds",
  "House Lamine",
  "Megaira's Beacon",
  "Rose Tempest",
  "Bridal Party",
  "Fiery Mane",
  "Linaria Dewdrops",
  "Tale of the Moon",
  "Jeux Héroïques",
  "Armée du Sauveur (Auto)"
];

let selectedFaction = null;

// Héros des factions sans « (Lord) » dans data.js
const EXTRA_FACTION_HEROES = ["anatolia", "bertrand", "orchel", "talimun"];

function isFactionHero(c) {
  return /\(Lord\)/.test(c.faction) || EXTRA_FACTION_HEROES.includes(c.id);
}

// « Ribeira Winds (Lord) » et « Ribeira Winds » forment la même faction
function getFactionKey(faction) {
  return String(faction || "").replace(/\s*\(Lord\)\s*$/, "").trim();
}

function getFactionDisplayName(key) {
  return key.replace(/\s*\(Auto\)\s*$/, "");
}

function getFactionBanner(key) {
  if (typeof FACTIONS_DATA === "undefined") return "";
  const entry = FACTIONS_DATA[key] || FACTIONS_DATA[`${key} (Lord)`];
  return entry && entry.icon ? entry.icon : "";
}

function getFactionGroups() {
  const groups = {};
  CHARACTERS.forEach((c) => {
    const key = getFactionKey(c.faction);
    if (!groups[key]) groups[key] = [];
    groups[key].push(c);
  });
  const keys = Object.keys(groups).sort((a, b) => {
    const ia = FACTION_ORDER.indexOf(a);
    const ib = FACTION_ORDER.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib) || a.localeCompare(b, "fr");
  });
  return keys.map((key) => ({
    key,
    members: groups[key].sort((a, b) => {
      const la = isFactionHero(a) ? 0 : 1;
      const lb = isFactionHero(b) ? 0 : 1;
      return la - lb || a.name.localeCompare(b.name, "fr");
    })
  }));
}

function factionEmblemHtml(key, cls) {
  const banner = getFactionBanner(key);
  return banner
    ? `<img src="${banner}" alt="" class="${cls}">`
    : `<span class="${cls} faction-emblem-fallback">${getFactionDisplayName(key).charAt(0)}</span>`;
}

function initFactionsTab() {
  const grid = document.getElementById("factions-grid");
  if (!grid) return;
  const groups = getFactionGroups();
  if (!groups.length) return;

  grid.innerHTML = "";
  groups.forEach(({ key, members }) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "faction-tile";
    tile.dataset.faction = key;
    tile.innerHTML = `
      ${factionEmblemHtml(key, "faction-tile-banner")}
      <span class="faction-tile-name">${getFactionDisplayName(key)}</span>
      <span class="faction-tile-count">${members.length} membre${members.length > 1 ? "s" : ""}</span>
    `;
    tile.addEventListener("click", () => selectFaction(key, true));
    grid.appendChild(tile);
  });

  selectFaction(groups[0].key, false);
}

function selectFaction(key, scroll) {
  const group = getFactionGroups().find((g) => g.key === key);
  const detail = document.getElementById("faction-detail");
  if (!group || !detail) return;
  selectedFaction = key;

  document.querySelectorAll(".faction-tile").forEach((t) => t.classList.toggle("active", t.dataset.faction === key));

  const factionCss = FACTION_CSS_MAP[key] || FACTION_CSS_MAP[`${key} (Lord)`] || "";

  detail.innerHTML = `
    <div class="faction-detail-header">
      ${factionEmblemHtml(key, "faction-detail-banner")}
      <div>
        <h3 class="faction-detail-title">${getFactionDisplayName(key)}</h3>
        <span class="badge-faction ${factionCss}">${group.members.length} membre${group.members.length > 1 ? "s" : ""}</span>
      </div>
    </div>
    <div class="faction-members-grid"></div>
  `;

  const membersGrid = detail.querySelector(".faction-members-grid");
  group.members.forEach((c) => {
    const isLord = isFactionHero(c);
    const profs = (c.proficiencies || [])
      .map((pId) => {
        const skill = getSkillObj(pId);
        return skill.icon ? `<img src="${skill.icon}" alt="${skill.name}" title="${skill.name}" class="skill-icon">` : "";
      })
      .join("");

    const card = document.createElement("button");
    card.type = "button";
    card.className = `faction-member-card ${isLord ? "is-lord" : ""}`;
    card.title = `Voir la fiche de ${c.name}`;
    card.innerHTML = `
      <div class="faction-member-portrait-wrap">
        <img src="${c.portrait || "images/default.png"}" alt="${c.name}" class="faction-member-portrait" loading="lazy">
        ${isLord ? `<span class="faction-lord-tag">Héros</span>` : ""}
      </div>
      <span class="faction-member-name">${c.name}</span>
      <div class="faction-member-profs">${profs}</div>
    `;
    card.addEventListener("click", () => openCharacterSheet(c.id));

    const wrap = document.createElement("div");
    wrap.className = "faction-member-wrap";
    wrap.appendChild(card);

    if (isCharacterEdited(c.id)) {
      const tag = document.createElement("span");
      tag.className = "member-edited-tag";
      tag.textContent = "Modifié";
      wrap.appendChild(tag);
    }

    membersGrid.appendChild(wrap);
  });

  if (scroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openFactionPage(key) {
  if (typeof window.showTab === "function") window.showTab("tab-factions-btn");
  selectFaction(key, true);
}


// ==========================================
// ÉDITION DES MAÎTRISES & COMPÉTENCES D'UN PERSONNAGE
// (enregistrées dans ce navigateur, appliquées à tout le site)
// ==========================================
const CHAR_OVERRIDES_KEY = "fefw_char_overrides";
const DEFAULT_CHAR_SKILLS = {};
let editorCharId = null;
let editorProfs = [];
let editorWeak = [];

function loadCharOverrides() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CHAR_OVERRIDES_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) {
    return {};
  }
}

function saveCharOverrides(overrides) {
  try {
    localStorage.setItem(CHAR_OVERRIDES_KEY, JSON.stringify(overrides));
    return true;
  } catch (e) {
    return false;
  }
}

// Garde les valeurs de data.js, puis applique les modifications enregistrées
function applyCharacterOverrides() {
  const overrides = loadCharOverrides();
  CHARACTERS.forEach((c) => {
    if (!DEFAULT_CHAR_SKILLS[c.id]) {
      DEFAULT_CHAR_SKILLS[c.id] = {
        proficiencies: [...(c.proficiencies || [])],
        weaknesses: [...(c.weaknesses || [])]
      };
    }
    const o = overrides[c.id];
    const d = DEFAULT_CHAR_SKILLS[c.id];
    c.proficiencies = o && Array.isArray(o.proficiencies) ? [...o.proficiencies] : [...d.proficiencies];
    c.weaknesses = o && Array.isArray(o.weaknesses) ? [...o.weaknesses] : [...d.weaknesses];
  });
}

function isCharacterEdited(charId) {
  return Boolean(loadCharOverrides()[charId]);
}

function sortSkillIds(ids) {
  const order = SKILLS_LIST.map((sk) => sk.id);
  return [...ids].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

function initCharacterEditor() {
  const modal = document.getElementById("char-edit-modal");
  if (!modal) return;
  document.getElementById("char-edit-close").addEventListener("click", closeCharacterEditor);
  document.getElementById("char-edit-cancel").addEventListener("click", closeCharacterEditor);
  document.getElementById("char-edit-save").addEventListener("click", saveCharacterEditor);
  document.getElementById("char-edit-reset").addEventListener("click", () => {
    const d = DEFAULT_CHAR_SKILLS[editorCharId];
    editorProfs = [...d.proficiencies];
    editorWeak = [...d.weaknesses];
    renderCharacterEditor();
  });
  document.getElementById("char-edit-copy").addEventListener("click", copyCharacterEditorCode);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeCharacterEditor();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeCharacterEditor();
  });
}

let editorFromSheet = false;

function openCharacterEditor(charId, fromSheet = false) {
  const c = CHARACTERS.find((x) => x.id === charId);
  if (!c) return;
  editorCharId = charId;
  editorFromSheet = fromSheet;
  editorProfs = [...(c.proficiencies || [])];
  editorWeak = [...(c.weaknesses || [])];
  document.getElementById("char-edit-portrait").src = c.portrait || "images/default.png";
  document.getElementById("char-edit-name").textContent = c.name;
  document.getElementById("char-edit-message").textContent = "";
  document.getElementById("char-edit-code").hidden = true;
  renderCharacterEditor();
  document.getElementById("char-edit-modal").hidden = false;
  document.body.classList.add("sheet-open");
}

function closeCharacterEditor() {
  document.getElementById("char-edit-modal").hidden = true;
  document.body.classList.remove("sheet-open");
  if (editorFromSheet && editorCharId) {
    editorFromSheet = false;
    openCharacterSheet(editorCharId);
  }
}

function renderCharacterEditor() {
  const groups = { Arme: "Armes", Sort: "Sorts", Talent: "Talents" };
  const box = document.getElementById("char-edit-skills");
  box.innerHTML = "";
  Object.entries(groups).forEach(([cat, title]) => {
    const skills = SKILLS_LIST.filter((sk) => sk.category === cat);
    if (!skills.length) return;
    const section = document.createElement("div");
    section.className = "char-edit-group";
    section.innerHTML = `<h5>${title}</h5><div class="skills-grid"></div>`;
    const grid = section.querySelector(".skills-grid");
    skills.forEach((skill) => {
      const state = getSkillState(skill.id, editorProfs, editorWeak);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `skill-checkbox-label skill-state-${state}`;
      chip.title = "Clic : neutre → point fort → peu adapté → neutre";
      chip.innerHTML = `
        <span class="skill-state-mark">${state === "prio" ? "✓" : state === "unfav" ? "✕" : ""}</span>
        <span><img src="${skill.icon}" alt="" class="skill-icon"> ${skill.name}</span>`;
      chip.addEventListener("click", () => {
        const next = nextSkillState(getSkillState(skill.id, editorProfs, editorWeak));
        editorProfs = editorProfs.filter((id) => id !== skill.id);
        editorWeak = editorWeak.filter((id) => id !== skill.id);
        if (next === "prio") editorProfs.push(skill.id);
        if (next === "unfav") editorWeak.push(skill.id);
        renderCharacterEditor();
      });
      grid.appendChild(chip);
    });
    box.appendChild(section);
  });

  const d = DEFAULT_CHAR_SKILLS[editorCharId];
  const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));
  const isDefault = same(editorProfs, d.proficiencies) && same(editorWeak, d.weaknesses);
  document.getElementById("char-edit-reset").disabled = isDefault;
}

function saveCharacterEditor() {
  const c = CHARACTERS.find((x) => x.id === editorCharId);
  if (!c) return;
  const overrides = loadCharOverrides();
  const d = DEFAULT_CHAR_SKILLS[c.id];
  const profs = sortSkillIds(editorProfs);
  const weak = sortSkillIds(editorWeak);
  const same = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

  if (same(profs, d.proficiencies) && same(weak, d.weaknesses)) {
    delete overrides[c.id];
  } else {
    overrides[c.id] = { proficiencies: profs, weaknesses: weak };
  }

  if (!saveCharOverrides(overrides)) {
    document.getElementById("char-edit-message").textContent = "⚠️ Impossible d'enregistrer dans ce navigateur.";
    return;
  }

  c.proficiencies = profs;
  c.weaknesses = weak;
  refreshAfterCharacterEdit(c.id);
  closeCharacterEditor();
}

// Met à jour les parties du site qui affichent ce personnage
function refreshAfterCharacterEdit(charId) {
  if (typeof selectedFaction !== "undefined" && selectedFaction) selectFaction(selectedFaction, false);
  if (typeof renderComparator === "function") renderComparator();

  const select = document.getElementById("character-select");
  if (currentChar && currentChar.id === charId && select) {
    select.dispatchEvent(new Event("change"));
  }
  if (typeof simChar !== "undefined" && simChar && simChar.id === charId) {
    simSkills = [...(simChar.proficiencies || [])];
    simUnfavored = [...(simChar.weaknesses || [])];
    updateSimulatorUI();
  }
}

// Texte à coller dans data.js pour rendre la modification définitive
function copyCharacterEditorCode() {
  const code = `    proficiencies: ${JSON.stringify(sortSkillIds(editorProfs)).replace(/","/g, '", "')},\n    weaknesses: ${JSON.stringify(sortSkillIds(editorWeak)).replace(/","/g, '", "')}`;
  const area = document.getElementById("char-edit-code");
  area.value = code;
  area.hidden = false;
  area.select();
  const msg = document.getElementById("char-edit-message");
  const done = () => (msg.textContent = "Copié ! Remplace ces deux lignes dans le personnage, dans data.js.");
  try {
    navigator.clipboard.writeText(code).then(done, () => (msg.textContent = "Sélectionne le texte ci-dessous et copie-le (Ctrl+C)."));
  } catch (e) {
    msg.textContent = "Sélectionne le texte ci-dessous et copie-le (Ctrl+C).";
  }
}

// ==========================================
// ICÔNES DES COMPÉTENCES : copie locale, repli sur le Fire Emblem Wiki
// ==========================================
const WIKI_ICON_BASE = "https://cdn.fireemblemwiki.org/";
const LOCAL_ICON_DIR = "images/skills/";
const ICON_FALLBACKS = {};

function localIconName(remoteUrl) {
  const file = decodeURIComponent(remoteUrl.split("/").pop());
  return file.replace(/\+/g, "_plus").replace(/['’,]/g, "");
}

function toLocalIcon(url) {
  if (!url || !url.startsWith(WIKI_ICON_BASE)) return url;
  const local = LOCAL_ICON_DIR + localIconName(url);
  ICON_FALLBACKS[local] = url;
  return local;
}

// Remplace les adresses du wiki par images/skills/… ; si le fichier local manque, l'image retombe sur le wiki
function localizeIcons() {
  if (typeof PERSONAL_SKILLS !== "undefined") {
    Object.values(PERSONAL_SKILLS).forEach((list) => list.forEach((sk) => (sk.icon = toLocalIcon(sk.icon))));
  }
  CLASSES.forEach((cls) => {
    (cls.techniques || []).forEach((t) => (t.icon = toLocalIcon(t.icon)));
    if (cls.masterTech) cls.masterTech.icon = toLocalIcon(cls.masterTech.icon);
  });
}

window.addEventListener(
  "error",
  (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement)) return;
    const local = img.getAttribute("src");
    const remote = ICON_FALLBACKS[local];
    if (remote && !img.dataset.fallbackTried) {
      img.dataset.fallbackTried = "1";
      img.src = remote;
    } else if (img.dataset.fallbackTried) {
      img.style.visibility = "hidden";
    }
  },
  true
);

// ==========================================
// ONGLET CLASSES + « QUI POUR CETTE CLASSE ? »
// ==========================================
let classesTierFilter = "";
let selectedClassId = null;
let classRankingShowAll = false;

const NEUTRAL_PRIORITIES = Object.fromEntries(Object.keys(STAT_LABELS).map((k) => [k, "neutre"]));

function initClassesTab() {
  const grid = document.getElementById("classes-grid");
  if (!grid) return;

  const skillSelect = document.getElementById("classes-skill-filter");
  SKILLS_LIST.forEach((sk) => {
    const opt = document.createElement("option");
    opt.value = sk.id;
    opt.textContent = sk.name;
    skillSelect.appendChild(opt);
  });

  document.querySelectorAll(".tier-filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      classesTierFilter = btn.dataset.tier;
      document.querySelectorAll(".tier-filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderClassesGrid();
    })
  );
  skillSelect.addEventListener("change", renderClassesGrid);
  document.getElementById("classes-search").addEventListener("input", renderClassesGrid);

  renderClassesGrid();
}

function renderClassesGrid() {
  const grid = document.getElementById("classes-grid");
  const skill = document.getElementById("classes-skill-filter").value;
  const q = normalizeSearchText(document.getElementById("classes-search").value.trim());

  const list = CLASSES.filter(
    (c) =>
      (!classesTierFilter || c.tier === classesTierFilter) &&
      (!skill || (c.allowed || []).includes(skill)) &&
      (!q || normalizeSearchText(c.name).includes(q))
  );

  grid.innerHTML = list.length ? "" : `<p class="empty-note">Aucune classe ne correspond à ces filtres.</p>`;
  list.forEach((cls) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `class-card tier-${tierSlug(cls.tier)} ${cls.id === selectedClassId ? "active" : ""}`;
    card.innerHTML = `
      <span class="class-card-tier">${cls.tier}</span>
      <span class="class-card-name">${cls.name}</span>
      <span class="class-card-icons">${(cls.allowed || [])
        .map((id) => {
          const sk = getSkillObj(id);
          return sk.icon ? `<img src="${sk.icon}" alt="${sk.name}" title="${sk.name}" class="skill-icon">` : "";
        })
        .join("")}</span>`;
    card.addEventListener("click", () => {
      selectedClassId = cls.id;
      classRankingShowAll = false;
      renderClassesGrid();
      renderClassDetail(true);
    });
    grid.appendChild(card);
  });
}

function tierSlug(tier) {
  return tier === "Novice" ? "novice" : tier === "Avancée" ? "avancee" : "elite";
}

function growthChipsHtml(growths) {
  return Object.entries(STAT_LABELS)
    .map(([k, label]) => {
      const v = (growths && growths[k]) || 0;
      const cls = v > 0 ? "pos" : v < 0 ? "neg" : "neu";
      return `<div class="class-growth ${cls}"><span>${label}</span><strong>${v > 0 ? "+" : ""}${v}%</strong></div>`;
    })
    .join("");
}

function techniqueListHtml(cls) {
  const techs = (cls.techniques || [])
    .map((t) => `<div class="class-tech"><img src="${t.icon}" alt="" class="class-tech-icon"><div><strong>${t.name}</strong><span>${t.desc}</span></div></div>`)
    .join("");
  const master = cls.masterTech
    ? `<div class="class-tech master"><img src="${cls.masterTech.icon}" alt="" class="class-tech-icon"><div><strong>${cls.masterTech.name}</strong><span>${cls.masterTech.desc}</span></div></div>`
    : `<p class="empty-note">Aucune magistrale connue.</p>`;
  return { techs: techs || `<p class="empty-note">Aucune technique de base.</p>`, master };
}

function rankCharactersForClass(cls) {
  return CHARACTERS.map((c) => {
    const ev = evaluateSynergy(c, cls, [...(c.proficiencies || [])], NEUTRAL_PRIORITIES, {
      unfavored: [...(c.weaknesses || [])],
      currentGrowths: c.growths
    });
    return { c, ev };
  }).sort((a, b) => b.ev.score - a.ev.score || a.c.name.localeCompare(b.c.name, "fr"));
}

function renderClassDetail(scroll) {
  const detail = document.getElementById("class-detail");
  const cls = CLASSES.find((c) => c.id === selectedClassId);
  if (!cls) {
    detail.hidden = true;
    return;
  }
  detail.hidden = false;

  const { techs, master } = techniqueListHtml(cls);
  const ranking = rankCharactersForClass(cls);
  const shown = classRankingShowAll ? ranking : ranking.slice(0, 10);

  detail.innerHTML = `
    <div class="class-detail-header">
      <div>
        <span class="badge-tier">${cls.tier}</span>
        <h3>${cls.name}</h3>
        <div class="class-card-icons big">${(cls.allowed || [])
          .map((id) => {
            const sk = getSkillObj(id);
            return `<span class="sheet-prof">${sk.icon ? `<img src="${sk.icon}" alt="" class="skill-icon">` : ""}${sk.name}</span>`;
          })
          .join("")}</div>
      </div>
    </div>

    <div class="class-detail-columns">
      <div class="sheet-block">
        <h4>Croissances de la classe</h4>
        <div class="class-growths">${growthChipsHtml(cls.growths)}</div>
      </div>
      <div class="sheet-block">
        <h4>Techniques</h4>
        ${techs}
        <h4 style="margin-top: 12px;">Magistrale</h4>
        ${master}
      </div>
    </div>

    <div class="sheet-block">
      <h4>🎯 Qui pour cette classe ? <span class="sheet-total">${ranking.length} personnages classés</span></h4>
      <p class="ranking-note">Calcul avec le moteur du calculateur : maîtrises du personnage (points forts et peu adapté) et toutes les stats en Neutre.</p>
      <div class="class-ranking">
        ${shown
          .map(({ c, ev }, i) => {
            const fits = ev.matchingSkills.map((id) => getSkillObj(id).name);
            const bad = (c.weaknesses || []).filter((id) => (cls.allowed || []).includes(id)).map((id) => getSkillObj(id).name);
            return `
              <button type="button" class="ranking-row" data-char="${c.id}" title="Voir la fiche de ${c.name}">
                <span class="ranking-pos">${i + 1}</span>
                <img src="${c.portrait || "images/default.png"}" alt="" class="ranking-portrait" loading="lazy">
                <span class="ranking-name">${c.name}</span>
                <span class="ranking-fits">${fits.length ? `✓ ${fits.join(", ")}` : `<span class="neu">Aucune maîtrise en commun</span>`}${bad.length ? `<span class="ranking-bad"> · ✕ ${bad.join(", ")}</span>` : ""}</span>
                <span class="rank-badge ${getRankCssClass(ev.rank)}">${ev.rank}</span>
                <span class="ranking-score">${fmtPts(ev.score)}</span>
              </button>`;
          })
          .join("")}
      </div>
      ${ranking.length > 10 ? `<button type="button" class="char-edit-btn secondary ranking-more" id="ranking-more-btn">${classRankingShowAll ? "Afficher seulement le top 10" : `Afficher les ${ranking.length} personnages`}</button>` : ""}
    </div>
  `;

  detail.querySelectorAll(".ranking-row").forEach((row) => row.addEventListener("click", () => openCharacterSheet(row.dataset.char)));
  const more = document.getElementById("ranking-more-btn");
  if (more)
    more.addEventListener("click", () => {
      classRankingShowAll = !classRankingShowAll;
      renderClassDetail(false);
    });

  if (scroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==========================================
// COMPARER DEUX CLASSES (calculateur)
// ==========================================
const classCompareChoice = {};

function renderClassCompare(cls, tier) {
  const select = document.getElementById("class-compare-select");
  const out = document.getElementById("class-compare-result");
  if (!select || !out || !currentChar) return;

  const others = CLASSES.filter((c) => c.tier === tier && c.id !== cls.id);
  if (classCompareChoice[tier] === cls.id) classCompareChoice[tier] = "";
  select.innerHTML =
    `<option value="">-- Choisir une classe ${tier} --</option>` +
    others.map((c) => `<option value="${c.id}" ${classCompareChoice[tier] === c.id ? "selected" : ""}>${c.name}</option>`).join("");
  select.onchange = () => {
    classCompareChoice[tier] = select.value;
    renderClassCompare(cls, tier);
  };

  const other = CLASSES.find((c) => c.id === classCompareChoice[tier]);
  if (!other) {
    out.innerHTML = `<p class="empty-note">Choisissez une classe pour la comparer à ${cls.name}.</p>`;
    return;
  }

  const evA = evaluateSynergy(currentChar, cls);
  const evB = evaluateSynergy(currentChar, other);
  const baseline = getCurrentGrowths();

  const statRows = Object.entries(STAT_LABELS)
    .map(([k, label]) => {
      const a = (currentChar.growths[k] || 0) + ((cls.growths && cls.growths[k]) || 0);
      const b = (currentChar.growths[k] || 0) + ((other.growths && other.growths[k]) || 0);
      const cur = baseline[k] ?? currentChar.growths[k];
      const fmt = (v) => `${v}% <small class="${v - cur > 0 ? "pos" : v - cur < 0 ? "neg" : "neu"}">(${v - cur > 0 ? "+" : ""}${v - cur})</small>`;
      return `<tr><td class="${a > b ? "win-a" : ""}">${fmt(a)}</td><th>${label}</th><td class="${b > a ? "win-b" : ""}">${fmt(b)}</td></tr>`;
    })
    .join("");

  const names = (ids) => (ids.length ? ids.map((id) => getSkillObj(id).name).join(", ") : "—");
  const unfavUsed = (c) => unfavoredSkills.filter((id) => (c.allowed || []).includes(id));
  const techNames = (c) => [...(c.techniques || []).map((t) => t.name), c.masterTech ? `★ ${c.masterTech.name}` : null].filter(Boolean).join(", ") || "—";

  out.innerHTML = `
    <table class="compare-table class-compare-table">
      <thead>
        <tr><th class="head-a">${cls.name}</th><th></th><th class="head-b">${other.name}</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="rank-badge ${getRankCssClass(evA.rank)}">${evA.rank}</span> ${fmtPts(evA.score)} pts</td>
          <th>Rang</th>
          <td><span class="rank-badge ${getRankCssClass(evB.rank)}">${evB.rank}</span> ${fmtPts(evB.score)} pts</td>
        </tr>
        <tr><td>${names(evA.matchingSkills)}</td><th>Maîtrises en commun</th><td>${names(evB.matchingSkills)}</td></tr>
        <tr><td class="neg-text">${names(unfavUsed(cls))}</td><th>Peu adapté</th><td class="neg-text">${names(unfavUsed(other))}</td></tr>
        <tr><td>${techNames(cls)}</td><th>Techniques</th><td>${techNames(other)}</td></tr>
        ${statRows}
      </tbody>
    </table>
    <button type="button" class="char-edit-btn secondary" id="class-compare-pick" style="margin-top: 10px;">Choisir ${other.name} à la place</button>
  `;

  document.getElementById("class-compare-pick").addEventListener("click", () => {
    classCompareChoice[tier] = cls.id;
    selectedClasses[tier] = other;
    previewClass = other;
    renderTierList(tier);
    renderAnalysis(other, evaluateSynergy(currentChar, other), tier);
    renderCharacterInfo();
  });
}

// ==========================================
// RECHERCHE DE COMPÉTENCES PERSONNELLES PAR EFFET
// ==========================================
function initEffectSearch() {
  const input = document.getElementById("effect-search");
  if (!input) return;
  input.addEventListener("input", renderEffectSearch);
}

function renderEffectSearch() {
  const input = document.getElementById("effect-search");
  const box = document.getElementById("effect-search-results");
  const raw = input.value.trim();
  const q = normalizeSearchText(raw);
  if (q.length < 2 || typeof PERSONAL_SKILLS === "undefined") {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }

  const results = [];
  CHARACTERS.forEach((c) => {
    (PERSONAL_SKILLS[c.id] || []).forEach((sk) => {
      if (normalizeSearchText(`${sk.name} ${sk.desc}`).includes(q)) results.push({ c, sk });
    });
  });

  box.hidden = false;
  if (!results.length) {
    box.innerHTML = `<p class="empty-note">Aucune compétence ne contient « ${raw} ».</p>`;
    return;
  }

  const count = new Set(results.map((r) => r.c.id)).size;
  box.innerHTML =
    `<p class="effect-count">${results.length} compétence${results.length > 1 ? "s" : ""} · ${count} personnage${count > 1 ? "s" : ""}</p>` +
    results
      .map(
        ({ c, sk }) => `
      <button type="button" class="effect-row" data-char="${c.id}" title="Voir la fiche de ${c.name}">
        <img src="${c.portrait || "images/default.png"}" alt="" class="ranking-portrait" loading="lazy">
        <span class="effect-char">${c.name}</span>
        <img src="${sk.icon}" alt="" class="personal-skill-icon small">
        <span class="personal-skill-when ${getWhenCss(sk.when)}">${sk.when}</span>
        <span class="effect-text"><strong>${sk.name}</strong> — ${highlightMatch(sk.desc, raw)}</span>
      </button>`
      )
      .join("");

  box.querySelectorAll(".effect-row").forEach((row) => row.addEventListener("click", () => openCharacterSheet(row.dataset.char)));
}

function highlightMatch(text, query) {
  const nText = normalizeSearchText(text);
  const nQuery = normalizeSearchText(query);
  const i = nText.indexOf(nQuery);
  if (i < 0 || !nQuery) return text;
  return `${text.slice(0, i)}<mark>${text.slice(i, i + nQuery.length)}</mark>${text.slice(i + nQuery.length)}`;
}

// ==========================================
// BUILDS ENREGISTRÉS
// ==========================================
const BUILDS_KEY = "fefw_builds";

function loadBuilds() {
  try {
    const list = JSON.parse(localStorage.getItem(BUILDS_KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function saveBuilds(list) {
  try {
    localStorage.setItem(BUILDS_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    return false;
  }
}

function initBuilds() {
  const btn = document.getElementById("save-build-btn");
  if (btn) btn.addEventListener("click", saveCurrentBuild);
  renderMyBuilds();
}

function saveCurrentBuild() {
  const status = document.getElementById("save-build-status");
  if (!currentChar || !validatedClasses.Élite) return;
  const tiers = ["Novice", "Avancée", "Élite"];
  const build = {
    id: `b${Date.now()}`,
    charId: currentChar.id,
    date: new Date().toISOString(),
    classes: Object.fromEntries(tiers.map((t) => [t, validatedClasses[t] ? validatedClasses[t].id : null])),
    ranks: Object.fromEntries(tiers.map((t) => [t, validatedEvals[t] ? validatedEvals[t].rank : null])),
    scores: Object.fromEntries(tiers.map((t) => [t, validatedEvals[t] ? validatedEvals[t].score : null])),
    growths: getCurrentGrowths()
  };
  const list = loadBuilds();
  list.unshift(build);
  if (saveBuilds(list)) {
    status.textContent = "✓ Build enregistré";
    status.className = "save-team-status status-saved";
  } else {
    status.textContent = "⚠️ Impossible d'enregistrer dans ce navigateur";
    status.className = "save-team-status status-error";
  }
  renderMyBuilds();
}

function deleteBuild(buildId) {
  saveBuilds(loadBuilds().filter((b) => b.id !== buildId));
  renderMyBuilds();
}

function buildRowHtml(b, withName) {
  const c = CHARACTERS.find((x) => x.id === b.charId);
  const date = new Date(b.date);
  const dateTxt = isNaN(date) ? "" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  const steps = ["Novice", "Avancée", "Élite"]
    .map((t) => {
      const cls = CLASSES.find((x) => x.id === b.classes[t]);
      const rank = b.ranks && b.ranks[t];
      return `<span class="build-step">${cls ? cls.name : "—"}${rank ? ` <span class="rank-badge ${getRankCssClass(rank)}">${rank}</span>` : ""}</span>`;
    })
    .join(`<span class="build-arrow">➔</span>`);
  return `
    <div class="build-row">
      ${withName && c ? `<img src="${c.portrait}" alt="" class="ranking-portrait"><button type="button" class="build-char" data-char="${c.id}">${c.name}</button>` : ""}
      <div class="build-steps">${steps}</div>
      <span class="build-date">${dateTxt}</span>
      <button type="button" class="build-delete-btn" data-build-id="${b.id}" title="Supprimer ce build">🗑️</button>
    </div>`;
}

function renderMyBuilds() {
  const panel = document.getElementById("my-builds-panel");
  const box = document.getElementById("my-builds-list");
  if (!panel || !box) return;
  const list = loadBuilds();
  panel.hidden = list.length === 0;
  box.innerHTML = list.map((b) => buildRowHtml(b, true)).join("");
  box.querySelectorAll(".build-delete-btn").forEach((btn) => btn.addEventListener("click", () => deleteBuild(btn.dataset.buildId)));
  box.querySelectorAll(".build-char").forEach((btn) => btn.addEventListener("click", () => openCharacterSheet(btn.dataset.char)));
}

function renderCharacterBuilds(charId) {
  const list = loadBuilds().filter((b) => b.charId === charId);
  if (!list.length) return "";
  return `
    <div class="sheet-block">
      <h4>Builds enregistrés <span class="sheet-total">${list.length}</span></h4>
      <div class="builds-list">${list.map((b) => buildRowHtml(b, false)).join("")}</div>
    </div>`;
}
