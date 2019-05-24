import { APIService } from "../services/data";

export const ACTIONS = {
  ADD_EXPENSE: "EXPENSES_ADD_EXPENSE"
};

const addNewExpense = (expense, { attachments }, payType, delegationId) => dispatch => {
  const formData = new FormData();
  formData.append("expenseName", expense.expenseName);
  formData.append("expenseValue", parseInt(expense.expenseValue, 10));
  formData.append("expenseDate", expense.expenseDate);
  formData.append("expenseCurrency", expense.expenseCurrency);
  formData.append("exchangeRate", expense.exchangeRate);
  formData.append("paymentType", payType);
  attachments.map((file, index) => {
    formData.append("attachments[" + index + "]", file);
  });

  return dispatch(
    APIService.post(ACTIONS.ADD_EXPENSE, {
      url: `/delegations/${delegationId}/expenses`,
      headers: {
        "Content-type": "multipart/form-data"
      },
      needAuth: true,
      data: formData
    })
  );
};

export { addNewExpense };
