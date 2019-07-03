import { APIService } from "../services/data";

export const ACTIONS = {
  FETCH_DELEGATION_EXPENSES: "DELEGATION_EXPENSES_FETCH_DELEGATION_EXPENSES",
  CLEAR_EXPENSES: "DELEGATION_EXPENSES_CLEAR_EXPENSES",
  ADD_EXPENSE: "EXPENSES_ADD_EXPENSE"
};

const fetchDelegationExpenses = (delegationId, currentPage, expensesPerPage, sortBy) => dispatch => {
  return dispatch(
    APIService.get(ACTIONS.FETCH_DELEGATION_EXPENSES, {
      url: `/delegations/${delegationId}/expenses?page=${currentPage}&size=${expensesPerPage}&sort=${sortBy}`,
      headers: {
        "Content-type": "application/json"
      },
      needAuth: true
    })
  );
};

const clearExpenses = () => dispatch => {
  return dispatch({
    type: ACTIONS.CLEAR_EXPENSES
  });
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
    formData.append(`attachments[${index}]`, file);
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

export { fetchDelegationExpenses, clearExpenses, addNewExpense };
