import React, { Fragment } from "react";
import { object, bool } from "prop-types";

import Row from "../../../../components/Row/Row.component";
import Button from "../../../../components/Button/Button.component";

const DelegationDetails = props => {
  const { delegation, fetching, edit = true } = props;
  return (
    <Fragment>
      {edit ? (
        <div className="edit-btn">
          <Button text="Edit" />
        </div>
      ) : null}
      <div className="display-container pl-2 pr-2">
        <Row loading={fetching} label="Country:">
          {delegation.destinationCountry}
        </Row>
        <Row loading={fetching} label="Location:">
          {delegation.destinationLocation}
        </Row>
        <Row loading={fetching} label="Status:">
          {delegation.status}
        </Row>
        <Row loading={fetching} label="Date from:">
          {delegation.startDate}
        </Row>
        <Row loading={fetching} label="Date to:">
          {delegation.endDate}
        </Row>
        <Row loading={fetching} label="Objective:">
          {delegation.delegationObjective}
        </Row>
        <Row loading={fetching} label="Diet:">
          {delegation.diet && delegation.diet.perDiem + " " + delegation.diet.currency}
        </Row>
      </div>
    </Fragment>
  );
};

DelegationDetails.propTypes = {
  delegation: object,
  fetching: bool,
  edit: bool
};

export default DelegationDetails;
