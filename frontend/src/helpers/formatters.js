import React, { Fragment } from "react";
import moment from "moment";

const formatExpenseValue = (cell, row, rowIndex, formatExtraData) => {
  return (
    <Fragment>
      {formatExtraData[cell]}
      <span className="ml-1">{`${row.expenseValue} ${row.expenseCurrency}`}</span>
    </Fragment>
  );
};

const formatColumnDate = (dataField, formatter = formatISODate) => (cell, row) => {
  return row[dataField] ? formatter(row[dataField]) : "";
};

const formatISODate = date => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(date));
};

const formatISODateToExpenseDate = date => {
  return moment(new Date(date)).format("YYYY-MM-DD");
};

const formatExpenseDate = date => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour12: false,
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(date));
};

export { formatColumnDate, formatISODate, formatISODateToExpenseDate, formatExpenseDate, formatExpenseValue };
