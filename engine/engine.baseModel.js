// ============================================================================
//  MFA Sensitivity Lab — Professional Base Model Engine
//  Author: Muhammad & Copilot
//  Purpose: Provide a complete, structured financial base model for all engines
// ============================================================================

export function buildBaseModel() {
  // -----------------------------
  // 1. Revenue Inputs
  // -----------------------------
  const rent = {
    monthly: 100000,        // base rent
    annual: 100000 * 12,
    growthRate: 0.03        // annual rent escalation
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
    physical: 0.05,         // 5% vacancy
    creditLoss: 0.02        // 2% non-payment
  };

  // -----------------------------
  // 3. Operating Expenses
  // -----------------------------
  const expenses = {
    repairs: 15000,
    utilities: 8000,
    management: 0.05,       // 5% of EGI
    insurance: 6000,
    taxes: 12000,
    admin: 4000,
    annualFixed: 15000 + 8000 + 6000 + 12000 + 4000
  };

  // -----------------------------
  // 4. CAPEX
  // -----------------------------
  const capex = {
    reserve: 20000,
    majorRepairs: 0,        // placeholder for VE scenarios
    annual: 20000
  };

  // -----------------------------
  // 5. Financing (Optional)
  // -----------------------------
  const financing = {
    loanAmount: 2000000,
    interestRate: 0.055,
    amortYears: 25
  };

  // -----------------------------
  // 6. Valuation Inputs
  // -----------------------------
  const valuation = {
    capRate: 0.075,
    discountRate: 0.10,
    exitCapRate: 0.08
  };

  // -----------------------------
  // 7. NOI Calculation
  // -----------------------------
  const effectiveGrossIncome =
    rent.annual * (1 - vacancy.physical - vacancy.creditLoss) +
    otherIncome.annual;

  const operatingExpenses =
    expenses.annualFixed + expenses.management * effectiveGrossIncome;

  const noi = effectiveGrossIncome - operatingExpenses;

  // -----------------------------
  // 8. Return the full base model
  // -----------------------------
  return {
    rent,
    otherIncome,
    vacancy,
    expenses,
    capex,
    financing,
    valuation,
    effectiveGrossIncome,
    operatingExpenses,
    noi
  };
}
