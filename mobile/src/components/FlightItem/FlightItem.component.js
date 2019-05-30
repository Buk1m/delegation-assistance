import React from "react";
import { View } from "react-native";
import { object } from "prop-types";

import PlatformIcon from "../PlatformIcon/PlatformIcon.component";
import TextView from "../TextView/TextView.component";

import styles from "./FlightItem.module.scss";

const flightIconSize = 30;

const FlightItem = props => {
  const { departurePlace, arrivalPlace, departureDate, departureTime, arrivalDate, arrivalTime } = props.flight;

  return (
    <View style={styles.flightItem}>
      <View style={styles.sideOrnament} />
      <View style={styles.flightData}>
        <View style={[styles.places, styles.bottomBorder]}>
          <TextView title={departurePlace} viewStyle={styles.place} textStyle={styles.header} />
          <View style={styles.flightIcon}>
            <PlatformIcon name="airplane" size={flightIconSize} color={styles.iconColor} style={styles.airplaneIcon} />
          </View>
          <TextView title={arrivalPlace} viewStyle={styles.place} textStyle={styles.header} />
        </View>
        <View style={styles.dateTimes}>
          <View style={styles.dateTime}>
            <TextView title="Departure" viewStyle={[styles.centerText, styles.rightBorder]} textStyle={styles.header} />
            <TextView
              title={departureDate}
              viewStyle={[styles.centerText, styles.rightBorder]}
              textStyle={styles.text}
            />
            <TextView
              title={departureTime}
              viewStyle={[styles.centerText, styles.rightBorder]}
              textStyle={styles.text}
            />
          </View>
          <View style={styles.dateTime}>
            <TextView title="Arrival" viewStyle={[styles.centerText, styles.leftBorder]} textStyle={styles.header} />
            <TextView title={arrivalDate} viewStyle={[styles.centerText, styles.leftBorder]} textStyle={styles.text} />
            <TextView title={arrivalTime} viewStyle={[styles.centerText, styles.leftBorder]} textStyle={styles.text} />
          </View>
        </View>
      </View>
    </View>
  );
};

FlightItem.propTypes = {
  flight: object
};

export default FlightItem;
