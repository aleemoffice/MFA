// ui.fireSafety.js — FIRE / LIFE-SAFETY UI (FINAL)

import { FIRE_ENGINE } from "../engine.fireSafety.js";
import { APP } from "../ui.js";

export function renderFireSafetySummary() {
  const container = document.getElementById("fire_safety_summary");
  if (!container) return;

  const results = FIRE_ENGINE.evaluateAll(APP);

  container.innerHTML = `<h3>Fire / Life-Safety Summary</h3>`;

  results.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    const statusColor = r.compliant ? "#16a34a" : "#dc2626";
    const statusText = r.compliant ? "COMPLIANT" : "NON-COMPLIANT";

    card.innerHTML = `
      <h4>${r.type}</h4>
      <p><strong>Status:</strong> <span style="color:${statusColor};">${statusText}</span></p>
      <p><strong>Travel Distance:</strong> ${r.travelDistance} m</p>
      <p><strong>Exits:</strong> ${r.exits}</p>
      <p><strong>Sprinklers:</strong> ${r.sprinklers ? "Yes" : "No"}</p>
      <p><strong>Fire Alarm:</strong> ${r.fireAlarm ? "Yes" : "No"}</p>
    `;

    if (!r.compliant && r.issues.length) {
      const ul = document.createElement("ul");
      r.issues.forEach(issue => {
        const li = document.createElement("li");
        li.textContent = issue;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    }

    container.appendChild(card);
  });
}
