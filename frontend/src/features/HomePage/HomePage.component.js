import React from "react";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.component";

const HomePage = props => {
  return (
    <LayoutMain>
      <div>Home page</div>
      <a href="/login">Login to app</a>
    </LayoutMain>
  );
};

export default HomePage;
