// engine.capex.js — OWNER vs TENANT CAPEX MODEL (FINAL)

import { COST_ENGINE } from "./engine.costTemplates.js";
import { MEP_ENGINE } from "./engine.mep.js";
import { FIRE_ENGINE } from "./engine.fireSafety.js";

export const CAPEX_RULES = {
  ownerShare: {
    baseFitout: 0.7,   // 70% of base fitout cost
    mep: 1.0,          // owner pays full MEP infra
    fire: 1.0,         // owner pays full fire/life safety
    coreFinishes: 1.0  // owner pays core finishes
  },
  tenantShare: {
    baseFitout: 0.3,   // 30% of base fitout cost
    premiumFinishes: 1.0,
    specialtyMEP: 1.0
  }
};

export const CAPEX_ENGINE = {
  calculateComponent(component) {
    const cost = COST_ENGINE.calculateComponentCost(component);
    const mep = MEP_ENGINE.calculateComponent(component);
    const fire = FIRE_ENGINE.evaluateComponent(component);

    const baseFitoutCost = cost.baseCost;
    const materialCost = cost.materialCost;

    const ownerBaseFitout = baseFitoutCost * CAPEX_RULES.ownerShare.baseFitout;
    const tenantBaseFitout = baseFitoutCost * CAPEX_RULES.tenantShare.baseFitout;

    const ownerMEP =
      (mep.tr * 1500) + // TR infra cost
      (mep.kva * 400);  // electrical infra

    const ownerFire =
      (fire.sprinklers ? mep.sprinklers * 250 : 0) +
      (fire.fireAlarm ? 5000 : 0);

    const ownerCoreFinishes = materialCost * 0.4;
    const tenantPremiumFinishes = materialCost * 0.6;

    const ownerCapex =
      ownerBaseFitout + ownerMEP + ownerFire + ownerCoreFinishes;

    const tenantCapex =
      tenantBaseFitout + tenantPremiumFinishes; // specialty MEP could be added

    return {
      id: component.id,
      type: component.type,
      area: cost.area,
      ownerCapex,
      tenantCapex,
      ownerBaseFitout,
      tenantBaseFitout,
      ownerMEP,
      ownerFire,
      ownerCoreFinishes,
      tenantPremiumFinishes
    };
  },

  calculateAll(APP) {
    const perComponent = APP.components.map(c => this.calculateComponent(c));

    const totals = perComponent.reduce(
      (acc, c) => {
        acc.ownerCapex += c.ownerCapex;
        acc.tenantCapex += c.tenantCapex;
        acc.area += c.area;
        return acc;
      },
      { ownerCapex: 0, tenantCapex: 0, area: 0 }
    );

    return { perComponent, totals };
  }
};
