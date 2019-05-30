import RequestServiceCreator from "./RequestServiceCreator/RequestServiceCreator";
export const APIService = RequestServiceCreator.create({
  baseURL: "http://51.38.135.49:8084",
  apiVersion: "1.0.0"
});
