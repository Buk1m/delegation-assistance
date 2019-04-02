import React from "react";
import { View, Text, Button } from "react-native";
import { Field, reduxForm } from "redux-form";

import { validateRequired } from "../../shared/Validators/Validators";
import FieldLoginRenderer from "../../components/FieldLoginRenderer/FieldLoginRenderer.component";
import styles from "./LoginScreen.module.scss";

const LoginScreen = props => {
  const { handleSubmit } = props;
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
          <Button
            title="Sign in"
            onPress={handleSubmit}
            // TODO: export color scss variables from _constants
            // and import primary color here. (Example -> frontend/src/features/CreateDelegationPage/component)
            // The assignment below breaks tests because `styles` is mocked and
            // any atempts to access `styles` properties will
            // throw an exception. Any suggestions on how to resolve this problem
            // differently are welcome.
            // color={styles["button-login"].color}
            data-test="login-button"
          />
        </View>
      </View>
    </View>
  );
};

export default reduxForm({
  form: "loginform"
})(LoginScreen);
