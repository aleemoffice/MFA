import { runMonteCarlo } from "../engine/engine.monteCarlo.js";

export function renderMonteCarloUI(baseModel, cfg = {}) {
  console.log("[UI:MC] Rendering Monte Carlo results");

  const mc = runMonteCarlo(baseModel, cfg);

  // Ensure the panel exists
  const container = document.getElementById("mcOutput");
  if (!container) {
    console.warn("[UI:MC] mcOutput container not found");
    return;
  }

  // Render results safely
  container.innerHTML = `
    <h3>Simulation Results</h3>
    <p><strong>Mean:</strong> ${mc.mean}</p>
    <p><strong>Median:</strong> ${mc.median}</p>
    <p><strong>Std Dev:</strong> ${mc.stdDev}</p>
    <p><strong>Min:</strong> ${mc.min}</p>
    <p><strong>Max:</strong> ${mc.max}</p>
  `;

  return mc;
}
