// engine.costTemplates.js — COST TEMPLATE ENGINE

export const COST_DB = {
  base: {
    retail: {
      fitout: 650,      // SAR/m2
      hvac: 180,        // SAR/m2
      electrical: 140,  // SAR/m2
      fire: 95,         // SAR/m2
      architectural: 220 // SAR/m2
    },
    fnb: {
      fitout: 850,
      hvac: 220,
      electrical: 180,
      fire: 110,
      architectural: 260
    },
    kiosk: {
      fitout: 450,
      hvac: 120,
      electrical: 90,
      fire: 55,
      architectural: 140
    }
  },

  materials: {
    mat_floor_tile: 85,
    mat_vinyl: 55,
    mat_paint: 22,
    mat_fc_unit: 1800,
    mat_diffuser: 95,
    mat_duct: 120,
    mat_sprinkler: 45,
    mat_fa_detector: 65,
    mat_fa_panel: 3500,
    mat_lighting_led: 120,
    mat_cable: 18,
    mat_db: 2800
  }
};

export const COST_ENGINE = {
  calculateComponentCost(component) {
    const area = component.W * component.L;

    const base = COST_DB.base.retail; // default
    if (component.type.toLowerCase().includes("f&b")) base = COST_DB.base.fnb;
    if (component.type.toLowerCase().includes("kiosk")) base = COST_DB.base.kiosk;

    const baseCost =
      area *
      (base.fitout +
        base.hvac +
        base.electrical +
        base.fire +
        base.architectural);

    let materialCost = 0;
    if (component.material) {
      const matCost = COST_DB.materials[component.material];
      if (matCost) materialCost = matCost * area;
    }

    return {
      area,
      baseCost,
      materialCost,
      total: baseCost + materialCost
    };
  },

  calculateAll(APP) {
    return APP.components.map(c => ({
      id: c.id,
      type: c.type,
      ...this.calculateComponentCost(c)
    }));
  }
};
