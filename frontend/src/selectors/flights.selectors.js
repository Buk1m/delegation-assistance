import { get } from "lodash";

const getFlights = state => get(state, "flights.flights", []);
const getFlightsFetching = state => get(state, "flights.fetching", false);
const getFlightsAdding = state => get(state, "flights.addingFlight", false);
const getFlightsSortOrder = state => get(state, "flights.sortOrder", "asc");

export { getFlights, getFlightsAdding, getFlightsFetching, getFlightsSortOrder };
