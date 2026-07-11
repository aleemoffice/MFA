// engine.eng.lifesafety.js — FINAL VERSION (ES MODULE)

export const LIFE_RULES = {
  // Occupancy load
  occupancy(component) {
    const area = component.W * component.L;
    const occDensity = component.occupancy || 1.5; // persons per m²
    return Math.ceil(area * occDensity);
  },

  // Required exits
  exitsRequired(occ) {
    return Math.ceil(occ / 50);
  },

  // Required egress width (mm)
  egressWidth(occ) {
    return occ * 6; // SBC: 6 mm per person
  },

  // Travel distance OK?
  travelDistanceOK(component) {
    return component.travelDistance <= 45; // SBC limit
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  const occ = LIFE_RULES.occupancy(component);
  const exitsReq = LIFE_RULES.exitsRequired(occ);
  const egressReq = LIFE_RULES.egressWidth(occ);
  const travelOK = LIFE_RULES.travelDistanceOK(component);

  return {
    area,
    occupancy: occ,
    exitsRequired: exitsReq,
    egressWidthRequired: egressReq,
    travelDistanceOK: travelOK,

    // For VE engine
    ictPoints: Math.ceil(area / 25) // simple ICT density rule
  };
}
