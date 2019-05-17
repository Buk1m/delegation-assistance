import React from "react";
import { dateFilter, selectFilter, textFilter } from "react-bootstrap-table2-filter";
import { Type } from "react-bootstrap-table2-editor";
import { money, creditCard } from "react-icons-kit/fa/";
import { Icon } from "react-icons-kit";

import ButtonLink from "../components/ButtonLink/ButtonLink.component";
import { delegationStatuses } from "./index";
import { formatExpenseDate, formatExpenseValue, formatColumnDate } from "../helpers/formatters";

const delegationsSharedColumns = [
  {
    dataField: "id",
    text: "User ID",
    hidden: true
  },
  {
    dataField: "startDate",
    text: "Start date",
    sort: true,
    editable: false,
    filter: dateFilter(),
    formatter: formatColumnDate("startDate")
  },
  {
    dataField: "endDate",
    text: "End date",
    sort: true,
    editable: false,
    filter: dateFilter(),
    formatter: formatColumnDate("endDate")
  },
  {
    dataField: "destinationCountry",
    text: "Country",
    sort: true,
    editable: false,
    filter: textFilter()
  },
  {
    dataField: "destinationLocation",
    text: "Location",
    sort: true,
    editable: false,
    filter: textFilter()
  },
  {
    dataField: "delegationObjective",
    text: "Description",
    sort: true,
    editable: false,
    filter: textFilter()
  }
];

const delegationsMyColumns = [
  ...delegationsSharedColumns,
  {
    dataField: "status",
    text: "Status",
    sort: true,
    classes: (cell, row) => (row.status ? row.status.toLowerCase() : ""),
    formatter: cell => <span className="delegation-status">{delegationStatuses[cell]}</span>,
    filter: selectFilter({
      options: delegationStatuses
    })
  },
  {
    dataField: "edit_view",
    text: "Edit/View",
    isDummyField: true,
    formatter: (cell, row) =>
      row.status === "CREATED" ? (
        <ButtonLink href={`/delegations/${row.id}/edit`} text="Edit" />
      ) : (
        <ButtonLink href={"/delegations/" + row.id} text="View" className="secondary" />
      )
  }
];

const delegationsManageColumns = [
  ...delegationsSharedColumns,
  {
    dataField: "status",
    text: "Status",
    sort: true,
    classes: (cell, row) => {
      return row.status ? row.status.toLowerCase() : "";
    },
    formatter: cell => <span className="delegation-status">{delegationStatuses[cell]}</span>,
    filter: selectFilter({
      options: delegationStatuses
    }),
    editor: {
      type: Type.SELECT,
      options: Object.keys(delegationStatuses).map(status => ({ value: status, label: delegationStatuses[status] }))
    }
  }
];

const expensesColumns = [
  { dataField: "id", hidden: true, sort: true },
  { dataField: "expenseValue", hidden: true },
  { dataField: "expenseCurrency", hidden: true },
  { dataField: "exchangeRate", hidden: true },
  { dataField: "files", hidden: true },
  {
    dataField: "expenseDate",
    text: "Date",
    sort: true,
    formatter: formatColumnDate("expenseDate", formatExpenseDate),
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

export { delegationsMyColumns, delegationsManageColumns, expensesColumns };
