import { ACTIONS } from "../actions/user.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  logged: false,
  id: null,
  token: null,
  roles: [],
  firstname: null,
  lastname: null,
  accountBlocked: false,
  fetchingUser: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.LOGIN_USER}_${PENDING}`:
      return { ...state, fetchingUser: true };
    case `${ACTIONS.LOGIN_USER}_${FULFILLED}`:
      return {
        ...state,
        fetchingUser: false,
        logged: true,
        token: action.payload.data.token
      };
    case `${ACTIONS.LOGIN_USER}_${REJECTED}`:
      return {
        ...state,
        fetchingUser: false,
        logged: false,
        token: null
      };
    case ACTIONS.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
