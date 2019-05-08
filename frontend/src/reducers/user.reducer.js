import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { prepareToken, mapRoles } from "../helpers";

const initialState = {
  logged: false,
  id: null,
  token: null,
  tokenExpDate: null,
  roles: [],
  roleActive: null,
  login: null,
  firstname: null,
  lastname: null,
  accountBlocked: false,
  fetchingUser: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.REFRESH_TOKEN}_${PENDING}`:
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
      return { ...state, fetchingUser: true };

    case `${ACTIONS.REFRESH_TOKEN}_${FULFILLED}`:
    case `${ACTIONS.LOGIN_USER}_${FULFILLED}`: {
      const token = prepareToken(action.payload.data.token);
      const roles = mapRoles(token.authorities);
      return {
        ...state,
        fetchingUser: false,
        logged: true,
        login: token.sub,
        token: action.payload.data.token,
        tokenExpDate: token.exp,
        roles: roles,
        roleActive: state.roleActive || roles[0]
      };
    }

    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
    case `${ACTIONS.REFRESH_TOKEN}_${REJECTED}`:
    case ACTIONS.LOGOUT_USER:
      return initialState;

    case ACTIONS.CHANGE_ROLE:
      return {
        ...state,
        roleActive: action.payload.role
      };

    default:
      return state;
  }
};

export default userReducer;
