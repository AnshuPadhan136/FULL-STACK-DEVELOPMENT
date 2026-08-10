// js/theme.js

window.ThemeManager = {
  init() {
    const theme = Storage.getTheme();
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcon(theme);
  },
  
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', next);
    Storage.setTheme(next);
    this.updateIcon(next);
  },
  
  updateIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (btn) { 
      btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; 
    }
  },
  
  get() { 
    return document.documentElement.getAttribute('data-theme') || 'dark'; 
  }
};
