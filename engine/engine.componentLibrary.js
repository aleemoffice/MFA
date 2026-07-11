// engine.componentLibrary.js — COMPONENT LIBRARY (FINAL)

export const COMPONENT_LIBRARY = {
  retail: {
    id: "tmpl_retail",
    type: "Retail Shop",
    W: 8,
    L: 12,
    exits: 2,
    travelDistance: 30,
    sprinklers: true,
    fireAlarm: true
  },

  fnb: {
    id: "tmpl_fnb",
    type: "F&B Restaurant",
    W: 10,
    L: 14,
    exits: 2,
    travelDistance: 25,
    sprinklers: true,
    fireAlarm: true
  },

  kiosk: {
    id: "tmpl_kiosk",
    type: "Kiosk",
    W: 4,
    L: 4,
    exits: 1,
    travelDistance: 20,
    sprinklers: true,
    fireAlarm: true
  },

  anchor: {
    id: "tmpl_anchor",
    type: "Anchor Store",
    W: 25,
    L: 40,
    exits: 4,
    travelDistance: 45,
    sprinklers: true,
    fireAlarm: true
  },

  corridor: {
    id: "tmpl_corridor",
    type: "Corridor",
    W: 3,
    L: 30,
    exits: 2,
    travelDistance: 50,
    sprinklers: true,
    fireAlarm: true
  }
};

export const COMPONENT_LIBRARY_ENGINE = {
  createFromTemplate(templateKey) {
    const tmpl = COMPONENT_LIBRARY[templateKey];
    if (!tmpl) return null;

    return {
      id: crypto.randomUUID(),
      type: tmpl.type,
      W: tmpl.W,
      L: tmpl.L,
      exits: tmpl.exits,
      travelDistance: tmpl.travelDistance,
      sprinklers: tmpl.sprinklers,
      fireAlarm: tmpl.fireAlarm
    };
  }
};
