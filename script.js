'use strict';

const root = document.documentElement;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!prefersReducedMotion.matches) root.classList.add('js');

// In-page bilingual copy, without any external framework or translation requests.
const languageButton = document.getElementById('language');
const menuButton = document.getElementById('menu-toggle');
const navigation = document.getElementById('site-nav');
const modal = document.getElementById('download-modal');
let currentLang = 'ar';
let previousFocus = null;

function setLanguage(lang, save = true) {
  currentLang = lang === 'en' ? 'en' : 'ar';
  root.lang = currentLang;
  root.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    // Only static, authored elements have HTML line breaks / emphasis in these attributes.
    if (el.matches('h2')) el.innerHTML = el.dataset[currentLang];
    else el.textContent = el.dataset[currentLang];
  });
  languageButton.innerHTML = currentLang === 'ar' ? 'EN <span aria-hidden="true">↗</span>' : 'AR <span aria-hidden="true">↗</span>';
  languageButton.setAttribute('aria-label', currentLang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية');
  menuButton.setAttribute('aria-label', currentLang === 'ar' ? 'فتح القائمة' : 'Open navigation');
  document.querySelector('.modal-close').setAttribute('aria-label', currentLang === 'ar' ? 'إغلاق النافذة' : 'Close dialog');
  document.querySelectorAll('.tool-card').forEach((card, i) => {
    const names = currentLang === 'ar' ? ['التروس', 'المخرطة', 'المثقاب'] : ['Gears', 'Lathe', 'Drill'];
    card.setAttribute('aria-label', currentLang === 'ar' ? `${names[i]} — شاهد التطبيق` : `${names[i]} — see the app`);
  });
  try { if (save) window.localStorage.setItem('warsha-language', currentLang); } catch (_) { /* Private browsing */ }
  updateGearResult();
}


function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}
menuButton.addEventListener('click', () => {
  const next = menuButton.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', next);
  menuButton.setAttribute('aria-expanded', String(next));
  document.body.classList.toggle('menu-open', next);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 880) closeMenu(); }, { passive: true });

// A11y: keep keyboard focus inside the dialog, restore it on close.
function openModal() {
  if (modal.classList.contains('open')) return;
  closeMenu();
  previousFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}
function closeModal() {
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
}
document.querySelectorAll('[data-open-modal]').forEach(button => button.addEventListener('click', openModal));
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { if (modal.classList.contains('open')) closeModal(); else closeMenu(); }
  if (event.key !== 'Tab' || !modal.classList.contains('open')) return;
  const elements = [...modal.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')].filter(el => el.offsetParent !== null);
  if (!elements.length) return;
  const first = elements[0], last = elements[elements.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

// Real demo: for a standard spur gear, pitch diameter d [mm] = module [mm] * teeth count.
const teethInput = document.getElementById('teeth-count');
const moduleInput = document.getElementById('module-size');
const resultElement = document.getElementById('gear-result');
const errorElement = document.getElementById('calc-error');
const gearPath = document.getElementById('gear-path');
const gearForm = document.getElementById('gear-form');
gearForm.addEventListener('submit', event => event.preventDefault());

function makeGearPath(count) {
  // Visual teeth are limited independently of the actual calculation for readability.
  const n = Math.max(12, Math.min(48, count));
  const cx = 140, cy = 140;
  const pts = [];
  for (let i = 0; i < n * 4; i++) {
    const a = -Math.PI / 2 + i * Math.PI / (n * 2);
    const r = (i % 4 === 1 || i % 4 === 2) ? 115 : 101;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`);
  }
  // The inner circle has its own path and the SVG uses evenodd fill for a hub cutout.
  return `M${pts.join(' L')} Z M 140,140 m -46,0 a 46,46 0 1,0 92,0 a 46,46 0 1,0 -92,0 Z`;
}
function updateGearResult() {
  const z = Number(teethInput.value);
  const m = Number(moduleInput.value);
  const valid = teethInput.value.trim() !== '' && moduleInput.value.trim() !== '' && Number.isInteger(z) && z >= 1 && z <= 10000 && Number.isFinite(m) && m > 0 && m <= 1000;
  if (!valid) {
    resultElement.textContent = '—';
    errorElement.textContent = currentLang === 'ar' ? 'اكتب عدد أسنان صحيح وموديول أكبر من صفر.' : 'Enter a whole tooth count and a module greater than zero.';
    return;
  }
  const diameter = z * m;
  resultElement.textContent = diameter.toLocaleString(currentLang === 'ar' ? 'en-US' : 'en-US', {maximumFractionDigits: 3});
  errorElement.textContent = '';
  gearPath.setAttribute('d', makeGearPath(z));
}
[teethInput, moduleInput].forEach(input => input.addEventListener('input', updateGearResult));
updateGearResult();
try { const saved = window.localStorage.getItem('warsha-language'); if (saved === 'en') setLanguage('en', false); } catch (_) { /* unavailable */ }
languageButton.addEventListener('click', () => setLanguage(currentLang === 'ar' ? 'en' : 'ar'));

// Efficient reveal, scroll progress, and active navigation.
const header = document.getElementById('site-header');
const progress = document.querySelector('.scroll-progress');
const navLinks = [...navigation.querySelectorAll('a')];
let scrollScheduled = false;
function updateScroll() {
  scrollScheduled = false;
  header.classList.toggle('scrolled', window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) { requestAnimationFrame(updateScroll); scrollScheduled = true; }
}, {passive: true});
updateScroll();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    });
  }, {threshold: .08, rootMargin: '0px 0px 50px 0px'});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, {rootMargin: '-28% 0px -65% 0px'});
  ['about', 'tools', 'calculator', 'preview'].forEach(id => sectionObserver.observe(document.getElementById(id)));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

const hero = document.querySelector('.hero');
let pointerTick = false;
hero.addEventListener('pointermove', event => {
  if (prefersReducedMotion.matches || event.pointerType === 'touch' || pointerTick) return;
  pointerTick = true;
  requestAnimationFrame(() => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width * 100).toFixed(1)}%`);
    hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height * 100).toFixed(1)}%`);
    pointerTick = false;
  });
}, {passive: true});

// Pause muted background media when not visible or reduced-motion is enabled.
const video = document.getElementById('hero-video');
const applyMotionPreference = () => {
  if (prefersReducedMotion.matches) video.pause();
  else if (document.visibilityState === 'visible' && hero.getBoundingClientRect().bottom > 0) video.play().catch(() => {});
};
applyMotionPreference();
prefersReducedMotion.addEventListener?.('change', applyMotionPreference);
document.addEventListener('visibilitychange', applyMotionPreference);
if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (!visible || prefersReducedMotion.matches) video.pause();
    else if (document.visibilityState === 'visible') video.play().catch(() => {});
  }, {threshold: 0});
  videoObserver.observe(hero);
}

const year = document.getElementById('year');
year.textContent = String(new Date().getFullYear());