import { isNil } from "lodash";

const getLoggedStatus = state => state.user.logged;
const getId = state => state.user.id;
const getToken = state => state.user.token;
const getRoles = state => state.user.roles;
const getFirstname = state => state.user.firstname;
const getLastname = state => state.user.lastname;
const getAccountBlocked = state => state.user.accountBlocked;
const getFetchingUser = state => state.user.fetchingUser;
const getUserMainRole = state => {
  if (isNil(state.user.roles) || 0 === state.user.roles.length) {
    return undefined;
  } else {
    return state.user.roles[state.user.roles.length - 1].name;
  }
};

export {
  getLoggedStatus,
  getId,
  getToken,
  getRoles,
  getFirstname,
  getLastname,
  getAccountBlocked,
  getFetchingUser,
  getUserMainRole
};
