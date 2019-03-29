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
            name="login"
            placeholder="Username"
            component={FieldLoginRenderer}
            validate={[validateRequired]}
            isSecure={false}
          />
          <Field
            name="password"
            placeholder="Password"
            component={FieldLoginRenderer}
            validate={[validateRequired]}
            isSecure={true}
          />
          <Button title="Sign in" onPress={handleSubmit} color={styles["button-login"].color} />
        </View>
      </View>
    </View>
  );
};

export default reduxForm({
  form: "loginform"
})(LoginScreen);
