import { buildDriverSensitivities } from "../engine/engine.sensitivityDrivers.js";

export function renderDriversUI(baseModel, cfg = {}) {
  console.log("[UI:Drivers] Rendering driver sensitivities");

  const drivers = buildDriverSensitivities(baseModel, cfg);

  return {
    rent: drivers.rentCases,
    capex: drivers.capexCases,
    tr: drivers.trCases,
    kva: drivers.kvaCases
  };
}
