document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => {
  new bootstrap.Tooltip(element);
});
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(element => {
  new bootstrap.Popover(element);
});
document.querySelector('#show-toast').addEventListener('click', () => {
  bootstrap.Toast.getOrCreateInstance(document.querySelector('#demo-toast')).show();
});
document.querySelector('#validation-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.target;
  form.classList.add('was-validated');
  const message = document.querySelector('#form-result');
  if (form.checkValidity()) {
    message.textContent = 'Alanlar doğrulandı. Bu örnekte veri gönderilmez.';
  } else {
    message.textContent = 'Lütfen işaretli alanları kontrol edin.';
    form.querySelector(':invalid')?.focus();
  }
});
document.querySelector('#validation-form').addEventListener('reset', event => {
  event.target.classList.remove('was-validated');
  document.querySelector('#form-result').textContent = '';
});
document.querySelector('#demo-range').addEventListener('input', event => {
  document.querySelector('#range-value').value = event.target.value;
});
document.querySelectorAll('[data-page]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-page]').forEach(item => {
      item.closest('.page-item').classList.toggle('active', item === button);
      if (item === button) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    document.querySelector('#page-result').textContent = `Örnek sayfa ${button.dataset.page} seçildi.`;
  });
});
