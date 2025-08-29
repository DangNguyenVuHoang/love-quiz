// authGuard.js
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

/**
 * Bắt buộc login để truy cập trang bình thường (quiz, feedback, result)
 * Nếu chưa login sẽ redirect về login.html
 */
export function requireLogin(redirect = 'login.html') {
  if (!currentUser) {
    window.location.href = redirect;
  }
}

/**
 * Bắt buộc role admin để truy cập admin.html
 * Nếu không đủ quyền sẽ thông báo và redirect về login.html
 */
export function requireAdmin(redirect = 'login.html') {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Bạn không có quyền truy cập trang này!');
    window.location.href = redirect;
  }
}

/**
 * Chặn truy cập login.html nếu đã login
 * Nếu đã login thì redirect về trang tương ứng theo role
 */
export function blockLoginPage(redirectAdmin = 'admin.html', redirectUser = 'index.html') {
  if (currentUser) {
    if (currentUser.role === 'admin') {
      window.location.href = redirectAdmin;
    } else {
      window.location.href = redirectUser;
    }
  }
}

