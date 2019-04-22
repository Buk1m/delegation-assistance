import { ACTIONS } from "../actions/delegations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import countries from "get-countries-info";

const initialState = {
  startDate: Date.now(),
  endDate: Date.now(),
  delegationObjective: "",
  destinationCountryISO3: "",
  destinationLocation: "",
  delegations: [],
  tempDelegations: [],
  datesAreValid: true,
  isSortFilterPanelCollapsed: true,
  fetching: true,
  errors: "",
  subErrors: []
};

const delegationsReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION}_${PENDING}`: {
      result = {
        ...state,
        fetching: true
      };
      break;
    }
    case `${ACTIONS.ADD_DELEGATION}_${FULFILLED}`: {
      result = {
        ...state,
        fetching: false
      };
      break;
    }
    case `${ACTIONS.ADD_DELEGATION}_${REJECTED}`: {
      result = {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
      break;
    }
    case `${ACTIONS.FETCH_MY_DELEGATIONS}_${PENDING}`:
      result = { ...state, fetching: true };
      break;
    case `${ACTIONS.FETCH_MY_DELEGATIONS}_${FULFILLED}`: {
      const delegations = prepareDelegations(action.payload.data);

      result = {
        ...state,
        fetching: false,
        delegations: delegations,
        tempDelegations: delegations
      };
      break;
    }
    case `${ACTIONS.FETCH_MY_DELEGATIONS}_${REJECTED}`:
      result = { ...state, fetching: false };
      break;
    case ACTIONS.SET_DELEGATIONS:
      result = { ...state, delegations: action.payload };
      break;
    case ACTIONS.SET_TEMP_DELEGATIONS:
      result = { ...state, tempDelegations: action.payload };
      break;
    case ACTIONS.SET_DATES_ARE_VALID:
      result = { ...state, datesAreValid: action.payload };
      break;
    case ACTIONS.SET_IS_SORT_FILTER_PANEL_COLLAPSED:
      result = { ...state, isSortFilterPanelCollapsed: action.payload };
      break;
    default:
      result = { ...state };
  }
  return result;
};

const prepareDelegations = delegations => {
  return mapDateTimeToDateOnly(mapIso3ToCountry(addKeysToItems(delegations)));
};

const addKeysToItems = items => {
  return items.map(item => {
    return Object.assign(item, { key: `${item.id}` });
  });
};

const mapIso3ToCountry = delegations => {
  return delegations.map(delegation => {
    const query = {
      ISO: delegation.destinationCountryISO3
    };
    return Object.assign(delegation, {
      country: countries(query, "name")[0]
    });
  });
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
