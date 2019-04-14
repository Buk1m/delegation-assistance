import React, { Component } from "react";
import { connect } from "react-redux";
import { bool } from "prop-types";

import DelegationsPage from "./DelegationsPage.component";
import { isUserTravelmanager, isUserEmployee } from "../../selectors/user.selectors";

class DelegationsPageContainer extends Component {
  static propTypes = {
    isManager: bool,
    isEmployee: bool
  };

  render() {
    return <DelegationsPage isManager={this.props.isManager} isEmployee={this.props.isEmployee} />;
  }
}

const mapStateToProps = state => ({
  isManager: isUserTravelmanager(state),
  isEmployee: isUserEmployee(state)
});

export default connect(
  mapStateToProps,
  null
)(DelegationsPageContainer);
