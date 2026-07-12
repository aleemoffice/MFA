// ui.ownerTenant.js — FINAL VERSION (ES MODULE)

import { UI } from "./ui.common.js";
import { UIF } from "./ui.framework.js";

export function renderOwnerTenant(data) {
  const container = UI.qs("#ownerTenantPanel");
  UI.clear(container);

  // -------------------------------------------------------------
  // OWNER TABLE
  // -------------------------------------------------------------
  const ownerTable = UIF.table(
    ["Description", "Qty", "Cost"],
    data.owner.map(item => [
      item.desc,
      UI.fmt(item.qty),
      UI.money(item.cost)
    ])
  );

  // -------------------------------------------------------------
  // TENANT TABLE
  // -------------------------------------------------------------
  const tenantTable = UIF.table(
    ["Description", "Qty", "Cost"],
    data.tenant.map(item => [
      item.desc,
      UI.fmt(item.qty),
      UI.money(item.cost)
    ])
  );

  // -------------------------------------------------------------
  // TOTALS PANEL
  // -------------------------------------------------------------
  const totalsPanel = UIF.panel(
    "Totals",
    `
      <div class="ot-totals">
        <div class="ot-total-item">
          <h3>Owner Total</h3>
          <p>${UI.money(data.ownerTotal)}</p>
        </div>
        <div class="ot-total-item">
          <h3>Tenant Total</h3>
          <p>${UI.money(data.tenantTotal)}</p>
        </div>
      </div>
    `
  );

  // -------------------------------------------------------------
  // CHART (Owner vs Tenant)
  // -------------------------------------------------------------
  const chart = UIF.chart(
    "otChart",
    "pie",
    ["Owner", "Tenant"],
    [data.ownerTotal, data.tenantTotal],
    "Cost Distribution"
  );

  // -------------------------------------------------------------
  // FINAL RENDER
  // -------------------------------------------------------------
  container.innerHTML = UIF.section(
    "Owner / Tenant Responsibility",
    UIF.tabs([
      {
        label: "Owner Scope",
        content: UIF.panel("Owner BOQ", ownerTable)
      },
      {
        label: "Tenant Scope",
        content: UIF.panel("Tenant BOQ", tenantTable)
      },
      {
        label: "Totals",
        content: totalsPanel
      },
      {
        label: "Chart",
        content: chart
      }
    ])
  );
}

