import React from "react";
import { money, creditCard } from "react-icons-kit/fa/";
import { Icon } from "react-icons-kit";

import { formatDelegationDate, formatExpenseValue, formatColumnDate } from "../../../helpers/formatters";

const columns = [
  { dataField: "id", hidden: true, sort: true },
  { dataField: "expenseValue", hidden: true },
  { dataField: "expenseCurrency", hidden: true },
  { dataField: "exchangeRate", hidden: true },
  { dataField: "files", hidden: true },
  {
    dataField: "expenseDate",
    text: "Date",
    sort: true,
    formatter: formatColumnDate("expenseDate", formatDelegationDate),
    headerStyle: () => ({ minWidth: "100px", width: "20%" })
  },
  { dataField: "expenseName", text: "Name" },
  {
    dataField: "paymentType",
    text: "Amount",
    formatter: formatExpenseValue,
    formatExtraData: {
      CREDIT_CARD: <Icon icon={creditCard} size={20} style={{ color: "var(--table-expense-card-c)" }} />,
      CASH: <Icon icon={money} size={20} style={{ color: "var(--table-expense-cash-c)" }} />
    },
    headerStyle: () => ({ minWidth: "100px", width: "20%" })
  }
];

export default columns;
