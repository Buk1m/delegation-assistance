import React from "react";
import { Text, ScrollView, Switch, View, Button } from "react-native";
import { reduxForm, Field } from "redux-form";
import { func, array, object } from "prop-types";

import styles from "./ChecklistScreen.module.scss";

const renderField = ({ input: { onChange, value } }) => {
  return <Switch onValueChange={value => onChange(value)} value={value} />;
};

renderField.propTypes = {
  input: object
};

const ChecklistScreen = props => {
  const { tasks = [], handleSubmit, handleDelete } = props;
  return (
    <ScrollView>
      <View style={styles.list}>
        {tasks.map((task, index) => (
          <View key={task.id} style={styles.listitem}>
            <Field
              name={`tasks[${index}]`}
              title={task.name}
              value={task.id}
              component={renderField}
            />
            <Text style={styles.name}>{task.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonwrapper}>
        <View style={styles.button}>
          <Button onPress={handleSubmit} title="Save" />
        </View>
        <View style={styles.buttonDelete}>
          <Button
            color={styles["buttonDelete"].color}
            onPress={handleSubmit(values => handleDelete(values))}
            title="Delete"
          />
        </View>
      </View>
    </ScrollView>
  );
};

ChecklistScreen.propTypes = {
  tasks: array,
  handleDelete: func,
  handleSubmit: func
};

export default reduxForm({
  form: "checklist"
})(ChecklistScreen);
