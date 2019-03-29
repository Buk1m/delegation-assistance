import LoginPageContainer from "../features/LoginPage/LoginPage.container";
import HomePageContainer from "../features/HomePage/HomePage.container";
import DelegationsPageContainer from "../features/DelegationsPage/DelegationsPage.container";
import CreateDelegationPageContainer from "../features/CreateDelegationPage/CreateDelegationPage.container";
import ExpensesPageContainer from "../features/ExpensesPage/ExpensesPage.container";
import ProfilePageContainer from "../features/ProfilePage/ProfilePage.container";

const routes = [
  { path: "/", component: HomePageContainer, exact: true },
  { path: "/login", component: LoginPageContainer, exact: true, public: true },
  { path: "/delegations", component: DelegationsPageContainer, exact: true },
  { path: "/delegations/create", component: CreateDelegationPageContainer, exact: true },
  { path: "/expenses", component: ExpensesPageContainer, exact: true },
  { path: "/profile", component: ProfilePageContainer, exact: true }
];

export default routes;
