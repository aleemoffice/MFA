import { buildChartDatasets } from "../engine/engine.sensitivityCharts.js";

export function renderChartsUI(baseModel, drivers, matrix, cfg = {}) {
  console.log("[UI:Charts] Rendering chart datasets");

  const charts = buildChartDatasets(baseModel, drivers, matrix, cfg);

  // Ensure the panel container exists
  const container = document.getElementById("chartsOutput");
  if (!container) {
    console.warn("[UI:Charts] chartsOutput container not found");
    return;
  }

  // Render results
  container.innerHTML = `
    <h3>Chart Datasets</h3>
    <pre>${JSON.stringify(charts, null, 2)}</pre>
  `;

  return charts;
}
