// engine.codes.js — FINAL VERSION (ES MODULE)

export const CODES = {
  // ---------------------------------------------------------
  // BALADY — SITE & PARKING
  // ---------------------------------------------------------
  balady(component) {
    const issues = [];
    const area = component.W * component.L;

    // Parking requirement: 1 space per 25 m² GFA
    const requiredParking = Math.ceil(area / 25);

    if (component.type === "Parking") {
      if (component.spaces < requiredParking) {
        issues.push({
          code: "BALADY-PARKING",
          msg: `Parking spaces below required minimum (${component.spaces} vs ${requiredParking}).`
        });
      }
    }

    // Accessibility: ramps required for public areas
    const publicTypes = ["Retail Shop", "Restaurant", "Cinema", "Mosque"];
    if (publicTypes.includes(component.type) && !component.accessibleRamp) {
      issues.push({
        code: "BALADY-ACCESS",
        msg: "Accessible ramp required for public entrance."
      });
    }

    return issues;
  },

  // ---------------------------------------------------------
  // SBC — STRUCTURAL, EGRESS, FIRE, HVAC
  // ---------------------------------------------------------
  sbc(component, eng) {
    const issues = [];

    // Egress width
    const requiredWidth = eng.egressWidthRequired;
    if (component.egressWidth < requiredWidth) {
      issues.push({
        code: "SBC-EGRESS-WIDTH",
        msg: `Egress width insufficient (${component.egressWidth}mm vs ${requiredWidth}mm).`
      });
    }

    // Exits
    const requiredExits = eng.exitsRequired;
    if (component.exits < requiredExits) {
      issues.push({
        code: "SBC-EXITS",
        msg: `Insufficient exits (${component.exits} vs ${requiredExits}).`
      });
    }

    // Travel distance
    if (!eng.travelDistanceOK) {
      issues.push({
        code: "SBC-TRAVEL-DISTANCE",
        msg: `Travel distance exceeds 45m (${component.travelDistance}m).`
      });
    }

    // Fresh air requirement
    if (eng.hvacTR > 0 && !component.freshAir) {
      issues.push({
        code: "SBC-FRESH-AIR",
        msg: "Fresh air intake required for HVAC system."
      });
    }

    return issues;
  },

  // ---------------------------------------------------------
  // MOMRAH — PLUMBING & SANITATION
  // ---------------------------------------------------------
  momrah(component, eng) {
    const issues = [];

    // Plumbing fixture units
    if (["Restaurant", "Cinema", "Mosque"].includes(component.type)) {
      if (eng.fixtureUnits < 1) {
        issues.push({
          code: "MOMRAH-FIXTURES",
          msg: "Insufficient plumbing fixtures for occupancy."
        });
      }
    }

    // Grease trap requirement for restaurants
    if (component.type === "Restaurant" && !component.greaseTrap) {
      issues.push({
        code: "MOMRAH-GREASE",
        msg: "Grease trap required for food service areas."
      });
    }

    return issues;
  },

  // ---------------------------------------------------------
  // CIVIL DEFENSE — FIRE SUPPRESSION & ALARM
  // ---------------------------------------------------------
  civilDefense(component, eng) {
    const issues = [];

    // Sprinklers required for all public spaces
    if (!component.sprinklers && component.type !== "Parking") {
      issues.push({
        code: "CD-SPRINKLERS",
        msg: "Sprinkler system required for public occupancy."
      });
    }

    // Fire pump requirement
    if (eng.sprinklerHeads > 0 && !component.firePump) {
      issues.push({
        code: "CD-FIRE-PUMP",
        msg: "Fire pump required for sprinkler system."
      });
    }

    // Fire alarm requirement
    if (!component.fireAlarm) {
      issues.push({
        code: "CD-FIRE-ALARM",
        msg: "Fire alarm system required."
      });
    }

    return issues;
  },

  // ---------------------------------------------------------
  // MASTER COMPLIANCE CHECK
  // ---------------------------------------------------------
  check(component, eng) {
    const baladyIssues = this.balady(component);
    const sbcIssues = this.sbc(component, eng);
    const momrahIssues = this.momrah(component, eng);
    const cdIssues = this.civilDefense(component, eng);

    const all = [...baladyIssues, ...sbcIssues, ...momrahIssues, ...cdIssues];

    const status =
      all.length === 0
        ? "PASS"
        : all.length <= 3
        ? "AT RISK"
        : "FAIL";

    return {
      status,
      issues: all,
      score: Math.max(0, 100 - all.length * 10)
    };
  }
};
