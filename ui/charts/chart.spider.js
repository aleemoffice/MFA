// Spider chart using D3.js

export function renderSpiderChart(containerId, spiderData) {
  console.log("[Charts:Spider] Rendering spider chart");

  const width = 400;
  const height = 400;
  const radius = 150;

  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const center = { x: width / 2, y: height / 2 };

  const angleSlice = (Math.PI * 2) / spiderData.length;

  const scale = d3.scaleLinear()
    .domain([0, d3.max(spiderData, d => d.value)])
    .range([0, radius]);

  const line = d3.lineRadial()
    .radius(d => scale(d.value))
    .angle((d, i) => i * angleSlice);

  svg.append("path")
    .datum(spiderData)
    .attr("transform", `translate(${center.x},${center.y})`)
    .attr("d", line)
    .attr("fill", "rgba(16,185,129,0.4)")
    .attr("stroke", "#10b981")
    .attr("stroke-width", 2);
}
