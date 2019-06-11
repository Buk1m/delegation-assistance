import { formatDelegationDate, formatColumnDate } from "../../../helpers/formatters";
import { columnsCentered } from "../_styles";

const columns = [
  { dataField: "id", hidden: true },
  {
    dataField: "departureDate",
    text: "Date",
    formatter: formatColumnDate("departureDate", formatDelegationDate),
    ...columnsCentered()
  },
  {
    dataField: "departureTime",
    text: "Time",
    ...columnsCentered()
  },
  { dataField: "from", text: "From", ...columnsCentered(false) },
  { dataField: "to", text: "To", ...columnsCentered(false) },
  {
    dataField: "arrivalDate",
    text: "Date",
    formatter: formatColumnDate("arrivalDate", formatDelegationDate),
    ...columnsCentered()
  },
  { dataField: "arrivalTime", text: "Time", ...columnsCentered() }
];

export default columns;
