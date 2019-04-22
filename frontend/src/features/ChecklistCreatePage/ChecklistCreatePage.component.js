import React from "react";
import { bool, func } from "prop-types";
import { reduxForm, Form, FieldArray } from "redux-form";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";
import Button from "../../components/Button/Button.component";
import RenderTasks from "../../components/renderers/RenderTasks.renderer";

export const ChecklistsCreatePage = props => {
  const { handleSubmit, submitting, handleAddTask } = props;
  return (
    <LayoutMain title="Create a new checklist">
      <Form onSubmit={handleSubmit}>
        <div className="checklist-grid">
          <FieldArray name="tasks" component={RenderTasks} />
        </div>
        <div className="checklist-footer">
          <Button text="Add new task" className="add" onClick={handleAddTask} />
          <Button text="Create checklist" type="submit" submitting={submitting} disabled={submitting} />
        </div>
      </Form>
    </LayoutMain>
  );
};

ChecklistsCreatePage.propTypes = {
  handleSubmit: func,
  submitting: bool,
  handleAddTask: func
};

export default reduxForm({
  form: "createChecklist",
  enableReinitialize: true
})(ChecklistsCreatePage);
