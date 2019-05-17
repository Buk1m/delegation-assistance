import React, { Fragment } from "react";
import { object, bool } from "prop-types";

import Row from "../../../../components/Row/Row.component";
import Button from "../../../../components/Button/Button.component";

const DelegationDetails = props => {
  const {
    delegation: { destinationCountry, destinationLocation, status, startDate, endDate, delegationObjective, diet },
    fetching,
    edit = true
  } = props;
  return (
    <Fragment>
      {edit ? (
        <div className="edit-btn">
          <Button text="Edit" />
        </div>
      ) : null}
      <div className="display-container pl-2 pr-2">
        <Row loading={fetching} label="Country:">
          {destinationCountry}
        </Row>
        <Row loading={fetching} label="Location:">
          {destinationLocation}
        </Row>
        <Row loading={fetching} label="Status:">
          {status}
        </Row>
        <Row loading={fetching} label="Date from:">
          {startDate}
        </Row>
        <Row loading={fetching} label="Date to:">
          {endDate}
        </Row>
        <Row loading={fetching} label="Objective:">
          {delegationObjective}
        </Row>
        <Row loading={fetching} label="Diet:">
          {diet && diet.perDiem + " " + diet.currency}
        </Row>
      </div>
    </Fragment>
  );
};

DelegationDetails.propTypes = {
  delegation: object,
  edit: bool,
  fetching: bool
};

export default DelegationDetails;
