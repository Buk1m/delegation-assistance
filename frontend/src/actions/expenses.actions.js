import { APIService } from "../services/data";
import { formatISODateToDelegationDate } from "../helpers/formatters";

export const ACTIONS = {
  ADD_EXPENSE: "EXPENSES_ADD_EXPENSE",
  GET_EXPENSES: "EXPENSES_GET_EXPENSES",
  DOWNLOAD_EXPENSE_FILE: "EXPENSES_DOWNLOAD_EXPENSE_FILE"
};

const addExpense = (
  delegationId,
  { expenseName, expenseValue, expenseDate, paymentType, expenseCurrency, attachments }
) => dispatch => {
  const formData = new FormData();
  formData.append("expenseName", expenseName);
  formData.append("expenseValue", expenseValue);
  formData.append("expenseCurrency", expenseCurrency.value);
  formData.append("expenseDate", formatISODateToDelegationDate(expenseDate));
  formData.append("paymentType", paymentType.value);
  attachments.map((file, index) => formData.append("attachments[" + index + "]", file));

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

const fetchExpenses = (
  delegationId,
  { page = 1, sizePerPage = 10, sortOrder = "desc", sortField = "id" }
) => dispatch =>
  dispatch(
    APIService.get(ACTIONS.GET_EXPENSES, {
      url: `/delegations/${delegationId}/expenses?page=${page}&size=${sizePerPage}&sort=${sortField}.${sortOrder}`,
      needAuth: true
    })
  );

const downloadExpenseFile = (delegationId, expenseId, { fileId, fileName }) => dispatch =>
  dispatch(
    APIService.get(ACTIONS.DOWNLOAD_EXPENSE_FILE, {
      url: `/delegations/${delegationId}/expenses/${expenseId}/files/${fileId}`,
      headers: {
        "Content-Disposition": `attachment; filename=${fileName}`
      },
      needAuth: true,
      responseType: "blob"
    })
  );

export { addExpense, fetchExpenses, downloadExpenseFile };
