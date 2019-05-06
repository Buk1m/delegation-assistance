const getDatesAreValid = state => state.delegations.datesAreValid;
const getDelegation = state => state.delegations.delegation;
const getDelegationFetching = state => state.delegations.delegationFetching;
const getDelegations = state => state.delegations.delegations;
const getDelegationsFetching = state => state.delegations.fetching;
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
        startDate: new Date(delegation.startDate).toLocaleDateString([], dateFormatOptions),
        endDate: new Date(delegation.endDate).toLocaleDateString([], dateFormatOptions)
      }
    : {};
};
const getIsSortFilterPanelCollapsed = state => state.delegations.isSortFilterPanelCollapsed;
const getTempDelegations = state => state.delegations.tempDelegations;

export {
  getDatesAreValid,
  getDelegation,
  getDelegationFetching,
  getDelegations,
  getDelegationsFetching,
  getFormatedDelegation,
  getIsSortFilterPanelCollapsed,
  getTempDelegations
};
