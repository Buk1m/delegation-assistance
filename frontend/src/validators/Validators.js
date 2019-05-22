const validateCheckInOutDate = (checkOutDate, allValues) => {
  if (checkOutDate <= allValues.checkInDate) {
    return "Check out date must be later than check in date!";
  }
  return null;
};

const validateDepartureArrivalDate = (arrivalDate, allValues) => {
  if (arrivalDate <= allValues.departureDate) {
    return "Arrival date must be later than departure date!";
  }
  return null;
};

const validateNumber = value => (value && isNaN(Number(value)) ? "Must be a number" : undefined);

const validateRequired = value => (value ? undefined : "This field is required.");

const validateStartEndDate = (endDate, allValues) => {
  if (endDate <= allValues.startDate) {
    return "End date must be later than start date!";
  }
  return null;
};

const validateCurrency = (value, { diet: perDiem }) => {
  if (value === undefined && perDiem !== undefined) {
    return "Diem must have currency.";
  }
  return null;
};

const validateDiem = (value, { diet: currency }) => {
  if (value === undefined && currency !== undefined) {
    return "Diem must be set.";
  }
  return null;
};

export {
  validateCheckInOutDate,
  validateDepartureArrivalDate,
  validateRequired,
  validateStartEndDate,
  validateNumber,
  validateCurrency,
  validateDiem
};
