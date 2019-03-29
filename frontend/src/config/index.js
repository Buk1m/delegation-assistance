export const userRoles = {
  guest: "guest",
  employee: "employee",
  travelmanager: "travelmanager",
  approver: "approver",
  accountant: "accountant"
};

export const environments = {
  NODE_ENV: process.env.NODE_ENV || "development",
  LOGS: process.env.REACT_APP_LOGS || "none",
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:8080/api"
};
