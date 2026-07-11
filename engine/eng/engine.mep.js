// engine.mep.js — MEP AUTO-ENGINE (FINAL)

export const MEP_RULES = {
  trPerM2: {
    retail: 0.18,   // TR/m²
    fnb: 0.25,
    kiosk: 0.12,
    default: 0.18
  },
  kvaPerM2: {
    retail: 0.12,   // kVA/m²
    fnb: 0.18,
    kiosk: 0.08,
    default: 0.12
  },
  fixtureUnitsPerM2: {
    retail: 0.05,
    fnb: 0.12,
    kiosk: 0.03,
    default: 0.05
  },
  diffusersPerM2: 0.04,   // diffusers/m²
  sprinklersPerM2: 0.08   // sprinklers/m²
};

function classifyType(type) {
  const t = type.toLowerCase();
  if (t.includes("f&b") || t.includes("restaurant")) return "fnb";
  if (t.includes("kiosk")) return "kiosk";
  if (t.includes("retail")) return "retail";
  return "default";
}

export const MEP_ENGINE = {
  calculateComponent(component) {
    const cat = classifyType(component.type);
    const area = component.W * component.L;

    const trRate = MEP_RULES.trPerM2[cat] ?? MEP_RULES.trPerM2.default;
    const kvaRate = MEP_RULES.kvaPerM2[cat] ?? MEP_RULES.kvaPerM2.default;
    const fuRate =
      MEP_RULES.fixtureUnitsPerM2[cat] ?? MEP_RULES.fixtureUnitsPerM2.default;

    const tr = area * trRate;
    const kva = area * kvaRate;
    const fixtureUnits = area * fuRate;
    const diffusers = Math.ceil(area * MEP_RULES.diffusersPerM2);
    const sprinklers = Math.ceil(area * MEP_RULES.sprinklersPerM2);

    return {
      id: component.id,
      type: component.type,
      area,
      tr,
      kva,
      fixtureUnits,
      diffusers,
      sprinklers
    };
  },

  calculateAll(APP) {
    const perComponent = APP.components.map(c => this.calculateComponent(c));

    const totals = perComponent.reduce(
      (acc, c) => {
        acc.area += c.area;
        acc.tr += c.tr;
        acc.kva += c.kva;
        acc.fixtureUnits += c.fixtureUnits;
        acc.diffusers += c.diffusers;
        acc.sprinklers += c.sprinklers;
        return acc;
      },
      {
        area: 0,
        tr: 0,
        kva: 0,
        fixtureUnits: 0,
        diffusers: 0,
        sprinklers: 0
      }
    );

    return { perComponent, totals };
  }
};
