import React from "react";
import { func, array, string } from "prop-types";

const ExpensesSettingsPage = props => {
  const { fetchRates, test, exchangeRates = [] } = props;
  return (
    <div>
      <p>Expenses Settings page with props.test equals: {test}</p>
      <p style={styles.bigBlue}>Waluty:</p>
      {exchangeRates.length > 0 && (exchangeRates[0].rates.map((rate) => {
        return <p key={rate.code}>{rate.currency}</p>;
      }))}
      <button Content="Fetch exchange rates" onPress={fetchRates} />
      <a href="/">Back to homepage</a>
  </div>
  );
};

const styles = {
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
};

ExpensesSettingsPage.propTypes = {
  fetchRates: func,
  test: string,
  exchangeRates: array
};

export default ExpensesSettingsPage;
