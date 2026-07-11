// ui.irrPayback.js — IRR + PAYBACK UI (FINAL)

import { IRR_PAYBACK_ENGINE } from "../engine.irrPayback.js";
import { APP } from "../ui.js";

export function renderIRRPaybackPanel() {
  const container = document.getElementById("irr_payback_panel");
  if (!container) return;

  const res = IRR_PAYBACK_ENGINE.calculate(APP);

  container.innerHTML = `
    <h3>IRR & Payback Period</h3>
    <p><strong>Total CAPEX:</strong> SAR ${res.totalCapex.toLocaleString()}</p>
    <p><strong>Payback Period:</strong> ${res.paybackYear ? res.paybackYear + " years" : "Not reached in 10 years"}</p>
    <p><strong>IRR:</strong> ${res.irr.toFixed(2)}%</p>
    <hr>
    <h4>Cashflow Timeline</h4>
  `;

  res.cashFlows.forEach((cf, i) => {
    const row = document.createElement("p");
    row.innerHTML = `Year ${i + 1}: NOI SAR ${cf.toLocaleString()}`;
    container.appendChild(row);
  });
}
