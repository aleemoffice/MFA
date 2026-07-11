// ui.capex.js — OWNER vs TENANT CAPEX UI (FINAL)

import { CAPEX_ENGINE } from "../engine.capex.js";
import { APP } from "../ui.js";

export function renderCAPEXPanel() {
  const container = document.getElementById("capex_panel");
  if (!container) return;

  const { perComponent, totals } = CAPEX_ENGINE.calculateAll(APP);

  container.innerHTML = `
    <h3>Owner vs Tenant CAPEX</h3>
    <p><strong>Total Owner CAPEX:</strong> SAR ${totals.ownerCapex.toLocaleString()}</p>
    <p><strong>Total Tenant CAPEX:</strong> SAR ${totals.tenantCapex.toLocaleString()}</p>
    <p><strong>Total Area:</strong> ${totals.area.toFixed(1)} m²</p>
    <p><strong>Owner CAPEX/m²:</strong> SAR ${(totals.ownerCapex / totals.area || 0).toFixed(0)}</p>
    <p><strong>Tenant CAPEX/m²:</strong> SAR ${(totals.tenantCapex / totals.area || 0).toFixed(0)}</p>
    <hr>
  `;

  perComponent.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${c.type}</h4>
      <p><strong>Area:</strong> ${c.area.toFixed(1)} m²</p>
      <p><strong>Owner CAPEX:</strong> SAR ${c.ownerCapex.toLocaleString()}</p>
      <p><strong>Tenant CAPEX:</strong> SAR ${c.tenantCapex.toLocaleString()}</p>
      <p><strong>Owner Base Fitout:</strong> SAR ${c.ownerBaseFitout.toLocaleString()}</p>
      <p><strong>Tenant Base Fitout:</strong> SAR ${c.tenantBaseFitout.toLocaleString()}</p>
      <p><strong>Owner MEP Infra:</strong> SAR ${c.ownerMEP.toLocaleString()}</p>
      <p><strong>Owner Fire/Life Safety:</strong> SAR ${c.ownerFire.toLocaleString()}</p>
      <p><strong>Owner Core Finishes:</strong> SAR ${c.ownerCoreFinishes.toLocaleString()}</p>
      <p><strong>Tenant Premium Finishes:</strong> SAR ${c.tenantPremiumFinishes.toLocaleString()}</p>
    `;

    container.appendChild(card);
  });
}
