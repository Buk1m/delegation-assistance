import { ACTIONS } from "../actions/accommodations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { orderBy } from "lodash";
import { toast } from "react-toastify";

const initialState = {
  accommodations: [],
  addingAccommodation: false,
  fetching: false,
  sortOrder: "asc"
};

const accommodationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_ACCOMMODATION}_${PENDING}`: {
      return { ...state, addingAccommodation: true };
    }
    case `${ACTIONS.FETCH_ACCOMMODATIONS}_${PENDING}`:
      return { ...state, fetching: true };

    case `${ACTIONS.ADD_ACCOMMODATION}_${FULFILLED}`: {
      const accommodations = [...state.accommodations, parseAccommodationDate(action.payload.data)];
      const sortedAccommodations = sortAccommodationsByCheckInDate(state.sortOrder, accommodations);
      toast.success(`Added new accommodation at ${action.payload.data.hotelsName}.`);
      return { ...state, addingAccommodation: false, accommodations: sortedAccommodations };
    }
    case `${ACTIONS.FETCH_ACCOMMODATIONS}_${FULFILLED}`: {
      const accommodations = parseAccommodationsDates(action.payload.data);
      const sortedAccommodations = sortAccommodationsByCheckInDate(state.sortOrder, accommodations);
      return { ...state, fetching: false, accommodations: sortedAccommodations };
    }
    case `${ACTIONS.ADD_ACCOMMODATION}_${REJECTED}`:
      toast.error(`Error while adding accommodation: ${action.payload.Message}.`);
      return {
        ...state,
        addingAccommodation: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
    case `${ACTIONS.FETCH_ACCOMMODATIONS}_${REJECTED}`:
      toast.error(`Error while fetching accommodations: ${action.payload.Message}.`);
      return { ...state, fetching: false, errors: action.payload.Message, subErrors: action.payload.SubErrors };

    case ACTIONS.SORT_ACCOMMODATIONS: {
      const order = action.payload;
      const addingAccommodation = sortAccommodationsByCheckInDate(order, state.accommodations);
      return { ...state, accommodations: addingAccommodation, sortOrder: order };
    }

    default:
      return state;
  }
};

const parseAccommodationsDates = accommodations => {
  return accommodations.map(accommodation => parseAccommodationDate(accommodation));
};

const parseAccommodationDate = accommodation => {
  return {
    ...accommodation,
    checkInDate: new Date(accommodation.checkInDate),
    checkOutDate: new Date(accommodation.checkOutDate)
  };
};

const sortAccommodationsByCheckInDate = (order, accommodations) => {
  return orderBy(accommodations, ["checkInDate"], [order]);
};

export default accommodationsReducer;
