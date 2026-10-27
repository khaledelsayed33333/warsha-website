const langToggle = document.getElementById("langToggle");
let currentLang = "ar";

function setLanguage(lang) {
  currentLang = lang;
  const isArabic = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.lang = lang;
  document.body.dir = isArabic ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
    el.textContent = el.dataset[isArabic ? "ar" : "en"];
  });
  langToggle.textContent = isArabic ? "EN" : "AR";
  langToggle.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
}
langToggle.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));
