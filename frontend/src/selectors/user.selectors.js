import { get } from "lodash";

const getLoggedStatus = state => state.user.logged;
const getId = state => state.user.id;
const getToken = state => state.user.token;
const getTokenExpDate = state => state.user.tokenExpDate;
const getRoles = state => state.user.roles;
const getFirstname = state => state.user.firstname;
const getLastname = state => state.user.lastname;
const getFullName = state =>
  get(state, getFirstname(state), "unknown") + " " + get(state, getFirstname(state), "unknown");
const getAccountBlocked = state => state.user.accountBlocked;
const getFetchingUser = state => state.user.fetchingUser;
const getRoleActive = state => state.user.roleActive;

export {
  getLoggedStatus,
  getId,
  getToken,
  getTokenExpDate,
  getRoles,
  getFirstname,
  getLastname,
  getFullName,
  getAccountBlocked,
  getFetchingUser,
  getRoleActive
};
