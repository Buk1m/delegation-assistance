import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_EXPENSE: "EXPENSES_ADD_EXPENSE"
};

const addNewExpense = (
  expense,
  { attachments },
  payType,
  delegationId
) => dispatch => {
  const data = {
    attachments: attachments,
    paymentType: payType
  };

  return dispatch(
    APIService.post(ACTIONS.ADD_EXPENSE, {
      url: `/delegations/${delegationId}/expenses`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true,
      data: { expense, data }
    })
  );
};

export { addNewExpense };
