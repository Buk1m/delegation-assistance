import { userRoles } from "./index";

import LoginPage from "../features/LoginPage/";
import HomePage from "../features/HomePage/";
import DelegationsManagePage from "../features/DelegationsManagePage/";
import DelegationsMyPage from "../features/DelegationsMyPage/";
import DelegationsPage from "../features/DelegationsPage/";
import DelegationCreatePage from "../features/DelegationCreatePage/";
import DelegationDetailsPage from "../features/DelegationDetailsPage/";
import ProfilePage from "../features/ProfilePage/";
import ChecklistsPage from "../features/ChecklistsPage/";
import ChecklistCreatePage from "../features/ChecklistCreatePage";
import AddExpensePage from "../features/AddExpense/";

const { accountant, approver, employee, travelmanager } = userRoles;

const routes = [
  { path: "/login", component: LoginPage, public: true },
  { path: "/", component: HomePage },
  {
    path: "/delegations",
    component: DelegationsPage
  },
  {
    path: "/delegations/manage",
    component: DelegationsManagePage,
    canAccess: [travelmanager, approver, accountant]
  },
  {
    path: "/delegations/my",
    component: DelegationsMyPage,
    canAccess: [employee]
  },
  {
    path: "/delegations/create",
    component: DelegationCreatePage,
    canAccess: [employee]
  },
  {
    path: "/delegations/:delegationId",
    component: DelegationDetailsPage
  },
  {
    path: "/delegations/:delegationId/expense",
    component: AddExpensePage
  },
  { path: "/checklist", component: ChecklistsPage },
  {
    path: "/checklist/create",
    component: ChecklistCreatePage,
    canAccess: [travelmanager]
  },
  { path: "/profile", component: ProfilePage }
];

export default routes;
