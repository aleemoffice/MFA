// engine.eng.structural.js — FINAL VERSION (ES MODULE)

export const STRUCT_RULES = {
  // Slab thickness (mm)
  slabThickness(component) {
    const span = Math.max(component.W, component.L);
    return 150 + span * 2; // simple span-based rule
  },

  // Concrete volume (m³)
  concreteVolume(component) {
    const area = component.W * component.L;
    const thickness = this.slabThickness(component) / 1000; // convert mm → m
    return area * thickness;
  },

  // Rebar weight (kg)
  rebarWeight(component) {
    return this.concreteVolume(component) * 120; // 120 kg/m³ typical
  }
};

// -------------------------------------------------------------
// MAIN EVALUATION FUNCTION (REQUIRED BY engine.run.js)
// -------------------------------------------------------------
export function evaluate(component) {
  const area = component.W * component.L;

  const thickness = STRUCT_RULES.slabThickness(component);
  const concrete = STRUCT_RULES.concreteVolume(component);
  const rebar = STRUCT_RULES.rebarWeight(component);

  return {
    area,
    slabThickness: thickness,
    concreteVolume: concrete,
    rebarWeight: rebar
  };
}
