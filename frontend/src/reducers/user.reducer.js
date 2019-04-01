import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { userRoles } from "../config/";

const initialState = {
  logged: false,
  id: null,
  token: null,
  tokenExpDate: null,
  roles: [userRoles.guest],
  roleActive: userRoles.guest,
  firstname: null,
  lastname: null,
  accountBlocked: false,
  fetchingUser: false
};

const userReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
      result = { ...state, fetchingUser: true };
      break;
    case `${ACTIONS.LOGIN_USER}_${FULFILLED}`:
      result = {
        ...state,
        fetchingUser: false,
        logged: true,
        token: action.payload.data.token
      };
      break;
    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
      result = {
        ...state,
        fetchingUser: false,
        logged: false,
        token: null,
        tokenExpDate: null
      };
      break;
    case ACTIONS.LOGOUT_USER:
      result = initialState;
      break;
    default:
      result = state;
  }

  return result;
};

export default userReducer;