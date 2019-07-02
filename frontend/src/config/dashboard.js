import { userRoles } from "./roles";
import { delegationStatusCodes } from "./index";

const { accountant, approver, employee, travelmanager } = userRoles;

const waitingStatusPerRole = [
  {
    title: "Waiting delegations",
    status: [
      delegationStatusCodes.CREATED,
      delegationStatusCodes.PREPARED,
      delegationStatusCodes.CHECKED,
      delegationStatusCodes.APPROVED
    ],
    roles: [employee]
  },
  {
    title: "Waiting for acceptation",
    status: [delegationStatusCodes.PREPARED],
    roles: [travelmanager]
  },
  {
    title: "Waiting for aprovement",
    status: [delegationStatusCodes.CHECKED],
    roles: [approver]
  },
  {
    title: "Waiting for finalization",
    status: [delegationStatusCodes.APPROVED],
    roles: [accountant]
  }
];

export default waitingStatusPerRole;
