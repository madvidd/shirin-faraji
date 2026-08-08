const backToTop = document.getElementById('backToTop');

const setBackToTopVisibility = () => {
  backToTop.classList.toggle('show', window.scrollY > 450);
};

window.addEventListener('scroll', setBackToTopVisibility, { passive: true });
setBackToTopVisibility();

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
      if (isCurrent) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.15, 0.5] });

  sections.forEach((section) => observer.observe(section));
}
