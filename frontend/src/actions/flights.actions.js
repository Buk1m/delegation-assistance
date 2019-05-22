import { APIService } from "../services/data";
import { formatToISO } from "../helpers/formatters";

export const ACTIONS = {
  ADD_FLIGHT: "FLIGHTS_ADD_FLIGHT",
  FETCH_FLIGHTS: "FLIGHTS_FETCH_FLIGHTS",
  SORT_FLIGHTS: "FLIGHTS_SORT_FLIGHTS"
};

const addFlight = (delegationId, { departurePlace, departureDate, arrivalPlace, arrivalDate }) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_FLIGHT, {
      url: `/delegations/${delegationId}/flights`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        departurePlace: departurePlace,
        departureDate: formatToISO(departureDate),
        arrivalPlace: arrivalPlace,
        arrivalDate: formatToISO(arrivalDate)
      }
    })
  );
};

const fetchFlights = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_FLIGHTS, {
      url: `/delegations/${delegationId}/flights`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

const sortFlightsByDepartureDate = order => dispatch => {
  return dispatch({
    type: ACTIONS.SORT_FLIGHTS,
    payload: order
  });
};

export { addFlight, fetchFlights, sortFlightsByDepartureDate };
