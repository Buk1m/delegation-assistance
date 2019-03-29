import { environments } from "../../config/index";
import { PENDING, FULFILLED, REJECTED } from "../";

const logsMode = environments.LOGS;

const AllLogger = () => next => action => {
  window.console.log(action);
  next(action);
};

const reqRegex = new RegExp(`(${PENDING}|${FULFILLED}|${REJECTED})$`);
const ReqLogger = () => next => action => {
  if (reqRegex.test(action.type)) {
    window.console.log(action);
  }
  next(action);
};

const NoneLogger = () => next => action => {
  next(action);
};

let Logger = null;

switch (logsMode) {
  case "all":
    Logger = AllLogger;
    break;
  case "req":
    Logger = ReqLogger;
    break;
  case "none":
  default:
    Logger = NoneLogger;
    break;
}

export default Logger;
