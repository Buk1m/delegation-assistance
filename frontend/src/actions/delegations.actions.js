import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_DELEGATION: "DELEGATIONS_ADD_DELEGATION",
  GET_DELEGATIONS: "DELEGATIONS_GET_DELEGATIONS",
  GET_DELEGATION: "DELEGATIONS_GET_DELEGATION"
};

const addNewDelegation = delegation => dispatch => {
  return dispatch(
    APIService.post(
      ACTIONS.ADD_DELEGATION,
      {
        url: "/delegations",
        needAuth: true,
        headers: {
          "Content-type": "application/json"
        },
        data: delegation
      },
      {
        delegation
      }
    )
  );
};

const fetchDelegations = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_DELEGATIONS, {
      url: "/delegations",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};
const fetchDelegation = delegationId => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_DELEGATION, {
      url: `/delegations/${delegationId}`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

const fetchMyDelegations = () => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.GET_DELEGATIONS, {
      url: "/delegations/my",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      }
    })
  );
};

export {
  addNewDelegation,
  fetchDelegations,
  fetchDelegation,
  fetchMyDelegations
};
