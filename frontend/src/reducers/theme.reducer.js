import { environments } from "../config";
import { ACTIONS } from "../actions/theme.actions";

const initialState = {
  theme: environments.DEFAULT_THEME
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.CHANGE_THEME}`:
      return {
        ...state,
        theme: action.payload.theme.toLowerCase()
      };
    default:
      return state;
  }
};

export default themeReducer;
