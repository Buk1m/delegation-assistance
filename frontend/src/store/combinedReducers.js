import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";
import checklistsReducer from "../reducers/checklists.reducer";
import expenseReducer from "../reducers/expense.reducer";
import delegationChecklistReducer from "../reducers/delegationChecklist.reducer";
import checklistTemplateReducer from "../reducers/checklistTemplate.reducer";

const combinedReducers = combineReducers({
  user: userReducer,
  form: formReducer,
  delegations: delegationsReducer,
  checklists: checklistsReducer,
  checklistTemplate: checklistTemplateReducer,
  expense: expenseReducer,
  delegationChecklist: delegationChecklistReducer
});

export default combinedReducers;
