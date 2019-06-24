import { dateFilter, textFilter } from "react-bootstrap-table2-filter";
import { formatColumnDate } from "../../../helpers/formatters";

const columns = [
  {
    dataField: "id",
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

export default columns;
