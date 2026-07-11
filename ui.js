import { initSensitivityTabs } from "./ui/ui.sensitivityTabs.js";
import { runSensitivityLab } from "./ui/ui.sensitivityPro.js";

window.addEventListener("DOMContentLoaded", async () => {
  console.log("[UI.js] Initializing Sensitivity Lab");

  initSensitivityTabs();

  // Example base model — replace with your actual feasibility inputs
  const baseModel = {
    noi: 1200000,
    capex: 8500000,
    tr: 0.92,
    kva: 1800,
    discountRate: 0.10,
    years: 20,
    targetIRR: 0.14
  };

  const result = await runSensitivityLab(baseModel);

  document.getElementById("driversOutput").innerHTML =
    JSON.stringify(result.drivers, null, 2);

  document.getElementById("matrixOutput").innerHTML =
    JSON.stringify(result.matrix, null, 2);

  document.getElementById("veOutput").innerHTML =
    JSON.stringify(result.ve, null, 2);

  document.getElementById("mcOutput").innerHTML =
    JSON.stringify(result.mc, null, 2);

  document.getElementById("recoOutput").innerHTML =
    JSON.stringify(result.recs, null, 2);
});
