import { ACTIONS } from "../actions/country.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import getFlag from "../config/flags";

import emptyFlag from "../assets/images/flags/_empty.svg";

const initialState = {
  fetching: false,
  name: "",
  nativeName: "",
  region: "",
  capital: "",
  callingCodes: [],
  currencies: [],
  timezones: [],
  alpha3Code: "",
  flag: emptyFlag,
  errors: null,
  subErrors: null
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_COUNTRY}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.FETCH_COUNTRY}_${FULFILLED}`: {
      return {
        ...state,
        fetching: false,
        name: action.payload.data.name,
        nativeName: action.payload.data.nativeName,
        region: action.payload.data.region,
        capital: action.payload.data.capital,
        callingCodes: [...action.payload.data.callingCodes],
        currencies: [...action.payload.data.currencies],
        timezones: [...action.payload.data.timezones],
        alpha3Code: action.payload.data.alpha3Code,
        flag: getFlag(action.payload.data.alpha3Code)
      };
    }

    case `${ACTIONS.FETCH_COUNTRY}_${REJECTED}`:
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };

    default:
      return state;
  }
};

export default countriesReducer;
