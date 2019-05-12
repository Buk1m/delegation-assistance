import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, bool, array } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain";
import Card from "../../components/Card/Card.component";
import Input from "../../components/Input/Input.component";
import Button from "../../components/Button/Button.component";
import { validateRequired, validateStartEndDate } from "../../validators/Validators";

export const DelegationCreatePage = props => {
  const { handleSubmit, countriesISOCodes, submitting } = props;
  return (
    <LayoutMain title="Create delegation">
      <div className="container create-delegation-card m-auto pb-4">
        <Card title="Delegation information">
          <Form onSubmit={handleSubmit} id="create-delegation">
            <Input
              name="destinationCountryISO3"
              component="typeahead"
              label="Destination Country"
              validate={[validateRequired]}
              options={countriesISOCodes}
              isSearchable={true}
            />
            <Input
              label="Destination Location"
              name="destinationLocation"
              placeholder="I'm going to..."
              validate={validateRequired}
              component="input"
            />
            <Input
              label="Delegation Objective"
              name="delegationObjective"
              placeholder="I want to..."
              validate={validateRequired}
              component="input"
            />
            <div className="d-flex justify-content-around flex-wrap">
              <Input
                name="startDate"
                label="Start date"
                component="datepicker"
                validate={[validateRequired]}
                classes="w-auto"
              />
              <Input
                name="endDate"
                label="End date"
                component="datepicker"
                validate={[validateRequired, validateStartEndDate]}
                classes="w-auto"
              />
            </div>
            <div className="d-flex justify-content-center btn-create-delegation">
              <Button type="submit" submitting={submitting} disabled={submitting} text="Create delegation" />
            </div>
          </Form>
        </Card>
      </div>
    </LayoutMain>
  );
};

DelegationCreatePage.propTypes = {
  handleSubmit: func,
  submitting: bool,
  countriesISOCodes: array
};

export default reduxForm({
  form: "createDelegation"
})(DelegationCreatePage);
