import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, bool, array } from "prop-types";
import { createNumberMask } from "redux-form-input-masks";

import LayoutMain from "../../components/layouts/LayoutMain";
import Card from "../../components/Card/Card.component";
import Input from "../../components/Input/Input.component";
import Button from "../../components/Button/Button.component";
import {
  validateRequired,
  validateStartEndDate,
  validateCurrency,
  validateDiem,
  validateInteger
} from "../../validators/Validators";
import currencies from "../../components/Currencies/CurrenciesMap";

const currencyMask = createNumberMask({
  decimalPlaces: 2,
  locale: "en-US"
});

export const DelegationCreatePage = props => {
  const { countries, countriesFetching, handleSubmit, onSelectOpen, submitting } = props;
  return (
    <LayoutMain title="Create delegation">
      <div className="container create-delegation-card m-auto pb-4">
        <Card title="Delegation information">
          <Form onSubmit={handleSubmit} id="create-delegation">
            <Input
              name="destinationCountryId"
              component="typeahead"
              label="Destination Country"
              onMenuOpen={onSelectOpen}
              isLoading={countriesFetching}
              validate={validateRequired}
              options={countries}
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
            <div className="d-flex justify-content-between flex-wrap">
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
            <div className="form-row">
              <div className="form-group col-sm-3">
                <Input
                  label="Diem"
                  name="diet.perDiem"
                  placeholder="0.00"
                  type="text"
                  component="input"
                  validate={[validateDiem, validateRequired]}
                  {...currencyMask}
                />
              </div>
              <div className="form-group col-sm-4 col-md-3">
                <Input
                  label="Currency"
                  component="typeahead"
                  name="diet.currency"
                  options={currencies}
                  validate={[validateCurrency, validateRequired]}
                />
              </div>
              <div className="form-group offset-sm-1 col-sm-4  offset-md-3 col-md-3">
                <Input
                  label="Advance Payment"
                  name="advancePayment"
                  placeholder="0.00"
                  type="text"
                  component="input"
                  {...currencyMask}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-sm-4">
                <Input
                  label="Breakfasts"
                  placeholder="Add breakfasts..."
                  name="meals.breakfasts"
                  type="text"
                  component="input"
                  validate={validateInteger}
                />
              </div>
              <div className="form-group col-sm-4">
                <Input
                  label="Lunches"
                  placeholder="Add lunches..."
                  name="meals.lunches"
                  type="text"
                  component="input"
                  validate={validateInteger}
                />
              </div>
              <div className="form-group col-sm-4">
                <Input
                  label="Dinners"
                  placeholder="Add dinners..."
                  name="meals.dinners"
                  type="text"
                  component="input"
                  validate={validateInteger}
                />
              </div>
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
  countries: array,
  countriesFetching: bool,
  handleSubmit: func,
  onSelectOpen: func,
  submitting: bool
};

export default reduxForm({
  form: "createDelegation"
})(DelegationCreatePage);
