import React, { Fragment } from "react";
import { object, bool, func, string } from "prop-types";

import Row from "../../../../components/Row/Row.component";
import Button from "../../../../components/Button/Button.component";
import DelegationChangeMealsAmount from "./../DelegationChangeMealsAmount/DelegationChangeMealsAmount.container.js";
import { delegationStatuses } from "../../../../config";

const DelegationDetails = props => {
  const {
    delegation: {
      delegationId,
      destinationCountry,
      destinationLocation,
      status,
      startDate,
      endDate,
      delegationObjective,
      diet
    },
    canEditDelegation,
    fetching,
    changeEditingMeal,
    editingMealLabel,
    edit = true
  } = props;
  return (
    <Fragment>
      {edit ? (
        <div className="edit-btn">
          <Button text="Edit" disabled={!canEditDelegation} />
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
          <span className={`delegation-status ${status ? status.toLowerCase() : null}`}>
            {delegationStatuses[status]}
          </span>
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
        <Row loading={fetching} label="Breakfasts:">
          <DelegationChangeMealsAmount
            mealType="breakfasts"
            delegationId={delegationId}
            changeEditingMeal={changeEditingMeal}
            editingMealLabel={editingMealLabel}
            canEditDelegation={canEditDelegation}
          />
        </Row>
        <Row loading={fetching} label="Lunches:">
          <DelegationChangeMealsAmount
            mealType="lunches"
            delegationId={delegationId}
            changeEditingMeal={changeEditingMeal}
            editingMealLabel={editingMealLabel}
            canEditDelegation={canEditDelegation}
          />
        </Row>
        <Row loading={fetching} label="Dinners:">
          <DelegationChangeMealsAmount
            mealType="dinners"
            delegationId={delegationId}
            changeEditingMeal={changeEditingMeal}
            editingMealLabel={editingMealLabel}
            canEditDelegation={canEditDelegation}
          />
        </Row>
      </div>
    </Fragment>
  );
};

DelegationDetails.propTypes = {
  canEditDelegation: bool,
  changeEditingMeal: func,
  delegation: object,
  edit: bool,
  editingMealLabel: string,
  fetching: bool
};

export default DelegationDetails;
