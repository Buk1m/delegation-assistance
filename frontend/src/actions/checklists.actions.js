import { APIService } from "../services/data";

export const ACTIONS = {
  SAVE_CHECKLIST: "CHECKLISTS_SAVE_CHECKLIST"
};

//TODO: IDEMIA2019-66
const saveChecklist = checklist => dispatch => {
  return dispatch(
    APIService.put(ACTIONS.SAVE_CHECKLIST, {
      url: `/checklist/${checklist.id}`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: {
        activities: [...checklist]
      }
    })
  );
};

export { saveChecklist };
