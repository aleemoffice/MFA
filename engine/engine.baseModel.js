export function buildBaseModel() {
  // -----------------------------
  // 1. Revenue Inputs
  // -----------------------------
  const rent = {
    monthly: 100000,
    annual: 100000 * 12,
    growthRate: 0.03
  };

  const otherIncome = {
    parking: 5000,
    storage: 2000,
    misc: 3000,
    annual: 5000 + 2000 + 3000
  };

  // -----------------------------
  // 2. Vacancy & Credit Loss
  // -----------------------------
  const vacancy = {
    physical: 0.05,
    creditLoss: 0.02
  };

  // -----------------------------
  // 3. Operating Expenses
  // -----------------------------
  const expenses = {
    repairs: 15000,
    utilities: 8000,
    management: 0.05,
    insurance: 6000,
    taxes: 12000,
    admin: 4000,
    annualFixed: 15000 + 8000 + 6000 + 12000 + 4000
  };

  // -----------------------------
  // 4. CAPEX (single numeric value for sensitivity)
  // -----------------------------
  const capex = 20000;   // <-- numeric, matches your engine

  // -----------------------------
  // 5. Technical Ratios (TR) & kVA
  // -----------------------------
  const tr = 1.25;       // <-- example technical ratio
  const kva = 500;       // <-- example electrical capacity

  // -----------------------------
  // 6. NOI Calculation
  // -----------------------------
  const effectiveGrossIncome =
    rent.annual * (1 - vacancy.physical - vacancy.creditLoss) +
    otherIncome.annual;

  const operatingExpenses =
    expenses.annualFixed + expenses.management * effectiveGrossIncome;

  const noi = effectiveGrossIncome - operatingExpenses;

  // -----------------------------
  // 7. Return the full base model
  // -----------------------------
  return {
    rent,
    otherIncome,
    vacancy,
    expenses,
    capex,        // numeric
    tr,           // numeric
    kva,          // numeric
    effectiveGrossIncome,
    operatingExpenses,
    noi
  };
}

