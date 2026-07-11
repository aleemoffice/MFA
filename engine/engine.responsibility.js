// engine.responsibility.js — FINAL VERSION (ES MODULE)

export const RESPONSIBILITY = {
  // -------------------------------------------------------------
  // DEFAULT RULES PER CSI DIVISION
  // -------------------------------------------------------------
  defaultDivisionRules: {
    "03": "Owner",
    "04": "Owner",
    "05": "Owner",
    "06": "Tenant",
    "07": "Owner",
    "08": "Owner",
    "09": "Tenant",
    "10": "Tenant",
    "11": "Tenant",
    "12": "Tenant",
    "13": "Owner",
    "14": "Owner",
    "21": "Owner",
    "22": "Tenant",
    "23": "Owner",
    "25": "Owner",
    "26": "Owner",
    "27": "Tenant",
    "28": "Owner",
    "31": "Owner",
    "32": "Owner",
    "33": "Owner"
  },

  // -------------------------------------------------------------
  // COMPONENT OVERRIDES
  // -------------------------------------------------------------
  componentOverrides: {
    "Retail Shop": {
      "09": "Tenant",
      "11": "Tenant",
      "22": "Tenant",
      "27": "Tenant"
    },
    "Restaurant": {
      "09": "Tenant",
      "11": "Tenant",
      "22": "Tenant",
      "27": "Tenant"
    },
    "Cinema": {
      "09": "Tenant",
      "11": "Tenant",
      "27": "Tenant"
    },
    "Corridor": {
      "09": "Owner",
      "27": "Owner"
    },
    "Parking": {
      "09": "Owner",
      "26": "Owner"
    }
  },

  // -------------------------------------------------------------
  // EXTRACT CSI DIVISION FROM ANY CODE FORMAT
  // -------------------------------------------------------------
  extractDivision(csiCode) {
    // Formats supported:
    // "09-20"
    // "09 60 00-PORCELAIN"
    // "09 30 00 WALL TILE"
    // "21 10 00"
    // "23 81 27"

    // Remove non-digit prefixes
    const cleaned = csiCode.replace(/[^0-9].*$/, "");

    // First 2 digits = division
    return cleaned.substring(0, 2);
  },

  // -------------------------------------------------------------
  // DETERMINE RESPONSIBILITY
  // -------------------------------------------------------------
  getResponsibility(componentType, csiCode) {
    const division = this.extractDivision(csiCode);

    // Component-specific override
    if (this.componentOverrides[componentType] &&
        this.componentOverrides[componentType][division]) {
      return this.componentOverrides[componentType][division];
    }

    // Default division rule
    return this.defaultDivisionRules[division] || "Owner";
  },

  // -------------------------------------------------------------
  // SPLIT BOQ INTO OWNER / TENANT
  // -------------------------------------------------------------
  splitBOQ(componentType, boqItems) {
    const owner = [];
    const tenant = [];

    boqItems.forEach(item => {
      const resp = this.getResponsibility(componentType, item.code);

      if (resp === "Owner") {
        owner.push({ ...item, owner: true, tenant: false });
      } else {
        tenant.push({ ...item, owner: false, tenant: true });
      }
    });

    return { owner, tenant };
  }
};
