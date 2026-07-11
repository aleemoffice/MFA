// ui.components.js — UPDATED FOR ROLE-BASED ACCESS + STORAGE

import { AUTH } from "../engine.auth.js";

export function renderComponents(components) {
  const container = document.getElementById("components_editor");
  if (!container) return;

  container.innerHTML = "";

  if (!components || components.length === 0) {
    container.textContent = "No components available.";
    return;
  }

  components.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <strong>${c.type}</strong>
      <br>
      Size: ${c.W}m × ${c.L}m
      <br>
      Exits: ${c.exits} | Travel Distance: ${c.travelDistance}m
      <br>
      Sprinklers: ${c.sprinklers ? "Yes" : "No"}
    `;

    // Admin-only editing
    if (AUTH.hasRole("admin")) {
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit Component";
      editBtn.onclick = () => alert("Component editor coming soon.");
      card.appendChild(editBtn);
    }

    container.appendChild(card);
  });
}
