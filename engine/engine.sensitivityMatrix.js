// Multi-variable matrix (e.g., rent vs CAPEX)

export function buildSensitivityMatrix(baseModel, drivers, cfg) {
  console.log("[Matrix] Building multi-variable sensitivity matrix");

  const {
    rentShocks = drivers.rentCases.map(c => c.shock),
    capexShocks = drivers.capexCases.map(c => c.shock)
  } = cfg;

  const matrix = [];

  rentShocks.forEach(rShock => {
    capexShocks.forEach(cShock => {
      const noi = baseModel.noi * (1 + rShock);
      const capex = baseModel.capex * (1 + cShock);
      const npv = computeNPV(noi, capex, baseModel.discountRate, baseModel.years);
      const irr = computeIRR(noi, capex, baseModel.years);

      matrix.push({
        rentShock: rShock,
        capexShock: cShock,
        npv,
        irr
      });
    });
  });

  return matrix;
}

function computeNPV(noi, capex, discountRate, years) {
  let npv = -capex;
  for (let t = 1; t <= years; t++) {
    npv += noi / Math.pow(1 + discountRate, t);
  }
  return npv;
}

function computeIRR(noi, capex, years) {
  // Simple IRR approximation via binary search
  let low = -0.5, high = 0.5;
  for (let i = 0; i < 40; i++) {
    const mid = (low + high) / 2;
    let npv = -capex;
    for (let t = 1; t <= years; t++) {
      npv += noi / Math.pow(1 + mid, t);
    }
    if (npv > 0) low = mid; else high = mid;
  }
  return (low + high) / 2;
}
