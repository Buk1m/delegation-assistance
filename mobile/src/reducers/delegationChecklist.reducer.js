import { ACTIONS } from "../actions/delegationChecklist.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  delegationId: 0,
  activities: [],
  fetching: true,
  errors: "",
  subErrors: []
};

const delegationChecklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${PENDING}`:
      return {
        ...state,
        checklistName: "",
        tasks: [],
        fetching: true
      };
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${FULFILLED}`:
      return {
        ...state,
        delegationId: action.payload.data.delegationId,
        activities: addKeysToItems(action.payload.data.activities),
        fetching: false
      };
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${REJECTED}`:
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

const addKeysToItems = items => {
  if (items === undefined) {
    return [];
  }

  return items.map(item => {
    return Object.assign(item, { key: `${item.id}` });
  });
};

export default delegationChecklistReducer;
