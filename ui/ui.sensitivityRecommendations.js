import { buildRecommendations } from "../engine/engine.recommendations.js";

export function renderRecommendationsUI(payload) {
  console.log("[UI:Reco] Rendering recommendations");

  const recs = buildRecommendations(payload);

  return recs;
}
