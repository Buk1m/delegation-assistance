import { get, isNil, omit } from "lodash";
import axios from "axios";

export const PENDING = "PENDING";
export const FULFILLED = "FULFILLED";
export const REJECTED = "REJECTED";

function handleResponse({ dispatch, type, meta }, positiveResult = false, value) {
  let desiredType, desiredAction;
  if (!axios.isCancel(value)) {
    desiredType = positiveResult ? FULFILLED : REJECTED;
    desiredAction = {
      type: `${type}_${desiredType}`,
      payload: value,
      meta: omit(meta, ["apiRequest"])
    };

    dispatch(desiredAction);
  }

  return value;
}

const checkIfIsRegularAction = action => {
  const apiRequest = get(action, "meta.apiRequest");
  return isNil(apiRequest) || false === apiRequest;
};

const checkIfUserCanPerformRequest = (state, action) => {
  const loggedStatus = true; // TODO: Is always logged.
  const { needAuth } = action.payload;
  let result = true;
  if (needAuth === true && loggedStatus === false) {
    result = false;
  }
  return result;
};

const RequestActionMiddleware = store => next => action => {
  try {
    const { dispatch, getState } = store;
    const state = getState();
    const { type, payload, meta } = action;
    const { url, method, needAuth, data, headers, baseURL } = payload || {};
    let promise;

    if (checkIfIsRegularAction(action)) {
      next(action);
    } else {
      if (checkIfUserCanPerformRequest(state, action)) {
        if (needAuth === true) {
          headers["Authorization"] = `Bearer ${state.user.token}`;
        }
        promise = axios(url, {
          method,
          data,
          headers,
          baseURL
        });
        dispatch({
          type: `${type}_${PENDING}`,
          payload: promise,
          meta: omit(meta, ["apiRequest"])
        });
        promise
          .then(handleResponse.bind(null, { dispatch, type, meta }, true))
          .catch(handleResponse.bind(null, { dispatch, type, meta }, false));
        return promise;
      } else {
        // eslint-disable-next-line no-console, no-undef
        console.warn("You can not start authorized request while not being logged.");
        return Promise.reject({
          error: "Dana funkcjonalność wymaga zalogowania"
        }).catch(handleResponse.bind(null, { dispatch, type, meta }, false));
      }
    }
  } catch (ex) {
    // eslint-disable-next-line no-console, no-undef
    console.error("ERROR - RequestActionMiddleware", ex);
    return ex;
  }
};

export default RequestActionMiddleware;
