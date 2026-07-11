// ui.componentLibrary.js — COMPONENT LIBRARY UI (FINAL)

import { AUTH } from "../engine.auth.js";
import { APP, runAll } from "../ui.js";
import { STORAGE } from "../engine.storage.js";
import { COMPONENT_LIBRARY_ENGINE, COMPONENT_LIBRARY } from "../engine.componentLibrary.js";
import { renderCostTemplates } from "./ui.costTemplates.js";
import { renderMEPSummary } from "./ui.mep.js";
import { renderFireSafetySummary } from "./ui.fireSafety.js";

export function renderComponentLibrary() {
  const container = document.getElementById("component_library");
  if (!container) return;

  container.innerHTML = "";

  if (!AUTH.hasRole("admin")) {
    container.innerHTML = `<p style="color:#f87171;">Login as Admin to use component library.</p>`;
    return;
  }

  container.innerHTML = `<h3>Component Library</h3>`;

  Object.keys(COMPONENT_LIBRARY).forEach(key => {
    const tmpl = COMPONENT_LIBRARY[key];

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h4>${tmpl.type}</h4>
      <p><strong>Size:</strong> ${tmpl.W}m × ${tmpl.L}m</p>
      <p><strong>Exits:</strong> ${tmpl.exits}</p>
      <p><strong>Travel Distance:</strong> ${tmpl.travelDistance}m</p>
      <button>Add Component</button>
    `;

    card.querySelector("button").onclick = () => {
      const newComp = COMPONENT_LIBRARY_ENGINE.createFromTemplate(key);
      APP.components.push(newComp);

      runAll();
      STORAGE.saveProject(APP, APP.projectId);

      renderCostTemplates();
      renderMEPSummary();
      renderFireSafetySummary();

      alert(`${tmpl.type} added.`);
    };

    container.appendChild(card);
  });
}
