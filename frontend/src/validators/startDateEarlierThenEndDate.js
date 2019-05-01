const validate = values => {
  const errors = {};
  if (values.startDate > values.endDate) {
    errors.endDate = "End date must be later than start date!";
  }

  return errors;
};

export default { validate };
