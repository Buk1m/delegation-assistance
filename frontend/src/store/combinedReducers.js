import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";

const combinedReducers = combineReducers({
  user: userReducer,
  form: formReducer,
  delegations: delegationsReducer
});

export default combinedReducers;
