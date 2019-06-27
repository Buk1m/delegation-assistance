import React from "react";
import { View } from "react-native";
import { bool, func, object } from "prop-types";
import RenderMealsRow from "../../../components/renderers/RenderMealsRow/RenderMealsRow.renderer";

import SpinnerWrapper from "./../../../components/SpinnerWrapper/SpinnerWrapper.component";

const DelegationMeals = props => {
  const {
    copyMeals,
    isDisabledPlus,
    isDisabledMinus,
    handleChangeMealsAmount,
    handleOnChangeTyping,
    handleOnBlurTyping,
    isDisableInput,
    fetchingMeals,
    fetching
  } = props;
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <RenderMealsRow
          title="Breakfasts"
          fetching={fetching}
          mealAmount={copyMeals.breakfasts}
          isDisabledPlus={isDisabledPlus}
          isDisabledMinus={isDisabledMinus}
          handleChangeMealsAmount={handleChangeMealsAmount}
          handleOnChangeTyping={handleOnChangeTyping}
          handleOnBlurTyping={handleOnBlurTyping}
          isDisableInput={isDisableInput}
        />
        <RenderMealsRow
          title="Lunches"
          fetching={fetching}
          mealAmount={copyMeals.lunches}
          isDisabledPlus={isDisabledPlus}
          isDisabledMinus={isDisabledMinus}
          handleChangeMealsAmount={handleChangeMealsAmount}
          handleOnChangeTyping={handleOnChangeTyping}
          handleOnBlurTyping={handleOnBlurTyping}
          isDisableInput={isDisableInput}
        />
        <RenderMealsRow
          title="Dinners"
          fetching={fetching}
          mealAmount={copyMeals.dinners}
          isDisabledPlus={isDisabledPlus}
          isDisabledMinus={isDisabledMinus}
          handleChangeMealsAmount={handleChangeMealsAmount}
          handleOnChangeTyping={handleOnChangeTyping}
          handleOnBlurTyping={handleOnBlurTyping}
          isDisableInput={isDisableInput}
        />
      </View>
      <SpinnerWrapper spin={fetchingMeals} />
    </View>
  );
};

DelegationMeals.propTypes = {
  copyMeals: object,
  fetching: bool,
  fetchingMeals: bool,
  handleChangeMealsAmount: func,
  handleOnBlurTyping: func,
  handleOnChangeTyping: func,
  isDisableInput: func,
  isDisabledMinus: func,
  isDisabledPlus: func
};

export default DelegationMeals;
