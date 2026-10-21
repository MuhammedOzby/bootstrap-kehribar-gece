document.querySelector('#print-invoice')?.addEventListener('click', () => window.print());
document.querySelector('#retry-demo')?.addEventListener('click', () => {
  document.querySelector('#retry-status').textContent = 'Bu bir 500 ekranı demosudur. Gerçek bir sunucuya istek gönderilmedi.';
});
document.querySelector('#toggle-password')?.addEventListener('click', event => {
  const input = document.querySelector('#login-password');
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  event.currentTarget.textContent = show ? 'Gizle' : 'Göster';
  event.currentTarget.setAttribute('aria-pressed', String(show));
});
document.querySelectorAll('[data-demo-form]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const status = form.querySelector('[role="status"]');
    status.textContent = form.dataset.demoForm;
  });
  form.addEventListener('reset', () => {
    form.querySelector('[role="status"]').textContent = '';
  });
});
