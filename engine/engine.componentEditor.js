// engine.componentEditor.js — FULL CRUD ENGINE (ES MODULE)

export const COMPONENT_ENGINE = {
  addComponent(APP, data) {
    const newComp = {
      id: crypto.randomUUID(),
      type: data.type || "New Component",
      W: data.W || 5,
      L: data.L || 5,
      exits: data.exits || 1,
      travelDistance: data.travelDistance || 20,
      sprinklers: data.sprinklers ?? true,
      fireAlarm: data.fireAlarm ?? true,
      freshAir: data.freshAir ?? true,
      accessibleRamp: data.accessibleRamp ?? false,
      egressWidth: data.egressWidth || 1200,
      firePump: data.firePump ?? false
    };

    APP.components.push(newComp);
    return newComp;
  },

  updateComponent(APP, id, updates) {
    const comp = APP.components.find(c => c.id === id);
    if (!comp) return null;

    Object.assign(comp, updates);
    return comp;
  },

  deleteComponent(APP, id) {
    APP.components = APP.components.filter(c => c.id !== id);
  }
};
