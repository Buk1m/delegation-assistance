import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_CHECKLIST: "CHECKLISTS_ADD_CHECKLIST",
  GET_TASKS: "CHECKLISTS_GET_TASKS",
  DELETE_TASK: "CHECKLISTS_DELETE_TASK"
};

const addChecklist = checklists => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_CHECKLIST, {
      url: "/checklists",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        activities: checklists
      }
    })
  );
};

const deleteTask = id => dispatch => {
  const url = "/checklist/tasks/" + id;
  return dispatch(
    APIService.delete(
      ACTIONS.DELETE_TASK,
      {
        url: url,
        headers: {
          "Content-type": "application/json"
        },
        needAuth: true
      },
      {
        id: id
      }
    )
  );
};

const fetchTasks = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_TASKS, {
      url: "/checklist",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

const saveTasks = tasks => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.GET_TASKS, {
      url: "/checklist",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        tasks: tasks
      }
    })
  );
};

export { addChecklist, deleteTask, fetchTasks, saveTasks };
