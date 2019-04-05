import React from "react";
import { reduxForm, Form } from "redux-form";
import { func, bool, array } from "prop-types";
import { FilePond } from "react-filepond";

//TODO: replace with data fetched from backend
import Currencies from "./Currencies";

import Button from "../../components/Button/Button.component";
import Input from "../../components/Input/Input.component";
import { validateRequired } from "../../validators/Validators";
import LayoutMain from "../../components/layouts/LayoutMain";
import Typeahead from "../../components/Typeahead/Typeahead.component";

import "filepond/dist/filepond.min.css";

const currencies = Currencies.map(currency => {
  return { label: currency, value: currency };
});

export const AddExpensePage = props => {
  const { handleSubmit, setFiles, files, submitting } = props;

  return (
    <LayoutMain title="Add expense">
      <Form onSubmit={handleSubmit} id="add-expense">
        <div className="container">
          <Input
            label="Expense name"
            name="expenseName"
            placeholder="Add name"
            validate={validateRequired}
          />

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
              component={Typeahead}
              validate={validateRequired}
              options={currencies}
              isSearchable={true}
              className="currency-select"
              label="Currency"
            />
          </div>

          <div className="btn-add-expense">
            <Button type="submit" disabled={submitting} text="ADD EXPENSE" />
          </div>
        </div>
      </Form>
    </LayoutMain>
  );
};

AddExpensePage.propTypes = {
  handleSubmit: func,
  setFiles: func,
  submitting: bool,
  files: array
};

export default reduxForm({
  form: "addExpense"
})(AddExpensePage);
