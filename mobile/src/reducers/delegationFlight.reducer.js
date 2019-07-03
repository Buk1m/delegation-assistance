import { ACTIONS } from "../actions/delegationFlights.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  flights: [],
  fetching: true,
  errors: null
};

const delegationFlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION_FLIGHT}_${PENDING}`:
    case `${ACTIONS.FETCH_DELEGATION_FLIGHTS}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.ADD_DELEGATION_FLIGHT}_${FULFILLED}`:
      showMessage({ message: "Added new flight.", type: "success" });
      return {
        ...state,
        flights: [...state.flights, action.payload.data],
        fetching: false
      };

    case `${ACTIONS.FETCH_DELEGATION_FLIGHTS}_${FULFILLED}`:
      return {
        ...state,
        flights: action.payload.data,
        fetching: false
      };

    case `${ACTIONS.ADD_DELEGATION_FLIGHT}_${REJECTED}`:
      showMessage({ message: `Error occurred while adding flight: ${action.payload.Message}`, type: "danger" });
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      };

    case `${ACTIONS.FETCH_DELEGATION_FLIGHTS}_${REJECTED}`:
      showMessage({ message: `Error occurred while fetching flights: ${action.payload.Message}`, type: "danger" });
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      };

    default:
      return { ...state };
  }
};

export default delegationFlightReducer;
