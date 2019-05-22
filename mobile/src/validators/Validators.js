const validateRequired = value => (value ? undefined : "This field is required.");

const validateNumber = value => (value && isNaN(Number(value)) ? "Must be a number" : undefined);

const validateCurrency = value =>
  value && !/^[0-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/i.test(value) ? "Must be money" : undefined;

const validateDiemExists = (value, { diet: currency }) => {
  if (value === undefined && currency !== undefined) {
    return "Diem must be set.";
  }
  return undefined;
};

const validateCurrencyExists = (value, { diet: perDiem }) => {
  if (value === undefined && perDiem !== undefined) {
    return "No currency.";
  }
  return undefined;
};

export { validateRequired, validateNumber, validateCurrency, validateDiemExists, validateCurrencyExists };
