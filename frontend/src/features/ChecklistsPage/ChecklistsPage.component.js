import React from "react";
import { array, bool, func } from "prop-types";
import { reduxForm, Form } from "redux-form";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";
import Button from "../../components/Button/Button.component";
import Card from "../../components/Card/Card.component";
import CheckboxGroupChecklist from "../../components/CheckboxGroupChecklist/CheckboxGroupChecklist.component";

export const ChecklistsPage = props => {
  const { tasks = [], handleSubmit, handleDelete, isUserTravelmanager } = props;
  return (
    <LayoutMain title="Checklist">
      <Card>
        <Form onSubmit={handleSubmit}>
          <div className="checklist-list">
            <CheckboxGroupChecklist options={tasks} path="id" name="tasks" />
          </div>
          <Button type="submit" text="Save" />
          {isUserTravelmanager ? (
            <span className="delete-wrapper">
              <Button
                type="submit"
                text="delete"
                className="warning"
                onClick={handleSubmit(values => handleDelete(values))}
              />
            </span>
          ) : null}
        </Form>
      </Card>
    </LayoutMain>
  );
};

ChecklistsPage.propTypes = {
  tasks: array,
  isUserTravelmanager: bool,
  handleSubmit: func,
  handleDelete: func
};

export default reduxForm({
  form: "updateTasks"
})(ChecklistsPage);
