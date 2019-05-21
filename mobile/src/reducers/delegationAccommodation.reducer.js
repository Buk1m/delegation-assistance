import { ACTIONS } from "../actions/delegationAccommodation.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  fetching: true,
  errors: "",
  subErrors: []
};

const delegationAccommodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION_ACCOMMODATION}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.ADD_DELEGATION_ACCOMMODATION}_${FULFILLED}`:
      showMessage({ message: "Added new accommodation.", type: "success" });
      return {
        ...state,
        fetching: false
      };

    case `${ACTIONS.ADD_DELEGATION_ACCOMMODATION}_${REJECTED}`:
      showMessage({ message: `Error occurred while adding accommodation: ${action.payload.Message}`, type: "danger" });
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

export default delegationAccommodationReducer;
