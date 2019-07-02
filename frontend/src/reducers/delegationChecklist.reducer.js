import { ACTIONS } from "../actions/delegationChecklist.action";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { notify } from "../helpers/notifications";
import { toast } from "react-toastify";

const initialState = {
  delegationId: "",
  activities: [],
  fetching: true,
  updating: false,
  errors: null
};

const delegationChecklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.UPDATE_DELEGATION_CHECKLIST}_${PENDING}`:
      return {
        ...state,
        updating: true
      };
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.UPDATE_DELEGATION_CHECKLIST}_${FULFILLED}`: {
      return {
        ...state,
        delegationChecklist: action.payload.data,
        updating: false
      };
    }
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${FULFILLED}`: {
      return {
        ...state,
        delegationChecklist: action.payload.data,
        fetching: false
      };
    }

    case `${ACTIONS.UPDATE_DELEGATION_CHECKLIST}_${REJECTED}`:
      notify(`Failed to update delegation checklist: ${action.payload.response.data.errorMessage}`, toast.TYPE.ERROR);
      return {
        ...state,
        updating: false,
        errors: action.payload.response.data
      };
    case `${ACTIONS.FETCH_DELEGATION_CHECKLIST}_${REJECTED}`: {
      notify(`Failed to fetch delegation checklist: ${action.payload.response.data.errorMessage}`, toast.TYPE.ERROR);
      return {
        ...state,
        fetching: false,
        errors: action.payload.response.data
      };
    }

    default:
      return { ...state };
  }
};

export default delegationChecklistReducer;
