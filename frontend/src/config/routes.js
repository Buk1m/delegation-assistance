import { userRoles } from "./index";

import DelegationsPage from "../features/DelegationsPage/";
import LoginPage from "../features/LoginPage/";
import DelegationCreatePage from "../features/DelegationCreatePage/";
import DelegationsManagePage from "../features/DelegationsManagePage/";
import DelegationsMyPage from "../features/DelegationsMyPage/";
import DelegationDetailsPage from "../features/DelegationDetailsPage/";
import ReportPage from "../features/ReportPage";
import ChecklistsPage from "../features/ChecklistsPage/";
import ChecklistGlobalTemplatePage from "../features/ChecklistGlobalTemplatePage";
import ProfilePage from "../features/ProfilePage/";
import SettingsPage from "../features/SettingsPage/";
import ErrorPage from "../features/_ErrorPage/ErrorPage.component";

const { accountant, approver, employee, travelmanager } = userRoles;

const routes = [
  { path: "/", component: DelegationsPage },
  { path: "/login", component: LoginPage, public: true },
  { path: "/delegations/create", component: DelegationCreatePage, canAccess: [employee] },
  { path: "/delegations/manage", component: DelegationsManagePage, canAccess: [travelmanager, approver, accountant] },
  { path: "/delegations/my", component: DelegationsMyPage, canAccess: [employee] },
  { path: "/delegations/:delegationId", component: DelegationDetailsPage },
  { path: "/delegations/:delegationId/report", component: ReportPage },
  { path: "/checklist", component: ChecklistsPage },
  { path: "/checklist/global-template", component: ChecklistGlobalTemplatePage, canAccess: [travelmanager] },
  { path: "/profile", component: ProfilePage },
  { path: "/profile/settings", component: SettingsPage },
  { path: "*", component: ErrorPage }
];

export default routes;
