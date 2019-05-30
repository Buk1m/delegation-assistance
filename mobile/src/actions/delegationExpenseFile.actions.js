import { APIService } from "../services/data";
import { WebBrowser } from "expo";

export const ACTIONS = {
  FETCH_DELEGATION_EXPENSE_FILE: "EXPENSE_FETCH_DELEGATION_EXPENSE_FILE"
};

const openFile = (delegationId, expenseId, fileId) => async dispatch => 
  // const downloadExpenseFile = (delegationId, expenseId, { fileId, fileName }) => dispatch =>
  dispatch(
    APIService.get(ACTIONS.FETCH_DELEGATION_EXPENSE_FILE, {
      url: `/delegations/${delegationId}/expenses/${expenseId}/files/${fileId}`,
      headers: {
        "Content-Disposition": `attachment; filename=${"xD.jpg"}`
      },
      needAuth: true,
      responseType: "blob"
    })
  );
  // const baseUrl = APIService.baseURL;
  // return dispatch(
  //   await WebBrowser.openBrowserAsync(`${baseUrl}/delegations/${delegationId}/expenses/${expenseId}/files/${fileId}`)
  // );


export { openFile };
