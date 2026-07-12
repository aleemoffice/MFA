import { buildSensitivityMatrix } from "../engine/engine.sensitivityMatrix.js";

export function renderMatrixUI(baseModel, drivers, cfg = {}) {
  console.log("[UI:Matrix] Rendering sensitivity matrix");

  const matrix = buildSensitivityMatrix(baseModel, drivers, cfg);

  // Ensure the panel container exists
  const container = document.getElementById("matrixOutput");
  if (!container) {
    console.warn("[UI:Matrix] matrixOutput container not found");
    return;
  }

  // Render results
  container.innerHTML = `
    <h3>Sensitivity Matrix</h3>
    <pre>${JSON.stringify(matrix, null, 2)}</pre>
  `;

  return matrix;
}
