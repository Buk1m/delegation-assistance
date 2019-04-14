import { userRolesMap } from "../config";

const prepareToken = token => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(window.atob(base64));
};

const mapRoles = roles => {
  let userRoles = [];
  roles.forEach(role => {
    userRoles.push(userRolesMap[role]);
  });

  return userRoles;
};

const formatISODate = date => {
  let formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(date));
};

export { prepareToken, mapRoles, formatISODate };
