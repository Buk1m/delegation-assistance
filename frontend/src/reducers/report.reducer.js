import { ACTIONS } from "../actions/report.actions";
import { PENDING, FULFILLED, REJECTED } from "../middleware";

const initialState = {
  fetching: false,
  errors: "",
  subErrors: [],
  flights: [],
  accommodations: [],
  expenses: [],
  meals: [],
  diet: [],
  diemReturns: [],
  allowance: [],
  user: null,
  totalRepayment: 0,
  targetCurrency: null,
  generationDate: null,
  advancePayment: 0,
  place: null,
  duration: 0,
  delegationObjective: null,
  startDate: null,
  endDate: null,
  delegationStatus: "",
  delegationVersion: 0
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${ACTIONS.GET_REPORT}_${PENDING}`:
      return {
        ...state,
        fetching: true
      };

    case `${ACTIONS.GET_REPORT}_${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        flights: action.payload.data.flights,
        accommodations: action.payload.data.accommodations,
        expenses: action.payload.data.expenses,
        diet: [action.payload.data.diet],
        meals: [action.payload.data.meals],
        diemReturns: [action.payload.data.diemReturns],
        allowance: [action.payload.data.diemReturns.allowance],
        user: action.payload.data.user,
        generationDate: action.payload.data.generationDate,
        totalRepayment: action.payload.data.totalRepayment,
        targetCurrency: action.payload.data.targetCurrency,
        advancePayment: action.payload.data.advancePayment,
        place: action.payload.data.place,
        duration: action.payload.data.duration,
        delegationObjective: action.payload.data.delegationObjective,
        startDate: action.payload.data.startDate,
        endDate: action.payload.data.endDate,
        delegationStatus: action.payload.data.delegationStatus,
        delegationVersion: action.payload.data.version
      };

    case `${ACTIONS.GET_REPORT}_${REJECTED}`:
      return {
        ...state,
        fetching: false,
        errors: action.payload.Message,
        subErrors: action.payload.SubErrors
      };

    default:
      return state;
  }
};

export default reportReducer;
