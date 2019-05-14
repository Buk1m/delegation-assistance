import React from "react";
import { object } from "prop-types";
import { ic_flight_land } from "react-icons-kit/md/ic_flight_land";
import { ic_flight_takeoff } from "react-icons-kit/md/ic_flight_takeoff";
import { Icon } from "react-icons-kit";

import styles from "./FlightItem.module.scss";

const getLocaleTime = date => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const getLocaleDate = date => date.toLocaleDateString();

const FlightItem = ({ flight }) => {
  const { arrivalDate, departureDate, from, to } = flight;
  return (
    <div className="flight">
      <div className={["row mobile-table", styles.flight].join(" ")}>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-1">
              <Icon size={24} icon={ic_flight_takeoff} />
            </div>
            <div className="col-5">{from} </div>
            <div className="col-3">{getLocaleDate(departureDate)}</div>
            <div className="col-2">{getLocaleTime(departureDate)}</div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-1">
              <Icon size={24} icon={ic_flight_land} />
            </div>
            <div className="col-5">{to}</div>
            <div className="col-3">{getLocaleDate(arrivalDate)}</div>
            <div className="col-2">{getLocaleTime(arrivalDate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

FlightItem.propTypes = {
  flight: object
};

export default FlightItem;
