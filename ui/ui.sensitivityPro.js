// Final orchestrator for Sensitivity Lab

import { loadSensitivityLab } from "./ui.sensitivityPro.js";
import { renderDriversUI } from "./ui.sensitivityDrivers.js";
import { renderMatrixUI } from "./ui.sensitivityMatrix.js";
import { renderChartsUI } from "./ui.sensitivityCharts.js";
import { renderVEUI } from "./ui.sensitivityVE.js";
import { renderMonteCarloUI } from "./ui.sensitivityMonteCarlo.js";
import { renderRecommendationsUI } from "./ui.sensitivityRecommendations.js";

import { renderTornadoChart } from "./charts/chart.tornado.js";
import { renderNPVCurve } from "./charts/chart.npvCurve.js";
import { renderIRRCurve } from "./charts/chart.irrCurve.js";
import { renderPaybackChart } from "./charts/chart.payback.js";
import { renderSpiderChart } from "./charts/chart.spider.js";
import { renderHeatmap } from "./charts/chart.heatmap.js";

export async function runSensitivityLab(baseModel) {
  console.log("[UI:Integration] Running full Sensitivity Lab");

  const result = await loadSensitivityLab(baseModel);

  const drivers = renderDriversUI(baseModel);
  const matrix = renderMatrixUI(baseModel, drivers);
  const charts = renderChartsUI(baseModel, drivers, matrix);
  const ve = renderVEUI(baseModel);
  const mc = renderMonteCarloUI(baseModel);
  const recs = renderRecommendationsUI({ baseModel, drivers, matrix, charts, ve, mc });

  // Render charts
  renderTornadoChart("tornadoCanvas", charts.tornado);
  renderNPVCurve("npvCanvas", charts.npvCurve);
  renderIRRCurve("irrCanvas", charts.irrCurve);
  renderPaybackChart("paybackCanvas", charts.paybackCurve);
  renderSpiderChart("spiderContainer", charts.spider);
  renderHeatmap("heatmapContainer", charts.heatmap);

  return {
    drivers,
    matrix,
    charts,
    ve,
    mc,
    recs
  };
}
