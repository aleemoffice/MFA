// engine.veScenario.js — VE SCENARIO ENGINE (FINAL)

import { COST_ENGINE } from "./engine.costTemplates.js";
import { MEP_ENGINE } from "./engine.mep.js";
import { FIRE_ENGINE } from "./engine.fireSafety.js";

export const VE_SCENARIO_ENGINE = {
  applyVEScenario(component) {
    const optimized = structuredClone(component);

    // 1 — Reduce cooling load by 10%
    optimized.W = component.W;
    optimized.L = component.L;
    optimized.exits = component.exits;
    optimized.travelDistance = component.travelDistance;

    // 2 — Material downgrade (if exists)
    if (component.material) {
      optimized.material = "mat_vinyl"; // cheaper flooring
    }

    // 3 — Reduce TR/kVA by 8%
    const mep = MEP_ENGINE.calculateComponent(component);
    optimized._ve_tr = mep.tr * 0.92;
    optimized._ve_kva = mep.kva * 0.92;

    return optimized;
  },

  calculateScenario(APP, scenario) {
    const components = APP.components.map(c => {
      return scenario === "ve" ? this.applyVEScenario(c) : c;
    });

    const costList = components.map(c => COST_ENGINE.calculateComponentCost(c));
    const mepList = components.map(c => MEP_ENGINE.calculateComponent(c));

    const totalCost = costList.reduce((sum, c) => sum + c.total, 0);
    const totalTR = mepList.reduce((sum, m) => sum + m.tr, 0);
    const totalKVA = mepList.reduce((sum, m) => sum + m.kva, 0);

    return {
      scenario,
      components,
      totalCost,
      totalTR,
      totalKVA
    };
  },

  compare(APP) {
    const baseline = this.calculateScenario(APP, "baseline");
    const ve = this.calculateScenario(APP, "ve");

    return {
      baseline,
      ve,
      deltaCost: ve.totalCost - baseline.totalCost,
      deltaTR: ve.totalTR - baseline.totalTR,
      deltaKVA: ve.totalKVA - baseline.totalKVA
    };
  }
};
