// Tornado chart using Chart.js

export function renderTornadoChart(canvasId, tornadoData) {
  console.log("[Charts:Tornado] Rendering tornado chart");

  const labels = tornadoData.map(i => i.label);
  const values = tornadoData.map(i => i.impactNPV);

  new Chart(document.getElementById(canvasId), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "NPV Impact",
        data: values,
        backgroundColor: values.map(v => v >= 0 ? "#10b981" : "#ef4444")
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
