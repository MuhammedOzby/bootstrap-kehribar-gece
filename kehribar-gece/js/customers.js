(() => {
  const customers = [
    { name: 'Özgür Yazılım A.Ş.', email: 'iletisim@ozguryazilim.example', city: 'Ankara', status: 'active', volume: 128450 },
    { name: 'Çağrı Şimşek', email: 'cagri@example.com', city: 'İstanbul', status: 'pending', volume: 3200 },
    { name: 'İpek Tasarım Atölyesi', email: 'ipek@example.com', city: 'İzmir', status: 'active', volume: 8450 },
    { name: 'Güneş Teknoloji', email: 'gunes@example.com', city: 'Bursa', status: 'inactive', volume: 24000 },
    { name: 'Ada Mimarlık', email: 'ada@example.com', city: 'Antalya', status: 'active', volume: 18500 },
    { name: 'Deniz Yılmaz', email: 'deniz@example.com', city: 'Eskişehir', status: 'active', volume: 7200 },
    { name: 'Bulut Stüdyo', email: 'bulut@example.com', city: 'İstanbul', status: 'pending', volume: 12500 },
    { name: 'Şule Aksoy', email: 'sule@example.com', city: 'Ankara', status: 'active', volume: 5600 },
    { name: 'Çınar Danışmanlık', email: 'cinar@example.com', city: 'İzmir', status: 'inactive', volume: 32000 },
    { name: 'Pera Atölye', email: 'pera@example.com', city: 'İstanbul', status: 'active', volume: 16400 },
    { name: 'Ekin Üretim', email: 'ekin@example.com', city: 'Konya', status: 'active', volume: 27800 },
    { name: 'Işık Dijital', email: 'isik@example.com', city: 'Samsun', status: 'pending', volume: 9900 }
  ];
  const statusNames = { active: 'Aktif', pending: 'Bekliyor', inactive: 'Pasif' };
  const statusClasses = { active: 'kg-status-success', pending: 'kg-status-warning', inactive: 'kg-status-muted' };
  const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
  const search = document.querySelector('#customer-search');
  const statusFilter = document.querySelector('#customer-status');
  const rows = document.querySelector('#customer-rows');
  const template = document.querySelector('#customer-row-template');
  const pagination = document.querySelector('#customer-pagination');
  const pageSize = 6;
  let page = 1;
  let ascending = true;

  function filteredCustomers() {
    const query = search.value.trim().toLocaleLowerCase('tr-TR');
    return customers.filter(customer => {
      const matchText = [customer.name, customer.email, customer.city].join(' ').toLocaleLowerCase('tr-TR').includes(query);
      return matchText && (statusFilter.value === 'all' || statusFilter.value === customer.status);
    }).sort((a, b) => a.name.localeCompare(b.name, 'tr') * (ascending ? 1 : -1));
  }
  function addPageButton(label, targetPage, disabled, active = false) {
    const item = document.createElement('li');
    item.className = `page-item${active ? ' active' : ''}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'page-link';
    button.textContent = label;
    button.disabled = disabled;
    if (active) button.setAttribute('aria-current', 'page');
    button.addEventListener('click', () => {
      page = targetPage;
      render();
      pagination.querySelector('[aria-current="page"]')?.focus();
    });
    item.append(button);
    pagination.append(item);
  }
  function render() {
    const filtered = filteredCustomers();
    const count = filtered.length;
    const pages = Math.max(1, Math.ceil(count / pageSize));
    page = Math.min(page, pages);
    const start = (page - 1) * pageSize;
    rows.replaceChildren();
    for (const customer of filtered.slice(start, start + pageSize)) {
      const row = template.content.cloneNode(true);
      const values = {
        initial: customer.name.split(/\s+/).slice(0, 2).map(word => word[0]).join('').toLocaleUpperCase('tr-TR'),
        name: customer.name, email: customer.email, city: customer.city,
        status: statusNames[customer.status], volume: currency.format(customer.volume)
      };
      for (const [field, value] of Object.entries(values)) row.querySelector(`[data-field="${field}"]`).textContent = value;
      row.querySelector('[data-field="status"]').classList.add(statusClasses[customer.status]);
      row.querySelector('a').setAttribute('aria-label', `${customer.name} satırından fatura örneğini aç`);
      rows.append(row);
    }
    if (!count) {
      const row = document.createElement('tr');
      const cell = document.createElement('td');
      cell.colSpan = 5;
      cell.className = 'kg-empty';
      cell.textContent = 'Aramanıza uygun müşteri bulunamadı. Filtreleri değiştirebilirsiniz.';
      row.append(cell); rows.append(row);
    }
    document.querySelector('#customer-count').textContent = count ? `${count} kayıttan ${start + 1}–${Math.min(start + pageSize, count)} gösteriliyor` : '0 kayıt';
    document.querySelector('#customer-total').textContent = customers.length;
    document.querySelector('#customer-active').textContent = customers.filter(customer => customer.status === 'active').length;
    document.querySelector('#customer-volume').textContent = currency.format(customers.reduce((sum, customer) => sum + customer.volume, 0));
    pagination.replaceChildren();
    addPageButton('Önceki', page - 1, page === 1);
    for (let number = 1; number <= pages; number++) addPageButton(String(number), number, false, number === page);
    addPageButton('Sonraki', page + 1, page === pages);
  }
  search.addEventListener('input', () => { page = 1; render(); });
  statusFilter.addEventListener('change', () => { page = 1; render(); });
  document.querySelector('#sort-customers').addEventListener('click', () => {
    ascending = !ascending;
    document.querySelector('#sort-direction').textContent = ascending ? '↑' : '↓';
    document.querySelector('#customer-name-heading').setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
    render();
  });
  document.querySelector('#export-customers').addEventListener('click', () => {
    // Hücre başındaki formül karakterlerini, metin olarak dışa aktar.
    function csvCell(value) {
      const text = String(value).replace(/^[\t\r\n ]*(?=[=+@-])/, "'");
      return `"${text.replaceAll('"', '""')}"`;
    }
    const result = [['Müşteri', 'E-posta', 'Şehir', 'Durum', 'İşlem hacmi (TRY)'], ...filteredCustomers().map(customer => [customer.name, customer.email, customer.city, statusNames[customer.status], customer.volume])];
    const blob = new Blob(['\uFEFF' + result.map(row => row.map(csvCell).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'kehribar-musteriler.csv';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.querySelector('#customer-feedback').textContent = `${filteredCustomers().length} örnek müşteri CSV dosyasına aktarıldı.`;
  });
  document.querySelector('#new-customer-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.target;
    const nameInput = document.querySelector('#customer-name');
    const cityInput = document.querySelector('#customer-city');
    nameInput.value = nameInput.value.trim();
    cityInput.value = cityInput.value.trim();
    if (!form.reportValidity()) return;
    customers.push({ name: nameInput.value, email: document.querySelector('#customer-email').value.trim(), city: cityInput.value, status: 'active', volume: 0 });
    search.value = ''; statusFilter.value = 'all'; page = 1; render();
    bootstrap.Modal.getInstance(document.querySelector('#new-customer')).hide();
    document.querySelector('#customer-feedback').textContent = 'Müşteri örnek listeye eklendi. Sayfa yenilenince bu kayıt silinir.';
    form.reset();
  });
  render();
})();
