// ui.settings.js — UPDATED FOR ROLE-BASED ACCESS

import { AUTH } from "../engine.auth.js";

export function loadSettings(settings) {
  const container = document.getElementById("settingsSummary");
  if (!container) return;

  container.innerHTML = `
    <strong>Currency:</strong> ${settings.currency}
    <br>
    <strong>Units:</strong> ${settings.units}
  `;

  // Admin-only settings editing
  if (!AUTH.hasRole("admin")) {
    const msg = document.createElement("p");
    msg.style.color = "#f87171";
    msg.textContent = "You are in read-only mode. Login as Admin to modify settings.";
    container.appendChild(msg);
    return;
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Settings";
  editBtn.onclick = () => alert("Settings editor coming soon.");
  container.appendChild(editBtn);
}
