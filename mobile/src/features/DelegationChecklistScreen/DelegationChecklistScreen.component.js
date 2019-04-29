import React from "react";
import { View, Text, FlatList } from "react-native";
import { number, array, func } from "prop-types";

import RenderChecklistItem from "../../components/renderers/RenderChecklistItem.renderer";

import styles from "./DelegationChecklistScreenStyles.scss";

const isChecklistEmpty = activities => {
  return activities.length === 0;
};

const getChecklistHeader = (delegationId, activities) => {
  return isChecklistEmpty(activities) ? "" : `no. ${delegationId}`;
};

const DelegationChecklistScreen = props => {
  const { delegationId, activities, changeCheckboxState } = props;

  return (
    <View>
      <Text style={styles.title}>
        {getChecklistHeader(delegationId, activities)}
      </Text>
      <FlatList
        style={styles.list}
        data={activities}
        renderItem={checkbox =>
          RenderChecklistItem(checkbox, changeCheckboxState)
        }
      />
    </View>
  );
};

DelegationChecklistScreen.propTypes = {
  delegationId: number,
  activities: array,
  changeCheckboxState: func
};

export default DelegationChecklistScreen;
