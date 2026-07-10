const searchInput = document.querySelector('#searchInput');
const searchable = Array.from(document.querySelectorAll('[data-search]'));
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const sections = Array.from(document.querySelectorAll('.chapter'));
const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxButton = lightbox.querySelector('button');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  searchable.forEach((node) => {
    const haystack = `${node.dataset.search || ''} ${node.textContent || ''}`.toLowerCase();
    node.classList.toggle('hidden-by-search', query && !haystack.includes(query));
  });
});

window.addEventListener('scroll', () => {
  const current = sections.findLast((section) => section.getBoundingClientRect().top < 140);
  if (!current) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
});

document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}

lightboxButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
