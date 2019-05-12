import React from "react";
import { func } from "prop-types";
import { Form, reduxForm, reset } from "redux-form";

import Input from "../../../../components/Input/Input.component";
import Button from "../../../../components/Button/Button.component";
import { validateRequired } from "../../../../validators/Validators";

const TaskModalForm = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="checklistModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="checklistModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <Input name="task" label="Task name *" validate={[validateRequired]} component="input" />
              <Input name="description" label="Task name *" validate={[validateRequired]} component="textarea" />
            </div>
            <div className="modal-footer">
              <Button type="submit" className="cancel" data-dismiss="modal" text="Cancel" />
              <Button type="submit" text="save" data-dismiss="modal" onClick={e => handleSubmit() && e} />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

TaskModalForm.propTypes = {
  handleSubmit: func
};

export default reduxForm({
  form: "checklistGlobalTemplateTask",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) => dispatch(reset("checklistGlobalTemplateTask"))
})(TaskModalForm);
