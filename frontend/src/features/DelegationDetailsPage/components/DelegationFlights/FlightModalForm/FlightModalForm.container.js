import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object, string } from "prop-types";

import FlightModalForm from "./FlightModalForm.component";
import { addFlight } from "../../../../../actions/flights.actions";

export class FlightModalFormContainer extends Component {
  static propTypes = {
    addFlight: func,
    delegationId: string,
    initialValues: object
  };

  _handleSubmit = values => {
    return this.props.addFlight(this.props.delegationId, values);
  };

  render() {
    return <FlightModalForm onSubmit={this._handleSubmit} initialValues={this.props.initialValues} />;
  }
}

const mapDispatchToProps = {
  addFlight
};

export default connect(
  null,
  mapDispatchToProps
)(FlightModalFormContainer);
