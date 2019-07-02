import get from "lodash/get";

const getReportFetching = state => get(state, "report.fetching", false);
const getReportErrors = state => get(state, "report.errors", "");
const getReportFlights = state => get(state, "report.flights", []);
const getReportAccommodations = state => get(state, "report.accommodations", []);
const getReportExpenses = state => get(state, "report.expenses", []);
const getReportMeals = state => get(state, "report.meals", []);
const getReportDiet = state => get(state, "report.diet", []);
const getReportDiemReturns = state => get(state, "report.diemReturns", []);
const getReportAllowance = state => get(state, "report.allowance", []);
const getReportUser = state => get(state, "report.user", null);
const getReportTotalRepayment = state => get(state, "report.totalRepayment", 0);
const getReportTargetCurrency = state => get(state, "report.targetCurrency", null);
const getReportGenerationDate = state => get(state, "report.generationDate", null);
const getReportAdvancePayment = state => get(state, "report.advancePayment", 0);
const getReportPlace = state => get(state, "report.place", null);
const getReportDuration = state => get(state, "report.duration", 0);
const getReportDelegationObjective = state => get(state, "report.delegationObjective", null);
const getReportStartDate = state => get(state, "report.startDate", null);
const getReportEndDate = state => get(state, "report.endDate", null);
const getReportDelegationStatus = state => get(state, "report.delegationStatus", null);
const getReportDelegationVersion = state => get(state, "report.delegationVersion", null);

export {
  getReportFetching,
  getReportErrors,
  getReportFlights,
  getReportAccommodations,
  getReportExpenses,
  getReportMeals,
  getReportDiet,
  getReportDiemReturns,
  getReportAllowance,
  getReportUser,
  getReportTotalRepayment,
  getReportTargetCurrency,
  getReportGenerationDate,
  getReportAdvancePayment,
  getReportPlace,
  getReportDuration,
  getReportDelegationObjective,
  getReportStartDate,
  getReportEndDate,
  getReportDelegationStatus,
  getReportDelegationVersion
};
