// ui.header.js — UPDATED MFA HEADER (ES MODULE)

import { UI } from "./ui.common.js";

export function renderHeader() {
  const container = UI.qs("#appHeader");
  if (!container) return;
  UI.clear(container);

  const now = new Date();
  const ksaTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Riyadh",
    hour12: false
  });

  container.innerHTML = `
    <div class="header-left">
      <img src="./assets/MFA-LOGO.png" class="company-logo" alt="MFA Logo">
      <div class="company-info">
        <h1>MFA Engineering Consulting Co.</h1>
        <h3>Feasibility Studies & Design Department</h3>
      </div>
    </div>

    <div class="header-center">
      <label>Project Name:</label>
      <input id="headerProjectName" type="text" placeholder="Enter project name..." value="Al Kawther Mall">
    </div>

    <div class="header-right">
      <div class="designer-info">
        <p><strong>Program Designed By:</strong></p>
        <p>Engr. Muhammad Aleem</p>
        <p>📞 +966567364690</p>
      </div>

      <div class="timestamp">
        <p><strong>KSA Date & Time:</strong></p>
        <p id="ksaTime">${ksaTime}</p>
      </div>

      <div class="login-box">
        <label>Username:</label>
        <input id="loginUser" type="text" value="Admin">

        <label>Password:</label>
        <input id="loginPass" type="password" value="a1b2c3d4">

        <small class="password-hint">Password Hint: a1b2c3d4</small>

        <button id="loginBtn">Login</button>
        <div id="authStatus"></div>
        <button id="logoutBtn">Logout</button>
      </div>
    </div>
  `;

  // Optional: live time update
  setInterval(() => {
    const t = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Riyadh",
      hour12: false
    });
    const el = UI.qs("#ksaTime");
    if (el) el.textContent = t;
  }, 60000);
}
