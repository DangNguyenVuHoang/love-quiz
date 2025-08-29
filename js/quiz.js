import { createAnswer } from "./api.js";

const form = document.getElementById("quizForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);

  // Lấy thời gian hiện tại ở múi giờ Việt Nam
  const now = new Date();
  const vnTime = now.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  const payload = {
    name: fd.get("name"),
    answers: {
      color: fd.get("color"),
      tinhcach: fd.get("tinhcach"),
      food: fd.get("food"),
      place: fd.get("place"),
      timhieu: fd.get("timhieu"),
    },
    feedback: {
      feeling: "",
      improve: "",
    },
    quizTime: vnTime, // thời gian làm quiz
  };

  form.querySelector('button[type="submit"]').disabled = true;
  try {
    const created = await createAnswer(payload);
    localStorage.setItem("quizResult", JSON.stringify(created));
    window.location.href = "feedback.html";
  } catch (err) {
    alert("Có lỗi khi lưu dữ liệu. Vui lòng thử lại!\n" + err.message);
  } finally {
    form.querySelector('button[type="submit"]').disabled = false;
  }
});
