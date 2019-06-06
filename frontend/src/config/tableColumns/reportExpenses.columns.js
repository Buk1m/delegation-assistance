import React, { Fragment } from "react";

import { formatColumnDate, formatDelegationDate } from "../../helpers/formatters";
import { columnsCentered } from "./_styles";

const columns = (total, targetCurrency) => [
  { dataField: "id", hidden: true },
  {
    dataField: "expenseDate",
    text: "Date",
    ...columnsCentered(),
    footer: <Fragment />,
    formatter: formatColumnDate("expenseDate", formatDelegationDate)
  },
  { dataField: "expenseName", text: "Description", ...columnsCentered(false), footer: <Fragment /> },
  { dataField: "expenseCurrency", text: "In currency", ...columnsCentered(), footer: <Fragment /> },
  { dataField: "expenseValue", text: "Amount", ...columnsCentered(), footer: <Fragment /> },
  { dataField: "paymentType", text: "Cash/Card", ...columnsCentered(), footer: <Fragment /> },
  { dataField: "targetCurrency", text: "Target currency", ...columnsCentered(), footer: "TOTAL" },
  { dataField: "exchangeAmount", text: "Exchange amount", ...columnsCentered(), footer: total.toString() },
  {
    dataField: "exchangeRate",
    text: "Exchange rate",
    ...columnsCentered(),
    footer: targetCurrency,
    title: () => "NBP exchange rate from the day preceding the submission of the document",
    headerTitle: () => "NBP exchange rate from the day preceding the submission of the document"
  }
];

export default columns;
