// ui.compliance.js — FINAL VERSION (ES MODULE)

import { UI } from "./ui.common.js";
import { UIF } from "./ui.framework.js";

export function renderCompliance(result) {
  const container = UI.qs("#compliancePanel");
  UI.clear(container);

  // -------------------------------------------------------------
  // BADGE PANEL
  // -------------------------------------------------------------
  const badgePanel = UIF.panel(
    "Compliance Status",
    `
      <div class="compliance-badge ${result.status.toLowerCase()}">
        <h2>${result.status}</h2>
        <p>Score: ${result.score}</p>
      </div>
    `
  );

  // -------------------------------------------------------------
  // GROUP ISSUES BY CODE AUTHORITY
  // -------------------------------------------------------------
  const groups = {
    Balady: [],
    SBC: [],
    MOMRAH: [],
    "Civil Defense": []
  };

  result.issues.forEach(issue => {
    if (issue.code.startsWith("BALADY")) groups.Balady.push(issue);
    else if (issue.code.startsWith("SBC")) groups.SBC.push(issue);
    else if (issue.code.startsWith("MOMRAH")) groups.MOMRAH.push(issue);
    else if (issue.code.startsWith("CD")) groups["Civil Defense"].push(issue);
  });

  // -------------------------------------------------------------
  // ACCORDION FOR EACH CODE GROUP
  // -------------------------------------------------------------
  const accordion = UIF.accordion(
    Object.entries(groups).map(([authority, issues]) => ({
      title: `${authority} (${issues.length} issues)`,
      body:
        issues.length === 0
          ? "<p>No issues.</p>"
          : issues
              .map(
                i => `
          <div class="violation-item">
            <h4>${i.code}</h4>
            <p>${i.msg}</p>
          </div>
        `
              )
              .join("")
    }))
  );

  // -------------------------------------------------------------
  // CHART — Compliance Score
  // -------------------------------------------------------------
  const chart = UIF.chart(
    "complianceChart",
    "doughnut",
    ["Score", "Penalty"],
    [result.score, 100 - result.score],
    "Compliance Score"
  );

  // -------------------------------------------------------------
  // FINAL RENDER
  // -------------------------------------------------------------
  container.innerHTML = UIF.section(
    "Compliance Overview",
    UIF.tabs([
      {
        label: "Status",
        content: badgePanel
      },
      {
        label: "Issues",
        content: UIF.panel("Code Violations", accordion)
      },
      {
        label: "Score Chart",
        content: chart
      }
    ])
  );
}
