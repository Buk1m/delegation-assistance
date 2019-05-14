import Currencies from "./Currencies";

const currencies = Currencies.map(currency => {
    return { label: currency, value: currency };
  });

export default currencies;