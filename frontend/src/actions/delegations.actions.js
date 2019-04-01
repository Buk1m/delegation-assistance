import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_DELEGATION: "DELEGATIONS_ADD_DELEGATION"
};

const addNewDelegation = delegation => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_DELEGATION, {
      url: "/delegations",
      needAuth: true,
      headers: {
        "Content-type": "application/json"
      },
      data: delegation
    })
  );
};

export { addNewDelegation };
