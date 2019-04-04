import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_TASK: "CHECKLISTS_ADD_TASK",
  GET_TASKS: "CHECKLISTS_GET_TASKS",
  DELETE_TASK: "CHECKLISTS_DELETE_TASK"
};

const addTask = (name, description) => dispatch => {
  return dispatch(
    APIService.post(
      ACTIONS.ADD_TASK,
      {
        url: "/checklist/tasks",
        headers: {
          "Content-type": "application/json"
        },
        needAuth: true,
        data: {
          name: name,
          description: description
        }
      },
      {
        name: name,
        description: description
      }
    )
  );
};

const deleteTask = id => dispatch => {
  let url = "/checklist/tasks/" + id;
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

export { addTask, deleteTask, fetchTasks, saveTasks };
