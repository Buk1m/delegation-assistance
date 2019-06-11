import { columnsCentered } from "../_styles";
import { formatColumnDate } from "../../../helpers/formatters";

const columns = [
  { dataField: "startDate", text: "Start date", ...columnsCentered(), formatter: formatColumnDate("startDate") },
  { dataField: "endDate", text: "End date", ...columnsCentered(), formatter: formatColumnDate("endDate") },
  { dataField: "duration", text: "Duration", ...columnsCentered() },
  { dataField: "place", text: "Place", ...columnsCentered() }
];

export default columns;
