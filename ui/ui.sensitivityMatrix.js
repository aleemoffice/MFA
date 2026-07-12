import { buildSensitivityMatrix } from "../engine/engine.sensitivityMatrix.js";

export function renderMatrixUI(baseModel, drivers, cfg = {}) {
  console.log("[UI:Matrix] Rendering sensitivity matrix");

  const matrix = buildSensitivityMatrix(baseModel, drivers, cfg);

  return matrix;
}
