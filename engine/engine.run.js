// engine.run.js — FINAL VERSION

import { CODES } from "./engine.codes.js";
import { CSI_DB } from "../csi/index.js";
import { costModel } from "./engine.csi.js";

import * as HVAC from "./eng/engine.eng.hvac.js";
import * as Electrical from "./eng/engine.eng.electrical.js";
import * as Plumbing from "./eng/engine.eng.plumbing.js";
import * as Fire from "./eng/engine.eng.fire.js";
import * as LifeSafety from "./eng/engine.eng.lifesafety.js";
import * as Structural from "./eng/engine.eng.structural.js";
import * as Civil from "./eng/engine.eng.civil.js";

// -------------------------------------------------------------
// RUN A SINGLE COMPONENT
// -------------------------------------------------------------
export function runComponent(component, settings) {
  const eng = {
    hvac: HVAC.evaluate(component),
    electrical: Electrical.evaluate(component),
    plumbing: Plumbing.evaluate(component),
    fire: Fire.evaluate(component),
    lifesafety: LifeSafety.evaluate(component),
    structural: Structural.evaluate(component),
    civil: Civil.evaluate(component)
  };

  const compliance = CODES.check(component, eng);
  const boq = costModel(component, CSI_DB, settings);

  return { component, eng, compliance, boq };
}

// -------------------------------------------------------------
// RUN ALL COMPONENTS
// -------------------------------------------------------------
export function runAllComponents(components, settings) {
  const results = components.map(c => runComponent(c, settings));

  return {
    dashboard: computeDashboard(results),
    boq: computeBOQ(results),
    ownerTenant: computeOwnerTenant(results),
    compliance: computeCompliance(results),
    ve: computeVE(results)
  };
}

// -------------------------------------------------------------
// DASHBOARD AGGREGATION
// -------------------------------------------------------------
function computeDashboard(results) {
  let ownerCapex = 0;
  let tenantFitout = 0;

  let totalTR = 0;
  let totalKVA = 0;
  let totalFU = 0;
  let totalSprinklers = 0;
  let totalICT = 0;

  results.forEach(r => {
    ownerCapex += r.boq.ownerTotal || 0;
    tenantFitout += r.boq.tenantTotal || 0;

    totalTR += r.eng.hvac.tr || 0;
    totalKVA += r.eng.electrical.kva || 0;
    totalFU += r.eng.plumbing.fixtureUnits || 0;
    totalSprinklers += r.eng.fire.sprinklerHeads || 0;
    totalICT += r.eng.lifesafety.ictPoints || 0;
  });

  const noi = tenantFitout * 0.12; // placeholder
  const roi = ownerCapex > 0 ? ((noi / ownerCapex) * 100).toFixed(1) : 0;
  const npv = noi * 8; // placeholder

  return {
    ownerCapex,
    tenantFitout,
    noi,
    roi,
    npv,
    totalTR,
    totalKVA,
    totalFU,
    totalSprinklers,
    totalICT
  };
}

// -------------------------------------------------------------
// BOQ AGGREGATION
// -------------------------------------------------------------
function computeBOQ(results) {
  const items = [];

  let ownerTotal = 0;
  let tenantTotal = 0;

  results.forEach(r => {
    r.boq.items.forEach(i => {
      items.push(i);
      if (i.owner) ownerTotal += i.cost;
      if (i.tenant) tenantTotal += i.cost;
    });
  });

  return { items, ownerTotal, tenantTotal };
}

// -------------------------------------------------------------
// OWNER / TENANT RESPONSIBILITY
// -------------------------------------------------------------
function computeOwnerTenant(results) {
  const owner = [];
  const tenant = [];

  let ownerTotal = 0;
  let tenantTotal = 0;

  results.forEach(r => {
    r.boq.items.forEach(i => {
      if (i.owner) {
        owner.push(i);
        ownerTotal += i.cost;
      }
      if (i.tenant) {
        tenant.push(i);
        tenantTotal += i.cost;
      }
    });
  });

  return { owner, tenant, ownerTotal, tenantTotal };
}

// -------------------------------------------------------------
// COMPLIANCE SUMMARY
// -------------------------------------------------------------
function computeCompliance(results) {
  const issues = [];

  results.forEach(r => {
    r.compliance.issues.forEach(i => issues.push(i));
  });

  const status =
    issues.length === 0 ? "PASS" :
    issues.length <= 5 ? "AT RISK" :
    "FAIL";

  return {
    status,
    issues,
    score: Math.max(0, 100 - issues.length * 5)
  };
}

// -------------------------------------------------------------
// VALUE ENGINEERING SUMMARY
// -------------------------------------------------------------
function computeVE(results) {
  const items = [];
  let totalSavings = 0;

  results.forEach(r => {
    if (r.boq.veItems) {
      r.boq.veItems.forEach(v => {
        items.push(v);
        totalSavings += v.savings || 0;
      });
    }
  });

  return {
    items,
    totalSavings
  };
}
