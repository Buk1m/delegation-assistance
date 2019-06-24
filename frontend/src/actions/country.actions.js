import { RESTCountries } from "../services/data";

export const ACTIONS = {
  FETCH_COUNTRY: "COUNTRIES_FETCH_COUNTRY"
};

const fetchCountry = countryCode => dispatch => {
  return dispatch(
    RESTCountries.get(ACTIONS.FETCH_COUNTRY, {
      url: `/alpha/${countryCode}`,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

export { fetchCountry };
