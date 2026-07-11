// ui.framework.js — FINAL VERSION (ES MODULE)

import { UI } from "./ui.common.js";

export const UIF = {
  // -------------------------------------------------------------
  // LAYOUT
  // -------------------------------------------------------------
  layout({ header, sidebar, content }) {
    return `
      <div class="layout">
        <header class="layout-header">${header}</header>
        <aside class="layout-sidebar">${sidebar}</aside>
        <main class="layout-content">${content}</main>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // PANEL
  // -------------------------------------------------------------
  panel(title, body) {
    return `
      <div class="ui-panel">
        <h2>${title}</h2>
        <div class="ui-panel-body">${body}</div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // TABS
  // -------------------------------------------------------------
  tabs(tabs) {
    const headers = tabs.map((t, i) =>
      `<button class="ui-tab-btn" data-tab="${i}">${t.label}</button>`
    ).join("");

    const bodies = tabs.map((t, i) =>
      `<div class="ui-tab-body" data-tab="${i}">${t.content}</div>`
    ).join("");

    return `
      <div class="ui-tabs">
        <div class="ui-tab-header">${headers}</div>
        <div class="ui-tab-content">${bodies}</div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // ACCORDION
  // -------------------------------------------------------------
  accordion(items) {
    return `
      <div class="ui-accordion">
        ${items.map((item, i) => `
          <div class="ui-acc-item">
            <div class="ui-acc-header" data-acc="${i}">
              ${item.title}
            </div>
            <div class="ui-acc-body" data-acc="${i}">
              ${item.body}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  // -------------------------------------------------------------
  // GRID
  // -------------------------------------------------------------
  grid(columns, items) {
    return `
      <div class="ui-grid" style="grid-template-columns: repeat(${columns}, 1fr);">
        ${items.map(i => `<div class="ui-grid-item">${i}</div>`).join("")}
      </div>
    `;
  },

  // -------------------------------------------------------------
  // TABLE
  // -------------------------------------------------------------
  table(headers, rows) {
    return `
      <table class="ui-table">
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map(r => `
            <tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>
          `).join("")}
        </tbody>
      </table>
    `;
  },

  // -------------------------------------------------------------
  // FORM
  // -------------------------------------------------------------
  form(fields) {
    return `
      <form class="ui-form">
        ${fields.map(f => `
          <div class="ui-form-field">
            <label>${f.label}</label>
            <input type="${f.type}" name="${f.name}" value="${f.value || ""}">
          </div>
        `).join("")}
      </form>
    `;
  },

  // -------------------------------------------------------------
  // CHART (Chart.js wrapper)
  // -------------------------------------------------------------
  chart(id, type, labels, data, label) {
    return `
      <canvas id="${id}"></canvas>
      <script>
        new Chart(document.getElementById("${id}"), {
          type: "${type}",
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: "${label}",
              data: ${JSON.stringify(data)},
              backgroundColor: "rgba(0, 123, 255, 0.4)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 2
            }]
          }
        });
      </script>
    `;
  },

  // -------------------------------------------------------------
  // TOAST
  // -------------------------------------------------------------
  toast(msg, type = "info") {
    const el = UI.el("div", { class: `ui-toast ${type}` }, msg);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  },

  // -------------------------------------------------------------
  // SPINNER
  // -------------------------------------------------------------
  spinner() {
    return `
      <div class="ui-spinner">
        <div></div><div></div><div></div><div></div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // SECTION
  // -------------------------------------------------------------
  section(title, content) {
    return `
      <section class="ui-section">
        <h2>${title}</h2>
        <div>${content}</div>
      </section>
    `;
  }
};
