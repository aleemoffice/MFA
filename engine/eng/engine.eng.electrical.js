// engine.eng.electrical.js — FINAL VERSION (ES MODULE)

export const ELEC_RULES = {
  // Lighting load (W/m²)
  lightingDensity(type) {
    const map = {
      Retail: 15,
      Restaurant: 18,
      Cinema: 12,
      Corridor: 10,
      Parking: 8,
      Mosque: 12
    };
    return map[type] || 12;
  },

  // Equipment load (kW)
  equipmentLoad(type) {
    const map = {
      Retail: 5,
      Restaurant: 25,
      Cinema: 40,
      Gym: 30,
      Clinic: 20
    };
    return map[type] || 5;
  },

  // Total electrical load (kW)
  totalKW(component, hvacTR) {
    const area = component.W * component.L;

    const lightingKW = (this.lightingDensity(component.type) * area) / 1000;
    const hvacKW = hvacTR * 1.2; // TR → kW
    const equipKW = this.equipmentLoad(component.type);

    return lightingKW + hvacKW + equipKW;
  },

  // Panelboard count
  panelboards(kW) {
    return Math.ceil(kW / 50); // 50 kW per panel
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  // HVAC TR is needed for electrical load
  const hvacTR = component.hvacTR || 0;

  const kw = ELEC_RULES.totalKW(component, hvacTR);
  const kva = kw * 1.25; // typical PF = 0.8
  const panels = ELEC_RULES.panelboards(kw);

  return {
    area,
    kw,
    kva,
    panelboards: panels,

    // For VE engine
    lightingWm2: ELEC_RULES.lightingDensity(component.type),
    hvacTR
  };
}
