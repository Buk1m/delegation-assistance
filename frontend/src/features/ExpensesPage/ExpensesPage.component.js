import React, { Fragment } from "react";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";

const ExpensesPage = props => {
  return (
    <LayoutMain title="Expenses">
      <Fragment>
        <div>Expenses page</div>
        <a href="/">Back to home</a>
      </Fragment>
    </LayoutMain>
  );
};

export default ExpensesPage;
