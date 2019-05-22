import React, { Fragment } from "react";
import { object, bool, func, number, string } from "prop-types";

import Row from "../../../../components/Row/Row.component";
import Button from "../../../../components/Button/Button.component";
import DelegationChangeMealsAmount from "./../DelegationChangeMealsAmount/DelegationChangeMealsAmount.component.js";

const DelegationDetails = props => {
  const {
    delegation: {
      destinationCountry,
      destinationLocation,
      status,
      startDate,
      endDate,
      delegationObjective,
      diet,
      meals: { breakfasts, dinners, lunches } = {}
    },
    fetching,
    handleChangeMealsAmount,
    handleChangeMealsAmountTyping,
    maxMealsAmount,
    fetchingMeals,
    editingMeal,
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
        <Row loading={fetching} label="Breakfasts:">
          <DelegationChangeMealsAmount
            mealAmount={breakfasts}
            onChange={handleChangeMealsAmount}
            onChangeTyping={handleChangeMealsAmountTyping}
            mealType="breakfasts"
            maxMealsAmount={maxMealsAmount}
            fetchingMeals={fetchingMeals}
            editingMeal={editingMeal}
          />
        </Row>
        <Row loading={fetching} label="Lunches:">
          <DelegationChangeMealsAmount
            mealAmount={lunches}
            onChange={handleChangeMealsAmount}
            onChangeTyping={handleChangeMealsAmountTyping}
            mealType="lunches"
            maxMealsAmount={maxMealsAmount}
            fetchingMeals={fetchingMeals}
            editingMeal={editingMeal}
          />
        </Row>
        <Row loading={fetching} label="Dinners:">
          <DelegationChangeMealsAmount
            mealAmount={dinners}
            onChange={handleChangeMealsAmount}
            onChangeTyping={handleChangeMealsAmountTyping}
            mealType="dinners"
            maxMealsAmount={maxMealsAmount}
            fetchingMeals={fetchingMeals}
            editingMeal={editingMeal}
          />
        </Row>
      </div>
    </Fragment>
  );
};

DelegationDetails.propTypes = {
  delegation: object,
  edit: bool,
  editingMeal: string,
  fetching: bool,
  fetchingMeals: bool,
  handleChangeMealsAmount: func,
  handleChangeMealsAmountTyping: func,
  maxMealsAmount: number
};

export default DelegationDetails;