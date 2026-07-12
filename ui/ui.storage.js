// ui.storage.js — PROJECT STORAGE UI (ES MODULE)

import { UI } from "./ui.common.js";
import { STORAGE } from "./engine.storage.js";
import { AUTH } from "./engine.auth.js";
import { runAll, APP } from "./ui.js";

export function initStorageUI() {
  APP.projectName = "Al Kawther Mall";

  const saveBtn = UI.qs("#btnSaveProject");
  const select = UI.qs("#projectSelect");
  const lastSavedEl = UI.qs("#lastSaved");

  function refreshList() {
    const projects = STORAGE.listProjects();
    if (!select) return;
    select.innerHTML = `<option value="">Select project...</option>` +
      projects.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
  }

  function updateLastSaved(proj) {
    if (!lastSavedEl || !proj) return;
    lastSavedEl.textContent = `Last saved: ${new Date(proj.ts).toLocaleString("en-US", { timeZone: "Asia/Riyadh", hour12: false })}`;
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      if (!AUTH.hasRole("admin")) {
        alert("Only Admin can save projects.");
        return;
      }
      const list = STORAGE.saveProject(APP, APP.projectId);
      const proj = list.find(p => p.id === APP.projectId) || list[list.length - 1];
      APP.projectId = proj.id;
      refreshList();
      updateLastSaved(proj);
      alert("Project saved.");
    });
  }

  if (select) {
    select.addEventListener("change", () => {
      const id = select.value;
      if (!id) return;
      const proj = STORAGE.loadProject(APP, id);
      if (!proj) return;
      // Re-run engines/UI with loaded data
      runAll();
      const projectInput = UI.qs("#headerProjectName");
      const ctxName = UI.qs("#ctx_projectName");
      if (projectInput) projectInput.value = proj.name;
      if (ctxName) ctxName.textContent = proj.name;
      updateLastSaved(proj);
    });
  }

  refreshList();
}
