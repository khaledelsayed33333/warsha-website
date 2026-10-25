let currentLang = 'ar';
const langButton = document.getElementById('language');
langButton.addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  const arabic = currentLang === 'ar';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = arabic ? 'rtl' : 'ltr';
  document.body.classList.toggle('en', !arabic);
  document.querySelectorAll('[data-ar][data-en]').forEach((element) => {
    element.textContent = element.dataset[arabic ? 'ar' : 'en'];
  });
  langButton.textContent = arabic ? 'EN' : 'AR';
});