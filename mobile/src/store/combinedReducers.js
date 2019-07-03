import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";
import delegationChecklistReducer from "../reducers/delegationChecklist.reducer";
import delegationExpensesReducer from "../reducers/delegationExpenses.reducer";
import delegationFlightReducer from "../reducers/delegationFlight.reducer";
import delegationAccommodationReducer from "../reducers/delegationAccommodation.reducer";
import countriesReducer from "../reducers/countries.reducer";

const combinedReducers = {
  form: formReducer,
  user: userReducer,
  delegations: delegationsReducer,
  delegationChecklist: delegationChecklistReducer,
  delegationExpenses: delegationExpensesReducer,
  delegationFlights: delegationFlightReducer,
  delegationAccommodations: delegationAccommodationReducer,
  countries: countriesReducer
};

export default combinedReducers;
