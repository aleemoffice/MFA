// ui.veScenario.js — VE SCENARIO UI (FINAL)

import { VE_SCENARIO_ENGINE } from "../engine.veScenario.js";
import { APP } from "../ui.js";

export function renderVEScenario() {
  const container = document.getElementById("ve_scenario");
  if (!container) return;

  const results = VE_SCENARIO_ENGINE.compare(APP);

  container.innerHTML = `
    <h3>VE Scenario Toggle</h3>
    <button id="btnBaseline">Baseline Scenario</button>
    <button id="btnVE">VE Scenario</button>
    <hr>
    <h3>CAPEX Impact</h3>
    <p><strong>Baseline CAPEX:</strong> SAR ${results.baseline.totalCost.toLocaleString()}</p>
    <p><strong>VE CAPEX:</strong> SAR ${results.ve.totalCost.toLocaleString()}</p>
    <p><strong>CAPEX Delta:</strong> 
      <span style="color:${results.deltaCost < 0 ? '#16a34a' : '#dc2626'};">
        ${results.deltaCost.toLocaleString()} SAR
      </span>
    </p>
    <hr>
    <p><strong>TR Delta:</strong> ${results.deltaTR.toFixed(2)} TR</p>
    <p><strong>KVA Delta:</strong> ${results.deltaKVA.toFixed(2)} kVA</p>
  `;

  document.getElementById("btnBaseline").onclick = () => {
    alert("Baseline scenario applied.");
  };

  document.getElementById("btnVE").onclick = () => {
    alert("VE scenario applied (not modifying actual components).");
  };
}
