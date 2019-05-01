const getDelegationId = state => state.delegationChecklist.delegationId;
const getActivities = state => state.delegationChecklist.activities;
const getActivitiesFetching = state => state.delegationChecklist.fetching;

export { getDelegationId, getActivities, getActivitiesFetching };
