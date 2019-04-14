import { userRoles } from "./index";

const { accountant, approver, employee, travelmanager } = userRoles;

const sidebarNavigation = [
  {
    to: "/checklist",
    text: "Checklist",
    subitems: [
      {
        to: "/checklist/create",
        text: "Create",
        canAccess: [travelmanager]
      }
    ]
  },
  {
    to: "/delegations",
    text: "Delegations",
    subitems: [
      { to: "/delegations/create", text: "Create", canAccess: [employee] },
      { to: "/delegations/my", text: "My delegations", canAccess: [employee] },
      {
        to: "/delegations/manage",
        text: "Manage delegations",
        canAccess: [accountant, approver, travelmanager]
      }
    ]
  },
  { to: "/profile", text: "Profile" }
];

export { sidebarNavigation };
