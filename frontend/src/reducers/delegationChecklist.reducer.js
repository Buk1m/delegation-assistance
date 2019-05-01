import { ACTIONS } from "../actions/delegationChecklist.action";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  delegationId: "",
  activities: [],
  fetching: true,
  errors: "",
  subErrors: []
};

const delegationChecklistReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${PENDING}`: {
      result = {
        ...state,
        fetching: true
      };
      break;
    }
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${FULFILLED}`: {
      result = {
        ...state,
        activities: action.payload.data.activities,
        fetching: false
      };
      break;
    }
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${REJECTED}`: {
      result = {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
      break;
    }
    default:
      result = { ...state };
  }
  return result;
};

export default delegationChecklistReducer;
