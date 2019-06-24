import get from "lodash/get";

const getCountries = state => get(state, "countries.countries", []);
const getCountriesTypeahead = state => get(state, "countries.countriesTypeahead", []);
const getCountriesFetching = state => get(state, "countries.fetching", false);

export { getCountries, getCountriesFetching, getCountriesTypeahead };
