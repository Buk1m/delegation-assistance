import React from "react";
import { View } from "react-native";
import CheckBox from "react-native-check-box";
import { object, func } from "prop-types";

import styles from "./ChecklistItemStyles.scss";

const ChecklistItem = props => {
  const { checkbox, onClick } = props;
  return (
    <View style={styles.checklistItem}>
      <CheckBox
        onClick={onClick}
        style={styles.checkbox}
        checkBoxColor={styles.checkBoxColor}
        checkedCheckBoxColor={styles.checkedCheckBoxColor}
        isChecked={checkbox.isDone}
        leftText={checkbox.taskText}
      />
    </View>
  );
};

ChecklistItem.propTypes = {
  checkbox: object,
  onClick: func
};

export default ChecklistItem;
