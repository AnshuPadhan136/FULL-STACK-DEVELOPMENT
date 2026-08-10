// js/navbar.js

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navHamburger');
  const menu = document.getElementById('navMenu');
  
  // Scroll effect
  window.addEventListener('scroll', () => { 
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 50); 
    }
  });
  
  // Mobile menu toggle
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => { 
      hamburger.classList.toggle('active'); 
      menu.classList.toggle('active'); 
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : ''; 
    });
    
    // Close menu when clicking a link
    menu.querySelectorAll('.nav-link').forEach(link => { 
      link.addEventListener('click', () => { 
        hamburger.classList.remove('active'); 
        menu.classList.remove('active'); 
        document.body.style.overflow = ''; 
      }); 
    });
  }
  
  // Active link logic
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) { 
      link.classList.add('active'); 
    }
  });
});
