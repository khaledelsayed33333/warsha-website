const langToggle = document.getElementById("langToggle");
const downloadModal = document.getElementById("downloadModal");
let currentLang = "ar";
let previousDownloadFocus = null;

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
  document.querySelectorAll("[data-close-download]").forEach((el) => {
    if (el.classList.contains("download-close")) {
      el.setAttribute("aria-label", isArabic ? "إغلاق نافذة التحميل" : "Close download window");
    }
  });
}
langToggle.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));

function openDownloadModal() {
  previousDownloadFocus = document.activeElement;
  downloadModal.classList.add("is-open");
  downloadModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  const closeButton = downloadModal.querySelector(".download-close");
  if (closeButton) closeButton.focus();
}
function closeDownloadModal() {
  if (!downloadModal.classList.contains("is-open")) return;
  downloadModal.classList.remove("is-open");
  downloadModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (previousDownloadFocus && document.contains(previousDownloadFocus)) previousDownloadFocus.focus();
}
document.querySelectorAll("[data-open-download]").forEach((button) => {
  button.addEventListener("click", openDownloadModal);
});
downloadModal.querySelectorAll("[data-close-download]").forEach((element) => {
  element.addEventListener("click", closeDownloadModal);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDownloadModal();
  if (event.key === "Tab" && downloadModal.classList.contains("is-open")) {
    const controls = [...downloadModal.querySelectorAll("a[href],button:not([disabled])")];
    if (!controls.length) return;
    if (event.shiftKey && document.activeElement === controls[0]) {
      event.preventDefault();
      controls[controls.length - 1].focus();
    } else if (!event.shiftKey && document.activeElement === controls[controls.length - 1]) {
      event.preventDefault();
      controls[0].focus();
    }
  }
});


/* Responsive navigation menu */
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

function closeSiteMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", currentLang === "ar" ? "فتح القائمة" : "Open menu");
  siteNav.classList.remove("is-open");
}
if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", !isOpen
      ? (currentLang === "ar" ? "إغلاق القائمة" : "Close menu")
      : (currentLang === "ar" ? "فتح القائمة" : "Open menu"));
    siteNav.classList.toggle("is-open", !isOpen);
  });
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeSiteMenu);
  });
  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeSiteMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSiteMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) closeSiteMenu();
  });
}
