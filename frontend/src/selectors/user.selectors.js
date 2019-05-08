import { get } from "lodash";
import { userRoles } from "../config";

const getLoggedStatus = state => get(state, "user.logged", false);
const getId = state => get(state, "user.id");
const getToken = state => get(state, "user.token");
const getTokenExpDate = state => get(state, "user.tokenExpDate");
const getRoles = state => get(state, "user.roles");
const getActiveRole = state => get(state, "user.roleActive");
const getLogin = state => get(state, "user.login");
const getFirstname = state => get(state, "user.firstname");
const getLastname = state => get(state, "user.lastname");
const getAccountBlocked = state => get(state, "user.accountBlocked");
const getFetchingUser = state => get(state, "user.fetchingUser");
const getRoleActive = state => get(state, "user.roleActive");
const getFullName = state => {
  if (!(getFirstname(state) && getLastname(state))) {
    return getLogin(state);
  } else {
    return get(state, getFirstname(state), "unknown") + " " + get(state, getFirstname(state), "unknown");
  }
};
const isUserEmployee = state => getActiveRole(state) === userRoles.employee;
const isUserTravelmanager = state => getActiveRole(state) === userRoles.travelmanager;
const isUserApprover = state => getActiveRole(state) === userRoles.approver;
const isUserAccountant = state => getActiveRole(state) === userRoles.accountant;

export {
  getLoggedStatus,
  getId,
  getToken,
  getTokenExpDate,
  getRoles,
  getActiveRole,
  getLogin,
  getFirstname,
  getLastname,
  getFullName,
  getAccountBlocked,
  getFetchingUser,
  getRoleActive,
  isUserEmployee,
  isUserTravelmanager,
  isUserApprover,
  isUserAccountant
};
