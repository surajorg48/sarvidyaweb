// ===== SARVIDYA COLLEGE - MAIN SCRIPT =====

// Navbar scroll effect
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  const btn = document.getElementById('scrollTop');
  if (btn) btn.classList.toggle('show', window.scrollY > 300);
});

// Scroll to top
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count.toLocaleString() + suffix;
    if (count >= target) clearInterval(timer);
  }, 30);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.counter-section, .hero-stats').forEach(el => counterObserver.observe(el));

// Hero slider auto-play (Bootstrap carousel)
const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  new bootstrap.Carousel(heroCarousel, { interval: 5000, ride: 'carousel' });
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
});

// Lightbox for gallery (simple)
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
    const i = document.createElement('img');
    i.src = img.src;
    i.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
    modal.appendChild(i);
    modal.addEventListener('click', () => modal.remove());
    document.body.appendChild(modal);
  });
});

// Form submit (demo)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check me-2"></i>Submitted!';
      btn.disabled = true;
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 3000);
    }
  });
});
