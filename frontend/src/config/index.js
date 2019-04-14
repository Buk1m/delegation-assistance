const userRoles = {
  employee: "employee",
  travelmanager: "travelmanager",
  approver: "approver",
  accountant: "accountant"
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
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:8080/api"
};

const delegationStatuses = {
  CREATED: "Created",
  PREPARED: "Prepared",
  TRAVEL_MANAGER_APPROVED: "Approved by Manager",
  APPROVER_APPROVED: "Approved by Approver",
  RATIFIED: "Ratified"
};

export { userRoles, userRolesMap, environments, delegationStatuses };
