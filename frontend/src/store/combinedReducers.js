import { reducer as formReducer } from "redux-form";

import expensesReducer from "../reducers/expenses.reducer";

const combinedReducers = {
  form: formReducer,
  expenses: expensesReducer
};

export default combinedReducers;