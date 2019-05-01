import { ACTIONS } from "../actions/delegations.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";
import { inProgressNotification, updateNotification } from "../helpers/notifications";
import { toast } from "react-toastify";

const initialState = {
  delegations: []
};

const delegationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.ADD_DELEGATION}_${PENDING}`:
      return {
        ...state,
        toastId: inProgressNotification(`Creating delegation to ${action.meta.delegation.destinationLocation}`)
      };

    case `${ACTIONS.UPDATE_DELEGATION}_${PENDING}`:
      return { ...state, toastId: inProgressNotification(`Updating delegation no.${action.meta.delegation.id}.`) };

    case `${ACTIONS.DELETE_DELEGATION}_${PENDING}`:
      return { ...state, toastId: inProgressNotification(`Deleting delegation no.${action.meta.delegationId}.`) };

    case `${ACTIONS.GET_DELEGATION}_${PENDING}`:
    case `${ACTIONS.GET_DELEGATIONS}_${PENDING}`:
      return { ...state, fetching: true };

    case `${ACTIONS.ADD_DELEGATION}_${FULFILLED}`:
      updateNotification(
        state.toastId,
        `Created delegation to ${action.meta.delegation.destinationLocation}.`,
        toast.TYPE.SUCCESS
      );
      return { ...state, delegations: [...state.delegations.concat(action.meta)] };

    case `${ACTIONS.UPDATE_DELEGATION}_${FULFILLED}`:
      updateNotification(state.toastId, `Updated delegation no. ${action.meta.delegation.id}.`, toast.TYPE.SUCCESS);
      return { ...state };

    case `${ACTIONS.DELETE_DELEGATION}_${FULFILLED}`:
      updateNotification(state.toastId, `Deleted delegation no. ${action.meta.delegation.id}.`, toast.TYPE.SUCCESS);
      return { ...state, delegations: [...state.delegations.filter(delegation => delegation.id !== action.meta.id)] };

    case `${ACTIONS.GET_DELEGATION}_${FULFILLED}`:
      return { ...state, fetching: false, delegation: action.payload.data };

    case `${ACTIONS.GET_DELEGATIONS}_${FULFILLED}`:
      return { ...state, fetching: false, delegations: action.payload.data };

    case `${ACTIONS.ADD_DELEGATION}_${REJECTED}`:
      updateNotification(state.toastId, "Failed to create delegation.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.Message, subErrors: action.payload.SubErrors };

    case `${ACTIONS.UPDATE_DELEGATION}_${REJECTED}`:
      updateNotification(state.toastId, "Failed to update delegation.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.Message, subErrors: action.payload.SubErrors };

    case `${ACTIONS.DELETE_DELEGATION}_${REJECTED}`:
      updateNotification(state.toastId, "Failed to delete delegation.", toast.TYPE.ERROR);
      return { ...state, errors: action.payload.Message, subErrors: action.payload.SubErrors };
    case `${ACTIONS.GET_DELEGATION}_${REJECTED}`:
    case `${ACTIONS.GET_DELEGATIONS}_${REJECTED}`:
      return { ...state, fetching: false, errors: action.payload.Message, subErrors: action.payload.SubErrors };
    default:
      return state;
  }
};

export default delegationsReducer;
