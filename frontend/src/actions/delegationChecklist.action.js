import { APIService } from "../services/data";

export const ACTIONS = {
  FETCH_DELEGATION_CHECKLIST: "DELEGATION_CHECKLIST_FETCH_DELEGATION_CHECKLIST",
  UPDATE_DELEGATION_CHECKLIST: "DELEGATION_CHECKLIST_UPDATE_DELEGATION_CHECKLIST"
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

const updateDelegationChecklist = (delegationId, checklist) => dispatch => {
  return dispatch(
    APIService.patch(ACTIONS.UPDATE_DELEGATION_CHECKLIST, {
      url: `/delegations/${delegationId}/checklist`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: checklist
    })
  );
};

export { fetchDelegationChecklist, updateDelegationChecklist };
