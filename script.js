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
const downloadModal = document.getElementById('download-modal');
const openDownloadModal = () => {
  if (!downloadModal) return;
  downloadModal.classList.add('open');
  downloadModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const closeButton = downloadModal.querySelector('.modal-close');
  if (closeButton) closeButton.focus();
};
const closeDownloadModal = () => {
  if (!downloadModal) return;
  downloadModal.classList.remove('open');
  downloadModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};
const downloadNav = document.getElementById('nav-download');
if (downloadNav) downloadNav.addEventListener('click', (event) => {
  event.preventDefault();
  openDownloadModal();
});
if (downloadModal) {
  downloadModal.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeDownloadModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDownloadModal();
  });
}
