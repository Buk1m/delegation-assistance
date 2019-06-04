import React from "react";
import { array, bool, func } from "prop-types";
import { Form, reduxForm, reset } from "redux-form";

import currencies from "../../../../../components/Currencies/CurrenciesMap";
import Input from "../../../../../components/Input/Input.component";
import Button from "../../../../../components/Button/Button.component";
import { validateRequired, validateIsFile } from "../../../../../validators/Validators";
import { paymentTypes } from "../../../../../config/index";

const ExpensesModalForm = props => {
  const { handleSubmit, setFiles, files, initialize, invalid, pristine } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addExpenseModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addExpenseModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <Input
                label="Expense name *"
                name="expenseName"
                placeholder="Add name"
                validate={[validateRequired]}
                component="input"
              />

              <Input
                component="filepond"
                name="attachments"
                label="Attachments *"
                validate={validateIsFile(files.length)}
                setFiles={setFiles}
                files={files}
              />

              <div className="d-flex justify-content-around">
                <div>
                  <Input component="datepicker" name="expenseDate" label="Expense date" validate={[validateRequired]} />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Input
                    component="typeahead"
                    label="Payment type *"
                    name="paymentType"
                    options={paymentTypes}
                    validate={[validateRequired]}
                  />
                  <Input
                    component="input"
                    label="Amount *"
                    name="expenseValue"
                    placeholder="Add amount"
                    step="0.01"
                    type="number"
                    validate={[validateRequired]}
                  />
                  <Input
                    component="typeahead"
                    isSearchable={true}
                    label="Currency *"
                    name="expenseCurrency"
                    options={currencies}
                    placeholder="Currency"
                    validate={[validateRequired]}
                  />
                  <Input
                    component="input"
                    label="Exchange rate"
                    name="exchangeRate"
                    placeholder="Add exchange rate"
                    step="0.01"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button
                className="cancel"
                data-dismiss="modal"
                text="Cancel"
                onClick={() => {
                  initialize();
                }}
              />
              <Button
                type="submit"
                text="save"
                data-dismiss={pristine || invalid ? "" : "modal"}
                onClick={e => handleSubmit() && e}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

ExpensesModalForm.propTypes = {
  files: array,
  handleSubmit: func,
  initialize: func,
  invalid: bool,
  pristine: bool,
  setFiles: func
};

export default reduxForm({
  form: "addExpenseForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) => dispatch(reset("addExpenseForm"))
})(ExpensesModalForm);
