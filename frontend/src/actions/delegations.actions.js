import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_DELEGATION: "DELEGATIONS_ADD_DELEGATION"
};

const addNewDelegation = delegation => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_DELEGATION, {
      url: "/delegations",
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: delegation
    })
  );
};

export { addNewDelegation };
