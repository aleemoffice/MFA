import { buildRecommendations } from "../engine/engine.recommendations.js";

export function renderRecommendationsUI(payload) {
  console.log("[UI:Reco] Rendering recommendations");

  const recs = buildRecommendations(payload);

  // Ensure the panel container exists
  const container = document.getElementById("recoOutput");
  if (!container) {
    console.warn("[UI:Reco] recoOutput container not found");
    return;
  }

  // Render results
  container.innerHTML = `
    <h3>Recommendations</h3>
    <pre>${JSON.stringify(recs, null, 2)}</pre>
  `;

  return recs;
}
