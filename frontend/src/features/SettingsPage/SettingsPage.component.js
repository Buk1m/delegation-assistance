import React from "react";
import { func } from "prop-types";
import { reduxForm, Form } from "redux-form";

import LayoutMain from "../../components/layouts/LayoutMain";
import Button from "../../components/Button/Button.component";
import Input from "../../components/Input/Input.component";
import Card from "../../components/Card/Card.component";
import Row from "../../components/Row/Row.component";
import { themes } from "../../config";

const themeOptions = themes.map(theme => ({
  value: theme.toLowerCase(),
  text: theme
}));

const SettingsPage = ({ handleSubmit }) => {
  return (
    <LayoutMain title="Settings">
      <Card>
        <Form onSubmit={handleSubmit}>
          <Row label="Theme">
            <Input component="select" name="theme" options={themeOptions} />
          </Row>
          <Button type="submit" text="save" />
        </Form>
      </Card>
    </LayoutMain>
  );
};

SettingsPage.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "settingsForm"
})(SettingsPage);
