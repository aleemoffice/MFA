// ui.componentEditor.js — FULL COMPONENT EDITOR (FINAL VERSION)

import { AUTH } from "../engine.auth.js";
import { COMPONENT_ENGINE } from "../engine.componentEditor.js";
import { MATERIAL_ENGINE } from "../engine.materialSelector.js";
import { COST_ENGINE } from "../engine.costTemplates.js";

import { runAll, APP } from "../ui.js";
import { STORAGE } from "../engine.storage.js";
import { renderMaterialSelector } from "./ui.materialSelector.js";
import { renderCostTemplates } from "./ui.costTemplates.js";

export function initComponentEditorUI() {
  const container = document.getElementById("components_editor");
  if (!container) return;
  renderEditor(container);
}

function renderEditor(container) {
  container.innerHTML = "";

  // Admin-only access
  if (!AUTH.hasRole("admin")) {
    container.innerHTML = `<p style="color:#f87171;">Login as Admin to edit components.</p>`;
    return;
  }

  // -------------------------------
  // ADD NEW COMPONENT FORM
  // -------------------------------
  const addForm = document.createElement("div");
  addForm.className = "card";
  addForm.innerHTML = `
    <h3>Add New Component</h3>

    <label>Type:</label>
    <input id="new_type" placeholder="Retail Shop">

    <label>Width (m):</label>
    <input id="new_W" type="number" value="5">

    <label>Length (m):</label>
    <input id="new_L" type="number" value="5">

    <label>Exits:</label>
    <input id="new_exits" type="number" value="1">

    <label>Travel Distance (m):</label>
    <input id="new_td" type="number" value="20">

    <button id="btnAddComponent">Add Component</button>
  `;
  container.appendChild(addForm);

  document.getElementById("btnAddComponent").onclick = () => {
    const data = {
      type: document.getElementById("new_type").value,
      W: Number(document.getElementById("new_W").value),
      L: Number(document.getElementById("new_L").value),
      exits: Number(document.getElementById("new_exits").value),
      travelDistance: Number(document.getElementById("new_td").value)
    };

    COMPONENT_ENGINE.addComponent(APP, data);
    runAll();
    STORAGE.saveProject(APP, APP.projectId);
    renderEditor(container);
    renderCostTemplates();
  };

  // -------------------------------
  // EXISTING COMPONENTS
  // -------------------------------
  APP.components.forEach(comp => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${comp.type}</h3>

      <label>Width:</label>
      <input data-id="${comp.id}" data-field="W" type="number" value="${comp.W}">

      <label>Length:</label>
      <input data-id="${comp.id}" data-field="L" type="number" value="${comp.L}">

      <label>Exits:</label>
      <input data-id="${comp.id}" data-field="exits" type="number" value="${comp.exits}">

      <label>Travel Distance:</label>
      <input data-id="${comp.id}" data-field="travelDistance" type="number" value="${comp.travelDistance}">
    `;

    // -------------------------------
    // MATERIAL SELECTOR BUTTON
    // -------------------------------
    const matBtn = document.createElement("button");
    matBtn.textContent = "Select Material";
    matBtn.onclick = () => renderMaterialSelector(comp.id);
    card.appendChild(matBtn);

    // -------------------------------
    // COST PREVIEW BUTTON
    // -------------------------------
    const costBtn = document.createElement("button");
    costBtn.textContent = "Show Cost";
    costBtn.style.marginLeft = "8px";
    costBtn.onclick = () => {
      const cost = COST_ENGINE.calculateComponentCost(comp);
      alert(
        `Area: ${cost.area} m²\n` +
        `Base Cost: SAR ${cost.baseCost.toLocaleString()}\n` +
        `Material Cost: SAR ${cost.materialCost.toLocaleString()}\n` +
        `Total Cost: SAR ${cost.total.toLocaleString()}`
      );
    };
    card.appendChild(costBtn);

    // -------------------------------
    // DELETE COMPONENT BUTTON
    // -------------------------------
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "8px";
    delBtn.onclick = () => {
      COMPONENT_ENGINE.deleteComponent(APP, comp.id);
      runAll();
      STORAGE.saveProject(APP, APP.projectId);
      renderEditor(container);
      renderCostTemplates();
    };
    card.appendChild(delBtn);

    container.appendChild(card);
  });

  // -------------------------------
  // UPDATE HANDLERS
  // -------------------------------
  container.querySelectorAll("input[data-id]").forEach(input => {
    input.addEventListener("change", () => {
      const id = input.dataset.id;
      const field = input.dataset.field;
      const value = Number(input.value);

      COMPONENT_ENGINE.updateComponent(APP, id, { [field]: value });
      runAll();
      STORAGE.saveProject(APP, APP.projectId);
      renderCostTemplates();
    });
  });
}

