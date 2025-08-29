import { updateAnswer } from './api.js';

const stored = localStorage.getItem('quizResult');
const form = document.getElementById('feedbackForm');

if (!stored) {
  alert('Chưa có thông tin bài quiz. Hãy làm quiz trước nhé!');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem('quizResult') || '{}');
  if (!data.id) { 
    alert('Thiếu ID bản ghi.'); 
    return; 
  }

  const fd = new FormData(form);
  const feedback = {
    feeling: fd.get('feeling'),
    improve: fd.get('improve')
  };

  // Thời gian submit feedback theo giờ Việt Nam
  const now = new Date();
  const vnTime = now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  form.querySelector('button[type="submit"]').disabled = true;
  try {
    const updated = await updateAnswer(data.id, { 
      ...data, 
      feedback, 
      feedbackTime: vnTime // thêm trường thời gian feedback
    });
    localStorage.setItem('quizResult', JSON.stringify(updated));
    alert('Cảm ơn em đã chia sẻ! ❤️');
    window.location.href = 'result.html';
  } catch (err) {
    alert('Lỗi khi cập nhật: ' + err.message);
  } finally {
    form.querySelector('button[type="submit"]').disabled = false;
  }
});
