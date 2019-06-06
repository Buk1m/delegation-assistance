import { APIService } from "../services/data";

export const ACTIONS = {
  GET_REPORT: "REPORT_GET_REPORT",
  DOWNLOAD_REPORT: "REPORT_DOWNLOAD_REPORT"
};

const fetchReport = delegationId => dispatch =>
  dispatch(
    APIService.get(ACTIONS.GET_REPORT, {
      url: `/delegations/${delegationId}/report-preview`,
      needAuth: true
    })
  );

const downloadReport = (delegationId, reportType) => dispatch =>
  dispatch(
    APIService.get(ACTIONS.DOWNLOAD_REPORT, {
      url: `/delegations/${delegationId}/report?reportType=${reportType}`,
      needAuth: true,
      responseType: "blob"
    })
  );

export { fetchReport, downloadReport };
