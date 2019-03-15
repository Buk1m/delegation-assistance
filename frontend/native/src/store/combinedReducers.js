import { reducer as formReducer } from "redux-form";

import userReducer from "../reducers/user.reducer";

const combinedReducers = {
  form: formReducer,
  user: userReducer
};

export default combinedReducers;
