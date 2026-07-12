import { buildVEScenarios } from "../engine/engine.sensitivityVE.js";

export function renderVEUI(baseModel, cfg = {}) {
  console.log("[UI:VE] Rendering VE scenarios");

  const ve = buildVEScenarios(baseModel, cfg);

  return ve;
}
