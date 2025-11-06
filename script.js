// ===== NAVIGATION ACTIVE STATE & SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}

// Navigation scroll effect
function updateNavOnScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Active section highlighting
function highlightActiveSection() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

function toggleBackToTopButton() {
  if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== SCROLL ANIMATIONS =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-card');
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
});

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNavOnScroll();
  highlightActiveSection();
  toggleBackToTopButton();
  revealOnScroll();
});

// Initial calls
updateScrollProgress();
updateNavOnScroll();
highlightActiveSection();
revealOnScroll();

// ===== HERO SECTION TYPING EFFECT (Optional Enhancement) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '0';
  setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease';
    heroTitle.style.opacity = '1';
  }, 200);
}

// ===== INTERSECTION OBSERVER FOR BETTER PERFORMANCE =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .stat-card, .contact-item, .social-card').forEach(element => {
  observer.observe(element);
});

// ===== MOBILE MENU (if needed in future) =====
// Add hamburger menu functionality here if you want mobile navigation

console.log('🚀 Portfolio loaded successfully!');