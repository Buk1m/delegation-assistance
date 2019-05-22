import { APIService } from "../services/data";
import { formatToISO } from "../helpers/formatters";

export const ACTIONS = {
  FETCH_ACCOMMODATIONS: "ACCOMMODATIONS_FETCH_ACCOMMODATIONS",
  ADD_ACCOMMODATION: "ACCOMMODATIONS_ADD_ACCOMMODATION",
  SORT_ACCOMMODATIONS: "ACCOMMODATIONS_SORT_ACCOMMODATIONS"
};

const addAccommodation = (delegationId, { hotelName, checkInDate, checkOutDate }) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_ACCOMMODATION, {
      url: `/delegations/${delegationId}/accommodations`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: { hotelName, checkInDate: formatToISO(checkInDate), checkOutDate: formatToISO(checkOutDate) }
    })
  );
};

const fetchAccommodations = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_ACCOMMODATIONS, {
      url: `/delegations/${delegationId}/accommodations`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

const sortAccommodationsByCheckInDate = order => dispatch => {
  return dispatch({
    type: ACTIONS.SORT_ACCOMMODATIONS,
    payload: order
  });
};

export { addAccommodation, fetchAccommodations, sortAccommodationsByCheckInDate };
