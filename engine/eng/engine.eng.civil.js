// engine.eng.civil.js — FINAL VERSION (ES MODULE)

export const CIVIL_RULES = {
  // Excavation volume (m³)
  excavation(component) {
    return component.W * component.L * (component.depth || 1.5);
  },

  // Backfill volume (m³)
  backfill(component) {
    return this.excavation(component) * 0.9;
  },

  // Asphalt area (m²)
  asphalt(component) {
    return component.W * component.L;
  },

  // Utilities trench length (m)
  utilitiesLength(component) {
    return component.W + component.L;
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  const excavation = CIVIL_RULES.excavation(component);
  const backfill = CIVIL_RULES.backfill(component);
  const asphalt = CIVIL_RULES.asphalt(component);
  const utilities = CIVIL_RULES.utilitiesLength(component);

  return {
    area,
    excavationVolume: excavation,
    backfillVolume: backfill,
    asphaltArea: asphalt,
    utilitiesLength: utilities
  };
}
