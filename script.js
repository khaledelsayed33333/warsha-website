'use strict';
const langButton = document.getElementById('lang');
const menuButton = document.getElementById('menu');
const nav = document.getElementById('nav');
const modal = document.getElementById('modal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let language = 'ar';
let previousFocus = null;

function setLanguage(next) {
  language = next;
  const english = next === 'en';
  document.documentElement.lang = next;
  document.documentElement.dir = english ? 'ltr' : 'rtl';
  document.querySelectorAll('[data-ar][data-en]').forEach(element => { element.textContent = element.dataset[next]; });
  // Rich heading markup is preserved by updating only the translated phrase.
  const intro = document.querySelector('.intro-title');
  intro.innerHTML = english ? 'FOCUS ON THE WORK. <em>NOT THE MATH.</em>' : 'فكّر في شغلك، <em>مش في الحسبة.</em>';
  langButton.innerHTML = english ? 'عربي <span class="language-icon">↗</span>' : 'EN <span class="language-icon">↗</span>';
  langButton.setAttribute('aria-label', english ? 'التبديل للعربية' : 'Switch to English');
  menuButton.setAttribute('aria-label', english ? 'Open menu' : 'فتح القائمة');
  calculate();
}
langButton.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', e => { if (!e.target.closest('.header-inner')) closeMenu(); });
function openModal() {
  closeMenu(); previousFocus = document.activeElement;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-lock');
  modal.querySelector('.modal-close').focus();
}
function closeModal() {
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-lock');
  if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
}
document.querySelectorAll('[data-open-modal]').forEach(el => el.addEventListener('click', openModal));
document.querySelectorAll('[data-open-modal-link]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); openModal(); }));
modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); closeModal(); }
  if (e.key === 'Tab' && modal.classList.contains('open')) {
    const controls = [...modal.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])')];
    if (!controls.length) return;
    if (e.shiftKey && document.activeElement === controls[0]) { e.preventDefault(); controls.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === controls.at(-1)) { e.preventDefault(); controls[0].focus(); }
  }
});
const teethInput = document.getElementById('teeth');
const moduleInput = document.getElementById('module');
const answer = document.getElementById('answer');
const error = document.getElementById('error');
function calculate() {
  const teeth = Number(teethInput.value);
  const module = Number(moduleInput.value);
  const valid = teethInput.value.trim() && moduleInput.value.trim() && Number.isInteger(teeth) && teeth >= 1 && teeth <= 10000 && Number.isFinite(module) && module >= .01 && module <= 1000;
  if (!valid) {
    answer.textContent = '—';
    error.textContent = language === 'ar' ? 'ادخل عدد أسنان صحيح وموديول قيمته 0.01 أو أكتر.' : 'Enter a whole tooth count and a module of at least 0.01.';
    return;
  }
  answer.textContent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 }).format(teeth * module);
  error.textContent = '';
}
[teethInput, moduleInput].forEach(el => el.addEventListener('input', calculate));
document.getElementById('calculator-form').addEventListener('submit', e => { e.preventDefault(); calculate(); });
calculate();
const progress = document.getElementById('progress');
let pending = false;
function onScroll() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (total <= 0 ? 0 : Math.min(100, (window.scrollY / total) * 100)) + '%';
    pending = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .1, rootMargin: '0px 0px -35px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
document.getElementById('year').textContent = String(new Date().getFullYear());