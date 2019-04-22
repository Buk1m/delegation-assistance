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
        checklistName: "",
        tasks: [],
        fetching: true
      };
      break;
    }
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${FULFILLED}`: {
      result = {
        ...state,
        checklistName: action.payload.data.checklistName,
        tasks: addKeysToItems(action.payload.data.tasks),
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

const addKeysToItems = items => {
  if (items === undefined) {
    return [];
  }
  //TODO: replace index with taskId when requirements will change
  return items.map((item, index) => {
    return Object.assign(item, { key: `${index}` });
  });
};

export default delegationChecklistReducer;
