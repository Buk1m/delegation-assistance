import { ACTIONS } from "../actions/delegations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { showMessage } from "react-native-flash-message";

const initialState = {
  startDate: Date.now(),
  endDate: Date.now(),
  delegationObjective: "",
  destinationCountryISO3: "",
  destinationLocation: "",
  delegations: [],
  delegation: { diet: {} },
  tempDelegations: [],
  datesAreValid: true,
  isSortFilterPanelCollapsed: true,
  fetching: true,
  errors: null,
  updatingMeals: false
};

const delegationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION}_${PENDING}`:
      return { ...state, fetching: false };
    case `${ACTIONS.ADD_DELEGATION}_${FULFILLED}`: {
      showMessage({ message: "Delegation created.", type: "success" });
      return { ...state, fetching: false };
    }
    case `${ACTIONS.ADD_DELEGATION}_${REJECTED}`: {
      showMessage({ message: `Cannot create delegation. ${action.payload.Message}`, type: "danger" });
      return { ...state, fetching: false, errors: action.payload.response.data };
    }

    case `${ACTIONS.FETCH_DELEGATION}_${PENDING}`:
      return { ...state, delegationFetching: true };
    case `${ACTIONS.FETCH_MY_DELEGATIONS}_${PENDING}`:
      return { ...state, fetching: true };
    case `${ACTIONS.UPDATE_DELEGATION_MEALS}_${PENDING}`:
      return { ...state, updatingMeals: true };

    case `${ACTIONS.FETCH_MY_DELEGATIONS}_${FULFILLED}`: {
      const delegations = prepareDelegations(action.payload.data);
      return { ...state, fetching: false, delegations: delegations, tempDelegations: delegations };
    }
    case `${ACTIONS.FETCH_DELEGATION}_${FULFILLED}`: {
      return { ...state, delegationFetching: false, delegation: action.payload.data };
    }
    case `${ACTIONS.UPDATE_DELEGATION_MEALS}_${FULFILLED}`:
      return { ...state, delegation: { ...state.delegation, meals: action.payload.data }, updatingMeals: false };

    case `${ACTIONS.FETCH_MY_DELEGATIONS}_${REJECTED}`:
      showMessage({ message: `Error occured while fetching delegations: ${action.payload.Message}`, type: "danger" });
      return { ...state, fetching: false, errors: action.payload.response.data };
    case `${ACTIONS.FETCH_DELEGATION}_${REJECTED}`:
      showMessage({ message: `Error occured while fetching details: ${action.payload.Message}`, type: "danger" });
      return {
        ...state,
        delegationFetching: false,
        errors: action.payload.response.data
      };
    case `${ACTIONS.UPDATE_DELEGATION_MEALS}_${REJECTED}`:
      showMessage({ message: `Failed to update meals.`, type: "danger" });
      return { ...state, errors: action.payload.response.data, updatingMeals: false };

    case ACTIONS.SET_DELEGATIONS:
      return { ...state, delegations: action.payload };
    case ACTIONS.SET_TEMP_DELEGATIONS:
      return { ...state, tempDelegations: action.payload };
    case ACTIONS.SET_DATES_ARE_VALID:
      return { ...state, datesAreValid: action.payload };
    case ACTIONS.SET_IS_SORT_FILTER_PANEL_COLLAPSED:
      return { ...state, isSortFilterPanelCollapsed: action.payload };
    default:
      return state;
  }
};

const prepareDelegations = delegations => {
  return mapDateTimeToDateOnly(delegations);
};

const mapDateTimeToDateOnly = delegations => {
  return delegations.map(delegation => {
    return Object.assign(delegation, {
      startDate: new Date(delegation.startDate).toLocaleDateString(),
      endDate: new Date(delegation.endDate).toLocaleDateString()
    });
  });
};

export default delegationsReducer;
