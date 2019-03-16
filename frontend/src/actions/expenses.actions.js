import { APINBP } from "../services/data";

export const ACTIONS = {
    GET_EXCHANGE_RATES: "EXPENSES_GET_EXCHANGE_RATES"
};

const fetchExchangeRates = () => dispatch => {
    return dispatch(
        APINBP.get(ACTIONS.GET_EXCHANGE_RATES, {
            url: "/exchangerates/tables/A",
            needAuth: false,
        })
    );
};

export {
    fetchExchangeRates
};
