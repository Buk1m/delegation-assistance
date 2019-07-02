import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object, number } from "prop-types";

import FlightModalForm from "./FlightModalForm.component";
import { addFlight } from "../../../../../actions/flights.actions";
import handleFormErrors from "../../../../../helpers/handlers/errorHandler";

export class FlightModalFormContainer extends Component {
  static propTypes = {
    addFlight: func,
    delegationId: number,
    initialValues: object
  };

  _handleSubmit = values => {
    return this.props.addFlight(this.props.delegationId, values).catch(err => {
      handleFormErrors(err);
    });
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
