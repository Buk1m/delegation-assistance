import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";
import checklistsReducer from "../reducers/checklists.reducer";
import expensesReducer from "../reducers/expenses.reducer";
import delegationChecklistReducer from "../reducers/delegationChecklist.reducer";
import delegationExpensesReducer from "../reducers/delegationExpenses.reducer";
import delegationFlightReducer from "../reducers/delegationFlight.reducer";
import delegationAccommodationReducer from "../reducers/delegationAccommodation.reducer";
import countriesReducer from "../reducers/countries.reducer";

const combinedReducers = {
  form: formReducer,
  user: userReducer,
  delegations: delegationsReducer,
  checklists: checklistsReducer,
  expenses: expensesReducer,
  delegationChecklist: delegationChecklistReducer,
  delegationExpenses: delegationExpensesReducer,
  delegationFlight: delegationFlightReducer,
  delegationAccommodation: delegationAccommodationReducer,
  countries: countriesReducer
};

export default combinedReducers;
