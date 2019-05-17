import React from "react";
import { Icon } from "react-icons-kit";
import { sortAmountAsc } from "react-icons-kit/fa/sortAmountAsc";
import { sortAmountDesc } from "react-icons-kit/fa/sortAmountDesc";
import { array, bool, func, string, number } from "prop-types";

import Button from "../../../../components/Button/Button.component";
import FlightItem from "./FlightItem/FlightItem.component";
import FlightModalForm from "./FlightModalForm";
import SpinnerWrapper from "../../../../components/SpinnerWrapper/SpinnerWrapper.component";

import styles from "./DelegationFlights.module.scss";

const DelegationFlights = props => {
  const { addingFlight, delegationId, fetching, flights, handleSortChange, sortOrder } = props;
  return (
    <SpinnerWrapper loading={fetching} message="loading flights">
      {flights.length === 0 ? (
        <p>No flights, add a new one!</p>
      ) : (
        <div className="flights-table">
          <div className="mobile-table">
            <div className={["row pb-1", styles["flights-headers"]].join(" ")}>
              <div className="col-lg-6">
                <div className="row">
                  <div className="offset-1 col-5 d-lg-none">Flight</div>
                  <div className="offset-1 col-5 d-none d-lg-block">From</div>
                  <div className="col-3">
                    <button className={styles["sort-btn"]} onClick={() => handleSortChange()}>
                      <span className={styles["sorting-header"]}>Date</span>
                      <Icon icon={sortOrder === "asc" ? sortAmountAsc : sortAmountDesc} />
                    </button>
                  </div>
                  <div className="col-2">Time</div>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <div className="row">
                  <div className="offset-1 col-5">To</div>
                  <div className="col-3">Date</div>
                  <div className="col-2">Time</div>
                </div>
              </div>
            </div>
            {flights.map((flight, index) => (
              <FlightItem flight={flight} key={index} />
            ))}
          </div>
        </div>
      )}
      <div className={styles["add-flight-btn"]}>
        <Button
          data-toggle="modal"
          data-target="#addFlightModal"
          text="Add Flight"
          submitting={addingFlight}
          disabled={addingFlight}
        />
      </div>
      <FlightModalForm delegationId={delegationId} />
    </SpinnerWrapper>
  );
};

DelegationFlights.propTypes = {
  addingFlight: bool,
  delegationId: number,
  fetching: bool,
  flights: array,
  handleSortChange: func,
  sortOrder: string
};

export default DelegationFlights;
