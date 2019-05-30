import React from "react";
import moment from "moment";

import FlightItem from "../FlightItem/FlightItem.component";

const RenderFlightItem = flightToRender => {
  const flight = flightToRender.item;

  const departureDateTime = moment(flight.departureDate);
  const arrivalDateTime = moment(flight.arrivalDate);

  const departureDate = departureDateTime.format("YYYY-MM-DD");
  const departureTime = departureDateTime.format("HH:mm");
  const arrivalDate = arrivalDateTime.format("YYYY-MM-DD");
  const arrivalTime = arrivalDateTime.format("HH:mm");

  const departurePlace = flight.departurePlace;
  const arrivalPlace = flight.arrivalPlace;

  return (
    <FlightItem flight={{ departurePlace, arrivalPlace, departureDate, departureTime, arrivalDate, arrivalTime }} />
  );
};

export default RenderFlightItem;
