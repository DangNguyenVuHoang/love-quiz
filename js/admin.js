import { listAnswers } from './api.js';

const wrap = document.getElementById('tableWrap');
const search = document.getElementById('search');
const refreshBtn = document.getElementById('refresh');

async function load() {
  wrap.innerHTML = 'Đang tải...';
  try {
    const rows = await listAnswers();
    render(rows);
  } catch (e) {
    wrap.innerHTML = 'Lỗi tải dữ liệu: ' + e.message;
  }
}

function render(rows) {
  const q = (search.value || '').toLowerCase().trim();
  const filtered = rows.filter(r => (r.name || '').toLowerCase().includes(q));
  const head = `<div class="row head">
    <div class="cell">Tên</div>
    <div class="cell">Tính cách</div>
    <div class="cell">Màu</div>
    <div class="cell">Món</div>
    <div class="cell">Địa điểm</div>
    <div class="cell">Mẫu người lý tưởng</div>
    <div class="cell">Cảm nhận</div>
    <div class="cell">Góp ý</div>
  </div>`;
  const body = filtered.map(r => `<div class="row">
    <div class="cell"><strong>${r.name || ''}</strong></div>
    <div class="cell">${r.answers?.tinhcach || ''}</div>
    <div class="cell">${r.answers?.color || ''}</div>
    <div class="cell">${r.answers?.food || ''}</div>
    <div class="cell">${r.answers?.place || ''}</div>
    <div class="cell">${r.answers?.timhieu || ''}</div>
    <div class="cell">${r.feedback?.feeling || ''}</div>
    <div class="cell">${r.feedback?.improve || ''}</div>
  </div>`).join('');
  wrap.innerHTML = head + body;
}

search.addEventListener('input', load);
refreshBtn.addEventListener('click', load);
load();
