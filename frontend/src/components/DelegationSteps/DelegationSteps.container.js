import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getDelegation } from "../../selectors/delegations.selectors";
import { object } from "prop-types";
import DelegationSteps from "./DelegationSteps.component";

class DelegationStepsContainer extends PureComponent {
  static propTypes = {
    delegation: object
  };
  render() {
    return <DelegationSteps status={this.props.delegation.status} />;
  }
}

const mapStateToProps = state => ({
  delegation: getDelegation(state)
});

export default connect(
  mapStateToProps,
  null
)(DelegationStepsContainer);
