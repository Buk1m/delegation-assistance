import { ACTIONS } from "../actions/checklists.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  fetching: false,
  activites: [],
  errors: "",
  subErrors: []
};

const checklistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.SAVE_CHECKLIST}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.SAVE_CHECKLIST}_${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        activites: action.payload.data.activites
      };

    case `${ACTIONS.SAVE_CHECKLIST}_${REJECTED}`:
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };

    default:
      return state;
  }
};

export default checklistsReducer;
