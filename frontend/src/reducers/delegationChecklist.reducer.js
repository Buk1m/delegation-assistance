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
  switch (action.type) {
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${PENDING}`: {
      return {
        ...state,
        fetching: true
      };
    }

    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${FULFILLED}`: {
      return {
        ...state,
        activities: action.payload.data.activities,
        fetching: false
      };
    }

    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${REJECTED}`: {
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };
    }

    default:
      return { ...state };
  }
};

export default delegationChecklistReducer;
