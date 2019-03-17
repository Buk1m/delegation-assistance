import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import combinedReducers from "./combinedReducers";
import { RequestActionMiddleware } from "../middleware";

const enhancers = applyMiddleware(thunk, RequestActionMiddleware);

let initialState = {};

const config = {
  key: "idemiadelegate",
  storage,
  whitelist: ["user"]
};

const reducer = persistCombineReducers(config, combinedReducers);
const store = createStore(reducer, initialState, enhancers);
const persistor = persistStore(store);

export { store as default, persistor };
