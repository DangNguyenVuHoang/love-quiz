// js/header.js
import { getCurrentUser, logout, isLoggedIn } from './authService.js';

const headerRight = document.getElementById('headerRight');

function renderHeader() {
  headerRight.innerHTML = ''; // xóa header cũ

  if (isLoggedIn()) {
    const user = getCurrentUser();

    // 1. Hiển thị lời chào username
    const welcome = document.createElement('span');
    welcome.textContent = `Xin chào, ${user.username}`;
    welcome.className = 'me-3 text-primary fw-bold';

    // 2. Link admin (chỉ admin mới thấy)
    if (user.role === 'admin') {
      const adminLink = document.createElement('a');
      adminLink.href = 'admin.html';
      adminLink.textContent = 'Trang quản trị';
      adminLink.className = 'btn btn-sm btn-outline-danger me-2';
      headerRight.append(adminLink);
    }

    // 3. Nút logout
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Đăng xuất';
    logoutBtn.className = 'btn btn-sm btn-danger';
    logoutBtn.addEventListener('click', () => {
      logout();
      renderHeader(); // cập nhật lại header ngay lập tức
      // Có thể redirect về trang home nếu muốn
      window.location.href = 'index.html';
    });

    // append các element
    headerRight.append(welcome, logoutBtn);

  } else {
    // Nếu chưa login
    const loginBtn = document.createElement('a');
    loginBtn.href = 'login.html';
    loginBtn.textContent = 'Đăng nhập';
    loginBtn.className = 'btn btn-sm btn-danger';
    headerRight.append(loginBtn);
  }
}

// gọi render khi load trang
renderHeader();
