import React from "react";
import { dateFilter, selectFilter, textFilter } from "react-bootstrap-table2-filter";
import { Type } from "react-bootstrap-table2-editor";
import { Icon } from "react-icons-kit";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";

import ButtonLink from "../components/ButtonLink/ButtonLink.component";
import { delegationStatuses } from "./index";
import { formatColumnDate } from "../helpers/formatters";

const iconSize = 22;

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
        <ButtonLink href={`/delegations/${row.id}`} text="Edit" />
      ) : (
        <ButtonLink href={`/delegations/${row.id}`} text="View" className="secondary" />
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
    formatter: cell => (
      <span className="delegation-status">
        {delegationStatuses[cell]}
        <span className="arrow">
          <Icon size={iconSize} icon={ic_keyboard_arrow_right} />
        </span>
      </span>
    ),
    filter: selectFilter({
      options: delegationStatuses
    }),
    editor: {
      type: Type.SELECT,
      options: Object.keys(delegationStatuses).map(status => ({ value: status, label: delegationStatuses[status] }))
    }
  }
];

export { delegationsMyColumns, delegationsManageColumns };
