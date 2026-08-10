// js/toast.js

window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  
  if (!container) { 
    container = document.createElement('div'); 
    container.id = 'toastContainer'; 
    container.className = 'toast-container'; 
    document.body.appendChild(container); 
  }
  
  const icons = { 
    success: 'fa-check-circle', 
    error: 'fa-exclamation-circle', 
    warning: 'fa-exclamation-triangle', 
    info: 'fa-info-circle' 
  };
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => { 
    toast.style.animation = 'fadeOut 0.3s ease forwards'; 
    setTimeout(() => toast.remove(), 300); 
  }, 3000);
};
