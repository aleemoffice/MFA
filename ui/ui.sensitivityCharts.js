import { buildChartDatasets } from "../engine/engine.sensitivityCharts.js";

export function renderChartsUI(baseModel, drivers, matrix, cfg = {}) {
  console.log("[UI:Charts] Rendering chart datasets");

  const charts = buildChartDatasets(baseModel, drivers, matrix, cfg);

  return charts;
}
