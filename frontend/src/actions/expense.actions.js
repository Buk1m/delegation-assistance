import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_EXPENSE: "DELEGATIONS_ADD_EXPENSE"
};

const addExpense = (expense, delegationId) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.ADD_EXPENSE, {
      url: `/delegations/${delegationId}/expenses`,
      headers: {
        "Content-type": "multipart/form-data"
      },
      needAuth: true,
      data: expense
    })
  );
};

export { addExpense };
