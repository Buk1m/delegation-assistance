import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import combinedReducers from "./combinedReducers";
import { RequestActionMiddleware } from "../middleware";

const enhancers = applyMiddleware(thunk, RequestActionMiddleware);

const makeConfiguredStore = (reducer, initialState) => createStore(reducer, initialState, enhancers);

export const makeStore = (initialState, options) => {
  if (options.isServer) {
    initialState = initialState || { user: "foo" };
    return makeConfiguredStore(combinedReducers);
  } else {
    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["user"]
    };
    const persistedReducer = persistReducer(persistConfig, combinedReducers);
    const store = makeConfiguredStore(persistedReducer, initialState);
    store.__persistor = persistStore(store);
    return store;
  }
};
