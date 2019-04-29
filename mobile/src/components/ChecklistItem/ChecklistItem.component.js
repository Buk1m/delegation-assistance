import React from "react";
import { View, Text } from "react-native";
import CheckBox from "react-native-check-box";
import { object, func } from "prop-types";

import styles from "./ChecklistItemStyles.scss";

const ChecklistItem = props => {
  const { checkbox, onClick } = props;
  return (
    <View style={styles.checklistItem}>
      <View style={styles.sideOrnament} />
      <View style={styles.taskData}>
        <Text style={styles.task}>{checkbox.task}</Text>
        <Text style={styles.description}>{checkbox.description}</Text>
      </View>
      <View style={styles.checkbox}>
        <CheckBox
          onClick={onClick}
          checkBoxColor={styles.checkBoxColor}
          checkedCheckBoxColor={styles.checkBoxColor}
          isChecked={checkbox.isDone}
        />
      </View>
    </View>
  );
};

ChecklistItem.propTypes = {
  checkbox: object,
  onClick: func
};

export default ChecklistItem;
