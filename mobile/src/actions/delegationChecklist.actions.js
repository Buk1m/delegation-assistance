import { APIService } from "../services/data";

export const ACTIONS = {
  FETCH_DELEGATION_CHECKLIST: "CHECKLIST_FETCH_DELEGATION_CHECKLIST"
};

const fetchDelegationChecklist = delegationId => dispatch => {
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

export { fetchDelegationChecklist };
