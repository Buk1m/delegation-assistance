import React from "react";
import { selectFilter, textFilter } from "react-bootstrap-table2-filter";

import ButtonLink from "../../../components/ButtonLink/ButtonLink.component";
import { delegationStatuses } from "../..";
import commonColumns from "./common.columns";

const columns = [
  ...commonColumns,
  {
    dataField: "delegatedEmployee.firstName",
    text: "First name",
    sort: true,
    editable: false,
    filter: textFilter()
  },
  {
    dataField: "delegatedEmployee.lastName",
    text: "Last name",
    sort: true,
    editable: false,
    filter: textFilter()
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    editable: false,
    classes: (cell, row) => {
      return row.status ? row.status.toLowerCase() : "";
    },
    formatter: cell => <span className="delegation-status">{delegationStatuses[cell]}</span>,
    filter: selectFilter({
      options: delegationStatuses
    })
  },
  {
    dataField: "view",
    text: "View",
    isDummyField: true,
    editable: false,
    formatter: (cell, row) => <ButtonLink href={`/delegations/${row.id}`} text="View" />
  }
];
export default columns;
