import { delegationStatusCodes } from "../config/index";
import { userRoles } from "../config/roles";

const { CREATED, PREPARED, NEEDS_WORK, CHECKED, APPROVED, FINALIZED } = delegationStatusCodes;
const { employee, travelmanager, approver, accountant } = userRoles;

const updateStatusOptions = [
  {
    status: [NEEDS_WORK, CREATED],
    newStatus: PREPARED,
    roles: [employee],
    text: "Send to Manager",
    canEdit: true
  },
  {
    status: [PREPARED],
    newStatus: CHECKED,
    roles: [travelmanager],
    text: "Send to Approver"
  },
  {
    status: [CHECKED],
    newStatus: APPROVED,
    roles: [approver],
    text: "Send to Accountant"
  },
  {
    status: [APPROVED],
    newStatus: FINALIZED,
    roles: [accountant],
    text: "Finalize"
  },
  {
    status: [PREPARED, CHECKED, APPROVED],
    newStatus: NEEDS_WORK,
    roles: [travelmanager, approver, accountant],
    text: "Needs work"
  }
];

const getAvailableOptions = (status, roleActive) => {
  const availableOptions = [];
  updateStatusOptions.forEach(option => {
    if (option.roles.includes(roleActive) && option.status.includes(status)) {
      availableOptions.push(option);
    }
  });

  return availableOptions;
};

const canEditDelegation = (status, roleActive) => {
  const availableOptions = getAvailableOptions(status, roleActive);
  return availableOptions.some(ao => ao.canEdit) > 0;
};

export { canEditDelegation, getAvailableOptions, updateStatusOptions };
