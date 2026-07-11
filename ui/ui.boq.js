// ui.boq.js — UPDATED FOR ROLE-BASED ACCESS + STORAGE

import { AUTH } from "../engine.auth.js";

export function renderBOQ(results) {
  const container = document.getElementById("boq_matrix");
  if (!container) return;

  container.innerHTML = "";

  if (!results || !results.items) {
    container.textContent = "No BOQ data available.";
    return;
  }

  results.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "boq-row";

    row.innerHTML = `
      <strong>${item.code}</strong> — ${item.desc}
      <br>
      Qty: ${item.qty} | Unit: ${item.unit} | Cost: ${item.cost}
    `;

    // Admin-only editing
    if (AUTH.hasRole("admin")) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => alert("BOQ editing coming soon.");
      row.appendChild(editBtn);
    }

    container.appendChild(row);
  });
}
