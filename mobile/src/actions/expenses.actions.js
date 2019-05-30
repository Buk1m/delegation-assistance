import { APIService } from "../services/data";
import { FileSystem } from "expo";

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
  const promisesMap = attachments.map(file => {
    return FileSystem.readAsStringAsync(file.uri);
  });

  return Promise.all(promisesMap).then(files => {
    files.map((fp, index) => {
      formData.append("attachments[" + index + "]", new File([fp], "nazwa.png", { type: "image/png" }));
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
  });
};

export { addNewExpense };
