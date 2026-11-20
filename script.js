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
let statPriorities = {};
let selectedClasses = { Novice: null, Avancée: null, Élite: null };
let validatedClasses = { Novice: null, Avancée: null, Élite: null };
let previewClass = null;
let currentEvaluatedClass = null;
let currentEvaluatedTier = null;
let isAnalysisFlipped = false;

let simChar = null;
let simClass = null;
let simSkills = [];
let simPriorities = {};

document.addEventListener("DOMContentLoaded", () => {
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
    
    selectedSkills = [];
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
    selectedSkills = [];
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

  // Onglets : bouton -> panneau affiché
  const TABS = [
    { btn: "tab-calculator-btn", panel: "calculator-main-content" },
    { btn: "tab-system-btn", panel: "system-panel" },
    { btn: "tab-recruitment-btn", panel: "recruitment-panel" },
    { btn: "tab-compare-btn", panel: "compare-panel" },
    { btn: "tab-factions-btn", panel: "factions-panel" }
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
});

function getSkillObj(skillId) {
  return SKILLS_LIST.find((s) => s.id === skillId) || { name: skillId, category: "" };
}

function getRankCssClass(rank) {
  return "rank-" + rank.toLowerCase();
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

  const containerArme = document.getElementById("skills-checkboxes-Arme");
  const containerSort = document.getElementById("skills-checkboxes-Sort");
  const containerTalent = document.getElementById("skills-checkboxes-Talent");

  if (containerArme) containerArme.innerHTML = "";
  if (containerSort) containerSort.innerHTML = "";
  if (containerTalent) containerTalent.innerHTML = "";

  SKILLS_LIST.forEach((skill) => {
    const isChecked = selectedSkills.includes(skill.id);
    const label = document.createElement("label");
    label.className = `skill-checkbox-label ${isChecked ? "checked" : ""}`;

    label.innerHTML = `
      <input type="checkbox" value="${skill.id}" ${isChecked ? "checked" : ""}>
      <span><img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ${skill.name}</span>
    `;

    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        if (!selectedSkills.includes(skill.id)) selectedSkills.push(skill.id);
        label.classList.add("checked");
      } else {
        selectedSkills = selectedSkills.filter(id => id !== skill.id);
        label.classList.remove("checked");
      }
      const activeTier = !document.getElementById("tier-novice").hidden ? "Novice" :
                         !document.getElementById("tier-avancee").hidden ? "Avancée" : "Élite";
      renderTierList(activeTier);
      renderCharacterInfo();

      if (selectedClasses[activeTier]) {
        const evalData = evaluateSynergy(currentChar, selectedClasses[activeTier]);
        renderAnalysis(selectedClasses[activeTier], evalData, activeTier);
      }
    });

    if (skill.category === "Arme" && containerArme) {
      containerArme.appendChild(label);
    } else if (skill.category === "Sort" && containerSort) {
      containerSort.appendChild(label);
    } else if (skill.category === "Talent" && containerTalent) {
      containerTalent.appendChild(label);
    }
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

function evaluateSynergy(char, cls, customSkills = null, customPriorities = null) {
  let score = 0;
  const activeSkillsList = customSkills !== null ? customSkills : selectedSkills;
  const prioritiesMap = customPriorities !== null ? customPriorities : statPriorities;

  const matchingSkills = cls.allowed.filter(s => activeSkillsList.includes(s));
  const unmatchingSkills = activeSkillsList.filter(s => !cls.allowed.includes(s));

  score += matchingSkills.length * 10;
  score -= unmatchingSkills.length * 5;

  const currentGrowthsBeforePreview = getCurrentGrowths();

  Object.entries(STAT_LABELS).forEach(([stat, label]) => {
    const baseCharStat = char.growths[stat] || 0;
    const classBonus = cls.growths[stat] || 0;
    const statWithPreview = baseCharStat + classBonus;
    const currentTotalVal = currentGrowthsBeforePreview[stat] || baseCharStat;
    
    const evolutionVal = statWithPreview - currentTotalVal;
    const priority = prioritiesMap[stat] || "neutre";

    if (priority === "divine") {
      if (evolutionVal !== 0) {
        score += evolutionVal * 1.5;
      }
    } else if (priority === "majeure") {
      if (evolutionVal !== 0) {
        score += evolutionVal * 1;
      }
    } else if (priority === "prioritaire") {
      if (evolutionVal !== 0) {
        score += evolutionVal * 0.5;
      }
    } else if (priority === "moins-prioritaire") {
      if (evolutionVal < 0) {
        score += 0;
      } else if (evolutionVal > 0) {
        score -= (evolutionVal * 1.5);
      }
    } else if (priority === "neutre") {
      if (evolutionVal > 0) {
        score += evolutionVal * 0.25;
      } 
    }
  });

  score = Math.round(score * 10) / 10;

  const { rank, verdict } = getRankFromScore(score);
  return { rank, score, verdict, matchingSkills, unmatchingSkills };
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
    if (!selectedClasses[tier]) {
      alert("Veuillez d'abord sélectionner une classe dans la liste !");
      return;
    }
    handleTierValidation(tier);
  };
}

