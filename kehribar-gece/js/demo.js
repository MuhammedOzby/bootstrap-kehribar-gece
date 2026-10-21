const menuButton = document.querySelector('#menu-toggle');
const sidebar = document.querySelector('#sidebar');
const backdrop = document.querySelector('#menu-backdrop');
const mobile = window.matchMedia('(max-width: 991.98px)');
function setMenu(open) {
  document.body.classList.toggle('kg-menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  sidebar.inert = mobile.matches && !open;
  if (open) sidebar.querySelector('a').focus();
}
menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('kg-menu-open')));
backdrop.addEventListener('click', () => { setMenu(false); menuButton.focus(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('kg-menu-open')) {
    setMenu(false);
    menuButton.focus();
  }
  if (event.key === 'Tab' && mobile.matches && document.body.classList.contains('kg-menu-open')) {
    const links = sidebar.querySelectorAll('a, button');
    const first = links[0];
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
mobile.addEventListener('change', () => setMenu(false));
setMenu(false);
sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  if (mobile.matches) { setMenu(false); menuButton.focus(); }
}));
document.querySelector('#order-search').addEventListener('input', event => {
  const query = event.target.value.toLocaleLowerCase('tr-TR').trim();
  const rows = [...document.querySelectorAll('#orders-body tr[data-order]')];
  rows.forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase('tr-TR').includes(query); });
  document.querySelector('#no-results').hidden = rows.some(row => !row.hidden);
});
document.querySelector('#example-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.target.reportValidity()) return;
  bootstrap.Modal.getInstance(document.querySelector('#new-project')).hide();
  bootstrap.Toast.getOrCreateInstance(document.querySelector('#saved-toast')).show();
  event.target.reset();
});
