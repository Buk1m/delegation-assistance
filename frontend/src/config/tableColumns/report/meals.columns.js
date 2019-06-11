import { columnsCentered } from "../_styles";

const columns = [
  { dataField: "breakfasts", text: "Breakfasts", ...columnsCentered(false) },
  { dataField: "lunches", text: "Lunches", ...columnsCentered(false) },
  { dataField: "dinners", text: "Dinners", ...columnsCentered(false) }
];

export default columns;
