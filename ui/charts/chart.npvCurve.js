export function renderNPVCurve(canvasId, npvCurve) {
  console.log("[Charts:NPV] Rendering NPV curve");

  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels: npvCurve.map(p => p.x),
      datasets: [{
        label: "NPV",
        data: npvCurve.map(p => p.y),
        borderColor: "#3b82f6",
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}
