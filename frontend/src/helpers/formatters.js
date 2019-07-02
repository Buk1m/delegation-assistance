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
    hour12: false,
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(date));
};

const formatISODateWithoutTime = date => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(date));
};

const formatToISO = date => new Date(date).toISOString().split(".")[0];

const formatISODateToDelegationDate = date => moment(new Date(date)).format("YYYY-MM-DD");

const formatFilenameDate = date => moment(new Date(date)).format("YYYY_MM_DD");

const formatDelegationDate = date => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour12: false,
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });
  return formatter.format(new Date(date));
};

export {
  formatColumnDate,
  formatISODate,
  formatISODateWithoutTime,
  formatISODateToDelegationDate,
  formatDelegationDate,
  formatFilenameDate,
  formatExpenseValue,
  formatToISO
};
