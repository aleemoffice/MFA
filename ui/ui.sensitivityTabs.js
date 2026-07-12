// ==========================================
// Sensitivity Lab – Tab Switching Controller
// ==========================================

export function initSensitivityTabs() {

  // All tab buttons
  const tabs = document.querySelectorAll("[data-sensitivity-tab]");

  // All content panels
  const panels = document.querySelectorAll("[data-sensitivity-panel]");

  if (!tabs.length || !panels.length) {
    console.warn("Sensitivity Lab: No tabs or panels found.");
    return;
  }

  // -------------------------------
  // Helper: Hide all panels
  // -------------------------------
  function hideAllPanels() {
    panels.forEach(panel => {
      panel.style.display = "none";
    });
  }

  // -------------------------------
  // Helper: Remove active state
  // -------------------------------
  function clearActiveTabs() {
    tabs.forEach(tab => {
      tab.classList.remove("active");
    });
  }

  // -------------------------------
  // Helper: Show selected panel
  // -------------------------------
  function showPanel(panelName) {
    const panel = document.querySelector(
      `[data-sensitivity-panel="${panelName}"]`
    );

    if (panel) {
      panel.style.display = "block";
    } else {
      console.warn(`Sensitivity Lab: Panel '${panelName}' not found.`);
    }
  }

  // -------------------------------
  // Attach click listeners
  // -------------------------------
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const selected = tab.getAttribute("data-sensitivity-tab");

      hideAllPanels();
      clearActiveTabs();

      tab.classList.add("active");
      showPanel(selected);
    });
  });

  // -------------------------------
  // Default: Show first panel
  // -------------------------------
  const firstTab = tabs[0];
  const firstPanelName = firstTab.getAttribute("data-sensitivity-tab");

  hideAllPanels();
  clearActiveTabs();

  firstTab.classList.add("active");
  showPanel(firstPanelName);

  console.log("Sensitivity Lab tabs initialized.");
}
