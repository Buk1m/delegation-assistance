import { ACTIONS } from "../actions/delegations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { inProgressNotification, updateNotification } from "../helpers/notifications";
import { toast } from "react-toastify";

const initialState = {
  delegations: [],
  delegation: {},
  waitingStatus: []
};

const delegationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION}_${PENDING}`:
      return {
        ...state,
        toastId: inProgressNotification(`Creating delegation to ${action.meta.delegation.destinationLocation}`)
      };
    case `${ACTIONS.UPDATE_DELEGATION_STATUS}_${PENDING}`:
    case `${ACTIONS.UPDATE_DELEGATION}_${PENDING}`:
      return { ...state, toastId: inProgressNotification(`Updating delegation no.${action.meta.delegationId}.`) };
    case `${ACTIONS.DELETE_DELEGATION}_${PENDING}`:
      return { ...state, toastId: inProgressNotification(`Deleting delegation no.${action.meta.delegationId}.`) };
    case `${ACTIONS.GET_DELEGATION}_${PENDING}`:
    case `${ACTIONS.GET_DELEGATIONS}_${PENDING}`:
      return { ...state, fetching: true };
    case `${ACTIONS.UPDATE_DELEGATION_MEALS}_${PENDING}`:
      return { ...state };

    case `${ACTIONS.ADD_DELEGATION}_${FULFILLED}`:
      updateNotification(
        state.toastId,
        `Created delegation to ${action.meta.delegation.destinationLocation}.`,
        toast.TYPE.SUCCESS
      );
      return { ...state, delegations: [...state.delegations.concat(action.meta)] };
    case `${ACTIONS.UPDATE_DELEGATION_STATUS}_${FULFILLED}`:
    case `${ACTIONS.UPDATE_DELEGATION}_${FULFILLED}`:
      updateNotification(state.toastId, `Updated delegation no. ${action.meta.delegationId}.`, toast.TYPE.SUCCESS);
      return { ...state, delegation: action.payload.data };
    case `${ACTIONS.DELETE_DELEGATION}_${FULFILLED}`:
      updateNotification(state.toastId, `Deleted delegation no. ${action.meta.delegation.id}.`, toast.TYPE.SUCCESS);
      return { ...state, delegations: [...state.delegations.filter(delegation => delegation.id !== action.meta.id)] };
    case `${ACTIONS.GET_DELEGATION}_${FULFILLED}`:
      return { ...state, fetching: false, delegation: action.payload.data };
    case `${ACTIONS.GET_DELEGATIONS}_${FULFILLED}`:
      return { ...state, fetching: false, delegations: action.payload.data };
    case `${ACTIONS.UPDATE_DELEGATION_MEALS}_${FULFILLED}`:
      return { ...state, delegation: { ...state.delegation, meals: action.payload.data } };

    case `${ACTIONS.ADD_DELEGATION}_${REJECTED}`: {
      updateNotification(state.toastId, "Failed to create delegation.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.response.data };
    }
    case `${ACTIONS.UPDATE_DELEGATION}_${REJECTED}`:
      updateNotification(state.toastId, "Failed to update delegation.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.response.data };
    case `${ACTIONS.UPDATE_DELEGATION_STATUS}_${REJECTED}`:
      updateNotification(
        state.toastId,
        `Failed to update delegation status: ${action.payload.response.data.errorMessage}`,
        toast.TYPE.ERROR
      );
      return { ...state, errors: action.payload.data };
    case `${ACTIONS.DELETE_DELEGATION}_${REJECTED}`:
      updateNotification(state.toastId, "Failed to delete delegation.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.response.data };
    case `${ACTIONS.GET_DELEGATION}_${REJECTED}`:
    case `${ACTIONS.GET_DELEGATIONS}_${REJECTED}`:
      return { ...state, fetching: false, errors: action.payload.response.data };
    case `${ACTIONS.UPDATE_DELEGATION_MEALS}_${REJECTED}`:
      updateNotification(state.toastId, "Failed to update meals.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.response.data };
    case `${ACTIONS.SET_WAITING_STATUS}`: {
      return { ...state, waitingStatus: action.payload.status };
    }

    default:
      return state;
  }
};

export default delegationsReducer;
