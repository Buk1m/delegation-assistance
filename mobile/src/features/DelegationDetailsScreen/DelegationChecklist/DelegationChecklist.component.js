import React from "react";
import { FlatList, Text } from "react-native";
import { array, bool, func } from "prop-types";

import RenderChecklistItem from "../../../components/renderers/RenderChecklistItem.renderer";
import SpinnerWrapper from "../../../components/SpinnerWrapper/SpinnerWrapper.component";
import styles from "./DelegationChecklist.module.scss";

const isChecklistEmpty = activities => {
  return activities.length === 0;
};

const DelegationChecklist = props => {
  const { activities, changeCheckboxState, fetching } = props;
  return (
    <SpinnerWrapper spin={fetching} message="loading checklist" containerStyle={styles.spinner}>
      {isChecklistEmpty(activities) ? (
        <Text>Checklist is empty.</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={activities}
          renderItem={checkbox => RenderChecklistItem(checkbox, changeCheckboxState)}
        />
      )}
    </SpinnerWrapper>
  );
};

DelegationChecklist.propTypes = {
  activities: array,
  changeCheckboxState: func,
  fetching: bool
};

export default DelegationChecklist;
