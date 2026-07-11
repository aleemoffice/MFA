// engine.eng.fire.js — FINAL VERSION (ES MODULE)

export const FIRE_RULES = {
  // Sprinkler head count
  sprinklerHeads(component) {
    const area = component.W * component.L;
    return Math.ceil(area / 12); // 12 m² per head
  },

  // Standpipe length (m)
  standpipeLength(component) {
    return component.W + component.L;
  },

  // Pump requirement
  pumpRequired(component) {
    return component.type !== "Parking"; // all occupied spaces need pumps
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  const heads = FIRE_RULES.sprinklerHeads(component);
  const standpipe = FIRE_RULES.standpipeLength(component);
  const pump = FIRE_RULES.pumpRequired(component);

  return {
    area,
    sprinklerHeads: heads,
    standpipeLength: standpipe,
    firePump: pump
  };
}
