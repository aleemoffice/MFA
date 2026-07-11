// engine.noiNpv.js — NOI / NPV ENGINE (FINAL)

import { CAPEX_ENGINE } from "./engine.capex.js";

export const FIN_RULES = {
  discountRate: 0.10,      // 10% per year
  analysisYears: 10,
  ownerYield: 0.11,        // target yield on owner CAPEX
  tenantRentFactor: 0.14   // rent as % of tenant CAPEX per year
};

export const NOI_NPV_ENGINE = {
  calculateCashFlows(APP) {
    const { totals } = CAPEX_ENGINE.calculateAll(APP);

    const ownerCapex = totals.ownerCapex;
    const tenantCapex = totals.tenantCapex;

    const baseNOI =
      ownerCapex * FIN_RULES.ownerYield +
      tenantCapex * FIN_RULES.tenantRentFactor;

    const years = FIN_RULES.analysisYears;
    const discountRate = FIN_RULES.discountRate;

    const cashFlows = [];
    for (let year = 1; year <= years; year++) {
      const growthFactor = 1 + 0.02 * (year - 1); // 2% annual growth
      const noi = baseNOI * growthFactor;
      const discounted = noi / Math.pow(1 + discountRate, year);
      cashFlows.push({ year, noi, discounted });
    }

    const npv = cashFlows.reduce((sum, cf) => sum + cf.discounted, 0);

    return {
      ownerCapex,
      tenantCapex,
      baseNOI,
      cashFlows,
      npv
    };
  }
};
