// engine.eng.js — FINAL VERSION (COMPATIBILITY WRAPPER)

import * as HVAC from "./engine.eng.hvac.js";
import * as Electrical from "./engine.eng.electrical.js";
import * as Plumbing from "./engine.eng.plumbing.js";
import * as Fire from "./engine.eng.fire.js";
import * as LifeSafety from "./engine.eng.lifesafety.js";
import * as Structural from "./engine.eng.structural.js";
import * as Civil from "./engine.eng.civil.js";

export const ENG = {
  perComponent: {},   // id → engineering results
  totals: {},         // global totals

  async init() {
    this.perComponent = {};
    this.totals = {
      hvac_TR: 0,
      elec_kW: 0,
      plumbing_FU: 0,
      fire_heads: 0,
      ict_points: 0
    };
  },

  computeForComponent(component) {
    const hvac = HVAC.evaluate(component);
    const elec = Electrical.evaluate(component);
    const plumbing = Plumbing.evaluate(component);
    const fire = Fire.evaluate(component);
    const life = LifeSafety.evaluate(component);
    const struct = Structural.evaluate(component);
    const civil = Civil.evaluate(component);

    const result = {
      hvac_TR: hvac.tr,
      elec_kW: elec.kw,
      plumbing_FU: plumbing.fixtureUnits,
      fire_heads: fire.sprinklerHeads,
      ict_points: life.ictPoints,

      // full engine payload for debugging or legacy UI
      hvac,
      elec,
      plumbing,
      fire,
      life,
      struct,
      civil
    };

    this.perComponent[component.id] = result;
    return result;
  },

  recomputeAll(components) {
    this.init();

    components.forEach(c => {
      const r = this.computeForComponent(c);

      this.totals.hvac_TR += r.hvac_TR;
      this.totals.elec_kW += r.elec_kW;
      this.totals.plumbing_FU += r.plumbing_FU;
      this.totals.fire_heads += r.fire_heads;
      this.totals.ict_points += r.ict_points;
    });

    return this.totals;
  }
};
