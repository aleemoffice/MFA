export function buildBaseModel() {
  return {
    // Core revenue inputs
    rent: 100000,
    otherIncome: 5000,

    // Operating expenses
    expenses: 30000,

    // Vacancy assumptions
    vacancyRate: 0.05,

    // Capex assumptions
    capex: 20000,

    // Any additional fields your engines need
  };
}
