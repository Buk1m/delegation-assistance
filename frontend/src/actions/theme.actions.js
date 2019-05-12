export const ACTIONS = {
  CHANGE_THEME: "THEME_CHANGE_THEME"
};

const changeTheme = theme => dispatch =>
  dispatch({
    type: ACTIONS.CHANGE_THEME,
    payload: {
      theme: theme
    }
  });

export { changeTheme };
