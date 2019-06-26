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

export { userRoles, userRolesMap };
