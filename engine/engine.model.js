// engine.model.js — FINAL VERSION (ES MODULE)

import { applyToComponent } from "./engine.materials.js";

export const MODEL = {
  components: [],
  project: {
    name: "Al Kawther Mall",
    location: "Jeddah, KSA",
    codes: ["Balady", "SBC", "MOMRAH", "Civil Defense"]
  },

  // -------------------------------------------------------------
  // INITIALIZE MODEL
  // -------------------------------------------------------------
  async init() {
    this.components = [];
  },

  // -------------------------------------------------------------
  // ADD COMPONENT
  // -------------------------------------------------------------
  addComponent(component) {
    const id = crypto.randomUUID();

    const enriched = applyToComponent({
      id,
      ...component
    });

    this.components.push(enriched);
    return enriched;
  },

  // -------------------------------------------------------------
  // UPDATE COMPONENT
  // -------------------------------------------------------------
  updateComponent(id, updates) {
    const c = this.getComponentById(id);
    if (!c) return null;

    Object.assign(c, updates);

    // reapply materials if spec changed
    if (updates.spec || updates.type) {
      const updated = applyToComponent(c);
      Object.assign(c, updated);
    }

    return c;
  },

  // -------------------------------------------------------------
  // REMOVE COMPONENT
  // -------------------------------------------------------------
  removeComponent(id) {
    this.components = this.components.filter(c => c.id !== id);
  },

  // -------------------------------------------------------------
  // GET COMPONENT BY ID
  // -------------------------------------------------------------
  getComponentById(id) {
    return this.components.find(c => c.id === id);
  },

  // -------------------------------------------------------------
  // VALIDATE COMPONENT
  // -------------------------------------------------------------
  validateComponent(component) {
    const errors = [];

    if (!component.type) errors.push("Missing component type.");
    if (!component.W || !component.L) errors.push("Missing geometry (W × L).");
    if (component.W <= 0 || component.L <= 0) errors.push("Invalid geometry values.");
    if (!component.spec) errors.push("Missing material spec level.");

    return errors;
  },

  // -------------------------------------------------------------
  // SEED DEFAULT MALL MIX (OPTIONAL)
  // -------------------------------------------------------------
  seedMallMix() {
    this.components = [];

    this.addComponent({
      type: "Retail Shop",
      spec: "Standard",
      W: 8,
      L: 12,
      occupancy: 1.5,
      exits: 1,
      egressWidth: 900,
      travelDistance: 25,
      freshAir: true,
      accessibleRamp: true,
      greaseTrap: false,
      sprinklers: true,
      fireAlarm: true
    });

    this.addComponent({
      type: "Restaurant",
      spec: "Standard",
      W: 10,
      L: 15,
      occupancy: 2,
      exits: 2,
      egressWidth: 1200,
      travelDistance: 30,
      freshAir: true,
      accessibleRamp: true,
      greaseTrap: true,
      sprinklers: true,
      fireAlarm: true
    });

    this.addComponent({
      type: "Cinema",
      spec: "Standard",
      W: 20,
      L: 25,
      occupancy: 3,
      exits: 3,
      egressWidth: 1800,
      travelDistance: 40,
      freshAir: true,
      accessibleRamp: true,
      greaseTrap: false,
      sprinklers: true,
      fireAlarm: true
    });
  }
};
