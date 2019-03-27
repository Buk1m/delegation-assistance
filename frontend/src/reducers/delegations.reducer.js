import { ACTIONS } from "../actions/delegations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
};

const delegationsReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION}_${PENDING}`: {
      result = {
        ...state,
        fetching: true
      };
      break;
    }
    case `${ACTIONS.ADD_DELEGATION}_${FULFILLED}`: {
      result = {
        ...state,
        fetching: false
      };
      break;
    }
    case `${ACTIONS.ADD_DELEGATION}_${REJECTED}`: {
      result = {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
      break;
    }
    default:
      result = state;
  }
  return result;
};

export default delegationsReducer;
