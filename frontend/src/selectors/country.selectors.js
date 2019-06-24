import { get } from "lodash";

const getCountryFetching = state => get(state, "country.fetching", false);
const getCountryName = state => get(state, "country.name", "");
const getCountryNativeName = state => get(state, "country.nativeName", "");
const getCountryRegion = state => get(state, "country.region", "");
const getCountryCapital = state => get(state, "country.capital", "");
const getCountryCallingCodes = state => get(state, "country.callingCodes", []);
const getCountryCurrencies = state => get(state, "country.currencies", []);
const getCountryTimezones = state => get(state, "country.timezones", []);
const getCountryAlpha3Code = state => get(state, "country.alpha3Code", "");
const getCountryFlag = state => get(state, "country.flag", "");

export {
  getCountryFetching,
  getCountryName,
  getCountryNativeName,
  getCountryRegion,
  getCountryCapital,
  getCountryCallingCodes,
  getCountryCurrencies,
  getCountryTimezones,
  getCountryAlpha3Code,
  getCountryFlag
};
