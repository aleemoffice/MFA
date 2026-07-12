import { initSensitivityTabs } from "./ui/ui.sensitivityTabs.js";

import { renderDriversUI } from "./ui/ui.sensitivityDrivers.js";
import { renderMatrixUI } from "./ui/ui.sensitivityMatrix.js";
import { renderChartsUI } from "./ui/ui.sensitivityCharts.js";
import { renderVEUI } from "./ui/ui.sensitivityVE.js";
import { renderMonteCarloUI } from "./ui/ui.sensitivityMonteCarlo.js";
import { renderRecommendationsUI } from "./ui/ui.sensitivityRecommendations.js";

// ENGINE IMPORTS
import { buildBaseModel } from "./engine/engine.baseModel.js";
import { buildDriverSensitivities } from "./engine/engine.sensitivityDrivers.js";
import { buildSensitivityMatrix } from "./engine/engine.sensitivityMatrix.js";
import { buildChartDatasets } from "./engine/engine.sensitivityCharts.js";
import { buildVEScenarios } from "./engine/engine.sensitivityVE.js";
import { runMonteCarlo } from "./engine/engine.monteCarlo.js";
import { buildRecommendations } from "./engine/engine.recommendations.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("ui.js LOADED");

  // Initialize tab system
  initSensitivityTabs();

  // ============================================================
  // 1. Build Base Model
  // ============================================================
  const baseModel = buildBaseModel();
  console.log("[Engine] Base Model:", baseModel);

  // ============================================================
  // 2. Driver Sensitivities
  // ============================================================
  const drivers = buildDriverSensitivities(baseModel);
  console.log("[Engine] Drivers:", drivers);

  // ============================================================
  // 3. Sensitivity Matrix
  // ============================================================
  const matrix = buildSensitivityMatrix(baseModel, drivers);
  console.log("[Engine] Matrix:", matrix);

  // ============================================================
  // 4. Chart Datasets
  // ============================================================
  const charts = buildChartDatasets(baseModel, drivers, matrix);
  console.log("[Engine] Charts:", charts);

  // ============================================================
  // 5. VE Scenarios
  // ============================================================
  const ve = buildVEScenarios(baseModel);
  console.log("[Engine] VE Scenarios:", ve);

  // ============================================================
  // 6. Monte Carlo Simulation
  // ============================================================
  const mc = runMonteCarlo(baseModel);
  console.log("[Engine] Monte Carlo:", mc);

  // ============================================================
  // 7. Recommendations
  // ============================================================
  const recs = buildRecommendations({
    baseModel,
    drivers,
    matrix,
    charts,
    ve,
    mc
  });
  console.log("[Engine] Recommendations:", recs);

  // ============================================================
  // 8. Render UI Panels
  // ============================================================
  renderDriversUI(drivers);
  renderMatrixUI(matrix);
  renderChartsUI(charts);
  renderVEUI(ve);
  renderMonteCarloUI(mc);
  renderRecommendationsUI(recs);
});

