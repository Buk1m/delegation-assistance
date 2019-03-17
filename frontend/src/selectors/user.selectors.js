const getLoggedStatus = state => state.user.logged;
const getId = state => state.user.id;
const getToken = state => state.user.token;
const getRoles = state => state.user.roles;
const getFirstname = state => state.user.firstname;
const getLastname = state => state.user.lastname;
const getAccountBlocked = state => state.user.accountBlocked;
const getFetchingUser = state => state.user.fetchingUser;
const getRoleActive = state => state.user.roleActive;

export {
  getLoggedStatus,
  getId,
  getToken,
  getRoles,
  getFirstname,
  getLastname,
  getAccountBlocked,
  getFetchingUser,
  getRoleActive
};
