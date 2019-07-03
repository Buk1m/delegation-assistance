import React from "react";
import { ImageBackground, KeyboardAvoidingView, View, Text } from "react-native";
import { Field, reduxForm } from "redux-form";
import { bool, func, string } from "prop-types";

import { validateRequired } from "../../validators/Validators";
import FieldLoginRenderer from "../../components/FieldLoginRenderer/FieldLoginRenderer.component";
import { Button } from "react-native-paper";
import styles from "./LoginScreen.module.scss";

const LoginScreen = props => {
  const { loginError, handleSubmit, submitting } = props;
  return (
    <ImageBackground source={require("../../assets/images/login1.jpg")} style={{ width: "100%", height: "100%" }}>
      <KeyboardAvoidingView enable>
        <View>
          <View style={styles.center}>
            <View style={styles["container"]}>
              <View style={styles["frame-header"]}>
                <Text style={styles["title-text"]}>Hello!</Text>
              </View>
              <View>
                <Text style={styles["error-text"]}>{loginError}</Text>
                <Field
                  testID="field-login"
                  name="login"
                  mode="outlined"
                  placeholder="Username"
                  component={FieldLoginRenderer}
                  validate={[validateRequired]}
                />
                <Field
                  testID="field-password"
                  name="password"
                  placeholder="Password"
                  component={FieldLoginRenderer}
                  validate={[validateRequired]}
                  secureTextEntry={true}
                />
                <Button
                  style={{ fontSize: 30 }}
                  onPress={handleSubmit}
                  loading={submitting}
                  disabled={submitting}
                >
                  Sign in
                </Button>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

LoginScreen.propTypes = {
  handleSubmit: func.isRequired,
  loginError: string,
  submitting: bool
};

export default reduxForm({
  form: "loginform"
})(LoginScreen);
