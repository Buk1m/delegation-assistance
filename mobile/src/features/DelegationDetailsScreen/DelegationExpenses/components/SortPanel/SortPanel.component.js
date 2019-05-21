import React from "react";
import { View } from "react-native";
import { reduxForm, Field } from "redux-form";
import { func, string } from "prop-types";

import LabeledPicker from "../../../../../components/LabeledPicker/LabeledPicker.component";
import Button from "../../../../../components/Button/Button.component";
import IconButton from "../../../../../components/IconButton/IconButton.component";
import { validateRequired } from "../../../../../validators/Validators";
import sortBys from "../../../../../config/delegationExpenseSortBys";

import styles from "../../DelegationExpenses.module.scss";

const addKeysToItems = items => {
  return items.map((item, index) => {
    return Object.assign(item, { key: `${index}` });
  });
};

const SortPanel = props => {
  const { handleSubmit, sortDirection, changeSortDirection } = props;

  return (
    <View style={[styles.column, styles.sideMargins]}>
      <View style={styles.row}>
        <Field
          name="sortBy"
          component={LabeledPicker}
          style={styles.picker}
          pickerStyle={styles.labeledPicker}
          title="Sort by"
          data={addKeysToItems(sortBys)}
          iconName="funnel"
          validate={[validateRequired]}
          isSecure={false}
        />
        <Field
          name="sortDirection"
          component={IconButton}
          style={styles.directionButton}
          iconStyle={styles.directionIcon}
          iconName={sortDirection === "desc" ? "arrow-round-down" : "arrow-round-up"}
          onPress={() => changeSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          isSecure={false}
        />
      </View>
      <Button style={styles.button} title="Sort" onPress={handleSubmit} />
    </View>
  );
};

SortPanel.propTypes = {
  changeSortDirection: func,
  handleSubmit: func,
  sortDirection: string
};

export default reduxForm({
  form: "sort-delegation-expenses"
})(SortPanel);
