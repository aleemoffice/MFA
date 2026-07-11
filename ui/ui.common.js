// ui.common.js

export const UI = {
  qs(sel) {
    return document.querySelector(sel);
  },

  qsa(sel) {
    return [...document.querySelectorAll(sel)];
  },

  fmt(n) {
    return Number(n).toLocaleString();
  },

  money(n, currency = "SAR") {
    return `${currency} ${Number(n).toLocaleString()}`;
  },

  clear(el) {
    el.innerHTML = "";
  },

  card(title, body) {
    return `
      <div class="component-card">
        <h3>${title}</h3>
        <p>${body}</p>
      </div>
    `;
  }
};
