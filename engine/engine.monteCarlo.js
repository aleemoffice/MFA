// Monte Carlo simulation for IRR / NPV distributions

export function runMonteCarlo(baseModel, cfg) {
  console.log("[MonteCarlo] Running simulation");

  const {
    iterations = 2000,
    rentStd = 0.05,
    capexStd = 0.05
  } = cfg;

  const npvSamples = [];
  const irrSamples = [];

  for (let i = 0; i < iterations; i++) {
    const rentShock = randomNormal(0, rentStd);
    const capexShock = randomNormal(0, capexStd);

    const noi = baseModel.noi * (1 + rentShock);
    const capex = baseModel.capex * (1 + capexShock);

    const npv = computeNPV(noi, capex, baseModel.discountRate, baseModel.years);
    const irr = computeIRR(noi, capex, baseModel.years);

    npvSamples.push(npv);
    irrSamples.push(irr);
  }

  npvSamples.sort((a, b) => a - b);
  irrSamples.sort((a, b) => a - b);

  function percentile(arr, p) {
    const idx = Math.floor(p * (arr.length - 1));
    return arr[idx];
  }

  return {
    npvSamples,
    irrSamples,
    stats: {
      npvP10: percentile(npvSamples, 0.1),
      npvP50: percentile(npvSamples, 0.5),
      npvP90: percentile(npvSamples, 0.9),
      irrP10: percentile(irrSamples, 0.1),
      irrP50: percentile(irrSamples, 0.5),
      irrP90: percentile(irrSamples, 0.9)
    }
  };
}

function randomNormal(mean, std) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + std * z;
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
