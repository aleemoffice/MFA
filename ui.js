import { initSensitivityTabs } from "./ui/ui.sensitivityTabs.js";

import { renderDriversUI } from "./ui/ui.sensitivityDrivers.js";
import { renderMatrixUI } from "./ui/ui.sensitivityMatrix.js";
import { renderChartsUI } from "./ui/ui.sensitivityCharts.js";
import { renderVEUI } from "./ui/ui.sensitivityVE.js";
import { renderMonteCarloUI } from "./ui/ui.sensitivityMonteCarlo.js";
import { renderRecommendationsUI } from "./ui/ui.sensitivityRecommendations.js";

// 🚫 No baseModel import here
// 🚫 No engine.baseModel.js usage

window.addEventListener("DOMContentLoaded", () => {
  console.log("ui.js LOADED");

  // Tabs must always work
  initSensitivityTabs();

  // For now, use simple stubs so nothing crashes
  const baseModel = {};          // temporary placeholder
  const drivers   = {};          // temporary placeholder
  const matrix    = {};          // temporary placeholder
  const charts    = {};          // temporary placeholder
  const ve        = {};          // temporary placeholder
  const mc        = {};          // temporary placeholder

  // These will render JSON stubs into each panel
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

