import React from "react";
import { View, Text } from "react-native";
import { Field, reduxForm } from "redux-form";
import { bool, func, string } from "prop-types";

import { validateRequired } from "../../validators/Validators";
import FieldLoginRenderer from "../../components/FieldLoginRenderer/FieldLoginRenderer.component";
import Button from "../../components/Button/Button.component";
import styles from "./LoginScreen.module.scss";

const LoginScreen = props => {
  const { handleSubmit, submitting } = props;
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles["frame-header"]}>
          <Text style={styles["title-text"]}>Hello!</Text>
        </View>
        <View style={styles["login-container"]}>
          <Text style={styles["error-text"]}>{props.errors}</Text>
          <Field
            testID="field-login"
            name="login"
            placeholder="Username"
            component={FieldLoginRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />
          <Field
            testID="field-password"
            name="password"
            placeholder="Password"
            component={FieldLoginRenderer}
            validate={[validateRequired]}
            isSecure={true}
          />
          <Button title="Sign in" onPress={handleSubmit} submitting={submitting} data-test="login-button" />
        </View>
      </View>
    </View>
  );
};

LoginScreen.propTypes = {
  errors: string,
  handleSubmit: func.isRequired,
  submitting: bool
};

export default reduxForm({
  form: "loginform"
})(LoginScreen);
