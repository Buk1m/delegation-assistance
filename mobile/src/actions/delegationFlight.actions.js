import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_DELEGATION_FLIGHT: "DELEGATION_FLIGHT_ADD_DELEGATION_FLIGHT"
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
      data: { departurePlace, arrivalPlace, departureDate, arrivalDate }
    })
  );
};

export { addNewDelegationFlight };
