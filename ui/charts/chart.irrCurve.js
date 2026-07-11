export function renderIRRCurve(canvasId, irrCurve) {
  console.log("[Charts:IRR] Rendering IRR curve");

  new Chart(document.getElementById(canvasId), {
    type: "line",
    data: {
      labels: irrCurve.map(p => p.x),
      datasets: [{
        label: "IRR",
        data: irrCurve.map(p => p.y),
        borderColor: "#f59e0b",
        fill: false
      }]
    },
    options: {
      responsive: true
    }
  });
}
