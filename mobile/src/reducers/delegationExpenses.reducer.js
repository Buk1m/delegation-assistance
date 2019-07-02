import { ACTIONS } from "../actions/delegationExpenses.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  totalSize: 0,
  data: [],
  currentPage: 1,
  fetching: true,
  errors: null
};

const delegationExpensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_DELEGATION_EXPENSES}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.FETCH_DELEGATION_EXPENSES}_${FULFILLED}`:
      return {
        ...state,
        totalSize: action.payload.data.totalSize,
        data: overwriteOrConcatData(state.data, action.payload.data.data),
        fetching: false
      };

    case `${ACTIONS.FETCH_DELEGATION_EXPENSES}_${REJECTED}`:
      showMessage({ message: "Error while fetching delegation expenses: " + action.payload.Message, type: "danger" });
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      };

    case `${ACTIONS.CLEAR_EXPENSES}`:
      return {
        ...state,
        data: []
      };

    default:
      return { ...state };
  }
};

const overwriteOrConcatData = (stateExpenses, receivedExpenses) => {
  return stateExpensesIncludeAnyOfReceivedExpenses(stateExpenses, receivedExpenses)
    ? receivedExpenses
    : stateExpenses.concat(receivedExpenses);
};

const stateExpensesIncludeAnyOfReceivedExpenses = (stateExpenses, receivedExpenses) => {
  return stateExpenses.some(expenseFromState =>
    receivedExpenses.some(expenseReceived => expenseFromState.id === expenseReceived.id)
  );
};

export default delegationExpensesReducer;
