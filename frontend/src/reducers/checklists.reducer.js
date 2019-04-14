import { ACTIONS } from "../actions/checklists.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  fetching: false,
  tasks: []
};

const checklistsReducer = (state = initialState, action) => {
  let result;

  switch (action.type) {
    case `${ACTIONS.ADD_TASK}_${PENDING}`:
    case `${ACTIONS.DELETE_TASK}_${PENDING}`:
    case `${ACTIONS.GET_TASKS}_${PENDING}`:
      result = {
        ...state,
        fetching: true
      };
      break;

    case `${ACTIONS.ADD_TASK}_${FULFILLED}`:
      result = {
        ...state,
        fetching: false,
        tasks: [...state.tasks.concat(action.meta)]
      };
      break;
    case `${ACTIONS.DELETE_TASK}_${FULFILLED}`:
      result = {
        ...state,
        fetching: false,
        tasks: [...state.tasks.filter(task => task.id !== action.meta.id)]
      };
      break;
    case `${ACTIONS.GET_TASKS}_${FULFILLED}`:
      result = {
        ...state,
        fetching: false,
        tasks: action.payload.data.tasks
      };
      break;

    case `${ACTIONS.ADD_TASK}_${REJECTED}`:
    case `${ACTIONS.DELETE_TASK}_${REJECTED}`:
    case `${ACTIONS.GET_TASKS}_${REJECTED}`:
      result = {
        ...state,
        fetching: false
      };
      break;
    default:
      result = state;
  }
  return result;
};

export default checklistsReducer;
