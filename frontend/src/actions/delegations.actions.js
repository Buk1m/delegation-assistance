import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_DELEGATION: "DELEGATIONS_ADD_DELEGATION",
  DELETE_DELEGATION: "DELEGATIONS_DELETE_DELEGATION",
  GET_DELEGATIONS: "DELEGATIONS_GET_DELEGATIONS",
  GET_DELEGATION: "DELEGATIONS_GET_DELEGATION",
  UPDATE_DELEGATION: "DELEGATIONS_UPDATE_DELEGATION",
  UPDATE_DELEGATION_MEALS: "DELEGATIONS_UPDATE_DELEGATION_MEALS"
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

const deleteDelegation = delegationId => dispatch => {
  return dispatch(
    APIService.delete(
      ACTIONS.DELETE_DELEGATION,
      {
        url: `/delegations/${delegationId}`,
        needAuth: true,
        headers: {
          "Content-type": "application/json"
        },
        data: delegationId
      },
      {
        delegationId
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

const updateDelegation = delegation => dispatch => {
  return dispatch(
    APIService.patch(
      ACTIONS.UPDATE_DELEGATION,
      {
        url: `/delegations/${delegation.id}`,
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

const updateDelegationMeals = (meals, delegationId) => dispatch => {
  return dispatch(
    APIService.patch(ACTIONS.UPDATE_DELEGATION_MEALS, {
      url: `/delegations/${delegationId}/meals`,
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: meals
    })
  );
};

export {
  addNewDelegation,
  deleteDelegation,
  fetchDelegations,
  fetchDelegation,
  fetchMyDelegations,
  updateDelegation,
  updateDelegationMeals
};
