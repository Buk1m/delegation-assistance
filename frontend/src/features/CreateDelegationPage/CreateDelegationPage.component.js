import React from 'react';
import {Field, reduxForm} from 'redux-form';
import DatePicker from "react-datepicker";
import {validateRequired} from "../../shared/validators/Validators";
import Input from "../../components/Input/Input.component";

//TODO: optional change to react-day-picker with range selection
const renderDateTimePicker = ({input: {onChange, value}}) => {
  return (
    <DatePicker inline
                dropdownMode="select"
                selected={!value ? new Date() : new Date(value)}
                onChange={onChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
    />);
};

const CreateDelegationPage = (props) => {
  const {handleSubmit, submitting} = props;
  return (
    <form onSubmit={handleSubmit} id="create-delegation">
      <div className="container">
        <Input label="Destination Country:" name="destinationCountryISO3" placeholder="Destination Country:"
               validate={validateRequired}/>
        <Input label="Destination Location:" name="destinationLocation" placeholder="Destination Location:"
               validate={validateRequired}/>
        <Input label="Destination Objective:" name="delegationObjective" placeholder="Delegation Objective:"
               validate={validateRequired}/>
        <div className="date-pickers-container">
          <div>
            <label htmlFor="startDate">Start date:</label>
            <Field
              name="startDate"
              component={renderDateTimePicker}
            />
          </div>
          <div>
            <label htmlFor="endDate">End date:</label>
            <Field
              name="endDate"
              component={renderDateTimePicker}
            />
          </div>
        </div>
        <button className="btn btn-primary btn-create-delegation" type="submit"
                disabled={submitting}>CREATE DELEGATION
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'createDelegation',
})(CreateDelegationPage);