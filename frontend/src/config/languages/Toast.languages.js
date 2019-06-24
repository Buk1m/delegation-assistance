import { PENDING, FULFILLED, REJECTED } from "../../middleware";
import { ACTIONS as DelegationActions } from "../../actions/delegations.actions";
import { ToastType } from "react-toastify";

const data = {
  [`${DelegationActions.ADD_DELEGATION}_${PENDING}`]: {
    type: ToastType.INFO,
    message: destination => `Creating delegation to ${destination}`
  },
  [`${DelegationActions.ADD_DELEGATION}_${FULFILLED}`]: {
    type: ToastType.SUCCESS,
    message: destination => `Created delegation to ${destination}`
  },
  [`${DelegationActions.ADD_DELEGATION}_${REJECTED}`]: {
    type: ToastType.ERROR,
    message: "Failed to create delegation"
  }
};

export default data;
