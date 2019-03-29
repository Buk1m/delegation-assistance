const sidebarNavigation = [
  { to: "/expenses", text: "Expenses" },
  {
    to: "/delegations",
    text: "Delegations",
    subitems: [{ to: "/delegations/create", text: "Create" }]
  },
  { to: "/profile", text: "Profile" }
];

export { sidebarNavigation };
