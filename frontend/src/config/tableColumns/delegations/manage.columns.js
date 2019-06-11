import React from "react";
import { Type } from "react-bootstrap-table2-editor";
import { selectFilter, textFilter } from "react-bootstrap-table2-filter";
import Icon from "react-icons-kit";
import { ic_keyboard_arrow_right } from "react-icons-kit/md/ic_keyboard_arrow_right";

import ButtonLink from "../../../components/ButtonLink/ButtonLink.component";
import { delegationStatuses } from "../..";
import commonColumns from "./common.columns";

const iconSize = 22;

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
  },
  {
    dataField: "view",
    text: "View",
    isDummyField: true,
    formatter: (cell, row) => <ButtonLink href={`/delegations/${row.id}`} text="View" />
  }
];
export default columns;
