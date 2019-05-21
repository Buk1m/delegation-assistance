import { ACTIONS } from "../actions/delegationFlight.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  fetching: true,
  errors: "",
  subErrors: []
};

const delegationFlightReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION_FLIGHT}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.ADD_DELEGATION_FLIGHT}_${FULFILLED}`:
      showMessage({ message: "Added new flight.", type: "success" });
      return {
        ...state,
        fetching: false
      };

    case `${ACTIONS.ADD_DELEGATION_FLIGHT}_${REJECTED}`:
      showMessage({ message: `Error occurred while adding flight: ${action.payload.Message}`, type: "danger" });
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };

    default:
      return { ...state };
  }
};

export default delegationFlightReducer;
