import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, string } from "prop-types";

import { validateRequired } from "../../validators/Validators";
import LayoutMain from "../../components/layouts/LayoutMain";
import Input from "../../components/Input/Input.component";
import Button from "../../components/Button/Button.component";

export const LoginPage = props => {
  const { handleSubmit, errors } = props;
  return (
    <LayoutMain hideSidebar={true} addPadding={false}>
      <div id="login-screen">
        <div className="login-container">
          <h1 className="title-text">Nice to see you again!</h1>
          <Form onSubmit={handleSubmit} className="form-container">
            <span style={{ color: "red" }}>{errors}</span>
            <Input
              name="login"
              placeholder="Username"
              validate={validateRequired}
              className="input-login"
              onChange={event => this.handleUserInput(event)}
            />
            <Input
              name="password"
              placeholder="Password"
              validate={validateRequired}
              type="password"
              className="input-login"
              onChange={event => this.handleUserInput(event)}
            />
            <Button type="submit" text="sign in" />
          </Form>
        </div>
      </div>
    </LayoutMain>
  );
};

LoginPage.propTypes = {
  handleSubmit: func,
  errors: string
};

export default reduxForm({
  form: "loginform"
})(LoginPage);
