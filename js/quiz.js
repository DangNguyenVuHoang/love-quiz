import { createAnswer } from "./api.js";

const form = document.getElementById("quizForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
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
