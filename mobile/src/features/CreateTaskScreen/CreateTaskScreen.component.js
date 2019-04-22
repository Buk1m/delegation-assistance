import React from "react";
import { func } from "prop-types";
import { reduxForm, Field } from "redux-form";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import styles from "../../assets/styles/styles.scss";
import FieldRenderer from "../../components/FieldRenderer/FieldRenderer.component";
import { validateRequired } from "../../validators/Validators";

const CreateTaskScreen = props => {
  const { handleSubmit } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" enable>
          <Text style={styles.subtitle}>Task name</Text>
          <Field
            name="name"
            component={FieldRenderer}
            validate={[validateRequired]}
          />
          <Text style={styles.subtitle}>Task description</Text>
          <Field
            name="description"
            component={FieldRenderer}
            validate={[validateRequired]}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={styles.button}>Create</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

CreateTaskScreen.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "create-task"
})(CreateTaskScreen);
