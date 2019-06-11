import { columnsCentered } from "../_styles";

const columns = [
  { dataField: "entitlements.perDiem", text: "Per diem", ...columnsCentered() },
  { dataField: "entitlements.breakfast", text: "Breakfast", ...columnsCentered() },
  { dataField: "entitlements.lunches", text: "Lunches", ...columnsCentered() },
  { dataField: "entitlements.dinners", text: "Dinners", ...columnsCentered() },
  { dataField: "entitlements.total", text: "Total", ...columnsCentered() },
  { dataField: "totalDiems", text: "Total diems", ...columnsCentered() }
];

export default columns;
