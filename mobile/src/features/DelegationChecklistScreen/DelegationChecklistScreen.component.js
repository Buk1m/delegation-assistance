import React from "react";
import { View, Text, FlatList } from "react-native";

import ChecklistItem from "../../components/ChecklistItem";

import styles from "./DelegationChecklistScreenStyles.scss";

const renderChecklistItem = (checkbox, changeCheckboxState) => {
  return (
    <ChecklistItem
      data={checkbox.item}
      changeCheckboxState={changeCheckboxState}
    />
  );
};

const DelegationChecklistScreen = props => {
  const { title, checklist, changeCheckboxState } = props;

  return (
    <View>
      <Text style={[styles.title, styles.sideMargins]}>{title}</Text>
      <FlatList
        style={styles.list}
        data={checklist}
        renderItem={checkbox =>
          renderChecklistItem(checkbox, changeCheckboxState)
        }
      />
    </View>
  );
};

export default DelegationChecklistScreen;
