export function renderPaybackChart(canvasId, paybackCurve) {
  console.log("[Charts:Payback] Rendering payback chart");

  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels: ["Payback"],
      datasets: [{
        label: "Years",
        data: [paybackCurve[0].y],
        backgroundColor: "#10b981"
      }]
    },
    options: {
      responsive: true
    }
  });
}
