import React from "react";
import Icon from "react-icons-kit";
import { ic_place, ic_map, ic_phone, ic_timer, ic_attach_money } from "react-icons-kit/md";
import { array, string } from "prop-types";

import styles from "./CountryDetails.module.scss";

const CountryDetails = ({ region, capital, callingCodes, currencies, timezones }) => {
  const iconSize = 20;
  return (
    <div className={styles["details-wrapper"]}>
      <span className={styles["title"]}>Country details</span>
      <div className={styles["location"]}>
        <Icon icon={ic_place} size={iconSize} />
        <span>{capital}</span>
      </div>
      <div className={styles["country"]}>
        <Icon icon={ic_map} size={iconSize} />
        <span>{region}</span>
      </div>
      <div className={styles["calling-codes"]}>
        <Icon icon={ic_phone} size={iconSize} />
        <span>{callingCodes.join(" / ")}</span>
      </div>
      <div className={styles["timezones"]}>
        <Icon icon={ic_timer} size={iconSize} />
        <ul className={styles["list"]}>
          {timezones.map(timezone => (
            <li key={timezone}>{timezone}</li>
          ))}
        </ul>
      </div>
      <div className={styles["currencies"]}>
        <Icon icon={ic_attach_money} size={iconSize} />
        <ul className={styles["list"]}>
          {currencies.map(currency => (
            <li key={currency.code}>{`${currency.name} (${currency.symbol})`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CountryDetails.propTypes = {
  callingCodes: array,
  capital: string,
  currencies: array,
  region: string,
  timezones: array
};

export default CountryDetails;
