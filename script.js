/* ============================================================
   CHURCH OF GOD (T.J.R) — WEBSITE JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   0. MASTHEAD DATELINE — prints today's date, newspaper-style
   ============================================================ */
(function setMastheadDate() {
  const el = document.getElementById('mastheadDate');
  if (!el) return;
  const today = new Date();
  const formatted = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  el.textContent = `Jerusalem, Israel  \u2014  ${formatted}`;
})();

/* ============================================================
   1. HERO TYPING ANIMATION
   ============================================================ */

/**
 * Types text character by character into the target element.
 * @param {HTMLElement} el      - Target element
 * @param {string}      text    - Text to type
 * @param {number}      speed   - Delay between characters (ms)
 * @param {Function}    [cb]    - Callback when done
 */
function typeText(el, text, speed, cb) {
  let i = 0;
  el.textContent = '';

  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (typeof cb === 'function') cb();
    }
  }, speed);
}

/**
 * Fades in an element by adding the 'visible' class.
 * @param {HTMLElement} el    - Element to show
 * @param {number}      delay - Delay before showing (ms)
 */
function fadeIn(el, delay) {
  setTimeout(() => {
    el.classList.add('visible');
  }, delay);
}

// --- Run hero animation sequence on page load ---
window.addEventListener('load', () => {
  const heroTitle    = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');

  if (!heroTitle || !heroSubtitle) return;

  // Step 1: Wait for logo animation (≈1.5s), then type the church name
  setTimeout(() => {
    typeText(
      heroTitle,
      'The Church of God',
      75,           // typing speed
      () => {
        // Step 2: After typing, fade in the subtitle
        fadeIn(heroSubtitle, 300);
      }
    );
  }, 1500);
});

// Set subtitle text in JS so it's hidden until typed
(function setSubtitle() {
  const sub = document.getElementById('heroSubtitle');
  if (sub) sub.textContent = '(Truth, Justice, and Righteousness)';
})();


/* ============================================================
   2. STICKY NAVBAR — scroll detection
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


/* ============================================================
   3. HAMBURGER / MOBILE MENU
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent scroll behind menu
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});


/* ============================================================
   4. SMOOTH SCROLL + ACTIVE NAV HIGHLIGHT
   ============================================================ */
const navLinks   = document.querySelectorAll('.nav-link');
const sections   = document.querySelectorAll('section[id]');

/**
 * Updates the active nav link based on current scroll position.
 */
function updateActiveNav() {
  let currentSection = '';
  const scrollPos    = window.scrollY + 140; // offset for navbar + masthead height

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight + 34; // + masthead bar height
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});


/* ============================================================
   5. INTERSECTION OBSERVER — Scroll-in animations
   ============================================================ */
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
  root:       null,       // viewport
  rootMargin: '0px 0px -60px 0px',
  threshold:  0.12
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      // Stop observing once animated (one-time effect)
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => scrollObserver.observe(el));


/* ============================================================
   6. SCROLL TO TOP BUTTON
   ============================================================ */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   7. CONTACT FORM — Submission handler (placeholder)
   ============================================================ */
const contactForm   = document.getElementById('contactForm');
const formSuccess   = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent real submission (no backend)

    const submitBtn = contactForm.querySelector('.submit-btn');

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled    = true;

    // Simulate sending delay
    setTimeout(() => {
      // Reset button
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled  = false;

      // Show success message
      formSuccess.classList.add('show');

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);

    }, 1500);
  });
}


/* ============================================================
   8. FOOTER QUICK LINKS — ensure smooth scroll works
   ============================================================ */
// Footer links already handled by the global anchor listener above.
// No additional code needed.


/* ============================================================
   9. SUBTLE HERO PARALLAX (Optional, lightweight)
   ============================================================ */
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  if (!hero) return;
  const scrolled = window.scrollY;
  // Move the hero content slightly upward as user scrolls
  hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
}, { passive: true });


/* ============================================================
   10. CONSOLE WELCOME MESSAGE
   ============================================================ */
console.log(
  '%c✝ Church of God (Truth, Justice, and Righteousness)',
  'color: #C9A227; font-size: 14px; font-weight: bold; ' +
  'background: #1B3A6B; padding: 8px 16px; border-radius: 6px;'
);
console.log('%cWebsite loaded successfully.', 'color: #2C548F;');
console.log('%cThis is a prototype — some content is placeholder.', 'color: #6B7690; font-style: italic;');
