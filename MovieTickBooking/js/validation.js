window.Validator = {
  isEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
  isPhone(phone) { return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone); },
  minLength(str, len) { return str.length >= len; },
  maxLength(str, len) { return str.length <= len; },
  required(str) { return str.trim().length > 0; },
  passwordsMatch(p1, p2) { return p1 === p2; },
  isStrongPassword(pw) { return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw); },
  
  showError(inputEl, message) {
    inputEl.classList.add('error');
    let errEl = inputEl.nextElementSibling;
    if (!errEl || !errEl.classList.contains('form-error')) {
      errEl = document.createElement('span');
      errEl.className = 'form-error';
      inputEl.after(errEl);
    }
    errEl.textContent = message;
    errEl.style.display = 'block';
  },
  clearError(inputEl) {
    inputEl.classList.remove('error');
    const errEl = inputEl.nextElementSibling;
    if (errEl && errEl.classList.contains('form-error')) { errEl.style.display = 'none'; }
  },
  clearAllErrors(form) {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.style.display = 'none');
  }
};
