import { ACTIONS } from "../actions/expenses.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  fetching: false,
  expenses: [],
  totalSize: 0,
  errors: "",
  subErrors: []
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_EXPENSES}_${PENDING}`:
    case `${ACTIONS.ADD_EXPENSE}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.GET_EXPENSES}_${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        expenses: [...action.payload.data.data],
        totalSize: action.payload.data.totalSize
      };
    case `${ACTIONS.ADD_EXPENSE}_${FULFILLED}`:
      return {
        ...state,
        fetching: false
      };

    case `${ACTIONS.GET_EXPENSES}_${REJECTED}`:
    case `${ACTIONS.ADD_EXPENSE}_${REJECTED}`:
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };

    default:
      return state;
  }
};

export default expenseReducer;
