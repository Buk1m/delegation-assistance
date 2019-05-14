import React from "react";
import { Icon } from "react-icons-kit";
import { sortAmountAsc } from "react-icons-kit/fa/sortAmountAsc";
import { sortAmountDesc } from "react-icons-kit/fa/sortAmountDesc";
import { array, bool, func, string } from "prop-types";

import AccommodationItem from "./AccommodationItem/AccommodationItem.component";
import AccommodationModalForm from "./AccommodationModalForm";
import Button from "../../../../components/Button/Button.component";

import styles from "./DelegationAccommodations.module.scss";
import SpinnerWrapper from "../../../../components/SpinnerWrapper/SpinnerWrapper.component";

const DelegationAccommodations = props => {
  const { accommodations, addingAccommodation, delegationId, fetching, handleSortChange, sortOrder } = props;

  return (
    <SpinnerWrapper loading={fetching} message="loading accommodations">
      {accommodations.length === 0 ? (
        <p>No accommodations, add a new one!</p>
      ) : (
        <div className="accommodation-table">
          <div className="mobile-table">
            <div className={["row pb-1", styles["accommodations-headers"]].join(" ")}>
              <div className="col-6">
                <div className="row">
                  <div className="offset-1 col-5">Hotel Name</div>
                </div>
              </div>
              <div className="col-3">
                <button className={styles["sort-btn"]} onClick={() => handleSortChange(sortOrder)}>
                  <span className={styles["sorting-header"]}>Check in</span>
                  <Icon icon={sortOrder === "asc" ? sortAmountAsc : sortAmountDesc} />
                </button>
              </div>
              <div className="col-3">Check out</div>
            </div>
            {accommodations.map((accommodation, index) => (
              <AccommodationItem accommodation={accommodation} key={index.toString()} />
            ))}
          </div>
        </div>
      )}
      <div className={styles["add-accommodation-btn"]}>
        <Button
          data-toggle="modal"
          data-target="#addAccommodationModal"
          text="Add Accommodation"
          submitting={addingAccommodation}
          disabled={addingAccommodation}
        />
      </div>
      <AccommodationModalForm delegationId={delegationId} />
    </SpinnerWrapper>
  );
};

DelegationAccommodations.propTypes = {
  accommodations: array,
  addingAccommodation: bool,
  delegationId: string,
  fetching: bool,
  handleSortChange: func,
  sortOrder: string
};

export default DelegationAccommodations;
