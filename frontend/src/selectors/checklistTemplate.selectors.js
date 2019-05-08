import { get } from "lodash";

const getGlobalTemplate = state => get(state, "checklistTemplate.globalTemplate", []);
const getGlobalTemplateFetching = state => get(state, "checklistTemplate.fetching", false);

export { getGlobalTemplate, getGlobalTemplateFetching };
