const getAccountBlocked = state => state.user.accountBlocked;
const getFetchingUser = state => state.user.fetchingUser;
const getFirstname = state => state.user.firstname;
const getId = state => state.user.id;
const getLastname = state => state.user.lastname;
const getLoggedStatus = state => state.user.logged;
const getRoles = state => state.user.roles;
const getToken = state => state.user.token;

export { getAccountBlocked, getFetchingUser, getFirstname, getId, getLastname, getLoggedStatus, getRoles, getToken };
