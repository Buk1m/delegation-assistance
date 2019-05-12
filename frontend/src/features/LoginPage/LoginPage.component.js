import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, string, bool } from "prop-types";

import { validateRequired } from "../../validators/Validators";
import LayoutMain from "../../components/layouts/LayoutMain";
import Input from "../../components/Input/Input.component";
import Button from "../../components/Button/Button.component";

import login from "../../assets/images/login.jpg";

export const LoginPage = props => {
  const { handleSubmit, errors, submitting } = props;
  return (
    <LayoutMain title="Sign in" hideTitle fullContent>
      <div id="login-screen" style={{ backgroundImage: `url(${login})` }}>
        <div className="login-container">
          <h1 className="title-text">Nice to see you again!</h1>
          <Form onSubmit={handleSubmit} className="form-container">
            <span style={{ color: "red" }}>{errors}</span>
            <Input name="login" placeholder="Username" label="Login *" validate={validateRequired} component="input" />
            <Input
              name="password"
              placeholder="Password"
              label="Password *"
              validate={validateRequired}
              type="password"
              component="input"
            />
            <Button type="submit" text="sign in" disabled={submitting} submitting={submitting} />
          </Form>
        </div>
      </div>
    </LayoutMain>
  );
};

LoginPage.propTypes = {
  handleSubmit: func,
  errors: string,
  submitting: bool
};

export default reduxForm({
  form: "loginform"
})(LoginPage);
