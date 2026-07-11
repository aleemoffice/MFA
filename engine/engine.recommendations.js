// Consultant-grade recommendations based on sensitivity + Monte Carlo

export function buildRecommendations(payload) {
  console.log("[Recommendations] Building recommendations");

  const { baseModel, drivers, matrix, charts, ve, mc } = payload;

  const recs = [];

  // Example: rent sensitivity
  const maxRentImpact = Math.max(
    ...drivers.rentCases.map(c => Math.abs(c.noi - baseModel.noi))
  );
  if (maxRentImpact > baseModel.noi * 0.15) {
    recs.push({
      type: "risk",
      label: "High rent sensitivity",
      detail: "NOI is highly sensitive to rent shocks; consider conservative rent assumptions and pre-leasing."
    });
  }

  // Example: CAPEX sensitivity
  const maxCapexImpact = Math.max(
    ...drivers.capexCases.map(c => Math.abs(c.capex - baseModel.capex))
  );
  if (maxCapexImpact > baseModel.capex * 0.15) {
    recs.push({
      type: "risk",
      label: "High CAPEX sensitivity",
      detail: "Project value is highly sensitive to CAPEX; tighten VE and procurement strategy."
    });
  }

  // Example: Monte Carlo
  if (mc.stats.irrP10 < baseModel.targetIRR) {
    recs.push({
      type: "risk",
      label: "IRR downside risk",
      detail: `P10 IRR (${(mc.stats.irrP10 * 100).toFixed(1)}%) is below target; consider de-risking rent or CAPEX.`
    });
  }

  if (mc.stats.irrP90 > baseModel.targetIRR * 1.2) {
    recs.push({
      type: "opportunity",
      label: "Upside IRR potential",
      detail: `P90 IRR (${(mc.stats.irrP90 * 100).toFixed(1)}%) suggests upside; explore VE and leasing optimization.`
    });
  }

  // VE impact
  const veNPVDelta = ve.veModel.capex * -1 + ve.veModel.noi * ve.baseline.years
                    - (ve.baseline.capex * -1 + ve.baseline.noi * ve.baseline.years);

  if (veNPVDelta > 0) {
    recs.push({
      type: "opportunity",
      label: "Positive VE impact",
      detail: "VE package improves NPV; prioritize VE implementation with controlled technical risk."
    });
  }

  return recs;
}
