import React from "react";

import { formatColumnDate } from "../../../helpers/formatters";
import ButtonLink from "../../../components/ButtonLink/ButtonLink.component";
import { columnsCentered } from "../_styles";
import { delegationStatuses } from "../..";

const columns = [
  {
    dataField: "id",
    hidden: true
  },
  {
    dataField: "startDate",
    text: "Start date",
    sort: true,
    formatter: formatColumnDate("startDate"),
    ...columnsCentered()
  },
  {
    dataField: "endDate",
    text: "End date",
    sort: true,
    formatter: formatColumnDate("endDate"),
    ...columnsCentered()
  },
  {
    dataField: "destinationCountry",
    text: "Country",
    sort: true,
    ...columnsCentered()
  },
  {
    dataField: "destinationLocation",
    text: "Location",
    sort: true,
    ...columnsCentered()
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    classes: (cell, row) => (row.status ? row.status.toLowerCase() : ""),
    formatter: cell => <span className="delegation-status">{delegationStatuses[cell]}</span>,
    ...columnsCentered()
  },
  {
    dataField: "view",
    text: "View",
    isDummyField: true,
    editable: false,
    formatter: (cell, row) => <ButtonLink href={`/delegations/${row.id}`} text="View" />,
    ...columnsCentered()
  }
];

export default columns;
