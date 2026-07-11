// engine.materials.js — FINAL VERSION (ES MODULE)

import { CSI_DB } from "../csi/index.js";

export const MATERIALS = {
  // ---------------------------------------------------------
  // RETAIL SHOP
  // ---------------------------------------------------------
  "Retail Shop": {
    Standard: {
      floor: "09 60 00-PORCELAIN",
      wall: "09 91 00",
      ceiling: "09 51 13",
      lightingDensity: 15,
      hvac: "23 81 26",
      plumbingFixtures: 2,
      fire: "21 10 00",
      ictPoints: 2,
      specialties: ["10 14 00"]
    },
    Premium: {
      floor: "09 60 00-MARBLE",
      wall: "09 30 00-WALL_TILE",
      ceiling: "09 51 13-ACOUSTIC",
      lightingDensity: 18,
      hvac: "23 81 27",
      plumbingFixtures: 3,
      fire: "21 10 00",
      ictPoints: 3,
      specialties: ["10 14 00"]
    }
  },

  // ---------------------------------------------------------
  // RESTAURANT
  // ---------------------------------------------------------
  "Restaurant": {
    Standard: {
      floor: "09 60 00-EPOXY",
      wall: "09 90 00",
      ceiling: "09 51 13",
      lightingDensity: 18,
      hvac: "23 81 27",
      plumbingFixtures: 6,
      fire: "21 10 00",
      ictPoints: 4,
      specialties: ["11 20 00", "11 30 00"]
    },
    Premium: {
      floor: "09 60 00-MARBLE",
      wall: "09 30 00-WALL_TILE",
      ceiling: "09 51 13-ACOUSTIC",
      lightingDensity: 20,
      hvac: "23 73 13",
      plumbingFixtures: 8,
      fire: "21 10 00",
      ictPoints: 5,
      specialties: ["11 20 00", "11 30 00"]
    }
  },

  // ---------------------------------------------------------
  // CINEMA
  // ---------------------------------------------------------
  "Cinema": {
    Standard: {
      floor: "09 60 00-CARPET",
      wall: "09 90 00",
      ceiling: "09 51 13-ACOUSTIC",
      lightingDensity: 12,
      hvac: "23 73 13",
      plumbingFixtures: 8,
      fire: "21 10 00",
      ictPoints: 10,
      specialties: ["27 40 00"]
    }
  },

  // ---------------------------------------------------------
  // CORRIDOR
  // ---------------------------------------------------------
  "Corridor": {
    Standard: {
      floor: "09 60 00-VINYL",
      wall: "09 91 00",
      ceiling: "09 51 13",
      lightingDensity: 10,
      hvac: "23 81 26",
      plumbingFixtures: 0,
      fire: "21 10 00",
      ictPoints: 1,
      specialties: []
    }
  },

  // ---------------------------------------------------------
  // PARKING
  // ---------------------------------------------------------
  "Parking": {
    Standard: {
      floor: "32 12 16",
      wall: null,
      ceiling: null,
      lightingDensity: 8,
      hvac: null,
      plumbingFixtures: 0,
      fire: "21 10 00",
      ictPoints: 0,
      specialties: []
    }
  },

  // ---------------------------------------------------------
  // MOSQUE
  // ---------------------------------------------------------
  "Mosque": {
    Standard: {
      floor: "09 60 00-CARPET",
      wall: "09 91 00",
      ceiling: "09 51 13-ACOUSTIC",
      lightingDensity: 12,
      hvac: "23 81 27",
      plumbingFixtures: 10,
      fire: "21 10 00",
      ictPoints: 4,
      specialties: ["10 14 00"]
    }
  }
};

// -------------------------------------------------------------
// GET MATERIAL SPEC FOR A COMPONENT
// -------------------------------------------------------------
export function getSpec(component) {
  const type = component.type;
  const level = component.spec || "Standard";

  if (!MATERIALS[type]) return null;
  return MATERIALS[type][level] || MATERIALS[type]["Standard"];
}

// -------------------------------------------------------------
// APPLY MATERIAL SPEC TO COMPONENT (lighting, fixtures, etc.)
// -------------------------------------------------------------
export function applyToComponent(component) {
  const spec = getSpec(component);
  if (!spec) return component;

  return {
    ...component,
    lightingDensity: spec.lightingDensity,
    plumbingFixtures: spec.plumbingFixtures,
    ictPoints: spec.ictPoints,
    hvacType: spec.hvac,
    fireSystem: spec.fire,
    specialties: spec.specialties
  };
}

// -------------------------------------------------------------
// CONVERT MATERIALS → CSI ITEMS
// -------------------------------------------------------------
export function materialsToCSI(component) {
  const spec = getSpec(component);
  if (!spec) return [];

  const area = component.W * component.L;

  const items = [];

  function add(code, qtyMultiplier = 1) {
    const csi = CSI_DB[code];
    if (!csi) return;

    items.push({
      code,
      desc: csi.desc,
      division: csi.division,
      qty: area * qtyMultiplier,
      cost: area * qtyMultiplier * csi.defaultUP,
      owner: true,
      tenant: false
    });
  }

  if (spec.floor) add(spec.floor, 1);
  if (spec.wall) add(spec.wall, 2.5); // wall area multiplier
  if (spec.ceiling) add(spec.ceiling, 1);

  spec.specialties.forEach(code => add(code, 1));

  return items;
}
