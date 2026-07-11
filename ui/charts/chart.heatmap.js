export function renderHeatmap(containerId, heatmapData) {
  console.log("[Charts:Heatmap] Rendering heatmap");

  const width = 400;
  const height = 400;

  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const xVals = [...new Set(heatmapData.map(d => d.x))];
  const yVals = [...new Set(heatmapData.map(d => d.y))];

  const xScale = d3.scaleBand().domain(xVals).range([0, width]);
  const yScale = d3.scaleBand().domain(yVals).range([0, height]);

  const colorScale = d3.scaleSequential()
    .domain(d3.extent(heatmapData, d => d.value))
    .interpolator(d3.interpolateViridis);

  svg.selectAll("rect")
    .data(heatmapData)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.x))
    .attr("y", d => yScale(d.y))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("fill", d => colorScale(d.value));
}
