import { ACTIONS } from "../actions/flights.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { orderBy } from "lodash";
import { toast } from "react-toastify";

const initialState = {
  addingFlight: false,
  fetching: false,
  flights: [],
  sortOrder: "asc"
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_FLIGHT}_${PENDING}`: {
      return { ...state, addingFlight: true };
    }
    case `${ACTIONS.FETCH_FLIGHTS}_${PENDING}`:
      return { ...state, fetching: true };

    case `${ACTIONS.ADD_FLIGHT}_${FULFILLED}`: {
      const flights = [...state.flights, parseFlightDate(action.payload.data)];
      const sortedFlights = sortFlightsByDepartureDate(state.sortOrder, flights);
      toast.success(`Added new flight to ${action.payload.data.to}.`);
      return { ...state, addingFlight: false, flights: sortedFlights };
    }
    case `${ACTIONS.FETCH_FLIGHTS}_${FULFILLED}`: {
      const flights = parseFlightsDates(action.payload.data);
      const sortedFlights = sortFlightsByDepartureDate(state.sortOrder, flights);
      return { ...state, fetching: false, flights: sortedFlights };
    }
    case `${ACTIONS.ADD_FLIGHT}_${REJECTED}`:
      toast.error(`Error while adding flight: ${action.payload.Message}.`);
      return { ...state, addingFlight: false, errors: action.payload.Message, subErrors: action.payload.SubErrors };
    case `${ACTIONS.FETCH_FLIGHTS}_${REJECTED}`:
      toast.error(`Error while feching flights: ${action.payload.Message}.`);
      return { ...state, fetching: false, errors: action.payload.Message, subErrors: action.payload.SubErrors };

    case ACTIONS.SORT_FLIGHTS: {
      const order = action.payload;
      const sortedFlights = sortFlightsByDepartureDate(order, state.flights);
      return { ...state, flights: sortedFlights, sortOrder: order };
    }

    default:
      return state;
  }
};

const parseFlightsDates = flights => {
  return flights.map(flight => parseFlightDate(flight));
};

const parseFlightDate = flight => {
  return { ...flight, departureDate: new Date(flight.departureDate), arrivalDate: new Date(flight.arrivalDate) };
};

const sortFlightsByDepartureDate = (order, flights) => {
  return orderBy(flights, ["departureDate"], [order]);
};

export default flightsReducer;
