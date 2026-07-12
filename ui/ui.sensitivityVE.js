import { buildVEScenarios } from "../engine/engine.sensitivityVE.js";

export function renderVEUI(baseModel, cfg = {}) {
  console.log("[UI:VE] Rendering VE scenarios");

  const ve = buildVEScenarios(baseModel, cfg);

  // Ensure the panel container exists
  const container = document.getElementById("veOutput");
  if (!container) {
    console.warn("[UI:VE] veOutput container not found");
    return;
  }

  // Render results
  container.innerHTML = `
    <h3>VE Scenarios</h3>
    <pre>${JSON.stringify(ve, null, 2)}</pre>
  `;

  return ve;
}
