import { APIService } from "../services/data";

export const ACTIONS = {
  FETCH_DELEGATION_EXPENSES: "DELEGATION_EXPENSES_FETCH_DELEGATION_EXPENSES",
  CLEAR_EXPENSES: "DELEGATION_EXPENSES_CLEAR_EXPENSES"
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

export { fetchDelegationExpenses, clearExpenses };
