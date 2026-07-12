// ui.materialSelector.js — MATERIAL SELECTOR (FINAL VERSION)

import { AUTH } from "../engine.auth.js";
import { MATERIAL_DB, MATERIAL_ENGINE } from "../engine.materialSelector.js";
import { STORAGE } from "../engine.storage.js";
import { APP, runAll } from "../ui.js";
import { renderCostTemplates } from "./ui.costTemplates.js";

export function renderMaterialSelector(componentId) {
  const container = document.getElementById("material_selector");
  if (!container) return;

  container.innerHTML = "";

  if (!AUTH.hasRole("admin")) {
    container.innerHTML = `<p style="color:#f87171;">Login as Admin to assign materials.</p>`;
    return;
  }

  const comp = APP.components.find(c => c.id === componentId);
  if (!comp) {
    container.innerHTML = "Component not found.";
    return;
  }

  container.innerHTML = `<h3>Material Selector for ${comp.type}</h3>`;

  const categories = Object.keys(MATERIAL_DB);

  categories.forEach(cat => {
    const section = document.createElement("div");
    section.className = "card";
    section.innerHTML = `<h4>${cat.toUpperCase()}</h4>`;

    MATERIAL_DB[cat].forEach(mat => {
      const btn = document.createElement("button");
      btn.textContent = `${mat.name} — SAR ${mat.cost}/${mat.unit}`;
      btn.style.display = "block";
      btn.style.marginBottom = "6px";

      btn.onclick = () => {
        MATERIAL_ENGINE.assignMaterial(APP, componentId, mat.id);
        runAll();
        STORAGE.saveProject(APP, APP.projectId);
        renderCostTemplates();
        alert(`Material assigned: ${mat.name}`);
      };

      section.appendChild(btn);
    });

    container.appendChild(section);
  });
}
