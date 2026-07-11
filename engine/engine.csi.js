// engine.csi.js — FINAL VERSION (ES MODULE)

export const CSI = {
  db: {},

  async init() {
    // Minimal CSI Level‑5 database (you can expand later)
    this.db = {
      "03-30": { desc: "Concrete Works", division: "03", unit: "m³", defaultUP: 180 },
      "05-10": { desc: "Structural Steel", division: "05", unit: "kg", defaultUP: 6 },
      "09-20": { desc: "Gypsum Partitions", division: "09", unit: "m²", defaultUP: 45 },
      "15-40": { desc: "HVAC Ducting", division: "15", unit: "m²", defaultUP: 55 },
      "16-10": { desc: "Electrical Cabling", division: "16", unit: "m", defaultUP: 12 },
      "22-30": { desc: "Plumbing Fixtures", division: "22", unit: "unit", defaultUP: 350 },
      "21-10": { desc: "Fire Sprinklers", division: "21", unit: "head", defaultUP: 90 }
    };
  },

  // -------------------------------------------------------------
  // BUILD CSI ITEMS FOR A COMPONENT
  // -------------------------------------------------------------
  buildComponentCSI(component, eng) {
    const items = [];

    const area = component.W * component.L;

    // Structural (Concrete)
    items.push({
      code: "03-30",
      desc: this.db["03-30"].desc,
      division: this.db["03-30"].division,
      qty: area * 0.15, // m³ concrete
      cost: area * 0.15 * this.db["03-30"].defaultUP,
      owner: true,
      tenant: false
    });

    // Partitions (Gypsum)
    items.push({
      code: "09-20",
      desc: this.db["09-20"].desc,
      division: this.db["09-20"].division,
      qty: area * 2.2, // m² partitions
      cost: area * 2.2 * this.db["09-20"].defaultUP,
      owner: false,
      tenant: true
    });

    // HVAC (Ducting)
    items.push({
      code: "15-40",
      desc: this.db["15-40"].desc,
      division: this.db["15-40"].division,
      qty: eng.hvac.tr * 10, // m² ducting
      cost: eng.hvac.tr * 10 * this.db["15-40"].defaultUP,
      owner: true,
      tenant: false
    });

    // Electrical (Cabling)
    items.push({
      code: "16-10",
      desc: this.db["16-10"].desc,
      division: this.db["16-10"].division,
      qty: eng.electrical.kva * 5,
      cost: eng.electrical.kva * 5 * this.db["16-10"].defaultUP,
      owner: true,
      tenant: false
    });

    // Plumbing Fixtures
    items.push({
      code: "22-30",
      desc: this.db["22-30"].desc,
      division: this.db["22-30"].division,
      qty: eng.plumbing.fixtureUnits,
      cost: eng.plumbing.fixtureUnits * this.db["22-30"].defaultUP,
      owner: false,
      tenant: true
    });

    // Fire Sprinklers
    items.push({
      code: "21-10",
      desc: this.db["21-10"].desc,
      division: this.db["21-10"].division,
      qty: eng.fire.sprinklerHeads,
      cost: eng.fire.sprinklerHeads * this.db["21-10"].defaultUP,
      owner: true,
      tenant: false
    });

    return items;
  },

  // -------------------------------------------------------------
  // COST MODEL ENTRY POINT
  // -------------------------------------------------------------
  costModel(component, eng, settings) {
    const items = this.buildComponentCSI(component, eng);

    let ownerTotal = 0;
    let tenantTotal = 0;

    items.forEach(i => {
      if (i.owner) ownerTotal += i.cost;
      if (i.tenant) tenantTotal += i.cost;
    });

    return {
      items,
      ownerTotal,
      tenantTotal,
      veItems: [] // placeholder for VE engine
    };
  }
};

// Export costModel for engine.run.js
export function costModel(component, CSI_DB, settings) {
  return CSI.costModel(component, component.eng, settings);
}
