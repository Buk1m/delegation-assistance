import React from "react";
import { Field, reset, reduxForm, Form } from "redux-form";
import { func, bool, array } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain/LayoutMain.container";
import Card from "../../components/Card/Card.component";
import Input from "../../components/Input/Input.component";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker.component";
import { validateRequired } from "../../shared/validators/Validators";
import startDateEarlierThanEndDate from "../../shared/validators/startDateEarlierThenEndDate";
import Typeahead from "../../components/Typeahead/Typeahead.component";
import Button from "../../components/Button/Button.component";

export const CreateDelegationPage = props => {
  const { handleSubmit, countriesISOCodes } = props;
  return (
    <LayoutMain title="Create delegation">
      <div className="create-delegation-card m-auto pb-4">
        <Card title="Delegation information" number="1">
          <Form onSubmit={handleSubmit} id="create-delegation">
            <div className="container">
              <label
                className="label-delegation-page"
                htmlFor="destinationCountryISO3"
              >
                Destination Country:
              </label>
              <Field
                name="destinationCountryISO3"
                component={Typeahead}
                validate={[validateRequired]}
                options={countriesISOCodes}
                isSearchable={true}
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
                <div className="date-picker">
                  <label className="label-delegation-page" htmlFor="startDate">
                    Start date:
                  </label>
                  <Field
                    name="startDate"
                    component={DateTimePicker}
                    validate={[validateRequired]}
                  />
                </div>
                <div className="date-picker">
                  <label className="label-delegation-page" htmlFor="endDate">
                    End date:
                  </label>
                  <Field
                    name="endDate"
                    component={DateTimePicker}
                    validate={[validateRequired]}
                  />
                </div>
                <div className="btn-create-delegation">
                  <Button type="submit" text="Create delegation" />
                </div>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </LayoutMain>
  );
};

CreateDelegationPage.propTypes = {
  handleSubmit: func,
  submitting: bool,
  countriesISOCodes: array
};

export default reduxForm({
  form: "createDelegation",
  ...startDateEarlierThanEndDate,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(reset("createDelegation"));
  }
})(CreateDelegationPage);