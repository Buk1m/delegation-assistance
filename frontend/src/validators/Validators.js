const validateRequired = value => (value ? undefined : "This field is required.");
const validateStartEndDate = (endDate, allValues) => {
  if (endDate < allValues.startDate) {
    return "End date must be later than start date!";
  }
  return null;
};
const validateDepartureArrivalDate = (arrivalDate, allValues) => {
  if (arrivalDate <= allValues.departureDate) {
    return "Arrival date must be later than departure date!";
  }
  return null;
};

export { validateRequired, validateStartEndDate, validateDepartureArrivalDate };
