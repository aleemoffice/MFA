// Chart datasets: tornado, NPV curve, IRR curve, payback, etc.

export function buildChartDatasets(baseModel, drivers, matrix, cfg) {
  console.log("[Charts] Building chart datasets");

  const tornado = buildTornadoDataset(baseModel, drivers);
  const npvCurve = buildNPVCurve(matrix);
  const irrCurve = buildIRRCurve(matrix);
  const paybackCurve = buildPaybackCurve(baseModel);
  const spider = buildSpiderDataset(drivers);
  const heatmap = buildHeatmapDataset(matrix);

  return {
    tornado,
    npvCurve,
    irrCurve,
    paybackCurve,
    spider,
    heatmap
  };
}

function buildTornadoDataset(baseModel, drivers) {
  const items = [];

  drivers.rentCases.forEach(c => {
    items.push({
      label: `Rent ${Math.round(c.shock * 100)}%`,
      impactNPV: c.noi - baseModel.noi
    });
  });

  drivers.capexCases.forEach(c => {
    items.push({
      label: `CAPEX ${Math.round(c.shock * 100)}%`,
      impactNPV: baseModel.capex - c.capex
    });
  });

  return items.sort((a, b) => Math.abs(b.impactNPV) - Math.abs(a.impactNPV));
}

function buildNPVCurve(matrix) {
  return matrix.map(m => ({
    x: m.rentShock,
    y: m.npv
  }));
}

function buildIRRCurve(matrix) {
  return matrix.map(m => ({
    x: m.rentShock,
    y: m.irr
  }));
}

function buildPaybackCurve(baseModel) {
  const { capex, noi } = baseModel;
  const paybackYears = capex / (noi || 1);
  return [{ x: 0, y: paybackYears }];
}

function buildSpiderDataset(drivers) {
  return [
    {
      axis: "Rent",
      value: drivers.rentCases[drivers.rentCases.length - 1].noi
    },
    {
      axis: "CAPEX",
      value: drivers.capexCases[0].capex
    },
    {
      axis: "TR",
      value: drivers.trCases[drivers.trCases.length - 1].tr
    },
    {
      axis: "kVA",
      value: drivers.kvaCases[drivers.kvaCases.length - 1].kva
    }
  ];
}

function buildHeatmapDataset(matrix) {
  return matrix.map(m => ({
    x: m.rentShock,
    y: m.capexShock,
    value: m.npv
  }));
}
