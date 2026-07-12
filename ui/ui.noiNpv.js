// ui.noiNpv.js — NOI / NPV UI (FINAL)

import { NOI_NPV_ENGINE } from "../engine.noiNpv.js";
import { APP } from "../ui.js";

export function renderNOINPVPanel() {
  const container = document.getElementById("noi_npv_panel");
  if (!container) return;

  const res = NOI_NPV_ENGINE.calculateCashFlows(APP);

  container.innerHTML = `
    <h3>NOI / NPV Summary</h3>
    <p><strong>Owner CAPEX:</strong> SAR ${res.ownerCapex.toLocaleString()}</p>
    <p><strong>Tenant CAPEX:</strong> SAR ${res.tenantCapex.toLocaleString()}</p>
    <p><strong>Base Year NOI:</strong> SAR ${res.baseNOI.toLocaleString()}</p>
    <p><strong>NPV (${10} years @ ${10}%):</strong> SAR ${res.npv.toLocaleString()}</p>
    <hr>
  `;

  res.cashFlows.forEach(cf => {
    const row = document.createElement("p");
    row.innerHTML = `
      Year ${cf.year}: NOI SAR ${cf.noi.toLocaleString()} — Discounted SAR ${cf.discounted.toLocaleString()}
    `;
    container.appendChild(row);
  });
}
