import React, { Component } from "react";
import { connect } from "react-redux";
import { func, object, number } from "prop-types";

import AccommodationModalForm from "./AccommodationModalForm.component";
import { addAccommodation } from "../../../../../actions/accommodations.actions";

export class AccommodationModalFormContainer extends Component {
  static propTypes = {
    addAccommodation: func,
    delegationId: number,
    initialValues: object
  };

  _handleSubmit = values => {
    return this.props.addAccommodation(this.props.delegationId, values);
  };

  render() {
    return <AccommodationModalForm onSubmit={this._handleSubmit} initialValues={this.props.initialValues} />;
  }
}

const mapDispatchToProps = {
  addAccommodation
};

export default connect(
  null,
  mapDispatchToProps
)(AccommodationModalFormContainer);
