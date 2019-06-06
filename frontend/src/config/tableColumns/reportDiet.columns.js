import { columnsCentered } from "./_styles";

const columns = [
  { dataField: "perDiem", text: "Per diem", ...columnsCentered() },
  { dataField: "currency", text: "Currency", ...columnsCentered() },
  { dataField: "exchangeRate", text: "Exchange rate", ...columnsCentered() }
];

export default columns;
