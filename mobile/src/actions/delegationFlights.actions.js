import { APIService } from "../services/data";
import { formatToISO } from "../helpers/formatters";

export const ACTIONS = {
  ADD_DELEGATION_FLIGHT: "DELEGATION_FLIGHT_ADD_DELEGATION_FLIGHT",
  FETCH_DELEGATION_FLIGHTS: "DELEGATION_FLIGHT_FETCH_DELEGATION_FLIGHTS"
};

const addNewDelegationFlight = (delegationId, flight) => dispatch => {
  const { departurePlace, arrivalPlace, departureDate, arrivalDate } = flight;

  return dispatch(
    APIService.post(ACTIONS.ADD_DELEGATION_FLIGHT, {
      url: `/delegations/${delegationId}/flights`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        departurePlace,
        arrivalPlace,
        departureDate: formatToISO(departureDate),
        arrivalDate: formatToISO(arrivalDate)
      }
    })
  );
};

const fetchDelegationFlights = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_DELEGATION_FLIGHTS, {
      url: `delegations/${delegationId}/flights`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

export { addNewDelegationFlight, fetchDelegationFlights };
