import { ACTIONS } from "../actions/expense.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_EXPENSE}_${PENDING}`: {
      return {
        ...state,
        fetching: true
      };
    }

    case `${ACTIONS.ADD_EXPENSE}_${FULFILLED}`: {
      return {
        ...state,
        fetching: false
      };
    }

    case `${ACTIONS.ADD_EXPENSE}_${REJECTED}`: {
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
    }

    default:
      return state;
  }
};

export default expenseReducer;
