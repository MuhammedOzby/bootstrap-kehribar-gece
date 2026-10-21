(() => {
  const button = document.querySelector('#menu-toggle');
  const sidebar = document.querySelector('#sidebar');
  if (!button || !sidebar) return;
  const mobile = window.matchMedia('(max-width: 991.98px)');
  function setMenu(open, focus = false) {
    document.body.classList.toggle('kg-menu-open', open);
    button.setAttribute('aria-expanded', String(open));
    sidebar.inert = mobile.matches && !open;
    if (open) sidebar.querySelector('a').focus();
    else if (focus) button.focus();
  }
  button.addEventListener('click', () => setMenu(!document.body.classList.contains('kg-menu-open')));
  document.querySelector('#menu-backdrop').addEventListener('click', () => setMenu(false, true));
  mobile.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('kg-menu-open')) return;
    if (event.key === 'Escape') setMenu(false, true);
    if (event.key !== 'Tab') return;
    const links = [...sidebar.querySelectorAll('a,button')];
    if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); links[0].focus(); }
  });
  setMenu(false);
})();
