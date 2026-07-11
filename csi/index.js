// index.js — CSI MasterFormat (00–33) Saudi Market, Level‑5

import { DIV00 } from "./division00.js";
import { DIV01 } from "./division01.js";
import { DIV02 } from "./division02.js";
import { DIV03 } from "./division03.js";
import { DIV04 } from "./division04.js";
import { DIV05 } from "./division05.js";
import { DIV06 } from "./division06.js";
import { DIV07 } from "./division07.js";
import { DIV08 } from "./division08.js";
import { DIV09 } from "./division09.js";
import { DIV10 } from "./division10.js";
import { DIV11 } from "./division11.js";
import { DIV12 } from "./division12.js";
import { DIV13 } from "./division13.js";
import { DIV14 } from "./division14.js";
import { DIV21 } from "./division21.js";
import { DIV22 } from "./division22.js";
import { DIV23 } from "./division23.js";
import { DIV25 } from "./division25.js";
import { DIV26 } from "./division26.js";
import { DIV27 } from "./division27.js";
import { DIV28 } from "./division28.js";
import { DIV31 } from "./division31.js";
import { DIV32 } from "./division32.js";
import { DIV33 } from "./division33.js";

// -----------------------------------------------------------------------------
// CORE CSI DATABASE
// -----------------------------------------------------------------------------
export const CSI_DB = {
  ...DIV00,
  ...DIV01,
  ...DIV02,
  ...DIV03,
  ...DIV04,
  ...DIV05,
  ...DIV06,
  ...DIV07,
  ...DIV08,
  ...DIV09,
  ...DIV10,
  ...DIV11,
  ...DIV12,
  ...DIV13,
  ...DIV14,
  ...DIV21,
  ...DIV22,
  ...DIV23,
  ...DIV25,
  ...DIV26,
  ...DIV27,
  ...DIV28,
  ...DIV31,
  ...DIV32,
  ...DIV33
};

// -----------------------------------------------------------------------------
// DIVISION METADATA
// -----------------------------------------------------------------------------
export const CSI_DIVISIONS = {
  "00": "Procurement & Contracting",
  "01": "General Requirements",
  "02": "Existing Conditions",
  "03": "Concrete",
  "04": "Masonry",
  "05": "Metals",
  "06": "Wood, Plastics & Composites",
  "07": "Thermal & Moisture Protection",
  "08": "Openings",
  "09": "Finishes",
  "10": "Specialties",
  "11": "Equipment",
  "12": "Furnishings",
  "13": "Special Construction",
  "14": "Conveying Equipment",
  "21": "Fire Suppression",
  "22": "Plumbing",
  "23": "HVAC",
  "25": "Integrated Automation",
  "26": "Electrical",
  "27": "Communications / ICT",
  "28": "Electronic Safety & Security",
  "31": "Earthwork",
  "32": "Exterior Improvements",
  "33": "Utilities"
};

// -----------------------------------------------------------------------------
// CATEGORY GROUPING (FOR VE, DASHBOARD, FILTERS)
// -----------------------------------------------------------------------------
export const CSI_CATEGORIES = {
  Finishes: ["09", "10", "12"],
  MEP: ["21", "22", "23", "25", "26", "27", "28"],
  Structural: ["03", "04", "05"],
  Civil: ["31", "32", "33"],
  Special: ["11", "13", "14", "00", "01", "02"]
};

// Helper: get division from code
export function getDivisionFromCode(code) {
  // Supports "09 60 00-PORCELAIN", "09-20", "09 30 00", etc.
  const cleaned = code.replace(/[^0-9].*$/, "");
  return cleaned.substring(0, 2);
}

// Helper: get category from division
export function getCategoryFromDivision(division) {
  for (const [cat, divs] of Object.entries(CSI_CATEGORIES)) {
    if (divs.includes(division)) return cat;
  }
  return "Other";
}

// -----------------------------------------------------------------------------
// REGION MULTIPLIERS (SAUDI MARKET)
// -----------------------------------------------------------------------------
export const CSI_REGION_FACTORS = {
  Jeddah: 1.00,
  Riyadh: 1.05,
  Dammam: 1.03,
  Makkah: 1.04,
  Madinah: 1.02
};

// Helper: apply region factor to unit price
export function getRegionalUnitPrice(item, region = "Jeddah") {
  const factor = CSI_REGION_FACTORS[region] || 1.0;
  return item.defaultUP * factor;
}

// -----------------------------------------------------------------------------
// SEARCH INDEX
// -----------------------------------------------------------------------------
export const CSI_INDEX = Object.values(CSI_DB).map(item => {
  const division = item.division || getDivisionFromCode(item.code);
  const category = getCategoryFromDivision(division);

  return {
    code: item.code,
    desc: item.desc,
    division,
    divisionName: CSI_DIVISIONS[division] || "Unknown",
    category,
    unit: item.unit || "m²", // fallback; set properly in division files
    defaultUP: item.defaultUP,
    keywords: item.desc.toLowerCase().split(/\s+/)
  };
});

// Simple search helper (for UI)
export function searchCSI(query) {
  const q = query.toLowerCase();
  return CSI_INDEX.filter(
    i =>
      i.code.toLowerCase().includes(q) ||
      i.desc.toLowerCase().includes(q) ||
      i.keywords.some(k => k.includes(q))
  );
}
