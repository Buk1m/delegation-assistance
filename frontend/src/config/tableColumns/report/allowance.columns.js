import { columnsCentered } from "../_styles";

const columns = [
  { dataField: "targetCurrency", text: "Target currency", ...columnsCentered() },
  { dataField: "basePerDiem", text: "Base per diem", ...columnsCentered() }
];

export default columns;
