import { SubmissionError } from "redux-form";

const handleFormErrors = error => {
  if (error && error.response && error.response.data.details) {
    const formError = error.response.data.details
      .map(err => {
        const test = { [err.fieldName]: err.message };
        return test;
      })
      .shift();

    throw new SubmissionError(formError);
  }
};

export default handleFormErrors;
