import { ACTIONS } from "../actions/expenses.actions";
import {
    PENDING,
    FULFILLED,
    REJECTED
} from "../middleware";

const initialState = {
    exchangeRates: [],
    fetching: false
};

const expensesReducer = (state = initialState, action) => {
    let result;

    switch (action.type) {
        case `${ACTIONS.GET_EXCHANGE_RATES}_${PENDING}`:
            result = {
                ...state,
                fetching: true
            };
            break;
        case `${ACTIONS.GET_EXCHANGE_RATES}_${FULFILLED}`:
            result = {
                ...state,
                fetching: false,
                exchangeRates: action.payload.data
            };
            break;
        case `${ACTIONS.GET_EXCHANGE_RATES}_${REJECTED}`:
            result = {
                ...state,
                fetching: false
            };
            break;
        default:
            result = state;
    }

    return result;
};

export default expensesReducer;
