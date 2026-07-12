// ==========================================
// Sensitivity Lab – Tab Switching Controller
// ==========================================

export function initSensitivityTabs() {

  console.log("Tabs: Initializing...");

  // All tab buttons
  const tabs = document.querySelectorAll("[data-sensitivity-tab]");

  // All content panels
  const panels = document.querySelectorAll("[data-sensitivity-panel]");

  console.log("Tabs found:", tabs.length);
  console.log("Panels found:", panels.length);

  if (!tabs.length || !panels.length) {
    console.warn("Sensitivity Lab: No tabs or panels found.");
    return;
  }

  // -------------------------------
  // Helper: Hide all panels
  // -------------------------------
  function hideAllPanels() {
    console.log("Hiding all panels...");
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

    // Normalize Monte Carlo naming
    if (panelName === "mc" || panelName === "monte" || panelName === "monteCarlo") {
      panelName = "montecarlo";
    }

    console.log("Showing panel:", panelName);

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

      console.log("Tab clicked:", selected);

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

  console.log("Default panel:", firstPanelName);

  hideAllPanels();
  clearActiveTabs();

  firstTab.classList.add("active");
  showPanel(firstPanelName);

  console.log("Sensitivity Lab tabs initialized.");
}
