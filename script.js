/* ==============================
   Script.js — Portfolio Interactions
   ============================== */

'use strict';

// ─── Preloader ────────────────────────────────────────────────────────────────
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const text = document.getElementById('preloaderText');
  const messages = ['Initializing...', 'Loading portfolio...', 'Almost there...', 'Welcome!'];
  let progress = 0;
  let msgIdx = 0;

  document.body.classList.add('preloading');

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress > 100) progress = 100;

    fill.style.width = progress + '%';

    const newIdx = Math.floor((progress / 100) * (messages.length - 1));
    if (newIdx !== msgIdx) {
      msgIdx = newIdx;
      text.textContent = messages[msgIdx];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('preloading');
        startHeroAnimations();
      }, 400);
    }
  }, 80);
})();

// ─── Hero Typing Animation ────────────────────────────────────────────────────
function startHeroAnimations() {
  const phrases = [
    'Software Developer.',
    '.NET Developer.',
    'Web Developer.',
    'Problem Solver.',
    'Quick Learner.',
  ];

  const el = document.getElementById('typingText');
  if (!el) return;

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isPaused) {
      isPaused = false;
      setTimeout(type, 1200);
      return;
    }

    if (!isDeleting) {
      el.textContent = currentPhrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentPhrase.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      el.textContent = currentPhrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 45 : 80;
    setTimeout(type, speed);
  }

  setTimeout(type, 800);
}

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect
  const hoverTargets = document.querySelectorAll('a, button, .glass-card, .skill-card, .edu-card, .social-link, .btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
})();

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// ─── Sticky Navbar ─────────────────────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ─── Hamburger Menu ────────────────────────────────────────────────────────────
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      links.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      btn.classList.remove('active');
      links.classList.remove('open');
    }
  });
})();

// ─── Scroll Reveal (Intersection Observer) ────────────────────────────────────
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ─── Skill Progress Bars ───────────────────────────────────────────────────────
(function initSkillBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.width);
        setTimeout(() => {
          entry.target.style.width = target + '%';
        }, 300);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
})();

// ─── Hero Parallax ─────────────────────────────────────────────────────────────
(function initParallax() {
  const hero = document.querySelector('.hero');
  const orbs = document.querySelectorAll('.hero-orb');
  const heroContent = document.querySelector('.hero-content');

  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) return;

    const ratio = scrollY / window.innerHeight;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.15;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
      heroContent.style.opacity = 1 - ratio * 1.5;
    }
  }, { passive: true });

  // Mouse parallax on hero
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 20;
      const currentTranslateY = window.scrollY * (i + 1) * 0.15;
      orb.style.transform = `translate(${x * factor}px, calc(${currentTranslateY}px + ${y * factor}px))`;
    });
  });
})();

// ─── Back To Top ───────────────────────────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ─── Active Nav Links on Scroll ────────────────────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }, {
    threshold: 0.4,
  });

  sections.forEach(section => observer.observe(section));
})();

// ─── Contact Form ──────────────────────────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Change this to your backend URL when deployed
  const API_URL = 'http://localhost:8000';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const originalContent = btn.innerHTML;

    const inputs = form.querySelectorAll('input, textarea');
    const [nameEl, emailEl, subjectEl, messageEl] = inputs;

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameEl.value,
          email: emailEl.value,
          subject: subjectEl.value,
          message: messageEl.value,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        btn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Message Sent!</span>`;
        btn.style.background = '#4ade80';
        btn.style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.4)';
        form.reset();
      } else {
        throw new Error(data.detail || 'Something went wrong');
      }
    } catch (err) {
      btn.innerHTML = `<span>Failed. Try again.</span>`;
      btn.style.background = '#f87171';
    }

    setTimeout(() => {
      btn.innerHTML = originalContent;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 3000);
  });
})();

// ─── Timeline Entrance ────────────────────────────────────────────────────────
(function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
})();

// ─── Smooth Anchor Scrolling ──────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Glitch Effect on Logo Hover ──────────────────────────────────────────────
(function initLogoGlitch() {
  const logos = document.querySelectorAll('.nav-logo, .footer-logo, .preloader-logo');

  logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      logo.style.transition = 'none';
      let count = 0;
      const glitch = setInterval(() => {
        logo.style.textShadow = count % 2 === 0
          ? '2px 0 var(--accent), -2px 0 rgba(99,102,241,0.8)'
          : 'none';
        count++;
        if (count > 6) {
          clearInterval(glitch);
          logo.style.textShadow = '';
          logo.style.transition = '';
        }
      }, 60);
    });
  });
})();

// ─── Card Tilt Effect ────────────────────────────────────────────────────────
(function initTilt() {
  const cards = document.querySelectorAll('.glass-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -8;
      const tiltY = x * 8;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ─── Number Counter Animation ────────────────────────────────────────────────
(function initCounters() {
  const stats = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent.replace(/\D/g, ''));
        const suffix = el.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const duration = 1200;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.round(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 1 });

  stats.forEach(stat => observer.observe(stat));
})();
