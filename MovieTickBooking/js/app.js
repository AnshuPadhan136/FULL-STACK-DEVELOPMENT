// js/app.js

document.addEventListener('DOMContentLoaded', () => {
  // Init theme
  if (window.ThemeManager) {
    ThemeManager.init();
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) { 
      themeToggle.addEventListener('click', () => ThemeManager.toggle()); 
    }
  }
  
  // Footer year
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => { 
      backToTop.classList.toggle('visible', window.scrollY > 300); 
    });
    
    backToTop.addEventListener('click', () => { 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });
  }
  
  // Loading screen
  const loader = document.getElementById('loadingScreen');
  if (loader) { 
    setTimeout(() => { 
      loader.style.opacity = '0'; 
      setTimeout(() => loader.remove(), 500); 
    }, 800); 
  }
  
  // Newsletter form
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) { 
    newsletter.addEventListener('submit', (e) => { 
      e.preventDefault(); 
      if (window.showToast) {
        showToast('Subscribed successfully!', 'success'); 
      }
      newsletter.reset(); 
    }); 
  }
  
  // Page transition
  document.body.classList.add('page-transition');
});

// Poster fallback system - creates beautiful gradient cards when images fail to load
const POSTER_GRADIENTS = [
  'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
  'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
  'linear-gradient(135deg, #2d1b69, #6b2fa0, #1a1a2e)',
  'linear-gradient(135deg, #0d253f, #01b4e4, #0d253f)',
  'linear-gradient(135deg, #1b5e20, #2e7d32, #1b5e20)',
  'linear-gradient(135deg, #b71c1c, #1a1a2e, #0d47a1)',
  'linear-gradient(135deg, #004d40, #00695c, #1a1a2e)',
  'linear-gradient(135deg, #e65100, #bf360c, #1a1a2e)',
  'linear-gradient(135deg, #1a237e, #283593, #1a1a2e)',
  'linear-gradient(135deg, #880e4f, #ad1457, #1a1a2e)',
  'linear-gradient(135deg, #4a148c, #6a1b9a, #1a1a2e)',
  'linear-gradient(135deg, #006064, #00838f, #1a1a2e)'
];

const POSTER_ICONS = [
  'fa-rocket', 'fa-crosshairs', 'fa-heart', 'fa-atom',
  'fa-tree', 'fa-city', 'fa-laptop-code', 'fa-music',
  'fa-user-secret', 'fa-palette', 'fa-dragon', 'fa-motorcycle'
];

document.addEventListener('error', function(e) {
  if (e.target.tagName === 'IMG' && e.target.src.includes('poster-')) {
    const match = e.target.src.match(/poster-(\d+)/);
    const idx = match ? (parseInt(match[1]) - 1) : 0;
    const movie = (window.MOVIES || [])[idx];
    
    // Replace the broken image with a styled gradient div
    const fallback = document.createElement('div');
    fallback.className = 'poster-fallback';
    fallback.style.cssText = `
      width: 100%; height: 100%; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 12px;
      background: ${POSTER_GRADIENTS[idx % POSTER_GRADIENTS.length]};
      color: white; text-align: center; padding: 20px;
      position: absolute; inset: 0;
    `;
    fallback.innerHTML = `
      <i class="fas ${POSTER_ICONS[idx % POSTER_ICONS.length]}" style="font-size: 2.5rem; opacity: 0.7;"></i>
      <span style="font-family: var(--font-heading); font-weight: 700; font-size: 1rem; line-height: 1.3;">${movie ? movie.title : 'Movie'}</span>
    `;
    
    const parent = e.target.parentElement;
    if (parent) {
      parent.style.position = 'relative';
      e.target.style.display = 'none';
      parent.appendChild(fallback);
    }
  }
}, true);
