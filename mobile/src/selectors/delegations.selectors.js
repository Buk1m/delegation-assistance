const getDelegations = state => state.delegations.delegations;
const getTempDelegations = state => state.delegations.tempDelegations;
const getDatesAreValid = state => state.delegations.datesAreValid;
const getIsSortFilterPanelCollapsed = state => state.delegations.isSortFilterPanelCollapsed;

export {
  getDelegations,
  getTempDelegations,
  getDatesAreValid,
  getIsSortFilterPanelCollapsed
};
