import React from "react";
import { bool, func, number, string } from "prop-types";

import Button from "./../../../../components/Button/Button.component";
import Spinner from "../../../../components/Spinner/Spinner.component";

import "./DelegationChangeMealsAmount.module.scss";
import spinnerStyle from "../../../../components/Spinner/Spinner.module.scss";

const DelegationChangeMealsAmount = ({
  mealAmount,
  mealType,
  fetchingMeals,
  editingMeal,
  onClick,
  handleOnChangeTyping,
  handleOnBlurTyping,
  isDisabledPlus,
  isDisabledMinus
}) => {
  return (
    <form>
      <fieldset disabled={fetchingMeals}>
        <div>
          <Button
            className="decrement"
            text="-"
            onClick={e => onClick(mealType, "-")}
            disabled={isDisabledMinus(mealAmount)}
          />
          <input
            type="number"
            value={Number(mealAmount).toString()}
            id="meal_input"
            onBlur={e => handleOnBlurTyping(e, mealType)}
            onChange={e => handleOnChangeTyping(e, mealType)}
          />
          <Button
            className="increment"
            text="+"
            onClick={e => onClick(mealType, "+")}
            disabled={isDisabledPlus(mealAmount)}
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
  handleOnBlurTyping: func,
  handleOnChangeTyping: func,
  isDisabledMinus: func,
  isDisabledPlus: func,
  mealAmount: number,
  mealType: string.isRequired,
  onClick: func
};

export default DelegationChangeMealsAmount;
