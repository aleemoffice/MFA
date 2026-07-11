// ui.auth.js — AUTH UI (ES MODULE)

import { UI } from "./ui.common.js";
import { AUTH } from "./engine.auth.js";

export function initAuthUI() {
  AUTH.loadSession();
  updateAuthHeader();

  const loginBtn = UI.qs("#loginBtn");
  const logoutBtn = UI.qs("#logoutBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const user = UI.qs("#loginUser").value.trim();
      const pass = UI.qs("#loginPass").value.trim();

      const res = AUTH.login(user, pass);
      alert(res.msg);
      updateAuthHeader();
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      AUTH.logout();
      alert("Logged out.");
      updateAuthHeader();
    });
  }
}

function updateAuthHeader() {
  const statusEl = UI.qs("#authStatus");
  if (!statusEl) return;

  if (AUTH.isLoggedIn()) {
    statusEl.textContent = `Logged in as ${AUTH.currentUser.username} (${AUTH.currentUser.role})`;
  } else {
    statusEl.textContent = "Not logged in";
  }
}
