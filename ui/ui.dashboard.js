// ui.dashboard.js — UPDATED FOR STORAGE + AUTH

import { AUTH } from "../engine.auth.js";

export function renderDashboard(results) {
  if (!results) return;

  // KPI updates
  document.getElementById("kpi_capex").textContent = results.capex || "–";
  document.getElementById("kpi_tenant").textContent = results.tenant || "–";
  document.getElementById("kpi_noi").textContent = results.noi || "–";
  document.getElementById("kpi_roi_npv").textContent = results.roi_npv || "–";

  // Engineering summary
  document.getElementById("eng_summary").textContent =
    results.summary || "Engineering summary unavailable.";

  // Auth badge (optional)
  const status = document.getElementById("authStatus");
  if (status && AUTH.isLoggedIn()) {
    status.textContent = `Logged in as ${AUTH.currentUser.username} (${AUTH.currentUser.role})`;
  }
}
