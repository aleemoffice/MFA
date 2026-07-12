import { buildDriverSensitivities } from "../engine/engine.sensitivityDrivers.js";

export function renderDriversUI(baseModel, cfg = {}) {
  console.log("[UI:Drivers] Rendering driver sensitivities");

  const drivers = buildDriverSensitivities(baseModel, cfg);

  // Ensure the panel container exists
  const container = document.getElementById("driversOutput");
  if (!container) {
    console.warn("[UI:Drivers] driversOutput container not found");
    return;
  }

  // Render results
  container.innerHTML = `
    <h3>Driver Sensitivity Cases</h3>

    <div class="driver-group">
      <h4>Rent Cases</h4>
      <pre>${JSON.stringify(drivers.rentCases, null, 2)}</pre>
    </div>

    <div class="driver-group">
      <h4>Capex Cases</h4>
      <pre>${JSON.stringify(drivers.capexCases, null, 2)}</pre>
    </div>

    <div class="driver-group">
      <h4>TR Cases</h4>
      <pre>${JSON.stringify(drivers.trCases, null, 2)}</pre>
    </div>

    <div class="driver-group">
      <h4>KVA Cases</h4>
      <pre>${JSON.stringify(drivers.kvaCases, null, 2)}</pre>
    </div>
  `;

  return {
    rent: drivers.rentCases,
    capex: drivers.capexCases,
    tr: drivers.trCases,
    kva: drivers.kvaCases
  };
}
