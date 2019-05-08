import { APIService } from "../services/data";

export const ACTIONS = {
  GET_GLOBAL_TEMPLATE: "CHECKLIST_TEMPLATE_GET_GLOBAL_TEMPLATE",
  REORDER_GLOBAL_TEMPLATE: "CHECKLIST_TEMPLATE_REORDER_GLOBAL_TEMPLATE",
  SAVE_GLOBAL_TEMPLATE: "CHECKLIST_TEMPLATE_SAVE_GLOBAL_TEMPLATE",
  ADD_TASK: "CHECKLIST_TEMPLATE_ADD_TASK",
  EDIT_TASK: "CHECKLIST_TEMPLATE_EDIT_TASK",
  DELETE_TASK: "CHECKLIST_TEMPLATE_DELETE_TASK"
};

const fetchGlobalTemplate = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_GLOBAL_TEMPLATE, {
      url: "/checklist",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

const saveGlobalTemplate = globalTemplate => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.SAVE_GLOBAL_TEMPLATE, {
      url: "/checklist",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        activities: [...globalTemplate]
      }
    })
  );
};

const reorderGlobalTemplate = ({ oldIndex, newIndex }) => dispatch =>
  dispatch({
    type: ACTIONS.REORDER_GLOBAL_TEMPLATE,
    payload: {
      oldIndex: oldIndex,
      newIndex: newIndex
    }
  });

const addTask = ({ task, description }) => dispatch =>
  dispatch({
    type: ACTIONS.ADD_TASK,
    payload: {
      task: task,
      description: description
    }
  });

const editTask = ({ id, version, task, description, priority }) => dispatch =>
  dispatch({
    type: ACTIONS.EDIT_TASK,
    payload: {
      id: id,
      version: version,
      task: task,
      description: description,
      priority: priority
    }
  });

const deleteTask = index => dispatch =>
  dispatch({
    type: ACTIONS.DELETE_TASK,
    payload: {
      index: index
    }
  });

export { fetchGlobalTemplate, reorderGlobalTemplate, saveGlobalTemplate, addTask, editTask, deleteTask };
