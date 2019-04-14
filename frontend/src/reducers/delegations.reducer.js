import { ACTIONS } from "../actions/delegations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  delegations: [],
  delegation: null
};

const delegationsReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION}_${PENDING}`:
    case `${ACTIONS.GET_DELEGATION}_${PENDING}`:
    case `${ACTIONS.GET_DELEGATIONS}_${PENDING}`:
      result = {
        ...state,
        fetching: true
      };
      break;

    case `${ACTIONS.ADD_DELEGATION}_${FULFILLED}`:
      result = {
        ...state,
        fetching: false,
        delegations: [...state.delegations.concat(action.meta)]
      };
      break;
    case `${ACTIONS.GET_DELEGATION}_${FULFILLED}`:
      result = {
        ...state,
        fetching: false,
        delegation: action.payload.data
      };
      break;
    case `${ACTIONS.GET_DELEGATIONS}_${FULFILLED}`:
      result = {
        ...state,
        fetching: false,
        delegations: action.payload.data
      };
      break;

    case `${ACTIONS.ADD_DELEGATION}_${REJECTED}`:
    case `${ACTIONS.GET_DELEGATION}_${REJECTED}`:
    case `${ACTIONS.GET_DELEGATIONS}_${REJECTED}`:
      result = {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
      break;
    default:
      result = state;
  }
  return result;
};

export default delegationsReducer;
