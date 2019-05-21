const validate = (_, values) => {
  const errors = {};
  const startDate = values.dateNames[0];
  const endDate = values.dateNames[1];

  if (values.values[startDate] > values.values[endDate]) {
    errors[endDate] = "End date must be later than start date!";
  }

  return errors;
};

export default { validate };
