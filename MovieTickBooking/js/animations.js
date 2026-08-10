// js/animations.js

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
      if (entry.isIntersecting) { 
        entry.target.classList.add('animated'); 
        observer.unobserve(entry.target); 
      } 
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
  });
  
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});
