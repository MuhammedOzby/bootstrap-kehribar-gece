(() => {
  const key = 'kehribar-gece-theme';
  const allowed = ['light', 'dark', 'system'];
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = 'system';
  try {
    const saved = localStorage.getItem(key);
    if (allowed.includes(saved)) preference = saved;
  } catch { /* Görünüm, depolama kapalıyken de değiştirilebilir. */ }

  function apply() {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.bsTheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#121416' : '#f6f4ef');
    document.querySelectorAll('input[name="theme"]').forEach(input => {
      input.checked = input.value === preference;
    });
  }
  apply();
  system.addEventListener('change', () => {
    if (preference === 'system') apply();
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    preference = allowed.includes(event.newValue) ? event.newValue : 'system';
    apply();
  });
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelectorAll('input[name="theme"]').forEach(input => {
      input.addEventListener('change', () => {
        if (!input.checked || !allowed.includes(input.value)) return;
        preference = input.value;
        try { localStorage.setItem(key, preference); } catch { /* Oturumda kullanmaya devam et. */ }
        apply();
      });
    });
  });
})();
