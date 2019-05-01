import React, { Fragment } from "react";
import { object, bool } from "prop-types";

import Row from "../Row/Row.component";
import Button from "../Button/Button.component";

const DelegationDetails = props => {
  const { delegation, fetching, edit = true } = props;
  return (
    <Fragment>
      {edit ? (
        <div className="edit-btn">
          <Button text="Edit" />
        </div>
      ) : (
        ""
      )}
      <div className="display-container pl-2 pr-2">
        <Row loading={fetching} label="Country:" content={delegation.destinationCountry} />
        <Row loading={fetching} label="Location:" content={delegation.destinationLocation} />
        <Row loading={fetching} label="Status:" content={delegation.status} />
        <Row loading={fetching} label="Date from:" content={delegation.startDate} />
        <Row loading={fetching} label="Date to:" content={delegation.endDate} />
        <Row loading={fetching} label="Objective:" content={delegation.delegationObjective} />
        <Row
          loading={fetching}
          label="Diet:"
          content={delegation.diet && delegation.diet.perDiem + " " + delegation.diet.currency}
        />
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
