// ---- UTIL ----
async function hash(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "{}");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ---- AUTH ----
async function login(username, password) {
  const users = getUsers();
  if (!users[username]) return "User not found";

  const hashed = await hash(password);
  if (users[username].password !== hashed) return "Wrong password";

  localStorage.setItem("session", username);
  location.href = "index.html";
}

async function register(username, password) {
  if (username.length < 3) return "Username too short";
  if (password.length < 4) return "Password too short";

  const users = getUsers();
  if (users[username]) return "User already exists";

  users[username] = {
    password: await hash(password),
    created: Date.now(),
    data: {}
  };

  saveUsers(users);
  localStorage.setItem("session", username);
  location.href = "index.html";
}

function logout() {
  localStorage.removeItem("session");
  location.href = "login.html";
}

function getCurrentUser() {
  return localStorage.getItem("session");
}

function requireAuth() {
  if (!getCurrentUser()) {
    location.href = "login.html";
  }
}

// ---- LOGIN PAGE WIRES ----
if (document.getElementById("loginBtn")) {
  const error = document.getElementById("error");

  document.getElementById("loginBtn").onclick = async () => {
    error.textContent = await login(
      username.value,
      password.value
    ) || "";
  };

  document.getElementById("registerBtn").onclick = async () => {
    error.textContent = await register(
      username.value,
      password.value
    ) || "";
  };
}
