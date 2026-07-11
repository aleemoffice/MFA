// engine.eng.hvac.js — FINAL VERSION (ES MODULE)

export const HVAC_RULES = {
  // Cooling load (TR)
  coolingTR(component) {
    const area = component.W * component.L;
    const occ = component.occupancy || 0;

    const base = 0.12; // TR per m² (Saudi climate)
    const occLoad = occ * 0.15; // TR per person

    const envelopeFactor = {
      Standard: 1.0,
      Premium: 0.85,
      Poor: 1.2
    }[component.envelope || "Standard"];

    return (area * base + occLoad) * envelopeFactor;
  },

  // Airflow (CFM)
  airflowCFM(TR) {
    return TR * 400;
  },

  // Duct area (m²)
  ductArea(CFM) {
    return CFM / 350;
  },

  // Refrigerant piping (m)
  refrigerantLength(component) {
    return component.W + component.L;
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  // Required TR (baseline)
  const tr_required = HVAC_RULES.coolingTR(component);

  // Actual TR (if user overrides)
  const tr = component.hvacTR || tr_required;

  const cfm = HVAC_RULES.airflowCFM(tr);
  const duct = HVAC_RULES.ductArea(cfm);
  const refLen = HVAC_RULES.refrigerantLength(component);

  return {
    area,
    tr,
    tr_required,
    cfm,
    ductArea: duct,
    refrigerantLength: refLen,

    // For VE engine
    hvacTR: tr,
    hvacTR_required: tr_required,

    // For VE logic (VRF vs AHU)
    hvacType: component.hvacType || "VRF",
    lightingWm2: component.lightingWm2 || 12
  };
}
