import { userRoles } from "./index";

const { accountant, approver, employee, travelmanager } = userRoles;

const navigationItems = [
  {
    text: "checklist",
    subItems: [
      { to: "/checklist/global-template", text: "global template", canAccess: [travelmanager] },
      { to: "/checklist", text: "all checklists", canAccess: [accountant, approver, employee, travelmanager] }
    ]
  },
  {
    text: "delegations",
    subItems: [
      { to: "/delegations/create", text: "create", canAccess: [employee] },
      { to: "/delegations/my", text: "my delegations", canAccess: [employee] },
      { to: "/delegations/manage", text: "manage delegations", canAccess: [accountant, approver, travelmanager] }
    ]
  }
];

export default navigationItems;
