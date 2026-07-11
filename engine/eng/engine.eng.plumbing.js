// engine.eng.plumbing.js — FINAL VERSION (ES MODULE)

export const PLUMBING_RULES = {
  // Fixture density (fixtures per 100 m²)
  fixtureDensity(type) {
    const map = {
      Restaurant: 6,
      Retail: 2,
      Cinema: 8,
      Mosque: 10,
      Clinic: 12
    };
    return map[type] || 2;
  },

  // Fixture units (FU)
  fixtureUnits(component) {
    const area = component.W * component.L;
    const density = this.fixtureDensity(component.type);
    return (area / 100) * density;
  },

  // Drainage length (m)
  drainageLength(component) {
    return component.W + component.L;
  },

  // Water demand (L/day)
  waterDemand(FU) {
    return FU * 90; // typical FU → L/day conversion
  },

  // Sewer load (L/day)
  sewerLoad(FU) {
    return FU * 80;
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  const fu = PLUMBING_RULES.fixtureUnits(component);
  const drainage = PLUMBING_RULES.drainageLength(component);
  const water = PLUMBING_RULES.waterDemand(fu);
  const sewer = PLUMBING_RULES.sewerLoad(fu);

  return {
    area,
    fixtureUnits: fu,
    drainageLength: drainage,
    waterDemand: water,
    sewerLoad: sewer
  };
}
