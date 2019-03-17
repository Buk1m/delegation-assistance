import React, { Component, Fragment } from "react";
import { object } from "prop-types";
import { withRouter } from "next/router";

import { userRoles } from "../../config";
import { getRoleActive } from "../../selectors/user.selectors";

class Router extends Component {
  static propTypes = {
    children: object,
    store: object,
    router: object
  };

  Redirect = (userRole, link) => {
    // TODO Implement switch case to redirect if is not logged in but want to go directly to page
    return false;
  };

  render() {
    return this.Redirect(getRoleActive(this.props.store.getState()), window.location.href) ? (
      <div />
    ) : (
      <Fragment>{this.props.children}</Fragment>
    );
  }
}

export default withRouter(Router);
