const preferredLanguage = localStorage.getItem("ai4lt-language") || (navigator.language.startsWith("de") ? "de" : "en");
function showLanguage(language) {
  localStorage.setItem("ai4lt-language", language);
  document.documentElement.lang = language;
  document.querySelectorAll("[data-language]").forEach((section) => section.classList.toggle("active", section.dataset.language === language));
  document.querySelectorAll("[data-lang]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
  document.querySelector(".back").textContent = language === "de" ? "← Zurück zu den Demos" : "← Back to demos";
}
document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => showLanguage(button.dataset.lang)));
showLanguage(preferredLanguage);
