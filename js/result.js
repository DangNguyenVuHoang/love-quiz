const dataRaw = localStorage.getItem('quizResult');
const wrap = document.getElementById('result');

if (!dataRaw) {
  wrap.innerHTML = '<p>Chưa có dữ liệu. Hãy <a href="quiz.html">làm khảo sát</a> trước nhé.</p>';
} else {
  const data = JSON.parse(dataRaw);
  wrap.innerHTML = `
    <p><strong>Tên:</strong> ${data.name}</p>
    <p><strong>Tính cách:</strong> ${data.answers?.tinhcach || ''}</p>
    <p><strong>Màu yêu thích:</strong> ${data.answers?.color || ''}</p>
    <p><strong>Món ăn yêu thích:</strong> ${data.answers?.food || ''}</p>
    <p><strong>Địa điểm mơ ước:</strong> ${data.answers?.place || ''}</p>
    <p><strong>Mẫu người lý tưởng để làm quen:</strong> ${data.answers?.timhieu || ''}</p>
    <hr/>
    <p><em>Feedback hiện tại:</em></p>
    <p><strong>Cảm nhận:</strong> ${data.feedback?.feeling || 'Chưa có'}</p>
    <p><strong>Góp ý:</strong> ${data.feedback?.improve || 'Chưa có'}</p>
  `;
}
