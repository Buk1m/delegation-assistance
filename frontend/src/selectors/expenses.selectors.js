import { get } from "lodash";

const getExpenses = state => get(state, "expenses.expenses", []);
const getExpensesTotalSize = state => get(state, "expenses.totalSize", 0);
const getExpensesFetching = state => get(state, "expenses.fetching", false);

export { getExpenses, getExpensesTotalSize, getExpensesFetching };
