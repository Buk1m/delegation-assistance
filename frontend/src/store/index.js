import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import Logger from "../middleware/Logger/Logger";
import { RequestActionMiddleware } from "../middleware";
import combinedReducers from "./combinedReducers";
import persistConfig from "./persistConfig";

const persistedReducer = persistReducer(persistConfig, combinedReducers);
const enhancers = applyMiddleware(thunk, RequestActionMiddleware, Logger);

export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
