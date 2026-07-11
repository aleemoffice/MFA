export const MATERIAL_DB = {
  architectural: [
    { id: "mat_floor_tile", name: "Floor Tile 600x600", cost: 85, unit: "m2" },
    { id: "mat_vinyl", name: "Vinyl Flooring", cost: 55, unit: "m2" },
    { id: "mat_paint", name: "Wall Paint (Acrylic)", cost: 22, unit: "m2" }
  ],
  mep: [
    { id: "mat_fc_unit", name: "Fan Coil Unit", cost: 1800, unit: "unit" },
    { id: "mat_diffuser", name: "Air Diffuser", cost: 95, unit: "unit" },
    { id: "mat_duct", name: "GI Ducting", cost: 120, unit: "m2" }
  ],
  fire: [
    { id: "mat_sprinkler", name: "Sprinkler Head", cost: 45, unit: "unit" },
    { id: "mat_fa_detector", name: "Smoke Detector", cost: 65, unit: "unit" },
    { id: "mat_fa_panel", name: "Fire Alarm Panel", cost: 3500, unit: "unit" }
  ],
  electrical: [
    { id: "mat_lighting_led", name: "LED Lighting Fixture", cost: 120, unit: "unit" },
    { id: "mat_cable", name: "Electrical Cable", cost: 18, unit: "m" },
    { id: "mat_db", name: "Distribution Board", cost: 2800, unit: "unit" }
  ]
};

export const MATERIAL_ENGINE = {
  assignMaterial(APP, componentId, materialId) {
    const comp = APP.components.find(c => c.id === componentId);
    if (!comp) return null;
    comp.material = materialId;
    return comp;
  },

  getMaterial(materialId) {
    const all = [
      ...MATERIAL_DB.architectural,
      ...MATERIAL_DB.mep,
      ...MATERIAL_DB.fire,
      ...MATERIAL_DB.electrical
    ];
    return all.find(m => m.id === materialId) || null;
  }
};
