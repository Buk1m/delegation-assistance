import React from "react";

import { formatColumnDate } from "../../../helpers/formatters";
import ButtonLink from "../../../components/ButtonLink/ButtonLink.component";
import { columnsCentered } from "../_styles";

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
    dataField: "view",
    text: "View",
    isDummyField: true,
    formatter: (cell, row) => <ButtonLink href={`/delegations/${row.id}`} text="View" />,
    ...columnsCentered()
  }
];

export default columns;
