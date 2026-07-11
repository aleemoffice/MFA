// engine.storage.js — PROJECT STORAGE ENGINE (ES MODULE)

import { AUTH } from "./engine.auth.js";

const LS_KEY = "MFA_PROJECTS";

function getUserKey() {
  return AUTH.currentUser?.username || "Guest";
}

function loadAll() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export const STORAGE = {
  // Project schema builder
  buildProject(APP) {
    return {
      id: crypto.randomUUID(),
      name: APP.projectName || "Untitled Project",
      user: AUTH.currentUser?.username || "Guest",
      ts: new Date().toISOString(),
      components: APP.components,
      settings: APP.settings,
      results: APP.results
    };
  },

  // Save current project (create or update)
  saveProject(APP, existingId = null) {
    const all = loadAll();
    const userKey = getUserKey();
    if (!all[userKey]) all[userKey] = [];

    if (existingId) {
      const idx = all[userKey].findIndex(p => p.id === existingId);
      if (idx >= 0) {
        all[userKey][idx] = {
          ...all[userKey][idx],
          name: APP.projectName,
          ts: new Date().toISOString(),
          components: APP.components,
          settings: APP.settings,
          results: APP.results
        };
      }
    } else {
      all[userKey].push(this.buildProject(APP));
    }

    saveAll(all);
    return all[userKey];
  },

  // List projects for current user
  listProjects() {
    const all = loadAll();
    const userKey = getUserKey();
    return all[userKey] || [];
  },

  // Load project by id into APP
  loadProject(APP, id) {
    const projects = this.listProjects();
    const proj = projects.find(p => p.id === id);
    if (!proj) return null;

    APP.projectId = proj.id;
    APP.projectName = proj.name;
    APP.components = proj.components;
    APP.settings = proj.settings;
    APP.results = proj.results;
    return proj;
  },

  // Delete project
  deleteProject(id) {
    const all = loadAll();
    const userKey = getUserKey();
    if (!all[userKey]) return;

    all[userKey] = all[userKey].filter(p => p.id !== id);
    saveAll(all);
  },

  // Duplicate project
  duplicateProject(id) {
    const projects = this.listProjects();
    const src = projects.find(p => p.id === id);
    if (!src) return null;

    const copy = {
      ...src,
      id: crypto.randomUUID(),
      name: src.name + " (Copy)",
      ts: new Date().toISOString()
    };

    const all = loadAll();
    const userKey = getUserKey();
    if (!all[userKey]) all[userKey] = [];
    all[userKey].push(copy);
    saveAll(all);
    return copy;
  }
};
