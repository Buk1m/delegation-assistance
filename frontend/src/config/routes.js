import LoginPage from "../features/LoginPage/";
import HomePage from "../features/HomePage/";
import DelegationsPage from "../features/DelegationsPage/";
import CreateDelegationPage from "../features/CreateDelegationPage/";
import ExpensesPage from "../features/ExpensesPage/";
import DelegationChecklistPage from "../features/DelegationChecklistPage";
import ProfilePage from "../features/ProfilePage/";
import ChecklistsPage from "../features/ChecklistsPage/";
import CreateTaskPage from "../features/CreateTaskPage/";
import AddExpensePage from "../features/AddExpense/";

const routes = [
  { path: "/", component: HomePage, exact: true },
  { path: "/login", component: LoginPage, exact: true, public: true },
  { path: "/delegations", component: DelegationsPage, exact: true },
  { path: "/delegations/create", component: CreateDelegationPage, exact: true },
  { path: "/delegations/:delegationId/expense", component: AddExpensePage, exact: true },
  { path: "/delegations/:delegationId/checklist", component: DelegationChecklistPage, exact: true },
  { path: "/expenses", component: ExpensesPage, exact: true },
  { path: "/checklist", component: ChecklistsPage, exact: true },
  { path: "/checklist/create", component: CreateTaskPage, exact: true },
  { path: "/profile", component: ProfilePage, exact: true }
];

export default routes;
