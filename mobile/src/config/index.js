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

const delegationStatuses = {
  CREATED: "Created",
  PREPARED: "Prepared",
  NEEDS_WORK: "Needs work",
  CHECKED: "Confirmed by Manager",
  APPROVED: "Approved",
  FINALIZED: "Finalized"
};

export { userRoles, userRolesMap, delegationStatuses };
