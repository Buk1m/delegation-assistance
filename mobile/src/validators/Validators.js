const validateRequired = value => (value ? undefined : "This field is required.");

const validateNumber = value => (value && isNaN(Number(value)) ? "Must be a number" : undefined);

const validateCurrency = value =>
  value && !  /^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/i.test(value) ? "Must have 2 decimal places" : undefined;

export { validateRequired, validateNumber, validateCurrency };
