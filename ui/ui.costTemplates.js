// ui.costTemplates.js — COST TEMPLATE UI

import { COST_ENGINE } from "../engine.costTemplates.js";
import { APP } from "../ui.js";

export function renderCostTemplates() {
  const container = document.getElementById("cost_templates");
  if (!container) return;

  const results = COST_ENGINE.calculateAll(APP);

  container.innerHTML = `
    <h3>Cost Templates Summary</h3>
  `;

  results.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${r.type}</h4>
      <p><strong>Area:</strong> ${r.area} m²</p>
      <p><strong>Base Cost:</strong> SAR ${r.baseCost.toLocaleString()}</p>
      <p><strong>Material Cost:</strong> SAR ${r.materialCost.toLocaleString()}</p>
      <p><strong>Total Cost:</strong> SAR ${r.total.toLocaleString()}</p>
    `;

    container.appendChild(card);
  });
}
