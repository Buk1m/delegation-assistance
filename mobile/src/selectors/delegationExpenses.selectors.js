const getDelegationExpensesTotalSize = state => state.delegationExpenses.totalSize;
const getExpensesFetching = state => state.delegationExpenses.fetching;
const getExpenses = state => state.delegationExpenses.data;
const getCurrentPage = state => state.delegationExpenses.currentPage;

export { getDelegationExpensesTotalSize, getExpensesFetching, getExpenses, getCurrentPage };
