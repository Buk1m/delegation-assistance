import React from "react";
import { View } from "react-native";
import { reduxForm, Field } from "redux-form";
import { func } from "prop-types";

import DatePicker from "../../../../components/DatePicker/LabeledDatePicker.component";
import Button from "../../../../components/Button/Button.component";
import LabeledPicker from "../../../../components/LabeledPicker/LabeledPicker.component";
import statuses from "../../../../config/delegationStatuses";

import styles from "../../DelegationsScreen.module.scss";

const addEmptyOption = options => {
  const optionsWithEmptyValue = [...options];
  optionsWithEmptyValue.unshift({ label: "NONE", value: "" });
  return optionsWithEmptyValue;
};

const addKeysToItems = items => {
  return items.map((item, index) => {
    return Object.assign(item, { key: `${index}` });
  });
};

const FilterPanel = props => {
  const { handleSubmit } = props;
  const statusesWithKeys = addKeysToItems(addEmptyOption(statuses));

  return (
    <View style={[styles.column, styles.sideMargins]}>
      <Field name="startDate" component={DatePicker} style={styles.datePicker} title="Date from" />
      <Field name="endDate" component={DatePicker} style={styles.datePicker} title="Date to" />

      <Field
        name="delegationStatus"
        component={LabeledPicker}
        style={styles.picker}
        data={statusesWithKeys}
        title="Status"
        iconName="md-stats"
      />

      <Button style={styles.button} title="Filter" onPress={handleSubmit} />
    </View>
  );
};

FilterPanel.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "filter-delegations"
})(FilterPanel);
