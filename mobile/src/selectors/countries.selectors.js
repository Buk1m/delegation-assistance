import get from "lodash/get";

const getCountries = state => {
  return get(state, "countries.countries", []);
};

const getCountriesTypeahead = state => {
  return get(state, "countries.countriesTypeahead", []);
};

const getCountriesFetching = state => {
  return get(state, "countries.fetching", false);
};

export { getCountries, getCountriesFetching, getCountriesTypeahead };
