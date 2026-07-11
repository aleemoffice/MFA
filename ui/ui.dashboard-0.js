// ui.dashboard.js — FINAL VERSION (ES MODULE)

import { UI } from "./ui.common.js";

export function renderDashboard(data) {
  // Safety: if no data yet, show placeholders
  if (!data) {
    UI.qs("#kpi_capex").textContent = "–";
    UI.qs("#kpi_tenant").textContent = "–";
    UI.qs("#kpi_noi").textContent = "–";
    UI.qs("#kpi_roi_npv").textContent = "–";
    UI.qs("#eng_summary").textContent = "–";
    return;
  }

  // KPI updates
  UI.qs("#kpi_capex").textContent = UI.money(data.ownerCapex || 0);
  UI.qs("#kpi_tenant").textContent = UI.money(data.tenantFitout || 0);
  UI.qs("#kpi_noi").textContent = UI.money(data.noi || 0);
  UI.qs("#kpi_roi_npv").textContent = `${data.roi || 0}% / ${UI.money(data.npv || 0)}`;

  // Engineering summary
  UI.qs("#eng_summary").textContent =
    `TR: ${data.totalTR || 0}, ` +
    `kVA: ${data.totalKVA || 0}, ` +
    `Fixture Units: ${data.totalFU || 0}, ` +
    `Sprinkler Heads: ${data.totalSprinklers || 0}, ` +
    `ICT Points: ${data.totalICT || 0}`;

  // Placeholder charts (you can replace with real chart.js later)
  UI.qs("#chart_area_mix").textContent = "[Area mix chart]";
  UI.qs("#chart_csi_divisions").textContent = "[CSI division chart]";
}
