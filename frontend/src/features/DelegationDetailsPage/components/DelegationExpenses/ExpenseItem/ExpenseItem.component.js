import React from "react";
import { array, func, number, string } from "prop-types";
import Icon from "react-icons-kit";
import { ic_file_download } from "react-icons-kit/md/";

import Row from "../../../../../components/Row/Row.component";
import { formatExpenseDate } from "../../../../../helpers/formatters";

const ExpenseItem = ({ files, handleDownloadExpenseFile, name, value, currency, paymentType, exchangeRate, date }) => {
  return (
    <div>
      <Row label="Name">{name}</Row>
      <Row label="Date">{formatExpenseDate(date)}</Row>
      <Row label="Amount">{value}</Row>
      <Row label="Currency">{currency}</Row>
      <Row label="Payment type">{paymentType}</Row>
      <Row label="Exchange Rate">{exchangeRate}</Row>
      <div className="de-file-items-grid">
        {files.map(file => (
          <div className="de-file-item" key={file.id} onClick={() => handleDownloadExpenseFile(file)}>
            <span className="de-file-name">{file.filename}</span>
            <span className="de-file-link">
              <Icon icon={ic_file_download} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

ExpenseItem.propTypes = {
  currency: string,
  date: string,
  exchangeRate: number,
  files: array,
  handleDownloadExpenseFile: func,
  name: string,
  paymentType: string,
  value: number
};

export default ExpenseItem;
