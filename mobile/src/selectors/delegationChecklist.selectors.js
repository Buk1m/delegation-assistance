const getActivities = state => state.delegationChecklist.activities;
const getActivitiesFetching = state => state.delegationChecklist.fetching;
const getDelegationId = state => state.delegationChecklist.delegationId;

export { getActivities, getActivitiesFetching, getDelegationId };
