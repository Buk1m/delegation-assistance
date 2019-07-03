import React from "react";
import { View, Text } from "react-native";
import { object } from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";

import StatusProp from "../../../../components/StatusProp/StatusProp.component";

import styles from "./DelegationStyles.scss";

const Delegation = props => {
  const { id, startDate, endDate, destinationCountry, destinationLocation, status, delegationObjective } = props.data;
  return (
    <View style={[styles.delegation, styles[status]]}>
      <View style={styles.status}>
        <StatusProp status={status} />
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.header}>Delegation no.{id}</Text>
      </View>
      <View style={[styles.dataRow, styles.location]}>
        <Ionicons size={18} name="md-pin" style={styles["pin-icon"]} />
        <Text style={styles["location-content"]}>
          {destinationCountry} - {destinationLocation}
        </Text>
      </View>
      <View style={[styles.dataRow, styles.dates]}>
        <Text style={styles["dates-content"]}>
          {startDate} - {endDate}
        </Text>
      </View>
      <Text numberOfLines={1} style={styles.objective}>
        {delegationObjective}
      </Text>
    </View>
  );
};

Delegation.propTypes = {
  data: object
};

export default Delegation;
