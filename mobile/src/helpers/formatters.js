const formatToISO = date => {
  return new Date(date).toISOString().split(".")[0];
};

export { formatToISO };
