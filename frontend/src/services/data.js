import RequestServiceCreator from "./RequestServiceCreator/RequestServiceCreator";
export const APIService = RequestServiceCreator.create({
  baseURL: "http://localhost:8080/api",
  apiVersion: "1.0.0"
});