function handleTierValidation(tier) {
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
    const chip = document.createElement("div");
    chip.className = `skill-chip ${isMatch ? "match" : ""}`;
    chip.innerHTML = `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon"> ${skill.name}${isMatch ? " ★" : ""}`;
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
        <img src="${tech.icon}" alt="${tech.name}" class="skill-icon"> <span>${tech.name}</span>
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
      <img src="${cls.masterTech.icon}" alt="${cls.masterTech.name}" class="skill-icon"> <span> ${cls.masterTech.name}</span>
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

  if (isAnalysisFlipped) {
    renderAnalysisBreakdown(cls, tier);
  }
  
  //panel.scrollIntoView({ behavior: "smooth", block: "nearest" }); //(Si jamis il ya probleme avec le gestion des statistique)
}

function renderAnalysisBreakdown(cls, tier) {
  const evalData = evaluateSynergy(currentChar, cls);

  const badgeEl = document.getElementById("analysis-back-score-badge");
  badgeEl.innerHTML = `
    <span class="rank-badge ${getRankCssClass(evalData.rank)}">Rang ${evalData.rank}</span>
    <span class="rank-badge" style="background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37;">${evalData.score > 0 ? '+' : ''}${evalData.score} pts</span>
  `;

  const tbody = document.getElementById("analysis-breakdown-body");
  tbody.innerHTML = "";

  let calculatedSum = 0;
  const activeSkillsList = [...selectedSkills];

  activeSkillsList.forEach((sId) => {
    const skillObj = getSkillObj(sId);
    const skillName = skillObj.name;
    const isAllowed = cls.allowed.includes(sId);
    const pts = isAllowed ? 10 : -5;
    calculatedSum += pts;

    tbody.innerHTML += `
      <tr>
        <td><strong><img src="${skillObj.icon}" alt="${skillName}" class="skill-icon"> Maîtrise : ${skillName}</strong></td>
        <td>${isAllowed ? "Compatible avec la classe" : "Absente de la classe"}</td>
        <td>${isAllowed ? "1 × +10 pts" : "1 × -5 pts"}</td>
        <td class="${pts >= 0 ? 'pos' : 'neg'}">${pts > 0 ? '+' : ''}${pts} pts</td>
      </tr>
    `;
  });

  if (activeSkillsList.length === 0) {
    tbody.innerHTML += `
      <tr>
        <td colspan="3" style="color: #888;">Aucune maîtrise sélectionnée</td>
        <td class="neu">0 pts</td>
      </tr>
    `;
  }

  const currentGrowthsBeforePreview = getCurrentGrowths();

  Object.entries(STAT_LABELS).forEach(([statKey, label]) => {
    const baseCharStat = currentChar.growths[statKey] || 0;
    const classBonus = cls.growths[statKey] || 0;
    const statWithPreview = baseCharStat + classBonus;
    const currentTotalVal = currentGrowthsBeforePreview[statKey] || baseCharStat;
    const evolutionVal = statWithPreview - currentTotalVal;

    const prio = statPriorities[statKey] || "neutre";
    let pts = 0;
    let ruleDesc = "";
    let mathDesc = "";

    if (prio === "divine") {
      if (evolutionVal !== 0) {
        pts = evolutionVal * 1.5;
        ruleDesc = "★★★ Divine";
        mathDesc = `${evolutionVal}% × 1.5`;
      } else {
        ruleDesc = "★★★ Divine (0%)";
        mathDesc = "Aucun changement";
      }
    } else if (prio === "majeure") {
      if (evolutionVal !== 0) {
        pts = evolutionVal * 1;
        ruleDesc = "★★ Majeure";
        mathDesc = `${evolutionVal}% × 1`;
      } else {
        ruleDesc = "★★ Majeure (0%)";
        mathDesc = "Aucun changement";
      }
    } else if (prio === "prioritaire") {
      if (evolutionVal !== 0) {
        pts = evolutionVal * 0.5;
        ruleDesc = "★ Prioritaire";
        mathDesc = `${evolutionVal}% × 0.5`;
      } else {
        ruleDesc = "★ Prioritaire (0%)";
        mathDesc = "Aucun changement";
      }
    } else if (prio === "moins-prioritaire") {
      if (evolutionVal < 0) {
        pts = 0;
        ruleDesc = "🔻 Moins prioritaire (Baisse)";
        mathDesc = "0 pt accordé";
      } else if (evolutionVal > 0) {
        pts = -(evolutionVal * 1.5);
        ruleDesc = "🔻 Moins prioritaire (Hausse)";
        mathDesc = `-(${evolutionVal}% × 1.5)`;
      } else {
        ruleDesc = "🔻 Moins prioritaire (0%)";
        mathDesc = "Aucun changement";
      }
    } else {
      if (evolutionVal > 0) {
        pts = evolutionVal * 0.25;
        ruleDesc = "• Neutre (Hausse)";
        mathDesc = `${evolutionVal}% × 0.25`;
      } else if (evolutionVal < 0) {
        pts = 0;
        ruleDesc = "• Neutre (Baisse)";
        mathDesc = "Aucun malus en neutre";
      } else {
        ruleDesc = "• Neutre (0%)";
        mathDesc = "Aucun changement";
      }
    }

    calculatedSum += pts;

    if (evolutionVal !== 0 || prio !== "neutre") {
      const ptsFormatted = Math.round(pts * 10) / 10;
      tbody.innerHTML += `
        <tr>
          <td><strong>Stat : ${label}</strong> (${evolutionVal > 0 ? '+' : ''}${evolutionVal}%)</td>
          <td>${ruleDesc}</td>
          <td>${mathDesc}</td>
          <td class="${ptsFormatted > 0 ? 'pos' : (ptsFormatted < 0 ? 'neg' : 'neu')}">${ptsFormatted > 0 ? '+' : ''}${ptsFormatted} pts</td>
        </tr>
      `;
    }
  });

  calculatedSum = Math.round(calculatedSum * 10) / 10;

  tbody.innerHTML += `
    <tr style="background: #222; border-top: 2px solid #d4af37;">
      <td colspan="3" style="text-align: right; color: #d4af37;"><strong>SCORE TOTAL CALCULÉ :</strong></td>
      <td style="color: #d4af37; font-size: 1.05rem;"><strong>${calculatedSum > 0 ? '+' : ''}${calculatedSum} pts</strong></td>
    </tr>
  `;

  const errorBox = document.getElementById("analysis-back-error-check");
  if (calculatedSum !== evalData.score) {
    errorBox.innerHTML = `
      <div style="background: #2c1515; border: 1px solid #e74c3c; color: #e74c3c; padding: 8px 12px; border-radius: 6px; font-size: 0.85rem;">
        ⚠️ Écart détecté entre le score détaillé (${calculatedSum}) et le moteur (${evalData.score}).
      </div>
    `;
  } else {
    errorBox.innerHTML = `
      <div style="background: #15261a; border: 1px solid #27ae60; color: #2ecc71; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem;">
        ✅ Vérification OK : Total cohérent (${evalData.score} pts → Rang ${evalData.rank}).
      </div>
    `;
  }
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
      simSkills = [];
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
    const active = simSkills.includes(skill.id);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.style.padding = "5px 10px";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "0.85rem";
    btn.style.border = active ? "1px solid #d4af37" : "1px solid #444";
    btn.style.background = active ? "#2a2211" : "#1e1e1e";
    btn.style.color = active ? "#d4af37" : "#888";

    btn.innerHTML = `
      <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
      <span>${active ? "✓ " : ""}${skill.name}</span>
    `;

    btn.addEventListener("click", () => {
      if (simSkills.includes(skill.id)) {
        simSkills = simSkills.filter(id => id !== skill.id);
      } else {
        simSkills.push(skill.id);
      }
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

function renderSimBreakdown() {
  document.getElementById("sim-res-subtitle").textContent = `Palier : ${simClass.tier} | Maîtrises classe : ${simClass.allowed.map(id => getSkillObj(id).name).join(", ")}`;
  document.getElementById("sim-res-title").textContent = `${simChar.name} → ${simClass.name}`;

  const evalData = evaluateSynergy(simChar, simClass, simSkills, simPriorities);

  const badgeEl = document.getElementById("sim-res-badge");
  badgeEl.innerHTML = `
    <span class="rank-badge ${getRankCssClass(evalData.rank)}">Rang ${evalData.rank}</span>
    <span class="rank-badge" style="background: #1a1a1a; color: #d4af37; border: 1px solid #d4af37;">${evalData.score > 0 ? '+' : ''}${evalData.score} pts</span>
  `;

  const tbody = document.getElementById("sim-breakdown-body");
  tbody.innerHTML = "";

  let calculatedSum = 0;

  simSkills.forEach((sId) => {
    const skillName = getSkillObj(sId).name;
    const isAllowed = simClass.allowed.includes(sId);
    const pts = isAllowed ? 10 : -5;
    calculatedSum += pts;

    tbody.innerHTML += `
      <tr>
        <td><strong>Maîtrise : ${skillName}</strong></td>
        <td>${isAllowed ? "Compatible avec la classe" : "Absente de la classe"}</td>
        <td>${isAllowed ? "1 × +10 pts" : "1 × -5 pts"}</td>
        <td class="${pts >= 0 ? 'pos' : 'neg'}">${pts > 0 ? '+' : ''}${pts} pts</td>
      </tr>
    `;
  });

  if (simSkills.length === 0) {
    tbody.innerHTML += `
      <tr>
        <td colspan="3" style="color: #888;">Aucune maîtrise sélectionnée pour ce test</td>
        <td class="neu">0 pts</td>
      </tr>
    `;
  }

  Object.entries(STAT_LABELS).forEach(([statKey, label]) => {
    const bonusVal = simClass.growths[statKey] || 0;
    const evolutionVal = bonusVal;

    const prio = simPriorities[statKey] || "neutre";
    let pts = 0;
    let ruleDesc = "";
    let mathDesc = "";

    if (prio === "divine") {
      if (evolutionVal !== 0) {
        pts = evolutionVal * 1.5;
        ruleDesc = "★★★ Divine";
        mathDesc = `${evolutionVal}% × 1.5`;
      } else {
        ruleDesc = "★★★ Divine (0%)";
        mathDesc = "Aucun changement";
      }
    } else if (prio === "majeure") {
      if (evolutionVal !== 0) {
        pts = evolutionVal * 1;
        ruleDesc = "★★ Majeure";
        mathDesc = `${evolutionVal}% × 1`;
      } else {
        ruleDesc = "★★ Majeure (0%)";
        mathDesc = "Aucun changement";
      }
    } else if (prio === "prioritaire") {
      if (evolutionVal !== 0) {
        pts = evolutionVal * 0.5;
        ruleDesc = "★ Prioritaire";
        mathDesc = `${evolutionVal}% × 0.5`;
      } else {
        ruleDesc = "★ Prioritaire (0%)";
        mathDesc = "Aucun changement";
      }
    } else if (prio === "moins-prioritaire") {
      if (evolutionVal < 0) {
        pts = 0;
        ruleDesc = "🔻 Moins prioritaire (Baisse)";
        mathDesc = "0 pt accordé";
      } else if (evolutionVal > 0) {
        pts = -(evolutionVal * 1.5);
        ruleDesc = "🔻 Moins prioritaire (Hausse)";
        mathDesc = `-(${evolutionVal}% × 1.5)`;
      } else {
        ruleDesc = "🔻 Moins prioritaire (0%)";
        mathDesc = "Aucun changement";
      }
    } else {
      if (evolutionVal > 0) {
        pts = evolutionVal * 0.25;
        ruleDesc = "• Neutre (Hausse)";
        mathDesc = `${evolutionVal}% × 0.25`;
      } else if (evolutionVal < 0) {
        pts = 0;
        ruleDesc = "• Neutre (Baisse)";
        mathDesc = "Aucun malus en neutre";
      } else {
        ruleDesc = "• Neutre (0%)";
        mathDesc = "Aucun changement";
      }
    }

    calculatedSum += pts;

    if (evolutionVal !== 0 || prio !== "neutre") {
      const ptsFormatted = Math.round(pts * 10) / 10;
      tbody.innerHTML += `
        <tr>
          <td><strong>Stat : ${label}</strong> (${evolutionVal > 0 ? '+' : ''}${evolutionVal}%)</td>
          <td>${ruleDesc}</td>
          <td>${mathDesc}</td>
          <td class="${ptsFormatted > 0 ? 'pos' : (ptsFormatted < 0 ? 'neg' : 'neu')}">${ptsFormatted > 0 ? '+' : ''}${ptsFormatted} pts</td>
        </tr>
      `;
    }
  });

  calculatedSum = Math.round(calculatedSum * 10) / 10;

  tbody.innerHTML += `
    <tr style="background: #222; border-top: 2px solid #d4af37;">
      <td colspan="3" style="text-align: right; color: #d4af37;"><strong>SCORE TOTAL CALCULÉ :</strong></td>
      <td style="color: #d4af37; font-size: 1.05rem;"><strong>${calculatedSum > 0 ? '+' : ''}${calculatedSum} pts</strong></td>
    </tr>
  `;

  const errorBox = document.getElementById("sim-error-check");
  const missingStats = Object.keys(STAT_LABELS).filter(k => typeof simClass.growths[k] !== "number");

  if (calculatedSum !== evalData.score || missingStats.length > 0) {
    errorBox.innerHTML = `
      <div style="background: #2c1515; border: 1px solid #e74c3c; color: #e74c3c; padding: 10px 14px; border-radius: 6px; font-size: 0.9rem;">
        ⚠️ <strong>Anomalie détectée :</strong> 
        ${calculatedSum !== evalData.score ? `Écart entre le score détaillé (${calculatedSum}) et evaluateSynergy (${evalData.score}). ` : ""}
        ${missingStats.length > 0 ? `Statistiques manquantes dans data.js pour cette classe : ${missingStats.join(", ")}.` : ""}
      </div>
    `;
  } else {
    errorBox.innerHTML = `
      <div style="background: #15261a; border: 1px solid #27ae60; color: #2ecc71; padding: 8px 14px; border-radius: 6px; font-size: 0.85rem;">
        ✅ <strong>Vérification OK :</strong> Toutes les données de la classe sont valides et le total correspond exactement au moteur de calcul (${evalData.score} pts → Rang ${evalData.rank}).
      </div>
    `;
  }
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

    <div class="sheet-block">
      <h4>Recrutement par route</h4>
      <div class="sheet-routes">${routesHtml}</div>
    </div>

    <div class="sheet-actions">
      <button type="button" class="sheet-compare-btn" id="sheet-compare-btn">⚖️ Comparer ce personnage</button>
    </div>
  `;

  content.querySelector(".sheet-faction-link").addEventListener("click", () => {
    closeCharacterSheet();
    openFactionPage(getFactionKey(charObj.faction));
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
    membersGrid.appendChild(card);
  });

  if (scroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openFactionPage(key) {
  if (typeof window.showTab === "function") window.showTab("tab-factions-btn");
  selectFaction(key, true);
}
