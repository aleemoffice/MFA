import { initSensitivityTabs } from "./ui/ui.sensitivityTabs.js";

import { renderDriversUI } from "./ui/ui.sensitivityDrivers.js";
import { renderMatrixUI } from "./ui/ui.sensitivityMatrix.js";
import { renderChartsUI } from "./ui/ui.sensitivityCharts.js";
import { renderVEUI } from "./ui/ui.sensitivityVE.js";
import { renderMonteCarloUI } from "./ui/ui.sensitivityMonteCarlo.js";
import { renderRecommendationsUI } from "./ui/ui.sensitivityRecommendations.js";

import { buildBaseModel } from "./engine/engine.baseModel.js";
import { buildDriverSensitivities } from "./engine/engine.sensitivityDrivers.js";
import { buildSensitivityMatrix } from "./engine/engine.sensitivityMatrix.js";
import { buildChartDatasets } from "./engine/engine.sensitivityCharts.js";
import { buildVEScenarios } from "./engine/engine.sensitivityVE.js";
import { runMonteCarlo } from "./engine/engine.monteCarlo.js";
import { buildRecommendations } from "./engine/engine.recommendations.js";

window.addEventListener("DOMContentLoaded", () => {
  console.log("ui.js LOADED");

  // Initialize tabs
  initSensitivityTabs();

  // Build core model
  const baseModel = buildBaseModel();

  // Build drivers
  const drivers = buildDriverSensitivities(baseModel);

  // Build matrix
  const matrix = buildSensitivityMatrix(baseModel, drivers);

  // Build charts
  const charts = buildChartDatasets(baseModel, drivers, matrix);

  // Build VE
  const ve = buildVEScenarios(baseModel);

  // Build Monte Carlo
  const mc = runMonteCarlo(baseModel);

  // Build recommendations
  const recs = buildRecommendations({
    baseModel,
    drivers,
    matrix,
    charts,
    ve,
    mc
  });

  // Render UI panels
  renderDriversUI(baseModel);
  renderMatrixUI(baseModel, drivers);
  renderChartsUI(baseModel, drivers, matrix);
  renderVEUI(baseModel);
  renderMonteCarloUI(baseModel);
  renderRecommendationsUI({
    baseModel,
    drivers,
    matrix,
    charts,
    ve,
    mc
  });
});
