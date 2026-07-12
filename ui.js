// ==========================================
// Sensitivity Lab – Main UI Loader
// ==========================================

// Tab switching controller
import { initSensitivityTabs } from "./ui/ui.sensitivityTabs.js";

// Sensitivity modules
import { loadSensitivityDrivers } from "./ui/ui.sensitivityDrivers.js";
import { loadSensitivityMatrix } from "./ui/ui.sensitivityMatrix.js";
import { loadSensitivityCharts } from "./ui/ui.sensitivityCharts.js";
import { loadSensitivityMonteCarlo } from "./ui/ui.sensitivityMonteCarlo.js";
import { loadSensitivityRecommendations } from "./ui/ui.sensitivityRecommendations.js";
import { loadSensitivityVE } from "./ui/ui.sensitivityVE.js";
import { loadSensitivityPro } from "./ui/ui.sensitivityPro.js";

// ==========================================
// Initialize Sensitivity Lab
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

  console.log("ui.js LOADED");

  // Initialize tab switching
  initSensitivityTabs();
  console.log("Tabs initialized");

  // Load each sensitivity module
  try {
    loadSensitivityDrivers();
    loadSensitivityMatrix();
    loadSensitivityCharts();
    loadSensitivityMonteCarlo();
    loadSensitivityRecommendations();
    loadSensitivityVE();
    loadSensitivityPro();

    console.log("All sensitivity modules loaded");
  } catch (err) {
    console.error("Sensitivity Lab initialization error:", err);
  }
});
