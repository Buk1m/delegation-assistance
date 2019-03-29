import React, { Fragment } from "react";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";

const ProfilePage = props => {
  return (
    <LayoutMain title="Profile">
      <Fragment>
        <div>Profile page</div>
        <a href="/">Back to home</a>
      </Fragment>
    </LayoutMain>
  );
};

export default ProfilePage;
