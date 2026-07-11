// ui.boqAuto.js — BOQ AUTO-GENERATOR UI (FINAL)

import { BOQ_ENGINE } from "../engine.boq.js";
import { APP } from "../ui.js";

export function renderBOQAuto() {
  const container = document.getElementById("boq_auto");
  if (!container) return;

  const results = BOQ_ENGINE.generateAll(APP);

  container.innerHTML = `<h3>Auto-Generated CSI BOQ</h3>`;

  results.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `<h4>${r.type}</h4>`;

    r.boq.forEach(item => {
      const row = document.createElement("p");
      row.innerHTML = `
        <strong>${item.division}</strong><br>
        ${item.item} — ${item.qty} ${item.unit}<br>
        <em>${item.remarks}</em>
      `;
      card.appendChild(row);
    });

    container.appendChild(card);
  });
}
