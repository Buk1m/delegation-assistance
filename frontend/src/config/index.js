import { filePdfO, fileExcelO } from "react-icons-kit/fa";
import { formatFilenameDate } from "../helpers/formatters";

const environments = {
  NODE_ENV: process.env.NODE_ENV || "development",
  LOGS: process.env.REACT_APP_LOGS || "none",
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
  DEFAULT_THEME: "idemia"
};

const themes = ["Dark", "Idemia", "Contrast"];

const delegationStatusCodes = {
  CREATED: "CREATED",
  PREPARED: "PREPARED",
  NEEDS_WORK: "NEEDS_WORK",
  CHECKED: "CHECKED",
  APPROVED: "APPROVED",
  FINALIZED: "FINALIZED"
};

const delegationStatuses = {
  [delegationStatusCodes.CREATED]: "Created",
  [delegationStatusCodes.NEEDS_WORK]: "Needs work",
  [delegationStatusCodes.PREPARED]: "Prepared",
  [delegationStatusCodes.CHECKED]: "Confirmed",
  [delegationStatusCodes.APPROVED]: "Approved",
  [delegationStatusCodes.FINALIZED]: "Finalized"
};

const NO_NETWORK_TOAST_ID = "no-network-toast";

const reportTypes = [
  {
    type: "PDF",
    icon: filePdfO,
    iconSize: 30,
    filename: delegationId => `Report_${delegationId}_${formatFilenameDate(Date.now())}.pdf`,
    contentType: "application/pdf"
  },
  {
    type: "XLSX",
    icon: fileExcelO,
    iconSize: 30,
    filename: delegationId => `Report_${delegationId}_${formatFilenameDate(Date.now())}.xlsx`,
    contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }
];

const paymentTypes = [{ label: "Cash", value: "CASH" }, { label: "Credit card", value: "CREDIT_CARD" }];

export {
  delegationStatuses,
  delegationStatusCodes,
  environments,
  NO_NETWORK_TOAST_ID,
  paymentTypes,
  reportTypes,
  themes
};
