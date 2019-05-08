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

const formatISODate = date => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
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
