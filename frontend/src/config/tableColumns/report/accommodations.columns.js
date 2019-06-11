import { formatColumnDate, formatDelegationDate } from "../../../helpers/formatters";
import { columnsCentered } from "../_styles";

const columns = [
  { dataField: "id", hidden: true },
  { dataField: "checkInTime", text: "CheckInTime", hidden: true },
  { dataField: "checkOutTime", text: "CheckOutTime", hidden: true },
  {
    dataField: "checkInDate",
    text: "Check in",
    formatter: formatColumnDate("checkInDate", formatDelegationDate),
    ...columnsCentered()
  },
  {
    dataField: "checkOutDate",
    text: "Check out",
    formatter: formatColumnDate("checkOutDate", formatDelegationDate),
    ...columnsCentered()
  },
  { dataField: "hotelName", text: "Hotel's name", ...columnsCentered(false) }
];

export default columns;
