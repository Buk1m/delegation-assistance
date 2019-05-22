import get from "lodash/get";

const getGlobalTemplate = state => get(state, "checklistTemplate.globalTemplate", []);
const getGlobalTemplateFetching = state => get(state, "checklistTemplate.fetching", false);

export { getGlobalTemplate, getGlobalTemplateFetching };
