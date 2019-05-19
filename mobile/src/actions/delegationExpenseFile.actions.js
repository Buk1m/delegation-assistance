import { APIService } from "../services/data";
import { WebBrowser } from "expo";

const openFile = (delegationId, expenseId, fileId) => async dispatch => {
  const baseUrl = APIService.baseURL;
  return dispatch(
    await WebBrowser.openBrowserAsync(`${baseUrl}/delegations/${delegationId}/expenses/${expenseId}/files/${fileId}`)
  );
};

export { openFile };
