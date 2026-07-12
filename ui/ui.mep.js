// ui.mep.js — MEP SUMMARY UI (FINAL)

import { MEP_ENGINE } from "../engine.mep.js";
import { APP } from "../ui.js";

export function renderMEPSummary() {
  const container = document.getElementById("mep_summary");
  if (!container) return;

  const { perComponent, totals } = MEP_ENGINE.calculateAll(APP);

  container.innerHTML = `
    <h3>MEP Summary</h3>
    <p><strong>Total Area:</strong> ${totals.area.toFixed(1)} m²</p>
    <p><strong>Total TR:</strong> ${totals.tr.toFixed(1)} TR</p>
    <p><strong>Total kVA:</strong> ${totals.kva.toFixed(1)} kVA</p>
    <p><strong>Total Fixture Units:</strong> ${totals.fixtureUnits.toFixed(1)}</p>
    <p><strong>Total Diffusers:</strong> ${totals.diffusers}</p>
    <p><strong>Total Sprinklers:</strong> ${totals.sprinklers}</p>
  `;

  perComponent.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${c.type}</h4>
      <p><strong>Area:</strong> ${c.area.toFixed(1)} m²</p>
      <p><strong>TR:</strong> ${c.tr.toFixed(1)} TR</p>
      <p><strong>kVA:</strong> ${c.kva.toFixed(1)} kVA</p>
      <p><strong>Fixture Units:</strong> ${c.fixtureUnits.toFixed(1)}</p>
      <p><strong>Diffusers:</strong> ${c.diffusers}</p>
      <p><strong>Sprinklers:</strong> ${c.sprinklers}</p>
    `;

    container.appendChild(card);
  });
}
