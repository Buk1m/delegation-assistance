import React from "react";
import { bool, func, number, string } from "prop-types";

import Button from "./../../../../components/Button/Button.component";
import Spinner from "../../../../components/Spinner/Spinner.component";

import "./DelegationChangeMealsAmount.module.scss";
import spinnerStyle from "../../../../components/Spinner/Spinner.module.scss";

const isDisabledPlus = (mealsAmount, maxMealsAmount) => {
  return mealsAmount >= maxMealsAmount;
};

const isDisabledMinus = mealsAmount => {
  return mealsAmount <= 0;
};

const DelegationChangeMealsAmount = ({
  mealType,
  mealAmount,
  onChange,
  onChangeTyping,
  maxMealsAmount,
  fetchingMeals,
  editingMeal
}) => {
  return (
    <form>
      <fieldset disabled={fetchingMeals}>
        <div>
          <Button
            className="decrement"
            text="-"
            onClick={e => onChange(mealType, "-")}
            disabled={isDisabledMinus(mealAmount)}
          />
          <input
            type="number"
            value={Number(mealAmount).toString()}
            id="meal_input"
            onChange={e => onChangeTyping(e, mealType)}
          />
          <Button
            className="increment"
            text="+"
            onClick={e => onChange(mealType, "+")}
            disabled={isDisabledPlus(mealAmount, maxMealsAmount)}
          />
          {fetchingMeals && editingMeal === mealType ? <Spinner className={spinnerStyle["spinner-inline"]} /> : null}
        </div>
      </fieldset>
    </form>
  );
};

DelegationChangeMealsAmount.propTypes = {
  editingMeal: string,
  fetchingMeals: bool,
  maxMealsAmount: number,
  mealAmount: number,
  mealType: string.isRequired,
  onChange: func,
  onChangeTyping: func
};

export default DelegationChangeMealsAmount;
