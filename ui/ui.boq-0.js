// ui.boq.js — FINAL VERSION (ES MODULE)

import { UI } from "./ui.common.js";

export function renderBOQ(boq) {
  const container = UI.qs("#boq_matrix");
  UI.clear(container);

  if (!boq || !boq.items || boq.items.length === 0) {
    container.innerHTML = `
      <p style="color:#666; font-size:13px;">
        No BOQ data available. Run calculations first.
      </p>
    `;
    return;
  }

  // Owner/Tenant totals
  const ownerTotal = UI.money(boq.ownerTotal || 0);
  const tenantTotal = UI.money(boq.tenantTotal || 0);

  container.innerHTML = `
    <div class="boq-summary">
      <div class="metric-card">
        <h3>Owner BOQ Total</h3>
        <p>${ownerTotal}</p>
      </div>
      <div class="metric-card">
        <h3>Tenant BOQ Total</h3>
        <p>${tenantTotal}</p>
      </div>
    </div>

    <h3>Responsibility Matrix</h3>
    <table class="boq-table">
      <thead>
        <tr>
          <th>CSI Code</th>
          <th>Description</th>
          <th>Division</th>
          <th>Cost</th>
          <th>Owner</th>
          <th>Tenant</th>
        </tr>
      </thead>
      <tbody>
        ${boq.items.map(item => `
          <tr>
            <td>${item.code}</td>
            <td>${item.desc}</td>
            <td>${item.division}</td>
            <td>${UI.money(item.cost)}</td>
            <td>${item.owner ? "✔" : ""}</td>
            <td>${item.tenant ? "✔" : ""}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

