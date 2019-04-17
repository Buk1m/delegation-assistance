import { ACTIONS } from "../actions/delegationChecklist.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  checklistName: "",
  tasks: [],
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
        checklistName: action.payload.checklistName,
        tasks: action.payload.tasks,
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
