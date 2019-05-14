import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import accommodationsReducer from "../reducers/accommodations.reducer";
import checklistsReducer from "../reducers/checklists.reducer";
import checklistTemplateReducer from "../reducers/checklistTemplate.reducer";
import delegationChecklistReducer from "../reducers/delegationChecklist.reducer";
import delegationsReducer from "../reducers/delegations.reducer";
import expenseReducer from "../reducers/expense.reducer";
import flightsReducer from "../reducers/flights.reducer";
import themeReducer from "../reducers/theme.reducer";
import userReducer from "../reducers/user.reducer";

const combinedReducers = combineReducers({
  accommodations: accommodationsReducer,
  checklists: checklistsReducer,
  checklistTemplate: checklistTemplateReducer,
  delegationChecklist: delegationChecklistReducer,
  delegations: delegationsReducer,
  expense: expenseReducer,
  flights: flightsReducer,
  form: formReducer,
  theme: themeReducer,
  user: userReducer
});

export default combinedReducers;
