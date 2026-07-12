// ===============================
// Sensitivity Lab – UI Controller
// ===============================

// Import tab logic module
import { initSensitivityTabs } from "./ui/ui.sensitivityTabs.js";

// Import Sensitivity Lab engines
import { runDrivers } from "./engine/engine.drivers.js";
import { runMatrix } from "./engine/engine.matrix.js";
import { runCharts } from "./engine/engine.charts.js";
import { runVE } from "./engine/engine.ve.js";
import { runMonteCarlo } from "./engine/engine.mc.js";
import { runRecommendations } from "./engine/engine.reco.js";

// ===============================
// Initialize everything
// ===============================

window.addEventListener("DOMContentLoaded", () => {

  // Initialize tab switching
  initSensitivityTabs();

  // Run each module once the page loads
  try {
    runDrivers();
    runMatrix();
    runCharts();
    runVE();
    runMonteCarlo();
    runRecommendations();
  } catch (err) {
    console.error("Sensitivity Lab initialization error:", err);
  }
});
