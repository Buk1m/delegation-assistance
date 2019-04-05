import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";
import checklistsReducer from "../reducers/checklists.reducer";
import expenseReducer from "../reducers/expense.reducer";

const combinedReducers = combineReducers({
  user: userReducer,
  form: formReducer,
  delegations: delegationsReducer,
  checklists: checklistsReducer,
  expense: expenseReducer
});

export default combinedReducers;
