// API helper
const BASE_URL = "https://68b054b83b8db1ae9c039b7d.mockapi.io";

async function api(url, options = {}, expectJson = true) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return expectJson ? res.json() : res.text();
}

export async function createAnswer(payload) {
  return api(`${BASE_URL}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function updateAnswer(id, payload) {
  return api(`${BASE_URL}/answers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listAnswers() {
  return api(`${BASE_URL}/answers`);
}

export async function getAnswer(id) {
  return api(`${BASE_URL}/answers/${id}`);
}
