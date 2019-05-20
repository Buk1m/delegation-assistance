const userRoles = {
  employee: "Employee",
  travelmanager: "Manager",
  approver: "Approver",
  accountant: "Accountant"
};

const userRolesMap = {
  ROLE_TRAVEL_MANAGER: userRoles.travelmanager,
  ROLE_EMPLOYEE: userRoles.employee,
  ROLE_APPROVER: userRoles.approver,
  ROLE_ACCOUNTANT: userRoles.accountant
};

const environments = {
  NODE_ENV: process.env.NODE_ENV || "development",
  LOGS: process.env.REACT_APP_LOGS || "none",
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  DEFAULT_THEME: "idemia"
};

const themes = ["Dark", "Idemia", "Contrast"];

const delegationStatuses = {
  CREATED: "Created",
  PREPARED: "Prepared",
  NEEDS_WORK: "Needs work",
  CHECKED: "Confirmed by Manager",
  APPROVED: "Approved",
  FINALIZED: "Finalized"
};

const paymentTypes = [{ label: "Cash", value: "CASH" }, { label: "Credit card", value: "CREDIT_CARD" }];

export { userRoles, userRolesMap, environments, themes, delegationStatuses, paymentTypes };