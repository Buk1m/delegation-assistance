import React from "react";
import { View } from "react-native";
import { reduxForm, Field } from "redux-form";
import { func } from "prop-types";

import LabeledPicker from "../../../../components/LabeledPicker/LabeledPicker.component";
import Button from "../../../../components/Button/Button.component";
import { validateRequired } from "../../../../validators/Validators";
import sortBys from "../../../../config/delegationSortBys";

import styles from "../../DelegationsScreenStyles.scss";

const addKeysToItems = items => {
  return items.map((item, index) => {
    return Object.assign(item, { key: `${index}` });
  });
};

const SortPanel = props => {
  const { handleSubmit } = props;
  return (
    <View style={[styles.column, styles.sideMargins]}>
      <Field
        name="sortBy"
        component={LabeledPicker}
        style={styles.picker}
        title="Sort by"
        data={addKeysToItems(sortBys)}
        iconName="md-funnel"
        validate={[validateRequired]}
        isSecure={false}
      />
      <Button style={styles.button} title="Sort" onPress={handleSubmit} />
    </View>
  );
};

SortPanel.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "sort-delegations"
})(SortPanel);
