import { ACTIONS } from "../actions/countries.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { toast } from "react-toastify";
import { notify } from "../helpers/notifications";

const initialState = {
  countries: [],
  countriesTypeahead: [],
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
      notify(`Cannot fetch country: ${action.payload.response.data.errorMessage}`, toast.TYPE.ERROR);
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      };

    default:
      return state;
  }
};

const mapCountriesToTypeaheadItems = countries =>
  countries.map(country => ({ label: country.countryName, value: country.id }));

export default countriesReducer;
