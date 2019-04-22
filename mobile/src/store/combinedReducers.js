import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";
import checklistsReducer from "../reducers/checklists.reducer";
import expensesReducer from "../reducers/expenses.reducer";
import delegationChecklistReducer from "../reducers/delegationChecklist.reducer";

const combinedReducers = {
  form: formReducer,
  user: userReducer,
  delegations: delegationsReducer,
  checklists: checklistsReducer,
  expenses: expensesReducer,
  delegationChecklist: delegationChecklistReducer
};

export default combinedReducers;
