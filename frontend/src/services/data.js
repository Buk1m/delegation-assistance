import RequestServiceCreator from "./RequestServiceCreator/RequestServiceCreator";
export const APINBP = RequestServiceCreator.create({
  baseURL: "http://api.nbp.pl/api",
  apiVersion: "1.0.0"
});