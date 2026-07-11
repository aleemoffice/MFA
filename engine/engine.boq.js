// engine.boq.js — BOQ AUTO-GENERATOR (FINAL)

import { MATERIAL_DB } from "./engine.materialSelector.js";
import { MEP_ENGINE } from "./engine.mep.js";
import { FIRE_ENGINE } from "./engine.fireSafety.js";

export const BOQ_ENGINE = {
  generateComponentBOQ(component) {
    const area = component.W * component.L;

    const mep = MEP_ENGINE.calculateComponent(component);
    const fire = FIRE_ENGINE.evaluateComponent(component);

    const material = component.material
      ? MATERIAL_DB.architectural.find(m => m.id === component.material) ||
        MATERIAL_DB.mep.find(m => m.id === component.material) ||
        MATERIAL_DB.fire.find(m => m.id === component.material) ||
        MATERIAL_DB.electrical.find(m => m.id === component.material)
      : null;

    const boq = [];

    // Architectural
    boq.push({
      division: "09 — Finishes",
      item: material ? material.name : "Default Flooring",
      qty: area,
      unit: material ? material.unit : "m2",
      remarks: "Flooring / finishes"
    });

    // MEP
    boq.push({
      division: "15 — HVAC",
      item: "Air Diffusers",
      qty: mep.diffusers,
      unit: "unit",
      remarks: "MEP Auto-Engine"
    });

    boq.push({
      division: "15 — HVAC",
      item: "Sprinklers",
      qty: mep.sprinklers,
      unit: "unit",
      remarks: "MEP Auto-Engine"
    });

    boq.push({
      division: "16 — Electrical",
      item: "Electrical Load",
      qty: mep.kva.toFixed(1),
      unit: "kVA",
      remarks: "MEP Auto-Engine"
    });

    // Fire/Life Safety
    boq.push({
      division: "21 — Fire Protection",
      item: "Fire Alarm Devices",
      qty: fire.fireAlarm ? 1 : 0,
      unit: "system",
      remarks: fire.compliant ? "Compliant" : "Non-compliant"
    });

    return boq;
  },

  generateAll(APP) {
    const all = APP.components.map(c => ({
      id: c.id,
      type: c.type,
      boq: this.generateComponentBOQ(c)
    }));

    return all;
  }
};
