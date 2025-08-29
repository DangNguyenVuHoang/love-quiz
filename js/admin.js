import { listAnswers } from './api.js';
// js/admin.js (đầu file)
import { isLoggedIn } from './authService.js';

if (!isLoggedIn()) {
  alert('Bạn cần đăng nhập trước!');
  window.location.href = 'login.html';
}

const wrap = document.getElementById('tableWrap');
const search = document.getElementById('search');
const refreshBtn = document.getElementById('refresh');

async function load() {
  wrap.innerHTML = '<div class="text-center py-3">Đang tải...</div>';
  try {
    const rows = await listAnswers();
    render(rows);
  } catch (e) {
    wrap.innerHTML = `<div class="text-danger text-center py-3">Lỗi tải dữ liệu: ${e.message}</div>`;
  }
}

function render(rows) {
  const q = (search.value || '').toLowerCase().trim();
  const filtered = rows.filter(r => (r.name || '').toLowerCase().includes(q));

  if (!filtered.length) {
    wrap.innerHTML = '<div class="text-center py-3">Không tìm thấy dữ liệu</div>';
    return;
  }

  const table = document.createElement('table');
  table.className = 'table table-striped table-hover table-bordered mb-0';

  // Head
  const thead = document.createElement('thead');
  thead.className = 'table-light';
  thead.innerHTML = `
    <tr>
      <th>#</th>
      <th>Tên</th>
      <th>Tính cách</th>
      <th>Màu</th>
      <th>Món</th>
      <th>Địa điểm</th>
      <th>Mẫu người lý tưởng</th>
      <th>Cảm nhận</th>
      <th>Góp ý</th>
    </tr>
  `;
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  filtered.forEach((r, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${r.name || ''}</strong></td>
      <td>${r.answers?.tinhcach || ''}</td>
      <td>${r.answers?.color || ''}</td>
      <td>${r.answers?.food || ''}</td>
      <td>${r.answers?.place || ''}</td>
      <td>${r.answers?.timhieu || ''}</td>
      <td>${r.feedback?.feeling || ''}</td>
      <td>${r.feedback?.improve || ''}</td>
    `;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  // Clear wrap và append table responsive
  wrap.innerHTML = '';
  const responsiveDiv = document.createElement('div');
  responsiveDiv.className = 'table-responsive';
  responsiveDiv.appendChild(table);
  wrap.appendChild(responsiveDiv);
}

search.addEventListener('input', load);
refreshBtn.addEventListener('click', load);

// check auth
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
if(!currentUser) window.location.href = 'login.html';

load();

