import { ACTIONS } from "../actions/expenses.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  expenseName: "",
  expenseValue: "",
  expenseCurrency: "",
  expenseDate: Date.now()
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_EXPENSE}_${PENDING}`: {
      return {
        ...state,
        fetching: true
      };
    }
    case `${ACTIONS.ADD_EXPENSE}_${FULFILLED}`: {
      showMessage({ message: "Added new expense.", type: "success" });
      return {
        ...state,
        fetching: false
      };
    }
    case `${ACTIONS.ADD_EXPENSE}_${REJECTED}`: {
      showMessage({ message: `Error occurred while adding expense: ${action.payload.Message}`, type: "danger" });
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
    }
    default:
      return { ...state };
  }
};

export default expensesReducer;
