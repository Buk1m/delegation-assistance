import React from "react";
import { Field, reduxForm, Form } from "redux-form";
import DatePicker from "react-datepicker";
import { func, bool } from "prop-types";

import Input from "../../components/Input/Input.component";
import { validateRequired } from "../../shared/validators/Validators";
import LayoutMain from "../../components/layouts/LayoutMain";

//TODO: optional change to react-day-picker with range selection
const renderDateTimePicker = ({ input: { onChange, value } }) => {
  return (
    <DatePicker
      inline
      dropdownMode="select"
      selected={!value ? new Date() : new Date(value)}
      onChange={onChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
    />
  );
};

export const CreateDelegationPage = props => {
  const { handleSubmit, submitting } = props;
  return (
    <LayoutMain title="Create delegation">
      <Form onSubmit={handleSubmit} id="create-delegation">
        <div className="container">
          <Input
            label="Destination Country"
            name="destinationCountryISO3"
            placeholder="Destination Country"
            validate={validateRequired}
          />
          <Input
            label="Destination Location"
            name="destinationLocation"
            placeholder="Destination Location"
            validate={validateRequired}
          />
          <Input
            label="Delegation Objective"
            name="delegationObjective"
            placeholder="Delegation Objective"
            validate={validateRequired}
          />
          <div className="date-pickers-container">
            <div>
              <label htmlFor="startDate">Start date:</label>
              <Field name="startDate" component={renderDateTimePicker} />
            </div>
            <div>
              <label htmlFor="endDate">End date:</label>
              <Field name="endDate" component={renderDateTimePicker} />
            </div>
          </div>
          <button className="btn btn-primary btn-create-delegation" type="submit" disabled={submitting}>
            CREATE DELEGATION
          </button>
        </div>
      </Form>
    </LayoutMain>
  );
};

CreateDelegationPage.propTypes = {
  handleSubmit: func,
  submitting: bool
};

export default reduxForm({
  form: "createDelegation"
})(CreateDelegationPage);
