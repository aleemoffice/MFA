// engine.irrPayback.js — IRR + PAYBACK ENGINE (FINAL)

import { NOI_NPV_ENGINE } from "./engine.noiNpv.js";

export const IRR_PAYBACK_ENGINE = {
  calculate(APP) {
    const res = NOI_NPV_ENGINE.calculateCashFlows(APP);

    const ownerCapex = res.ownerCapex;
    const tenantCapex = res.tenantCapex;
    const totalCapex = ownerCapex + tenantCapex;

    const cashFlows = res.cashFlows.map(cf => cf.noi);

    // -------------------------------
    // PAYBACK PERIOD
    // -------------------------------
    let cumulative = 0;
    let paybackYear = null;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulative += cashFlows[i];
      if (cumulative >= totalCapex) {
        paybackYear = i + 1;
        break;
      }
    }

    // -------------------------------
    // IRR (Newton-Raphson)
    // -------------------------------
    function npv(rate) {
      let sum = -totalCapex;
      for (let i = 0; i < cashFlows.length; i++) {
        sum += cashFlows[i] / Math.pow(1 + rate, i + 1);
      }
      return sum;
    }

    let irr = 0.1; // initial guess
    for (let i = 0; i < 50; i++) {
      const f = npv(irr);
      const fPrime = (npv(irr + 0.0001) - f) / 0.0001;
      irr = irr - f / fPrime;
    }

    return {
      ownerCapex,
      tenantCapex,
      totalCapex,
      paybackYear,
      irr: irr * 100,
      cashFlows
    };
  }
};
