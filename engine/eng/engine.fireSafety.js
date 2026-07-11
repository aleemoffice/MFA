// engine.fireSafety.js — FIRE / LIFE-SAFETY ENGINE (FINAL)

export const FIRE_RULES = {
  maxTravelDistance: {
    retail: 45,   // m
    fnb: 30,
    kiosk: 25,
    default: 45
  },
  minExits: {
    retail: 2,
    fnb: 2,
    kiosk: 1,
    default: 2
  },
  sprinklersRequired: true,
  fireAlarmRequired: true
};

function classifyType(type) {
  const t = type.toLowerCase();
  if (t.includes("f&b") || t.includes("restaurant")) return "fnb";
  if (t.includes("kiosk")) return "kiosk";
  if (t.includes("retail")) return "retail";
  return "default";
}

export const FIRE_ENGINE = {
  evaluateComponent(component) {
    const cat = classifyType(component.type);
    const maxTD = FIRE_RULES.maxTravelDistance[cat] ?? FIRE_RULES.maxTravelDistance.default;
    const minExits = FIRE_RULES.minExits[cat] ?? FIRE_RULES.minExits.default;

    const issues = [];

    if (component.travelDistance > maxTD) {
      issues.push(`Travel distance ${component.travelDistance}m exceeds limit ${maxTD}m.`);
    }

    if (component.exits < minExits) {
      issues.push(`Number of exits ${component.exits} is less than required ${minExits}.`);
    }

    if (FIRE_RULES.sprinklersRequired && !component.sprinklers) {
      issues.push("Sprinklers are required but not provided.");
    }

    if (FIRE_RULES.fireAlarmRequired && !component.fireAlarm) {
      issues.push("Fire alarm is required but not provided.");
    }

    return {
      id: component.id,
      type: component.type,
      travelDistance: component.travelDistance,
      exits: component.exits,
      sprinklers: !!component.sprinklers,
      fireAlarm: !!component.fireAlarm,
      compliant: issues.length === 0,
      issues
    };
  },

  evaluateAll(APP) {
    return APP.components.map(c => this.evaluateComponent(c));
  }
};
