import { ACTIONS } from "../actions/countries.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  countries: [],
  fetchingCountries: false
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_COUNTRIES}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.FETCH_COUNTRIES}_${FULFILLED}`: {
      return {
        ...state,
        fetching: false,
        countries: action.payload.data,
        countriesTypeahead: mapCountriesToTypeaheadItems(action.payload.data)
      };
    }

    case `${ACTIONS.FETCH_COUNTRIES}_${REJECTED}`:
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

const mapCountriesToTypeaheadItems = countries =>
  countries.map(country => {
    return { label: country.countryName, value: country.id };
  });

export default countriesReducer;
