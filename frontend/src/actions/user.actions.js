import { APIService } from "../services/data";

export const ACTIONS = {
  LOGIN_USER: "USER_LOGIN_USER",
  LOGOUT_USER: "USER_LOGOUT_USER"
};

const loginUser = (login, password) => dispatch => {
  return dispatch(
    APIService.post(ACTIONS.LOGIN_USER, {
      url: "/auth",
      needAuth: false,
      headers: {
        "Content-type": "application/json"
      },
      data: {
        login: login,
        password: password
      }
    })
  );
};

const logoutUser = () => dispatch => {
  return dispatch({
    type: ACTIONS.LOGOUT_USER
  });
};

export { loginUser, logoutUser };
