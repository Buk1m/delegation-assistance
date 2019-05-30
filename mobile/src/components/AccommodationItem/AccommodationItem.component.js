import React from "react";
import { View } from "react-native";
import { object } from "prop-types";

import TextView from "../TextView/TextView.component";

import styles from "./AccommodationItem.module.scss";

const AccommodationItem = props => {
  const { hotelName, checkInDate, checkInTime, checkOutDate, checkOutTime } = props.accommodation;

  return (
    <View style={styles.accommodationItem}>
      <View style={styles.sideOrnament} />
      <View style={styles.accommodationData}>
        <TextView title={hotelName} viewStyle={[styles.centerText, styles.bottomBorder]} textStyle={styles.header} />
        <View style={styles.dateTimes}>
          <View style={styles.dateTime}>
            <TextView title="Check in" viewStyle={[styles.centerText, styles.rightBorder]} textStyle={styles.header} />
            <TextView title={checkInDate} viewStyle={[styles.centerText, styles.rightBorder]} textStyle={styles.text} />
            <TextView title={checkInTime} viewStyle={[styles.centerText, styles.rightBorder]} textStyle={styles.text} />
          </View>
          <View style={styles.dateTime}>
            <TextView title="Check out" viewStyle={[styles.centerText, styles.leftBorder]} textStyle={styles.header} />
            <TextView title={checkOutDate} viewStyle={[styles.centerText, styles.leftBorder]} textStyle={styles.text} />
            <TextView title={checkOutTime} viewStyle={[styles.centerText, styles.leftBorder]} textStyle={styles.text} />
          </View>
        </View>
      </View>
    </View>
  );
};

AccommodationItem.propTypes = {
  accommodation: object
};

export default AccommodationItem;
