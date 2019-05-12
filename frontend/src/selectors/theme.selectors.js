import { environments } from "../config";

import { get } from "lodash";

const getTheme = state => get(state, "theme.theme", environments.DEFAULT_THEME);

export { getTheme };
