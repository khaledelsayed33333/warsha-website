/* ============================================================
   WARSHA - Landing Page
   Interactions: Hamburger menu, language toggle (RTL/LTR),
   Download modal (Escape/overlay close), smooth scroll, focus mgmt.
   ============================================================ */
(function () {
  "use strict";

  // ============== i18n dictionary ==============
  const I18N = {
    ar: {
      skipToContent: "تخطّي إلى المحتوى",
      logoTagline: "أدوات هندسية بين يديك",
      navAbout: "عن التطبيق",
      navFeatures: "المميزات",
      navTools: "الأدوات",
      navDownload: "التحميل",
      heroEyebrow: "تطبيق هندسي احترافي للورش",
      heroSubtitle: "أدوات هندسية بين يديك",
      heroDesc: "تطبيق متخصص في الحسابات والأدوات الهندسية المستخدمة في الورش، يجمع بين التروس والمخرطة والمثقاب في واجهة واحدة عملية وسريعة.",
      heroDownload: "تحميل",
      heroExplore: "اكتشف المميزات",
      heroBadge1: "تروس · مخرطة · مثقاب",
      heroBadge2: "يعمل دون اتصال",
      heroBadge3: "تطبيق مدفوع",
      mockHello: "أهلاً بك",
      mockSub: "اختر أداة للبدء",
      mockCard1: "التروس",
      mockCard2: "المخرطة",
      mockCard3: "المثقاب",
      mockCalcModule: "الترس: نمطي",
      mockCalcRpm: "السرعة (RPM)",
      mockCalcFeed: "التغذية (mm/rev)",
      aboutEyebrow: "عن التطبيق",
      aboutTitle: "ما هو WARSHA؟",
      aboutLead: "WARSHA هو تطبيق مدفوع صُمّم خصيصًا للفنيين والمهندسين العاملين في الورش، يوفر مجموعة من الأدوات والحسابات الهندسية اليومية في واجهة منظمة وسهلة الاستخدام.",
      aboutCard1Title: "أدوات متخصصة",
      aboutCard1Desc: "ثلاث مجموعات رئيسية تغطي حسابات التروس والخراطة والثقب، مبنية على معادلات هندسية معتمدة.",
      aboutCard2Title: "سريع وعملي",
      aboutCard2Desc: "واجهة مباشرة بلا خطوات زائدة، تفتح الأداة المطلوبة فورًا وتعرض النتائج بوضوح.",
      aboutCard3Title: "يعمل دون اتصال",
      aboutCard3Desc: "كل الحسابات تتم محليًا على جهازك، لا حاجة للإنترنت بعد تثبيت التطبيق.",
      featuresEyebrow: "المميزات",
      featuresTitle: "ثلاث مجموعات هندسية أساسية",
      featuresLead: "تم تنظيم أدوات التطبيق في ثلاث مجموعات تغطي أكثر العمليات شيوعًا في الورش الهندسية.",
      featureGearsTitle: "التروس",
      featureGearsDesc: "مجموعة أدوات وحسابات للتروس تشمل الموديول، عدد الأسنان، نسبة التروس، والسرعات الزاوية.",
      featureGearsItem1: "حساب الموديول وخطوة الملعب",
      featureGearsItem2: "نسبة التروس وسرعة الخرج",
      featureGearsItem3: "قطر المرجع وقطر القاعدة",
      featureLatheTitle: "المخرطة",
      featureLatheDesc: "حسابات الخراطة من سرعة القطع، معدل التغذية، وقت التشغيل، إلى حساب العمق والتمريرات.",
      featureLatheItem1: "سرعة القطع (Vc) وعدد الدورات (RPM)",
      featureLatheItem2: "معدل التغذية وزمن التشغيل",
      featureLatheItem3: "حساب عمق القطع والتمريرات",
      featureDrillTitle: "المثقاب",
      featureDrillDesc: "حسابات الثقب والقياسات: قطر الثقب، عمق الثقب، سرعة القِطع، ومعدل التغذية لكل ثقب.",
      featureDrillItem1: "سرعة القطع والتغذية (mm/rev)",
      featureDrillItem2: "عمق الثقب وزمن الثقب",
      featureDrillItem3: "جدول أحجام المثاقب القياسية",
      engEyebrow: "الأدوات والحسابات",
      engTitle: "حسابات هندسية عملية",
      engLead: "عرض للأدوات والحسابات المتوفرة فعليًا في التطبيق. الأمثلة الرقمية أدناه توضيحية فقط ولا تمثل نتائج حقيقية.",
      engTagGears: "تروس",
      engTagLathe: "مخرطة",
      engTagDrill: "مثقاب",
      engGearsTitle: "حساب سرعة الخرج",
      engGearsDesc: "من عدد أسنان الترس القائد والتابع وسرعة الدخل، يحسب التطبيق سرعة الخرج ونسبة التروس.",
      engGearsFormula: "n₂ = (n₁ × z₁) / z₂",
      engExampleLabel: "مثال توضيحي:",
      engGearsExample: "n₁ = 1450 rpm, z₁ = 20, z₂ = 40 ← n₂ = 725 rpm",
      engLatheTitle: "حساب عدد الدورات (RPM)",
      engLatheDesc: "من سرعة القطع (Vc) وقطر المشغول (D)، يحسب التطبيق عدد الدورات المناسب للعملية.",
      engLatheFormula: "RPM = (1000 × Vc) / (π × D)",
      engLatheExample: "Vc = 150 m/min, D = 50 mm ← RPM ≈ 955",
      engDrillTitle: "حساب زمن الثقب",
      engDrillDesc: "من عمق الثقب، عدد الدورات، ومعدل التغذية، يحسب التطبيق زمن الثقب المتوقع.",
      engDrillFormula: "t = L / (RPM × f)",
      engDrillExample: "L = 25 mm, RPM = 1000, f = 0.1 ← t = 0.25 min",
      engNote: "الأرقام في الأمثلة أعلاه للتوضيح فقط، والنتائج الفعلية قد تختلف حسب المواد والظروف.",
      downloadEyebrow: "التحميل",
      downloadTitle: "حمّل WARSHA الآن",
      downloadDesc: "التطبيق متاح لأجهزة Android و Windows. نسخة iOS قيد التطوير. التطبيق مدفوع، التفاصيل تظهر داخل التطبيق.",
      downloadChoose: "اختر نظام التشغيل",
      downloadSeeFeatures: "راجع المميزات",
      comingSoon: "قريبًا",
      osDownload: "تحميل",
      osComingSoon: "قيد التطوير",
      osFormatApk: "APK",
      osFormatZip: "ZIP",
      footerTagline: "أدوات هندسية بين يديك",
      footerRights: "جميع الحقوق محفوظة.",
      backToTop: "↑ العودة للأعلى",
      modalTitle: "اختر نظام التشغيل",
      modalDesc: "التطبيق مدفوع. روابط التحميل أدناه، التفاصيل داخل التطبيق.",
      modalNote: "التطبيق مدفوع. للاطلاع على التفاصيل والشراء، افتح التطبيق بعد التثبيت أو تواصل مع المصدر الذي حصلت منه على الرابط.",
      langSwitchedTo: "تم التبديل إلى الإنجليزية",
      langLabel: "EN"
    },
    en: {
      skipToContent: "Skip to content",
      logoTagline: "Engineering tools at your fingertips",
      navAbout: "About",
      navFeatures: "Features",
      navTools: "Tools",
      navDownload: "Download",
      heroEyebrow: "Professional engineering app for workshops",
      heroSubtitle: "Engineering tools at your fingertips",
      heroDesc: "An app specialized in engineering calculations and tools used in workshops, combining gears, lathe and drilling in one practical, fast interface.",
      heroDownload: "Download",
      heroExplore: "Discover features",
      heroBadge1: "Gears · Lathe · Drill",
      heroBadge2: "Works offline",
      heroBadge3: "Paid app",
      mockHello: "Welcome",
      mockSub: "Pick a tool to start",
      mockCard1: "Gears",
      mockCard2: "Lathe",
      mockCard3: "Drill",
      mockCalcModule: "Gear: module",
      mockCalcRpm: "Speed (RPM)",
      mockCalcFeed: "Feed (mm/rev)",
      aboutEyebrow: "About the app",
      aboutTitle: "What is WARSHA?",
      aboutLead: "WARSHA is a paid app designed specifically for technicians and engineers working in workshops, providing a set of daily engineering calculations and tools in an organized, easy-to-use interface.",
      aboutCard1Title: "Specialized tools",
      aboutCard1Desc: "Three main groups covering gear, lathe and drilling calculations, built on approved engineering formulas.",
      aboutCard2Title: "Fast & practical",
      aboutCard2Desc: "Direct interface with no extra steps, opens the required tool instantly and shows results clearly.",
      aboutCard3Title: "Works offline",
      aboutCard3Desc: "All calculations run locally on your device, no internet needed after installation.",
      featuresEyebrow: "Features",
      featuresTitle: "Three core engineering groups",
      featuresLead: "The app's tools are organized into three groups covering the most common operations in engineering workshops.",
      featureGearsTitle: "Gears",
      featureGearsDesc: "A set of gear tools and calculations including module, number of teeth, gear ratio and angular speeds.",
      featureGearsItem1: "Module and pitch step calculation",
      featureGearsItem2: "Gear ratio and output speed",
      featureGearsItem3: "Reference diameter and base diameter",
      featureLatheTitle: "Lathe",
      featureLatheDesc: "Lathe calculations from cutting speed, feed rate, run time, to depth and pass calculations.",
      featureLatheItem1: "Cutting speed (Vc) and RPM",
      featureLatheItem2: "Feed rate and run time",
      featureLatheItem3: "Cut depth and passes calculation",
      featureDrillTitle: "Drill",
      featureDrillDesc: "Drilling calculations and measurements: hole diameter, hole depth, cutting speed and feed rate per hole.",
      featureDrillItem1: "Cutting speed and feed (mm/rev)",
      featureDrillItem2: "Hole depth and drilling time",
      featureDrillItem3: "Standard drill sizes chart",
      engEyebrow: "Tools & calculations",
      engTitle: "Practical engineering calculations",
      engLead: "A view of the actual tools and calculations available in the app. The numerical examples below are illustrative only and do not represent real results.",
      engTagGears: "Gears",
      engTagLathe: "Lathe",
      engTagDrill: "Drill",
      engGearsTitle: "Output speed calculation",
      engGearsDesc: "From the number of teeth on the driving and driven gears and the input speed, the app calculates the output speed and gear ratio.",
      engGearsFormula: "n₂ = (n₁ × z₁) / z₂",
      engExampleLabel: "Illustrative example:",
      engGearsExample: "n₁ = 1450 rpm, z₁ = 20, z₂ = 40 ← n₂ = 725 rpm",
      engLatheTitle: "RPM calculation",
      engLatheDesc: "From cutting speed (Vc) and workpiece diameter (D), the app calculates the suitable RPM for the operation.",
      engLatheFormula: "RPM = (1000 × Vc) / (π × D)",
      engLatheExample: "Vc = 150 m/min, D = 50 mm ← RPM ≈ 955",
      engDrillTitle: "Drilling time calculation",
      engDrillDesc: "From hole depth, RPM and feed rate, the app calculates the expected drilling time.",
      engDrillFormula: "t = L / (RPM × f)",
      engDrillExample: "L = 25 mm, RPM = 1000, f = 0.1 ← t = 0.25 min",
      engNote: "The numbers in the examples above are for illustration only; actual results may vary based on materials and conditions.",
      downloadEyebrow: "Download",
      downloadTitle: "Download WARSHA now",
      downloadDesc: "The app is available for Android and Windows. iOS version is under development. The app is paid; details appear inside the app.",
      downloadChoose: "Choose operating system",
      downloadSeeFeatures: "Review features",
      comingSoon: "Coming soon",
      osDownload: "Download",
      osComingSoon: "In development",
      osFormatApk: "APK",
      osFormatZip: "ZIP",
      footerTagline: "Engineering tools at your fingertips",
      footerRights: "All rights reserved.",
      backToTop: "↑ Back to top",
      modalTitle: "Choose operating system",
      modalDesc: "The app is paid. Download links are below; details are inside the app.",
      modalNote: "The app is paid. To view details and purchase, open the app after installation or contact the source from which you obtained the link.",
      langSwitchedTo: "Switched to Arabic",
      langLabel: "AR"
    }
  };

  // ============== DOM ready ==============
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    const html = document.documentElement;
    const body = document.body;

    // -------- Cache key elements --------
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const nav = document.getElementById("primaryNav");
    const navLinks = nav ? nav.querySelectorAll(".nav__link") : [];
    const langToggleMobile = document.getElementById("langToggle");
    const langToggleDesktop = document.querySelector(".lang-toggle--desktop");
    const langLabelMobile = document.getElementById("langLabel");
    const langLabelDesktop = document.getElementById("langLabelDesktop");
    const heroDownloadBtn = document.getElementById("heroDownloadBtn");
    const ctaDownloadBtn = document.getElementById("ctaDownloadBtn");
    const modal = document.getElementById("downloadModal");
    const modalOverlay = modal ? modal.querySelector(".modal__overlay") : null;
    const modalClose = modal ? modal.querySelector(".modal__close") : null;
    const toast = document.getElementById("toast");
    const yearEl = document.getElementById("year");

    // -------- Year in footer --------
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ============== Language switching ==============
    function applyLanguage(lang) {
      const dict = I18N[lang];
      if (!dict) return;

      // Set <html lang> and <html dir>
      html.setAttribute("lang", lang);
      html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      html.setAttribute("data-lang", lang);

      // Translate all [data-i18n] elements
      document.querySelectorAll("[data-i18n]").forEach(function (el) {
        const key = el.getAttribute("data-i18n");
        if (dict[key] !== undefined) {
          // Preserve any child elements (icons etc.)
          el.textContent = dict[key];
        }
      });

      // Update lang toggle labels
      if (langLabelMobile) langLabelMobile.textContent = dict.langLabel;
      if (langLabelDesktop) langLabelDesktop.textContent = dict.langLabel;

      // Update aria-label on hamburger
      if (hamburgerBtn) {
        hamburgerBtn.setAttribute("aria-label", lang === "ar" ? "فتح القائمة" : "Open menu");
      }

      // Persist
      try {
        localStorage.setItem("warsha-lang", lang);
      } catch (e) { /* ignore */ }

      // Notify screen readers via toast (subtle)
      showToast(dict.langSwitchedTo);
    }

    function toggleLanguage() {
      const current = html.getAttribute("data-lang") || "ar";
      const next = current === "ar" ? "en" : "ar";
      applyLanguage(next);
    }

    if (langToggleMobile) langToggleMobile.addEventListener("click", toggleLanguage);
    if (langToggleDesktop) langToggleDesktop.addEventListener("click", toggleLanguage);

    // Restore saved language
    try {
      const saved = localStorage.getItem("warsha-lang");
      if (saved && saved !== "ar") applyLanguage(saved);
    } catch (e) { /* ignore */ }

    // ============== Toast ==============
    let toastTimer = null;
    function showToast(msg) {
      if (!toast || !msg) return;
      toast.textContent = msg;
      toast.hidden = false;
      // Force reflow
      void toast.offsetWidth;
      toast.setAttribute("data-show", "true");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.setAttribute("data-show", "false");
        setTimeout(function () { toast.hidden = true; }, 300);
      }, 2000);
    }

    // ============== Hamburger menu ==============
    let lastFocusedBeforeMenu = null;

    function openMenu() {
      if (!nav || !hamburgerBtn) return;
      lastFocusedBeforeMenu = document.activeElement;
      nav.setAttribute("data-open", "true");
      hamburgerBtn.setAttribute("aria-expanded", "true");
      // Trap focus inside menu (basic)
      const firstLink = nav.querySelector(".nav__link, .lang-toggle");
      if (firstLink) setTimeout(function () { firstLink.focus(); }, 100);
    }

    function closeMenu() {
      if (!nav || !hamburgerBtn) return;
      nav.setAttribute("data-open", "false");
      hamburgerBtn.setAttribute("aria-expanded", "false");
      if (lastFocusedBeforeMenu && typeof lastFocusedBeforeMenu.focus === "function") {
        lastFocusedBeforeMenu.focus();
      }
    }

    function isMenuOpen() {
      return nav && nav.getAttribute("data-open") === "true";
    }

    if (hamburgerBtn) {
      hamburgerBtn.addEventListener("click", function () {
        if (isMenuOpen()) closeMenu();
        else openMenu();
      });
    }

    // Close menu when any nav link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 720px)").matches) closeMenu();
      });
    });

    // Close menu on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (isMenuOpen()) {
          closeMenu();
        }
      }
    });

    // Close menu on resize when crossing to desktop
    let resizeTimer = null;
    window.addEventListener("resize", function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth > 720 && isMenuOpen()) {
          closeMenu();
        }
      }, 150);
    });

    // Click outside menu to close (on mobile)
    document.addEventListener("click", function (e) {
      if (!isMenuOpen()) return;
      if (nav && nav.contains(e.target)) return;
      if (hamburgerBtn && hamburgerBtn.contains(e.target)) return;
      closeMenu();
    });

    // ============== Download modal ==============
    let lastFocusedBeforeModal = null;

    function openModal() {
      if (!modal) return;
      lastFocusedBeforeModal = document.activeElement;
      modal.hidden = false;
      // Force reflow so transition runs
      void modal.offsetWidth;
      modal.setAttribute("data-open", "true");
      body.classList.add("modal-open");
      // Focus first focusable inside modal
      const focusable = modal.querySelector("button, a[href], input, [tabindex]");
      if (focusable) setTimeout(function () { focusable.focus(); }, 100);
    }

    function closeModal() {
      if (!modal) return;
      modal.setAttribute("data-open", "false");
      body.classList.remove("modal-open");
      // Hide after transition (use animationend or timeout)
      setTimeout(function () {
        modal.hidden = true;
        if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
          lastFocusedBeforeModal.focus();
        }
      }, 280);
    }

    function isModalOpen() {
      return modal && modal.getAttribute("data-open") === "true";
    }

    if (heroDownloadBtn) heroDownloadBtn.addEventListener("click", openModal);
    if (ctaDownloadBtn) ctaDownloadBtn.addEventListener("click", openModal);
    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    // Escape closes modal (and menu, handled above)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isModalOpen()) {
        e.preventDefault();
        closeModal();
      }
    });

    // Focus trap inside modal
    document.addEventListener("keydown", function (e) {
      if (!isModalOpen() || e.key !== "Tab") return;
      const focusables = modal.querySelectorAll(
        'button:not([disabled]), a[href]:not([aria-disabled="true"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    // ============== Smooth scroll & active link ==============
    // Use CSS scroll-behavior: smooth + scroll-padding-top. Intercept hash clicks for older browsers.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        const href = link.getAttribute("href");
        if (!href || href === "#" || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash without jumping
        try {
          history.pushState(null, "", href);
        } catch (err) { /* ignore */ }
        // Move focus for accessibility
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });

    // ============== Back to top ==============
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // ============== Horizontal overflow guard ==============
    // Detect REAL page-level horizontal overflow (not false positives from
    // elements that are inside clipped containers, hidden, or transformed off-screen).
    function checkOverflow() {
      const docWidth = document.documentElement.clientWidth;
      const offenders = [];

      function isInsideClipped(el) {
        let p = el.parentElement;
        while (p && p !== document.body) {
          const cs = getComputedStyle(p);
          if (cs.overflow === "hidden" || cs.overflowX === "hidden" ||
              cs.overflow === "clip" || cs.overflowX === "clip" ||
              cs.overflowX === "auto" || cs.overflowX === "scroll" ||
              cs.overflow === "auto" || cs.overflow === "scroll") return true;
          p = p.parentElement;
        }
        return false;
      }

      document.querySelectorAll("body *").forEach(function (el) {
        if (el === document.body || el === document.documentElement) return;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" ||
            cs.visibility === "collapse" || parseFloat(cs.opacity) === 0) return;
        if (isInsideClipped(el)) return;
        // Skip decorative background elements (clipped by .bg-decoration)
        if (el.classList && (el.classList.contains("bg-glow") ||
            el.classList.contains("bg-decoration") || el.classList.contains("bg-grid"))) return;
        // Skip transformed elements (mobile menu, modal when closed, animations)
        if (cs.transform && cs.transform !== "none") return;

        const rect = el.getBoundingClientRect();
        if (rect.right > docWidth + 1 || rect.left < -1) {
          offenders.push({
            tag: el.tagName,
            cls: el.className && el.className.toString ? el.className.toString().slice(0, 60) : "",
            right: rect.right,
            left: rect.left,
            width: rect.width
          });
        }
      });
      if (offenders.length > 0 && window.console && console.warn) {
        console.warn("WARSHA: horizontal overflow detected on elements:", offenders);
      }
    }
    // Run after fonts/layout settle
    window.addEventListener("load", function () {
      setTimeout(checkOverflow, 600);
    });

    // ============== Orientation change handling ==============
    // On orientation change, reset scroll offsets that might cause issues
    window.addEventListener("orientationchange", function () {
      // Slight delay to let layout settle
      setTimeout(function () {
        // Force a layout re-check by re-measuring the body width
        document.documentElement.style.setProperty("--vh-orient", window.innerHeight + "px");
      }, 200);
    });

    // ============== Initial state ==============
    if (modal) {
      modal.hidden = true;
      modal.setAttribute("data-open", "false");
    }
    if (nav) {
      nav.setAttribute("data-open", "false");
    }
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }

    // Console banner
    if (window.console && console.info) {
      console.info("%c WARSHA %c Landing page ready", 
        "background:#0f766e;color:#e6f4f1;padding:2px 8px;border-radius:4px;font-weight:bold;",
        "color:#5eead4;");
    }
  });
})();
