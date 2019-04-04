import { userRoles } from "./index";

const sidebarNavigation = [
  {
    to: "/checklist",
    text: "Checklist",
    subitems: [{ to: "/checklist/create", text: "Create", for: [userRoles.travelmanager] }]
  },
  {
    to: "/delegations",
    text: "Delegations",
    subitems: [{ to: "/delegations/create", text: "Create" }]
  },
  { to: "/profile", text: "Profile" }
];

export { sidebarNavigation };
