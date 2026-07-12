// ui.ve.js — VALUE ENGINEERING UI (FINAL)

import { VE_ENGINE } from "../engine.ve.js";
import { APP } from "../ui.js";

export function renderVEPanel() {
  const container = document.getElementById("ve_panel");
  if (!container) return;

  const results = VE_ENGINE.analyzeAll(APP);

  container.innerHTML = `<h3>Value Engineering Suggestions</h3>`;

  results.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${r.type}</h4>
      <p><strong>Cost/m²:</strong> SAR ${(r.cost.total / r.cost.area).toFixed(0)}</p>
      <p><strong>TR/m²:</strong> ${(r.mep.tr / r.mep.area).toFixed(3)} TR/m²</p>
      <p><strong>kVA/m²:</strong> ${(r.mep.kva / r.mep.area).toFixed(3)} kVA/m²</p>
      <p><strong>Fire Status:</strong> ${r.fire.compliant ? "Compliant" : "Non-compliant"}</p>
    `;

    const ul = document.createElement("ul");
    r.suggestions.forEach(s => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });

    card.appendChild(ul);
    container.appendChild(card);
  });
}
