import React from "react";
import { Icon } from "react-icons-kit";
import { hotel } from "react-icons-kit/fa/hotel";
import { object } from "prop-types";

import styles from "./AccommodationItem.module.scss";

const getLocaleDateTime = date =>
  date.toLocaleString([], { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" });

const AccommodationItem = ({ accommodation }) => {
  const { hotelsName, checkInDate, checkOutDate } = accommodation;
  return (
    <div className="accommodation">
      <div className={["row mobile-table", styles.accommodation].join(" ")}>
        <div className="col-6">
          <div className="row">
            <div className="col-2 col-md-1">
              <Icon size={24} icon={hotel} />
            </div>
            <div className="col-10 ">{hotelsName} </div>
          </div>
        </div>
        <div className="col-3">{getLocaleDateTime(checkInDate)}</div>
        <div className="col-3">{getLocaleDateTime(checkOutDate)}</div>
      </div>
    </div>
  );
};

AccommodationItem.propTypes = {
  accommodation: object
};

export default AccommodationItem;
