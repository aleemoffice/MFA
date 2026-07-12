import { runMonteCarlo } from "../engine/engine.monteCarlo.js";

export function renderMonteCarloUI(baseModel, cfg = {}) {
  console.log("[UI:MC] Rendering Monte Carlo results");

  const mc = runMonteCarlo(baseModel, cfg);

  return mc;
}
