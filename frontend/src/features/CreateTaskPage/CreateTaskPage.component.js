import React from "react";
import { reduxForm, Form } from "redux-form";
import { func } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";
import Input from "../../components/Input/Input.component";
import Button from "../../components/Button/Button.component";
import Textarea from "../../components/Textarea/Textarea.component";
import Card from "../../components/Card/Card.component";

export const CreateTaskPage = props => {
  const { handleSubmit } = props;
  return (
    <LayoutMain title="Checklist management">
      <div className="container">
        <Card title="Add new task">
          <Form onSubmit={handleSubmit}>
            <Input name="name" label="Task name" />
            <Textarea name="description" type="textarea" label="Task description" />
            <Button text="Add task" type="submit" />
          </Form>
        </Card>
      </div>
    </LayoutMain>
  );
};

CreateTaskPage.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "create-task"
})(CreateTaskPage);
