import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";

import userReducer from "../reducers/user.reducer";
import delegationsReducer from "../reducers/delegations.reducer";

const combinedReducers = {
  form: formReducer,
  user: userReducer,
  delegations: delegationsReducer,
};

export default combineReducers(combinedReducers);
