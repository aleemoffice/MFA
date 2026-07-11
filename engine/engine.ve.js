// engine.ve.js — VALUE ENGINEERING OPTIMIZER (FINAL)

import { COST_ENGINE } from "./engine.costTemplates.js";
import { MEP_ENGINE } from "./engine.mep.js";
import { FIRE_ENGINE } from "./engine.fireSafety.js";

export const VE_ENGINE = {
  analyzeComponent(component) {
    const cost = COST_ENGINE.calculateComponentCost(component);
    const mep = MEP_ENGINE.calculateComponent(component);
    const fire = FIRE_ENGINE.evaluateComponent(component);

    const suggestions = [];

    // Cost-driven suggestions
    if (cost.total / cost.area > 1200) {
      suggestions.push("Consider switching to lower-cost flooring or finishes for this component.");
    }

    // MEP-driven suggestions
    if (mep.tr / mep.area > 0.22) {
      suggestions.push("High TR/m² — review glazing, insulation, and internal loads to reduce cooling demand.");
    }

    if (mep.kva / mep.area > 0.16) {
      suggestions.push("High kVA/m² — consider LED lighting, efficient equipment, and load diversity.");
    }

    // Fire/Life Safety suggestions
    if (!fire.compliant) {
      suggestions.push("Resolve fire/life-safety non-compliances before VE — exits, travel distance, sprinklers, fire alarm.");
    }

    // Generic VE
    suggestions.push("Review tenant/landlord split for this component to shift non-critical CAPEX to tenant fitout.");

    return {
      id: component.id,
      type: component.type,
      cost,
      mep,
      fire,
      suggestions
    };
  },

  analyzeAll(APP) {
    return APP.components.map(c => this.analyzeComponent(c));
  }
};
