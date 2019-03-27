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
        token: null
      };
      break;
    default:
      result = state;
  }

  return result;
};

export default userReducer;
