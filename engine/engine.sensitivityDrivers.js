// Drivers: rent, CAPEX, TR, kVA, etc.

export function buildDriverSensitivities(baseModel, cfg) {
  console.log("[Drivers] Building driver sensitivities");

  const {
    rentShockRange = [-0.2, -0.1, 0, 0.1, 0.2],
    capexShockRange = [-0.2, -0.1, 0, 0.1, 0.2],
    trShockRange = [-0.15, 0, 0.15],
    kvaShockRange = [-0.15, 0, 0.15]
  } = cfg;

  function applyShock(value, shock) {
    return value * (1 + shock);
  }

  const rentCases = rentShockRange.map(shock => ({
    shock,
    noi: applyShock(baseModel.noi, shock)
  }));

  const capexCases = capexShockRange.map(shock => ({
    shock,
    capex: applyShock(baseModel.capex, shock)
  }));

  const trCases = trShockRange.map(shock => ({
    shock,
    tr: applyShock(baseModel.tr, shock)
  }));

  const kvaCases = kvaShockRange.map(shock => ({
    shock,
    kva: applyShock(baseModel.kva, shock)
  }));

  return {
    rentCases,
    capexCases,
    trCases,
    kvaCases
  };
}
