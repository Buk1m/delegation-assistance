import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, bool, array } from "prop-types";
import { FilePond } from "react-filepond";

import currencies from "../../components/Currencies/CurrenciesMap";
import Button from "../../components/Button/Button.component";
import Input from "../../components/Input/Input.component";
import LayoutMain from "../../components/layouts/LayoutMain";
import { validateRequired } from "../../validators/Validators";

import "filepond/dist/filepond.min.css";

export const DelegationAddExpensePage = props => {
  const { handleSubmit, setFiles, files, submitting } = props;

  return (
    <LayoutMain title="Add expense">
      <Form onSubmit={handleSubmit} id="add-expense">
        <div className="container">
          <Input label="Expense name" name="expenseName" placeholder="Add name" validate={validateRequired} />
          <div className="form-group">
            <FilePond
              files={files}
              allowMultiple={true}
              onupdatefiles={fileItems => {
                setFiles(fileItems.map(fileItem => fileItem.file));
              }}
            />
          </div>
          <div className="value-container">
            <Input
              name="expenseValue"
              placeholder="Add amount"
              validate={validateRequired}
              className="amount"
              label="Amount"
            />
            <Input
              name="expenseCurrency"
              placeholder="Currency"
              component="typeahead"
              validate={validateRequired}
              options={currencies}
              isSearchable={true}
              className="currency-select"
              label="Currency"
            />
          </div>
          <div className="btn-add-expense">
            <Button type="submit" disabled={submitting} submitting={submitting} text="ADD EXPENSE" />
          </div>
        </div>
      </Form>
    </LayoutMain>
  );
};

DelegationAddExpensePage.propTypes = {
  handleSubmit: func,
  setFiles: func,
  submitting: bool,
  files: array
};

export default reduxForm({
  form: "addExpense"
})(DelegationAddExpensePage);
