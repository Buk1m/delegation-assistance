import React from "react";
import {
  dateFilter,
  selectFilter,
  textFilter
} from "react-bootstrap-table2-filter";
import { Type } from "react-bootstrap-table2-editor";

import { delegationStatuses } from "./index";
import ButtonLink from "../components/ButtonLink/ButtonLink.component";
import { formatISODate } from "../helpers";

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
    formatter: (cell, row) => {
      return row.startDate ? formatISODate(row.startDate) : "";
    }
  },
  {
    dataField: "endDate",
    text: "End date",
    sort: true,
    editable: false,
    filter: dateFilter(),
    formatter: (cell, row) => {
      return row.endDate ? formatISODate(row.endDate) : "";
    }
  },
  {
    dataField: "destinationCountryISO3",
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
    classes: (cell, row) => {
      return row.status ? row.status.toLowerCase() : "";
    },
    formatter: cell => (
      <span className="delegation-status">{delegationStatuses[cell]}</span>
    ),
    filter: selectFilter({
      options: delegationStatuses
    })
  },
  {
    dataField: "edit_view",
    text: "Edit/View",
    formatter: (cell, row) => {
      if (row.status === "CREATED") {
        return <ButtonLink href={"/delegations/edit/" + row.id} text="Edit" />;
      } else {
        return (
          <ButtonLink
            className="secondary"
            href={"/delegations/" + row.id}
            text="View"
          />
        );
      }
    }
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
      <span className="delegation-status">{delegationStatuses[cell]}</span>
    ),
    filter: selectFilter({
      options: delegationStatuses
    }),
    editor: {
      type: Type.SELECT,
      options: Object.keys(delegationStatuses).map((key, index) => {
        return { value: key, label: delegationStatuses[key] };
      })
    }
  }
];

export { delegationsMyColumns, delegationsManageColumns };
