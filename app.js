const translations = {
  en: {
    navDemos: "Demos", navAbout: "About", navResearch: "Research ↗", eyebrow: "AI you can experience",
    heroTitle: "Language technology,<br /><em>live and interactive.</em>",
    heroIntro: "Explore systems for translation, multimodal learning, and human–AI interaction developed at KIT.",
    explore: "Explore the demos ↓", meetGroup: "Meet the research group ↗", showcase: "Demo showcase",
    demoTitle: "Try our research", demoIntro: "These prototypes turn current research into experiences you can see, hear, and explore.",
    loginNotice: "Event access: Some demos require a KIT login or on-site access. Ask the team if a link does not open.",
    aboutEyebrow: "Behind the demos", aboutTitle: "We teach machines to cross language barriers.",
    aboutText: "AI4LT at Karlsruhe Institute of Technology researches speech, translation, and multimodal language technologies. This showcase brings our prototypes together for events, workshops, and curious visitors.",
    learnMore: "Learn more about AI4LT ↗", footerTagline: "Artificial Intelligence for Language Technologies at KIT",
    contact: "Contact", legals: "Legal notice", privacy: "Privacy", accessibility: "Accessibility",
    launch: "Launch demo", learnMoreDemo: "More information", pending: "Link coming soon", access: "May require login",
    journeyLive: "Live language journey", journeyInput: "Speech input · German",
    journeyProcessing: "transcribing · translating", journeyOutput: "Live translation · English",
    journeyAsk: "Now ask, explore, interact."
  },
  de: {
    navDemos: "Demos", navAbout: "Über uns", navResearch: "Forschung ↗", eyebrow: "KI zum Erleben",
    heroTitle: "Sprachtechnologie,<br /><em>live und interaktiv.</em>",
    heroIntro: "Entdecke am KIT entwickelte Systeme für Übersetzung, multimodales Lernen und die Interaktion zwischen Mensch und KI.",
    explore: "Demos entdecken ↓", meetGroup: "Zur Forschungsgruppe ↗", showcase: "Demo-Showcase",
    demoTitle: "Forschung ausprobieren", demoIntro: "Diese Prototypen machen aktuelle Forschung sichtbar, hörbar und erlebbar.",
    loginNotice: "Zugang bei Veranstaltungen: Einige Demos benötigen einen KIT-Login oder Zugriff vor Ort. Frage das Team, falls sich ein Link nicht öffnet.",
    aboutEyebrow: "Hinter den Demos", aboutTitle: "Wir bringen Maschinen bei, Sprachbarrieren zu überwinden.",
    aboutText: "AI4LT am Karlsruher Institut für Technologie erforscht Sprach-, Übersetzungs- und multimodale Technologien. Diese Seite bringt unsere Prototypen für Veranstaltungen, Workshops und neugierige Gäste zusammen.",
    learnMore: "Mehr über AI4LT erfahren ↗", footerTagline: "Künstliche Intelligenz für Sprachtechnologien am KIT",
    contact: "Kontakt", legals: "Impressum", privacy: "Datenschutz", accessibility: "Barrierefreiheit",
    launch: "Demo starten", learnMoreDemo: "Mehr erfahren", pending: "Link folgt", access: "Login eventuell erforderlich",
    journeyLive: "Sprache live erleben", journeyInput: "Spracheingabe · Deutsch",
    journeyProcessing: "transkribieren · übersetzen", journeyOutput: "Live-Übersetzung · Englisch",
    journeyAsk: "Jetzt fragen, entdecken, interagieren."
  }
};

let language = localStorage.getItem("ai4lt-language") || (navigator.language.startsWith("de") ? "de" : "en");

function renderDemos() {
  const t = translations[language];
  document.querySelector("#demo-grid").innerHTML = window.AI4LT_DEMOS.map((demo) => {
    const tags = demo.tags[language].map((tag) => `<span>${tag}</span>`).join("");
    const launchAction = demo.url
      ? `<a class="card-action" href="${demo.url}" target="_blank" rel="noreferrer"><span>${t.launch}</span><b aria-hidden="true">↗</b></a>`
      : `<span class="card-action disabled"><span>${t.pending}</span><b aria-hidden="true">—</b></span>`;
    const infoAction = demo.infoUrl
      ? `<a class="card-action secondary" href="${demo.infoUrl}" target="_blank" rel="noreferrer"><span>${t.learnMoreDemo}</span><b aria-hidden="true">↗</b></a>`
      : "";
    const visual = demo.image
      ? `<img class="demo-logo" src="${demo.image}" alt="" />`
      : symbolFor(demo.id);
    const attribution = demo.attribution?.[language];
    const collaboration = attribution
      ? `<p class="card-collaboration">${attribution.prefix} <a href="${demo.attributionUrl}" target="_blank" rel="noreferrer">${attribution.linkLabel}</a>${attribution.suffix}</p>`
      : "";
    return `<article class="demo-card ${demo.tone}">
      <div class="card-top"><span class="demo-number">${demo.number}</span><span class="access-dot">${t.access}</span></div>
      <div class="demo-symbol" aria-hidden="true">${visual}</div>
      <div class="tag-list">${tags}</div><h3>${demo.title}</h3>${collaboration}<p>${demo.description[language]}</p><div class="card-actions">${launchAction}${infoAction}</div>
    </article>`;
  }).join("");
}

function symbolFor(id) {
  return ({
    "lecture-translator": "<i></i><i></i><i></i><i></i><i></i>",
    boom: "<span>BO</span><span>OM</span>", kitcat: "<span class='cat'>◉ ᴗ ◉</span>",
    "beat-the-llm": "<span class='versus'>YOU<br><b>VS</b><br>AI</span>", "babel-fish": "<span class='fish'>◀◉)))</span>"
  })[id];
}

function setLanguage(lang) {
  language = lang;
  localStorage.setItem("ai4lt-language", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.innerHTML = translations[lang][node.dataset.i18n]; });
  document.querySelectorAll("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === lang)));
  renderDemos();
}

document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
setLanguage(language);
