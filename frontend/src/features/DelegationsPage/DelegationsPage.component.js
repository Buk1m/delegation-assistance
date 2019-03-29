import React, { Fragment } from "react";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";

const DelegationsPage = props => {
  return (
    <LayoutMain title="Delegations">
      <Fragment>
        <div>Delegations page</div>
        <a href="/">Back to home</a>
      </Fragment>
    </LayoutMain>
  );
};

export default DelegationsPage;
