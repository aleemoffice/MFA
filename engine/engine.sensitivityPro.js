// Master orchestrator for sensitivity engines (ES module, minimal logging)

import { buildDriverSensitivities } from "./engine.sensitivityDrivers.js";
import { buildSensitivityMatrix } from "./engine.sensitivityMatrix.js";
import { buildChartDatasets } from "./engine.sensitivityCharts.js";
import { buildVEScenarios } from "./engine.sensitivityVE.js";
import { runMonteCarlo } from "./engine.monteCarlo.js";
import { buildRecommendations } from "./engine.recommendations.js";

export function runSensitivityProEngine(baseModel, config = {}) {
  console.log("[SensitivityPro] Running master engine");

  const drivers = buildDriverSensitivities(baseModel, config.drivers || {});
  const matrix = buildSensitivityMatrix(baseModel, drivers, config.matrix || {});
  const charts = buildChartDatasets(baseModel, drivers, matrix, config.charts || {});
  const ve = buildVEScenarios(baseModel, config.ve || {});
  const mc = runMonteCarlo(baseModel, config.monteCarlo || {});
  const reco = buildRecommendations({ baseModel, drivers, matrix, charts, ve, mc });

  return {
    drivers,
    matrix,
    charts,
    ve,
    monteCarlo: mc,
    recommendations: reco
  };
}
