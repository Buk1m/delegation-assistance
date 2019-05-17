import { userRolesMap } from "../config";

const prepareToken = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
};

const mapRoles = roles => {
  const userRoles = [];
  roles.forEach(role => {
    userRoles.push(userRolesMap[role]);
  });

  return userRoles;
};

export { prepareToken, mapRoles };
