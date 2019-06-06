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

const downloadFileFromResponse = (response, filename) => {
  const blob = new Blob([response.data]);
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export { prepareToken, mapRoles, downloadFileFromResponse };
