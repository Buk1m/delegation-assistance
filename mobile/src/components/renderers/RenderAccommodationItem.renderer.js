import React from "react";
import moment from "moment";

import AccommodationItem from "../AccommodationItem/AccommodationItem.component";

const RenderAccommodationItem = accommodationToRender => {
  const accommodation = accommodationToRender.item;

  const checkInDateTime = moment(accommodation.checkInDate);
  const checkOutDateTime = moment(accommodation.checkOutDate);

  const checkInDate = checkInDateTime.format("YYYY-MM-DD");
  const checkInTime = checkInDateTime.format("HH:mm");
  const checkOutDate = checkOutDateTime.format("YYYY-MM-DD");
  const checkOutTime = checkOutDateTime.format("HH:mm");

  const hotelName = accommodation.hotelName;

  return <AccommodationItem accommodation={{ hotelName, checkInDate, checkInTime, checkOutDate, checkOutTime }} />;
};

export default RenderAccommodationItem;
