// VE scenarios: baseline vs VE, plus shocks

export function buildVEScenarios(baseModel, cfg) {
  console.log("[VE] Building VE scenarios");

  const {
    veCapexReduction = 0.1,
    veOpexReduction = 0.05,
    shocks = [-0.1, 0, 0.1]
  } = cfg;

  const veModel = {
    ...baseModel,
    capex: baseModel.capex * (1 - veCapexReduction),
    noi: baseModel.noi * (1 + veOpexReduction)
  };

  const scenarios = shocks.map(s => {
    const noi = veModel.noi * (1 + s);
    const npv = computeNPV(noi, veModel.capex, baseModel.discountRate, baseModel.years);
    const irr = computeIRR(noi, veModel.capex, baseModel.years);

    return {
      shock: s,
      noi,
      npv,
      irr
    };
  });

  return {
    baseline: baseModel,
    veModel,
    scenarios
  };
}

function computeNPV(noi, capex, discountRate, years) {
  let npv = -capex;
  for (let t = 1; t <= years; t++) {
    npv += noi / Math.pow(1 + discountRate, t);
  }
  return npv;
}

function computeIRR(noi, capex, years) {
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
