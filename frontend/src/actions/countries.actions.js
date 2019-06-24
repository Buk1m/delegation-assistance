import { APIService } from "../services/data";

export const ACTIONS = {
  FETCH_COUNTRIES: "COUNTRIES_FETCH_COUNTRIES"
};

const fetchCountries = () => (dispatch, getState) => {
  // Fetching only when coutries collection is empty in redux store.
  const countries = getState().countries.countries;
  if (countries.length === 0) {
    return dispatch(
      APIService.get(ACTIONS.FETCH_COUNTRIES, {
        url: `/countries`,
        headers: {
          "Content-type": "application/json"
        },
        needAuth: true
      })
    );
  }
  return Promise.resolve();
};

export { fetchCountries };
