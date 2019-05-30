import { APIService } from "../services/data";
import { formatToISO } from "../helpers/formatters";

export const ACTIONS = {
  ADD_DELEGATION_ACCOMMODATION: "DELEGATION_ACCOMMODATION_ADD_DELEGATION_ACCOMMODATION",
  FETCH_DELEGATION_ACCOMMODATIONS: "DELEGATION_ACCOMMODATION_FETCH_DELEGATION_ACCOMMODATIONS"
};

const addNewDelegationAccommodation = (delegationId, accommodation) => dispatch => {
  const { hotelName, checkInDate, checkOutDate } = accommodation;

  return dispatch(
    APIService.post(ACTIONS.ADD_DELEGATION_ACCOMMODATION, {
      url: `/delegations/${delegationId}/accommodations`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: { hotelName, checkInDate: formatToISO(checkInDate), checkOutDate: formatToISO(checkOutDate) }
    })
  );
};

const fetchDelegationAccommodations = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_DELEGATION_ACCOMMODATIONS, {
      url: `delegations/${delegationId}/accommodations`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

export { addNewDelegationAccommodation, fetchDelegationAccommodations };
