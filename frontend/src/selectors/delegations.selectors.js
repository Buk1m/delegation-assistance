import { delegationStatusCodes } from "../config";
const { PREPARED, NEEDS_WORK, CHECKED, APPROVED } = delegationStatusCodes;

const getDelegations = state => state.delegations.delegations;
const getDelegation = state => state.delegations.delegation;
const getDelegationFetching = state => state.delegations.fetching;
const getRejectedDelegations = state => {
  const rejected = [];
  state.delegations.delegations.forEach(delegation => {
    if (delegation.status === NEEDS_WORK) {
      rejected.push(delegation);
    }
  });
  return rejected;
};
const getWaitingDelegations = state => {
  const waiting = [];
  state.delegations.delegations.forEach(delegation => {
    if (delegation.status === PREPARED || delegation.status === CHECKED || delegation.status === APPROVED) {
      waiting.push(delegation);
    }
  });
  return waiting;
};
const getFormatedDelegation = state => {
  const dateFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  const delegation = state.delegations.delegation;
  return delegation
    ? {
        ...delegation,
        startDate: new Date(delegation.startDate).toLocaleString([], dateFormatOptions),
        endDate: new Date(delegation.endDate).toLocaleString([], dateFormatOptions)
      }
    : {};
};
const getDelegationObject = state => {
  const delegation = state.delegations.delegation;
  return delegation
    ? {
        ...delegation,
        startDate: new Date(delegation.startDate),
        endDate: new Date(delegation.endDate)
      }
    : {};
};

export {
  getDelegations,
  getDelegation,
  getDelegationObject,
  getFormatedDelegation,
  getDelegationFetching,
  getRejectedDelegations,
  getWaitingDelegations
};
