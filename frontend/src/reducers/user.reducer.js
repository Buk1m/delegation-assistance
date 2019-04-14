import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { prepareToken, mapRoles } from "../helpers";

const initialState = {
  logged: false,
  id: null,
  token: null,
  tokenExpDate: null,
  roles: [],
  login: null,
  firstname: null,
  lastname: null,
  accountBlocked: false,
  fetchingUser: false
};

const userReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.REFRESH_TOKEN}_${PENDING}`:
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
      result = { ...state, fetchingUser: true };
      break;

    case `${ACTIONS.REFRESH_TOKEN}_${FULFILLED}`:
    case `${ACTIONS.LOGIN_USER}_${FULFILLED}`:
      {
        const token = prepareToken(action.payload.data.token);
        const roles = mapRoles(token.authorities);
        result = {
          ...state,
          fetchingUser: false,
          logged: true,
          login: token.sub,
          token: action.payload.data.token,
          tokenExpDate: token.exp,
          roles: roles
        };
      }
      break;

    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
    case `${ACTIONS.REFRESH_TOKEN}_${REJECTED}`:
    case ACTIONS.LOGOUT_USER:
      result = initialState;
      break;
    default:
      result = state;
  }

  return result;
};

export default userReducer;
