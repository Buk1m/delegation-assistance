import React from "react";
import { View, Text, TextInput } from "react-native";
import { bool, func, string, number } from "prop-types";

import SpinnerWrapper from "../../SpinnerWrapper/SpinnerWrapper.component";
import styles from "./RenderMealsRow.module.scss";
import Button from "./../../Button/Button.component";

const RenderMealsRow = ({
  title,
  fetching,
  mealAmount,
  isDisabledPlus,
  isDisabledMinus,
  handleChangeMealsAmount,
  handleOnBlurTyping,
  isDisableInput,
  handleOnChangeTyping
}) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <SpinnerWrapper spin={fetching}>
        <View style={styles.row}>
          <Button
            title="-"
            disabled={isDisabledMinus(mealAmount)}
            style={isDisabledMinus(mealAmount) ? styles.disabledButton : null}
            onPress={e => handleChangeMealsAmount(title.toLowerCase(), "-")}
          />
          <TextInput
            keyboardType="numeric"
            value={Number(mealAmount).toString()}
            style={isDisableInput() ? styles.textinputDisabled : styles.textinputEnabled}
            onEndEditing={e => handleOnBlurTyping(e, title.toLowerCase())}
            onChange={e => handleOnChangeTyping(e, title.toLowerCase())}
          />
          <Button
            title="+"
            disabled={isDisabledPlus(mealAmount)}
            style={isDisabledPlus(mealAmount) ? styles.disabledButton : null}
            onPress={e => handleChangeMealsAmount(title.toLowerCase(), "+")}
          />
        </View>
      </SpinnerWrapper>
    </View>
  );
};

RenderMealsRow.propTypes = {
  fetching: bool,
  handleChangeMealsAmount: func,
  handleOnBlurTyping: func,
  handleOnChangeTyping: func,
  isDisableInput: func,
  isDisabledMinus: func,
  isDisabledPlus: func,
  mealAmount: number,
  title: string
};

export default RenderMealsRow;
