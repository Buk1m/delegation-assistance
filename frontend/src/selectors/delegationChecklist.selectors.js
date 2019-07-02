const getDelegationId = state => state.delegationChecklist.delegationId;
const getDelegationChecklist = state => state.delegationChecklist.delegationChecklist;
const getDelegationChecklistFetching = state => state.delegationChecklist.fetching;
const getDelegationChecklistUpdating = state => state.delegationChecklist.updating;

export { getDelegationId, getDelegationChecklist, getDelegationChecklistFetching, getDelegationChecklistUpdating };
