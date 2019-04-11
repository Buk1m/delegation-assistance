import { APIService } from "../services/data";

export const ACTIONS = {
  FETCH_DELEGATION_CHECKLIST: "DELEGATION_CHECKLIST_FETCH_DELEGATION_CHECKLIST"
};

const fetchChecklist = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_DELEGATION_CHECKLIST, {
      url: `/delegations/${delegationId}/checklist`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

export { fetchChecklist };