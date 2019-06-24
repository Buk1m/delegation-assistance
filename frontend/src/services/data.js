import RequestServiceCreator from "./RequestServiceCreator/RequestServiceCreator";
import { environments } from "../config";

export const APIService = RequestServiceCreator.create({
  baseURL: environments.API_URL,
  apiVersion: "1.0.0"
});

export const RESTCountries = RequestServiceCreator.create({
  baseURL: "https://restcountries.eu/rest/v2/",
  apiVersion: "2.0.0"
});
